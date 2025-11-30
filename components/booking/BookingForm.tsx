import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Loader2, CheckCircle } from 'lucide-react';
import { bookingFormSchema, BookingFormValues, submitBookingRequest } from '../../lib/booking';

interface BookingFormProps {
  tourTitle: string;
}

export function BookingForm({ tourTitle }: BookingFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      pax: 1,
      consent: false,
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitBookingRequest({ ...data, tourTitle });
      setIsSuccess(true);
    } catch (error) {
      const message = (error as Error)?.message || 'Не удалось отправить заявку. Попробуйте снова.';
      console.error('Booking submission failed:', error);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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
          Телефон в международном формате *
        </label>
        <Input
          id="client_contact"
          placeholder="+7 999 0000000"
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
            Дата (будущее)
          </label>
          <Input
            id="desired_date"
            type="date"
            {...register('desired_date')}
            className={errors.desired_date ? 'border-red-500' : ''}
          />
          {errors.desired_date && (
            <p className="mt-1 text-xs text-red-500">{errors.desired_date.message}</p>
          )}
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

      {errorMessage && (
        <p className="text-center text-xs text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
