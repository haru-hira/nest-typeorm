import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuestionService } from '../service/question.service';
import { CreateQuestionDataDTO, UpdateQuestionDataDTO } from '../dto/question.dto';
import { Question } from '../entity/question';

@Controller('question')
@ApiTags('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'question の一覧取得'})
  @ApiResponse({ status: HttpStatus.OK, type: [Question],  description: '一覧の取得に成功' })
  all(): Promise<Question[]> {
    return this.questionService.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '任意の question の取得'})
  @ApiResponse({ status: HttpStatus.OK, type: Question,  description: '取得に成功' })
  one(@Param('id') id: number): Promise<Question> {
    return this.questionService.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'question の新規作成'})
  @ApiResponse({ status: HttpStatus.CREATED, type: Question,  description: '作成に成功' })
  async create(
    @Body() createUserDataDto: CreateQuestionDataDTO,
  ): Promise<Question> {
    return this.questionService.create(createUserDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '任意の question の変更'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '変更に成功' })
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDataDto: UpdateQuestionDataDTO,
  ): Promise<void> {
    this.questionService.update(id, updateQuestionDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '任意の question の削除'})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '削除に成功' })
  async remove(@Param('id') id: number): Promise<void> {
    this.questionService.remove(id);
  }
}
