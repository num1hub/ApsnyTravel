import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Loader2 } from 'lucide-react';
import { REGIONS_LABELS } from '../constants';
import { fetchTourBySlug } from '../lib/api';
import { formatPrice } from '../lib/utils';
import { BookingForm } from '../components/booking/BookingForm';
import { Button } from '../components/ui/button';
import { Tour } from '../types';

export function TourDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: tour, isLoading, isError, error } = useQuery<Tour>({
    queryKey: ['tour', slug],
    queryFn: () => fetchTourBySlug(slug ?? ''),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-slate-600 flex items-center justify-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Загружаем тур...</span>
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Тур не найден</h1>
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
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Breadcrumb / Back */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <Link to="/catalog" className="inline-flex items-center text-sm text-slate-500 hover:text-teal-600">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Назад в каталог
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img
          src={tour.cover_image}
          alt={tour.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <span className="inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white mb-3">
              {REGIONS_LABELS[tour.region]}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{tour.title}</h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm md:text-base">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {tour.duration_hours} часов
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> {tour.type === 'tour' ? 'Тур' : 'Экскурсия'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">О туре</h2>
              {/* Rendering simplified Markdown content as plain text blocks for MVP */}
              <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-line">
                {tour.description_md.split('##').map((section, idx) => {
                  if (!section.trim()) return null;
                  const [title, ...body] = section.split('\n');
                  return (
                    <div key={idx} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                      <p>{body.join('\n').trim()}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Фотогалерея</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.gallery_images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Gallery ${idx + 1}`} 
                    className="rounded-lg object-cover h-48 w-full hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="text-center mb-6 border-b border-slate-100 pb-6">
                  <p className="text-sm text-slate-500 mb-1">Стоимость тура</p>
                  <p className="text-3xl font-bold text-teal-700">
                    {formatPrice(tour.price_from)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">за человека</p>
                </div>
                
                <BookingForm tourTitle={tour.title} />
              </div>

              {/* Direct Contact */}
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-3">Или напишите напрямую:</p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                    Telegram
                  </Button>
                  <Button variant="outline" className="w-full text-green-600 border-green-200 hover:bg-green-50">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}