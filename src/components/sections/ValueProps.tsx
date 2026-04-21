const features = [
  {
    title: 'Clarity-first messaging',
    body: 'Turn features into outcomes with a narrative that reads clean and lands fast.',
  },
  {
    title: 'Polished UI, not noise',
    body: 'Modern typography, consistent spacing, and subtle motion where it matters.',
  },
  {
    title: 'Fast by default',
    body: 'Lean bundles, accessible markup, and a layout designed for conversion.',
  },
  {
    title: 'Ready for growth',
    body: 'Ghost integration, analytics, and a clean structure for iterating quickly.',
  },
] as const

export function ValueProps() {
  return (
    <section id="features" className="py-12 sm:py-16">
      <div className="grid gap-6">
        <div>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Everything you need for a high-converting first impression.
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-slate-700">
            This layout is intentionally minimal, but it’s built like a product:
            accessible, responsive, and structured to scale.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 h-10 w-10 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20" />
              <h3 className="text-base font-semibold text-slate-950">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

