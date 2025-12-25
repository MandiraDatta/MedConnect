const RED_FLAGS = [
  'chest pain',
  'shortness of breath',
  'severe bleeding',
  'loss of consciousness',
  'heart attack',
  'stroke'
];


export function hasRedFlag(symptoms: string): boolean {
  const text = symptoms.toLowerCase();
  return RED_FLAGS.some(flag => text.includes(flag));
}
