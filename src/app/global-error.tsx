'use client';

import { useEffect } from 'react';
import uiContent from '@/data/ui-content';

export default function GlobalError({
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
    <html lang="uk">
      <body className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">{uiContent.errors.globalErrorTitle}</h1>
        <p className="text-slate-600 mb-6 text-center max-w-md">
          {uiContent.errors.globalErrorDescription}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#009FE3] text-white font-semibold rounded-xl hover:bg-[#0077b3] transition-colors"
        >
          {uiContent.errors.tryAgain}
        </button>
      </body>
    </html>
  );
}
