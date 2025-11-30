# 🛡️ CODEX-MAX AUDIT REPORT: ApsnyTravel (updated)

## Current posture
- Single-bundle Vite app with React 19, React Router 7 (`BrowserRouter`), React Query 5, Tailwind 3.
- CDN/import-map blocks were removed; dependencies resolve from `package.json`.
- SPA rewrites in `vercel.json` support clean URLs.
- Booking flow validates via Zod on both the form and submission helper; dev mode mocks success when no endpoint is set.

## Open risks and opportunities
- **SEO/SSR gap:** content is client-rendered; titles are set but descriptions/OG tags are missing. Moving to SSR/SSG (e.g., Next.js) would improve crawlability and performance.
- **Content externalization:** phone numbers, addresses, and branding strings remain hardcoded; centralizing them will ease localization.
- **Quality tooling:** linting/formatting/tests are absent; adding them would improve DX and safety.

## Suggested next steps
1. Introduce route-level metadata (description/OG) or begin an SSR/SSG migration path.
2. Extract shared contact/branding constants into a single config module.
3. Add ESLint/Prettier and a basic CI check to catch regressions.
