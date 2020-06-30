import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectsModule } from './test-objects/test-objects.module';
import { TestObjects } from './test-objects/test-objects';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest_typeorm',
      entities: [TestObjects],
      synchronize: true,
      logging: true,
    }),
    TestObjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}