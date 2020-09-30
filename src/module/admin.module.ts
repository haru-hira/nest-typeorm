import { Module } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { AdminController } from '../controller/admin.controller';

@Module({
  imports: [PassportModule],
  providers: [AdminService, LocalStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
