import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  const port = (process.env.SERVER_PORT) ? process.env.SERVER_PORT : 3000;
  await app.listen(port);
}
bootstrap();
