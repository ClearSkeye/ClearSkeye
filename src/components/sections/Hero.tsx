import { motion } from 'motion/react'
import { site } from '../../content/site'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'

export function Hero({
  onPrimaryCta,
  onSecondaryCta,
}: {
  onPrimaryCta: () => void
  onSecondaryCta: () => void
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -top-16 right-[-120px] h-[360px] w-[360px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <Container className="relative py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Ship the site you’d be proud to present.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
            >
              {site.name} makes your message feel inevitable.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 max-w-xl text-pretty text-base leading-7 text-slate-700"
            >
              A crisp, conversion-focused landing page that loads fast, reads
              clean, and behaves like a product—not a brochure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button onClick={onPrimaryCta}>Request a demo</Button>
              <Button variant="secondary" onClick={onSecondaryCta}>
                Join the newsletter
              </Button>
            </motion.div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              No spam. High-signal updates. Unsubscribe any time.
            </p>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-2 text-xs font-medium text-slate-600">
                    ClearSkeye Preview
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  <div className="h-3 w-2/3 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                  <div className="h-3 w-11/12 rounded bg-slate-200" />
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="h-24 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20" />
                    <div className="h-24 rounded-lg bg-fuchsia-500/10 ring-1 ring-fuchsia-500/20" />
                  </div>
                  <div className="mt-2 h-10 rounded-md bg-slate-950" />
                </div>
              </div>
            </motion.div>

            <div className="pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  )
}

