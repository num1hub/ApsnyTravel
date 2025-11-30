import React from 'react';
import { Review } from '@/types';
import { ReviewCard } from './ReviewCard';

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (!reviews.length) {
    return <p className="text-sm text-slate-500">Пока нет отзывов об этом туре.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
