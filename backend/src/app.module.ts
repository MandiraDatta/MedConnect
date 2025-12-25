import { Module } from '@nestjs/common';
import { SymptomModule } from './symptom/symptom.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    SymptomModule,
    AiModule,   // ✅ correct place for GeminiService
  ],
})
export class AppModule {}
