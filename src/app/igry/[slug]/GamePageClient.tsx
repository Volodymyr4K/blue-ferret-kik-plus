'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ImagePlus,
  Users,
  Clock,
  Baby,
  Pen,
  ChevronDown,
  Anchor,
  Lock,
  LockOpen,
  Rocket,
  Target,
} from 'lucide-react';
import type { Game } from '@/data/games';
import RotatableBox from '@/components/RotatableBox';

const STAGE_ORDER = ['announcement', 'preorder', 'production', 'onsale'] as const;
type StageKey = (typeof STAGE_ORDER)[number];

/* ───── helpers ───── */

function SkeletonLines({ count = 3, maxWidth = 100 }: { count?: number; maxWidth?: number }) {
  return (
    <div className="space-y-3 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-full bg-white/8"
          style={{ width: `${maxWidth - i * 12}%` }}
        />
      ))}
    </div>
  );
}

/* Custom assets per game slug */
function getGameAssets(slug: string) {
  if (slug === 'trymaysia') {
    return {
      logo: '/images/trymaysia/logo-trymaysia.png',
      sectionTitle: '/images/trymaysia/pro-scho-gra.png',
      heroBackgroundVideoMp4: '/images/trymaysia/moryaky.mp4',
      heroBackgroundVideoWebm: '/images/trymaysia/moryaky.webm',
      heroBackgroundFallback: '/images/trymaysia/moryaky.gif',
      boxMockup: '/images/trymaysia/box-front-center-v8.webp',
      boxBack: '/images/trymaysia/box-front-bottom-v8.webp',
      boxTop: '/images/trymaysia/box-front-top-v8.webp',
      boxSideLeft: '/images/trymaysia/box-side-left-front-v8.webp',
      boxSideRight: '/images/trymaysia/box-side-right-front-v8.webp',
      arrow: '/images/trymaysia/arrow.png',
      aboutCharacters: [
        '/images/trymaysia/characters/char-2.png',
        '/images/trymaysia/characters/char-9.png',
        '/images/trymaysia/characters/char-4.png',
        '/images/trymaysia/characters/char-6.png',
      ],
      stageCharacters: [
        '/images/trymaysia/characters/char-3.png',
        '/images/trymaysia/characters/char-5.png',
        '/images/trymaysia/characters/char-7.png',
        '/images/trymaysia/characters/char-11.png',
      ],
    };
  }
  return null;
}

/* ───── main component ───── */

export default function GamePageClient({ game }: { game: Game }) {
  const palette = game.palette || '#283D57';
  const accent = game.accent || palette;
  const heroRef = useRef<HTMLElement>(null);
  const lockFeedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const assets = getGameAssets(game.slug);
  const [lockFeedbackStage, setLockFeedbackStage] = useState<StageKey | null>(null);
  const [expandedStage, setExpandedStage] = useState<StageKey | null>(() => {
    const firstActive = STAGE_ORDER.find((k) => game.stages[k]?.state === 'active');
    return firstActive || null;
  });

  const activeStages = STAGE_ORDER.filter(
    (k) => game.stages[k]?.state === 'active'
  ).length;
  const totalStages = STAGE_ORDER.filter(
    (k) => game.stages[k]?.state !== 'hidden'
  ).length;
  const progressPercent = Math.round((activeStages / totalStages) * 100);
  const highlights = game.slug === 'trymaysia'
    ? [
        { icon: Anchor, text: 'Морська атмосфера в кожній партії' },
        { icon: Rocket, text: 'Розробка рухається за планом' },
        { icon: Target, text: 'Команда тримає фокус на якості' },
      ]
    : [
        { icon: Rocket, text: 'Розробка рухається за планом' },
        { icon: Target, text: 'Команда тримає фокус на якості' },
      ];
  const stageBadgeLabels = {
    active: 'ЧЕРНЕТКА',
    locked: 'СКОРО',
    archived: 'Архів',
    hidden: 'Приховано',
  } as const;

  // Generate dark theme colors from palette
  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  const darken = (hex: string, factor: number) => {
    const { r, g, b } = hex2rgb(hex);
    const f = factor;
    return `rgb(${Math.round(r * f)},${Math.round(g * f)},${Math.round(b * f)})`;
  };

  // Theme colors derived from palette
  const bg1 = darken(palette, 0.18);  // darkest — page bg
  const bg2 = darken(palette, 0.22);  // sections alt
  const bg3 = darken(palette, 0.28);  // cards
  const border1 = darken(palette, 0.38); // card borders
  const border2 = darken(palette, 0.5);  // hover borders
  const borderActive = darken(palette, 0.55); // active stage border
  const paletteRgb = hex2rgb(palette);
  const accentRgb = hex2rgb(accent);
  const aboutCharacterClasses = [
    'hidden md:block absolute left-6 top-14 w-[11rem] xl:w-[12rem] 2xl:w-[13rem] -rotate-6',
    'hidden md:block absolute right-6 top-20 w-[9.5rem] xl:w-[10.5rem] 2xl:w-[11rem] rotate-6',
    'hidden md:block absolute left-10 bottom-10 w-[12rem] xl:w-[13rem] 2xl:w-[14rem] -rotate-2',
    'hidden md:block absolute right-10 bottom-4 w-[11rem] xl:w-[12rem] 2xl:w-[13rem] rotate-3',
  ];
  const stageCharacterClasses = [
    'hidden md:block absolute left-8 top-8 w-[9rem] xl:w-[10rem] -rotate-6',
    'hidden md:block absolute right-8 top-4 w-[10.5rem] xl:w-[12rem] rotate-6',
    'hidden md:block absolute left-12 bottom-14 w-[10rem] xl:w-[11rem] -rotate-3',
    'hidden md:block absolute right-10 bottom-8 w-[9.5rem] xl:w-[10.5rem] rotate-4',
  ];
  const accentIconStrong = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.68)`;
  const accentIconSoft = `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.55)`;
  const accentGradientStart = darken(accent, 0.72);
  const boxBg = `linear-gradient(180deg, ${darken(palette, 0.22)} 0%, ${darken(palette, 0.3)} 100%)`;
  const boxHighlight = `radial-gradient(circle at 50% 28%, rgba(255,255,255,0.1) 0%, transparent 55%)`;

  useEffect(() => {
    const root = document.documentElement;
    const vars = ['--bf-accent', '--bf-accent-hover', '--bf-accent-muted'] as const;
    const previous = vars.map((name) => [name, root.style.getPropertyValue(name)] as const);

    root.style.setProperty('--bf-accent', accent);
    root.style.setProperty('--bf-accent-hover', darken(accent, 0.78));
    root.style.setProperty(
      '--bf-accent-muted',
      `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.14)`
    );

    return () => {
      previous.forEach(([name, value]) => {
        if (value) {
          root.style.setProperty(name, value);
        } else {
          root.style.removeProperty(name);
        }
      });
    };
  }, [accent, accentRgb.b, accentRgb.g, accentRgb.r]);

  useEffect(() => {
    const firstActive = STAGE_ORDER.find((k) => game.stages[k]?.state === 'active');
    setExpandedStage(firstActive || null);
  }, [game.slug, game.stages]);

  useEffect(() => {
    return () => {
      if (lockFeedbackTimeoutRef.current) {
        clearTimeout(lockFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const triggerLockedFeedback = (stageKey: StageKey) => {
    setLockFeedbackStage(stageKey);
    if (lockFeedbackTimeoutRef.current) {
      clearTimeout(lockFeedbackTimeoutRef.current);
    }
    lockFeedbackTimeoutRef.current = setTimeout(() => {
      setLockFeedbackStage(null);
    }, 340);
  };

  const handleStageCardClick = (stageKey: StageKey, isLocked: boolean) => {
    if (isLocked) {
      triggerLockedFeedback(stageKey);
      return;
    }

    setExpandedStage((prev) => {
      if (prev === stageKey) return null;
      return stageKey;
    });
  };

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: bg1 }}>
      {/* ═══════ HERO ═══════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background — GIF or gradient */}
        {assets?.heroBackgroundVideoMp4 || assets?.heroBackgroundVideoWebm || assets?.heroBackgroundFallback ? (
          <>
            <div className="absolute inset-0">
              {assets?.heroBackgroundVideoMp4 || assets?.heroBackgroundVideoWebm ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={assets?.heroBackgroundFallback}
                  className="w-full h-full object-cover"
                >
                  {assets?.heroBackgroundVideoWebm && (
                    <source src={assets.heroBackgroundVideoWebm} type="video/webm" />
                  )}
                  {assets?.heroBackgroundVideoMp4 && (
                    <source src={assets.heroBackgroundVideoMp4} type="video/mp4" />
                  )}
                </video>
              ) : (
                <img
                  src={assets?.heroBackgroundFallback}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, rgba(${paletteRgb.r},${paletteRgb.g},${paletteRgb.b},0.32) 0%, rgba(${paletteRgb.r},${paletteRgb.g},${paletteRgb.b},0) 46%, rgba(${paletteRgb.r},${paletteRgb.g},${paletteRgb.b},0.62) 100%)`,
              }}
            />

            {/* Lightning effects */}
            <div className="absolute inset-0 pointer-events-none z-[5]">
              {/* Flash overlay */}
              <div className="absolute inset-0 bg-white/0 animate-lightning-flash" />

              {/* Lightning bolt 1 — left */}
              <svg
                className="absolute top-0 left-[15%] w-[80px] sm:w-[120px] h-[52%] sm:h-[60%] animate-lightning-bolt-1"
                viewBox="0 0 120 400"
                fill="none"
              >
                <path
                  d="M60 0 L70 80 L90 85 L55 200 L75 205 L40 400"
                  stroke="rgba(180,210,255,0.7)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
                <path
                  d="M60 0 L70 80 L90 85 L55 200 L75 205 L40 400"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Lightning bolt 2 — right */}
              <svg
                className="hidden sm:block absolute top-[5%] right-[20%] w-[100px] h-[50%] animate-lightning-bolt-2"
                viewBox="0 0 100 350"
                fill="none"
              >
                <path
                  d="M50 0 L55 60 L75 65 L35 180 L60 185 L30 350"
                  stroke="rgba(180,210,255,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#glow2)"
                />
                <path
                  d="M50 0 L55 60 L75 65 L35 180 L60 185 L30 350"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <defs>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Lightning bolt 3 — center-right, smaller */}
              <svg
                className="hidden md:block absolute top-[10%] right-[40%] w-[80px] h-[35%] animate-lightning-bolt-3"
                viewBox="0 0 80 250"
                fill="none"
              >
                <path
                  d="M40 0 L48 50 L65 55 L30 140 L50 145 L25 250"
                  stroke="rgba(180,210,255,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  filter="url(#glow3)"
                />
                <path
                  d="M40 0 L48 50 L65 55 L30 140 L50 145 L25 250"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
                <defs>
                  <filter id="glow3">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${palette} 0%, ${palette}dd 40%, ${bg1} 100%)`,
            }}
          />
        )}

        {/* Logo image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="relative z-10 px-4"
        >
          {assets?.logo ? (
            <img
              src={assets.logo}
              alt={game.name}
              className="w-[min(88vw,400px)] sm:w-[500px] md:w-[600px] lg:w-[700px] h-auto drop-shadow-2xl"
            />
          ) : (
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
                {game.name}
              </h1>
              {game.slogan && (
                <p className="text-xl sm:text-2xl text-white/70">{game.slogan}</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() =>
            document
              .getElementById('passport')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <span className="text-white/50 text-sm tracking-[0.2em] uppercase">
            Зануритися
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ ПАСПОРТ ПРИГОДИ ═══════ */}
      <section
        id="passport"
        className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6"
        style={{ backgroundColor: bg2 }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/30 mb-4">
              Про гру
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 mb-4">
              Паспорт пригоди
            </h2>
            <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto">
              Коротко про формат гри та поточний стан розробки, щоб одразу
              зрозуміти, чого чекати від «{game.name}».
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-[1fr_1fr] gap-5 sm:gap-6">
            {/* Left — passport stats 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  label: 'ГРАВЦІ',
                  value: game.passport?.players,
                  icon: Users,
                },
                {
                  label: 'ТРИВАЛІСТЬ',
                  value: game.passport?.duration,
                  icon: Clock,
                },
                { label: 'ВІК', value: game.passport?.age, icon: Baby },
                {
                  label: 'АВТОРКА',
                  value: game.passport?.author,
                  icon: Pen,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 sm:p-6 rounded-xl transition-colors" style={{ backgroundColor: bg3, border: `1px solid ${border1}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = border2)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = border1)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className="w-4 h-4" style={{ color: accentIconStrong }} />
                    <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/35">
                      {item.label}
                    </p>
                  </div>
                  {item.value ? (
                    <p className="text-white/85 font-semibold text-base">
                      {item.value}
                    </p>
                  ) : (
                    <div className="h-3 w-20 rounded-full bg-white/10" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right — project status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 sm:p-8 rounded-xl" style={{ backgroundColor: bg3, border: `1px solid ${border1}` }}
            >
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
                Стан проєкту
              </p>
              <h3 className="text-2xl font-bold text-white/90 mb-5">
                {game.status === 'announcement' && 'Анонс'}
                {game.status === 'production' && 'Виробництво'}
                {game.status === 'preorder' && 'Передзамовлення'}
                {game.status === 'onsale' && 'У продажі'}
              </h3>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: border1 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progressPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accentGradientStart}, ${accent})`,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-white/40 mb-6">
                <span>{progressPercent}% готовності</span>
                <span>
                  {activeStages}/{totalStages} етапи відкрито
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/50 text-xs sm:text-sm">
                    <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: accentIconSoft }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ ПРО ЩО Ж ГРА? ═══════ */}
      <section className="relative py-14 sm:py-20 lg:py-28 px-4 sm:px-6 overflow-hidden" style={{ backgroundColor: bg1 }}>
        {assets?.aboutCharacters && (
          <div className="pointer-events-none absolute inset-0 z-0">
            {assets.aboutCharacters.map((src, index) => (
              <img
                key={`about-char-${src}`}
                src={src}
                alt=""
                className={`${aboutCharacterClasses[index] || 'hidden'} select-none`}
                style={{
                  opacity: 0.24,
                  filter: 'brightness(1.06) drop-shadow(0 20px 34px rgba(0,0,0,0.48))',
                }}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Section title image or text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-10 sm:mb-16"
          >
            {assets?.sectionTitle ? (
              <img
                src={assets.sectionTitle}
                alt="Про що ж гра?"
                className="w-[220px] sm:w-[400px] md:w-[500px] h-auto"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90">
                Про що гра?
              </h2>
            )}
          </motion.div>

          {/* Content — cover + description */}
          <div className="grid md:grid-cols-[1.05fr_1.1fr] gap-6 sm:gap-8 md:gap-10 items-center">
            {/* Cover / 3D box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-3 sm:p-10 rounded-3xl flex items-center justify-center min-h-[300px] sm:min-h-[420px]"
              style={{
                background: `${boxHighlight}, ${boxBg}`,
                border: `1px solid ${border1}`,
                boxShadow: '0 28px 60px -44px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {assets?.boxMockup || game.coverImage ? (
                <RotatableBox
                  frontImage={assets?.boxMockup || game.coverImage}
                  backImage={assets?.boxBack}
                  topImage={assets?.boxTop}
                  leftSideImage={assets?.boxSideLeft}
                  rightSideImage={assets?.boxSideRight}
                  color={palette}
                  sideLabel={game.name}
                  interactive
                  className="scale-[0.74] min-[400px]:scale-[0.84] sm:scale-[1.02] md:scale-[1.12] lg:scale-[1.18]"
                />
              ) : (
                <div className="aspect-square w-full rounded-xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: border1 }}>
                  <ImagePlus className="w-10 h-10 text-white/15" />
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-10 rounded-3xl"
              style={{
                background: `linear-gradient(180deg, ${darken(palette, 0.25)} 0%, ${darken(palette, 0.3)} 100%)`,
                border: `1px solid ${border1}`,
                boxShadow: '0 22px 50px -42px rgba(0,0,0,0.55)',
              }}
            >
              {/* Status badge */}
              <span
                className="inline-block px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6"
                style={{
                  backgroundColor: `${accent}25`,
                  color: accent,
                  border: `1px solid ${accent}40`,
                }}
              >
                {game.status === 'production' ? 'Виробництво' : game.status}
              </span>

              <h3 className="text-lg sm:text-3xl font-bold text-white/90 uppercase tracking-[0.02em] sm:tracking-wide mb-4 sm:mb-6">
                {game.slogan || game.name}
              </h3>

              <div className="w-full h-px bg-white/10 mb-6" />

              {game.aboutGame ? (
                <p className="text-white/66 leading-relaxed text-sm sm:text-base">
                  {game.aboutGame}
                </p>
              ) : (
                <SkeletonLines count={4} maxWidth={90} />
              )}

              <div className="w-full h-px bg-white/10 mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ ЕТАПИ ПРОЄКТУ ═══════ */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden" style={{ backgroundColor: bg2 }}>
        {assets?.stageCharacters && (
          <div className="pointer-events-none absolute inset-0 z-0">
            {assets.stageCharacters.map((src, index) => (
              <img
                key={`stage-char-${src}`}
                src={src}
                alt=""
                className={`${stageCharacterClasses[index] || 'hidden'} select-none`}
                style={{
                  opacity: 0.2,
                  filter: 'brightness(1.04) drop-shadow(0 18px 30px rgba(0,0,0,0.44))',
                }}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/35 mb-3">
              Прогрес
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 mb-3">
              Етапи проєкту
            </h2>
            <p className="text-white/45 text-sm sm:text-base">Стан запуску кожного етапу.</p>
          </motion.div>

          <div className="space-y-5 sm:space-y-6">
            {STAGE_ORDER.map((stageKey, i) => {
              const stage = game.stages[stageKey];
              if (!stage || stage.state === 'hidden') return null;

              const isActive = stage.state === 'active';
              const isLocked = stage.state === 'locked';
              const showInactiveOverlay = !isActive;
              const badgeText = stageBadgeLabels[stage.state];
              const isExpanded = expandedStage === stageKey;
              const preview =
                stage.content && stage.content.length > 170
                  ? `${stage.content.slice(0, 170)}…`
                  : stage.content || 'Секція в роботі';

              return (
                <motion.article
                  key={stageKey}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.996 }}
                  tabIndex={0}
                  aria-disabled={isLocked}
                  className="relative rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-8 sm:py-7 min-h-[132px] sm:min-h-[152px] overflow-hidden"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.22) 0%, ${darken(palette, 0.28)} 48%, ${darken(palette, 0.34)} 100%)`
                      : `linear-gradient(135deg, ${darken(palette, 0.22)} 0%, ${darken(palette, 0.3)} 100%)`,
                    border: `1px solid ${isActive ? borderActive : border1}`,
                    boxShadow: isActive
                      ? `0 24px 44px -32px rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.9)`
                      : '0 20px 36px -30px rgba(0,0,0,0.75)',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => handleStageCardClick(stageKey, isLocked)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleStageCardClick(stageKey, isLocked);
                    }
                  }}
                  onTouchStart={() => {
                    if (isLocked) triggerLockedFeedback(stageKey);
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <motion.span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: isActive
                            ? `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.23)`
                            : `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.18)`,
                          border: `1px solid rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.55)`,
                          boxShadow: `0 0 0 3px rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.11)`,
                        }}
                        animate={
                          isActive
                            ? isExpanded
                              ? { rotate: -14, scale: 1.08 }
                              : { rotate: 0, scale: 1 }
                            : lockFeedbackStage === stageKey
                              ? { rotate: [0, -14, 10, -6, 0], scale: [1, 1.12, 1] }
                              : { rotate: 0, scale: 1 }
                        }
                        transition={
                          isActive
                            ? { type: 'spring', stiffness: 250, damping: 16 }
                            : { duration: 0.34 }
                        }
                      >
                        {isActive && isExpanded ? (
                          <LockOpen className="w-[18px] h-[18px] text-white/95" />
                        ) : (
                          <Lock className="w-[18px] h-[18px] text-white/95" />
                        )}
                      </motion.span>

                      <h3 className="text-lg sm:text-2xl md:text-[1.75rem] leading-tight sm:leading-none font-semibold text-white/90 break-words">
                        {stage.title}
                      </h3>
                    </div>

                    <span
                      className="self-start inline-flex items-center rounded-lg px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap"
                      style={{
                        color: isActive ? '#bdf6df' : 'rgba(230,238,247,0.9)',
                        backgroundColor: isActive ? `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.26)` : 'rgba(216,226,240,0.11)',
                        border: `1px solid ${isActive ? `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.6)` : 'rgba(190,205,224,0.22)'}`,
                        boxShadow: isActive
                          ? `0 8px 18px -12px rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.8)`
                          : 'none',
                      }}
                    >
                      {badgeText}
                    </span>
                  </div>

                  {isActive ? (
                    <>
                      {!isExpanded && (
                        <p className="text-white/55 text-xs sm:text-sm">Натисни, щоб відкрити етап.</p>
                      )}
                      <motion.div
                        initial={false}
                        animate={
                          isExpanded
                            ? { height: 'auto', opacity: 1, marginTop: 10 }
                            : { height: 0, opacity: 0, marginTop: 0 }
                        }
                        transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3">
                          {[100, 92, 82].map((width) => (
                            <div
                              key={width}
                              className="h-3.5 rounded-full"
                              style={{
                                width: `${width}%`,
                                backgroundColor: 'rgba(227,239,255,0.24)',
                              }}
                            />
                          ))}
                        </div>
                        <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed break-words">
                          {preview}
                        </p>
                      </motion.div>
                    </>
                  ) : (
                    <div className="mt-3 text-sm sm:text-base text-white/52">
                      Секція ще не заповнена
                    </div>
                  )}

                  {showInactiveOverlay && (
                    <div
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(2,8,20,0.28) 0%, rgba(2,8,20,0.6) 100%)',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="relative inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border"
                          style={{
                            backgroundColor: 'rgba(10,24,44,0.55)',
                            borderColor: 'rgba(184,212,245,0.42)',
                            boxShadow:
                              '0 0 0 5px rgba(105,148,206,0.16), 0 22px 34px -18px rgba(0,0,0,0.78)',
                          }}
                          animate={
                            lockFeedbackStage === stageKey
                              ? { rotate: [0, -14, 8, -5, 0], scale: [1, 1.12, 1] }
                              : { rotate: 0, scale: 1 }
                          }
                          transition={{ duration: 0.36 }}
                        >
                          <Lock className="w-9 h-9 sm:w-10 sm:h-10 text-white/95" />
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
