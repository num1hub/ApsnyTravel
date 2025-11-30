import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchTourBySlug } from '@/lib/api';
import { Tour } from '@/types';
import { Button } from '@/components/ui/button';
import { TourHero } from '@/components/tours/TourHero';
import { TourContent } from '@/components/tours/TourContent';
import { ReviewsPanel } from '@/components/tours/ReviewsPanel';
import { BookingSidebar } from '@/components/tours/BookingSidebar';
import { usePageTitle } from '@/lib/seo';

export function TourDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: tour, isLoading, isError, error } = useQuery<Tour>({
    queryKey: ['tour', slug],
    queryFn: () => fetchTourBySlug(slug ?? ''),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });

  usePageTitle(tour?.title ?? 'Тур');

  if (isLoading) {
    return (
      <div className="container mx-auto flex items-center justify-center gap-3 px-4 py-20 text-center text-slate-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Загружаем тур...</span>
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Тур не найден</h1>
        {isError && (
          <p className="mb-4 text-sm text-red-500">{(error as Error)?.message ?? 'Ошибка загрузки данных'}</p>
        )}
        <Button asChild>
          <Link to="/catalog">Вернуться в каталог</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link to="/catalog" className="inline-flex items-center text-sm text-slate-500 hover:text-teal-600">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Назад в каталог
          </Link>
        </div>
      </div>

      <TourHero
        title={tour.title}
        coverImage={tour.cover_image}
        region={tour.region}
        durationHours={tour.duration_hours}
        type={tour.type}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <TourContent description={tour.description_md} galleryImages={tour.gallery_images} />
            <ReviewsPanel tourId={tour.id} />
          </div>
          <BookingSidebar priceFrom={tour.price_from} tourTitle={tour.title} />
        </div>
      </div>
    </div>
  );
}
