import { Controller, Post, Body } from '@nestjs/common';
import { SymptomService } from './symptom.service';

@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post('analyze')
  analyzeSymptoms(@Body() body: { symptoms: string[] }) {
    return this.symptomService.analyze(body.symptoms);
  }
}
