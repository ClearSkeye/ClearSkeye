import Link from "next/link";

import { ArrowRightIcon, Wordmark } from "@/components/icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate">
      <div className="max-w-content mx-auto px-6 pt-16 pb-20 sm:pt-24 md:px-12 md:pt-32 md:pb-32 lg:px-24 lg:pt-40 lg:pb-40">
        <header className="mb-16 flex items-center justify-between md:mb-24">
          <Wordmark className="text-ink" />
          <Link
            href="#contact"
            className="text-small text-meridian decoration-meridian hidden font-medium underline decoration-1 underline-offset-4 hover:decoration-2 sm:inline-block"
          >
            Get in touch
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-9 xl:col-span-8">
            <p className="eyebrow rise mb-8">A boutique consultancy</p>
            <h1
              id="hero-heading"
              className="text-ink md:text-display-2 lg:text-display-1 font-serif text-[2.5rem] leading-[1.08] font-light tracking-[-0.02em] text-balance sm:text-[3.25rem]"
            >
              Most operating models are designed before they are understood.
              <br />
              <span className="text-meridian">ClearSkeye reverses the order.</span>
            </h1>

            <p className="lead max-w-reading text-meridian mt-10 text-pretty">
              We design target operating models for the largest enterprises in the world. We begin
              with purpose. We do not design what we have not yet understood.
            </p>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="group bg-ink text-body text-paper hover:bg-meridian focus-visible:outline-horizon inline-flex items-center justify-center gap-3 rounded-sm px-6 py-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Begin a conversation
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#method"
                className="text-body text-ink decoration-ink underline decoration-1 underline-offset-[6px] hover:decoration-2"
              >
                Read the method
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden className="border-rule border-t" />
    </section>
  );
}
