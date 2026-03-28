'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, FolderKanban, ArrowRight, Leaf, ShieldCheck, Clock3 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import KikLogo from '@/components/KikLogo';
import siteContent from '@/data/site-content';

const AUTHOR_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf-XP51x8IYX1vMLZk_dy4ozM8TyAULU8-wXydJfkQGoaaszg/viewform?usp=dialog';

const KIK_FACTS = [
  { icon: FolderKanban, text: 'Авторські проєкти' },
  { icon: ShieldCheck, text: 'Прозорі етапи' },
  { icon: Clock3, text: 'Регулярні оновлення' },
];

export default function KikHomePage() {
  const { kik } = siteContent;
  return (
    <div className="min-h-screen">
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white to-blue-50/55" />
        <div className="absolute inset-0 bg-dots-kik opacity-30" />
        <div className="absolute inset-0 bg-grain opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,#4BB27220_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_90%_80%,#009FE310_0%,transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 14 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full badge-gradient border border-[var(--kik-accent)]/35 shadow-sm mb-7 sm:mb-9">
              <Leaf className="w-4 h-4 text-[var(--kik-accent)]" />
              <span className="text-sm font-semibold text-[var(--kik-accent)]">Платформа Blue Ferret</span>
            </span>

            <div className="mb-8">
              <KikLogo size="lg" variant="full" />
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-5 sm:mb-7 tracking-tight">
              {kik.name}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto mb-7 sm:mb-9 leading-[1.75] px-2">
              {kik.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10">
              {KIK_FACTS.map((fact) => (
                <span
                  key={fact.text}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white/90 border border-slate-200/80 shadow-sm"
                >
                  <fact.icon className="w-4 h-4 text-[var(--kik-accent)]" />
                  {fact.text}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', delay: 0.1, stiffness: 120, damping: 14 }}
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center"
            >
              <Link
                href="/kik/proekty"
                className="group inline-flex w-full sm:w-auto max-w-sm mx-auto sm:mx-0 items-center justify-center gap-2.5 px-7 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[var(--kik-accent)] to-[var(--teal-accent)] text-white font-bold rounded-2xl hover:from-[var(--teal-accent)] hover:to-[var(--kik-accent)] transition-colors"
              >
                <FolderKanban className="w-5 h-5" />
                Проєкти
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/kik/pro-kik"
                className="group inline-flex w-full sm:w-auto max-w-sm mx-auto sm:mx-0 items-center justify-center gap-2.5 px-7 sm:px-10 py-3.5 sm:py-4 bg-white text-slate-700 font-bold rounded-2xl border border-[var(--kik-accent)]/45 hover:border-[var(--kik-accent)] hover:text-[var(--kik-accent)] transition-colors shadow-sm"
              >
                <Heart className="w-5 h-5" />
                Про КІК
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.15, stiffness: 110, damping: 14 }}
            className="mt-12 sm:mt-16"
          >
            <div className="grid lg:grid-cols-[1.03fr_0.97fr] gap-6 sm:gap-8 items-start">
              <div className="rounded-3xl bg-white/92 border border-[var(--kik-accent)]/20 p-5 sm:p-7 text-left shadow-[0_18px_38px_-28px_rgba(15,23,42,0.35)]">
                <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4">
                  <KikLogo size="sm" variant="compact" className="drop-shadow-sm" />
                  <span className="px-3 py-1 rounded-full bg-[var(--kik-accent)]/10 text-[var(--kik-accent)] text-xs font-semibold border border-[var(--kik-accent)]/30">
                    Кольоровий знак
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-3">Комікс про KIK вдома</h3>
                <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
                  Додали авторський комікс про те, як працює платформа. Він допомагає пояснити ідею KIK вдома за кілька кадрів та одразу задає дружню атмосферу.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5 text-xs sm:text-sm">
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
                    href={AUTHOR_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--kik-accent)] text-white text-sm font-semibold hover:bg-[var(--teal-accent)] transition-colors"
                  >
                    Анкета для авторів
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="relative w-full max-w-[560px] mx-auto aspect-[16/9] sm:aspect-[1200/407] rounded-3xl overflow-hidden border border-[var(--kik-accent)]/25 shadow-[0_22px_50px_-34px_rgba(15,23,42,0.45)] bg-white/92">
                <Image
                  src="/comic-kik.webp"
                  alt="Комікс KIK вдома"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-emerald-50/55 via-white to-blue-50/45 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-kik opacity-25" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              label="Перегляньте проєкти"
              title="Обирайте проєкти для підтримки"
              subtitle="Кожен проєкт має свою історію та ціль."
              className="mb-8 sm:mb-10"
            />
            <Link
              href="/kik/proekty"
              className="inline-flex w-full sm:w-auto max-w-xs mx-auto items-center justify-center gap-2 px-8 sm:px-12 py-4 bg-gradient-to-r from-[var(--kik-accent)] to-[var(--teal-accent)] text-white font-bold rounded-2xl hover:from-[var(--teal-accent)] hover:to-[var(--kik-accent)] transition-colors touch-target"
            >
              Всі проєкти
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
