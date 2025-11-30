import { Tour } from '../types';

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

const API_BASE_URL = 'https://api.apsnytravel.com/v1';
const REQUEST_TIMEOUT_MS = 10000;

export async function fetchTourBySlug(slug: string): Promise<Tour> {
  if (!slug) {
    throw new ApiError('Missing tour slug');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/tours/${encodeURIComponent(slug)}`, {
      method: 'GET',
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => undefined);
      throw new ApiError(errorText || 'Failed to load tour', response.status);
    }

    const data = (await response.json()) as Tour;
    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError((error as Error)?.message || 'Unexpected error occurred');
  } finally {
    clearTimeout(timeoutId);
  }
}
