import { TOURS } from '../constants';
import { Tour } from '../types';

/**
 * Simulates fetching a tour from a backend while staying entirely client-side.
 * Adds a small artificial delay so loading states can be exercised.
 */
export function fetchTourBySlug(slug: string): Promise<Tour> {
  if (!slug) {
    return Promise.reject(new Error('Missing tour slug'));
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tour = TOURS.find((item) => item.slug === slug);

      if (!tour) {
        reject(Object.assign(new Error('Tour not found'), { status: 404 }));
        return;
      }

      resolve(tour);
    }, 600);
  });
}
