import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F4F0E8",
        color: "#0F1E2A",
        position: "relative",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0F1E2A"
        strokeWidth="1.5"
        strokeLinecap="square"
      >
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    </div>,
    { ...size },
  );
}
