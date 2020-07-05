import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectsService } from '../service/test-objects.service';
import { TestObjectsController } from '../controller/test-objects.controller';
import { TestObjects } from '../entity/test-objects';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { User } from '../entity/user';
import { Profile } from '../entity/profile';
import { Question } from 'src/entity/question';
import { Photo } from 'src/entity/photo';
import { Category } from 'src/entity/category';
import { QuestionService } from 'src/service/question.service';
import { QuestionController } from 'src/controller/question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestObjects, User, Profile, Photo, Question, Category])],
  exports: [TypeOrmModule],
  providers: [TestObjectsService, UserService, QuestionService],
  controllers: [TestObjectsController, UserController, QuestionController],
})
export class TestObjectsModule {}
