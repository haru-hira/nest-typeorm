import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectsService } from '../service/test-objects.service';
import { TestObjectsController } from '../controller/test-objects.controller';
import { TestObjects } from '../entity/test-objects';

@Module({
  imports: [TypeOrmModule.forFeature([TestObjects])],
  exports: [TypeOrmModule],
  providers: [TestObjectsService],
  controllers: [TestObjectsController],
})
export class TestObjectsModule {}
