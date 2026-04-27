# Configuration Reference

## Build and Tooling Configuration

## `package.json`

- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`

Dependencies include only Next.js and React runtime packages plus TypeScript types.

## TypeScript Config (`tsconfig.json`)

- Standard Next.js compiler options with `noEmit`.
- Includes Next type plugin (`plugins: [{ name: 'next' }]`).
- Includes generated Next types from `.next/types/**/*.ts`.

## Formatting

- `.prettierignore` is kept for optional formatting workflows.

## Hosting and Routing Configuration

- `vercel.json` sets framework detection to `nextjs`.

## Static/Public Config Files

- `public/robots.txt` - crawler directives.
- `public/sitemap.xml` - URL index; must reflect production domain.
- `public/og.svg` - default OG image used by metadata.
- `public/favicon.svg`, `public/icons.svg` - icon assets.

## Configuration Management Checklist

When rebuilding features:

1. Add to this document with purpose, owner, and failure behavior.
2. Add environment keys only when needed.
3. Document local development setup if needed.
