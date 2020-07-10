import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { InitUploadDocumentDTO } from 'src/dto/document.dto';
import { Document } from 'src/entity/document'
import * as AWS from 'aws-sdk';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async initUpload(id: number): Promise<InitUploadDocumentDTO> {
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
    const dto = new InitUploadDocumentDTO();
    dto.key = params.Key;
    const result = await s3.createMultipartUpload(params).promise();
    console.log("Success:UploadId", result.UploadId);

    dto.uploadId = result.UploadId;
    return dto;
  }
}
