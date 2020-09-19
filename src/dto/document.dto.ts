import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { S3 } from 'aws-sdk';

export class InitUploadDocumentDTO {
  @ApiProperty({
    description: 'Presigned URL.',
  })
  s3PresignedURL!: string;

  @ApiProperty({
    description: 'document id.',
  })
  id!: number;
}

export class CompleteUploadDocumentDTO {
  @IsBoolean()
  @ApiProperty({
    description: 'upload success or not.',
  })
  isSuccess!: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'file name.',
  })
  fileName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'content type.',
  })
  contentType?: string;
}

export class InitUploadDocumentInputDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'contentType.',
  })
  contentType!: string;
}

export class InitSplitUploadDocumentDTO {
  @ApiProperty({
    description: 'upload_id.',
  })
  uploadId!: string;

  @ApiProperty({
    description: 'key.',
  })
  key!: string;

  @ApiProperty({
    description: 'document id.',
  })
  id!: number;
}

export class SplitUploadDocumentInputDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'upload_id.',
  })
  uploadId!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'key.',
  })
  key!: string;

  @IsInt()
  @Min(1)
  @Max(10000)
  @Type(() => Number)
  @ApiProperty({
    description: 'Part number that identifies the part. This is a positive integer between 1 and 10,000.',
  })
  partNum!: S3.PartNumber;
}

export class SplitUploadDocumentOutputDTO {
  @ApiProperty({
    description: 'Entity tag returned when the part was uploaded.',
  })
  ETag!: S3.ETag;

  @ApiProperty({
    description: 'Part number that identifies the part. This is a positive integer between 1 and 10,000.',
  })
  PartNumber!: S3.PartNumber;
}

export class CompleteSplitUploadDocumentDTO {
  @IsBoolean()
  @ApiProperty({
    description: 'upload success or not.',
  })
  isSuccess!: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'upload_id.',
  })
  uploadId?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'key.',
  })
  key?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'array of ETag and PartNumber.',
  })
  multipartUpload?: S3.CompletedMultipartUpload;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'file name.',
  })
  fileName?: string;
}

export class GetDocumentDTO {
  @ApiProperty({
    description: 'Presigned URL.',
  })
  s3PresignedURL!: string;

  @ApiProperty({
    description: 'file name with extension.',
  })
  fileName!: string;

  @ApiProperty({
    description: 'content-type.',
  })
  contentType!: string;
}
