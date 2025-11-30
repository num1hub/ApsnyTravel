import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag } from 'lucide-react';
import { Tour } from '../../types';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/button';

export interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={tour.cover_image}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-teal-700 backdrop-blur-sm">
          {tour.type === 'tour' ? 'Тур' : 'Экскурсия'}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {tour.duration_hours} ч
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {tour.region}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-teal-700">
          {tour.title}
        </h3>
        
        <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-2">
          {tour.short_desc}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">Стоимость</span>
            <span className="font-bold text-slate-900">{formatPrice(tour.price_from)}</span>
          </div>
          <Button asChild size="sm">
            <Link to={`/tours/${tour.slug}`}>Подробнее</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};