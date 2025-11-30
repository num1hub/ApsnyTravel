# CODEX-MAX: Architectural Defense & Scaling Report (refreshed)

## Snapshot
- Dependencies are bundled via Vite; no CDN import maps remain.
- Routing uses `BrowserRouter` with SPA rewrites (`vercel.json`) to support deep links.
- Tour detail, catalog, and reviews rely on mock data by default with an optional remote API (`VITE_API_URL`).
- Booking is validated by Zod on both the form and submission helper, with dev-mode mocking when `VITE_BOOKING_ENDPOINT` is absent.

## Remaining risks
- **CSR-only SEO:** content and metadata are still client-rendered; adding descriptions/OG tags or adopting SSR/SSG would improve crawlability and LCP.
- **Hardcoded content:** contact/branding strings live inside components; centralizing them will simplify localization and governance.
- **Tooling:** lint/format/test pipelines are not configured.

## Suggested refactors
- Keep `BrowserRouter` but plan for a migration to SSR/SSG (e.g., Next.js) to serve HTML and metadata per route.
- Extract shared copy (contacts, brand voice) into a config module and reuse across pages.
- Introduce ESLint/Prettier and a minimal CI build to guard against regressions.
