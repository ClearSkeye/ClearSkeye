# Backend API Architecture

No backend API routes are currently implemented.

Current state:

- No `app/api/*` route handlers.
- No server-side integrations to databases or third-party APIs.
- No authentication/session stack.

Operational implication:

- All current content is static or server-rendered from in-repo constants in `app/page.tsx`.
- Contact flow currently uses `mailto:` and does not persist data.

Future extension points:

- Add `app/api/contact/route.ts` for form-based inquiry capture.
- Add integration modules if subsidiary data becomes CMS-backed.
- Introduce environment variable documentation in `living-docs/configuration-reference.md` when server integrations are added.
