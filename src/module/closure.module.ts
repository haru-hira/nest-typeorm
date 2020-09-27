import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closure } from '../entity/closure';
import { ClosureService } from '../service/closure.service';
import { ClosureController } from '../controller/closure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Closure])],
  exports: [TypeOrmModule],
  providers: [ClosureService],
  controllers: [ClosureController],
})
export class ClosureModule {}
