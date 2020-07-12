import { Controller, Get, Param, HttpCode, HttpStatus, Post, Put, Body } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DocumentService } from '../service/document.service';
import { InitUploadDocumentDTO, InitSplitUploadDocumentDTO, CompleteUploadDocumentDTO } from '../dto/document.dto';

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

  @Put('complete-upload/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'アップロードの完了通知'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '通知に成功' })
  async update(
    @Param('id') id: number,
    @Body() completeUploadDocumentDto: CompleteUploadDocumentDTO,
  ): Promise<void> {
    await this.documentService.completeUpload(id, completeUploadDocumentDto);
  }

  @Get('init-split-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '分割アップロード用の初期化' })
  @ApiResponse({ status: HttpStatus.OK, type: InitSplitUploadDocumentDTO,  description: '初期化に成功' })
  async initSplitUpload(): Promise<InitSplitUploadDocumentDTO> {
    return this.documentService.initSplitUpload();
  }

  @Post('split-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'S3への分割アップロード' })
  @ApiResponse({ status: HttpStatus.CREATED, type: InitSplitUploadDocumentDTO,  description: '分割アップロードに成功' })
  async upload(): Promise<void> {
    await this.documentService.splitUpload(1);
    return;
  }
}
