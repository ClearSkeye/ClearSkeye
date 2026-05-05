import { ImageResponse } from "next/og";

export const alt = "ClearSkeye — Next.js 16 on the bleeding edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#0a0a0a",
        backgroundImage: [
          "radial-gradient(at 20% 20%, oklch(0.55 0.2 256 / 0.6) 0px, transparent 50%)",
          "radial-gradient(at 80% 0%, oklch(0.55 0.22 320 / 0.5) 0px, transparent 50%)",
          "radial-gradient(at 0% 100%, oklch(0.55 0.18 180 / 0.4) 0px, transparent 50%)",
        ].join(", "),
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, oklch(0.65 0.21 256) 0%, oklch(0.55 0.22 320) 100%)",
            borderRadius: 12,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          CS
        </div>
        <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>ClearSkeye</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          The bleeding edge,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, oklch(0.85 0.2 256), oklch(0.85 0.22 320))",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            shipped to production.
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 900,
          }}
        >
          Next.js 16 · React 19 · React Compiler · Tailwind v4 · Turbopack · Vercel
        </div>
      </div>
    </div>,
    { ...size },
  );
}
