import type { SVGProps } from "react";

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

/**
 * The wordmark. The firm name set in the display serif at light
 * weight. The Y descender in Skeye is the brand's sightline; on
 * the homepage hero (and the cover of A Clear View) it is set in
 * Horizon, otherwise in the colour the parent provides.
 *
 * For tight squares (favicon, social) use SightlineMark instead.
 */
export function Wordmark({
  className,
  size = "default",
  withSightline = false,
}: {
  className?: string;
  size?: "small" | "default" | "large";
  withSightline?: boolean;
}) {
  const fontSize = size === "small" ? "1.25rem" : size === "large" ? "2.25rem" : "1.75rem";
  return (
    <span
      className={`relative inline-block font-serif leading-none font-light tracking-tight ${
        className ?? ""
      }`}
      style={{ fontSize }}
    >
      <span aria-hidden>ClearSkeye</span>
      <span className="sr-only">ClearSkeye</span>
      {withSightline ? (
        <span
          aria-hidden
          /*
           * The descender is one stroke unit thick, square capped,
           * and drops by approximately one cap height from the
           * baseline. It is positioned under the Y in Skeye, which
           * sits at roughly 84 percent of the wordmark's optical
           * width in Spectral 300.
           */
          className="bg-horizon absolute"
          style={{
            left: "84%",
            top: "0.78em",
            width: "2px",
            height: "0.85em",
          }}
        />
      ) : null}
    </span>
  );
}
