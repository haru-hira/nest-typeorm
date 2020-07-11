import { Controller, Get, Param, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DocumentService } from '../service/document.service';
import { InitUploadDocumentDTO, InitSplitUploadDocumentDTO } from '../dto/document.dto';

@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('init-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'アップロード用オブジェクト(Presigned URL 含む)の取得' })
  @ApiResponse({ status: HttpStatus.OK, type: InitUploadDocumentDTO,  description: '初期化に成功' })
  async initUpload(): Promise<InitUploadDocumentDTO> {
    return this.documentService.initUpload();
  }

  @Get('init-split-upload/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '分割アップロード用の初期化' })
  @ApiResponse({ status: HttpStatus.OK, type: InitSplitUploadDocumentDTO,  description: '初期化に成功' })
  async initSplitUpload(@Param('id') id: number): Promise<InitSplitUploadDocumentDTO> {
    return this.documentService.initSplitUpload(id);
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'S3への分割アップロード' })
  @ApiResponse({ status: HttpStatus.CREATED, type: InitSplitUploadDocumentDTO,  description: '分割アップロードに成功' })
  async upload(): Promise<void> {
    await this.documentService.upload(1);
    return;
  }
}
