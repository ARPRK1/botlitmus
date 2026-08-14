"use client";

import { useState } from "react";
import type { Report } from "@/lib/types";
import { FindingCard } from "./FindingCard";
import { ScoreMark } from "./ScoreMark";

export function ScanForm() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scan failed");
      setReport(data as Report);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://brand.com/help or a policy URL"
          className="flex-1 border border-ink bg-paper px-3 py-3 font-mono text-sm outline-none focus:bg-white"
          required
        />
        <button
          type="submit"
          disabled={busy}
          className="border border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper disabled:opacity-50"
        >
          {busy ? "Reading pages…" : "Run first pass"}
        </button>
      </form>
      {error && <p className="mt-4 font-mono text-sm text-oxide">{error}</p>}
      {report && (
        <div className="mt-10">
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-rule pb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
                Heuristic · not a league score
              </p>
              <h2 className="mt-2 text-3xl">{report.brand}</h2>
              <p className="mt-2 max-w-xl text-[17px] leading-relaxed">{report.crawlNote}</p>
            </div>
            <ScoreMark score={report.score} grade={report.grade} />
          </div>
          <div className="mt-8 grid gap-4">
            {report.findings.length === 0 && (
              <p className="text-smoke">No automatic findings. That is not a clean bill of health.</p>
            )}
            {report.findings.map((f) => (
              <FindingCard key={f.id} finding={f} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
