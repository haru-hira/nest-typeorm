import { ApiProperty } from "@nestjs/swagger";

export class InitUploadDocumentDTO {
  @ApiProperty({
    description: 'upload_id.'
  })
  uploadId!: string;

  @ApiProperty({
    description: 'key.'
  })
  key!: string;

}
