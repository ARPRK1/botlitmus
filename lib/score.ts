import {
  DIMENSION_LABELS,
  DIMENSION_WEIGHTS,
  type DimensionKey,
  type DimensionScore,
  type Grade,
} from "./types";

export function gradeFromScore(score: number): Grade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 55) return "D";
  return "F";
}

export function clamp(n: number, min = 0, max?: number) {
  const hi = max ?? min;
  if (max === undefined) return Math.max(0, Math.min(100, n));
  return Math.max(min, Math.min(hi, n));
}

export function totalFromDimensions(dimensions: DimensionScore[]): number {
  const weighted = dimensions.reduce((sum, d) => {
    const max = DIMENSION_WEIGHTS[d.key];
    const points = (clamp(d.score, 0, max) / max) * d.weight;
    return sum + points;
  }, 0);
  return Math.round(weighted);
}

export function makeDimension(
  key: DimensionKey,
  score: number,
  note: string
): DimensionScore {
  return {
    key,
    label: DIMENSION_LABELS[key],
    weight: DIMENSION_WEIGHTS[key],
    score: clamp(score, 0, DIMENSION_WEIGHTS[key]),
    note,
  };
}
