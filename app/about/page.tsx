import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-4xl">About</h1>
      <p className="mt-6 text-lg leading-relaxed">
        BotLitmus is built by Rana Appannagari in India. Day job is support
        operations. This site is the public version of a help-centre teardown:
        the pages a customer can already see, scored in the open.
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        We do not have a sales team. The reports are the outbound. If your
        brand is on the league and the quotes are wrong, email the URL of the
        corrected page. We will re-fetch.
      </p>
    </div>
  );
}
