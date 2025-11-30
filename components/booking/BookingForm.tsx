import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Loader2, CheckCircle } from 'lucide-react';

const bookingSchema = z.object({
  client_name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  client_contact: z.string().min(5, 'Введите корректный телефон или Telegram'),
  desired_date: z.string().optional(),
  pax: z.number().min(1, 'Минимум 1 человек').max(20, 'Максимум 20 человек'),
  client_message: z.string().max(500, 'Сообщение слишком длинное').optional(),
  consent: z.boolean().refine((val) => val === true, 'Необходимо согласие'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  tourTitle: string;
}

export function BookingForm({ tourTitle }: BookingFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pax: 1,
      consent: false,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log('Booking submitted:', { ...data, tour: tourTitle });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="rounded-lg border border-teal-100 bg-teal-50 p-6 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-teal-600 mb-4" />
        <h3 className="text-xl font-bold text-teal-900 mb-2">Заявка отправлена!</h3>
        <p className="text-teal-700">
          Спасибо, {tourTitle} ждет вас. Александр свяжется с вами в течение 5 минут (в рабочее время).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="client_name" className="mb-1 block text-sm font-medium text-slate-700">
          Ваше имя *
        </label>
        <Input
          id="client_name"
          placeholder="Иван Петров"
          {...register('client_name')}
          className={errors.client_name ? 'border-red-500' : ''}
        />
        {errors.client_name && (
          <p className="mt-1 text-xs text-red-500">{errors.client_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="client_contact" className="mb-1 block text-sm font-medium text-slate-700">
          Телефон или Telegram *
        </label>
        <Input
          id="client_contact"
          placeholder="+7 999 000-00-00 или @username"
          {...register('client_contact')}
          className={errors.client_contact ? 'border-red-500' : ''}
        />
        {errors.client_contact && (
          <p className="mt-1 text-xs text-red-500">{errors.client_contact.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="desired_date" className="mb-1 block text-sm font-medium text-slate-700">
            Дата (необязательно)
          </label>
          <Input
            id="desired_date"
            type="date"
            {...register('desired_date')}
          />
        </div>
        <div>
          <label htmlFor="pax" className="mb-1 block text-sm font-medium text-slate-700">
            Кол-во человек *
          </label>
          <Input
            id="pax"
            type="number"
            min={1}
            max={20}
            {...register('pax', { valueAsNumber: true })}
            className={errors.pax ? 'border-red-500' : ''}
          />
          {errors.pax && (
            <p className="mt-1 text-xs text-red-500">{errors.pax.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="client_message" className="mb-1 block text-sm font-medium text-slate-700">
          Комментарий
        </label>
        <Textarea
          id="client_message"
          placeholder="Нужно ли детское кресло? Особые пожелания?"
          {...register('client_message')}
        />
        {errors.client_message && (
          <p className="mt-1 text-xs text-red-500">{errors.client_message.message}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="consent"
          {...register('consent')}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600"
        />
        <label htmlFor="consent" className="text-xs text-slate-600">
          Я согласен на обработку персональных данных.
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-red-500">{errors.consent.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          'Забронировать тур'
        )}
      </Button>
      
      <p className="text-center text-xs text-slate-500 mt-2">
        Оплата не требуется сейчас. Мы свяжемся для подтверждения.
      </p>
    </form>
  );
}