import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entity/question';
import { Category } from 'src/entity/category';
import { QuestionService } from 'src/service/question.service';
import { QuestionController } from 'src/controller/question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category])],
  exports: [TypeOrmModule],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
