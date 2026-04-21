export function SocialProof() {
  return (
    <section id="proof" className="py-12 sm:py-16">
      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Trusted by teams that care about craft
          </p>
          <p className="text-pretty text-sm leading-6 text-slate-700">
            Replace these placeholders with customer logos or press mentions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {['Northwind', 'Acme', 'Juniper', 'Kestrel'].map((name) => (
            <div
              key={name}
              className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-sm font-semibold text-slate-600 ring-1 ring-slate-200"
              aria-label={name}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

