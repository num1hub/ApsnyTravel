import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TourCard } from '../components/tours/TourCard';
import { REGIONS_LABELS, TYPES_LABELS } from '../constants';
import { fetchTours } from '../lib/api';
import { usePageTitle } from '../lib/seo';
import { Tour, TourRegion, TourType } from '../types';
import { Button } from '../components/ui/button';
import { Loader2 } from 'lucide-react';

export function Catalog() {
  usePageTitle('Каталог туров');

  const [selectedRegion, setSelectedRegion] = useState<TourRegion | 'all'>('all');
  const [selectedType, setSelectedType] = useState<TourType | 'all'>('all');

  const {
    data: tours = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: fetchTours,
    staleTime: 5 * 60 * 1000,
  });

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const regionMatch = selectedRegion === 'all' || tour.region === selectedRegion;
      const typeMatch = selectedType === 'all' || tour.type === selectedType;
      return regionMatch && typeMatch;
    });
  }, [selectedRegion, selectedType, tours]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Каталог туров</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value as TourRegion | 'all')}
        >
          <option value="all">Все регионы</option>
          {Object.entries(REGIONS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as TourType | 'all')}
        >
          <option value="all">Все типы</option>
          {Object.entries(TYPES_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        
        {(selectedRegion !== 'all' || selectedType !== 'all') && (
          <Button
            variant="ghost"
            onClick={() => { setSelectedRegion('all'); setSelectedType('all'); }}
            className="sm:w-auto w-full"
          >
            Сбросить
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Загружаем туры...</span>
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <div className="flex items-start justify-between gap-3">
            <p>{(error as Error)?.message || 'Не удалось загрузить туры. Попробуйте обновить страницу.'}</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Повторить
            </Button>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {/* Grid */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-slate-500">Туров по выбранным критериям не найдено.</p>
              <Button variant="link" onClick={() => { setSelectedRegion('all'); setSelectedType('all'); }}>
                Показать все туры
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}