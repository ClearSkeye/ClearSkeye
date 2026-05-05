import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, oklch(0.65 0.21 256) 0%, oklch(0.55 0.22 320) 100%)",
        color: "white",
        fontSize: 96,
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      CS
    </div>,
    { ...size },
  );
}
