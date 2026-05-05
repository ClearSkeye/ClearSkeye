# ClearSkeye

A reference Next.js 16 project pinned to the **absolute latest** stable release of every dependency, deployed on Vercel — and held to a production-grade quality bar.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FClearSkeye%2FClearSkeye)

---

## Stack (all versions exact-pinned)

| Layer           | Package                                                                 | Version                 |
| --------------- | ----------------------------------------------------------------------- | ----------------------- |
| Framework       | [`next`](https://nextjs.org)                                            | 16.2.4                  |
| UI library      | [`react`](https://react.dev) / `react-dom`                              | 19.2.5                  |
| React Compiler  | [`babel-plugin-react-compiler`](https://react.dev/learn/react-compiler) | 1.0.0                   |
| Language        | [`typescript`](https://typescriptlang.org)                              | 6.0.3                   |
| Styling         | [`tailwindcss`](https://tailwindcss.com) + `@tailwindcss/postcss`       | 4.2.4                   |
| Validation      | [`zod`](https://zod.dev)                                                | 4.4.3                   |
| Bundler         | Turbopack (dev + build)                                                 | bundled                 |
| Linter          | [`eslint`](https://eslint.org) + `eslint-config-next` (flat)            | 9.39.4 / 16.2.4         |
| Formatter       | `prettier` + `prettier-plugin-tailwindcss`                              | 3.8.3 / 0.8.0           |
| Unit testing    | [`vitest`](https://vitest.dev) + `@testing-library/react`               | 4.1.5 / 16.3.2          |
| E2E testing     | [`@playwright/test`](https://playwright.dev)                            | 1.59.1                  |
| Bundle analyzer | `@next/bundle-analyzer`                                                 | 16.2.4                  |
| Telemetry       | `@vercel/analytics` + `@vercel/speed-insights`                          | 2.0.1 / 2.0.0           |
| Font            | [`geist`](https://vercel.com/font)                                      | 1.7.0                   |
| Git hooks       | `husky` + `lint-staged` + `@commitlint/cli`                             | 9.1.7 / 16.4.0 / 20.5.3 |

No `^`, no `~` — every dependency is exact-pinned for deterministic installs and Vercel deploys.

---

## What's enabled

### Next.js 16 platform features

- **App Router** with React Server Components and Server Actions.
- **React Compiler 1.0** (`reactCompiler: true`) — no more manual `useMemo` / `useCallback`.
- **Cache Components** (`cacheComponents: true`) with **Partial Prerendering** — the home page ships a static shell and streams every dynamic island over the same response.
- **Typed Routes** (`typedRoutes: true`) — `<Link href>` is statically type-checked.
- **Turbopack** for both `next dev` and `next build`.
- **Proxy** (the Next 16 rename of middleware) tagging every response with an `x-request-id`.
- **Instrumentation hook** (`instrumentation.ts`) with `register()` and `onRequestError` ready for OpenTelemetry / Sentry / Datadog.
- **File-based metadata**: dynamic `icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`, and `manifest.ts` — all generated at the edge with `next/og`.
- **Route handler** at `app/api/health` returning runtime + commit info.
- **`robots.ts` + `sitemap.ts`** generated dynamically via the App Router metadata APIs.
- **Error boundaries**: route-level `error.tsx` and root-level `global-error.tsx`.

### React 19 features showcased

- `useActionState` — the contact form (`Pingback`) runs a Zod-validated Server Action and renders the response progressively.
- `useOptimistic` + `useTransition` — the like button increments instantly while the Server Action runs in the background.
- Async React Server Components inside `<Suspense>` boundaries — the LiveStats card streams in over the same response as the static shell.

### Styling

- **Tailwind CSS v4** all-CSS configuration via `@theme` tokens and `@custom-variant`.
- OKLCH colors, `color-mix()`, mesh gradients, container queries.
- `prefers-reduced-motion` respected globally.
- Cookie-driven **light / dark / system** theme switcher with no FOUC (a tiny inline boot script applies the cookie value before paint).
- Geist Sans + Mono via `next/font`.

### Quality bar

- **Strict TypeScript 6** with `verbatimModuleSyntax`, `isolatedModules`, and bundler module resolution.
- **ESLint flat config** — `eslint-config-next` 16's native flat array, no `FlatCompat` shim.
- **Prettier** + `prettier-plugin-tailwindcss` for auto-sorted classes.
- **Vitest** for unit tests with Testing Library, jsdom, and a `server-only` shim.
- **Playwright** for cross-browser E2E (Chromium, Firefox, WebKit).
- **Husky** pre-commit hook running `lint-staged`, plus a `commit-msg` hook enforcing Conventional Commits via `@commitlint/cli`.
- **Type-safe environment variables** validated at boot with Zod (`src/lib/env.ts`).
- **JSON-LD** structured data for SEO.
- **Skip-to-content** link, `*:focus-visible` outlines, semantic landmarks.
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`.
- **Vercel Analytics + Speed Insights** wired into the root layout.

### Automation

- **GitHub Actions CI**: install → format / lint / typecheck / unit (with coverage artifact) → build → Playwright E2E (with browser cache + report artifact).
- **CodeQL** security scanning weekly + on every PR.
- **Renovate** keeps every dep on the bleeding edge (pin range strategy, auto-merge for non-major).
- **Dependabot** keeps GitHub Actions versions current.
- **VS Code workspace settings** + recommended extensions.
- **EditorConfig** for cross-editor consistency.

---

## Project layout

```
.
├── .github/
│   ├── workflows/{ci,codeql}.yml      # CI + security scanning
│   ├── dependabot.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/                            # pre-commit + commit-msg hooks
├── .vscode/{settings,extensions}.json
├── e2e/home.spec.ts                   # Playwright E2E
├── instrumentation.ts                 # register() + onRequestError
├── playwright.config.ts
├── renovate.json
├── vitest.config.mts + vitest.setup.ts
├── next.config.ts                     # reactCompiler, typedRoutes, cacheComponents, security headers, bundle-analyzer
├── postcss.config.mjs                 # @tailwindcss/postcss
├── tsconfig.json                      # TS 6, strict, bundler resolution
├── vercel.json                        # Pinned framework + Turbopack build
├── test/stubs/server-only.ts          # vitest alias for the server-only module
└── src/
    ├── proxy.ts                       # Next 16 proxy (was middleware.ts)
    ├── app/
    │   ├── api/health/route.ts        # Route handler example
    │   ├── actions.ts                 # Server Actions (Zod-validated)
    │   ├── theme-actions.ts           # setTheme Server Action
    │   ├── error.tsx                  # Route-level error boundary
    │   ├── global-error.tsx           # Root error boundary
    │   ├── globals.css                # Tailwind v4 + design tokens + variants
    │   ├── icon.tsx                   # Dynamic favicon
    │   ├── apple-icon.tsx             # Dynamic Apple touch icon
    │   ├── opengraph-image.tsx        # Dynamic OG image
    │   ├── layout.tsx                 # Geist fonts, metadata, JSON-LD, analytics
    │   ├── loading.tsx                # Route-level Suspense fallback
    │   ├── manifest.ts                # PWA manifest
    │   ├── not-found.tsx              # 404
    │   ├── page.tsx                   # Home (RSC, streams Suspense islands)
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   └── *.test.ts                  # Vitest unit tests live next to code
    ├── components/                    # All UI lives here
    │   ├── hero.tsx
    │   ├── stack-grid.tsx
    │   ├── live-stats.tsx             # Async RSC, streamed via Suspense
    │   ├── pingback.tsx               # useActionState client form
    │   ├── like-button.tsx            # useOptimistic client island
    │   ├── like-island.tsx            # Async RSC wrapper
    │   ├── theme-toggle.tsx           # Server Component, RSC + Suspense
    │   ├── theme-boot-script.tsx      # No-FOUC inline script
    │   ├── skip-link.tsx
    │   ├── footer.tsx
    │   └── icons.tsx
    └── lib/
        ├── env.ts                     # Zod-validated env vars
        ├── theme.ts                   # Theme cookie helpers
        └── likes-store.ts             # In-memory store (HMR-safe)
```

---

## Scripts

```bash
pnpm dev              # next dev --turbopack
pnpm build            # next build --turbopack
pnpm build:analyze    # Bundle analyzer (writes to .next/analyze)
pnpm start            # next start
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest run
pnpm test:watch       # vitest watch
pnpm test:coverage    # vitest run --coverage (v8)
pnpm test:e2e         # playwright test
pnpm test:e2e:ui      # playwright test --ui
pnpm test:e2e:install # playwright install --with-deps
pnpm format           # prettier --write .
pnpm format:check     # prettier --check .
pnpm check            # format:check + lint + typecheck + test
```

---

## Local development

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. Requires **Node.js 22+** (see `.nvmrc`).

For end-to-end tests, install browsers once:

```bash
pnpm test:e2e:install
pnpm test:e2e
```

---

## Deployment

Pushing to `main` deploys automatically to Vercel via the included [`vercel.json`](./vercel.json):

- `framework: "nextjs"`
- `buildCommand: "next build --turbopack"`
- `installCommand: "pnpm install --frozen-lockfile"`

Set `NEXT_PUBLIC_SITE_URL` in your Vercel project to your production URL so the sitemap, OG metadata, and `robots.txt` reference the right host.

---

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). TL;DR: `pnpm check` and `pnpm build` must pass; commits use [Conventional Commits](https://www.conventionalcommits.org/).

## License

[MIT](./LICENSE)
