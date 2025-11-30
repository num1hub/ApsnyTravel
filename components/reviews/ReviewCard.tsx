import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '@/types';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const formattedDate = new Date(review.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-sm', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">{review.author}</p>
          <p className="text-xs text-slate-500">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-1" aria-label={`Оценка ${review.rating} из 5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                'h-4 w-4',
                index < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200',
              )}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">{review.comment}</p>
    </article>
  );
}
