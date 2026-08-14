import type { Grade } from "@/lib/types";

const TONE: Record<Grade, string> = {
  A: "text-moss border-moss",
  B: "text-moss border-moss",
  C: "text-amber border-amber",
  D: "text-oxide border-oxide",
  F: "text-oxide border-oxide",
};

export function ScoreMark({
  score,
  grade,
  size = "lg",
}: {
  score: number;
  grade: Grade;
  size?: "sm" | "lg";
}) {
  const box = size === "lg" ? "h-28 w-28 text-4xl" : "h-16 w-16 text-2xl";
  return (
    <div
      className={`flex flex-col items-center justify-center border-2 bg-paper ${box} ${TONE[grade]}`}
    >
      <span className="font-serif leading-none">{grade}</span>
      <span className="mt-1 font-mono text-[10px] tracking-widest text-smoke">
        {score}
      </span>
    </div>
  );
}
