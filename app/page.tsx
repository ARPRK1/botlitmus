import Link from "next/link";
import { ScoreMark } from "@/components/ScoreMark";
import { allReports } from "@/lib/reports";

export default function HomePage() {
  const reports = allReports();

  return (
    <div>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
            India · public record · v0.1
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
            Does this help centre tell the truth?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85 sm:text-xl">
            BotLitmus reads the pages a customer can actually open. We score
            whether the refund clock, the phone number, and the homepage slogan
            are the same story. Not CSAT. Not brand love.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/scan"
              className="border border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper"
            >
              Scan a URL
            </Link>
            <Link
              href="/method"
              className="border border-ink px-5 py-3 font-mono text-xs uppercase tracking-widest"
            >
              Read the method
            </Link>
          </div>
        </div>
      </section>

      <section id="league" className="mx-auto max-w-5xl px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl">First league</h2>
            <p className="mt-2 max-w-xl text-smoke">
              Five Indian properties, fetched 14 Aug 2026. Partial crawls are
              labelled. A high score is Zerodha-shaped: a map, not a slogan.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            {reports.length} published
          </p>
        </div>

        <ol className="mt-8 divide-y divide-rule border-y border-rule">
          {reports.map((r, i) => (
            <li key={r.slug}>
              <Link
                href={`/report/${r.slug}`}
                className="flex items-center gap-5 py-5 hover:bg-white/40"
              >
                <span className="w-6 font-mono text-sm text-smoke">{i + 1}</span>
                <ScoreMark score={r.score} grade={r.grade} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-2xl leading-none">{r.brand}</p>
                  <p className="mt-2 truncate text-sm text-smoke">
                    {r.sector} · {r.crawlQuality} crawl · {r.findings.length} findings
                  </p>
                </div>
                <span className="hidden font-mono text-[11px] uppercase tracking-widest text-smoke sm:block">
                  Open report
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
