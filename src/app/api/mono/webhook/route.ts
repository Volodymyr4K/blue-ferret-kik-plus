import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook для Plata by Mono — отримує зміни статусу оплати.
 * Налаштуйте цей URL у кабінеті Mono: https://web.monobank.ua
 * 
 * Статуси: created | processing | success | failure | expired
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const _xSign = request.headers.get('X-Sign'); // TODO: verify signature

    if (!body) {
      return NextResponse.json({ error: 'Empty body' }, { status: 400 });
    }

    const payload = JSON.parse(body) as {
      invoiceId: string;
      status: string;
      amount?: number;
      reference?: string;
      modifiedDate?: string;
    };

    // TODO: верифікувати підпис X-Sign (ECDSA) за допомогою публічного ключа з GET /api/merchant/pubkey
    // Поки що логуємо для налагодження
    if (process.env.NODE_ENV === 'development') {
      console.log('[Mono Webhook]', payload.invoiceId, payload.status, payload.reference, 'X-Sign:', _xSign);
    }

    // Тут можна оновити статус замовлення в БД, надіслати email тощо
    switch (payload.status) {
      case 'success':
        // Оплата успішна — оновити замовлення
        break;
      case 'failure':
      case 'expired':
        // Оплата не пройшла
        break;
      case 'processing':
        // Оплата в обробці
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Mono webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
