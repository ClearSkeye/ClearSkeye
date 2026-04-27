'use client'

import { site } from '../src/content/site'
import { Container } from '../src/components/layout/Container'
import { Nav } from '../src/components/sections/Nav'
import { Hero } from '../src/components/sections/Hero'
import { SocialProof } from '../src/components/sections/SocialProof'
import { ValueProps } from '../src/components/sections/ValueProps'
import { Quote } from '../src/components/sections/Quote'
import { NewsletterCta } from '../src/components/sections/NewsletterCta'
import { Contact } from '../src/components/sections/Contact'
import { Footer } from '../src/components/sections/Footer'

export default function HomePage() {
  const canonicalUrl = site.url

  return (
    <div className="min-h-dvh bg-white text-slate-950 antialiased selection:bg-indigo-500/20 selection:text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            url: canonicalUrl,
          }),
        }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-950 shadow ring-1 ring-slate-200"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="relative">
        <Hero
          onPrimaryCta={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
          onSecondaryCta={() => {
            document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />

        <Container>
          <SocialProof />
          <ValueProps />
          <Quote />
        </Container>

        <NewsletterCta />

        <Container>
          <Contact />
        </Container>
      </main>

      <Footer />
    </div>
  )
}
