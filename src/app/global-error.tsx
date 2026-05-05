"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 24,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          background: "#0a0a0a",
          color: "#fafafa",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              opacity: 0.6,
              margin: 0,
            }}
          >
            Fatal · Root layout error
          </p>
          <h1
            style={{
              marginTop: 16,
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            The app crashed before it could render.
          </h1>
          <p style={{ marginTop: 16, opacity: 0.7 }}>
            A non-recoverable error occurred in the root layout. Try a full reload.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "white",
              color: "#0a0a0a",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
