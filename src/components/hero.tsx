import Link from "next/link";

import { Wordmark } from "@/components/icons";

/**
 * The homepage hero.
 *
 * Brand discipline, in order of priority:
 *   1. Quiet by default. The page is mostly empty; the wordmark
 *      and the conviction do the work.
 *   2. Never bury the conviction. It sits above the fold,
 *      verbatim from the brand's approved homepage opener.
 *   3. One primary action per page. The button below scrolls to
 *      the contact section, which then carries its own submit
 *      action.
 *
 * The wordmark renders the sightline descender in Horizon. This
 * accent is reserved by the brand to the homepage hero, the
 * cover of A Clear View, and the firm's annual review.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate">
      <div className="max-w-content mx-auto px-6 pt-16 pb-24 sm:pt-24 md:px-12 md:pt-32 md:pb-32 lg:px-24 lg:pt-32 lg:pb-32">
        <header className="mb-24 md:mb-32">
          <Wordmark size="large" withSightline className="text-ink" />
        </header>

        <h1
          id="hero-heading"
          className="text-ink md:text-display-2 lg:text-display-1 font-serif text-[2.5rem] leading-[1.08] font-light tracking-[-0.02em] text-balance hyphens-none sm:text-[3.25rem]"
        >
          Most operating models are designed before they are understood.
          <br />
          ClearSkeye reverses the order.
        </h1>

        <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center">
          <Link
            href="#contact"
            className="bg-ink text-body text-paper hover:bg-meridian focus-visible:outline-horizon inline-flex items-center justify-center rounded-sm px-8 py-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Begin a conversation
          </Link>
          <Link
            href="#method"
            className="text-body text-ink decoration-ink underline decoration-1 underline-offset-[6px] hover:decoration-2"
          >
            Read the method
          </Link>
        </div>
      </div>

      <div aria-hidden className="border-rule border-t" />
    </section>
  );
}
