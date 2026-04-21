export function Quote() {
  return (
    <section className="py-12 sm:py-16">
      <figure className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <blockquote className="text-pretty text-base leading-7 text-slate-800">
          “We swapped a noisy landing page for a focused story. Demos went up,
          bounce rate went down, and the site finally matched the product.”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200" aria-hidden="true" />
          <div className="text-sm leading-5">
            <div className="font-semibold text-slate-950">Alex Rivera</div>
            <div className="text-slate-600">Head of Growth, Placeholder Co.</div>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}

