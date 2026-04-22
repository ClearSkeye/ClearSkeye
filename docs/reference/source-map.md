# Source Map (File-by-File Runtime Reference)

This document maps each runtime-relevant file to its responsibility, inputs, and outputs.

It is intended to support:

- onboarding
- troubleshooting
- impact analysis before changes

---

## 1. Root-level files

### `index.html`

- Static document shell for Vite app.
- Declares root mount node (`#root`) and module entry script.
- Contains placeholder title replaced by runtime metadata handling.

### `package.json`

- Defines dev/build/lint/format scripts.
- Declares runtime and dev dependencies for frontend + serverless API code.

### `vite.config.ts`

- Registers Vite plugins:
  - React SWC transform
  - Tailwind integration

### `tailwind.config.ts`

- Configures Tailwind content scanning paths and base theme extension point.

### `tsconfig.json`

- Project reference root:
  - app config
  - node/tooling config

### `tsconfig.app.json`

- TypeScript behavior for frontend source under `src/`.

### `tsconfig.node.json`

- TypeScript behavior for node-side tooling config (`vite.config.ts`).

### `eslint.config.js`

- Lint rules and recommended presets for TypeScript/React code.

### `vercel.json`

- Rewrite config for SPA fallback routing.

### `.gitignore`

- Excludes generated artifacts, local env files, and editor/system noise.

### `.prettierignore`

- Excludes generated and dependency directories from formatting.

### `README.md`

- High-level project usage and deployment notes.
- Links to architecture/configuration documentation.

---

## 2. API runtime files (`api/`)

### `api/contact.ts`

Role:

- Contact message ingestion endpoint.

Inputs:

- HTTP `POST /api/contact` JSON body.
- env vars:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`

Outputs:

- `200 { ok: true }` on accepted submission.
- `405` on method mismatch.
- `400` on validation/general failure.
- `500` when required env var missing.

External calls:

- `resend.emails.send(...)`

### `api/ghost-posts.ts`

Role:

- Latest-posts proxy endpoint for Ghost content.

Inputs:

- HTTP `GET /api/ghost-posts`
- env vars:
  - `GHOST_URL`
  - `GHOST_CONTENT_API_KEY`

Outputs:

- `200 { posts: [...] }` on success.
- `204` when env vars missing (feature disabled path).
- `405` on method mismatch.
- `502` on upstream non-OK.
- `400` on parsing/request issues.

External calls:

- Ghost Content API (`/ghost/api/content/posts/`)

---

## 3. Frontend runtime files (`src/`)

### `src/main.tsx`

- Browser entrypoint and app mount.
- Applies providers and telemetry components.

### `src/App.tsx`

- Top-level page composition and section ordering.
- Wires CTA scroll behaviors and canonical URL prop.

### `src/index.css`

- Tailwind import and minimal baseline document styles.

### `src/content/site.ts`

- Central content/branding configuration object consumed across UI and metadata components.

---

## 4. Frontend component files (`src/components/`)

## 4.1 Utility components

### `src/components/PageSeo.tsx`

- Head metadata and JSON-LD emitter.
- Uses `site` content + `canonicalUrl` prop.

### `src/components/GhostPortalScript.tsx`

- Conditional Ghost `members.js` injection based on `VITE_GHOST_URL`.
- Prevents duplicate script insertion by DOM id check.

## 4.2 Layout/UI primitives

### `src/components/layout/Container.tsx`

- Shared responsive width + horizontal padding wrapper.

### `src/components/ui/Button.tsx`

- Shared button primitive with typed variants and focus/disabled behavior.

## 4.3 Section components

### `src/components/sections/Nav.tsx`

- Sticky top navigation with in-page section links and contact CTA.

### `src/components/sections/Hero.tsx`

- Intro narrative + CTA block with motion animations.

### `src/components/sections/SocialProof.tsx`

- Placeholder trust/logo tiles.

### `src/components/sections/LatestPosts.tsx`

- Calls client helper to fetch latest blog posts.
- Hides section when data unavailable.

### `src/components/sections/ValueProps.tsx`

- Static feature cards section (`id="features"`).

### `src/components/sections/Quote.tsx`

- Static testimonial section.

### `src/components/sections/NewsletterCta.tsx`

- Newsletter subscribe CTA using Ghost portal helper.

### `src/components/sections/Contact.tsx`

- Controlled contact form and submit status machine.
- Calls `submitContact()` helper.

### `src/components/sections/Footer.tsx`

- Footer branding and navigation links.

---

## 5. Frontend helper files (`src/lib/`)

### `src/lib/contact.ts`

- Shared contact request schema and submission helper.
- Throws errors for non-OK endpoint responses.

### `src/lib/ghost.ts`

- Ghost Portal open helper with fallback redirect behavior.
- Declares optional global `window.Portal` type.

### `src/lib/ghostPosts.ts`

- Fetch helper and type for `/api/ghost-posts` responses.
- Maps `204` to empty array for graceful feature disable.

---

## 6. Public static assets (`public/`)

### `public/robots.txt`

- Crawler directives and sitemap URL reference.

### `public/sitemap.xml`

- Sitemap URL entries (currently single root entry).

### `public/og.svg`

- Social preview image asset referenced by metadata.

### `public/favicon.svg`

- Browser favicon asset.

### `public/icons.svg`

- Additional icon sprite/static icon asset.

---

## 7. Documentation and maintenance files

### `docs/architecture/*`

- System, frontend, and backend architecture references.

### `docs/configuration/*`

- Full configuration surface and environment matrix.

### `docs/operations/*`

- Deployment flow and troubleshooting runbooks.

### `living-docs/*`

- Legacy documentation set retained for continuity.
- Prefer `docs/` as the canonical home going forward.
