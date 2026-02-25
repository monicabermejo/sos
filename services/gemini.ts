/// <reference types="vite/client" />
import { Mission, Language } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function getAIHint(
  mission: Mission,
  language: Language,
  hintIndex: number
): Promise<string> {
  if (!GEMINI_API_KEY) {
    // Fallback to static hint
    return mission.hints[language][hintIndex] ?? mission.hints[language][0];
  }

  const langName = language === 'ca' ? 'catalán' : 'castellano';
  const prompt = `
Eres un asistente educativo para alumnos de 2º ESO que juegan al juego de supervivencia "S.O.S. Isla X".
El alumno está resolviendo esta ecuación de primer grado: ${mission.equation}
La respuesta correcta es x = ${mission.expectedAnswer}.
Contexto de la misión: ${mission.challenge[language]}

Da UNA sola pista (pista número ${hintIndex + 1} de 3, siendo la 3 la más explícita) para ayudar al alumno a resolver la ecuación.
La pista debe ser progresiva: la pista 1 es conceptual, la 2 da una dirección operacional, la 3 casi desvela el cálculo final.
Responde ÚNICAMENTE en ${langName}, de forma amigable, breve (máx 2 frases) y con un emoji al inicio.
NO des la respuesta directamente en pistas 1 y 2.
`.trim();

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 150 },
      }),
    });

    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return text.trim() || (mission.hints[language][hintIndex] ?? mission.hints[language][0]);
  } catch {
    return mission.hints[language][hintIndex] ?? mission.hints[language][0];
  }
}
