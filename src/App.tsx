import { site } from './content/site'
import { PageSeo } from './components/PageSeo'
import { GhostPortalScript } from './components/GhostPortalScript'
import { Container } from './components/layout/Container'
import { Nav } from './components/sections/Nav'
import { Hero } from './components/sections/Hero'
import { SocialProof } from './components/sections/SocialProof'
import { LatestPosts } from './components/sections/LatestPosts'
import { ValueProps } from './components/sections/ValueProps'
import { Quote } from './components/sections/Quote'
import { NewsletterCta } from './components/sections/NewsletterCta'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'

function App() {
  const canonicalUrl = site.url

  return (
    <div className="min-h-dvh bg-white text-slate-950 antialiased selection:bg-indigo-500/20 selection:text-slate-950">
      <PageSeo canonicalUrl={canonicalUrl} />
      <GhostPortalScript />

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
          <LatestPosts />
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

export default App
