# Frontend Architecture

## Current UI

The frontend renders a production-style landing page for the Clearskeye holding company.

## Route Structure

- `/` -> `app/page.tsx`
- route loading state -> `app/loading.tsx`

## Page Composition (`app/page.tsx`)

- `main.page` wrapper with accessibility skip link (`#portfolio`).
- `DayCycleSkyBackground` mounted at top of page content stack.
- Header section with brand line and contact entry point.
- Hero section with positioning copy.
- Portfolio section with a 4-card subsidiary grid:
  - BigSkeye
  - DarkSkeye
  - GreySkeye
  - AiSkeye
- Contact section with holding-company mail CTA.

## Styling System (`app/globals.css`)

- Tokenized design variables in `:root` (color, spacing, radius, sizing constraints).
- OKLCH-based palette and semantic text/surface roles.
- Homepage-scoped adaptive tokens driven by sky darkness (`--sky-darkness`) for text and surface contrast transitions.
- Responsive behavior:
  - single-column card stack on small screens
  - fixed 2x2 subsidiary grid from tablet size and up
- Visual consistency controls:
  - equal card width/height strategy via grid constraints
  - normalized content measure and section max widths
  - card row alignment and consistent CTA placement
- Interaction states:
  - `:focus-visible` ring treatment
  - hover variants under `@media (hover: hover)`
  - touch target adjustments under `@media (pointer: coarse)`

## Sky Background Component (`app/components/DayCycleSkyBackground/*`)

- Client component (`"use client"`) with browser-timed animation (`requestAnimationFrame`, `performance.now`).
- Data-driven day-cycle interpolation model with smooth segment blending.
- Layered atmospheric rendering:
  - base sky gradient
  - solar glow
  - horizon warmth layer
  - night overlay
  - vignette
- Reduced-motion handling via `matchMedia("(prefers-reduced-motion: reduce)")`:
  - disables continuous animation
  - renders a stable single phase
- Night rendering is clear-sky only, with no star field.

## Metadata and Shell (`app/layout.tsx`)

- Page title and description configured for holding-company positioning.
- Viewport configured with `viewportFit: 'cover'` for modern devices.
