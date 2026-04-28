# Living Docs

This folder tracks the current production state of the ClearSkeye web app.

## Current state

- App Router Next.js site with a holding-company landing page.
- Main route implemented in `app/page.tsx` with semantic sections:
  - header and skip link
  - hero
  - subsidiary portfolio grid (4 cards)
  - contact CTA section
- Loading UI implemented in `app/loading.tsx`.
- Styling system implemented in `app/globals.css` with:
  - OKLCH tokenized color palette
  - responsive layout rules
  - interaction/focus states
  - equal-size subsidiary card grid behavior
- No backend API routes yet.
- No required environment variables yet.
