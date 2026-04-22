# Backend API Architecture

## 1. Runtime and implementation model

Server behavior is implemented with Vercel Node serverless functions.

- Source directory: `api/`
- Runtime contract: default-exported handler `(req, res)` typed with `VercelRequest` and `VercelResponse`.
- Endpoint style: one file per endpoint, no shared middleware layer.

Shared design characteristics:

1. Explicit method guards (`405 Method Not Allowed` + `Allow` header).
2. Input and/or environment validation before provider calls.
3. Simple response payloads (JSON success, plain text errors).
4. External integrations isolated inside endpoint handler logic.

---

## 2. Endpoint inventory

### 2.1 `POST /api/contact`

- File: `api/contact.ts`
- Purpose: forward validated contact submissions to email inbox via Resend.

### 2.2 `GET /api/ghost-posts`

- File: `api/ghost-posts.ts`
- Purpose: fetch and return latest Ghost posts for optional homepage section.

---

## 3. `POST /api/contact` detailed contract

## 3.1 Request interface

- Method: `POST`
- Content-Type expected by client: `application/json`
- Body schema (Zod `ContactSchema`):
  - `name`: string, min 1, max 120
  - `email`: string, valid email, max 254
  - `message`: string, min 1, max 4000
  - `company`: optional string, max 200
  - `website`: optional string, max 200
  - `honeypot`: optional string, max 0 (must be empty when present)

## 3.2 Response interface

Success:

- Status: `200`
- Headers: `content-type: application/json`
- Body: `{ "ok": true }`

Error:

- Method mismatch:
  - Status: `405`
  - Header: `Allow: POST`
  - Body: `Method Not Allowed`
- Validation/provider/general failures:
  - Status: `400` for most errors
  - Status: `500` when missing required environment variable
  - Header: `content-type: text/plain; charset=utf-8`
  - Body: diagnostic text message

## 3.3 Execution path

1. Verify `req.method === 'POST'`; otherwise return `405`.
2. Parse `req.body` with `ContactSchema`.
3. If `honeypot` has any content:
   - return `200 { ok: true }` immediately
   - do not call Resend.
4. Read required env vars:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
5. Build subject and text body:
   - subject includes `company` when present, else fallback `Website`
   - text body includes only optional fields that were provided.
6. Send email via:
   - `new Resend(apiKey).emails.send({ to, from, subject, replyTo, text })`
7. Return success payload.
8. Catch exceptions and map to status (`500` for missing env var prefix match, else `400`).

## 3.4 Spam mitigation behavior

Honeypot field strategy:

- The frontend renders a hidden input (`honeypot`).
- Legitimate users leave it empty.
- Basic bots may populate it.
- Endpoint treats populated honeypot as successful but drops message.

This avoids exposing bot-detection behavior while reducing junk email volume.

---

## 4. `GET /api/ghost-posts` detailed contract

## 4.1 Request interface

- Method: `GET`
- Request body: ignored.

## 4.2 Upstream dependency contract (Ghost Content API)

Server builds request URL:

- Base: `${GHOST_URL}/ghost/api/content/posts/`
- Query parameters:
  - `key=<GHOST_CONTENT_API_KEY>`
  - `limit=3`
  - `fields=id,title,url,excerpt,published_at`
  - `formats=plaintext`
- Header: `accept: application/json`

## 4.3 Response interface

Success:

- Status: `200`
- Header: `content-type: application/json`
- Body: `{ "posts": Array<{ id, title, url, excerpt?, published_at? }> }`

Error/disabled paths:

- Method mismatch:
  - Status: `405`
  - Header: `Allow: GET`
  - Body: `Method Not Allowed`
- Missing required environment variable:
  - Status: `204`
  - Body: text message (ignored by client)
  - Semantics: feature disabled/unavailable
- Upstream Ghost non-OK:
  - Status: `502`
  - Body: `Ghost request failed (<status>)`
- Parsing/request errors:
  - Status: `400`
  - Body: diagnostic text

## 4.4 Response validation and normalization

`GhostPostsResponseSchema` validates upstream JSON:

- `posts` defaults to empty array when absent.
- Each item enforces:
  - `id`: string
  - `title`: string
  - `url`: string
  - `excerpt`: optional nullable string
  - `published_at`: optional nullable string

Only validated data is returned to the frontend.

---

## 5. Error handling semantics and client impact

### 5.1 Contact endpoint client impact

- Non-OK responses throw in `submitContact()` with server text payload.
- UI displays returned message in `Contact` section.

### 5.2 Ghost posts endpoint client impact

- `204` is treated by client helper as empty list.
- Empty list causes `LatestPosts` component to return `null`.
- Other non-OK statuses throw and are also mapped to hidden section behavior.

Result: optional blog content fails closed without impacting primary page rendering.

---

## 6. Security and data-handling profile

1. API secrets are server-only (`process.env`) and never intentionally exposed in browser bundles.
2. No persistent backend storage; message content is forwarded to email provider and not stored by app.
3. Reply path for contact emails is set to submitter's email (`replyTo`), allowing direct operator response.
4. Endpoint errors return plain text diagnostic messages; avoid including sensitive values in thrown errors.

---

## 7. Operational dependencies and failure domains

`/api/contact` depends on:

- Resend API availability
- valid API key
- verified sender configuration

`/api/ghost-posts` depends on:

- Ghost instance reachability
- valid content API key
- response shape compatibility with schema

Failure in either integration does not crash frontend boot; it only affects the related feature path.

---

## 8. Potential backend extension patterns

If endpoint count increases:

- Introduce shared helper module(s), e.g. `api/_shared/env.ts`, `api/_shared/http.ts`, for:
  - env variable assertions
  - common error formatting
  - standardized JSON responses
- Keep per-endpoint contracts explicit and documented in this file.
