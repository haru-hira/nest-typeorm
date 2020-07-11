import { ApiProperty } from "@nestjs/swagger";

export class InitUploadDocumentDTO {
  @ApiProperty({
    description: 'Presigned URL.'
  })
  s3PresignedURL!: string;

  @ApiProperty({
    description: 'document id.'
  })
  id!: string;

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
