# ClearSkeye

A minimal, high-conversion landing page built with Next.js (App Router) and deployable on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Vercel deployment

- Import this repo into Vercel.
- Set environment variables (below).
- Deploy.

### Environment variables

#### Contact form (`/api/contact`)

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_TO_EMAIL`: Where contact emails should go (your inbox).
- `CONTACT_FROM_EMAIL`: Verified sender in Resend (e.g. `ClearSkeye <hello@yourdomain.com>`).

## Customizing the site

Edit the core copy and URLs in [`src/content/site.ts`](src/content/site.ts). Update `public/sitemap.xml` and `public/robots.txt` with your real domain.

## Living documentation

Detailed architecture and configuration docs live in [`living-docs/`](living-docs/):

- [`living-docs/README.md`](living-docs/README.md)
- [`living-docs/architecture-overview.md`](living-docs/architecture-overview.md)
- [`living-docs/frontend-architecture.md`](living-docs/frontend-architecture.md)
- [`living-docs/backend-api-architecture.md`](living-docs/backend-api-architecture.md)
- [`living-docs/configuration-reference.md`](living-docs/configuration-reference.md)
- [`living-docs/deployment-and-operations.md`](living-docs/deployment-and-operations.md)
