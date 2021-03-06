import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Nest.js with TypeORM(PostgreSQL)')
    .addBearerAuth(
      {
        type: 'http',
        description: "以下のヘッダーを付与してAPIリクエストを実行します。<br/>Authorization: 'Bearer {Value}'",
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Request entity payload limit to 50 MB.
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Validator
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;
  await app.listen(port);
}
bootstrap();
