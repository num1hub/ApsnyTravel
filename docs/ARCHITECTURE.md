# ApsnyTravel Architecture Overview

## Mock-first data layer
- `lib/api.ts` exposes `fetchTourBySlug` as the UI/data boundary. It rejects missing slugs, looks up tours from `constants.ts`, and simulates network latency with a 600ms `setTimeout` before resolving. This keeps UI components decoupled from the in-memory dataset for future backend swaps.
- UI components must consume tour data via `fetchTourBySlug` rather than importing `TOURS` directly (except for the catalog filter logic), preserving a clean abstraction line for future backend integration.

## Routing and page data flow
- `App.tsx` uses `BrowserRouter` with routes for `/`, `/catalog`, `/tours/:slug`, `/about`, `/faq`, and `/contacts`. Clean URLs are supported in production via SPA rewrites configured in `vercel.json`, so hash-based routing is no longer required.
- `pages/TourDetail.tsx` (via `useQuery`) calls `fetchTourBySlug`, populates the page, and passes the tour title into `components/booking/BookingForm.tsx` for booking submissions.

### ASCII data flow
```
App.tsx
  └─ Route "/tours/:slug" → TourDetail
         └─ useQuery(queryFn: fetchTourBySlug)
                └─ fetchTourBySlug(slug)
                      └─ constants.ts (TOURS data)
         └─ BookingForm (receives tourTitle)
```

## Form validation and submission safety
- `components/booking/BookingForm.tsx` uses a Zod schema via `zodResolver` in `react-hook-form` with rules:
  - `client_name`: string, min 2 chars
  - `client_contact`: string, min 5 chars
  - `desired_date`: optional string
  - `pax`: number, min 1, max 20
  - `client_message`: optional string, max 500 chars
  - `consent`: boolean refined to `true`
- `lib/booking.ts` re-validates payloads with the same constraints and reads `import.meta.env.VITE_BOOKING_ENDPOINT`.
  - If the endpoint is missing, it waits 1200ms (`WAIT_FALLBACK_MS`) then returns `{ ok: true, mocked: true }`, keeping demo mode operational.

## Operations runbook
- Install: `npm install`
- Develop: `npm run dev` (Vite serves on port 3000 per `vite.config.ts`)
- Build: `npm run build` (outputs static bundle to `dist/`)
- Browser-based routing depends on SPA rewrites (see `vercel.json`) so clean URLs resolve correctly without hash fragments; ensure equivalent rewrites on any alternate host.

## Scalability checkpoints
- Replace the mock lookup in `lib/api.ts` with a real `fetch` to a backend endpoint while keeping the same `fetchTourBySlug` signature.
- Centralize hardcoded contact/branding strings (e.g., in `components/layout/Footer.tsx` and `pages/Contacts.tsx`) into a shared config for reuse/localization.
- For SEO, evolve from SPA-only `BrowserRouter` toward SSR/SSG (e.g., Next.js) while retaining rewrite rules for client-side navigation fallbacks.

## Quality and security protocols
- Favor the shared types in `types.ts` to avoid `any` and keep data boundaries well-typed.
- All booking inputs should flow through `bookingSchema` (via `zodResolver` in `BookingForm.tsx`) before submission to enforce validation at the edge.
- `lib/booking.ts` must retain its graceful fallback: when `VITE_BOOKING_ENDPOINT` is absent, remain in demo mode by delaying 1200ms and returning `{ ok: true, mocked: true }` instead of throwing.

## Scaling roadmap
1. **CMS integration:** Move the tour catalog out of `constants.ts` into a headless CMS (e.g., Strapi/Contentful) while keeping the `fetchTourBySlug` contract stable.
2. **SEO upgrade:** Layer SSR/SSG (e.g., Next.js) on top of the current `BrowserRouter`-compatible routes to produce crawlable HTML and managed meta tags.
3. **Content governance:** Externalize phone numbers and other contact strings from `pages/Contacts.tsx` (and similar surfaces) into a global configuration object to simplify localization and rebranding.
