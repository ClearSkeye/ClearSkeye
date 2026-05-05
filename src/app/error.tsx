"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-svh place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="text-foreground/60 font-mono text-xs tracking-widest uppercase">
          500 · Something broke
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Well, that wasn&rsquo;t supposed to happen.
        </h1>
        <p className="text-foreground/70 mt-4 text-pretty">
          An unexpected error was thrown while rendering this route. We&rsquo;ve logged it and you
          can try again — most of the time a simple reset gets you going.
        </p>
        {error.digest && (
          <p className="text-foreground/50 mt-4 font-mono text-xs">
            digest: <span className="text-foreground/80">{error.digest}</span>
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="bg-foreground text-background hover:bg-foreground/90 mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
