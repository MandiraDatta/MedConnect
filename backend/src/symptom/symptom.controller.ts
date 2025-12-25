import { Body, Controller, Post } from '@nestjs/common';
import { SymptomService } from './symptom.service';

@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post('check')
async check(@Body() body: { symptoms: string }) {
  return await this.symptomService.checkSymptoms(body);
}
}
