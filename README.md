# ApsnyTravel

ApsnyTravel is a boutique travel catalog and booking experience for tours in Abkhazia and Sochi. The app showcases curated routes with photos, markdown descriptions, reviews, and a booking form that validates requests before submission.

## Tech stack
- Vite + React 19 + TypeScript
- React Router 7 for clean URLs (`/`, `/catalog`, `/tours/:slug`, `/about`, `/faq`, `/contacts`)
- React Query 5 for client-side data fetching and caching
- Tailwind CSS 3 for styling
- Zod + react-hook-form for booking validation

## Features
- Home and catalog views with featured and filtered tours
- Detailed tour pages with gallery, markdown content, and reviews
- Booking form with Zod validation and consent checkbox
- Demo-friendly booking fallback when no endpoint is configured

## Getting started

### Prerequisites
- Node.js 18+

### Install and run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server (Vite defaults to port 3000):
   ```bash
   npm run dev
   ```

### Build
Produce an optimized production bundle:
```bash
npm run build
```
Use `npm run preview` to serve the built assets locally.

## Booking configuration
Bookings are posted to the endpoint set via `VITE_BOOKING_ENDPOINT` at build time.
- **Demo mode (no endpoint set):** the client validates the payload, waits ~1.2s, and returns a mocked success object.
- **Production with no endpoint:** submission throws a descriptive error to avoid silent data loss.

## Deployment notes
- The app uses `BrowserRouter`; static hosts must serve `index.html` for all routes (see `vercel.json` for a catch-all rewrite example).
- Ensure `VITE_BOOKING_ENDPOINT` is configured in production if you need real submissions.

## Project structure
- `index.tsx` — app entry, mounts React Query and `App`.
- `App.tsx` — router shell and layout.
- `pages/` — route components (home, catalog, tour detail, about, FAQ, contacts).
- `components/` — UI primitives and tour/booking building blocks.
- `lib/` — API mock/remote helpers, booking validation, utilities.
- `constants.ts` — mock data source for tours and reviews.
- `docs/` — architecture and audit notes.

## Contributing and testing
- Linting is not yet configured; run the build to catch type errors:
  ```bash
  npm run build
  ```
- Please keep validation strict: all booking payloads must pass the Zod schema before submission.
