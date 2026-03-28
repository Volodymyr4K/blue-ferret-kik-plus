'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, FolderKanban, ArrowRight, Leaf } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { KikDecorations } from '@/components/DecorativeShapes';
import KikLogo from '@/components/KikLogo';
import siteContent from '@/data/site-content';

export default function KikHomePage() {
  const { kik } = siteContent;
  return (
    <div>
      <section className="relative py-20 sm:py-32 lg:py-44 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-white to-blue-50/90 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-dots-kik opacity-90" />
        <div className="absolute inset-0 bg-grain" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,#4BB27225_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_90%_80%,#009FE315_0%,transparent_50%)]" />
        <KikDecorations />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 140, mass: 0.6, damping: 12 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full badge-gradient backdrop-blur-md border-2 border-[var(--kik-accent)]/40 shadow-wow mb-8 sm:mb-10 touch-target"
              whileHover={{ scale: 1.03 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Leaf className="w-4 sm:w-5 h-4 sm:h-5 text-[var(--kik-accent)]" />
              <span className="text-sm font-bold text-[var(--kik-accent)] tracking-wide">Платформа Blue Ferret</span>
            </motion.span>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="mb-8"
            >
              <KikLogo size="lg" variant="full" />
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 mb-5 sm:mb-8 px-2 tracking-tight">
              {kik.name}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 sm:mb-16 leading-[1.8] px-2">
              {kik.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.15, stiffness: 120, damping: 14 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
          >
            <Link
              href="/kik/proekty"
              className="group inline-flex w-full sm:w-auto max-w-sm mx-auto sm:mx-0 items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[var(--kik-accent)] to-[var(--teal-accent)] text-white font-bold rounded-2xl hover:from-[var(--teal-accent)] hover:to-[var(--kik-accent)] transition-all duration-500 shadow-[0_0_40px_-10px_rgba(75,178,114,0.5)] hover:shadow-[0_0_60px_-15px_rgba(75,178,114,0.6)] hover:scale-105"
            >
              <FolderKanban className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-6 transition-transform" />
              Проєкти
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kik/pro-kik"
              className="group inline-flex w-full sm:w-auto max-w-sm mx-auto sm:mx-0 items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-white text-slate-700 font-bold rounded-2xl border-2 border-[var(--kik-accent)]/50 hover:border-[var(--kik-accent)] hover:bg-gradient-to-br hover:from-[var(--kik-accent)]/10 hover:to-[var(--teal-accent)]/5 hover:text-[var(--kik-accent)] transition-all duration-500 shadow-wow hover:scale-105"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125" />
              Про КІК
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 110, damping: 14 }}
            className="mt-12 sm:mt-16"
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 sm:gap-8 items-center">
              <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-[var(--kik-accent)]/20 shadow-wow p-5 sm:p-8 text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--kik-accent)]/12 via-transparent to-[var(--teal-accent)]/12" />
                <div className="absolute -top-12 -left-16 w-40 h-40 bg-[var(--kik-accent)]/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
                    <KikLogo size="sm" variant="compact" className="drop-shadow-sm" />
                    <span className="px-3 py-1 rounded-full bg-[var(--kik-accent)]/10 text-[var(--kik-accent)] text-xs font-semibold border border-[var(--kik-accent)]/30">
                      Кольоровий знак
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-3">Комікс про KIK вдома</h3>
                  <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Додали авторський комікс про те, як працює платформа. Він допомагає пояснити ідею KIK вдома
                    за кілька кадрів і одразу задає дружню, кольорову атмосферу.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                      <Leaf className="w-4 h-4 text-[var(--kik-accent)]" />
                      Пояснює підтримку
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                      <Heart className="w-4 h-4 text-[var(--kik-accent)]" />
                      Теплий тон
                    </span>
                  </div>
                  <div className="mt-5">
                    <Link
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf-XP51x8IYX1vMLZk_dy4ozM8TyAULU8-wXydJfkQGoaaszg/viewform?usp=dialog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--kik-accent)] text-white text-sm font-semibold hover:bg-[var(--teal-accent)] transition-colors"
                    >
                      Анкета для авторів
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 110, damping: 12, delay: 0.25 }}
                className="relative"
              >
                <div className="relative w-full max-w-[560px] mx-auto aspect-[16/9] sm:aspect-[1200/407] rounded-3xl overflow-hidden border border-[var(--kik-accent)]/25 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.35)] bg-white/90">
                  <Image
                    src="/comic-kik.webp"
                    alt="Комікс KIK вдома"
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-contain"
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-kik opacity-30" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              label="Перегляньте проєкти ✦"
              title="Обирайте проєкти для підтримки"
              subtitle="Кожен проєкт має свою історію та ціль"
              labelVariant="accent"
              className="mb-8 sm:mb-12"
            />
          <Link
            href="/kik/proekty"
            className="inline-flex w-full sm:w-auto max-w-xs mx-auto items-center justify-center gap-2 px-8 sm:px-14 py-4 sm:py-5 bg-gradient-to-r from-[var(--kik-accent)] to-[var(--teal-accent)] text-white font-bold rounded-2xl hover:from-[var(--teal-accent)] hover:to-[var(--kik-accent)] transition-all duration-500 shadow-[0_0_40px_-10px_rgba(75,178,114,0.5)] hover:scale-105 touch-target"
          >
            Всі проєкти
            <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
          </Link>
        </motion.div>
        </div>
      </section>
    </div>
  );
}
