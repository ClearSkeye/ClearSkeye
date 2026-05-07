import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ClearSkeye",
    short_name: "ClearSkeye",
    description:
      "ClearSkeye designs target operating models for the largest enterprises in the world. Sight before design.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F0E8",
    theme_color: "#F4F0E8",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
