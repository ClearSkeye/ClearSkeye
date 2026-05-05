import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-foreground/10 bg-background/60 border-t backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="bg-foreground text-background inline-flex h-7 w-7 items-center justify-center rounded-lg">
            <span className="font-mono text-xs font-bold">CS</span>
          </span>
          <p className="text-foreground/70 text-sm">
            ClearSkeye — built with Next.js 16, deployed on Vercel.
          </p>
        </div>
        <nav className="text-foreground/70 flex items-center gap-5 text-sm">
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Next.js
          </Link>
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            React
          </Link>
          <Link
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Tailwind
          </Link>
          <Link
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Vercel
          </Link>
        </nav>
      </div>
    </footer>
  );
}
