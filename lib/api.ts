import { REVIEWS, TOURS } from '../constants';
import { Review, Tour } from '../types';

/**
 * API boundary for tours and reviews.
 *
 * The UI always calls these functions. They operate in one of two modes:
 * - Mock mode (default): serve data from constants with slight latency for realistic UX.
 * - Remote mode: when VITE_API_URL is set, perform network calls while preserving error semantics.
 */

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL?.trim();
}

const API_BASE_URL = getApiBaseUrl();
const IS_REMOTE_API_ENABLED = Boolean(API_BASE_URL);
const IS_PRODUCTION_BUILD = import.meta.env.PROD;
const IS_MOCK_MODE = !IS_REMOTE_API_ENABLED;

const FALLBACK_MIN_DELAY_MS = 120;
const FALLBACK_MAX_DELAY_MS = 280;

async function maybeDelay() {
  if (IS_PRODUCTION_BUILD || !IS_MOCK_MODE) {
    return;
  }

  const delay =
    FALLBACK_MIN_DELAY_MS + Math.random() * (FALLBACK_MAX_DELAY_MS - FALLBACK_MIN_DELAY_MS);

  await new Promise((resolve) => setTimeout(resolve, delay));
}

  async function safeParseJson(response: Response) {
    try {
      return await response.json();
    } catch {
      return undefined;
    }
  }

/**
 * Issue a GET request to the configured backend and normalize common error cases.
 * In mock mode this function should never be called; callers guard with IS_REMOTE_API_ENABLED.
 */
async function request<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError('API base URL is not configured');
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  } catch (error) {
    throw new ApiError('Network request failed', undefined, error);
  }

  const parsedBody = await safeParseJson(response);

  if (!response.ok) {
    throw new ApiError('API request failed', response.status, parsedBody ?? undefined);
  }

  if (parsedBody === undefined) {
    throw new ApiError('API response is not valid JSON', response.status);
  }

  return parsedBody as T;
}

function filterActiveTours(tours: Tour[]) {
  return tours.filter((tour) => tour.is_active);
}

/**
 * Fetch the list of tours.
 *
 * - Remote mode: GET /tours from the configured API, filtered by is_active.
 * - Mock mode: return locally defined TOURS with a tiny random delay for UX realism.
 */
export async function fetchTours(): Promise<Tour[]> {
  if (IS_REMOTE_API_ENABLED) {
    const tours = await request<Tour[]>('/tours');
    return filterActiveTours(tours);
  }

  await maybeDelay();

  return filterActiveTours([...TOURS]);
}

export async function fetchTourBySlug(slug: string): Promise<Tour> {
  if (!slug) {
    throw new ApiError('Missing tour slug');
  }

  if (IS_REMOTE_API_ENABLED) {
    const tour = await request<Tour>(`/tours/${slug}`);

    if (!tour || tour.is_active === false) {
      throw new ApiError('Тур не найден', 404);
    }

    return tour;
  }

  await maybeDelay();

  const tour = TOURS.find((item) => item.slug === slug && item.is_active);

  if (!tour) {
    throw new ApiError('Тур не найден', 404);
  }

  return tour;
}

/**
 * Fetch reviews for a given tour.
 *
 * - Remote mode: GET /reviews?tourId=ID and return as-is.
 * - Mock mode: filter REVIEWS by tourId and sort by most recent first.
 */
export async function fetchReviewsByTourId(tourId: string): Promise<Review[]> {
  if (!tourId) {
    throw new ApiError('Missing tour id');
  }

  if (IS_REMOTE_API_ENABLED) {
    const params = new URLSearchParams({ tourId });
    const reviews = await request<Review[]>(`/reviews?${params.toString()}`);
    return reviews;
  }

  await maybeDelay();

  const reviews = REVIEWS.filter((review) => review.tourId === tourId);

  if (!reviews.length) {
    return [];
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
