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
    { label: "Rendered at, UTC", value: renderedAt.toISOString() },
    {
      label: "Runtime",
      value: `Node.js ${process.version}, ${process.platform}/${process.arch}`,
    },
    { label: "User agent, truncated", value: userAgent.slice(0, 80) },
    { label: "Component", value: "React Server Component, asynchronous" },
  ];

  return (
    <article className="border-rule bg-paper-light border">
      <header className="border-rule flex items-center justify-between border-b px-6 py-4">
        <p className="eyebrow text-sightline">Live, streamed from the server</p>
        <span className="text-small text-sightline font-mono">app/page.tsx</span>
      </header>
      <dl className="divide-rule divide-y">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-6"
          >
            <dt className="text-small text-sightline font-semibold tracking-[0.1em] uppercase">
              {stat.label}
            </dt>
            <dd className="text-small text-ink font-mono break-all">{stat.value}</dd>
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
      className="border-rule bg-paper-light border"
    >
      <div className="border-rule flex items-center justify-between border-b px-6 py-4">
        <span className="eyebrow text-sightline">Streaming</span>
        <span className="text-small text-sightline font-mono">app/page.tsx</span>
      </div>
      <div className="divide-rule divide-y">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid gap-3 px-6 py-4 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-6"
          >
            <div className="bg-rule/60 h-3 w-32" />
            <div className="bg-rule/60 h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
