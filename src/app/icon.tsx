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
        background: "linear-gradient(135deg, oklch(0.65 0.21 256) 0%, oklch(0.55 0.22 320) 100%)",
        color: "white",
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: "-0.04em",
        borderRadius: 6,
      }}
    >
      CS
    </div>,
    { ...size },
  );
}
