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
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          background: "#F4F0E8",
          color: "#0F1E2A",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ maxWidth: 640, padding: 24 }}>
          <p
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "#6E7C85",
              fontWeight: 600,
              margin: 0,
            }}
          >
            A fatal error in the root layout
          </p>
          <h1
            style={{
              marginTop: 24,
              fontFamily: "Spectral, Georgia, serif",
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            The application stopped before it could render.
          </h1>
          <p style={{ marginTop: 24, fontSize: 18, color: "#1E3340", lineHeight: 1.6 }}>
            A non-recoverable error occurred in the root layout. A full reload is the cleanest way
            forward.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              padding: "16px 24px",
              borderRadius: 4,
              border: 0,
              background: "#0F1E2A",
              color: "#F4F0E8",
              fontWeight: 600,
              fontSize: 16,
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
