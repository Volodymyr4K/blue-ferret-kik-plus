'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Home } from 'lucide-react';

export default function IgryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Помилка завантаження ігор</h1>
      <p className="text-slate-600 mb-8 text-center max-w-md">
        Не вдалося завантажити сторінку. Спробуйте оновити або перейти на головну.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#009FE3] text-white font-semibold rounded-xl hover:bg-[#0077b3] transition-colors"
        >
          Спробувати знову
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
        >
          <Home className="w-4 h-4" />
          Головна
        </Link>
        <Link
          href="/igry"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
        >
          <Gamepad2 className="w-4 h-4" />
          Наші ігри
        </Link>
      </div>
    </div>
  );
}
