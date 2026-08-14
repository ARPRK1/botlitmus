export type Severity = "critical" | "high" | "medium" | "low";

export type FindingType =
  | "contradiction"
  | "overclaim"
  | "stale"
  | "missing"
  | "buried"
  | "bot-opacity";

export type DimensionKey =
  | "internal"
  | "surface"
  | "staleness"
  | "coverage"
  | "escalation"
  | "botSurface";

export type Grade = "A" | "B" | "C" | "D" | "F";

export type ScoreSource = "editor+rubric" | "heuristic";

export type Evidence = {
  url: string;
  quote: string;
  accessedAt: string;
};

export type Finding = {
  id: string;
  severity: Severity;
  type: FindingType;
  title: string;
  whyItHurts: string;
  fix: string;
  evidence: Evidence[];
};

export type DimensionScore = {
  key: DimensionKey;
  label: string;
  weight: number;
  score: number;
  note: string;
};

export type WidgetSignal = {
  vendor: string;
  evidence: string;
};

export type Report = {
  slug: string;
  brand: string;
  sector: string;
  country: string;
  homepage: string;
  helpUrls: string[];
  scannedAt: string;
  scoreSource: ScoreSource;
  crawlQuality: "full" | "partial" | "blocked";
  crawlNote: string;
  summary: string;
  score: number;
  grade: Grade;
  dimensions: DimensionScore[];
  findings: Finding[];
  widgets: WidgetSignal[];
  pagesFetched: { url: string; ok: boolean; title?: string }[];
  editor?: string;
};

export const DIMENSION_WEIGHTS: Record<DimensionKey, number> = {
  internal: 25,
  surface: 20,
  staleness: 15,
  coverage: 20,
  escalation: 10,
  botSurface: 10,
};

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  internal: "Internal consistency",
  surface: "Help vs marketing",
  staleness: "Freshness",
  coverage: "High-intent coverage",
  escalation: "Path to a human",
  botSurface: "Bot / chat honesty",
};
