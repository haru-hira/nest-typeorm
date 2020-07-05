import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { CreateQuestionDataDTO } from '../dto/question.dto';
import { Question } from '../entity/question';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDataDto: CreateQuestionDataDTO,
  ): Promise<Question> {
    return this.questionService.create(createUserDataDto);
  }
}
