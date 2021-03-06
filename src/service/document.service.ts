import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import {
  InitUploadDocumentDTO,
  CompleteUploadDocumentDTO,
  InitSplitUploadDocumentDTO,
  CompleteSplitUploadDocumentDTO,
  SplitUploadDocumentOutputDTO,
  SplitUploadDocumentInputDTO,
  InitUploadDocumentInputDTO,
  GetDocumentDTO,
} from '../dto/document.dto';
import { Document, DocumentStatus } from '../entity/document';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async initUpload(): Promise<InitUploadDocumentDTO> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const s3 = new AWS.S3({
        region: 'ap-northeast-1',
        signatureVersion: 'v4',
      });
      const dateString = getDateString();
      const key = 'document/' + dateString;
      // const contentType = '';
      // const type = contentType ? contentType : 'application/octet-stream'
      // 前提1: 対象のS3にバケット"nest-typeorm"を作成
      // 前提2: 上記のバケットにおいてPUTに対するCORSを許可
      const presignedUrl = s3.getSignedUrl('putObject', {
        // ContentType: type,
        Bucket: 'nest-typeorm',
        Key: key,
        // 最小で1sec、最大で604800sec(7日間)まで設定可能
        Expires: 60,
        // アップロードされたものをパブリックに公開する場合は指定
        // ACL: "public-read",
        // ACL: "authenticated-read",
      });

      // Documentレコードの仮作成
      const doc = new Document();
      doc.status = DocumentStatus.TEMPORARY;
      doc.originalObjectKey = key;
      const createdDoc = await queryRunner.manager.save(doc);

      // DTOの作成
      const dto = new InitUploadDocumentDTO();
      dto.s3PresignedURL = presignedUrl;
      dto.id = createdDoc.id;

      await queryRunner.commitTransaction();
      return dto;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async completeUpload(id: number, completeUploadDocumentDto: CompleteUploadDocumentDTO): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const doc = await queryRunner.manager.findOne(Document, id);
      if (doc) {
        if (completeUploadDocumentDto.isSuccess) {
          doc.status = DocumentStatus.PERMANENT;
          doc.fileName = completeUploadDocumentDto.fileName;
          doc.originalObjectContentType = completeUploadDocumentDto.contentType;
          await queryRunner.manager.save(doc);
        } else {
          await queryRunner.manager.remove(doc);
        }
      }
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

  async initSplitUpload(initUploadDocumentInputDto: InitUploadDocumentInputDTO): Promise<InitSplitUploadDocumentDTO> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      /* AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
          console.log("Access key:", AWS.config.credentials.accessKeyId);
          console.log("Secret Access key:", AWS.config.credentials.secretAccessKey);
          console.log("Session Token:", AWS.config.credentials.sessionToken);
        }
      }); */
      const s3 = new AWS.S3({
        region: 'ap-northeast-1',
        signatureVersion: 'v4',
      });

      const dateString = getDateString();
      const key = 'document/' + dateString;
      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 10);
      // 前提: 対象のS3にバケット"nest-typeorm"を作成
      const params = {
        Bucket: 'nest-typeorm',
        Key: key,
        // 最小で1sec、最大で604800sec(7日間)まで設定可能
        Expires: expireDate,
        ContentType: initUploadDocumentInputDto.contentType,
      };
      const result = await s3.createMultipartUpload(params).promise();

      // Documentレコードの仮作成
      const doc = new Document();
      doc.status = DocumentStatus.TEMPORARY;
      doc.originalObjectKey = key;
      doc.originalObjectContentType = initUploadDocumentInputDto.contentType;
      const createdDoc = await queryRunner.manager.save(doc);

      // DTOの作成
      const dto = new InitSplitUploadDocumentDTO();
      dto.key = params.Key;
      dto.uploadId = result.UploadId;
      dto.id = createdDoc.id;

      await queryRunner.commitTransaction();
      return dto;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async splitUpload(
    splitFile: any,
    splitUploadDocumentInputDto: SplitUploadDocumentInputDTO,
  ): Promise<SplitUploadDocumentOutputDTO> {
    const s3 = new AWS.S3({ region: 'ap-northeast-1', signatureVersion: 'v4' });

    const partParams = {
      Bucket: 'nest-typeorm',
      Key: splitUploadDocumentInputDto.key,
      PartNumber: splitUploadDocumentInputDto.partNum,
      UploadId: splitUploadDocumentInputDto.uploadId,
      Body: splitFile.buffer,
    };
    const partUpload = await s3.uploadPart(partParams).promise();
    const dto = new SplitUploadDocumentOutputDTO();
    dto.ETag = partUpload.ETag;
    dto.PartNumber = partParams.PartNumber;
    return dto;
  }

  async completeSplitUpload(id: number, completeSplitUploadDocumentDto: CompleteSplitUploadDocumentDTO): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const doc = await queryRunner.manager.findOne(Document, id);
      if (doc) {
        if (completeSplitUploadDocumentDto.isSuccess) {
          doc.status = DocumentStatus.PERMANENT;
          doc.fileName = completeSplitUploadDocumentDto.fileName;
          await queryRunner.manager.save(doc);
          const s3 = new AWS.S3({
            region: 'ap-northeast-1',
            signatureVersion: 'v4',
          });
          const doneParams = {
            Bucket: 'nest-typeorm',
            Key: completeSplitUploadDocumentDto.key,
            MultipartUpload: completeSplitUploadDocumentDto.multipartUpload,
            UploadId: completeSplitUploadDocumentDto.uploadId,
          };
          await s3
            .completeMultipartUpload(doneParams)
            .promise()
            .then(() => {
              console.log('Complete!!!!!!!!!!!!!');
            });
        } else {
          await queryRunner.manager.remove(doc);
        }
      }
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

  async getObject(id: number): Promise<GetDocumentDTO> {
    const doc = await this.repository.findOne(id);
    if (!doc) {
      throw Error('NOT FOUND id:' + id);
    }
    const s3 = new AWS.S3({ region: 'ap-northeast-1', signatureVersion: 'v4' });
    const key = doc.originalObjectKey;
    // 前提1: 対象のS3にバケット"nest-typeorm"を作成
    // 前提2: 上記のバケットにおいてGETに対するCORSを許可
    const presignedUrl = s3.getSignedUrl('getObject', {
      // ContentType: type,
      Bucket: 'nest-typeorm',
      Key: key,
      // 最小で1sec、最大で604800sec(7日間)まで設定可能
      Expires: 60,
    });

    // DTOの作成
    const dto = new GetDocumentDTO();
    dto.s3PresignedURL = presignedUrl;
    dto.fileName = doc.fileName;
    dto.contentType = doc.originalObjectContentType;
    return dto;
  }

  async putObject(): Promise<void> {
    const s3 = new AWS.S3({ region: 'ap-northeast-1', signatureVersion: 'v4' });
    const dateString = getDateString();
    const key = 'document/' + dateString;
    // 前提1: 対象のS3にバケット"nest-typeorm"を作成
    // 前提2: 上記のバケットにおいてGETに対するCORSを許可
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const presignedUrl = await s3.getSignedUrlPromise('putObject', {
      // ContentType: type,
      Bucket: 'nest-typeorm',
      Key: key,
      // 最小で1sec、最大で604800sec(7日間)まで設定可能
      Expires: 60,
    });

    console.log(process.cwd());
    const buffer = fs.readFileSync('./src/asset/test_001.pdf');

    await s3
      .putObject({
        Bucket: 'nest-typeorm',
        Key: key,
        ContentType: 'application/pdf',
        Body: buffer,
      })
      .promise()
      /*
    return axios.put(presignedUrl, buffer, {
      headers: {
        'Content-Type': 'application/pdf'
      }
    }) */
      .then(res => {
        console.log(res);
        return;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
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
}
