import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { InitUploadDocumentDTO } from 'src/dto/document.dto';
import { Document } from 'src/entity/document'

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly repository: Repository<Document>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initUpload(id: number): Promise<InitUploadDocumentDTO> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {  
      const doc = new Document();
      doc.fileName = 'test.pdf';
      doc.originalObjectKey = '';
      doc.originalObjectContentType = 'application/pdf';
      await queryRunner.manager.save(doc);

      const dto = new InitUploadDocumentDTO();
      dto.uploadId = '';
      dto.key = '';
      await queryRunner.commitTransaction();
      return dto;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

}
