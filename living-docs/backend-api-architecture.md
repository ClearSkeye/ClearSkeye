# Backend API Architecture

## Runtime Model

Backend logic is implemented as Next.js route handlers in `app/api/**/route.ts`.

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

## Security + Data Handling

- API keys never exposed to browser; server reads from env only.
- Contact submission includes honeypot trap for low-effort spam bots.
- No persistent storage means no message retention in application layer.
- Contact emails are transmitted to Resend and target inbox only.

## Operational Considerations

- Endpoint availability depends entirely on external provider uptime:
  - Resend for contact sending.
- Frontend is intentionally resilient:
  - Contact displays error text and allows retry.
