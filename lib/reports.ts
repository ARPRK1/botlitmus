import type { Report } from "./types";
import nykaa from "@/data/reports/nykaa.json";
import boat from "@/data/reports/boat.json";
import razorpay from "@/data/reports/razorpay.json";
import groww from "@/data/reports/groww.json";
import zerodha from "@/data/reports/zerodha.json";

const ALL: Report[] = [
  zerodha as Report,
  razorpay as Report,
  groww as Report,
  nykaa as Report,
  boat as Report,
];

export function allReports(): Report[] {
  return [...ALL].sort((a, b) => b.score - a.score);
}

export function getReport(slug: string): Report | undefined {
  return ALL.find((r) => r.slug === slug);
}

export function reportCount(): number {
  return ALL.length;
}
