import type { Metadata } from "next";
import { DIMENSION_WEIGHTS } from "@/lib/types";

export const metadata: Metadata = { title: "Method" };

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-4xl">Method</h1>
      <p className="mt-6 text-lg leading-relaxed">
        We fetch public pages a customer can open without logging in. We look
        for colliding numbers, slogan-versus-policy, missing high-intent
        topics, and whether a human path is real. We do not chat with the bot
        unless a transcript is stored. v1 does not drive Intercom widgets.
      </p>
      <h2 className="mt-10 text-2xl">Weights</h2>
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {Object.entries(DIMENSION_WEIGHTS).map(([k, w]) => (
          <li key={k} className="flex justify-between py-2 font-mono text-sm">
            <span>{k}</span>
            <span>{w}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-smoke">
        Grades: A 90+, B 80+, C 70+, D 55+, F below that. Published reports are
        `editor+rubric`. Live scans are `heuristic`. The full deduction table
        lives in the repo at docs/RUBRIC.md.
      </p>
      <h2 className="mt-10 text-2xl">What we will not do</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
        <li>Invent a quote or a metric.</li>
        <li>Score a site we could not fetch as if we had read it.</li>
        <li>Sell the score to the brand in exchange for taking the report down.</li>
        <li>Call this a live bot audit until we have the reply on file.</li>
      </ul>
    </div>
  );
}
