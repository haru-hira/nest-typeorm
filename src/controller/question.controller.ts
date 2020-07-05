import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { QuestionService } from '../service/question.service';
import { CreateQuestionDataDTO } from '../dto/question.dto';
import { Question } from '../entity/question';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  all(): Promise<Question[]> {
    return this.questionService.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  one(@Param('id') id: number): Promise<Question> {
    return this.questionService.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDataDto: CreateQuestionDataDTO,
  ): Promise<Question> {
    return this.questionService.create(createUserDataDto);
  }
}
