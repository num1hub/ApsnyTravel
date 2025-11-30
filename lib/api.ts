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

const MIN_DELAY_MS = 500;
const MAX_DELAY_MS = 900;

async function simulateNetworkDelay() {
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export async function fetchTours(): Promise<Tour[]> {
  await simulateNetworkDelay();

  return [...TOURS].filter((tour) => tour.is_active);
}

export async function fetchTourBySlug(slug: string): Promise<Tour> {
  if (!slug) {
    throw new ApiError('Missing tour slug');
  }

  await simulateNetworkDelay();

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

  const simulatedDelayMs = 800 + Math.random() * 700;

  await new Promise((resolve) => setTimeout(resolve, simulatedDelayMs));

  const reviews = REVIEWS.filter((review) => review.tourId === tourId);

  if (!reviews.length) {
    return [];
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
