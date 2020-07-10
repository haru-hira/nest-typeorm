import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DocumentService } from '../service/document.service';
import { InitUploadDocumentDTO } from '../dto/document.dto';

@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('init-upload/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '文書アップロード用の初期化'})
  @ApiResponse({ status: HttpStatus.OK, type: InitUploadDocumentDTO,  description: '初期化に成功' })
  initUpload(@Param('id') id: number): Promise<InitUploadDocumentDTO> {
    return this.documentService.initUpload(id);
  }
}
