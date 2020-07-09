import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { CreateQuestionDataDTO, UpdateQuestionDataDTO } from '../dto/question.dto';
import { Question } from '../entity/question';

@Controller('question')
@ApiTags('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  all(): Promise<Question[]> {
    return this.questionService.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  one(@Param('id') id: number): Promise<Question> {
    return this.questionService.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @Body() createUserDataDto: CreateQuestionDataDTO,
  ): Promise<Question> {
    return this.questionService.create(createUserDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDataDto: UpdateQuestionDataDTO,
  ): Promise<void> {
    this.questionService.update(id, updateQuestionDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param('id') id: number): Promise<void> {
    this.questionService.remove(id);
  }
}
