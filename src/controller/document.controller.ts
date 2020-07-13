import { Controller, Get, Param, HttpCode, HttpStatus, Post, Put, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags, ApiOperation, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { DocumentService } from '../service/document.service';
import { InitUploadDocumentDTO, InitSplitUploadDocumentDTO, CompleteUploadDocumentDTO, CompleteSplitUploadDocumentDTO, SplitUploadDocumentInputDTO, SplitUploadDocumentOutputDTO } from '../dto/document.dto';

@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('init-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'アップロード用オブジェクト(Presigned URL 含む)の取得' })
  @ApiResponse({ status: HttpStatus.OK, type: InitUploadDocumentDTO,  description: '初期化に成功' })
  async initUpload(): Promise<InitUploadDocumentDTO> {
    return await this.documentService.initUpload();
  }

  @Put('complete-upload/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'アップロードの完了通知'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '通知に成功' })
  async completeUpdate(
    @Param('id') id: number,
    @Body() completeUploadDocumentDto: CompleteUploadDocumentDTO,
  ): Promise<void> {
    await this.documentService.completeUpload(id, completeUploadDocumentDto);
    return;
  }

  @Get('init-split-upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '分割アップロード用の初期化' })
  @ApiResponse({ status: HttpStatus.OK, type: InitSplitUploadDocumentDTO,  description: '初期化に成功' })
  async initSplitUpload(): Promise<InitSplitUploadDocumentDTO> {
    return await this.documentService.initSplitUpload();
  }

  @Post('split-upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('splitFile'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'S3への分割アップロード(複数回呼ばれる想定)' })
  @ApiParam({ name: "splitFile", required: true, description: 'type: Fileオブジェクトをsliceして作成したBlob' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SplitUploadDocumentOutputDTO,  description: '単一の分割アップロードに成功' })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async splitUpload(
    @UploadedFile() splitFile: any,
    @Body() splitUploadDocumentInputDto: SplitUploadDocumentInputDTO
  ): Promise<SplitUploadDocumentOutputDTO> {
    return await this.documentService.splitUpload(splitFile, splitUploadDocumentInputDto);
  }

  @Put('complete-split-upload/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '分割アップロード全体の完了処理'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '分割アップロードに成功' })
  async completeSplitUpdate(
    @Param('id') id: number,
    @Body() completeSplitUploadDocumentDto: CompleteSplitUploadDocumentDTO,
  ): Promise<void> {
    await this.documentService.completeSplitUpload(id, completeSplitUploadDocumentDto);
    return;
  }
}
