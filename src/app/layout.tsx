import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { env } from "@/lib/env";
import { SkipLink } from "@/components/skip-link";
import { ThemeBootScript } from "@/components/theme-boot-script";

import "./globals.css";

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ClearSkeye — Next.js 16 on the bleeding edge",
    template: "%s · ClearSkeye",
  },
  description:
    "A reference Next.js 16 project running React 19, the React Compiler, Tailwind CSS v4, and Turbopack — deployed on Vercel.",
  applicationName: "ClearSkeye",
  authors: [{ name: "ClearSkeye" }],
  creator: "ClearSkeye",
  keywords: [
    "Next.js 16",
    "React 19",
    "React Compiler",
    "Tailwind CSS v4",
    "Turbopack",
    "Vercel",
    "App Router",
    "Server Components",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ClearSkeye",
    title: "ClearSkeye — Next.js 16 on the bleeding edge",
    description:
      "A reference Next.js 16 project running React 19, the React Compiler, Tailwind CSS v4, and Turbopack.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearSkeye — Next.js 16 on the bleeding edge",
    description:
      "A reference Next.js 16 project running React 19, the React Compiler, Tailwind CSS v4, and Turbopack.",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ClearSkeye",
  url: siteUrl,
  description:
    "A reference Next.js 16 project running React 19, the React Compiler, Tailwind CSS v4, and Turbopack.",
  inLanguage: "en",
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="system"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeBootScript />
      </head>
      <body className="font-sans antialiased">
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
