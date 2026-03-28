'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  HandHeart,
  Leaf,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import siteContent from '@/data/site-content';

const KEY_POINTS = [
  {
    icon: UsersRound,
    title: 'Спільнота навколо ідеї',
    text: 'Проєкти бачать реальні люди, які люблять настільні ігри та підтримують авторів.',
  },
  {
    icon: ShieldCheck,
    title: 'Прозорі етапи',
    text: 'Статуси, зібрана сума, оновлення та дати — все публічно і без зайвих складнощів.',
  },
  {
    icon: HandHeart,
    title: 'Людяна комунікація',
    text: 'Ми супроводжуємо авторів та пояснюємо кроки простою мовою, без формальностей.',
  },
  {
    icon: Sparkles,
    title: 'Фокус на настілках',
    text: 'KIK вдома створений саме для авторських ігор та їхнього якісного запуску.',
  },
];

const SUBMISSION_STEPS = [
  {
    title: 'Заповнюєте анкету',
    text: 'Коротко описуєте гру, стан підготовки та очікування від запуску.',
  },
  {
    title: 'Ми звʼязуємося з вами',
    text: 'Команда переглядає заявку та повертається з фідбеком і наступними кроками.',
  },
  {
    title: 'Готуємо запуск на платформі',
    text: 'Разом формуємо сторінку проєкту, візуали, етапи та механіку підтримки.',
  },
];

const AUTHOR_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf-XP51x8IYX1vMLZk_dy4ozM8TyAULU8-wXydJfkQGoaaszg/viewform?usp=dialog';

export default function ProKikPage() {
  const { kik } = siteContent;
  const proKik = kik.proKik ?? {
    intro: 'KIK вдома — це зрозумілий та свій спосіб підтримувати цікаві авторські настільні ігри.',
    story: 'Це окремий підпростір усередині Blue Ferret. Тут ми представляємо авторські проєкти настільних ігор, які потребують підтримки спільноти. Це не лише показ однієї гри — це платформа, де можна знайти різноманітні проєкти, побачити їхній статус, зібрану суму та оновлення.',
    benefit: 'Ми віримо, що кожен цікавий проєкт вартий уваги. KIK вдома — це спосіб зробити підтримку авторських ігор зручною та прозорою. Просто, зрозуміло, без зайвого шуму.',
    trust: 'Чому можна довіряти? Тому що ми самі — незалежне видавництво. Ми знаємо, як важлива прозорість на кожному етапі. Кожен проєкт має свою історію, ціль і відкритий статус.',
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-white to-blue-50/50" />
        <div className="absolute inset-0 bg-dots-kik opacity-40" />
        <div className="absolute inset-0 bg-grain opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_0%,#4BB27222_0%,transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 110, damping: 13 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--kik-accent)]/35 bg-white/85 text-[var(--kik-accent)] text-sm font-semibold mb-5">
                <Leaf className="w-4 h-4" />
                Про платформу KIK вдома
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
                Що таке KIK вдома?
              </h1>

              <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-6">
                {proKik.intro}
              </p>

              <div className="rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.45)]">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {proKik.story}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={AUTHOR_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-xl bg-[var(--kik-accent)] text-white font-semibold hover:bg-[var(--teal-accent)] transition-colors"
                >
                  Анкета для авторів
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kik/proekty"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-xl border border-[var(--kik-accent)]/35 bg-white text-slate-700 font-semibold hover:border-[var(--kik-accent)] hover:text-[var(--kik-accent)] transition-colors"
                >
                  Переглянути проєкти
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.1 }}
              className="rounded-3xl border border-[var(--kik-accent)]/25 bg-white/90 backdrop-blur-sm p-4 sm:p-5 shadow-[0_24px_90px_-45px_rgba(16,24,40,0.55)]"
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--kik-accent)]/10 border border-[var(--kik-accent)]/25 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo-kik-greenmark.webp"
                    alt="KIK зелений знак"
                    width={30}
                    height={30}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Комікс KIK вдома</p>
                  <p className="text-xs text-slate-500">Повний кольоровий кадр платформи</p>
                </div>
              </div>

              <div className="relative aspect-[1200/407] rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-inner">
                <Image
                  src="/comic-kik.webp"
                  alt="Комікс про KIK вдома"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-contain"
                />
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-2.5">
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                  <p className="text-xs text-slate-500 mb-1">Формат</p>
                  <p className="text-sm font-semibold text-slate-800">Авторські ігри</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                  <p className="text-xs text-slate-500 mb-1">Комунікація</p>
                  <p className="text-sm font-semibold text-slate-800">Пряма та жива</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                  <p className="text-xs text-slate-500 mb-1">Пріоритет</p>
                  <p className="text-sm font-semibold text-slate-800">Прозорий запуск</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Чому автори обирають KIK вдома
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              {proKik.benefit}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {KEY_POINTS.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.06, type: 'spring', stiffness: 120, damping: 14 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_14px_36px_-24px_rgba(15,23,42,0.32)]"
              >
                <div className="w-11 h-11 rounded-xl border border-[var(--kik-accent)]/30 bg-[var(--kik-accent)]/10 flex items-center justify-center mb-4">
                  <point.icon className="w-5 h-5 text-[var(--kik-accent)]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-[var(--kik-accent)]/20 bg-gradient-to-br from-white via-emerald-50/35 to-blue-50/30 p-6 sm:p-8 lg:p-10 shadow-[0_24px_64px_-40px_rgba(15,23,42,0.4)]">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-6 sm:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--kik-accent)]/30 bg-white/75 text-[var(--kik-accent)] text-xs font-semibold mb-4">
                <FileText className="w-3.5 h-3.5" />
                Простий процес
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                Як подати проєкт
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                {proKik.trust}
              </p>
              <Link
                href={AUTHOR_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Заповнити анкету автора
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="space-y-3">
              {SUBMISSION_STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 120, damping: 14 }}
                  className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 sm:p-5 flex gap-4 items-start"
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--kik-accent)] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-base sm:text-lg mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4 sm:p-5 flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-[var(--kik-accent)] mt-0.5 shrink-0" />
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Після подачі анкети ми повертаємося з відповіддю та допомагаємо довести запуск до готового вигляду.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
