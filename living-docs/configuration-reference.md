# Configuration Reference

## Environment Variables

## Server-Only (Next.js Route Handlers)

These are read from `process.env` in `app/api/**/route.ts` and must never be exposed client-side.

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

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint .`
- `format`: `prettier -w .`
- `check`: `eslint . && next build`

Dependencies include Next.js 16, React 19, Tailwind 4, Zod, Resend, and Vercel telemetry packages.

## `postcss.config.mjs`

- Uses `@tailwindcss/postcss` for Tailwind v4 integration with Next.js.

## `tailwind.config.ts`

- Content scan paths:
  - `./app/**/*.{ts,tsx}`
  - `./src/**/*.{ts,tsx}`
- Empty `theme.extend` and plugin arrays currently.

## TypeScript Config (`tsconfig.json`)

- Standard Next.js compiler options with `noEmit`.
- Includes Next type plugin (`plugins: [{ name: 'next' }]`).
- Includes generated Next types from `.next/types/**/*.ts`.

## Lint + Formatting

## `eslint.config.mjs`

- Flat config style.
- Uses `eslint-config-next/core-web-vitals`.

## `.prettierignore`

- Controls formatting exclusion patterns (project-defined).

## Hosting and Routing Configuration

- No `vercel.json` rewrite needed; Next.js routing and API handlers are native.

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
4. Validate that no server-only secret is referenced through `NEXT_PUBLIC_` prefixed vars.
