import Link from 'next/link';
import LogoIcon from '@/components/LogoIcon';
import { Gamepad2, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="absolute inset-0 bg-grain" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(0,159,227,0.08)_0%,transparent_60%)]" />

      <div className="relative text-center max-w-xl mx-auto">
        <div className="mb-8 inline-flex">
          <LogoIcon size={80} className="opacity-90" />
        </div>
        <h1 className="text-8xl sm:text-9xl font-extrabold text-slate-200 mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Сторінку не знайдено
        </h2>
        <p className="text-slate-600 text-lg mb-10 max-w-md mx-auto">
          Можливо, сторінка переміщена або не існує. Поверніться на головну або перегляньте наші ігри.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#009FE3] text-white font-bold rounded-2xl hover:bg-[#0088c4] transition-all duration-300 shadow-[0_8px_30px_-10px_rgba(0,159,227,0.5)] hover:shadow-[0_12px_40px_-15px_rgba(0,159,227,0.6)] hover:scale-105"
          >
            <Home className="w-5 h-5" />
            На головну
          </Link>
          <Link
            href="/igry"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-200/80 hover:border-[#009FE3]/50 hover:text-[#009FE3] hover:bg-[#009FE3]/5 transition-all duration-300 shadow-card hover:shadow-card-hover"
          >
            <Gamepad2 className="w-5 h-5" />
            Наші ігри
          </Link>
        </div>
        <p className="mt-12 text-xl text-[#009FE3]/80">Місце, де мрії збуваються ✦</p>
      </div>
    </div>
  );
}
