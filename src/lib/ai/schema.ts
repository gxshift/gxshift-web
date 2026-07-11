import { z } from 'zod';

export const EstimationResultSchema = z.object({
  estimated_days: z.number().int().min(0),
  estimated_hours: z.number().int().min(0),
  confidence_score: z.number().min(0).max(100),
  reasoning_short: z.string(),
  difficulty_label: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXTREME']),
  fallback_rule_used: z.boolean(),
  version: z.string()
});

export type EstimationResult = z.infer<typeof EstimationResultSchema>;