# Environment Variable Matrix

This matrix documents variable requirements by feature and environment scope.

## 1. Variable matrix

| Variable | Scope | Consumed by | Local Dev | Preview Deploy | Production Deploy | If Missing |
|---|---|---|---|---|---|---|
| `VITE_GHOST_URL` | Client (public) | `GhostPortalScript`, `openGhostPortal` | Optional | Optional | Optional | Ghost script not injected; subscribe may no-op |
| `RESEND_API_KEY` | Server (secret) | `/api/contact` | Required to test contact API | Required if contact form enabled | Required if contact form enabled | `/api/contact` returns `500` |
| `CONTACT_TO_EMAIL` | Server (config) | `/api/contact` | Required to test contact API | Required if contact form enabled | Required if contact form enabled | `/api/contact` returns `500` |
| `CONTACT_FROM_EMAIL` | Server (config) | `/api/contact` | Required to test contact API | Required if contact form enabled | Required if contact form enabled | `/api/contact` returns `500` |
| `GHOST_URL` | Server (config) | `/api/ghost-posts` | Required to test latest-posts API | Optional (required only if showing posts) | Optional (required only if showing posts) | `/api/ghost-posts` returns `204` |
| `GHOST_CONTENT_API_KEY` | Server (secret) | `/api/ghost-posts` | Required to test latest-posts API | Optional (required only if showing posts) | Optional (required only if showing posts) | `/api/ghost-posts` returns `204` |

---

## 2. Feature-to-variable mapping

### 2.1 Contact form (`Contact` section + `/api/contact`)

Required variables:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Behavioral notes:

- Missing any of these values causes server endpoint failure (`500`) and user-visible submit errors.
- `CONTACT_FROM_EMAIL` must be valid for the configured Resend sender identity.

### 2.2 Latest posts section (`LatestPosts` + `/api/ghost-posts`)

Required variables:

- `GHOST_URL`
- `GHOST_CONTENT_API_KEY`

Behavioral notes:

- Missing variables cause `204` from `/api/ghost-posts`.
- Frontend treats `204` as empty and hides the section.
- Feature can be intentionally disabled by omitting variables.

### 2.3 Newsletter portal (`NewsletterCta` + `GhostPortalScript`)

Optional variable:

- `VITE_GHOST_URL`

Behavioral notes:

- Without it, script injection and redirect fallback cannot occur.
- Button may still open portal if script was loaded by other means and `window.Portal` exists.

---

## 3. Security classification rules

1. **Secret keys** must be server-only (`process.env`) and never prefixed with `VITE_`.
2. **Public runtime URLs** can use `VITE_` prefix and are expected to be visible in client bundles.
3. Error payloads should never include raw secret values.

---

## 4. Environment provisioning guidance

## 4.1 Local development

Use a local env file (for example `.env.local`) for values needed during testing.

Common local scenarios:

- frontend-only UI iteration: no env vars required unless testing Ghost portal behavior.
- contact flow validation: set all three contact variables.
- latest-posts flow validation: set Ghost server vars.

## 4.2 Vercel preview

Recommended approach:

- mirror production-safe defaults for enabled features.
- if disabling optional features in preview, intentionally omit Ghost variables and validate graceful fallback.

## 4.3 Vercel production

Requirements:

- configure all variables required for intended feature set.
- verify sender/domain setup for Resend.
- rotate secrets periodically and after potential leakage events.

---

## 5. Safe rollout checklist for new env variables

When adding a new environment variable:

1. Add it to `docs/configuration/configuration-reference.md`.
2. Add it to this matrix with per-environment requirement status.
3. Implement explicit missing-value behavior in server/client code.
4. Validate both enabled and missing-variable paths.
5. Update deployment platform settings before rollout.
