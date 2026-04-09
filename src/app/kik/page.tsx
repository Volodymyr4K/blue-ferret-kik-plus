'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, FolderKanban, ArrowRight, Leaf, ShieldCheck, Clock3 } from 'lucide-react';
import KikLogo from '@/components/KikLogo';
import siteContent from '@/data/site-content';
import uiContent from '@/data/ui-content';

const KIK_FACTS = [
  { icon: FolderKanban, text: uiContent.kikHome.facts[0] },
  { icon: ShieldCheck, text: uiContent.kikHome.facts[1] },
  { icon: Clock3, text: uiContent.kikHome.facts[2] },
];

const COMIC_STRIP = [
  '/images/kik/comic/comic-part-03.webp',
  '/images/kik/comic/comic-part-02.webp',
  '/images/kik/comic/comic-part-01.webp',
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
              <span className="text-sm font-semibold text-[var(--kik-accent)]">{uiContent.kikHome.platformBadge}</span>
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
                className="group inline-flex w-full sm:w-auto max-w-sm mx-auto sm:mx-0 items-center justify-center gap-2.5 px-7 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[var(--kik-accent)] to-[var(--teal-accent)] text-white text-sm sm:text-[15px] font-bold rounded-2xl hover:from-[var(--teal-accent)] hover:to-[var(--kik-accent)] transition-colors"
              >
                <FolderKanban className="w-4 h-4" />
                {uiContent.kikHome.projectsButton}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/kik/pro-kik"
                className="group inline-flex w-full sm:w-auto max-w-sm mx-auto sm:mx-0 items-center justify-center gap-2.5 px-7 sm:px-10 py-3.5 sm:py-4 bg-white text-slate-700 font-bold rounded-2xl border border-[var(--kik-accent)]/45 hover:border-[var(--kik-accent)] hover:text-[var(--kik-accent)] transition-colors shadow-sm"
              >
                <Heart className="w-5 h-5" />
                {uiContent.kikHome.aboutButton}
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <section className="px-0 sm:px-4 md:px-6 pb-10 sm:pb-14">
        <div className="mx-auto w-full bg-white shadow-[0_20px_48px_-36px_rgba(15,23,42,0.45)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {COMIC_STRIP.map((src, index) => (
              <div key={src} className="relative aspect-square">
                <Image
                  src={src}
                  alt={uiContent.kikHome.comicAltTemplate.replace('{index}', String(index + 1))}
                  fill
                  sizes="(min-width: 1024px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
