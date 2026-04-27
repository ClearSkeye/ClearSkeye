import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { site } from '../src/content/site'
import './globals.css'

const title = `${site.name} — ${site.tagline}`
const description = site.description
const canonicalUrl = site.url

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(canonicalUrl),
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: canonicalUrl,
    images: [site.ogImagePath],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [site.ogImagePath],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
