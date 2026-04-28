# Living Docs

This folder tracks the current production state of the ClearSkeye web app.

## Current state

- App Router Next.js site with a holding-company landing page.
- Main route implemented in `app/page.tsx` with semantic sections:
  - header and skip link
  - hero
  - subsidiary portfolio grid (4 cards)
  - contact CTA section
- Animated day-cycle sky background integrated behind homepage content via `DayCycleSkyBackground`.
- Sky animation is client-side (`requestAnimationFrame` + CSS variables) with reduced-motion fallback.
- Night-phase rendering intentionally uses no stars, only atmospheric gradient, horizon glow, night overlay, and vignette.
- Loading UI implemented in `app/loading.tsx`.
- Styling system implemented in `app/globals.css` with:
  - OKLCH tokenized color palette
  - responsive layout rules
  - interaction/focus states
  - equal-size subsidiary card grid behavior
  - sky-aware text contrast adaptation via `--sky-darkness` and homepage-scoped adaptive tokens
- No backend API routes yet.
- No required environment variables yet.
