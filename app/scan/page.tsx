import type { Metadata } from "next";
import { ScanForm } from "@/components/ScanForm";

export const metadata: Metadata = {
  title: "Scan a URL",
};

export default function ScanPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">
        First pass
      </p>
      <h1 className="mt-3 text-4xl">Paste a help or policy URL</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/85">
        This crawls public HTML from this server. It does not log into a chatbot.
        Many Indian storefronts block datacentre IPs. If the fetch fails, paste
        the policy URL itself, not the homepage. The number you get is a
        heuristic, not a league grade.
      </p>
      <div className="mt-8">
        <ScanForm />
      </div>
    </div>
  );
}
