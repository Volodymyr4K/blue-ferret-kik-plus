'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

import games from '@/data/games';

const GAMES_DROPDOWN = [
  { href: '/igry', label: 'Всі ігри' },
  ...games.map((g) => ({ href: `/igry/${g.slug}`, label: g.name })),
];

const KIK_DROPDOWN = [
  { href: '/kik', label: 'KIK' },
  { href: '/kik/pro-kik', label: 'Про КІК' },
  { href: '/kik/proekty', label: 'Проєкти' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [kikOpen, setKikOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isGamePage = pathname.startsWith('/igry/') && pathname !== '/igry';
  const isPublisherPage = !isGamePage;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isGamePage
          ? 'bg-[#0a0f1a]/98 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)]'
          : 'bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_20px_-8px_rgba(0,0,0,0.08)]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[3.75rem] sm:h-[4rem]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Logo variant="full" light={isGamePage} />
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isGamePage
                  ? pathname === '/' ? 'text-white bg-white/15 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/10'
                  : pathname === '/' ? 'text-[var(--bf-accent)] bg-[var(--bf-accent)]/10 font-semibold' : 'text-slate-600 hover:text-[var(--bf-accent)] hover:bg-[var(--bf-accent)]/5'
              }`}
            >
              {pathname === '/' && (isGamePage ? <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-[var(--bf-accent)]/60" /> : <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-[var(--bf-accent)]" />)}
              Головна
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setGamesOpen(true)}
              onMouseLeave={() => setGamesOpen(false)}
            >
              <button
                className={`relative flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isGamePage
                    ? pathname.startsWith('/igry') ? 'text-white bg-white/15 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/10'
                    : pathname.startsWith('/igry') ? 'text-[var(--bf-accent)] bg-[var(--bf-accent)]/10 font-semibold' : 'text-slate-600 hover:text-[var(--bf-accent)] hover:bg-[var(--bf-accent)]/5'
                }`}
              >
                {pathname.startsWith('/igry') && (isGamePage ? <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-[var(--bf-accent)]/60" /> : <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-[var(--bf-accent)]" />)}
                Наші ігри
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${gamesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {gamesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 py-2.5 w-56 bg-slate-900/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] border border-[var(--bf-accent)]/20"
                  >
                    {GAMES_DROPDOWN.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-[var(--bf-accent)]/20 hover:text-white transition-all duration-200 rounded-lg mx-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/kontakty"
              className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isGamePage
                  ? pathname === '/kontakty' ? 'text-white bg-white/15 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/10'
                  : pathname === '/kontakty' ? 'text-[var(--bf-accent)] bg-[var(--bf-accent)]/10 font-semibold' : 'text-slate-600 hover:text-[var(--bf-accent)] hover:bg-[var(--bf-accent)]/5'
              }`}
            >
              {pathname === '/kontakty' && (isGamePage ? <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-[var(--bf-accent)]/60 rounded-full" /> : <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-[var(--bf-accent)] rounded-full" />)}
              Контакти
            </Link>

            <div
              className={`relative ml-4 pl-4 border-l ${isGamePage ? 'border-white/20' : 'border-slate-200'}`}
              onMouseEnter={() => setKikOpen(true)}
              onMouseLeave={() => setKikOpen(false)}
            >
              <button
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  isGamePage
                    ? pathname.startsWith('/kik')
                      ? 'border-[var(--kik-accent)]/60 bg-[var(--kik-accent)]/20 text-[var(--kik-accent)] font-semibold'
                      : 'border-white/20 bg-white/5 text-slate-400 hover:border-[var(--kik-accent)]/50 hover:bg-[var(--kik-accent)]/15 hover:text-[var(--kik-accent)]'
                    : pathname.startsWith('/kik')
                      ? 'border-[var(--bf-accent)]/50 bg-[var(--bf-accent)]/10 text-[var(--bf-accent)] font-semibold'
                      : 'border-[var(--bf-accent)]/30 bg-[var(--bf-accent)]/5 text-slate-600 hover:border-[var(--bf-accent)]/50 hover:bg-[var(--bf-accent)]/10 hover:text-[var(--bf-accent)]'
                }`}
              >
                <span className="font-bold text-bf">K</span>
                <span className="font-bold text-kik">IK</span>
                <span className={isGamePage ? 'text-slate-400' : 'text-slate-600'}>-вдома</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${kikOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {kikOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 py-2.5 w-48 bg-slate-900/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] border border-[var(--kik-accent)]/20"
                  >
                    {KIK_DROPDOWN.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-[var(--kik-accent)]/20 hover:text-[var(--kik-accent)] transition-all duration-200 rounded-lg mx-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-3 -mr-2 rounded-xl transition-colors duration-200 ${isGamePage ? 'hover:bg-white/10 active:bg-white/20' : 'hover:bg-slate-100 active:bg-slate-200'}`}
            aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            {mobileOpen ? <X className={`w-6 h-6 ${isGamePage ? 'text-white' : 'text-slate-800'}`} /> : <Menu className={`w-6 h-6 ${isGamePage ? 'text-white' : 'text-slate-800'}`} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={`md:hidden overflow-hidden border-t ${isGamePage ? 'border-white/20 bg-slate-900/98' : 'border-slate-200 bg-white/98'} backdrop-blur-xl`}
            >
              <div className="py-4 space-y-0.5">
                <Link href="/" onClick={() => setMobileOpen(false)} className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${isGamePage ? (pathname === '/' ? 'text-white bg-white/15' : 'text-slate-300 hover:bg-white/10') : (pathname === '/' ? 'text-[var(--bf-accent)] bg-[var(--bf-accent)]/10' : 'text-slate-600 hover:bg-[var(--bf-accent)]/5 hover:text-[var(--bf-accent)]')}`}>Головна</Link>
                <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isGamePage ? 'text-slate-500' : 'text-slate-500'}`}>Наші ігри</div>
                {GAMES_DROPDOWN.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block py-2.5 px-6 rounded-xl transition-colors ${isGamePage ? 'text-slate-300 hover:bg-white/10 hover:text-[var(--bf-accent)]' : 'text-slate-600 hover:bg-[var(--bf-accent)]/5 hover:text-[var(--bf-accent)]'}`}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/kontakty" onClick={() => setMobileOpen(false)} className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${isGamePage ? (pathname === '/kontakty' ? 'text-white bg-white/15' : 'text-slate-300 hover:bg-white/10') : (pathname === '/kontakty' ? 'text-[var(--bf-accent)] bg-[var(--bf-accent)]/10' : 'text-slate-600 hover:bg-[var(--bf-accent)]/5 hover:text-[var(--bf-accent)]')}`}>Контакти</Link>
                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Кік-вдома</div>
                {KIK_DROPDOWN.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`block py-2.5 px-6 rounded-xl transition-colors ${isGamePage ? 'text-slate-300 hover:bg-white/10 hover:text-[var(--kik-accent)]' : 'text-slate-600 hover:bg-[var(--bf-accent)]/5 hover:text-[var(--bf-accent)]'}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
