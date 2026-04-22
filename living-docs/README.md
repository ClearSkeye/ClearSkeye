# Living Docs

This folder is the canonical, continuously maintained documentation set for ClearSkeye's architecture and configuration.

## Purpose

- Document how the app is structured today.
- Explain runtime behavior from browser interaction through serverless APIs.
- Capture deployment and environment configuration in one place.
- Make onboarding, troubleshooting, and safe changes faster.

## Doc Index

- `architecture-overview.md` - system boundaries, data flow, and directory map.
- `frontend-architecture.md` - React app composition, UI sections, shared primitives, and state/event flow.
- `backend-api-architecture.md` - Vercel serverless route contracts, validation, and failure behavior.
- `configuration-reference.md` - exhaustive config and environment variable reference.
- `deployment-and-operations.md` - local setup, build/deploy pipeline, and operations playbook.

## Change Policy

Treat these docs as part of the feature surface area:

1. Update docs in the same PR whenever runtime behavior changes.
2. Add new config keys and defaults immediately when introduced.
3. Keep examples production-safe (no secrets, no internal addresses).
4. Prefer precise references to concrete files, endpoints, and variables.

## Scope Notes

- This project currently has a single frontend app and two serverless API endpoints.
- No database, background queue, or dedicated backend service currently exists.
- Ghost and Resend are external dependencies used at runtime through public HTTP APIs.
