import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../entity/document';
import { DocumentService } from '../service/document.service';
import { DocumentController } from '../controller/document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  exports: [TypeOrmModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
