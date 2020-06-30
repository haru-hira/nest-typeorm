import { Controller, Get, Post, Param, Body, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { TestObjectsService } from './test-objects.service';
import { CreateTestDataDTO, UpdateTestDataDTO } from './test-objects.dto';
import { TestObjects } from './test-objects';

@Controller('test-objects')
export class TestObjectsController {
  constructor(private readonly service: TestObjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  all(): Promise<TestObjects[]> {
    return this.service.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  one(@Param('id') id: number): Promise<TestObjects> {
    return this.service.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTestDataDto: CreateTestDataDTO,
  ): Promise<TestObjects> {
    return this.service.create(createTestDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: number,
    @Body() updateTestDataDto: UpdateTestDataDTO,
  ): Promise<void> {
    this.service.update(id, updateTestDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    this.service.remove(id);
  }
}
