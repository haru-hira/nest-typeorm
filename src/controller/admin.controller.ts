import { Controller, UseGuards, Post, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from '../service/admin.service';

@Controller('admin')
@ApiTags('adimin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ログイン/jwtトークンの取得' })
  @ApiResponse({ status: HttpStatus.OK, description: 'ログインに成功' })
  login(): any {
    return this.adminService.sign();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/status')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'jwt認証の確認' })
  @ApiResponse({ status: HttpStatus.OK, description: 'jwt認証に成功' })
  status(@Request() req: { user: { name: string; isAdmin: boolean } }): { name: string; isAdmin: boolean } {
    return req.user;
  }
}
