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

      <section className="mt-14 border-t border-rule pt-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">FAQ</p>
        <h2 className="mt-3 text-2xl">Questions, answered honestly</h2>
        <div className="mt-8 grid gap-6">
          <div>
            <h3 className="text-lg">Do you need access to my internal ticketing system?</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-ink/85">
              No. BotLitmus only reads public help, FAQ, and policy pages. Nothing
              behind a login. Nothing inside your ticket queue.
            </p>
          </div>
          <div>
            <h3 className="text-lg">What if my help centre requires a login?</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-ink/85">
              Public pages only. Mention the login wall when you email and we will
              say what we could and could not see.
            </p>
          </div>
          <div>
            <h3 className="text-lg">How is this different from an SEO crawler?</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-ink/85">
              Those tools check whether a page loads. We check whether the refund
              clock, the phone number, and the homepage slogan are the same story.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
