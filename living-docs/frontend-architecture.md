# Frontend Architecture

## Entry and Providers

`app/layout.tsx` initializes the app shell with:

- Next.js root HTML/body layout.
- Metadata via exported `metadata`.
- `Analytics` and `SpeedInsights` from Vercel for telemetry.

Global styling is loaded from `app/globals.css`, which imports Tailwind v4 and sets base `html/body` layout defaults.

## App Composition

`app/page.tsx` composes the page in this order:

1. JSON-LD organization schema script
2. Skip-to-content accessibility link
3. `Nav`
4. Main content:
   - `Hero`
   - `SocialProof`
   - `ValueProps`
   - `Quote`
   - `NewsletterCta`
   - `Contact`
5. `Footer`

The entire page is anchored by section IDs (`proof`, `features`, `newsletter`, `contact`) for in-page navigation.

## Content Model

`src/content/site.ts` is the central content/config object for:

- Brand values (`name`, `tagline`, `description`)
- Canonical/base URL (`url`)
- OG image path (`ogImagePath`)
- Social links (`socials`)
- Contact destination info (`contact.toEmail` placeholder)

Most user-facing copy and global links should be customized here first.

## Shared Primitives

- `Container` (`src/components/layout/Container.tsx`): shared width + horizontal padding wrapper (`max-w-6xl`).
- `Button` (`src/components/ui/Button.tsx`): typed button primitive with `primary`, `secondary`, and `ghost` variants.

These primitives enforce consistent spacing and interaction affordances across the page.

## Section Behaviors

- **Nav**
  - Sticky header with in-page links.
  - "Get a demo" button smooth-scrolls to `#contact`.
- **Hero**
  - Uses `motion/react` for staged entrance animation on text/cards.
  - Receives CTA callbacks from `page.tsx` to scroll to contact/newsletter.
- **SocialProof**
  - Placeholder logo grid designed to be replaced with real logos/mentions.
- **ValueProps + Quote**
  - Static proof/narrative sections.
- **NewsletterCta**
  - Provides a clear path to contact and external follow links.
- **Contact**
  - Controlled form state + client-side schema validation path.
  - Async submit status machine: `idle`, `submitting`, `success`, `error`.
  - Hidden honeypot field for spam filtering.

## Client-Side Integration Layers

### Contact API client (`src/lib/contact.ts`)

- Defines `ContactRequestSchema` with Zod.
- Parses before network call to reject invalid payloads early.
- Sends JSON `POST` to `/api/contact`.
- Raises descriptive errors with status fallback.

## SEO + Metadata

- Metadata is defined in `app/layout.tsx`.
- JSON-LD organization schema is rendered in `app/page.tsx`.
- Values are derived from `site` content + canonical URL.

## Accessibility and UX Notes

- Skip-link present for keyboard users.
- Labels associated with all input fields via stable `useId` IDs.
- Focus styles applied to shared button primitive.
- Responsive layout uses Tailwind breakpoints (`sm`, `lg`) consistently.

## Known Frontend Gaps

- No route-based code splitting (single page only).
- No centralized error reporting pipeline for client exceptions.
