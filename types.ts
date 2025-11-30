import type { BookingFormValues } from './lib/booking';

export enum TourRegion {
  ABKHAZIA = 'abkhazia',
  SOCHI = 'sochi',
  KRASNAYA_POLYANA = 'krasnaya_polyana',
  OLYMPIC_PARK = 'olympic_park',
}

export enum TourType {
  TOUR = 'tour',
  EXCURSION = 'excursion',
}

export enum TourDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  short_desc: string;
  description_md: string;
  region: TourRegion;
  type: TourType;
  difficulty: TourDifficulty;
  duration_hours: number;
  price_from: number;
  currency: string;
  cover_image: string;
  gallery_images: string[];
  tags: string[];
  is_active: boolean;
}

export interface Review {
  id: string;
  tourId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export type BookingFormData = BookingFormValues;
