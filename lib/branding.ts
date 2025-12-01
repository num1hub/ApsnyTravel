export const branding = {
  siteName: 'ApsnyTravel',
  siteTagline: 'Индивидуальные туры по Абхазии и Сочи с частным гидом',
  regionLabel: 'Абхазия и Сочи',
  defaultDescription:
    'Каталог авторских экскурсий и индивидуальных туров по Абхазии и Сочи с опытным частным гидом.',
  contact: {
    phone: {
      display: '+7 (900) 123-45-67',
      href: 'tel:+79001234567',
      availability: 'Звонки с 9:00 до 21:00',
    },
    email: 'hello@apsnytravel.ru',
    telegram: 'https://t.me/apsnytravel',
    whatsapp: 'https://wa.me/79001234567',
  },
  socials: {
    instagram: 'https://instagram.com/apsnytravel',
  },
};

export type BrandingConfig = typeof branding;
