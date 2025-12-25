import { Injectable } from '@nestjs/common';
import { GeminiService } from '../ai/gemini.service';
import { hasRedFlag } from '../ai/safety.rules';

@Injectable()
export class SymptomService {
  constructor(private readonly gemini: GeminiService) {}

  async checkSymptoms(data: { symptoms: string }) {
    // 1️⃣ Emergency check (NO AI)
    if (hasRedFlag(data.symptoms)) {
  return {
    emergency: true,
    message:
      '⚠️ This may indicate a medical emergency. Please contact a nearby hospital or emergency services immediately.',
  };
}


    // 2️⃣ Build SAFE prompt (NO strict JSON)
    const prompt = `
You are a medical assistant AI.

Analyze the following symptoms and give:
- Possible causes
- Severity level (Low / Medium)
- Simple home-care advice
- Clear disclaimer

Symptoms:
${data.symptoms}
`;

    // 3️⃣ Call Gemini safely
    let aiText = '';
    try {
      aiText = await this.gemini.generateContentFromText(prompt);
    } catch (error) {
      console.error('Gemini API error:', error);
    }

    // 4️⃣ Fallback if AI fails
    if (!aiText) {
  return {
    emergency: false,
    message:
      'Symptoms do not appear critical at the moment. Please monitor your condition and consult a doctor if it worsens.',
  };
}


    // 5️⃣ Success response (NO JSON parsing)
    return {
      emergency: false,
      analysis: aiText,
      disclaimer: 'This is not a medical diagnosis.',
    };
  }
}
