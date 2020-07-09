import { Controller, Get, Post, Param, Body, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TestObjectsService } from '../service/test-objects.service';
import { CreateTestDataDTO, UpdateTestDataDTO } from '../dto/test-objects.dto';
import { TestObjects } from '../entity/test-objects';

@Controller('test-objects')
export class TestObjectsController {
  constructor(private readonly service: TestObjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  all(): Promise<TestObjects[]> {
    return this.service.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  one(@Param('id') id: number): Promise<TestObjects> {
    return this.service.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @Body() createTestDataDto: CreateTestDataDTO,
  ): Promise<TestObjects> {
    return this.service.create(createTestDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async update(
    @Param('id') id: number,
    @Body() updateTestDataDto: UpdateTestDataDTO,
  ): Promise<void> {
    this.service.update(id, updateTestDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    this.service.remove(id);
  }
}
