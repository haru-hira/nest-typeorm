import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = (process.env.SERVER_PORT) ? process.env.SERVER_PORT : 3000;
  await app.listen(port);
}
bootstrap();
