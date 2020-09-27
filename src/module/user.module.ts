import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { User } from '../entity/user';
import { Profile } from '../entity/profile';
import { Photo } from '../entity/photo';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Photo])],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
