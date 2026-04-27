# Architecture Overview

## System Summary

ClearSkeye is a Next.js (App Router) application deployed on Vercel. It exposes one route-handler API route:

- `POST /api/contact` for contact form delivery via Resend.

The frontend and API routes are in the same repository and deployed as one Vercel project.

## High-Level Components

1. **Client UI (`app/` + `src/`)**
   - Renders landing page sections and interactions.
   - Submits contact form data to `/api/contact`.

2. **Route handlers (`app/api/`)**
   - Validates and sanitizes incoming request payloads with Zod.
   - Integrates with external providers (Resend).
   - Returns explicit HTTP status codes for UI and operational diagnostics.

3. **Configuration + Build Tooling**
   - Next.js build/runtime pipeline.
   - Tailwind v4 through PostCSS.
   - Native Next.js routing (no SPA rewrite config).

## Runtime Data Flow

## 1) Initial Page Load

1. Browser requests root URL.
2. Next.js renders the root route from `app/page.tsx`.
3. Shared layout/metadata are provided by `app/layout.tsx`.
4. App renders section components and page metadata.
## 2) Contact Submission Flow

1. User fills form in `Contact` component.
2. Client validates with shared Zod schema in `src/lib/contact.ts`.
3. Browser sends `POST /api/contact` JSON payload.
4. API validates again with server Zod schema.
5. If valid and not caught by honeypot, API sends email via Resend.
6. API returns `{ ok: true }`, UI shows success state.

## Deployment Topology

- **Hosting:** Vercel.
- **Frontend runtime:** Next.js app routes and layout.
- **API runtime:** Next.js route handlers under `app/api/*`.
- **Third-party services:** Resend (transactional email).

## Source Tree Map

- `app/layout.tsx` - metadata and global providers.
- `app/page.tsx` - page composition and section ordering.
- `src/components/` - layout, UI primitives, page sections, SEO/script helpers.
- `src/lib/` - client-side API helpers and shared utility logic.
- `src/content/site.ts` - central content + URL configuration object.
- `app/api/contact/route.ts` - contact endpoint.
- `public/` - static assets (favicon, og image, robots, sitemap).

## Architectural Constraints

- Frontend currently uses a single landing route; there is no multi-page route tree yet.
- Server logic is function-based; no shared backend framework layer currently exists.
- No persistent storage; all server-side actions proxy to external services.
- Validation is duplicated by design (client and server) to protect API boundaries.
