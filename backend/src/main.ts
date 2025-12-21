import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common'; // ✅ import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // --------------------------
  // Enable global validation
  // --------------------------
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove properties that are not in DTO
    forbidNonWhitelisted: true, // throw error if extra properties are sent
    transform: true, // automatically transform payloads to DTO instances
  }));

  const port = process.env.PORT ?? 3004;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

