import type { SVGProps } from "react";

/* The wordmark is rendered from outlined glyphs of Spectral Light
   (the open source stand-in for Tiempos Headline Light) generated
   at build time by `scripts/generate-wordmark.mjs`. See the
   <Wordmark /> component below. */
import wordmarkData from "./wordmark.generated.json";

/* ============================================================
   ClearSkeye iconography.
   Line icons only. One stroke unit thickness. Square caps.
   Drawn on a 24 pixel grid. No fills. Recoloured to currentColor
   so they inherit Ink, Sightline, or Paper from their parent.
   ============================================================ */

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

function BaseIcon({ title, children, ...rest }: IconProps & { children: React.ReactNode }) {
  const ariaProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...ariaProps}
      {...rest}
    >
      {children}
    </svg>
  );
}

/**
 * The sightline mark. The brand's secondary mark, used wherever
 * the wordmark cannot be set (favicons, tight social squares).
 * Vertical line crossed at one third from the top by a horizontal
 * of equal stroke. Reads as a sightline crossing a horizon.
 */
export function SightlineMark(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12h15" />
      <path d="m13 5 7 7-7 7" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </BaseIcon>
  );
}

/* The legacy marks below are retained for non-brand surfaces
   such as build tools or repository links. They are line drawn
   to match the brand's icon discipline. */

export function GitHubIcon(props: IconProps) {
  return (
    <BaseIcon strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-4 1.5-4-2-6-2" />
      <path d="M15 21v-3.5c0-1 0-1.5-.5-2 2.5-.3 5-1.5 5-5.5a4.4 4.4 0 0 0-1.2-3.1 4 4 0 0 0-.1-3.1s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.4 1.5 5.4 1.8 5.4 1.8a4 4 0 0 0-.1 3.1A4.4 4.4 0 0 0 4 8c0 4 2.5 5.2 5 5.5-.5.5-.5 1-.5 2V21" />
    </BaseIcon>
  );
}

/* The wordmark renders outlined glyph paths (see `wordmarkData`
   imported at the top of this file). Outlining means the logo
   paints identically in every browser and breakpoint, the page
   does not depend on the Spectral webfont having loaded for the
   logo to be correct, and the Y descender lines up to the actual
   stroke of the y glyph rather than to a CSS guess.

   Re-run `pnpm gen:wordmark` whenever the brand changes the
   wordmark text, the display serif, or the sightline rules. */

type WordmarkSize = "small" | "default" | "large";

// The on-screen cap height for each wordmark size, expressed in
// rem. We size the SVG by cap height, not em height, because cap
// height is what the eye reads as "the size of the wordmark". The
// descender (when present) extends below the cap area without
// changing the perceived size. These values match the perceived
// optical size of the previous CSS-text wordmark at Spectral 1.25 /
// 1.75 / 2.25 rem (cap-to-em ratio in Spectral is ≈ 0.66).
const CAP_HEIGHT_REM: Record<WordmarkSize, number> = {
  small: 0.825,
  default: 1.155,
  large: 1.485,
};

/**
 * The wordmark. The firm name outlined from the display serif. On
 * the homepage hero (and on the cover of A Clear View) the Y in
 * Skeye carries the brand's sightline: a vertical descender in
 * Horizon, one stroke unit thick, dropping by one cap height. Pass
 * `withSightline` only in those premium contexts.
 *
 * For tight squares (favicon, social) use SightlineMark instead.
 */
export function Wordmark({
  className,
  size = "default",
  withSightline = false,
}: {
  className?: string;
  size?: WordmarkSize;
  withSightline?: boolean;
}) {
  const { pathData, viewBoxBody, viewBoxFull, capHeight, descender, width } = wordmarkData;
  const capRem = CAP_HEIGHT_REM[size];
  const viewBox = withSightline ? viewBoxFull : viewBoxBody;
  // Height in rem for the rendered SVG: cap height drives perceived
  // size; we scale the viewBox height back into rem accordingly.
  const heightUnits = withSightline ? capHeight + descender.yEnd : capHeight;
  const heightRem = (capRem * heightUnits) / capHeight;
  const widthRem = (capRem * width) / capHeight;

  // When the sightline is on we crop the wordmark to the area above
  // the baseline. That removes the lowercase y's natural descender
  // (the small curl) so the only thing reading as a descender is
  // the brand sightline, which then drops cleanly from the apex of
  // the y. When the sightline is off we render the full wordmark
  // including the natural y tail and have no descender area below.
  const clipId = "wordmark-above-baseline";

  return (
    <span
      className={`inline-block leading-none ${className ?? ""}`}
      style={{ width: `${widthRem.toFixed(3)}rem` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        role="img"
        aria-label="ClearSkeye"
        focusable="false"
        style={{ width: "100%", height: `${heightRem.toFixed(3)}rem`, display: "block" }}
      >
        {withSightline ? (
          <>
            <defs>
              <clipPath id={clipId}>
                {/* Cover everything above the baseline (y ≤ 0) so the
                    lowercase y's natural curled tail is hidden. The
                    rect is generously oversized so it never clips a
                    cap-top regardless of viewport. */}
                <rect x={-2000} y={-4000} width={width + 4000} height={4000} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${clipId})`}>
              <path d={pathData} fill="currentColor" />
            </g>
            <line
              x1={descender.x}
              y1={descender.yStart}
              x2={descender.x}
              y2={descender.yEnd}
              stroke="var(--color-horizon)"
              strokeWidth={descender.strokeWidth}
              strokeLinecap="square"
            />
          </>
        ) : (
          <path d={pathData} fill="currentColor" />
        )}
      </svg>
    </span>
  );
}
