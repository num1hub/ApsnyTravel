import { REVIEWS, TOURS } from '../constants';
import { Review, Tour } from '../types';

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

const API_BASE_URL = import.meta.env.VITE_API_URL?.trim();
const IS_REMOTE_API_ENABLED = Boolean(API_BASE_URL);
const IS_PRODUCTION_BUILD = import.meta.env.PROD;

const FALLBACK_MIN_DELAY_MS = 120;
const FALLBACK_MAX_DELAY_MS = 280;

async function maybeDelay() {
  if (IS_PRODUCTION_BUILD || IS_REMOTE_API_ENABLED) {
    return;
  }

  const delay =
    FALLBACK_MIN_DELAY_MS + Math.random() * (FALLBACK_MAX_DELAY_MS - FALLBACK_MIN_DELAY_MS);

  await new Promise((resolve) => setTimeout(resolve, delay));
}

async function safeParseJson(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    return undefined;
  }
}

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
