import { Injectable } from '@nestjs/common';

@Injectable()
export class SymptomService {
  analyze(symptoms: string[]) {
    if (symptoms.includes('fever') && symptoms.includes('cough')) {
      return {
        condition: 'Flu',
        severity: 'Medium',
        advice: 'Rest and consult a doctor if symptoms persist',
      };
    }

    if (symptoms.includes('chest pain')) {
      return {
        condition: 'Possible heart issue',
        severity: 'High',
        advice: 'Seek medical attention immediately',
      };
    }

    return {
      condition: 'Unknown',
      severity: 'Low',
      advice: 'Monitor symptoms and consult doctor',
    };
  }
}
