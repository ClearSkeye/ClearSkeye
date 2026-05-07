import type { Metadata, Viewport } from "next";
import { Spectral, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { env } from "@/lib/env";
import { SkipLink } from "@/components/skip-link";

import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ClearSkeye. Sight before design.",
    template: "%s · ClearSkeye",
  },
  description:
    "ClearSkeye designs target operating models for the largest enterprises in the world. We begin with purpose. We do not design what we have not yet understood.",
  applicationName: "ClearSkeye",
  authors: [{ name: "ClearSkeye" }],
  creator: "ClearSkeye",
  keywords: [
    "ClearSkeye",
    "operating model",
    "target operating model",
    "operating model design",
    "management consultancy",
    "Fortune 500",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ClearSkeye",
    title: "ClearSkeye. Sight before design.",
    description:
      "Most operating models are designed before they are understood. ClearSkeye reverses the order.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearSkeye. Sight before design.",
    description:
      "Most operating models are designed before they are understood. ClearSkeye reverses the order.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1E2A" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ClearSkeye",
  url: siteUrl,
  description:
    "ClearSkeye designs target operating models for the largest enterprises in the world. We begin with purpose.",
  slogan: "Sight before design.",
  knowsAbout: [
    "target operating model design",
    "organisational design",
    "structural design for the enterprise",
  ],
  inLanguage: "en",
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spectral.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-paper text-ink font-sans antialiased">
        <SkipLink />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
