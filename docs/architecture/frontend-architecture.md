# Frontend Architecture

## 1. Runtime entrypoint and providers

### 1.1 `src/main.tsx`

`main.tsx` bootstraps the React runtime and mounts into `#root`:

- `StrictMode` wraps the tree for development diagnostics.
- `HelmetProvider` enables declarative document/head updates from `PageSeo`.
- `<Analytics />` and `<SpeedInsights />` register Vercel client telemetry.
- Global style import occurs once via `import './index.css'`.

This file is the only browser bootstrapping entry.

### 1.2 `index.html` relationship

- `index.html` contains static shell:
  - `<div id="root"></div>`
  - module script to `/src/main.tsx` (during dev; transformed in build output).
- Initial hard-coded `<title>tmp-vite</title>` is later overridden by Helmet at runtime.

---

## 2. Page composition and section ordering

### 2.1 `src/App.tsx`

`App` defines global page sequencing and interaction wiring:

1. `PageSeo` (metadata and structured data).
2. `GhostPortalScript` (optional script injector).
3. Skip-link (`href="#main"`).
4. Sticky `Nav`.
5. `<main id="main">` with:
   - `Hero`
   - `SocialProof`
   - `LatestPosts`
   - `ValueProps`
   - `Quote`
   - `NewsletterCta`
   - `Contact`
6. `Footer`

### 2.2 In-page navigation model

- Section IDs provide navigation anchors:
  - `proof`
  - `features`
  - `newsletter`
  - `contact`
- CTA callbacks in `Hero` are passed from `App` and use
  `document.getElementById(...).scrollIntoView({ behavior: 'smooth' })`.

There is no React Router usage and no route-level layout switching.

---

## 3. Content and branding model

### 3.1 `src/content/site.ts`

`site` is a readonly (`as const`) object that centralizes high-level brand and URL content:

- `name`
- `tagline`
- `description`
- `url`
- `ogImagePath`
- `socials` (`x`, `github`)
- `contact.toEmail` (informational placeholder used in copy/context, not backend delivery target)

### 3.2 Consumption pattern

`site` is consumed across multiple UI areas:

- `Nav` and `Footer` branding glyph + text.
- `PageSeo` title/description/social metadata.
- `App` canonical URL.
- `NewsletterCta` outbound GitHub link.

This keeps content edits primarily in one file.

---

## 4. Shared UI primitives

### 4.1 `Container` (`src/components/layout/Container.tsx`)

Encapsulates page-width and horizontal spacing:

- Tailwind core classes: `mx-auto w-full max-w-6xl px-6`
- Supports optional `className` append.

### 4.2 `Button` (`src/components/ui/Button.tsx`)

Typed primitive with:

- Base interaction and accessibility styles (focus ring, disabled behavior).
- Variants:
  - `primary`
  - `secondary`
  - `ghost`

All CTA buttons share this primitive for consistent interaction affordance.

---

## 5. Functional components by responsibility

### 5.1 Utility components

#### `PageSeo` (`src/components/PageSeo.tsx`)

Sets runtime metadata:

- `<html lang="en" />`
- title and description
- canonical link
- Open Graph tags
- Twitter tags
- JSON-LD Organization schema

Inputs:

- `canonicalUrl` prop from `App`.
- `site` content object values.

#### `GhostPortalScript` (`src/components/GhostPortalScript.tsx`)

Behavior:

1. Reads `import.meta.env.VITE_GHOST_URL`.
2. Normalizes trailing slash.
3. On mount, exits if env missing.
4. Prevents duplicate injection by checking `#ghost-portal-script`.
5. Appends:
   - `src=<ghost-url>/members.js`
   - `data-ghost=<ghost-url>/`
   - `defer`
   - `crossOrigin='anonymous'`

This makes Ghost Portal available via `window.Portal`.

### 5.2 Section components (`src/components/sections/*`)

#### `Nav.tsx`

- Sticky header (`top-0`, blur backdrop).
- Primary in-page links (desktop).
- CTA button scrolls to contact section.

#### `Hero.tsx`

- Uses `motion/react` for staged fade/translate entrance animations.
- Receives `onPrimaryCta` and `onSecondaryCta` callbacks from parent.
- Includes decorative background gradients and preview card skeleton content.

#### `SocialProof.tsx`

- Placeholder trust/logo grid.
- Static array of names rendered in styled tiles.

#### `LatestPosts.tsx`

- Calls `fetchLatestGhostPosts()` in `useEffect` once on mount.
- Local state shape: `GhostPost[] | null`.
- If data unavailable/empty/failure -> returns `null` (section hidden).
- Renders external links in new tab with `rel="noreferrer"`.

#### `ValueProps.tsx`

- Static features array rendered as cards.
- Section id `features` powers nav deep-linking.

#### `Quote.tsx`

- Static testimonial block (placeholder profile).

#### `NewsletterCta.tsx`

- Subscribe button calls `openGhostPortal()`.
- Secondary link to `site.socials.github`.
- Explicit copy note about no-op behavior when Ghost URL is not configured.

#### `Contact.tsx`

- Controlled form fields with per-input state.
- Stable input IDs via `useId`.
- Hidden honeypot input for spam trapping.
- Derived `canSubmit` via `useMemo`.
- Submit state machine:
  - `idle`
  - `submitting`
  - `success`
  - `error` with message
- On success:
  - resets all field state values.
- On error:
  - displays error text returned from thrown `Error`.

#### `Footer.tsx`

- Brand + nav links + dynamic year.
- External GitHub link from `site.socials.github`.

---

## 6. Client integration helpers (`src/lib/*`)

### 6.1 `contact.ts`

- Declares `ContactRequestSchema` using Zod.
- `submitContact()`:
  1. Parses input using schema.
  2. Sends JSON `POST /api/contact`.
  3. On non-OK response, reads response text and throws descriptive error.

Schema constraints:

- `name`: 1..120 chars
- `email`: valid email, max 254
- `message`: 1..4000
- `company`: optional, max 200
- `website`: optional, max 200
- `honeypot`: optional, max 0 (must be empty)

### 6.2 `ghost.ts`

- Extends global `window` typing to include optional `Portal.open`.
- `openGhostPortal()` behavior:
  1. Use `window.Portal.open()` if available.
  2. Else read `VITE_GHOST_URL`, normalize, and redirect browser to `/#/portal/signup`.
  3. Else no-op.

### 6.3 `ghostPosts.ts`

- Defines `GhostPost` type used by `LatestPosts`.
- `fetchLatestGhostPosts()` behavior:
  - calls `GET /api/ghost-posts`
  - `204` -> returns empty array (feature disabled path)
  - non-OK (except 204) -> throws error
  - success -> normalizes to `posts` array

---

## 7. Styling system and conventions

### 7.1 Global CSS

`src/index.css`:

- imports Tailwind (`@import "tailwindcss";`)
- sets `html, body { height: 100%; }`
- resets `body { margin: 0; }`

### 7.2 Styling approach

- Tailwind utility classes inline in JSX.
- No CSS Modules or styled-components.
- Visual hierarchy relies on spacing, typography, subtle shadows, and ring/focus states.

### 7.3 Motion approach

- Limited to hero section through `motion/react`.
- Transitions are deterministic and short.
- No animation orchestration state or scroll-driven motion.

---

## 8. Accessibility and UX details

Implemented:

- Skip link to `#main`.
- Form labels linked to inputs via `htmlFor` + generated IDs.
- Focus-visible ring styles on button primitive.
- Semantic structure (`header`, `main`, `section`, `footer`).

Current constraints:

- No explicit `aria-live` region for async submit outcomes.
- No keyboard shortcut patterns beyond default browser behavior.
- Latest posts loading state is intentionally silent (hidden section).

---

## 9. Frontend error and fallback behavior

1. **Contact submit failure**
   - Error shown inline in form (`status.kind === 'error'`).
2. **Ghost posts fetch failure**
   - Section hidden (`null` render).
3. **Missing Ghost client URL**
   - No script injection and subscribe action may no-op.
4. **Ghost Portal unavailable at click time**
   - Fallback redirect path used when URL exists.

This design biases toward preserving a stable landing page even when optional integrations fail.
