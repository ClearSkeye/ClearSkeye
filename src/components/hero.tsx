import { Suspense } from "react";
import Link from "next/link";

import { GitHubIcon, VercelIcon, ArrowRightIcon } from "@/components/icons";
import { ThemeToggle, ThemeToggleSkeleton } from "@/components/theme-toggle";

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32 lg:pt-40">
      <div className="absolute top-6 right-6 sm:top-8 sm:right-6">
        <Suspense fallback={<ThemeToggleSkeleton />}>
          <ThemeToggle />
        </Suspense>
      </div>

      <div className="flex flex-col items-start gap-8">
        <Link
          href="https://nextjs.org/blog/next-16-2"
          target="_blank"
          rel="noreferrer"
          className="group border-foreground/15 bg-background/40 text-foreground/80 hover:border-foreground/40 hover:text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur transition"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_oklch(0.85_0.15_150_/_0.35)]" />
          Next.js 16.2 · ~400% faster <code className="font-mono">next dev</code>
          <ArrowRightIcon className="size-3 transition group-hover:translate-x-0.5" />
        </Link>

        <h1 className="from-foreground via-foreground to-foreground/60 bg-gradient-to-br bg-clip-text text-5xl font-semibold tracking-tight text-balance text-transparent sm:text-6xl lg:text-7xl">
          The bleeding edge,
          <br />
          shipped to <span className="text-accent">production</span>.
        </h1>

        <p className="text-foreground/70 max-w-2xl text-lg text-pretty sm:text-xl">
          ClearSkeye is a reference implementation of the modern Next.js stack — the App Router,
          React 19 with the React Compiler, Tailwind CSS v4, and Turbopack — deployed on Vercel.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="#stack"
            className="group bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition"
          >
            Explore the stack
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="https://github.com/ClearSkeye/ClearSkeye"
            target="_blank"
            rel="noreferrer"
            className="border-foreground/15 bg-background/40 text-foreground hover:border-foreground/40 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur transition"
          >
            <GitHubIcon className="size-4" />
            View on GitHub
          </Link>
          <Link
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="border-foreground/15 bg-background/40 text-foreground hover:border-foreground/40 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur transition"
          >
            <VercelIcon className="size-4" />
            Deploy to Vercel
          </Link>
        </div>

        <dl className="mt-6 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Next.js", value: "16.2" },
            { label: "React", value: "19.2" },
            { label: "Tailwind", value: "v4.2" },
            { label: "TypeScript", value: "6.0" },
          ].map((item) => (
            <div
              key={item.label}
              className="border-foreground/10 bg-background/40 rounded-2xl border p-4 backdrop-blur"
            >
              <dt className="text-foreground/60 font-mono text-xs tracking-widest uppercase">
                {item.label}
              </dt>
              <dd className="mt-1 font-mono text-lg font-semibold tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
