import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Loader2, ShieldCheck, Star, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { TourCard } from '../components/tours/TourCard';
import { fetchTours } from '../lib/api';
import { usePageMeta } from '../lib/seo';
import { Tour } from '../types';

export function Home() {
  usePageMeta({
    title: 'Главная',
    description:
      'Авторские экскурсии по Абхазии и Сочи с местным гидом. Выберите маршрут, узнайте детали и забронируйте тур онлайн.',
    path: '/',
  });

  const {
    data: tours,
    isLoading,
    isError,
    error,
  } = useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: fetchTours,
    staleTime: 5 * 60 * 1000,
  });

  const featuredTours = (tours ?? []).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://picsum.photos/1920/1080?random=hero" 
            alt="Abkhazia Landscape" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            Откройте для себя Абхазию<br />с местным экспертом
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-200 mb-10">
            Индивидуальные туры по Абхазии и Сочи. Комфортный транспорт, безопасные маршруты и истории, которых нет в путеводителях.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/catalog">Выбрать маршрут</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
              <Link to="/about">О гиде</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-teal-50 p-3">
                <ShieldCheck className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-slate-900">Безопасность</h3>
              <p className="text-sm text-slate-600 mt-2">
                Проверенные маршруты и надежный транспорт. 10 лет безаварийного стажа.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-teal-50 p-3">
                <Star className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-slate-900">Честные цены</h3>
              <p className="text-sm text-slate-600 mt-2">
                Никаких скрытых доплат. Вы знаете полную стоимость до начала поездки.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-teal-50 p-3">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-slate-900">Индивидуальный подход</h3>
              <p className="text-sm text-slate-600 mt-2">
                Мини-группы или приватные туры. Темп, который удобен именно вам.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Популярные туры</h2>
            <Link to="/catalog" className="hidden sm:flex items-center text-teal-600 font-medium hover:text-teal-700">
              Смотреть все <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Загружаем подборку...</span>
            </div>
          )}

          {isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {(error as Error)?.message || 'Не удалось загрузить туры. Попробуйте позже.'}
            </div>
          )}

          {!isLoading && !isError && (
            featuredTours.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">
                Туры временно недоступны. Загляните позже или свяжитесь с нами напрямую.
              </div>
            )
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link to="/catalog">Смотреть все туры</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative aspect-video rounded-xl overflow-hidden bg-slate-100">
             <img src="https://picsum.photos/800/600?grayscale" alt="Guide Alexander" className="object-cover h-full w-full" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Привет! Я Александр.</h2>
            <p className="text-lg text-slate-600 mb-6">
              Я частный гид по Абхазии и Сочи. Я родился и вырос здесь, поэтому знаю каждый поворот серпантина и каждую тропинку в горах.
            </p>
            <p className="text-slate-600 mb-8">
              Моя цель — показать вам настоящий Кавказ, не «открыточный», а живой и гостеприимный. Без спешки, без толп туристов, с душой.
            </p>
            <Button asChild>
              <Link to="/about">Узнать больше обо мне</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}