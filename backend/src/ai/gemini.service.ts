import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
  }

  async generateContentFromText(prompt: string): Promise<string> {
  try {
    console.log('📤 Gemini Prompt:', prompt);

    const result = await this.model.generateContent(prompt);

    console.log('📥 Gemini Raw Result:', JSON.stringify(result, null, 2));

    const text =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log('📥 Gemini Extracted Text:', text);

    return text ?? '';
  } catch (error) {
    console.error('❌ Gemini error:', error);
    return '';
  }
}
}
