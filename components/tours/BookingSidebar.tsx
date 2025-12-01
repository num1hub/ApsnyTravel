import React from 'react';
import { BookingForm } from '@/components/booking/BookingForm';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { branding } from '@/lib/branding';

interface BookingSidebarProps {
  priceFrom: number;
  tourTitle: string;
}

export function BookingSidebar({ priceFrom, tourTitle }: BookingSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-lg">
          <div className="mb-6 border-b border-slate-100 pb-6 text-center">
            <p className="mb-1 text-sm text-slate-500">Стоимость тура</p>
            <p className="text-3xl font-bold text-teal-700">{formatPrice(priceFrom)}</p>
            <p className="mt-1 text-xs text-slate-400">за человека</p>
          </div>

          <BookingForm tourTitle={tourTitle} />
        </div>

        <div className="text-center">
          <p className="mb-3 text-sm text-slate-500">Или напишите напрямую:</p>
          <div className="flex justify-center gap-3">
            <Button
              asChild
              variant="outline"
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <a href={branding.contact.telegram} target="_blank" rel="noreferrer">
                Telegram
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-green-200 text-green-600 hover:bg-green-50"
            >
              <a href={branding.contact.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
