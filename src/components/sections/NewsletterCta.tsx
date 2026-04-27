import { site } from '../../content/site'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'

export function NewsletterCta() {
  return (
    <section id="newsletter" className="border-y border-slate-200 bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Get high-signal updates.
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-white/80">
              Product notes, patterns, and launch lessons. Follow along for
              updates as new work ships.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <a href="#contact">
              <Button variant="secondary" className="ring-0">
                Join the list
              </Button>
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white/80 hover:text-white"
            >
              Follow along →
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

