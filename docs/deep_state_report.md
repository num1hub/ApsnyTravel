# ApsnyTravel Deep-State Engineering Audit

## Architectural X-Ray
- **Entry & routing:** `App.tsx` mounts `BrowserRouter` with SPA routes to catalog, static pages, and `/tours/:slug`, delegating page data work to child screens while keeping layout chrome persistent (`Header`/`Footer`).【F:App.tsx†L1-L33】
- **Catalog flow:** `Catalog` pre-seeds SEO meta, then issues a TanStack Query keyed on `['tours']` that calls `fetchTours`. Mock mode returns filtered constants after a small delay; remote mode GETs `/tours` and filters `is_active`, so UI stays agnostic to the data source.【F:pages/Catalog.tsx†L1-L110】【F:lib/api.ts†L93-L134】
- **Tour detail flow:** `TourDetail` resolves `slug`, drives `useQuery` with `fetchTourBySlug`, and builds page metadata from the resolved tour before rendering hero/content/reviews/booking sidebar. Errors return a typed fallback and link back to catalog.【F:pages/TourDetail.tsx†L1-L91】 Data loads through the same API abstraction that toggles between constants and remote fetches, preventing UI drift across environments.【F:lib/api.ts†L93-L134】
- **Review pipeline:** `ReviewsPanel` (invoked from `TourDetail`) uses `fetchReviewsByTourId`; in mock mode it filters/sorts constants, while remote mode issues a parameterized request with consistent error semantics.【F:pages/TourDetail.tsx†L83-L86】【F:lib/api.ts†L136-L162】
- **Booking surface:** `BookingSidebar` injects pricing plus `tourTitle` into `BookingForm`, keeping booking UX colocated with tour context while reusing the validation/transport defined in `lib/booking.ts`.【F:components/tours/BookingSidebar.tsx†L1-L51】【F:lib/booking.ts†L18-L85】

## Booking Submission Safety (`lib/booking.ts`)
- The payload is parsed with `bookingPayloadSchema` (includes regexed international phone, future-date guard, pax bounds, consent requirement) before any network side effects, eliminating malformed submissions early.【F:lib/booking.ts†L3-L28】【F:lib/booking.ts†L50-L52】
- Missing `VITE_BOOKING_ENDPOINT` in **production** triggers a hard `BookingSubmissionError` to avoid silent acceptance; in **development** it logs a warning, waits 1.2s, and returns `{ ok: true, mocked: true }` so local flows continue without masking prod issues.【F:lib/booking.ts†L53-L63】
- Real endpoints are called with JSON POST, wrapping fetch errors and non-2xx responses into `BookingSubmissionError` (with response body text when available) to surface actionable feedback to the UI.【F:lib/booking.ts†L65-L85】

## Form Schema & UI Mapping (`components/booking/BookingForm.tsx`)
- `useForm` binds `bookingFormSchema` (payload minus `tourTitle`) with defaults for `pax` and `consent`, ensuring every rendered input corresponds to a schema field.【F:components/booking/BookingForm.tsx†L19-L29】【F:lib/booking.ts†L18-L33】
- Each control registers the matching key; number parsing uses `valueAsNumber` for `pax`, and checkbox binding aligns with the boolean `consent` refinement that enforces explicit opt-in.【F:components/booking/BookingForm.tsx†L107-L151】【F:lib/booking.ts†L24-L28】
- Submit handler merges `tourTitle` and delegates to `submitBookingRequest`, surfacing caught errors into `errorMessage` while toggling `isSubmitting`/`isSuccess`—no desynchronization between resolver and UI state observed.【F:components/booking/BookingForm.tsx†L31-L172】【F:lib/booking.ts†L50-L85】

## SEO Hook Assessment (`lib/seo.ts`)
- `usePageMeta` memoizes title/description/canonical URL, then imperatively mutates `document.title`, meta tags (description, OG, Twitter), and canonical link on effect. Defaults derive from branding constants to keep page-level calls minimal.【F:lib/seo.ts†L86-L134】【F:lib/branding.ts†L1-L20】
- Limitations: runs only in the browser (`document`/`window` guarded), so SSR crawlers or social scrapers receive bare HTML; canonical URL depends on runtime `window.location` (risking hydration mismatch), and OG image handling simply deletes the tag when absent, offering no structured data or locale awareness.【F:lib/seo.ts†L74-L129】

## Immediate “Silent Killers”
1. **Hardcoded branding & contacts** block white-labeling and environment-driven overrides, forcing rebuilds for phone/email/social changes and leaking non-production contact data across deployments.【F:lib/branding.ts†L1-L20】
2. **CSR-only SEO** leaves search bots/social previews without meta/OG tags because `usePageMeta` mutates head post-hydration; no SSR/static metadata path exists.【F:lib/seo.ts†L86-L129】
3. **Booking endpoint gap**: production without `VITE_BOOKING_ENDPOINT` throws, but no UI preflight or observability hook exists; users could reach the form, submit, and only then hit a fatal error with no retry/backoff strategy.【F:lib/booking.ts†L53-L85】【F:components/booking/BookingForm.tsx†L31-L172】

## Scalability Path (Next.js/Remix without rewriting `lib/`)
- **Data hydration via loaders/server actions:** wrap `fetchTours`/`fetchTourBySlug` in framework loaders or server actions, reusing the mock/remote switch while delivering hydrated query caches to the client to avoid duplicate fetches.【F:lib/api.ts†L93-L162】
- **Head generation on the server:** lift the meta-building logic into a pure helper consumed by `generateMetadata` (Next.js) or `<Meta>` (Remix) so OG/canonical tags render during SSR.
  ```ts
  // lib/seo.server.ts
  import { PageMeta } from './seo';
  import { branding } from './branding';

  export function buildPageMeta(meta?: PageMeta) {
    const title = meta?.title ? `${meta.title} — ${branding.siteName}` : branding.siteName;
    const description = meta?.description ?? branding.defaultDescription;
    const openGraph = { title, description, type: meta?.openGraph?.type ?? 'website', url: meta?.openGraph?.url, image: meta?.openGraph?.image };
    return { title, description, openGraph };
  }
  ```
- **Configurable branding:** read branding/contact from env-backed config (e.g., `process.env.NEXT_PUBLIC_BRAND_*`) to enable per-tenant theming without code changes.

## Simulation: Invalid Phone & Past Date
1. User enters past `desired_date` and phone `+7 999` (fails `INTERNATIONAL_PHONE_REGEX`) then submits.
2. `zodResolver(bookingFormSchema)` validates before submit: regex and `futureDateSchema` reject the inputs, populating `formState.errors` so `handleSubmit` short-circuits without calling `submitBookingRequest`.【F:lib/booking.ts†L3-L28】【F:components/booking/BookingForm.tsx†L19-L173】
3. UI renders inline error messages next to `client_contact`/`desired_date`; button remains enabled but `isSubmitting` never toggles because network is never hit, keeping state consistent.【F:components/booking/BookingForm.tsx†L76-L120】
4. After corrections, submit flows to `submitBookingRequest`; dev without `VITE_BOOKING_ENDPOINT` returns mocked success after 1.2s, while prod without endpoint throws a surfaced error for display via `errorMessage`.【F:lib/booking.ts†L53-L85】【F:components/booking/BookingForm.tsx†L31-L172】
