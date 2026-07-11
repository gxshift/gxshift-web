import { EstimationResult, EstimationResultSchema } from './schema';
import { getFallbackEstimation } from './fallback';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

function buildPrompt(currentRank: string, targetRank: string, notes?: string): string {
  return `
Kamu adalah sistem analis data gaming profesional untuk platform GXShift.com.
Tugasmu adalah mengestimasi waktu yang dibutuhkan oleh pro-player (win rate 75-85%) untuk melakukan rank boost game Mobile Legends.

Konteks Order:
- Rank Saat Ini: ${currentRank}
- Target Rank: ${targetRank}
- Catatan Tambahan: ${notes || 'Tidak ada'}

Aturan Output:
Kamu WAJIB mengembalikan respons HANYA dalam format JSON yang valid, tanpa markdown \`\`\`json, dengan struktur:
{
  "estimated_days": integer (hari),
  "estimated_hours": integer (jam sisa),
  "confidence_score": integer (0-100),
  "reasoning_short": string (alasan singkat maksimal 2 kalimat),
  "difficulty_label": "EASY" | "MEDIUM" | "HARD" | "EXTREME",
  "fallback_rule_used": false,
  "version": "gemini-1.5-flash"
}
`;
}

export async function estimateGrindingTime(
  currentRank: string, 
  targetRank: string, 
  notes?: string
): Promise<EstimationResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 detik timeout

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(currentRank, targetRank, notes) }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2 // Deterministic
        }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`Gemini API Error: ${response.status}`);
    
    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textOutput) throw new Error("Malformed Gemini response");

    const parsedJson = JSON.parse(textOutput);
    const validated = EstimationResultSchema.parse(parsedJson);
    
    return validated;
  } catch (error) {
    console.error("[AI_ESTIMATION_ERROR]", error);
    // Jika AI gagal (timeout, quota habis, parse error), gunakan fallback
    return getFallbackEstimation(currentRank, targetRank);
  }
}