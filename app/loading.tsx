export default function Loading() {
  return (
    <main className="page" aria-busy="true" aria-live="polite">
      <section className="hero">
        <p className="eyebrow">Loading portfolio</p>
        <h1>Preparing subsidiary capabilities for review.</h1>
        <p className="hero-copy">
          We are loading the current Clearskeye company profile.
        </p>
      </section>

      <section className="portfolio" aria-label="Loading subsidiaries">
        <ul className="subsidiary-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>
              <article className="subsidiary-card">
                <p className="subsidiary-focus">Loading focus area</p>
                <h3>Loading subsidiary</h3>
                <p className="subsidiary-summary">
                  Loading operational summary and capability profile.
                </p>
                <a className="subsidiary-cta" href="#" aria-disabled="true">
                  Loading call to action
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
