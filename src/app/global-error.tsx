'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Критична помилка</h1>
        <p className="text-slate-600 mb-6 text-center max-w-md">
          Виникла непередбачена помилка. Спробуйте оновити сторінку.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#009FE3] text-white font-semibold rounded-xl hover:bg-[#0077b3] transition-colors"
        >
          Спробувати знову
        </button>
      </body>
    </html>
  );
}
