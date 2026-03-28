'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import games from '@/data/games';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

function GamesContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const searchParams = useSearchParams();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      const showId = setTimeout(() => setShowPaymentSuccess(true), 0);
      const hideId = setTimeout(() => setShowPaymentSuccess(false), 5000);
      return () => {
        clearTimeout(showId);
        clearTimeout(hideId);
      };
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-auto sm:max-w-xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-[var(--kik-accent)] text-white shadow-lg flex items-start sm:items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base leading-snug">
              Оплату успішно отримано! Дякуємо за замовлення.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-emerald-50/90 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-dots opacity-90" />
        <div className="absolute inset-0 bg-grain" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-10%,#009FE340_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_50%_at_80%_10%,#4BB27225_0%,transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full badge-gradient backdrop-blur-md border-2 border-[var(--bf-accent)]/35 shadow-wow mb-8 transition-smooth hover:border-[var(--kik-accent)]/50 hover:shadow-wow-hover"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-bf animate-sparkle" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Каталог ігор</span>
            </motion.div>
            <SectionHeader
              title="Світи для відкриття"
              subtitle="Для настільних гравців: кожна гра — окремий світ з власним характером, механікою та атмосферою. Досліджуйте наші проєкти та обирайте те, що резонує з вами."
              className="mb-0"
            />
          </motion.div>
        </div>
      </section>

      <section ref={sectionRef} className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 -mt-4 sm:-mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
            {games.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 80, damping: 15, delay: i * 0.08 }}
                className="h-full"
              >
                <Link
                  href={`/igry/${game.slug}`}
                  className="group block h-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden board-game-border card-perspective transition-all duration-500 card-shimmer bg-grain"
                >
                  <div
                    className="aspect-[4/3] relative overflow-hidden bg-slate-800"
                    style={{ backgroundColor: game.palette || '#283D57' }}
                  >
                    {game.heroImage && (
                      <img
                        src={game.heroImage}
                        alt={game.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
                    <div className="absolute inset-0 bg-[var(--bf-accent)]/0 group-hover:bg-[var(--bf-accent)]/10 transition-colors duration-500" />
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 w-[60%] -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 flex justify-between items-end gap-2">
                      <span className="board-game-badge inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/95 text-slate-700 text-xs sm:text-sm shadow-md backdrop-blur-sm border border-[var(--bf-accent)]/30">
                        {game.status === 'announcement' && 'Анонс'}
                        {game.status === 'production' && 'Виробництво'}
                        {game.status === 'preorder' && 'Передзамовлення'}
                        {game.status === 'onsale' && 'У продажі'}
                      </span>
                      <motion.span
                        className="p-2.5 sm:p-3 rounded-xl bg-white/95 backdrop-blur-sm border-2 border-white/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-bf" />
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7 lg:p-8 flex flex-col h-full">
                    <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold group-hover:text-[var(--bf-accent)] transition-colors duration-300 mb-3 sm:mb-4 tracking-tight text-slate-800">
                      {game.name}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-lg line-clamp-3 sm:line-clamp-2 leading-[1.7] mb-5 sm:mb-6">
                      {game.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[var(--bf-accent)] font-bold text-sm group-hover:gap-4 group-hover:text-[var(--teal-accent)] transition-all duration-300 mt-auto">
                      Детальніше
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Завантаження...</div>}>
      <GamesContent />
    </Suspense>
  );
}
