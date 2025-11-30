# ApsnyTravel Architecture Overview

## Stack and runtime
- **Vite + React 19 + TypeScript** with TailwindCSS for styling.
- **React Router 7** using `<BrowserRouter>`; deep links rely on SPA rewrites (see `vercel.json`).
- **React Query 5** powers data fetching/caching on the client.
- **Zod + react-hook-form** enforce booking validation.

## Mock-first data layer
- `lib/api.ts` exposes `fetchTours`, `fetchTourBySlug`, and `fetchReviewsByTourId` as UI/data boundaries.
- Remote API is optional via `VITE_API_URL`; when absent, data is read from `constants.ts` with a small artificial delay for UX realism.
- Tour consumers should call the fetchers instead of importing `TOURS` directly to keep the swap-to-backend boundary intact.

## Routing and page data flow
- `App.tsx` routes `/`, `/catalog`, `/tours/:slug`, `/about`, `/faq`, and `/contacts` with `<BrowserRouter>`.
- `pages/TourDetail.tsx` uses React Query to load a tour and passes `tour.title` into `BookingSidebar` → `BookingForm`.
- Reviews load via `fetchReviewsByTourId`; catalog and home use `fetchTours`.

### ASCII data flow
```
App.tsx
  └─ Route "/tours/:slug" → TourDetail
         └─ useQuery(queryFn: fetchTourBySlug)
                └─ fetchTourBySlug(slug)
                      └─ constants.ts (TOURS data) or remote API
         └─ BookingForm (receives tourTitle)
```

## Form validation and submission safety
- `components/booking/BookingForm.tsx` uses `bookingFormSchema` via `zodResolver`:
  - `client_name`: string, min 2 chars
  - `client_contact`: international phone regex
  - `desired_date`: optional future date
  - `pax`: number 1–20
  - `client_message`: optional, max 500 chars
  - `consent`: must be `true`
- `lib/booking.ts` re-validates payloads and reads `import.meta.env.VITE_BOOKING_ENDPOINT`.
  - If missing, dev builds return a mocked success after ~1200ms; prod builds throw an explicit configuration error.

## Metadata
- `usePageMeta` sets document titles, descriptions, canonical links, and basic Open Graph/Twitter tags per route (built from static copy or tour data). Pre-rendered SEO remains a future SSR/SSG improvement.

## Operations runbook
- Install: `npm install`
- Develop: `npm run dev` (Vite serves on port 3000)
- Lint: `npm run lint` (React + TypeScript + Prettier compatible rules)
- Build: `npm run build`
- SPA rewrites are required for production hosting (`vercel.json` provides a catch-all to `index.html`).

## Scalability checkpoints
- Replace the mock lookup in `lib/api.ts` with real fetches while keeping the same fetcher contracts.
- Branding/contact strings are now centralized; extend to multiple locales if needed.
- Move toward SSR/SSG (e.g., Next.js) for stronger SEO and metadata.

## Quality and security protocols
- Keep shared types in `types.ts` and infer booking types directly from Zod schemas to avoid drift.
- Preserve the booking fallback behavior for demos; enforce explicit failure in production when misconfigured.
