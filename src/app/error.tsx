'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Heart, Home } from 'lucide-react';

export default function Error({
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
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Щось пішло не так</h1>
      <p className="text-slate-600 mb-8 text-center max-w-md">
        Виникла помилка. Спробуйте оновити сторінку або перейти на іншу сторінку.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 btn btn-primary rounded-xl"
        >
          Спробувати знову
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300 transition-all border-2 border-slate-200"
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
        <Link
          href="/kik"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
        >
          <Heart className="w-4 h-4" />
          Кік-вдома
        </Link>
      </div>
    </div>
  );
}
