import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-4xl">Pricing</h1>
      <p className="mt-6 text-lg leading-relaxed">
        Public reports stay free. That is the distribution. Money is the written
        fix and the retest, not a paywall on the evidence.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["Public report", "Free", "Indexed. Anyone can read the quotes."],
          ["Fix order PDF", "₹999", "Same evidence, ordered by what to change first. 48 hours."],
          ["Monthly retest", "₹4,999", "We fetch again after you ship. Score movement is public unless you ask for private."],
        ].map(([name, price, blurb]) => (
          <div key={name} className="border border-rule p-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">{name}</p>
            <p className="mt-3 text-3xl">{price}</p>
            <p className="mt-3 text-sm leading-relaxed text-smoke">{blurb}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-smoke">
        Razorpay checkout is not wired yet. Email{" "}
        <a className="underline" href="mailto:rp271187@gmail.com">
          rp271187@gmail.com
        </a>{" "}
        with the brand URL. Pay after you have the PDF if you want. We would
        rather have the first rupee be a real yes than a fake button.
      </p>
    </div>
  );
}
