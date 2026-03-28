'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Users, Shield, Sparkles, Leaf } from 'lucide-react';
import siteContent from '@/data/site-content';

const COMIC_PANELS = [
  { icon: MessageCircle, text: 'KIK — це зрозумілий спосіб підтримувати авторські ігри', color: 'from-[var(--kik-accent)]/20 to-emerald-100/50' },
  { icon: Users, text: 'Платформа, де збираються проєкти з різними історіями та цілями', color: 'from-blue-50 to-[var(--bf-accent)]/10' },
  { icon: Shield, text: 'Прозорість: статус, зібрана сума, оновлення — все на виду', color: 'from-[var(--kik-accent)]/15 to-teal-50/50' },
  { icon: Sparkles, text: 'Просто, зрозуміло, без зайвого шуму', color: 'from-amber-50/80 to-[var(--kik-accent)]/10' },
];

export default function ProKikPage() {
  const { kik } = siteContent;
  const proKik = kik.proKik ?? {
    intro: 'KIK вдома — це зрозумілий та свій спосіб підтримувати цікаві авторські настільні ігри.',
    story: 'Це окремий підпростір усередині Blue Ferret. Тут ми представляємо авторські проєкти настільних ігор, які потребують підтримки спільноти. Це не лише показ однієї гри — це платформа, де можна знайти різноманітні проєкти, побачити їхній статус, зібрану суму та оновлення.',
    benefit: 'Ми віримо, що кожен цікавий проєкт вартий уваги. KIK вдома — це спосіб зробити підтримку авторських ігор зручною та прозорою. Просто, зрозуміло, без зайвого шуму.',
    trust: 'Чому можна довіряти? Тому що ми самі — незалежне видавництво. Ми знаємо, як важлива прозорість на кожному етапі. Кожен проєкт має свою історію, ціль і відкритий статус.',
  };

  return (
    <div>
      <section className="py-14 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50/30" />
        <div className="absolute inset-0 bg-dots-kik opacity-20" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--kik-accent)]" />
            <div className="w-24 h-1 bg-[var(--kik-accent)] rounded-full" />
          </div>

          {/* Comic-style panels */}
          <motion.div
            className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {COMIC_PANELS.map((panel, i) => (
              <motion.div
                key={i}
                className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${panel.color} border-2 border-slate-200/60 flex items-start gap-3 sm:gap-4 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-12px_rgba(75,178,114,0.2)] transition-all duration-300`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 border border-[var(--kik-accent)]/30">
                  <panel.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--kik-accent)]" />
                </div>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed pt-1">{panel.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="max-w-3xl">
          <motion.h1
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Що таке KIK вдома?
          </motion.h1>

          <div className="space-y-10 sm:space-y-12">
            <motion.div
              className="border-l-4 border-[var(--kik-accent)] pl-6 sm:pl-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
            >
              <p className="text-slate-600 text-base sm:text-xl leading-relaxed">
                {proKik.intro}
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                Платформа авторських проєктів
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {proKik.story}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.3 }}
            >
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {proKik.benefit}
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[var(--kik-accent)]/20 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.15)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.35 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                Ви автор і хочете на платформу?
              </h3>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Заповніть{' '}
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf-XP51x8IYX1vMLZk_dy4ozM8TyAULU8-wXydJfkQGoaaszg/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--kik-accent)] underline decoration-[var(--kik-accent)]/60 underline-offset-4 hover:text-[var(--teal-accent)]"
                >
                  анкету автора
                </Link>, щоб ми змогли звʼязатися та оцінити ваш проєкт.
              </p>
              <div className="mt-4">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf-XP51x8IYX1vMLZk_dy4ozM8TyAULU8-wXydJfkQGoaaszg/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-3 rounded-xl bg-[var(--kik-accent)] text-white font-semibold hover:bg-[var(--teal-accent)] transition-colors"
                >
                  Заповнити анкету автора
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="bg-[var(--kik-accent)]/5 rounded-2xl p-6 sm:p-8 border border-[var(--kik-accent)]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, delay: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--kik-accent)] mb-4">
                Чому можна довіряти?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {proKik.trust}
              </p>
            </motion.div>
          </div>

          </div>

          <motion.div
            className="mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.5 }}
          >
            <Link
              href="/kik/proekty"
              className="inline-flex w-full sm:w-auto max-w-xs justify-center items-center gap-2 px-8 py-4 btn btn-primary-kik rounded-2xl"
            >
              Переглянути проєкти
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
