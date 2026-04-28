# Deployment and Operations

## Local Development

## Prerequisites

- Node.js (current LTS recommended)
- npm

## Start Workflow

```bash
npm install
npm run dev
```

No environment variables are required in the current frontend-only state.

Primary UI surface:

- `/` holding-company landing page with subsidiary portfolio cards and contact CTA.

## Build and Run

```bash
npm run build
npm run start
```

Build pipeline is a standard Next.js production build (`next build`) and start (`next start`).

## Deployment Model (Vercel)

1. Connect/import repository in Vercel.
2. Deploy.

No custom rewrite config is required; Vercel auto-detects Next.js and handles routing.

## Runtime Dependencies

- Runtime dependencies are limited to Next.js and React packages.

## Security and Compliance Notes

- Add secrets only when backend/API functionality is introduced.
- Current contact interaction is `mailto:` based and does not transmit server-side payloads.

## Recommended Operational Cadence

- **Per feature change:** update relevant `living-docs` files in same PR.
- **Weekly or before release:** verify metadata, public assets, and deployment behavior.
- **Quarterly:** revalidate dependencies and update docs for architectural drift.
