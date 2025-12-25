import { Module } from '@nestjs/common';
import { SymptomController } from './symptom.controller';
import { SymptomService } from './symptom.service';
import { AiModule } from '../ai/ai.module'; // 👈 IMPORTANT

@Module({
  imports: [AiModule], // 👈 THIS LINE FIXES THE ERROR
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
