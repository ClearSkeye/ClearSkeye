# Architecture Overview

## System Summary

ClearSkeye is a Vite-built React single-page application (SPA) deployed on Vercel. The application serves static frontend assets and exposes two serverless API routes:

- `POST /api/contact` for contact form delivery via Resend.
- `GET /api/ghost-posts` for fetching latest Ghost blog posts.

The frontend and API routes are in the same repository and deployed as one Vercel project.

## High-Level Components

1. **Client SPA (`src/`)**
   - Renders landing page sections and interactions.
   - Submits contact form data to `/api/contact`.
   - Fetches optional blog previews from `/api/ghost-posts`.
   - Injects optional Ghost Portal script for newsletter signup.

2. **Serverless API (`api/`)**
   - Validates and sanitizes incoming request payloads with Zod.
   - Integrates with external providers (Resend, Ghost Content API).
   - Returns explicit HTTP status codes for UI and operational diagnostics.

3. **Configuration + Build Tooling**
   - Vite + React SWC plugin for frontend bundling.
   - TypeScript project references for app and node config contexts.
   - Vercel rewrite for SPA deep-link handling.

## Runtime Data Flow

## 1) Initial Page Load

1. Browser requests root URL.
2. Vercel serves `index.html`.
3. Vite-built JS bundle mounts React app via `src/main.tsx`.
4. App renders section components and page metadata.
5. Optional Ghost Portal script is injected when `VITE_GHOST_URL` exists.

## 2) Contact Submission Flow

1. User fills form in `Contact` component.
2. Client validates with shared Zod schema in `src/lib/contact.ts`.
3. Browser sends `POST /api/contact` JSON payload.
4. API validates again with server Zod schema.
5. If valid and not caught by honeypot, API sends email via Resend.
6. API returns `{ ok: true }`, UI shows success state.

## 3) Latest Posts Flow

1. `LatestPosts` loads and calls `fetch('/api/ghost-posts')`.
2. API checks required env vars (`GHOST_URL`, `GHOST_CONTENT_API_KEY`).
3. API requests Ghost Content API and maps strict response schema.
4. If successful, UI renders 3 post cards.
5. If unavailable/missing config, UI hides section by rendering `null`.

## Deployment Topology

- **Hosting:** Vercel.
- **Static assets:** Built frontend from Vite output.
- **API runtime:** Vercel Node serverless functions for `api/*.ts`.
- **Third-party services:** Resend (transactional email), Ghost (content + portal UI).

## Source Tree Map

- `src/main.tsx` - React bootstrapping and providers.
- `src/App.tsx` - page composition and section ordering.
- `src/components/` - layout, UI primitives, page sections, SEO/script helpers.
- `src/lib/` - client-side API helpers and shared utility logic.
- `src/content/site.ts` - central content + URL configuration object.
- `api/contact.ts` - contact endpoint.
- `api/ghost-posts.ts` - Ghost latest posts endpoint.
- `public/` - static assets (favicon, og image, robots, sitemap).
- `vercel.json` - SPA rewrite behavior.

## Architectural Constraints

- Frontend is a single route SPA; there is no client-side route table yet.
- Server logic is function-based; no shared backend framework layer currently exists.
- No persistent storage; all server-side actions proxy to external services.
- Validation is duplicated by design (client and server) to protect API boundaries.
