import { site } from '../../content/site'
import { Container } from '../layout/Container'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">
              {site.name.slice(0, 1)}
            </span>
            <div className="text-sm">
              <div className="font-semibold text-slate-950">{site.name}</div>
              <div className="text-slate-600">{site.tagline}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
            <a className="hover:text-slate-950" href="#features">
              Features
            </a>
            <a className="hover:text-slate-950" href="#newsletter">
              Newsletter
            </a>
            <a className="hover:text-slate-950" href="#contact">
              Contact
            </a>
            <a
              className="hover:text-slate-950"
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built with React, Vite, and Vercel.</p>
        </div>
      </Container>
    </footer>
  )
}

