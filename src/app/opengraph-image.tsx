import { ImageResponse } from "next/og";

export const alt = "ClearSkeye. Sight before design.";
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
        padding: "96px",
        background: "#F4F0E8",
        color: "#0F1E2A",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0F1E2A"
          strokeWidth="1.5"
          strokeLinecap="square"
        >
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="3" y1="9" x2="21" y2="9" />
        </svg>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 36,
            fontWeight: 300,
            letterSpacing: "-0.02em",
          }}
        >
          ClearSkeye
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
        <p
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color: "#6E7C85",
            margin: 0,
            fontWeight: 600,
          }}
        >
          A boutique consultancy
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: 84,
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Most operating models are designed before they are understood. ClearSkeye reverses the
          order.
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 24,
          borderTop: "1px solid #D8D2C4",
          color: "#1E3340",
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
        }}
      >
        <span>Sight before design.</span>
        <span style={{ color: "#6E7C85" }}>Purpose. Sight. Design. Practice.</span>
      </div>
    </div>,
    { ...size },
  );
}
