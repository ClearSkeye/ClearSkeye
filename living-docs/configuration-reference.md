# Configuration Reference

## Environment Variables

## Client-Exposed (Vite)

These are read from `import.meta.env` and may be embedded into frontend bundles.

### `VITE_GHOST_URL`

- **Required:** Optional
- **Used by:**
  - `src/components/GhostPortalScript.tsx`
  - `src/lib/ghost.ts`
- **Purpose:** Base URL of Ghost instance for newsletter portal integration.
- **Example:** `https://blog.yourdomain.com`
- **Behavior when missing:** Ghost script is not injected; subscribe fallback redirect is disabled.

## Server-Only (Vercel Functions)

These are read from `process.env` in `api/*.ts` and must never be exposed client-side.

### `RESEND_API_KEY`

- **Required for:** `/api/contact`
- **Purpose:** Authenticate Resend API client.
- **Failure mode when missing:** `/api/contact` returns `500`.

### `CONTACT_TO_EMAIL`

- **Required for:** `/api/contact`
- **Purpose:** Inbox that receives contact form messages.
- **Failure mode when missing:** `/api/contact` returns `500`.

### `CONTACT_FROM_EMAIL`

- **Required for:** `/api/contact`
- **Purpose:** Verified sender identity for Resend outbound email.
- **Format example:** `ClearSkeye <hello@yourdomain.com>`
- **Failure mode when missing:** `/api/contact` returns `500`.

### `GHOST_URL`

- **Required for:** `/api/ghost-posts`
- **Purpose:** Ghost site URL for Content API requests.
- **Failure mode when missing:** `/api/ghost-posts` returns `204` (section disabled path).

### `GHOST_CONTENT_API_KEY`

- **Required for:** `/api/ghost-posts`
- **Purpose:** Ghost Content API key.
- **Failure mode when missing:** `/api/ghost-posts` returns `204`.

## Application Content Configuration

## File: `src/content/site.ts`

Primary runtime content and branding object:

- `name` - displayed in nav/footer and SEO title.
- `tagline` - used in title and footer.
- `description` - SEO description and social descriptions.
- `url` - canonical URL.
- `ogImagePath` - Open Graph/Twitter image path.
- `socials` - external social/profile links.
- `contact.toEmail` - informational placeholder (not used by API directly).

## Build and Tooling Configuration

## `package.json`

- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `lint`: `eslint .`
- `format`: `prettier -w .`
- `preview`: `vite preview`

Dependencies include React 19, Vite 8, Tailwind 4, Zod, Resend, and Vercel telemetry packages.

## `vite.config.ts`

- Plugins:
  - `@vitejs/plugin-react-swc`
  - `@tailwindcss/vite`
- No custom aliases or env transforms defined.

## `tailwind.config.ts`

- Content scan paths:
  - `./index.html`
  - `./src/**/*.{ts,tsx}`
- Empty `theme.extend` and plugin arrays currently.

## TypeScript Project Config

### `tsconfig.json`

- Uses project references:
  - `tsconfig.app.json`
  - `tsconfig.node.json`

### `tsconfig.app.json`

- DOM + ES2023 libs.
- JSX with `react-jsx`.
- `moduleResolution: bundler`.
- Strict-ish linting flags for unused locals/params and switch fallthrough.

### `tsconfig.node.json`

- Node-focused config for Vite config typing.
- Similar bundler mode + lint flags.
- Includes `vite.config.ts`.

## Lint + Formatting

## `eslint.config.js`

- Flat config style.
- Applies to `**/*.{ts,tsx}`.
- Uses:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `react-hooks` recommended
  - `react-refresh` Vite config
  - `eslint-config-prettier`

## `.prettierignore`

- Controls formatting exclusion patterns (project-defined).

## Hosting and Routing Configuration

## `vercel.json`

- Rewrite all paths to `/index.html`:
  - Enables SPA navigation fallback for client-side in-page/deep links.
  - API routes still resolve via Vercel function routing under `/api/*`.

## Static/Public Config Files

- `public/robots.txt` - crawler directives.
- `public/sitemap.xml` - URL index; must reflect production domain.
- `public/og.svg` - default OG image used by metadata.
- `public/favicon.svg`, `public/icons.svg` - icon assets.

## Configuration Management Checklist

When adding any new environment variable or config file:

1. Add to this document with purpose, owner, and failure behavior.
2. Add to deployment provider secrets/settings.
3. Document local development setup if needed.
4. Validate that no server-only secret is referenced through `VITE_` prefixed vars.
