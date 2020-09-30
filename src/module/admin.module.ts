import { Module } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from '../controller/admin.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
export const JWT_SECRET_KEY = 'jwtSecretKey';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AdminService, LocalStrategy, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
