'use client';

import { motion, useInView, AnimatePresence } from 'motion/react';
import { Suspense } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FolderKanban, ShieldCheck, TimerReset, CheckCircle2 } from 'lucide-react';
import projects from '@/data/projects';
import ProjectCard from './ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import uiContent from '@/data/ui-content';

function ProjectsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const searchParams = useSearchParams();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const activeProjects = projects.filter((project) => project.status === 'active').length;

  useEffect(() => {
    if (searchParams.get('payment') !== 'success') return;

    const showId = setTimeout(() => setShowPaymentSuccess(true), 0);
    const hideId = setTimeout(() => setShowPaymentSuccess(false), 5000);

    return () => {
      clearTimeout(showId);
      clearTimeout(hideId);
    };
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
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base leading-snug">
              {uiContent.projectsPage.paymentSuccess}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/85 via-white to-blue-50/45" />
        <div className="absolute inset-0 bg-dots-kik opacity-30" />
        <div className="absolute inset-0 bg-grain opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-20%,#4BB2721c_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_10%_80%,#009FE310_0%,transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <SectionHeader
              label={uiContent.projectsPage.label}
              title={uiContent.projectsPage.title}
              subtitle={uiContent.projectsPage.subtitle}
              className="mb-6 sm:mb-8"
            />
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white/90 border border-slate-200/80 shadow-sm">
                <FolderKanban className="w-4 h-4 text-[var(--kik-accent)]" />
                {projects.length} {uiContent.projectsPage.projectsCount}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white/90 border border-slate-200/80 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[var(--kik-accent)]" />
                {activeProjects} {uiContent.projectsPage.activeCount}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white/90 border border-slate-200/80 shadow-sm">
                <TimerReset className="w-4 h-4 text-[var(--kik-accent)]" />
                {uiContent.projectsPage.updates}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={sectionRef} className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 -mt-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 80, delay: i * 0.06 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">{uiContent.projectsPage.loading}</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
