# Deployment and Operations Runbooks

## 1. Local development workflow

## 1.1 Prerequisites

- Node.js (current LTS recommended)
- npm

## 1.2 Start commands

```bash
npm install
npm run dev
```

Behavior notes:

- `npm run dev` starts Vite development server for frontend iteration.
- API routes are authored for Vercel runtime; local API testing requires an environment that can execute Vercel serverless handlers.

## 1.3 Local production-like validation

```bash
npm run build
npm run preview
```

Build pipeline semantics:

1. `tsc -b` validates TypeScript project references.
2. `vite build` generates production frontend bundle.
3. `vite preview` serves built frontend assets locally.

---

## 2. Deployment workflow (Vercel)

1. Import/connect repository in Vercel.
2. Configure environment variables by environment (Preview and Production).
3. Trigger deployment (push or manual deploy).
4. Validate runtime smoke checks:
   - homepage render
   - `POST /api/contact`
   - `GET /api/ghost-posts` (if enabled)

Routing behavior:

- `vercel.json` rewrites non-API paths to `/index.html` for SPA fallback.
- `api/*` endpoints are handled by Vercel serverless function routing.

---

## 3. Runtime dependency map

## 3.1 Core runtime dependencies

- React 19 runtime
- Vite-generated static bundle
- Tailwind CSS runtime classes (compiled)
- Vercel Analytics / Speed Insights scripts

## 3.2 Integration dependencies

- **Resend** for contact form mail delivery
- **Ghost Content API** for latest posts
- **Ghost Portal (`members.js`)** for newsletter signup modal behavior

Operational implication:

- Third-party outages only degrade dependent features; page shell should still render.

---

## 4. Monitoring and troubleshooting runbooks

## 4.1 Runbook: contact form failure

Symptoms:

- User sees submit error in contact section.

Checks:

1. Verify request method is `POST` to `/api/contact`.
2. Check server logs for:
   - missing environment variable message
   - validation errors
   - provider exceptions
3. Confirm all contact env vars are configured:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
4. Confirm `CONTACT_FROM_EMAIL` is valid and verified for Resend.
5. Reproduce with minimally valid payload to isolate user-input validation issues.

Expected status map:

- `200`: accepted/sent (or honeypot short-circuit)
- `400`: validation/general error
- `500`: missing env variable

## 4.2 Runbook: latest posts section missing

Symptoms:

- "Latest from the blog" section does not appear.

Checks:

1. Inspect `/api/ghost-posts` network response:
   - `204`: missing config / intentionally disabled
   - `502`: Ghost upstream request failure
   - `400`: parsing/request error
   - `200` with empty posts: no current content
2. Validate:
   - `GHOST_URL`
   - `GHOST_CONTENT_API_KEY`
3. Verify Ghost Content API key has correct scope and endpoint accessibility.

## 4.3 Runbook: subscribe button appears inactive

Symptoms:

- Clicking Subscribe does not open modal and may not redirect.

Checks:

1. Verify `VITE_GHOST_URL` is defined at build time.
2. Confirm `members.js` script was injected (element id `ghost-portal-script`).
3. Confirm `window.Portal` exists in browser console after script load.
4. If portal object missing, verify fallback URL redirect behavior.

---

## 5. Incident containment and recovery guidance

## 5.1 Feature-level containment options

- Disable latest-posts feature by removing Ghost server vars (endpoint returns `204`, UI hides section).
- Keep contact endpoint active while rotating provider credentials if key compromise is suspected.

## 5.2 Secret rotation checklist

1. Rotate provider key in vendor dashboard.
2. Update Vercel environment variables.
3. Redeploy and verify endpoint behavior.
4. Confirm old key invalidation.
5. Document rotation in internal operational log.

---

## 6. Operational guardrails

1. Never expose server secrets as `VITE_` variables.
2. Keep endpoint error text free of secret values.
3. Update docs in the same PR for behavior/configuration changes.
4. Validate both configured and missing-config fallback paths for optional integrations.
5. Keep `robots.txt`, `sitemap.xml`, and `site.url` aligned with production domain.

---

## 7. Recommended verification checklist per deployment

1. **Frontend boot**
   - root page loads without console fatal errors
2. **SEO metadata**
   - title/description/canonical present and correct
3. **Contact path**
   - valid submission returns success
   - invalid payload produces controlled error
4. **Ghost posts path**
   - either renders cards (enabled) or hides cleanly (disabled)
5. **Newsletter path**
   - subscribe CTA opens Portal or follows configured fallback behavior
6. **Static metadata files**
   - `robots.txt` and `sitemap.xml` reference expected production URLs
