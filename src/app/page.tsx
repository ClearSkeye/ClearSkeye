import { Suspense } from "react";

import { Hero } from "@/components/hero";
import { StackGrid } from "@/components/stack-grid";
import { LiveStats, LiveStatsSkeleton } from "@/components/live-stats";
import { Pingback } from "@/components/pingback";
import { LikeIsland, LikeIslandSkeleton } from "@/components/like-island";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <main id="main" className="relative isolate min-h-svh overflow-hidden">
        <div
          aria-hidden
          className="gradient-mesh pointer-events-none absolute inset-0 -z-20 opacity-80"
        />
        <div
          aria-hidden
          className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60"
        />

        <Hero />

        <section id="stack" className="mx-auto max-w-6xl scroll-mt-20 px-6 pt-12 pb-24 sm:pt-20">
          <header className="mb-10 max-w-2xl">
            <p className="text-foreground/60 mb-3 font-mono text-xs tracking-widest uppercase">
              The stack
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Pinned to the absolute latest of everything.
            </h2>
            <p className="text-foreground/70 mt-4 text-pretty">
              No betas, no canaries, no &ldquo;coming soon&rdquo; placeholders — every dependency
              below is the freshest stable release on npm at build time.
            </p>
          </header>
          <StackGrid />
        </section>

        <section id="live" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
          <header className="mb-10 max-w-2xl">
            <p className="text-foreground/60 mb-3 font-mono text-xs tracking-widest uppercase">
              React 19 · Streaming
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Server-rendered, streamed in with Suspense.
            </h2>
            <p className="text-foreground/70 mt-4 text-pretty">
              The card below is an async React Server Component. The shell renders instantly; the
              data streams in over the same response.
            </p>
          </header>
          <Suspense fallback={<LiveStatsSkeleton />}>
            <LiveStats />
          </Suspense>
        </section>

        <section id="action" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
          <header className="mb-10 max-w-2xl">
            <p className="text-foreground/60 mb-3 font-mono text-xs tracking-widest uppercase">
              Server Actions
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Form submission, no API route in sight.
            </h2>
            <p className="text-foreground/70 mt-4 text-pretty">
              Powered by <code className="font-mono text-sm">useActionState</code>, validated on the
              server with Zod, and rendered progressively from the server.
            </p>
          </header>
          <Pingback />
        </section>

        <section id="optimistic" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-32">
          <header className="mb-10 max-w-2xl">
            <p className="text-foreground/60 mb-3 font-mono text-xs tracking-widest uppercase">
              React 19 · useOptimistic
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Instant UI, eventually consistent.
            </h2>
            <p className="text-foreground/70 mt-4 text-pretty">
              Click the heart — the count updates immediately while the Server Action runs in the
              background. If the request fails, React rolls the optimistic value back automatically.
            </p>
          </header>
          <Suspense fallback={<LikeIslandSkeleton />}>
            <LikeIsland />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}
