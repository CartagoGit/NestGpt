import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if a property that is not in the DTO is found
      transform: true, // Transform the received data to the DTO type
    }),
  )
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
