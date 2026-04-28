# Frontend Architecture

## Current UI

The frontend renders a production-style landing page for the Clearskeye holding company.

## Route Structure

- `/` -> `app/page.tsx`
- route loading state -> `app/loading.tsx`

## Page Composition (`app/page.tsx`)

- `main.page` wrapper with accessibility skip link (`#portfolio`).
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

## Metadata and Shell (`app/layout.tsx`)

- Page title and description configured for holding-company positioning.
- Viewport configured with `viewportFit: 'cover'` for modern devices.
