/* The brand permits a single piece of imagery: a still, wide
   format long horizon. Sea horizons, alpine ridge lines, prairie
   skies, distant cityscape silhouettes against open sky. No
   people in foreground, no motion, soft diffused light. Used at
   full bleed or as full-width section breaks. Used rarely.

   This component renders a quiet alpine horizon as an SVG so the
   page does not pay any image bytes for it and the section break
   carries the brand's restraint. The composition is solid blocks
   only (the brand forbids colour gradients), separated by a
   single Sightline hairline that reads as the horizon itself.
   The distant ridge is a simple silhouette in Sightline, hinting
   at depth without making a picture of anything in particular.

   This is the only section on the homepage that is allowed to
   carry imagery. It exists to give the reader a moment of
   stillness between the work and the founder. Do not duplicate
   this component elsewhere on the site without re-reading the
   imagery rule in the brand guide. */

const VIEWBOX_WIDTH = 1600;
const VIEWBOX_HEIGHT = 400;
const HORIZON_Y = 280;

// A single ridge silhouette drawn as a chain of smooth-quadratic
// Bezier curves across the full width. Peaks sit a fraction below
// the horizon line; troughs touch it. Reads as distant alpine ridges
// without ever drawing a recognisable mountain.
const RIDGE_PATH = [
  `M 0 ${HORIZON_Y}`,
  `Q 80 256, 160 264`,
  `T 320 260`,
  `T 480 250`,
  `T 640 256`,
  `T 800 248`,
  `T 960 264`,
  `T 1120 252`,
  `T 1280 260`,
  `T 1440 246`,
  `T ${VIEWBOX_WIDTH} 262`,
  `L ${VIEWBOX_WIDTH} ${HORIZON_Y}`,
  `Z`,
].join(" ");

/**
 * The long horizon section break.
 *
 * Renders a single full-width SVG horizon between two sections.
 * The wrapper section is intentionally borderless inside; the
 * page provides the hairline rules above and below.
 */
export function HorizonBreak() {
  return (
    <section
      aria-hidden="true"
      // The image is decorative and the surrounding sections carry
      // the narrative, so the section is hidden from assistive
      // technology to avoid forcing screen reader users through a
      // pause that does not contain meaning.
      className="bg-paper-light w-full"
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="presentation"
          focusable="false"
        >
          {/* Sky. Solid Paper Light, no gradient. */}
          <rect
            x={0}
            y={0}
            width={VIEWBOX_WIDTH}
            height={HORIZON_Y}
            fill="var(--color-paper-light)"
          />

          {/* Distant ridges in Sightline, pushed up against the
              horizon line. Solid fill, no stroke. */}
          <path d={RIDGE_PATH} fill="var(--color-sightline)" fillOpacity={0.32} />

          {/* The horizon itself. A single hairline rule in Ink, one
              stroke unit thick, the same weight as the brand's
              hairline rule everywhere else on the site. */}
          <line
            x1={0}
            y1={HORIZON_Y}
            x2={VIEWBOX_WIDTH}
            y2={HORIZON_Y}
            stroke="var(--color-ink)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />

          {/* Sea or distant land. Solid Meridian. */}
          <rect
            x={0}
            y={HORIZON_Y}
            width={VIEWBOX_WIDTH}
            height={VIEWBOX_HEIGHT - HORIZON_Y}
            fill="var(--color-meridian)"
          />
        </svg>
      </div>
    </section>
  );
}
