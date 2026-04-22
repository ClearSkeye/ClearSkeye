# Backend API Architecture

## Runtime Model

Backend logic is implemented as Vercel Node serverless functions in `api/*.ts`. Each endpoint exports a default handler with `(req, res)` from `@vercel/node`.

Common traits:

- Explicit method guards with `405 Method Not Allowed`.
- Input/env validation with Zod and helper checks.
- Plain-text error bodies for diagnostics.
- No shared middleware layer; each endpoint is self-contained.

## Endpoint: `POST /api/contact`

## Purpose

Accept contact form submissions and forward message content to a configured inbox via Resend.

## Contract

- **Method:** `POST`
- **Body:** JSON object:
  - `name` (required, 1..120)
  - `email` (required, valid email, <=254)
  - `message` (required, 1..4000)
  - `company` (optional, <=200)
  - `website` (optional, <=200)
  - `honeypot` (optional, must be empty if present)

## Processing Steps

1. Reject non-POST methods.
2. Parse and validate body with `ContactSchema`.
3. If `honeypot` is non-empty, return success without sending email.
4. Read required environment:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
5. Construct subject/body text payload.
6. Send via `resend.emails.send(...)`.
7. Return JSON `{ ok: true }`.

## Error Behavior

- Missing env var -> `500` with message `Missing environment variable: ...`.
- Validation errors and other known errors -> `400` text response.
- Method mismatch -> `405` with `Allow: POST`.

## Endpoint: `GET /api/ghost-posts`

## Purpose

Fetch the latest published post metadata from Ghost Content API for optional "Latest from the blog" cards on the landing page.

## Contract

- **Method:** `GET`
- **Response (success):**
  - Status `200`
  - JSON `{ posts: Array<{ id, title, url, excerpt?, published_at? }> }`

## Processing Steps

1. Reject non-GET methods.
2. Read required environment:
   - `GHOST_URL`
   - `GHOST_CONTENT_API_KEY`
3. Build Ghost API URL with query params:
   - `limit=3`
   - `fields=id,title,url,excerpt,published_at`
   - `formats=plaintext`
4. Request Ghost endpoint.
5. If Ghost response non-OK, return `502`.
6. Parse payload with `GhostPostsResponseSchema`.
7. Return normalized JSON posts list.

## Error Behavior

- Missing env var -> `204` (feature disabled / no content path).
- Request or parse failures -> `400`.
- Upstream Ghost non-OK -> `502` with diagnostic text.
- Method mismatch -> `405` with `Allow: GET`.

## Security + Data Handling

- API keys never exposed to browser; server reads from env only.
- Contact submission includes honeypot trap for low-effort spam bots.
- No persistent storage means no message retention in application layer.
- Contact emails are transmitted to Resend and target inbox only.

## Operational Considerations

- Endpoint availability depends entirely on external provider uptime:
  - Resend for contact sending.
  - Ghost API for blog previews.
- Frontend is intentionally resilient:
  - Contact displays error text and allows retry.
  - Latest posts section silently disappears on failures.
