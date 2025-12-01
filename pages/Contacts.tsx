import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/lib/seo';
import { branding } from '@/lib/branding';

export function Contacts() {
  usePageMeta({
    title: 'Контакты',
    description: 'Свяжитесь с ApsnyTravel: Telegram, WhatsApp или звонок напрямую для уточнения деталей тура.',
    path: '/contacts',
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Связаться со мной</h1>
      <p className="text-lg text-slate-600 mb-10">
        У вас есть вопросы по маршруту или вы хотите забронировать индивидуальный тур?
        Напишите мне в мессенджеры — я отвечаю быстро.
      </p>

      <div className="grid gap-4 max-w-md mx-auto">
        <Button
          asChild
          size="lg"
          className="w-full bg-[#24A1DE] hover:bg-[#24A1DE]/90 text-white flex items-center justify-center gap-2"
        >
          <a href={branding.contact.telegram} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" />
            Написать в Telegram
          </a>
        </Button>

        <Button
          asChild
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white flex items-center justify-center gap-2"
        >
          <a href={branding.contact.whatsapp} target="_blank" rel="noreferrer">
            <Phone className="h-5 w-5" />
            Написать в WhatsApp
          </a>
        </Button>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-2">Телефон для связи:</p>
          <a href={branding.contact.phone.href} className="text-2xl font-bold text-slate-900 hover:text-teal-600">
            {branding.contact.phone.display}
          </a>
          <p className="text-sm text-slate-400 mt-2">{branding.contact.phone.availability}</p>
        </div>
      </div>
    </div>
  );
}
