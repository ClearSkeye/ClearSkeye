# ClearSkeye

A Next.js App Router site for the Clearskeye holding-company landing experience.

## Local development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run start
```

## Notes

- The frontend includes a production-style multi-section landing page.
- No backend API routes are included yet.
- The animated sky background is implemented as a reusable client component.

## DayCycleSkyBackground

`DayCycleSkyBackground` is available at `app/components/DayCycleSkyBackground/DayCycleSkyBackground.tsx`.
It is decorative (`aria-hidden`), non-interactive (`pointer-events: none`), and intended to sit behind page content.
It runs in the browser with `requestAnimationFrame` and CSS custom properties.
Night mode is a clear atmospheric gradient with no stars.

### Recommended stacking pattern

Use a parent wrapper with a local stacking context, place the sky first, and keep content above it:

```tsx
<main className="page-shell">
  <DayCycleSkyBackground durationSeconds={240} />
  <section className="hero-content">{/* hero text/buttons */}</section>
</main>
```

```css
.page-shell {
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
}
```

### Optional scrim patterns for contrast

If headline contrast drops during bright phases, add one subtle scrim layer above the sky and below text:

```css
/* 1) Balanced center scrim for most heroes */
.hero-content {
  background:
    radial-gradient(
      90% 70% at 50% 45%,
      rgb(8 14 30 / 0.16) 0%,
      rgb(8 14 30 / 0.08) 45%,
      transparent 100%
    );
}

/* 2) Bottom-up scrim for CTA-heavy lower hero layouts */
.hero-content--bottom-scrim {
  background:
    linear-gradient(
      to top,
      rgb(8 14 30 / 0.28) 0%,
      rgb(8 14 30 / 0.12) 35%,
      transparent 72%
    );
}
```

Keep scrims restrained. Start around `0.08` to `0.22` alpha and increase only if needed to maintain readable body copy and button labels.
