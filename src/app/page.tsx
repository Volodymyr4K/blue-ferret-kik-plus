'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import LogoIcon from '@/components/LogoIcon';
import { useRef } from 'react';
import { Gamepad2, Heart, ArrowRight, Sparkles, Award, Palette, Shield, CheckCircle2, Quote } from 'lucide-react';
import siteContent from '@/data/site-content';
import { HeroDecorationsLight } from '@/components/DecorativeShapes';
import uiContent from '@/data/ui-content';

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const { brand, about, values, approach, cta, pillars, testimonial } = siteContent;

  return (
    <div className="relative">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex flex-col overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/55 to-emerald-50/35 pointer-events-none" />
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-grain opacity-45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(0,159,227,0.12)_0%,transparent_55%)] pointer-events-none" />
        <HeroDecorationsLight />

        <motion.div style={{ y, opacity, scale }} className="relative flex-1 flex flex-col items-center justify-center z-10 px-4 sm:px-6">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--bf-accent)] text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-7 sm:mb-10 text-center"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 text-center tracking-tight leading-[1.1] mb-6 sm:mb-8 max-w-4xl"
          >
            {brand.heroSubtitle}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-slate-600 text-base sm:text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-6 sm:mb-8"
          >
            {brand.heroDescription}
          </motion.p>

          {/* Brand words */}
          {brand.brandWords && brand.brandWords.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center justify-center gap-2.5 mb-9 sm:mb-12"
            >
              {brand.brandWords.map((word) => (
                <span
                  key={word}
                  className="inline-flex items-center px-3.5 py-2 rounded-xl border border-slate-200 bg-white/92 text-slate-600 text-xs sm:text-sm font-semibold"
                >
                  {word}
                </span>
              ))}
            </motion.div>
          )}

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto justify-center"
          >
            <Link
              href="/igry/"
              className="group inline-flex w-full sm:w-auto max-w-xs mx-auto items-center justify-center gap-2 px-8 sm:px-10 py-4 text-sm font-bold bg-[var(--bf-accent)] hover:bg-[var(--bf-accent-hover)] text-white rounded-full transition-colors shadow-[0_14px_30px_-18px_rgba(0,159,227,0.7)]"
            >
              <Gamepad2 className="w-5 h-5" />
              {uiContent.home.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/kik/"
              className="group inline-flex w-full sm:w-auto max-w-xs mx-auto items-center justify-center gap-2 px-8 sm:px-10 py-4 text-sm font-bold border-2 border-slate-200 text-slate-700 bg-white rounded-full hover:border-[var(--bf-accent)] hover:text-[var(--bf-accent)] transition-colors"
            >
              {uiContent.home.ctaSecondary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Перехід hero → секція */}
      <div className="relative -mt-1 h-2 bg-gradient-to-b from-blue-50/80 via-[var(--bf-accent)]/20 to-transparent" />

      {/* Хто ми — світла стилістика видавництва */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="absolute inset-0 bg-dots opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,159,227,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 overflow-hidden pointer-events-none">
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
            <p className="text-4xl sm:text-5xl md:text-6xl text-slate-800 mb-4 tracking-tight">
              {about.title}
            </p>
            <h2 className="text-lg sm:text-2xl text-[var(--bf-accent)] mb-10">{about.subtitle}</h2>
            <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[var(--bf-accent)]/18 shadow-[0_18px_35px_-28px_rgba(0,159,227,0.3)]">
              <p className="text-lg sm:text-2xl text-slate-600 leading-[1.85] max-w-3xl mx-auto font-medium">
                {about.intro}
              </p>
            </div>
          </motion.div>

          {/* Feature pillars — світлі картки */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {(pillars ?? [
              {
                title: uiContent.home.fallbackPillars[0].title,
                description: about.paragraph3 || uiContent.home.fallbackPillars[0].description,
                href: uiContent.home.fallbackPillars[0].href,
                icon: uiContent.home.fallbackPillars[0].icon,
              },
              {
                title: uiContent.home.fallbackPillars[1].title,
                description: about.paragraph2 || uiContent.home.fallbackPillars[1].description,
                href: uiContent.home.fallbackPillars[1].href,
                icon: uiContent.home.fallbackPillars[1].icon,
              },
              {
                title: uiContent.home.fallbackPillars[2].title,
                description: uiContent.home.fallbackPillars[2].description,
                href: uiContent.home.fallbackPillars[2].href,
                icon: uiContent.home.fallbackPillars[2].icon,
              },
            ]).map((pillar, i) => {
              const Icon = pillar.icon === 'heart' ? Heart : pillar.icon === 'gamepad' ? Gamepad2 : Sparkles;
              return (
                <Link key={i} href={pillar.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                    className="h-full p-8 sm:p-9 rounded-2xl border-2 transition-all duration-300 group overflow-hidden bg-white border-[var(--bf-accent)]/15 hover:border-[var(--bf-accent)]/40 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_22px_42px_-26px_rgba(0,159,227,0.35)]"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border group-hover:scale-105 transition-transform duration-300 bg-[var(--bf-accent)]/20 border-[var(--bf-accent)]/30">
                      <Icon className="w-7 h-7 text-[var(--bf-accent)]" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-[1.8] mb-4">{pillar.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--bf-accent)]">
                      {uiContent.home.pillarMore}
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
                <p className="text-xl sm:text-2xl text-slate-600 leading-[1.8] max-w-3xl mx-auto text-center relative z-10">
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
        <div className="absolute inset-0 bg-dots opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(0,159,227,0.06)_0%,transparent_50%)] pointer-events-none" />
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
            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto">{uiContent.home.valuesSubtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
                className="group relative p-8 sm:p-9 rounded-2xl bg-white border-2 border-[var(--bf-accent)]/20 hover:border-[var(--bf-accent)]/45 transition-all duration-300 shadow-[0_12px_26px_-22px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_22px_40px_-26px_rgba(0,159,227,0.3)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--bf-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-16 h-16 rounded-2xl bg-[var(--bf-accent-muted)] flex items-center justify-center mb-6 border border-[var(--bf-accent)]/25 group-hover:scale-105 transition-all duration-300">
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
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(75,178,114,0.06)_0%,transparent_60%)] pointer-events-none" />
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
                className="flex items-start gap-5 p-8 sm:p-9 rounded-2xl bg-slate-50/90 border-2 border-slate-200/80 hover:border-[var(--kik-accent)]/45 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] hover:-translate-y-1 hover:shadow-[0_20px_42px_-25px_rgba(75,178,114,0.35)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--kik-accent-muted)] flex items-center justify-center flex-shrink-0 border border-[var(--kik-accent)]/30 group-hover:scale-105 transition-transform">
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
        <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_20%_50%,rgba(0,159,227,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(75,178,114,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            <Link
              href="/igry/"
              className="group block p-8 sm:p-9 rounded-3xl bg-white border-2 border-slate-200/80 hover:border-[var(--bf-accent)]/45 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.3)] hover:-translate-y-1 hover:shadow-[0_24px_45px_-26px_rgba(0,159,227,0.3)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--bf-accent-muted)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-7 h-7 text-[var(--bf-accent)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 group-hover:text-[var(--bf-accent)] transition-colors">
                {uiContent.home.previewGamesTitle}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {uiContent.home.previewGamesDescription}
              </p>
              <span className="inline-flex items-center gap-2 text-[var(--bf-accent)] font-semibold group-hover:gap-3 transition-all">
                {uiContent.home.previewGamesAction}
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/kik/"
              className="group block p-8 sm:p-9 rounded-3xl bg-white border-2 border-slate-200/80 hover:border-[var(--kik-accent)]/45 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.3)] hover:-translate-y-1 hover:shadow-[0_24px_45px_-26px_rgba(75,178,114,0.3)] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--kik-accent-muted)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Heart className="w-7 h-7 text-[var(--kik-accent)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 group-hover:text-[var(--kik-accent)] transition-colors">
                {uiContent.home.previewKikTitle}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {uiContent.home.previewKikDescription}
              </p>
              <span className="inline-flex items-center gap-2 text-[var(--kik-accent)] font-semibold group-hover:gap-3 transition-all">
                {uiContent.home.previewKikAction}
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
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(0,159,227,0.12)_0%,transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center z-10 pointer-events-auto"
        >
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 mb-5 sm:mb-8 tracking-tight leading-[0.98]">
            {cta?.title ?? uiContent.home.fallbackCta.title}
          </p>
          <h2 className="text-lg sm:text-2xl md:text-3xl text-[var(--bf-accent)] mb-4">
            {cta?.subtitle ?? uiContent.home.fallbackCta.subtitle}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto">
            {cta?.description ?? uiContent.home.fallbackCta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
            <Link
              href="/igry/"
              prefetch={false}
              className="group relative z-20 inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[var(--bf-accent)] text-white font-bold text-base sm:text-lg rounded-2xl hover:bg-[var(--bf-accent-hover)] transition-colors shadow-[0_14px_30px_-18px_rgba(0,159,227,0.5)] touch-target"
            >
              <Gamepad2 className="w-6 h-6" />
              {uiContent.home.ctaPrimaryLarge}
            </Link>
            <Link
              href="/kik/"
              prefetch={false}
              className="group relative z-20 inline-flex w-full max-w-xs sm:w-auto items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-white text-[var(--bf-accent)] font-bold text-base sm:text-lg rounded-2xl border-2 border-[var(--bf-accent)]/50 hover:bg-[var(--bf-accent-muted)] hover:border-[var(--bf-accent)] transition-colors touch-target shadow-[0_12px_24px_-18px_rgba(15,23,42,0.35)]"
            >
              <Heart className="w-6 h-6" />
              {uiContent.home.ctaSecondaryLarge}
            </Link>
            <Link
              href="/kontakty/"
              className="group inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-4 sm:py-6 text-slate-600 font-semibold hover:text-[var(--bf-accent)] transition-all text-base sm:text-lg"
            >
              {uiContent.home.ctaTertiary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
