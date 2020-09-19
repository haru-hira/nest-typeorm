import { Controller, Get, Post, Param, Body, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserDataDTO, UpdateUserDataDTO } from '../dto/user.dto';
import { User } from '../entity/user';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'user の一覧取得' })
  @ApiResponse({ status: HttpStatus.OK, type: [User], description: '一覧の取得に成功' })
  all(): Promise<User[]> {
    return this.userService.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '任意の user の取得' })
  @ApiResponse({ status: HttpStatus.OK, type: User, description: '取得に成功' })
  one(@Param('id') id: number): Promise<User> {
    return this.userService.one(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'user の新規作成' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User, description: '作成に成功' })
  async create(@Body() createUserDataDto: CreateUserDataDTO): Promise<User> {
    return this.userService.create(createUserDataDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '任意の user の変更' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '変更に成功' })
  async update(@Param('id') id: number, @Body() updateUserDataDto: UpdateUserDataDTO): Promise<void> {
    this.userService.update(id, updateUserDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '任意の user の削除' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '削除に成功' })
  async remove(@Param('id') id: number): Promise<void> {
    this.userService.remove(id);
  }

  @Put('lock/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '10秒間のlock。のちにprofile.genderを交互に変更(male/female)' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '変更に成功' })
  async lock(@Param('id') id: number): Promise<void> {
    await this.userService.lock10sec(id);
    return;
  }
}
