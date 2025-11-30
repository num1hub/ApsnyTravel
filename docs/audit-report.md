# ApsnyTravel Technical Audit & Path to Production

## Phase 1 — Architectural Forensics & Verification
- **Routing discrepancy (critical):** `App.tsx` mounts a `BrowserRouter`, contradicting `docs/ARCHITECTURE.md` which documents `HashRouter`. Static hosts without rewrite rules will 404 on deep links; either align documentation or switch to hash-based routing for static deployments. 【F:App.tsx†L1-L33】【F:docs/ARCHITECTURE.md†L7-L41】
- **CDN dependency vulnerability (critical):** `index.html` pulls React, Router, Tailwind, and utilities from `aistudiocdn.com` and `cdn.tailwindcss.com` via an import map. This bypasses supply-chain controls, lacks subresource integrity, and makes builds non-repeatable or subject to upstream tampering/outages—blocker for production. Replace with npm dependencies and a local Tailwind build. 【F:index.html†L1-L37】
- **Data abstraction readiness:** `fetchTourBySlug` validates input, simulates latency, and reads from `TOURS` without leaking data shape assumptions to consumers. `TourDetail` accesses it via React Query without coupling to the data source, so the function can be reimplemented to call a REST endpoint without breaking the page. 【F:lib/api.ts†L1-L44】【F:pages/TourDetail.tsx†L16-L185】

## Phase 2 — Code Quality & Pattern Analysis
- **Monolithic page:** `pages/TourDetail.tsx` combines hero, markdown rendering, gallery, reviews, and booking CTA in ~200 lines. Split into composable sections (`TourHero`, `TourMarkdown`, `TourGallery`, `ReviewsPanel`, `BookingSidebar`) to isolate props, reduce re-renders, and enable focused tests/storybook coverage. 【F:pages/TourDetail.tsx†L16-L218】
- **Type safety duplication:** Domain interfaces live in `types.ts`, while Zod schemas in `lib/booking.ts` infer `BookingPayload`/`BookingFormValues`. The manual `BookingFormData` interface is redundant and risks drift; prefer schema inference as the single source of truth and remove the duplicate interface. 【F:types.ts†L1-L53】【F:lib/booking.ts†L1-L81】
- **SEO/Core Web Vitals gaps:** Tour pages are client-rendered: data loads via React Query after hydration and markdown renders on the client. There is no route-level metadata generation or pre-rendered HTML, so crawlers and users see a blank shell until JS executes, harming indexing and LCP/FID on `tours/:slug`. 【F:pages/TourDetail.tsx†L16-L218】

## Phase 3 — Path to Production Roadmap
1. **Immediate fixes (quick wins):**
   - Remove CDN/import-map dependencies from `index.html`; install React/Router/Tailwind via npm, generate `tailwind.config.js`, and compile CSS through Vite/PostCSS. Import the built stylesheet in the entry rather than `cdn.tailwindcss.com`. 【F:index.html†L1-L37】
   - Align router and docs: either switch to `HashRouter` for static hosting or update `docs/ARCHITECTURE.md` and hosting rewrites to match `BrowserRouter`. 【F:App.tsx†L1-L33】【F:docs/ARCHITECTURE.md†L7-L41】

2. **Next.js “North Star” migration:**
   - Move to Next.js App Router with file-based routing and Server Components. Promote tour fetching to the server (Route Handler or `fetch` with `revalidate`) and co-locate metadata via `generateMetadata`. React Query remains for client-only mutations (e.g., bookings) or real-time data.
   - **Example Server Component (`app/tours/[slug]/page.tsx`):**

```tsx
// File: app/tours/[slug]/page.tsx
import { notFound } from 'next/navigation';

async function fetchTour(slug: string) {
  const res = await fetch(`${process.env.API_URL}/tours/${slug}`, { next: { revalidate: 300 } });
  if (!res.ok) return null;
  return res.json();
}

export default async function TourPage({ params }: { params: { slug: string } }) {
  const tour = await fetchTour(params.slug);
  if (!tour) return notFound();
  return (
    <div>
      <h1>{tour.title}</h1>
      {/* Render hero/gallery as Server Components; mount BookingForm as a Client Component */}
    </div>
  );
}
```

3. **Internationalization (i18n):**
   - Adopt `react-i18next` (Vite) or `next-intl` (Next.js). Externalize BookingForm labels into translation files.
   - **Before:** `<label>Ваше имя *</label>`
   - **After (`react-i18next`):**

```tsx
const { t } = useTranslation('booking');
<label htmlFor="client_name" className="mb-1 block text-sm font-medium text-slate-700">
  {t('client_name_label')}
</label>
```

## Phase 4 — Backend Integration Strategy
- **Lightweight backend:** Deploy Vercel Functions/Route Handlers or Firebase Functions to accept bookings; persist to a managed DB (e.g., Supabase) and trigger notifications (email/Telegram webhook). Keep the client payload contract identical.
- **Security enforcement:** Client-side Zod validation (`bookingPayloadSchema.parse`) improves UX but cannot be trusted; malicious actors can bypass it. Reuse the same schema server-side before persisting or acting on data, returning structured errors. Add rate limiting and captcha at the edge to protect the endpoint. 【F:lib/booking.ts†L17-L81】
