# Configuration Reference

This document enumerates the full configuration surface used by the application at build time and runtime.

It covers:

- environment variables
- repository-level tooling/build configs
- static/public metadata files
- runtime behavior affected by configuration

---

## 1. Environment variables

## 1.1 Client-exposed variables (`import.meta.env`)

Variables prefixed with `VITE_` may be inlined into browser bundles by Vite and should be treated as public.

### `VITE_GHOST_URL`

- Scope: frontend runtime
- Read locations:
  - `src/components/GhostPortalScript.tsx`
  - `src/lib/ghost.ts`
- Purpose:
  - enable Ghost Portal script injection (`<ghost-url>/members.js`)
  - provide fallback signup redirect target (`${ghostUrl}/#/portal/signup`)
- Expected value: absolute Ghost site URL (e.g. `https://blog.example.com`)
- Behavior when missing:
  - Ghost script not injected
  - newsletter subscribe action may no-op (if `window.Portal` absent)
- Security classification: public (do not place secrets in this variable)

## 1.2 Server-only variables (`process.env`)

These are consumed by Vercel serverless functions in `api/`.
They must not be exposed via client-side `VITE_` variables.

### `RESEND_API_KEY`

- Required by: `api/contact.ts`
- Purpose: authenticate Resend API client.
- Missing behavior: endpoint returns `500` with missing-env diagnostic.

### `CONTACT_TO_EMAIL`

- Required by: `api/contact.ts`
- Purpose: destination inbox for contact submissions.
- Missing behavior: endpoint returns `500`.

### `CONTACT_FROM_EMAIL`

- Required by: `api/contact.ts`
- Purpose: verified sender identity for outbound Resend email.
- Example: `ClearSkeye <hello@yourdomain.com>`
- Missing behavior: endpoint returns `500`.

### `GHOST_URL`

- Required by: `api/ghost-posts.ts`
- Purpose: base URL for Ghost Content API calls.
- Missing behavior: endpoint returns `204` (feature disabled path).

### `GHOST_CONTENT_API_KEY`

- Required by: `api/ghost-posts.ts`
- Purpose: key parameter for Ghost Content API.
- Missing behavior: endpoint returns `204`.

---

## 2. Runtime content configuration

## 2.1 `src/content/site.ts`

Defines the application's primary content/branding object:

- `name`
- `tagline`
- `description`
- `url`
- `ogImagePath`
- `socials.x`
- `socials.github`
- `contact.toEmail`

Runtime consumers:

- `src/App.tsx` (`canonicalUrl`)
- `src/components/PageSeo.tsx`
- `src/components/sections/Nav.tsx`
- `src/components/sections/Footer.tsx`
- `src/components/sections/NewsletterCta.tsx`

Notes:

- `contact.toEmail` is display/context content and is not the backend destination for form delivery.
- canonical/OG correctness depends on `url` and `ogImagePath` matching production reality.

---

## 3. Build and scripts configuration

## 3.1 `package.json`

Scripts:

- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `lint`: `eslint .`
- `format`: `prettier -w .`
- `preview`: `vite preview`

Operational impact:

- `build` enforces TypeScript project checks before production bundle generation.
- `preview` serves build output for local validation of production-like assets.

## 3.2 `vite.config.ts`

Current Vite plugin configuration:

- `@vitejs/plugin-react-swc`
- `@tailwindcss/vite`

No custom aliases, environment transforms, or build-output overrides are currently defined.

## 3.3 `tailwind.config.ts`

- Content scan paths:
  - `./index.html`
  - `./src/**/*.{ts,tsx}`
- `theme.extend`: empty
- `plugins`: empty

Implications:

- Tailwind classes used outside these paths will not be included in output CSS.
- Design tokens/extensions are not centrally customized yet.

## 3.4 TypeScript configuration

### `tsconfig.json`

- Root config with project references:
  - `./tsconfig.app.json`
  - `./tsconfig.node.json`

### `tsconfig.app.json`

Primary app/compiler options:

- `target: es2023`
- `lib: ["ES2023", "DOM"]`
- `module: esnext`
- `types: ["vite/client"]`
- `moduleResolution: bundler`
- `jsx: react-jsx`
- `allowImportingTsExtensions: true`
- `verbatimModuleSyntax: true`
- `moduleDetection: force`
- `noEmit: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `erasableSyntaxOnly: true`
- `noFallthroughCasesInSwitch: true`

Includes: `src`

### `tsconfig.node.json`

Node-oriented config for tooling files:

- `target: es2023`
- `lib: ["ES2023"]`
- `types: ["node"]`
- same bundler and lint-safety flags as app config
- includes: `vite.config.ts`

## 3.5 ESLint configuration (`eslint.config.js`)

- Flat config format.
- Global ignore: `dist`.
- Applies to `**/*.{ts,tsx}`.
- Extends:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `react-hooks` recommended flat config
  - `react-refresh` Vite config
  - `eslint-config-prettier`
- Browser globals configured via `globals.browser`.

## 3.6 Formatting and ignore files

### `.prettierignore`

- excludes:
  - `dist`
  - `node_modules`

### `.gitignore`

Key entries:

- logs and debug files
- `node_modules`
- build artifacts (`dist`, `dist-ssr`)
- `*.local` files
- editor-specific files/directories

---

## 4. Hosting and routing configuration

## 4.1 `vercel.json`

Configured rewrite rule:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Purpose:

- force SPA fallback for non-API paths/deep links.

Operational note:

- API functions in `api/*` still resolve through Vercel function routing.

---

## 5. Static/public metadata configuration

## 5.1 `public/robots.txt`

- crawler directives and sitemap pointer.
- currently points sitemap to `https://example.com/sitemap.xml` and should be updated for real domain.

## 5.2 `public/sitemap.xml`

- currently includes one URL (`https://example.com/`).
- must match production host and intended indexed URLs.

## 5.3 `public/og.svg`

- Open Graph/Twitter image file referenced by `site.ogImagePath`.

## 5.4 `public/favicon.svg`, `public/icons.svg`

- browser icon/static asset files.

---

## 6. Configuration-dependent runtime behavior summary

1. Missing `VITE_GHOST_URL`
   - No Ghost script injection.
   - Subscribe CTA may no-op if Ghost portal object is unavailable.

2. Missing contact env vars
   - `/api/contact` responds `500`.
   - Frontend surfaces submit error text.

3. Missing Ghost server env vars
   - `/api/ghost-posts` responds `204`.
   - frontend treats this as empty posts and hides blog section.

4. Incorrect `site.url`, `robots.txt`, or `sitemap.xml`
   - SEO canonical and crawler metadata may reference wrong host.

---

## 7. Change management checklist for new configuration

When introducing a new config key, variable, or static metadata dependency:

1. Declare source of truth (env vs content file vs code constant).
2. Define owner and runtime consumer(s).
3. Define behavior when missing/invalid.
4. Document local-dev setup requirements.
5. Ensure secrets remain server-only (no `VITE_` prefix).
6. Add entry to `docs/configuration/environment-matrix.md` if environment-based.
7. Verify CI/build/test impact.
