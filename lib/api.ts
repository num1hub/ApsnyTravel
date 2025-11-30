import { Tour } from '../types';

export async function fetchTourBySlug(slug: string): Promise<Tour> {
  if (!slug) {
    throw new Error('Missing tour slug');
  }

  const response = await fetch(`/api/tours/${encodeURIComponent(slug)}`);

  if (!response.ok) {
    throw new Error(`Failed to load tour: ${response.statusText}`);
  }

  const data = (await response.json()) as Tour;

  if (!data?.slug) {
    throw new Error('Received invalid tour payload');
  }

  return data;
}
