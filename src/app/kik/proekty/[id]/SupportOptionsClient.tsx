'use client';

import { useState } from 'react';
import { ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import type { ProjectSupportTier } from '@/data/projects';

interface SupportOptionsClientProps {
  projectId: string;
  projectName: string;
  minDonation: number;
  defaultDonation: number;
  tiers: ProjectSupportTier[];
}

function formatMoney(value: number) {
  return (
    new Intl.NumberFormat('uk-UA', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value) + ' ₴'
  );
}

export default function SupportOptionsClient({
  projectId,
  projectName,
  minDonation,
  defaultDonation,
  tiers,
}: SupportOptionsClientProps) {
  const [customAmount, setCustomAmount] = useState(String(defaultDonation));
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (amount: number, title: string, key: string) => {
    if (!Number.isFinite(amount) || amount < minDonation) {
      setError(`Мінімальна сума підтримки — ${formatMoney(minDonation)}.`);
      return;
    }

    setLoadingKey(key);
    setError(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const amountKop = Math.round(amount * 100);
      const safeTitle = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zа-яіїєґ0-9-]/gi, '');

      const res = await fetch('/api/mono/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountKop,
          gameName: `${projectName} — ${title}`,
          reference: `kik-${projectId}-${safeTitle}-${Date.now()}`,
          redirectUrl: `${origin}/kik/proekty?payment=success`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Не вдалося створити оплату');
      if (!data.pageUrl) throw new Error('Не отримано посилання на оплату');

      window.location.href = data.pageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка оплати');
      setLoadingKey(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 sm:p-6 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.35)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Підтримка без нагороди
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Можна підтримати проєкт будь-якою сумою без вибору набору. Мінімум — {formatMoney(minDonation)}.
            </p>
          </div>

          <div className="w-full md:w-[360px] flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              min={minDonation}
              step={10}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="input-field flex-1 min-w-0"
              aria-label="Сума підтримки"
            />
            <button
              type="button"
              onClick={() => createInvoice(Number(customAmount), 'Підтримка без нагороди', 'custom')}
              disabled={loadingKey === 'custom'}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingKey === 'custom' ? 'Створення…' : 'Підтримати'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {tiers.map((tier) => {
          const key = `tier-${tier.id}`;
          const isLoading = loadingKey === key;

          return (
            <div
              key={tier.id}
              className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 sm:p-6 shadow-[0_18px_42px_-34px_rgba(15,23,42,0.32)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="max-w-2xl">
                  {tier.featured && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--kik-accent)]/12 text-[var(--kik-accent)] text-xs font-semibold border border-[var(--kik-accent)]/25 mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Рекомендовано
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{tier.title}</h3>
                  <p className="text-slate-600 mb-3">{tier.description}</p>
                  {tier.includes?.length ? (
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--kik-accent)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="px-5 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-xl text-center">
                    {formatMoney(tier.amount)}
                  </div>
                  <button
                    type="button"
                    onClick={() => createInvoice(tier.amount, tier.title, key)}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--kik-accent)] text-white font-semibold hover:bg-[var(--teal-accent)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Створення…' : 'Підтримати'}
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
