import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  FolderKanban,
  ShieldCheck,
  TimerReset,
} from 'lucide-react';
import projects from '@/data/projects';
import uiContent from '@/data/ui-content';

const PROJECT_STAGES = {
  preparing: ['active', 'locked', 'locked'],
  active: ['completed', 'active', 'locked'],
  complete: ['completed', 'completed', 'completed'],
} as const;

const STAGE_LABELS = [
  uiContent.projectDetails.prepare,
  uiContent.projectDetails.collecting,
  uiContent.projectDetails.production,
] as const;

function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

function formatMoney(value: number) {
  return (
    new Intl.NumberFormat('uk-UA', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value) + ' ₴'
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: uiContent.projectDetails.notFoundTitle };

  return {
    title: uiContent.metadata.projectTitleTemplate.replace('{name}', project.name),
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const progress =
    project.goal > 0 ? Math.min(100, (project.raised / project.goal) * 100) : 0;
  const canSupport = project.status === 'active';
  const stageState =
    PROJECT_STAGES[project.status as keyof typeof PROJECT_STAGES] ??
    PROJECT_STAGES.preparing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/85 via-white to-blue-50/45">
      <section className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dots-kik opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-grain opacity-45 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <Link
            href="/kik/proekty"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--kik-accent)] transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            {uiContent.projectDetails.backToProjects}
          </Link>

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-6 lg:gap-8">
            <div className="rounded-3xl border border-[var(--kik-accent)]/20 bg-white/95 overflow-hidden shadow-[0_28px_62px_-42px_rgba(15,23,42,0.4)]">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-emerald-800/95 via-teal-900/90 to-slate-900">
                {project.coverImage && (
                  <Image
                    src={project.coverImage}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/10 to-transparent" />
                <div className="absolute inset-0 bg-dots-kik opacity-22" />

                <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white/95 border border-[var(--kik-accent)]/25 shadow-sm">
                  <FolderKanban className="w-4 h-4 text-[var(--kik-accent)]" />
                  {project.statusLabel}
                </span>

                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[var(--kik-accent)] bg-white/95 border border-white/60 shadow-sm">
                  <CircleDollarSign className="w-4 h-4" />
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm text-slate-500 mb-1">{uiContent.projectDetails.updatePrefix} · {formatDate(project.lastUpdate)}</p>
                <p className="text-slate-700 leading-relaxed">{project.updatePreview}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--kik-accent)]/20 bg-white/95 p-6 sm:p-8 shadow-[0_28px_62px_-42px_rgba(15,23,42,0.4)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--kik-accent)]/10 text-[var(--kik-accent)] border border-[var(--kik-accent)]/30 text-xs font-semibold mb-5">
                {uiContent.projectDetails.pageBadge}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                {project.name}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                {project.shortDescription}
              </p>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 sm:p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <span className="text-slate-600 text-sm">{uiContent.projectDetails.raised}</span>
                  <span className="text-[var(--kik-accent)] font-extrabold text-lg">
                    {formatMoney(project.raised)} / {formatMoney(project.goal)}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--kik-accent)] to-emerald-400 transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  {uiContent.projectDetails.progress}: {Math.round(progress)}%
                </p>
              </div>

              <div className="space-y-3 mb-7">
                {STAGE_LABELS.map((label, index) => {
                  const state = stageState[index];
                  const stateClass =
                    state === 'completed'
                      ? 'border-emerald-200 bg-emerald-50/70 text-emerald-700'
                      : state === 'active'
                        ? 'border-[var(--kik-accent)]/30 bg-[var(--kik-accent)]/10 text-[var(--kik-accent)]'
                        : 'border-slate-200 bg-slate-50 text-slate-500';

                  return (
                    <div
                      key={label}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${stateClass}`}
                    >
                      <span className="font-medium">{label}</span>
                      {state === 'completed' && <ShieldCheck className="w-4 h-4" />}
                      {state === 'active' && <TimerReset className="w-4 h-4" />}
                      {state === 'locked' && <CalendarDays className="w-4 h-4" />}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {canSupport ? (
                  <Link
                    href={`/kik/proekty/${project.id}/pidtrymaty`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--kik-accent)] to-[var(--teal-accent)] text-white font-semibold hover:from-[var(--teal-accent)] hover:to-[var(--kik-accent)] transition-colors"
                  >
                    <CircleDollarSign className="w-4 h-4" />
                    {uiContent.projectDetails.support}
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-semibold cursor-not-allowed">
                    <CalendarDays className="w-4 h-4" />
                    {uiContent.projectDetails.supportSoon}
                  </span>
                )}
                <Link
                  href="/kik/proekty"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--kik-accent)] text-white font-semibold hover:bg-[var(--teal-accent)] transition-colors"
                >
                  {uiContent.projectDetails.otherProjects}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kik/pro-kik"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--kik-accent)]/30 bg-white text-slate-700 font-semibold hover:text-[var(--kik-accent)] hover:border-[var(--kik-accent)] transition-colors"
                >
                  {uiContent.projectDetails.howItWorks}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
