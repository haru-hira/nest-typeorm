import { Controller, Get, Param, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DocumentService } from '../service/document.service';
import { InitUploadDocumentDTO } from '../dto/document.dto';

@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('init-upload/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '文書アップロード用の初期化' })
  @ApiResponse({ status: HttpStatus.OK, type: InitUploadDocumentDTO,  description: '初期化に成功' })
  async initUpload(@Param('id') id: number): Promise<InitUploadDocumentDTO> {
    return this.documentService.initUpload(id);
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'S3への文書アップロード' })
  @ApiResponse({ status: HttpStatus.CREATED, type: InitUploadDocumentDTO,  description: 'アップロードに成功' })
  async upload(): Promise<void> {
    await this.documentService.upload(1);
    return;
  }
}
