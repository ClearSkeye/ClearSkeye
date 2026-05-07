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
    <main className="bg-paper grid min-h-svh place-items-center px-6 md:px-12 lg:px-24">
      <div className="max-w-reading">
        <p className="eyebrow">An unexpected error</p>
        <h1 className="text-display-2 text-ink mt-6 font-serif leading-tight font-light tracking-[-0.02em] text-balance">
          Something interrupted this page before it could render.
        </h1>
        <p className="text-body-large text-meridian mt-8 text-pretty">
          The error has been recorded. Try once more. If the issue continues, send us a note from
          the homepage and we will look at it.
        </p>
        {error.digest ? (
          <p className="text-small text-sightline mt-6 font-mono">
            digest: <span className="text-ink">{error.digest}</span>
          </p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="bg-ink text-body text-paper hover:bg-meridian focus-visible:outline-horizon mt-12 inline-flex items-center gap-3 rounded-sm px-6 py-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
