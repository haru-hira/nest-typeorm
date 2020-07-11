import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { InitUploadDocumentDTO, InitSplitUploadDocumentDTO } from 'src/dto/document.dto';
import { Document } from 'src/entity/document'
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async initUpload(): Promise<InitUploadDocumentDTO> {
    const s3 = new AWS.S3({ region: "ap-northeast-1", signatureVersion: 'v4',});
    const dateString = getDateString();
    const key = 'document/' + dateString;
    const contentType = '';
    const type = contentType ? contentType : 'application/octet-stream'
    console.log(key + " " + type);
    const presignedUrl = s3.getSignedUrl('putObject', {
      ContentType: type,
      Bucket: 'nest-typeorm',
      Key: key,
      // 最小で1sec、最大で604800sec(7日間)まで設定可能
      Expires: 60,
      // アップロードされたものをパブリックに公開する場合は指定
      // ACL: "public-read",
    });
    const dto = new InitUploadDocumentDTO();
    dto.s3PresignedURL = presignedUrl;
    dto.id = dateString;
    return dto;
  }
  

  async initSplitUpload(id: number): Promise<InitSplitUploadDocumentDTO> {
    AWS.config.update({region: 'ap-northeast-1'})
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    /* AWS.config.getCredentials(function(err) {
      if (err) console.log(err.stack);
      // credentials not loaded
      else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret Access key:", AWS.config.credentials.secretAccessKey);
        console.log("Session Token:", AWS.config.credentials.sessionToken);
      }
    }); */

    const params = {
      Bucket: 'nest-typeorm',
      Key: "document/" + id
    }
    const dto = new InitSplitUploadDocumentDTO();
    dto.key = params.Key;
    const result = await s3.createMultipartUpload(params).promise();
    console.log("Success:UploadId", result.UploadId);

    dto.uploadId = result.UploadId;
    return dto;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async upload(id: number): Promise<void> {
    console.log("check-1")
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      AWS.config.update({region: 'ap-northeast-1'})
      const s3 = new AWS.S3({apiVersion: '2006-03-01'});

      AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
          console.log("Access key:", AWS.config.credentials.accessKeyId);
          console.log("Secret Access key:", AWS.config.credentials.secretAccessKey);
          console.log("Session Token:", AWS.config.credentials.sessionToken);
        }
      });

      const params = {
        Bucket: 'nest-typeorm',
        Key: "document/" + id
      }
      const result = await s3.createMultipartUpload(params).promise();
      console.log("Success:UploadId", result.UploadId);

      const uploadId = result.UploadId;
 
      console.log("File: " + window.File)
      console.log("FileReader: " + window.FileReader)
      console.log("FileList: " + window.FileList)
      console.log("Blob: " + window.Blob)

      // const reader = new FileReader();
      const buffer = fs.readFileSync("C:/workspace/A17_FlightPlan.pdf");
      // console.log(buffer);
      const fileBlob = new Blob([new Uint8Array(buffer)])

      // reader.readAsDataURL();
      // const mime = Mime.lookup(file.name);
      // const multiPartParams = s3Params.ContentType ? s3Params : {ContentType : 'application/pdf' , ...s3Params};
      const multiPartParams = { ContentType : 'application/pdf', ...params };
      const allSize = fileBlob.size;
 
      const partSize = 1024 * 1024 * 5; // 5MB/chunk
 
      const multipartMap = {
        Parts: []
      };
      /*  (5)  */
      let partNum = 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {ContentType , ...otherParams} = multiPartParams;
      for (let rangeStart = 0; rangeStart < allSize; rangeStart += partSize) {
        partNum++;
        const end = Math.min(rangeStart + partSize, allSize);
  
        const sendData = await new Promise((resolve) => {
            const fileReader =  new FileReader();
  
            fileReader.onload = (event)=>{
                const data = event.target.result;
                let byte: Uint8Array = null;
                if (data instanceof ArrayBuffer) {
                  byte = new Uint8Array(data);
                } else {
                  byte = (new TextEncoder).encode(data);
                }
                resolve(byte);
                fileReader.abort();
            };
            const blob2 = fileBlob.slice(rangeStart , end);
            fileReader.readAsArrayBuffer(blob2);
        })
  
        const progress = end / fileBlob.size;
        console.log(`今,${progress * 100}%だよ`);
  
        const partParams = {
            Body: sendData,
            PartNumber: partNum,
            UploadId: uploadId,
            ...otherParams
        };
        const partUpload = await s3.uploadPart(partParams).promise();
        multipartMap.Parts[partNum - 1] = {
            ETag: partUpload.ETag,
            PartNumber: partNum
        };
      }

      const doneParams = {
        ...otherParams,
        MultipartUpload: multipartMap,
        UploadId: uploadId
      };
 
      await s3.completeMultipartUpload(doneParams)
        .promise()
        .then(()=> alert("Complete!!!!!!!!!!!!!"))

      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

//日付から文字列に変換する関数
function getDateString() {

  const date = new Date();
	const year = date.getFullYear();
	//月だけ+1すること
	const month = 1 + date.getMonth();
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	const month_str = ('0' + month).slice(-2);
	const day_str = ('0' + day).slice(-2);
	const hour_str = ('0' + hour).slice(-2);
	const minute_str = ('0' + minute).slice(-2);
	const second_str = ('0' + second).slice(-2);

	let format_str = 'YYYYMMDD-hhmmss';
	format_str = format_str.replace(/YYYY/g, String(year));
	format_str = format_str.replace(/MM/g, month_str);
	format_str = format_str.replace(/DD/g, day_str);
	format_str = format_str.replace(/hh/g, hour_str);
	format_str = format_str.replace(/mm/g, minute_str);
	format_str = format_str.replace(/ss/g, second_str);

	return format_str;
};
