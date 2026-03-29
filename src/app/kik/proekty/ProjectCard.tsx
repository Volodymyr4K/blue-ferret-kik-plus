'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const progress = project.goal > 0 ? Math.min(100, (project.raised / project.goal) * 100) : 0;

  const formatMoney = (n: number) =>
    new Intl.NumberFormat('uk-UA', { style: 'decimal', maximumFractionDigits: 0 }).format(n) + ' ₴';

  return (
    <Link
      href={project.link}
      className="group flex h-full flex-col bg-white/98 rounded-2xl overflow-hidden board-game-border-kik transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_46px_-30px_rgba(15,23,42,0.45)]"
    >
      <div className="aspect-[16/10] min-h-[190px] relative overflow-hidden bg-gradient-to-br from-emerald-800/95 via-teal-900/90 to-slate-900">
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/10 to-transparent" />
        <div className="absolute inset-0 bg-dots-kik opacity-22" />
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
          <span className="board-game-badge inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/95 text-xs sm:text-sm text-slate-700 shadow-md backdrop-blur-sm border border-[var(--kik-accent)]/30">
            {project.statusLabel}
          </span>
        </div>
        {project.goal > 0 && project.raised > 0 && (
          <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-center gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/95 backdrop-blur-sm border border-white/50 shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--kik-accent)]" />
            <span className="text-xs sm:text-sm font-bold text-[var(--kik-accent)]">{Math.round(progress)}%</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 lg:p-7 flex flex-col flex-1">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold group-hover:text-[var(--kik-accent)] transition-colors mb-2 sm:mb-3 text-slate-800 line-clamp-2 min-h-[3.2rem] sm:min-h-[3.6rem]">
          {project.name}
        </h2>

        {project.goal > 0 && (
          <div className="mb-4 sm:mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 text-xs sm:text-sm mb-1.5 sm:mb-2">
              <span className="text-slate-500">Зібрано</span>
              <span className="font-bold text-[var(--kik-accent)] leading-tight">
                {formatMoney(project.raised)} / {formatMoney(project.goal)}
              </span>
            </div>
            <div className="h-2 sm:h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[var(--kik-accent)] to-emerald-400 rounded-full"
              />
            </div>
          </div>
        )}

        <p className="text-body text-sm lg:text-base mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="mb-4 p-3 rounded-xl bg-slate-50/90 border border-slate-200/70">
          <p className="text-caption mb-0.5">Оновлення · {project.lastUpdate}</p>
          <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">{project.updatePreview}</p>
        </div>

        <span className="inline-flex items-center gap-2 text-[var(--kik-accent)] font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
          Детальніше
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
