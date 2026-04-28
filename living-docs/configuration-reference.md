# Configuration Reference

## Build and Tooling Configuration

## `package.json`

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`

Dependencies currently include:

- runtime: `next`, `react`, `react-dom`
- development/types: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`

## TypeScript Config (`tsconfig.json`)

- Standard Next.js compiler options with `noEmit`.
- Includes Next type plugin (`plugins: [{ name: 'next' }]`).
- Includes generated Next types from `.next/types/**/*.ts`.

## Formatting

- `.prettierignore` is kept for optional formatting workflows.

## Hosting and Routing Configuration

- `vercel.json` sets framework detection to `nextjs`.
- Routing is handled by App Router file conventions (no custom rewrite rules currently).

## Static/Public Config Files

- `public/robots.txt` - crawler directives.
- `public/sitemap.xml` - URL index; must reflect production domain.
- `public/og.svg` - default OG image used by metadata.
- `public/icons.svg` - icon sprite asset.

## Configuration Management Checklist

When adding or changing features:

1. Add to this document with purpose, owner, and failure behavior.
2. Add environment keys only when needed.
3. Document local development setup when it deviates from `npm install && npm run dev`.
4. Keep public asset inventory aligned with actual files under `public/`.
