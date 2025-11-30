import React from 'react';
import { Clock, Tag } from 'lucide-react';
import { REGIONS_LABELS } from '@/constants';
import { TourRegion, TourType } from '@/types';

type TourHeroProps = {
  title: string;
  coverImage: string;
  region: TourRegion;
  durationHours: number;
  type: TourType;
};

export function TourHero({ title, coverImage, region, durationHours, type }: TourHeroProps) {
  return (
    <div className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
      <img src={coverImage} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="container mx-auto">
          <span className="mb-3 inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
            {REGIONS_LABELS[region]}
          </span>
          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">{title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/90 md:text-base">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {durationHours} часов
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {type === 'tour' ? 'Тур' : 'Экскурсия'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
