import Link from 'next/link';
import { Instagram, Facebook, Send, Mail, Gamepad2, Heart } from 'lucide-react';
import Logo from './Logo';
import siteContent from '@/data/site-content';

export default function Footer() {
  const { brand, contacts } = siteContent;
  return (
    <footer className="relative overflow-hidden">
      {/* Верхня градієнтна лінія — яскравіша */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[var(--bf-accent)]/80 via-25% via-[var(--kik-accent)]/70 via-50% via-[var(--warm-amber)]/60 via-75% to-transparent shadow-[0_0_40px_-8px_rgba(0,159,227,0.4)]" />

      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        {/* Декоративні елементи — більше глибини */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--bf-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--kik-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#14b8a6]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(0,159,227,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-dots opacity-20" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
            {/* Лого + опис */}
            <div className="md:col-span-5 lg:col-span-5">
              <Logo variant="icon" size="sm" className="inline-block mb-6 transition-transform hover:scale-105 duration-300" />
              <h3 className="font-bold text-white text-2xl mb-4 tracking-tight">
                Blue Ferret
              </h3>
              <p className="text-slate-400 leading-[1.7] text-[15px] max-w-sm">
                {brand.description}
              </p>
            </div>

            {/* Навігація */}
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="font-bold text-white text-xs mb-6 uppercase tracking-[0.2em] text-slate-400">
                Навігація
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-bf transition-all duration-300 text-[15px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-bf group-hover:scale-125 transition-all" />
                    Головна
                  </Link>
                </li>
                <li>
                  <Link href="/igry" className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-bf transition-all duration-300 text-[15px]">
                    <Gamepad2 className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    Наші ігри
                  </Link>
                </li>
                <li>
                  <Link href="/kik" className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-kik transition-all duration-300 text-[15px]">
                    <Heart className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    Кік-вдома
                  </Link>
                </li>
                <li>
                  <Link href="/kontakty" className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-[var(--teal-accent)] transition-all duration-300 text-[15px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-[var(--teal-accent)] group-hover:scale-125 transition-all" />
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>

            {/* Зв'язок */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="font-bold text-white text-xs mb-6 uppercase tracking-[0.2em] text-slate-400">
                Зв&apos;язок
              </h4>
              <a
                href={`mailto:${contacts.email}`}
                className="group inline-flex items-center gap-2.5 text-slate-400 hover:text-bf transition-all duration-300 mb-6 text-[15px]"
              >
                <Mail className="w-4 h-4" />
                {contacts.email}
              </a>
              <div className="flex gap-3">
                <a
                  href={contacts.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-800/90 hover:bg-bf hover:scale-110 hover:shadow-[0_0_25px_-5px_rgba(0,159,227,0.5)] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={contacts.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-800/90 hover:bg-kik hover:scale-110 hover:shadow-[0_0_25px_-5px_rgba(75,178,114,0.5)] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={contacts.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-800/90 hover:bg-[var(--teal-accent)] hover:scale-110 hover:shadow-[0_0_25px_-5px_rgba(20,184,166,0.5)] transition-all duration-300"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Нижня смуга */}
          <div className="mt-20 pt-10 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Blue Ferret. Всі права захищені.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
