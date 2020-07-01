import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TestObjectsModule } from './module/test-objects.module';
import { TypeOrmConfigService } from './service/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: false
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }),
    TestObjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}