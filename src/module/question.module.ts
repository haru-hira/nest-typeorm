import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../entity/question';
import { Category } from '../entity/category';
import { QuestionService } from '../service/question.service';
import { QuestionController } from '../controller/question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category])],
  exports: [TypeOrmModule],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
