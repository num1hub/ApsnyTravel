import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain } from 'lucide-react';
import { CONTACT_LINKS } from '@/lib/contact';
import { branding } from '@/lib/branding';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <Mountain className="h-6 w-6" />
              <span>{branding.brandName}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{branding.siteTagline}</p>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Туры</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">О гиде</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Вопросы</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Связаться</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={CONTACT_LINKS.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_LINKS.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_LINKS.email}`} className="hover:text-white transition-colors">
                  {CONTACT_LINKS.email}
                </a>
              </li>
              <li>{CONTACT_LINKS.phoneDisplay}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center text-slate-500">
          <p>© {new Date().getFullYear()} ApsnyTravel. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}