# Architecture Overview

## System Summary

ClearSkeye is a Next.js (App Router) marketing/brand surface for the Clearskeye holding company and its subsidiaries.

Current architecture:

- One primary page route: `/`
- One route-level loading state: `app/loading.tsx`
- Frontend implemented directly in App Router files (`app/page.tsx`, `app/layout.tsx`, `app/globals.css`)
- No API routes
- No external service integrations

## Core Runtime Flow

1. Request lands on `/`.
2. Root layout from `app/layout.tsx` sets global metadata and viewport policy.
3. Page component renders:
   - global header and utility skip link
   - hero content
   - subsidiary card grid for BigSkeye, DarkSkeye, GreySkeye, and AiSkeye
   - contact CTA section
4. Global styling and interaction behavior come from `app/globals.css`.
5. `app/loading.tsx` provides a loading-state skeleton-like experience when route-level loading is active.
