import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FindingCard } from "@/components/FindingCard";
import { ScoreMark } from "@/components/ScoreMark";
import { allReports, getReport } from "@/lib/reports";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) return { title: "Report" };
  return {
    title: `${r.brand} scores ${r.grade} (${r.score})`,
    description: r.summary,
  };
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;
  const r = getReport(slug);
  if (!r) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">
        <Link href="/" className="underline">
          League
        </Link>{" "}
        / {r.slug}
      </p>
      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl">{r.brand}</h1>
          <p className="mt-3 text-smoke">
            {r.sector} · scanned {r.scannedAt} · {r.scoreSource}
          </p>
        </div>
        <ScoreMark score={r.score} grade={r.grade} />
      </div>
      <p className="mt-8 text-xl leading-relaxed">{r.summary}</p>
      <p className="mt-4 border-l-2 border-amber pl-4 text-sm text-smoke">
        Crawl: {r.crawlQuality}. {r.crawlNote}
      </p>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-widest text-smoke">
        Dimensions
      </h2>
      <ul className="mt-3 divide-y divide-rule border-y border-rule">
        {r.dimensions.map((d) => (
          <li key={d.key} className="flex items-baseline justify-between gap-4 py-3">
            <div>
              <p>{d.label}</p>
              <p className="mt-1 text-sm text-smoke">{d.note}</p>
            </div>
            <p className="font-mono text-sm">
              {d.score}/{d.weight}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-widest text-smoke">
        Findings
      </h2>
      <div className="mt-4 grid gap-4">
        {r.findings.map((f) => (
          <FindingCard key={f.id} finding={f} />
        ))}
      </div>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-widest text-smoke">
        Pages read
      </h2>
      <ul className="mt-3 space-y-2 font-mono text-xs">
        {r.pagesFetched.map((p) => (
          <li key={p.url} className="truncate">
            <span className={p.ok ? "text-moss" : "text-oxide"}>{p.ok ? "OK" : "FAIL"}</span>{" "}
            <a href={p.url} className="underline" target="_blank" rel="noreferrer">
              {p.url}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-14 border border-ink p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest">If this is your brand</p>
        <p className="mt-3 text-lg leading-relaxed">
          We will re-fetch after you change the pages. First public reports are free.
          A written fix order is ₹999. Monthly retest is ₹4,999.
        </p>
        <a
          href={`mailto:rp271187@gmail.com?subject=${encodeURIComponent("BotLitmus retest: " + r.brand)}`}
          className="mt-5 inline-block border border-ink bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-paper"
        >
          Request a retest
        </a>
      </div>
    </article>
  );
}
