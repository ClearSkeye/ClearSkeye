import Link from "next/link";

import { Wordmark } from "@/components/icons";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-content mx-auto px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Wordmark className="text-paper" />
            <p className="text-heading-3 text-paper mt-6 font-serif leading-snug font-light">
              Sight before design.
            </p>
            <p className="text-small text-paper/70 mt-3 tracking-[0.1em] uppercase">
              Purpose. Sight. Design. Practice.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="text-body grid grid-cols-2 gap-x-12 gap-y-3 lg:col-span-4"
          >
            <Link
              href="#method"
              className="text-paper/80 decoration-paper/30 hover:text-paper hover:decoration-paper underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              The method
            </Link>
            <Link
              href="#work"
              className="text-paper/80 decoration-paper/30 hover:text-paper hover:decoration-paper underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              The work
            </Link>
            <Link
              href="#founder"
              className="text-paper/80 decoration-paper/30 hover:text-paper hover:decoration-paper underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              The founder
            </Link>
            <Link
              href="#contact"
              className="text-paper/80 decoration-paper/30 hover:text-paper hover:decoration-paper underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Begin a conversation
            </Link>
          </nav>

          <div className="text-small text-paper/70 flex flex-col gap-2 lg:col-span-3 lg:items-end lg:text-right">
            <p>ClearSkeye</p>
            <p>clearskeye.com</p>
          </div>
        </div>

        <div className="border-paper/15 text-small text-paper/60 mt-16 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {COPYRIGHT_YEAR} ClearSkeye. All rights reserved.</p>
          <p>The closing artefact of every engagement is A Clear View.</p>
        </div>
      </div>
    </footer>
  );
}
