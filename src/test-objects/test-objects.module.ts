import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectsService } from './test-objects.service';
import { TestObjectsController } from './test-objects.controller';
import { TestObjects } from './test-objects';

@Module({
  imports: [TypeOrmModule.forFeature([TestObjects])],
  exports: [TypeOrmModule],
  providers: [TestObjectsService],
  controllers: [TestObjectsController],
})
export class TestObjectsModule {}
