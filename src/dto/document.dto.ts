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

export class InitUploadDocumentInputDTO {
  @ApiProperty({
    description: 'contentType.'
  })
  contentType!: string;
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

  @ApiProperty({
    description: 'document id.'
  })
  id!: number;
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
    description: 'upload success or not.'
  })
  isSuccess!: boolean;

  @ApiPropertyOptional({
    description: 'upload_id.'
  })
  uploadId?: string;

  @ApiPropertyOptional({
    description: 'key.'
  })
  key?: string;

  @ApiPropertyOptional({
    description: 'array of ETag and PartNumber.'
  })
  multipartUpload?: S3.CompletedMultipartUpload;

  @ApiPropertyOptional({
    description: 'file name.'
  })
  fileName?: string;
}

export class GetDocumentDTO {
  @ApiProperty({
    description: 'Presigned URL.'
  })
  s3PresignedURL!: string;

  @ApiProperty({
    description: 'file name with extension.'
  })
  fileName!: string;

  @ApiProperty({
    description: 'content-type.'
  })
  contentType!: string;
}