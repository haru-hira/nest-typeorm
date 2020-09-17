import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TestObjectsModule } from './module/test-objects.module';
import { TypeOrmConfigService } from './service/typeorm-config.service';
import { UserModule } from './module/user.module';
import { QuestionModule } from './module/question.module';
import { DocumentModule } from './module/document.module';
import { ClosureModule } from './module/closure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TestObjectsModule,
    UserModule,
    QuestionModule,
    DocumentModule,
    ClosureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
