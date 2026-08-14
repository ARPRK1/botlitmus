import type { Finding } from "@/lib/types";

const SEV: Record<Finding["severity"], string> = {
  critical: "text-oxide",
  high: "text-oxide",
  medium: "text-amber",
  low: "text-smoke",
};

export function FindingCard({ finding }: { finding: Finding }) {
  return (
    <article className="border border-rule bg-paper p-5">
      <p className={`font-mono text-[10px] uppercase tracking-widest ${SEV[finding.severity]}`}>
        {finding.severity} · {finding.type}
      </p>
      <h3 className="mt-2 text-xl leading-snug">{finding.title}</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-ink/90">{finding.whyItHurts}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-smoke">
        <span className="font-mono text-[10px] uppercase tracking-widest">Fix · </span>
        {finding.fix}
      </p>
      <ul className="mt-4 space-y-3">
        {finding.evidence.map((e, i) => (
          <li key={i} className="border-l-2 border-rule pl-3">
            <blockquote className="font-mono text-xs leading-relaxed text-ink">
              “{e.quote}”
            </blockquote>
            <a
              href={e.url}
              className="mt-1 block truncate font-mono text-[10px] text-smoke underline"
              target="_blank"
              rel="noreferrer"
            >
              {e.url}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
