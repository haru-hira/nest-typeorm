import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { S3 } from "aws-sdk";

export class InitUploadDocumentDTO {
  @ApiProperty({
    description: 'Presigned URL.'
  })
  s3PresignedURL!: string;

  @ApiProperty({
    description: 'document id.'
  })
  id!: number;
}

export class CompleteUploadDocumentDTO {
  @ApiProperty({
    description: 'upload success or not.'
  })
  isSuccess!: boolean;

  @ApiPropertyOptional({
    description: 'file name.'
  })
  fileName?: string;

  @ApiPropertyOptional({
    description: 'content type.'
  })
  contentType?: string;
}

export class InitSplitUploadDocumentDTO {
  @ApiProperty({
    description: 'upload_id.'
  })
  uploadId!: string;

  @ApiProperty({
    description: 'key.'
  })
  key!: string;
}

export class SplitUploadDocumentInputDTO {
  @ApiProperty({
    description: 'upload_id.'
  })
  uploadId!: string;

  @ApiProperty({
    description: 'key.'
  })
  key!: string;

  @ApiProperty({
    description: 'Part number that identifies the part. This is a positive integer between 1 and 10,000.'
  })
  partNum!: S3.PartNumber;

  @ApiProperty({
    description: 'splited data.'
  })
  sendData!: string;
}

export class SplitUploadDocumentOutputDTO {
  @ApiProperty({
    description: 'Entity tag returned when the part was uploaded.'
  })
  ETag!: S3.ETag;

  @ApiProperty({
    description: 'Part number that identifies the part. This is a positive integer between 1 and 10,000.'
  })
  PartNumber!: S3.PartNumber;
}

export class CompleteSplitUploadDocumentDTO {
  @ApiProperty({
    description: 'upload_id.'
  })
  uploadId!: string;

  @ApiProperty({
    description: 'key.'
  })
  key!: string;

  @ApiProperty({
    description: 'array of ETag and PartNumber.'
  })
  multipartUpload!: S3.CompletedMultipartUpload;
}