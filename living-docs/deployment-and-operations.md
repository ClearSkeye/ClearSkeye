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

No environment variables are required in the current clean-slate state.

## Build and Run

```bash
npm run build
npm run start
```

Build pipeline is a single Next.js production build (`next build`).

## Deployment Model (Vercel)

1. Connect/import repository in Vercel.
2. Deploy.

No custom rewrite config is required; Vercel auto-detects Next.js and handles routing.

## Runtime Dependencies

- No third-party runtime dependencies are configured.

## Security and Compliance Notes

- Add secrets only when backend/API functionality is introduced.

## Recommended Operational Cadence

- **Per feature change:** update relevant `living-docs` files in same PR.
- **Weekly or before release:** verify env matrix and external integrations.
- **Quarterly:** revalidate dependencies and update docs for architectural drift.
