import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closure } from 'src/entity/closure';
import { ClosureService } from 'src/service/closure.service';
import { ClosureController } from 'src/controller/closure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Closure])],
  exports: [TypeOrmModule],
  providers: [ClosureService],
  controllers: [ClosureController],
})
export class ClosureModule {}
