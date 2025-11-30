import React from 'react';

export function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">О гиде</h1>
      
      <div className="prose prose-slate lg:prose-lg text-slate-600">
        <p className="lead text-xl text-slate-800 mb-6">
          Я — Александр, частный гид по Абхазии и окрестностям Сочи. Больше 10 лет вожу гостей по горным маршрутам — от озера Рица до Красной Поляны.
        </p>
        
        <img 
          src="https://picsum.photos/800/400?grayscale" 
          alt="Alexander" 
          className="rounded-xl w-full object-cover mb-8 shadow-sm"
        />

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Почему выбирают меня</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li><strong>Индивидуальный подход</strong> — небольшие группы, комфортный темп.</li>
          <li><strong>Комфортный транспорт</strong> — современный автомобиль с кондиционером и детским креслом.</li>
          <li><strong>Безопасность</strong> — регулярное ТО, аккуратная езда по горным дорогам.</li>
          <li><strong>Местные знания</strong> — покажу места, которых нет в путеводителях.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mb-4">Мой опыт</h2>
        <p className="mb-4">
          Я вырос в Сочи и исходил эти горы пешком ещё до того, как стал водить туристов. Для меня важно показать гостям не открыточную картинку, а настоящий Кавказ — с его величием, историей и гостеприимством.
        </p>
        <p>
          Каждая поездка для меня — это возможность поделиться любовью к этому краю. Я знаю, где самые вкусные хачапури, откуда открывается лучший вид на закат и когда лучше всего ехать на Рицу, чтобы избежать толп.
        </p>
      </div>
    </div>
  );
}