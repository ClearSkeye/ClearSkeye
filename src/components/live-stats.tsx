import { headers } from "next/headers";

async function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function LiveStats() {
  // Simulate an upstream fetch so the Suspense fallback is observable.
  await delay(600);
  const requestHeaders = await headers();

  const userAgent = requestHeaders.get("user-agent") ?? "unknown";
  const renderedAt = new Date();

  const stats: ReadonlyArray<{ label: string; value: string }> = [
    { label: "Rendered at (UTC)", value: renderedAt.toISOString() },
    {
      label: "Runtime",
      value: `Node.js ${process.version} · ${process.platform}/${process.arch}`,
    },
    { label: "User-Agent (truncated)", value: userAgent.slice(0, 80) },
    { label: "Component", value: "React Server Component (async)" },
  ];

  return (
    <article className="border-foreground/10 bg-background/60 overflow-hidden rounded-3xl border backdrop-blur">
      <header className="border-foreground/10 bg-foreground/[0.02] flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_oklch(0.85_0.15_150_/_0.35)]" />
          <h3 className="text-foreground/70 font-mono text-xs tracking-widest uppercase">
            live · streamed from the server
          </h3>
        </div>
        <span className="text-foreground/50 font-mono text-xs">app/page.tsx</span>
      </header>
      <dl className="divide-foreground/10 divide-y">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-6"
          >
            <dt className="text-foreground/55 font-mono text-xs tracking-widest uppercase">
              {stat.label}
            </dt>
            <dd className="text-foreground/90 font-mono text-sm break-all">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function LiveStatsSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading server data"
      className="border-foreground/10 bg-background/60 overflow-hidden rounded-3xl border backdrop-blur"
    >
      <div className="border-foreground/10 bg-foreground/[0.02] flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="bg-foreground/30 inline-flex h-2 w-2 rounded-full" />
          <span className="text-foreground/50 font-mono text-xs tracking-widest uppercase">
            streaming…
          </span>
        </div>
        <span className="text-foreground/40 font-mono text-xs">app/page.tsx</span>
      </div>
      <div className="divide-foreground/10 divide-y">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid gap-3 px-6 py-4 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-6"
          >
            <div className="animate-shimmer from-foreground/5 via-foreground/15 to-foreground/5 h-3 w-32 rounded bg-gradient-to-r" />
            <div className="animate-shimmer from-foreground/5 via-foreground/15 to-foreground/5 h-3 w-full rounded bg-gradient-to-r" />
          </div>
        ))}
      </div>
    </div>
  );
}
