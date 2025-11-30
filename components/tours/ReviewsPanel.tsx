import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchReviewsByTourId } from '@/lib/api';
import { Review } from '@/types';
import { ReviewsList } from '@/components/reviews/ReviewsList';

interface ReviewsPanelProps {
  tourId: string;
}

export function ReviewsPanel({ tourId }: ReviewsPanelProps) {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery<Review[]>({
    queryKey: ['reviews', tourId],
    queryFn: () => fetchReviewsByTourId(tourId),
    enabled: Boolean(tourId),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Отзывы путешественников</h2>
        <span className="text-sm text-slate-500">{reviews?.length ?? 0}</span>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Загружаем отзывы...</span>
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-500">
          {(error as Error)?.message || 'Не удалось загрузить отзывы. Попробуйте позже.'}
        </p>
      )}

      {!isLoading && !isError && reviews && <ReviewsList reviews={reviews} />}
    </div>
  );
}
