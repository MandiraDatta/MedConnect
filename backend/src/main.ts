import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ADD THIS (VERY IMPORTANT)
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Backend running on http://localhost:${port}`);
}

bootstrap();
