import { Module } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from '../controller/admin.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
import * as fs from 'fs';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: fs.readFileSync('./src/asset/private-key.pem'),
      signOptions: { expiresIn: '100y', algorithm: 'RS256' },
    }),
  ],
  providers: [AdminService, LocalStrategy, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
