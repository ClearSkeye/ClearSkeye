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

Next.js dev server handles frontend rendering and route handlers under `/api/*`.

## Local Env Setup

Create a local env file (for example `.env.local`) with the variables you need:

- Optional for frontend Ghost subscribe UX:
  - `NEXT_PUBLIC_GHOST_URL`
- Required if testing contact API in a serverless-compatible local runtime:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- Required if testing latest posts server endpoint:
  - `GHOST_URL`
  - `GHOST_CONTENT_API_KEY`

Never commit real secret values.

## Build and Run

```bash
npm run build
npm run start
```

Build pipeline:

1. Next.js production build (`next build`)

## Deployment Model (Vercel)

1. Connect/import repository in Vercel.
2. Configure environment variables per target environment (Preview/Production).
3. Deploy.

No custom rewrite config is required; Vercel auto-detects Next.js and handles routing.

## Runtime Dependencies

- **Resend:** Contact submission delivery.
- **Ghost Content API:** Latest posts section.
- **Ghost Portal script (`members.js`):** Newsletter modal/signup UX.
- **Vercel Analytics + Speed Insights:** Frontend telemetry.

## Monitoring and Troubleshooting

## Contact Form Failures

Symptoms:

- User sees error message after submit.

Checks:

1. Confirm `/api/contact` method is POST.
2. Check Vercel logs for missing env var errors.
3. Verify Resend key validity and sender domain verification.
4. Confirm payload constraints (email format, max lengths).

## Blog Posts Not Showing

Symptoms:

- "Latest from the blog" section absent.

Checks:

1. Verify `GHOST_URL` and `GHOST_CONTENT_API_KEY` are set.
2. Confirm Ghost endpoint reachable and key has content API access.
3. Inspect `/api/ghost-posts` response code:
   - `204`: config missing/feature disabled.
   - `502`: upstream Ghost request failed.
   - `400`: validation/parsing issue.

## Newsletter Subscribe Button Appears Inactive

Symptoms:

- Subscribe click does not open modal or redirect.

Checks:

1. Ensure `NEXT_PUBLIC_GHOST_URL` is present at build time.
2. Confirm Ghost `members.js` loads in browser network panel.
3. Verify the Ghost instance supports portal/members.

## Security and Compliance Notes

- Keep API keys server-only (`process.env`, never `NEXT_PUBLIC_`).
- Rotate provider keys on suspicion of exposure.
- Do not log full user message content unless explicitly required.
- Honeypot field reduces basic automated spam traffic.

## Recommended Operational Cadence

- **Per feature change:** update relevant `living-docs` files in same PR.
- **Weekly or before release:** verify env matrix and external integrations.
- **Quarterly:** revalidate dependencies and update docs for architectural drift.
