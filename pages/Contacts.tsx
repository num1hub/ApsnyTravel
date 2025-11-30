import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT_LINKS } from '@/lib/contact';
import { usePageTitle } from '@/lib/seo';

export function Contacts() {
  usePageTitle('Контакты');

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
          <a href={CONTACT_LINKS.telegramUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5" />
            Написать в Telegram
          </a>
        </Button>

        <Button
          asChild
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white flex items-center justify-center gap-2"
        >
          <a href={CONTACT_LINKS.whatsappUrl} target="_blank" rel="noreferrer">
            <Phone className="h-5 w-5" />
            Написать в WhatsApp
          </a>
        </Button>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-2">Телефон для связи:</p>
          <a href={CONTACT_LINKS.phoneHref} className="text-2xl font-bold text-slate-900 hover:text-teal-600">
            {CONTACT_LINKS.phoneDisplay}
          </a>
          <p className="text-sm text-slate-400 mt-2">Звонки с 9:00 до 21:00</p>
        </div>
      </div>
    </div>
  );
}
