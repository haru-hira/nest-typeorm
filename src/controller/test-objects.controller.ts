import { Controller, Get, Post, Param, Body, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TestObjectsService } from '../service/test-objects.service';
import { CreateTestDataDTO, UpdateTestDataDTO } from '../dto/test-objects.dto';
import { TestObjects } from '../entity/test-objects';

@Controller('test-objects')
@ApiTags('test-objects')
export class TestObjectsController {
  constructor(private readonly service: TestObjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'test-object の一覧取得' })
  @ApiResponse({ status: HttpStatus.OK, type: [TestObjects], description: '一覧の取得に成功' })
  all(): Promise<TestObjects[]> {
    return this.service.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '任意の test-object の取得' })
  @ApiResponse({ status: HttpStatus.OK, type: TestObjects, description: '取得に成功' })
  one(@Param('id') id: number): Promise<TestObjects> {
    return this.service.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'test-object の新規作成' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TestObjects, description: '作成に成功' })
  async create(@Body() createTestDataDto: CreateTestDataDTO): Promise<TestObjects> {
    return this.service.create(createTestDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '任意の test-object の変更' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '変更に成功' })
  async update(@Param('id') id: number, @Body() updateTestDataDto: UpdateTestDataDTO): Promise<void> {
    this.service.update(id, updateTestDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '任意の test-object の削除' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '削除に成功' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    this.service.remove(id);
  }
}
