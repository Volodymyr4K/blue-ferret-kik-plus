'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  gamePrice?: number;
}

export default function OrderModal({ isOpen, onClose, gameName, gamePrice }: OrderModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amountKopiykas = gamePrice ? Math.round(gamePrice * 100) : 0;
  const canPayMono = !!gamePrice && gamePrice >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handlePayMono = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPayMono) return;

    setLoading(true);
    setError(null);

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const res = await fetch('/api/mono/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountKopiykas,
          gameName,
          reference: `bf-${gameName.replace(/\s/g, '-').toLowerCase()}-${Date.now()}`,
          redirectUrl: `${origin}/igry?payment=success`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Помилка створення оплати');
      }

      if (data.pageUrl) {
        window.location.href = data.pageUrl;
        return;
      }

      throw new Error('Не отримано посилання на оплату');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка оплати');
      setLoading(false);
    }
  };

  const inputClass = 'input-field';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] border-2 border-slate-200/60 z-50 p-6 lg:p-8 mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="heading-2 text-xl sm:text-2xl">Оформити замовлення</h2>
              <button onClick={onClose} className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700" aria-label="Закрити">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-body mb-6">
              Гра: <strong className="text-slate-900">{gameName}</strong>
              {gamePrice && (
                <span className="ml-2 text-bf font-bold">
                  {gamePrice} ₴
                </span>
              )}
            </p>

            {canPayMono && (
              <div className="mb-6 p-5 rounded-2xl bg-slate-50/80 border-2 border-slate-200/60">
                <p className="text-caption mb-4 pb-4 border-b border-slate-200/80">
                  Оплата карткою Visa/Mastercard через <strong className="text-slate-800">Plata by Mono</strong>
                </p>
                <button
                  type="button"
                  onClick={handlePayMono}
                  disabled={loading}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed border-2 border-slate-900/20 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]"
                >
                  {loading ? (
                    <span className="animate-pulse">Створення оплати...</span>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Оплатити {gamePrice} ₴
                    </>
                  )}
                </button>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
                <p className="mt-3 text-xs text-slate-500 text-center">
                  Безпечна оплата через Monobank
                </p>
              </div>
            )}

            <p className="text-sm text-slate-500 mb-4">
              {canPayMono ? 'Або залиште заявку — ми зв\'яжемося з вами:' : 'Залиште заявку — ми зв\'яжемося з вами:'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ім'я *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="tel"
                placeholder="Телефон *"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Адреса доставки"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={inputClass}
              />
              <textarea
                placeholder="Коментар"
                rows={3}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="w-full py-4 btn btn-primary rounded-xl shadow-[0_0_25px_-5px_rgba(0,159,227,0.35)] hover:shadow-[0_0_35px_-8px_rgba(0,159,227,0.45)]"
              >
                Надіслати заявку
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
