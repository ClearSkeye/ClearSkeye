import { DayCycleSkyBackground } from "./components/DayCycleSkyBackground/DayCycleSkyBackground"

const subsidiaries = [
  {
    name: 'BigSkeye',
    focus: 'Commercial Drone Operations',
    summary:
      'Deploys compliant drone programs for inspection, mapping, and operational visibility at commercial scale.',
    href: '#bigskeye',
    stat: 'Operational Coverage',
    value: 'Field-ready',
  },
  {
    name: 'DarkSkeye',
    focus: 'Business Transformation Management Consultants',
    summary:
      'Leads transformation programs that align strategy, change delivery, and measurable business outcomes.',
    href: '#darkskeye',
    stat: 'Transformation Lens',
    value: 'Strategy to execution',
  },
  {
    name: 'GreySkeye',
    focus: 'Startup Incubator',
    summary:
      'Supports early-stage ventures with structured incubation, operating guidance, and practical growth support.',
    href: '#greyskeye',
    stat: 'Venture Stage',
    value: 'Early to growth',
  },
  {
    name: 'AiSkeye',
    focus: 'AI Automation Specialists',
    summary:
      'Designs automation systems that reduce manual workload and improve process reliability across teams.',
    href: '#aiskeye',
    stat: 'Automation Intent',
    value: 'Reliable scale',
  },
]

export default function HomePage() {
  return (
    <main id="main-content" className="page">
      <DayCycleSkyBackground
        durationSeconds={240}
        reducedMotionPhase="morning"
      />

      <a className="skip-link" href="#portfolio">
        Skip to subsidiary portfolio
      </a>

      <header className="site-header" aria-label="Primary">
        <div className="site-header__inner">
          <p className="site-brand">Clearskeye Holding</p>
          <a className="site-contact" href="#contact">
            Start a holding company conversation
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Holding Company</p>
        <h1 id="hero-title">
          One group, four specialist companies, one clear strategic view.
        </h1>
        <p className="hero-copy">
          Clearskeye presents a portfolio built for real operational outcomes.
          Explore the subsidiary that matches your current challenge, from drone
          operations and transformation consulting to venture incubation and AI
          automation.
        </p>
      </section>

      <section id="portfolio" className="portfolio" aria-labelledby="portfolio-title">
        <div className="portfolio-heading">
          <h2 id="portfolio-title">Subsidiary portfolio</h2>
          <p>
            Each company has a defined operating focus and a direct path for
            engagement.
          </p>
        </div>

        <ul className="subsidiary-grid">
          {subsidiaries.map((company) => (
            <li key={company.name}>
              <article className="subsidiary-card" aria-labelledby={`${company.name}-title`}>
                <p className="subsidiary-focus">{company.focus}</p>
                <h3 id={`${company.name}-title`}>{company.name}</h3>
                <p className="subsidiary-summary">{company.summary}</p>
                <dl className="subsidiary-meta">
                  <dt>{company.stat}</dt>
                  <dd>{company.value}</dd>
                </dl>
                <a className="subsidiary-cta" href={company.href}>
                  Explore {company.name}
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Need a coordinated group response?</h2>
        <p>
          Contact Clearskeye to route your request to the right subsidiary, or
          to design a cross-company engagement.
        </p>
        <a className="contact-cta" href="mailto:hello@clearskeye.com">
          Email Clearskeye
        </a>
      </section>
    </main>
  )
}
