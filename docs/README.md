# ClearSkeye Technical Documentation

This `docs/` folder is the canonical reference for the application's architecture and configuration.

It is intentionally implementation-specific: the content maps directly to files, functions, runtime flows, and environment variables in this repository.

## Documentation index

### Architecture

- [`architecture/system-overview.md`](architecture/system-overview.md)  
  End-to-end system boundaries, deployment topology, runtime lifecycle, and module map.
- [`architecture/frontend-architecture.md`](architecture/frontend-architecture.md)  
  React application composition, component-level behavior, client state machines, and browser integrations.
- [`architecture/backend-api-architecture.md`](architecture/backend-api-architecture.md)  
  Serverless endpoint contracts, validation paths, integration behavior, and failure semantics.

### Configuration

- [`configuration/configuration-reference.md`](configuration/configuration-reference.md)  
  Exhaustive configuration surface: environment variables, build/lint/type configs, static metadata files, and runtime implications.
- [`configuration/environment-matrix.md`](configuration/environment-matrix.md)  
  Required/optional variable matrix by feature and environment, plus safe rollout checklist.

### Operations and source map

- [`operations/deployment-and-runbooks.md`](operations/deployment-and-runbooks.md)  
  Local setup, deploy pipeline, runtime dependencies, troubleshooting runbooks, and operational guardrails.
- [`reference/source-map.md`](reference/source-map.md)  
  File-by-file ownership map of runtime code paths and configuration assets.

## Documentation standards

1. Update relevant docs in the same PR as behavior/configuration changes.
2. Keep references concrete (exact file paths, env names, endpoint paths, status codes).
3. Never commit secrets in examples.
4. Prefer documenting failure behavior explicitly (status codes, fallback UI, and disabled feature paths).
