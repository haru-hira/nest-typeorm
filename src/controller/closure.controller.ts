import { Controller, HttpCode, HttpStatus, Post, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Closure } from 'src/entity/closure';
import { CreateClosureDataDTO } from 'src/dto/closure.dto';
import { ClosureService } from 'src/service/closure.service';

@Controller('closure')
@ApiTags('closure')
export class ClosureController {
  constructor(private readonly closureService: ClosureService) {}

  @Post(':parantId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'closure の新規作成' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Closure, description: '作成に成功' })
  async create(@Param('parantId') parantId: number, @Body() dto: CreateClosureDataDTO): Promise<Closure[]> {
    return this.closureService.create(parantId, dto);
  }
}
