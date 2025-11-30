import React, { useState, useMemo } from 'react';
import { TourCard } from '../components/tours/TourCard';
import { TOURS, REGIONS_LABELS, TYPES_LABELS } from '../constants';
import { TourRegion, TourType } from '../types';
import { Button } from '../components/ui/button';

export function Catalog() {
  const [selectedRegion, setSelectedRegion] = useState<TourRegion | 'all'>('all');
  const [selectedType, setSelectedType] = useState<TourType | 'all'>('all');

  const filteredTours = useMemo(() => {
    return TOURS.filter((tour) => {
      const regionMatch = selectedRegion === 'all' || tour.region === selectedRegion;
      const typeMatch = selectedType === 'all' || tour.type === selectedType;
      return regionMatch && typeMatch;
    });
  }, [selectedRegion, selectedType]);

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
    </div>
  );
}