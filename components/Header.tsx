import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-mono text-sm tracking-[0.18em] uppercase">
          BotLitmus
        </Link>
        <nav className="flex gap-5 font-mono text-xs uppercase tracking-wider text-smoke">
          <Link href="/#league" className="hover:text-ink">
            League
          </Link>
          <Link href="/scan" className="hover:text-ink">
            Scan
          </Link>
          <Link href="/method" className="hover:text-ink">
            Method
          </Link>
          <Link href="/pricing" className="hover:text-ink">
            Pricing
          </Link>
        </nav>
      </div>
    </header>
  );
}
