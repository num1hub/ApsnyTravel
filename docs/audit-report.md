# ApsnyTravel Technical Audit (current state)

## Confirmed architecture
- `BrowserRouter` with SPA rewrites defined in `vercel.json` so deep links resolve correctly.
- Dependencies are bundled via Vite; no CDN import maps remain in `index.html`.
- Mock-first data via `constants.ts`, with optional remote API controlled by `VITE_API_URL` and small dev-only delays.
- Booking schema enforced by Zod in both the form and `lib/booking.ts`, with a 1200ms mocked success in dev when `VITE_BOOKING_ENDPOINT` is absent.

## Notable gaps
- **SEO/metadata:** pages set titles only; descriptions/OG tags are absent, so content is still CSR-only for crawlers.
- **Docs drift history:** previous reports referenced CDN import maps and `HashRouter`; those are no longer accurate and have been corrected here.
- **Type hygiene:** booking types now derive from the Zod schema; avoid reintroducing manual duplicates.

## Recommendations (near term)
1. Expand metadata handling (descriptions/OG tags) or move toward SSR/SSG for tour detail pages.
2. Externalize hardcoded contact/branding strings for easier localization and reuse.
3. Add linting/formatting to catch regressions early.
