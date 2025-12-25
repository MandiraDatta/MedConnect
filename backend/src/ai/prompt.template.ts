export function buildSymptomPrompt(symptoms: string): string {
  return `
You are a medical AI assistant.

User symptoms:
"${symptoms}"

Tasks:
1. Identify possible causes (non-diagnostic)
2. Suggest care level (home care / doctor visit / emergency)
3. Give safe advice
4. DO NOT diagnose

Respond in clear bullet points.
`;
}
