import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectsService } from '../service/test-objects.service';
import { TestObjectsController } from '../controller/test-objects.controller';
import { TestObjects } from '../entity/test-objects';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { User } from '../entity/user';
import { Profile } from '../entity/profile';

@Module({
  imports: [TypeOrmModule.forFeature([TestObjects, User, Profile])],
  exports: [TypeOrmModule],
  providers: [TestObjectsService, UserService],
  controllers: [TestObjectsController, UserController],
})
export class TestObjectsModule {}
