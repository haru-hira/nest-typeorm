import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/entity/document';
import { DocumentService } from 'src/service/document.service';
import { DocumentController } from 'src/controller/document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  exports: [TypeOrmModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
