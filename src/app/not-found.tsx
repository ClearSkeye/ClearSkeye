import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="bg-paper grid min-h-svh place-items-center px-6 md:px-12 lg:px-24">
      <div className="max-w-reading">
        <p className="eyebrow">404, not found</p>
        <h1 className="text-display-2 text-ink mt-6 font-serif leading-tight font-light tracking-[-0.02em] text-balance">
          That page is not part of this practice.
        </h1>
        <p className="text-body-large text-meridian mt-8 text-pretty">
          The address you tried does not lead anywhere we keep. Return to the homepage and start
          again.
        </p>
        <Link
          href="/"
          className="group bg-ink text-body text-paper hover:bg-meridian focus-visible:outline-horizon mt-12 inline-flex items-center gap-3 rounded-sm px-6 py-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Take me to the homepage
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
