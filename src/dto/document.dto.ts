import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
