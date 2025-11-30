import React from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Contacts() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Связаться со мной</h1>
      <p className="text-lg text-slate-600 mb-10">
        У вас есть вопросы по маршруту или вы хотите забронировать индивидуальный тур? 
        Напишите мне в мессенджеры — я отвечаю быстро.
      </p>

      <div className="grid gap-4 max-w-md mx-auto">
        <Button size="lg" className="w-full bg-[#24A1DE] hover:bg-[#24A1DE]/90 text-white flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Написать в Telegram
        </Button>
        
        <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white flex items-center justify-center gap-2">
          <Phone className="h-5 w-5" />
          Написать в WhatsApp
        </Button>
        
        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-2">Телефон для связи:</p>
          <a href="tel:+79001234567" className="text-2xl font-bold text-slate-900 hover:text-teal-600">
            +7 (900) 123-45-67
          </a>
          <p className="text-sm text-slate-400 mt-2">Звонки с 9:00 до 21:00</p>
        </div>
      </div>
    </div>
  );
}