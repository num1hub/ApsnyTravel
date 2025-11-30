import { z } from 'zod';

const bookingPayloadSchema = z.object({
  tourTitle: z.string().min(1),
  client_name: z.string().min(2),
  client_contact: z.string().min(5),
  desired_date: z.string().optional(),
  pax: z.number().min(1).max(20),
  client_message: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true),
});

export type BookingPayload = z.infer<typeof bookingPayloadSchema>;

const WAIT_FALLBACK_MS = 1200;

export async function submitBookingRequest(payload: BookingPayload) {
  bookingPayloadSchema.parse(payload);

  const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT;

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, WAIT_FALLBACK_MS));
    return { ok: true, mocked: true } as const;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || 'Не удалось отправить заявку. Попробуйте позже.');
  }

  return response.json().catch(() => ({ ok: true }));
}
