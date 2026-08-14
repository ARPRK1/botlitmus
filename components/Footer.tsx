import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 font-mono text-[11px] uppercase tracking-wider text-smoke sm:flex-row sm:justify-between">
        <p>BotLitmus · India · public help-centre honesty</p>
        <p className="flex gap-4">
          <Link href="/method" className="hover:text-ink">
            Method
          </Link>
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <a href="https://github.com/ARPRK1/botlitmus" className="hover:text-ink">
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
