import { NextRequest, NextResponse } from 'next/server';

const MONO_API_URL = process.env.MONO_API_URL || 'https://api.monobank.ua';

export async function POST(request: NextRequest) {
  const token = process.env.MONO_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Plata by Mono не налаштовано. Додайте MONO_API_TOKEN до .env' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { amount, gameName, reference, redirectUrl, webHookUrl } = body;

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Мінімальна сума — 1 грн (100 копійок)' },
        { status: 400 }
      );
    }

    const invoicePayload = {
      amount: Math.round(Number(amount)),
      ccy: 980,
      merchantPaymInfo: {
        reference: reference || `order-${Date.now()}`,
        destination: `Оплата: ${gameName || 'Замовлення'}`,
        comment: gameName || 'Замовлення настільної гри',
        basketOrder: [
          {
            name: gameName || 'Настільна гра',
            qty: 1,
            sum: Math.round(Number(amount)),
            total: Math.round(Number(amount)),
            unit: 'шт.',
            code: `game-${Date.now()}`,
          },
        ],
      },
      redirectUrl: redirectUrl || `${process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin}/igry?payment=success`,
      webHookUrl: webHookUrl || (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/mono/webhook` : undefined),
      validity: 3600,
      paymentType: 'debit',
    };

    const res = await fetch(`${MONO_API_URL}/api/merchant/invoice/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
      body: JSON.stringify(invoicePayload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.errorDescription || data.errText || 'Помилка Mono API', details: data },
        { status: res.status }
      );
    }

    return NextResponse.json({
      invoiceId: data.invoiceId,
      pageUrl: data.pageUrl,
    });
  } catch (err) {
    console.error('Mono invoice error:', err);
    return NextResponse.json(
      { error: 'Помилка створення рахунку' },
      { status: 500 }
    );
  }
}
