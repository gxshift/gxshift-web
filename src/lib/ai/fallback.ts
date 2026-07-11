import { ML_RANKS } from '@/lib/constants';
import { EstimationResult } from './schema';

export function getFallbackEstimation(currentRank: string, targetRank: string): EstimationResult {
  const currentIndex = ML_RANKS.indexOf(currentRank as any);
  const targetIndex = ML_RANKS.indexOf(targetRank as any);
  
  const rankDifference = targetIndex - currentIndex;
  const isInvalid = rankDifference <= 0;

  // Asumsi dasar: 1 rank tier (misal Epic V ke Epic IV) butuh ~3 jam
  const totalHours = isInvalid ? 0 : rankDifference * 3;
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  
  let difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME' = 'EASY';
  if (targetIndex >= ML_RANKS.indexOf('Mythic')) difficulty = 'HARD';
  if (targetIndex >= ML_RANKS.indexOf('Mythical Glory')) difficulty = 'EXTREME';

  return {
    estimated_days: days,
    estimated_hours: hours,
    confidence_score: 50, // Confidence rendah karena rule-based statis
    reasoning_short: "Menggunakan kalkulasi fallback statis karena AI service tidak merespon.",
    difficulty_label: difficulty,
    fallback_rule_used: true,
    version: "1.0-fallback"
  };
}