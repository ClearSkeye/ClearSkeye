import { Hero } from "@/components/hero";
import { HorizonBreak } from "@/components/horizon-break";
import { MethodGrid } from "@/components/method-grid";
import { Pingback } from "@/components/pingback";
import { Footer } from "@/components/footer";

/**
 * The homepage.
 *
 * Five surfaces, one idea each, in the order an executive reader
 * naturally walks: the conviction, the method, the work, the
 * founder, the conversation. Section headlines descend in scale
 * (display-1 → display-2 → heading-1 → heading-2 → heading-1) so
 * the reader feels the page settle as they move through it.
 *
 * Section margins follow the brand's eight point scale: 64 mobile,
 * 96 tablet, 128 desktop. The hero is allowed the wider 128 / 96
 * margin per the brand guide.
 */
export default function HomePage() {
  return (
    <>
      <main id="main" className="bg-paper text-ink">
        <Hero />

        <section id="method" aria-labelledby="method-heading" className="scroll-mt-24">
          <div className="max-w-content mx-auto px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32">
            <header className="max-w-reading mb-16">
              <p className="eyebrow mb-6">The method</p>
              <h2
                id="method-heading"
                className="text-ink md:text-display-2 font-serif text-[2rem] leading-[1.1] font-light tracking-[-0.01em] text-balance hyphens-none"
              >
                Purpose. Sight. Design. Practice.
              </h2>
              <p className="text-body-large text-meridian mt-8 text-pretty">
                The sequence is the practice&rsquo;s signature. We do not redesign a structure we
                cannot explain the purpose of, and we do not design what we have not yet observed.
              </p>
            </header>
            <MethodGrid />
          </div>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="border-rule bg-paper-light border-t"
        >
          <div className="max-w-content mx-auto px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="eyebrow">The work</p>
              </div>
              <div className="reading-column lg:col-span-8">
                <h2
                  id="work-heading"
                  className="text-heading-1 text-ink font-serif leading-tight font-light tracking-[-0.01em] text-balance hyphens-none"
                >
                  We design target operating models for the largest enterprises in the world.
                </h2>
                <p className="lead text-meridian mt-8">
                  We begin with purpose. We do not design what we have not yet understood.
                </p>
                <p className="text-body-large text-meridian mt-6 text-pretty hyphens-auto">
                  Sight is a discipline. Most operating model failures are visible months before
                  they become expensive. Looking carefully is the cheapest intervention an
                  organisation can buy.
                </p>
                <p className="text-body-large text-meridian mt-6 text-pretty hyphens-auto">
                  Every engagement closes with a single document. We call it A Clear View. It states
                  what we saw, what we changed, and what the organisation now believes about itself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* A single full-bleed long horizon image as a section break.
            The brand permits this once on the homepage and it sits
            between the work and the founder so the reader can take
            a breath before meeting Darren. */}
        <HorizonBreak />

        <section id="founder" aria-labelledby="founder-heading" className="border-rule border-t">
          <div className="max-w-content mx-auto px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="eyebrow">The founder</p>
              </div>
              <div className="reading-column lg:col-span-8">
                <h2
                  id="founder-heading"
                  className="text-heading-2 text-ink md:text-heading-1 font-serif leading-tight font-light tracking-[-0.01em] text-balance hyphens-none"
                >
                  Darren built this practice on a single conviction.
                </h2>
                <p className="text-body-large text-meridian mt-8 text-pretty hyphens-auto">
                  Structure should answer to purpose, never the other way round. Every engagement
                  begins with that conversation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-rule scroll-mt-24 border-t"
        >
          <div className="max-w-content mx-auto px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <header className="lg:col-span-5">
                <p className="eyebrow mb-6">Begin a conversation</p>
                <h2
                  id="contact-heading"
                  className="text-heading-1 text-ink font-serif leading-tight font-light tracking-[-0.01em] text-balance hyphens-none"
                >
                  Send a note. We read every one.
                </h2>
                <p className="text-body-large text-meridian mt-8 text-pretty">
                  Tell us a little about what you are looking at. We will reply from a person, not a
                  queue.
                </p>
              </header>
              <div className="lg:col-span-7">
                <Pingback />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
