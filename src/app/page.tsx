'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import LogoIcon from '@/components/LogoIcon';
import { useRef } from 'react';
import { Gamepad2, Heart, ArrowRight, Sparkles, Award, Palette, Shield, CheckCircle2, Quote } from 'lucide-react';
import siteContent from '@/data/site-content';
import SectionHeader from '@/components/SectionHeader';
import { HeroDecorationsLight } from '@/components/DecorativeShapes';
import { StaggeredLetters } from '@/components/AnimatedText';

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const { brand, about, values, approach, cta, pillars, testimonial } = siteContent;

  return (
    <div className="relative">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex flex-col overflow-hidden bg-white"
      >
        <motion.div style={{ y, opacity, scale }} className="relative flex-1 flex flex-col items-center justify-center z-10 px-4 sm:px-6">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--bf-accent)] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-8 sm:mb-12"
          >
            {brand.tagline}
          </motion.p>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mb-8 sm:mb-12"
          >
            <LogoIcon size={240} className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 text-center tracking-tight leading-[1.1] mb-8 sm:mb-10 max-w-4xl"
          >
            {brand.heroSubtitle}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-slate-500 text-base sm:text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-6 sm:mb-8"
          >
            {brand.heroDescription}
          </motion.p>

          {/* Brand words */}
          {brand.brandWords && brand.brandWords.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="text-slate-400 text-sm sm:text-base mb-10 sm:mb-14"
            >
              {brand.brandWords.join(' · ')}
            </motion.p>
          )}

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/igry"
              className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 text-sm font-bold bg-[var(--bf-accent)] hover:bg-[var(--bf-accent-hover)] text-white rounded-full hover:scale-[1.03] transition-all duration-300 shadow-lg"
            >
              <Gamepad2 className="w-5 h-5" />
              Наші ігри
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/kik"
              className="group inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 text-sm font-bold border-2 border-slate-200 text-slate-700 bg-white rounded-full hover:border-[var(--bf-accent)] hover:text-[var(--bf-accent)] hover:scale-[1.03] transition-all duration-300"
            >
              КІК вдома
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Перехід hero → секція */}
      <div className="relative -mt-1 h-2 bg-gradient-to-b from-blue-50/80 via-[var(--bf-accent)]/20 to-transparent" />

      {/* Хто ми — світла стилістика видавництва */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,159,227,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="h-1 bg-gradient-to-r from-[var(--bf-accent)] to-[var(--bf-accent)]/60 rounded-full origin-left"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="text-center mb-20"
          >
            <p className="text-5xl sm:text-6xl md:text-7xl text-slate-800 mb-4 tracking-tight">
              {about.title}
            </p>
            <h2 className="italic text-xl sm:text-2xl text-[var(--bf-accent)] mb-12">{about.subtitle}</h2>
            <div className="p-10 sm:p-14 rounded-3xl bg-white border-2 border-[var(--bf-accent)]/20 shadow-[0_8px_40px_-15px_rgba(0,159,227,0.15)]">
              <p className="text-xl sm:text-2xl text-slate-600 leading-[1.9] max-w-3xl mx-auto font-medium">
                {about.intro}
              </p>
            </div>
          </motion.div>

          {/* Feature pillars — світлі картки */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(pillars ?? [
              { title: 'Створюйте світи', description: about.paragraph3, href: '/igry', icon: 'sparkles' },
              { title: 'Відкривайте ігри', description: about.paragraph2, href: '/igry', icon: 'gamepad' },
              { title: 'Об\'єднуйте гравців', description: 'KIK вдома — платформа підтримки авторських проєктів.', href: '/kik', icon: 'heart' },
            ]).map((pillar, i) => {
              const Icon = pillar.icon === 'heart' ? Heart : pillar.icon === 'gamepad' ? Gamepad2 : Sparkles;
              const isKik = pillar.icon === 'heart';
              return (
                <Link key={i} href={pillar.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                    className={`h-full p-8 sm:p-10 rounded-2xl border-2 transition-all duration-500 group card-shimmer overflow-hidden bg-white ${
                      isKik
                        ? 'border-[var(--bf-accent)]/15 hover:border-[var(--bf-accent)]/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-15px_rgba(0,159,227,0.2)]'
                        : 'border-[var(--bf-accent)]/15 hover:border-[var(--bf-accent)]/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-15px_rgba(0,159,227,0.2)]'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border group-hover:scale-110 transition-transform duration-300 ${
                      isKik ? 'bg-[var(--bf-accent)]/20 border-[var(--bf-accent)]/30' : 'bg-[var(--bf-accent)]/20 border-[var(--bf-accent)]/30'
                    }`}>
                      <Icon className="w-7 h-7 text-[var(--bf-accent)]" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl mb-4 group-hover:scale-[1.02] transition-transform">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-[1.8] mb-4">{pillar.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--bf-accent)]">
                      Детальніше
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {testimonial && testimonial.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <div className="p-10 sm:p-14 rounded-3xl bg-white border-2 border-[var(--bf-accent)]/15 relative overflow-hidden shadow-[0_8px_40px_-15px_rgba(0,0,0,0.06)]">
                <Quote className="absolute top-8 left-8 w-12 h-12 text-[var(--bf-accent)]/20" />
                <p className="text-xl sm:text-2xl text-slate-600 leading-[1.8] max-w-3xl mx-auto text-center italic relative z-10">
                  &ldquo;{testimonial[0].quote}&rdquo;
                </p>
                <p className="text-slate-500 text-center mt-6 font-medium">
                  — {testimonial[0].author}
                  {testimonial[0].role && <span className="text-slate-600">, {testimonial[0].role}</span>}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Цінності — світла стилістика */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(0,159,227,0.06)_0%,transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-4xl sm:text-5xl md:text-6xl text-slate-800 mb-3 tracking-tight">
              {values.title}
            </p>
            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto">Принципи, якими ми керуємося при створенні кожної гри</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
                className="group relative p-8 sm:p-10 rounded-2xl bg-white border-2 border-[var(--bf-accent)]/20 hover:border-[var(--bf-accent)]/50 transition-all duration-500 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-15px_rgba(0,159,227,0.2)] overflow-hidden card-shimmer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bf-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative w-16 h-16 rounded-2xl bg-[var(--bf-accent-muted)] flex items-center justify-center mb-6 border border-[var(--bf-accent)]/25 group-hover:scale-110 transition-all duration-400">
                  {i === 0 && <Sparkles className="w-8 h-8 text-[var(--bf-accent)]" />}
                  {i === 1 && <Award className="w-8 h-8 text-[var(--bf-accent)]" />}
                  {i === 2 && <Palette className="w-8 h-8 text-[var(--bf-accent)]" />}
                  {i === 3 && <Shield className="w-8 h-8 text-[var(--bf-accent)]" />}
                </div>
                <h3 className="relative font-bold text-slate-800 text-xl sm:text-2xl mb-4">{item.title}</h3>
                <p className="relative text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Перехід */}
      <div className="h-24 bg-gradient-to-b from-blue-50/30 via-white to-white" />

      {/* Наш підхід — світла контрастна секція */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(75,178,114,0.06)_0%,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl text-slate-800 mb-16 text-center tracking-tight"
          >
            {approach.title}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {approach.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="flex items-start gap-5 p-8 sm:p-10 rounded-2xl bg-slate-50/90 border-2 border-slate-200/80 hover:border-[var(--kik-accent)]/50 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_60px_-20px_rgba(75,178,114,0.25)] transition-all duration-500 card-shimmer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--kik-accent-muted)] flex items-center justify-center flex-shrink-0 border border-[var(--kik-accent)]/30 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-[var(--kik-accent)]" />
                </div>
                <p className="text-slate-700 text-lg leading-relaxed pt-1">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Превʼю KIK та ігор */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_20%_50%,rgba(0,159,227,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(75,178,114,0.08)_0%,transparent_50%)]" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            <Link
              href="/igry"
              className="group block p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-sm border-2 border-slate-200/80 hover:border-[var(--bf-accent)]/50 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_28px_60px_-20px_rgba(0,159,227,0.3)] transition-all duration-500 card-shimmer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--bf-accent-muted)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-7 h-7 text-[var(--bf-accent)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 group-hover:text-[var(--bf-accent)] transition-colors">
                Наші ігри
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Каталог настільних ігор Blue Ferret. Кожна гра — окремий світ з власним характером та атмосферою.
              </p>
              <span className="inline-flex items-center gap-2 text-[var(--bf-accent)] font-semibold group-hover:gap-3 transition-all">
                Переглянути
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/kik"
              className="group block p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-sm border-2 border-slate-200/80 hover:border-[var(--kik-accent)]/50 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_28px_60px_-20px_rgba(75,178,114,0.3)] transition-all duration-500 card-shimmer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--kik-accent-muted)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-[var(--kik-accent)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 group-hover:text-[var(--kik-accent)] transition-colors">
                KIK вдома
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Платформа підтримки авторських проєктів. Підтримуйте цікаві ігри та станьте частиною їхньої історії.
              </p>
              <span className="inline-flex items-center gap-2 text-[var(--kik-accent)] font-semibold group-hover:gap-3 transition-all">
                Дізнатися більше
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative py-6">
        <div className="section-connector" />
      </div>

      {/* CTA — світла стилістика видавництва */}
      <section className="relative py-24 sm:py-40 lg:py-48 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(0,159,227,0.12)_0%,transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center z-10"
        >
          <p className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-800 mb-5 sm:mb-8 tracking-tight leading-[0.95]">
            {cta?.title ?? 'Готові відкрити новий світ?'}
          </p>
          <h2 className="italic text-xl sm:text-3xl md:text-4xl text-[var(--bf-accent)] mb-4">
            {cta?.subtitle ?? 'Відкрийте світ настільних ігор'}
          </h2>
          <p className="text-slate-600 text-base sm:text-xl mb-10 sm:mb-14 max-w-xl mx-auto">
            {cta?.description ?? 'Досліджуйте наші ігри, підтримуйте авторські проєкти на KIK вдома — або просто напишіть нам.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
            <Link
              href="/igry"
              className="group btn-wow btn-cta-pulse inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-3 px-8 sm:px-14 lg:px-16 py-4 sm:py-6 sm:py-7 bg-[var(--bf-accent)] text-white font-bold text-base sm:text-lg rounded-2xl hover:bg-[var(--bf-accent-hover)] transition-all duration-500 shadow-[0_8px_40px_-15px_rgba(0,159,227,0.4)] hover:shadow-[0_12px_50px_-15px_rgba(0,159,227,0.5)] hover:scale-[1.04] touch-target border-2 border-[var(--bf-accent)]/30"
            >
              <Gamepad2 className="w-6 h-6" />
              Переглянути ігри
            </Link>
            <Link
              href="/kik"
              className="group btn-wow inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-3 px-8 sm:px-14 lg:px-16 py-4 sm:py-6 sm:py-7 bg-white text-[var(--bf-accent)] font-bold text-base sm:text-lg rounded-2xl border-2 border-[var(--bf-accent)]/50 hover:bg-[var(--bf-accent-muted)] hover:border-[var(--bf-accent)] transition-all duration-500 hover:scale-[1.04] touch-target shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
            >
              <Heart className="w-6 h-6" />
              Кік-вдома
            </Link>
            <Link
              href="/kontakty"
              className="group inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-4 sm:py-6 text-slate-600 font-semibold hover:text-[var(--bf-accent)] transition-all text-base sm:text-lg"
            >
              Контакти
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
