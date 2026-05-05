# Contributing

Thanks for considering a contribution! This project is a reference example of a modern Next.js stack — keep that goal in mind when proposing changes.

## Local setup

```bash
pnpm install        # install everything
pnpm dev            # next dev --turbopack
```

## Quality bar

Before opening a PR, run:

```bash
pnpm check          # format:check + lint + typecheck + unit tests
pnpm build          # production Turbopack build
pnpm test:e2e       # Playwright E2E (one-time: pnpm test:e2e:install)
```

The Husky pre-commit hook runs `lint-staged` automatically, and `commit-msg` enforces [Conventional Commits](https://www.conventionalcommits.org/).

## Conventional Commits

Examples:

- `feat: add OG image generator`
- `fix(actions): trim message before validating`
- `chore(deps): bump next to 16.2.5`
- `docs: clarify deployment steps`

## Adding dependencies

- Always pin exact versions (no `^` / `~`).
- Prefer adding to `devDependencies` unless the package ships in the runtime bundle.

## Tests

- Unit tests live next to the code they cover (`*.test.ts(x)`) and use Vitest + Testing Library.
- End-to-end tests live in `e2e/` and use Playwright.
- New user-facing behaviour should ship with at least one test.
