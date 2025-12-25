import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Module({
  providers: [GeminiService],
  exports: [GeminiService], // 👈 this makes Gemini usable elsewhere
})
export class AiModule {}
