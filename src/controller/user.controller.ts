import { Controller, Get, Post, Param, Body, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDataDTO, UpdateUserDataDTO } from '../dto/user.dto';
import { User } from '../entity/user';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  all(): Promise<User[]> {
    return this.userService.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  one(@Param('id') id: number): Promise<User> {
    return this.userService.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @Body() createUserDataDto: CreateUserDataDTO,
  ): Promise<User> {
    return this.userService.create(createUserDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async update(
    @Param('id') id: number,
    @Body() updateUserDataDto: UpdateUserDataDTO,
  ): Promise<void> {
    this.userService.update(id, updateUserDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(@Param('id') id: number): Promise<void> {
    this.userService.remove(id);
  }
}
