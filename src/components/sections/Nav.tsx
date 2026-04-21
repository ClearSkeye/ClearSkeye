import { site } from '../../content/site'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-700 hover:text-slate-950"
    >
      {label}
    </a>
  )
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
            {site.name.slice(0, 1)}
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-950">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <NavLink href="#proof" label="Proof" />
          <NavLink href="#features" label="Features" />
          <NavLink href="#newsletter" label="Newsletter" />
          <NavLink href="#contact" label="Contact" />
        </nav>

        <div className="flex items-center gap-2">
          <a className="hidden text-sm font-medium text-slate-700 hover:text-slate-950 sm:inline-flex" href="#contact">
            Talk to us
          </a>
          <Button
            variant="primary"
            onClick={() =>
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Get a demo
          </Button>
        </div>
      </Container>
    </header>
  )
}

