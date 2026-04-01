import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CircleHelp, Lock } from 'lucide-react';
import projects from '@/data/projects';
import SupportOptionsClient from '../SupportOptionsClient';

function getProject(id: string) {
  return projects.find((project) => project.id === id);
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
  if (!project) return { title: 'Підтримка проєкту | KIK вдома' };

  return {
    title: `Підтримати ${project.name} | KIK вдома`,
    description: `Оберіть формат підтримки для проєкту ${project.name}.`,
  };
}

export default async function ProjectSupportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const canSupport = project.status === 'active';
  const supportConfig = project.support ?? {
    minDonation: 50,
    defaultDonation: 200,
    tiers: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/85 via-white to-blue-50/45">
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dots-kik opacity-22 pointer-events-none" />
        <div className="absolute inset-0 bg-grain opacity-45 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <Link
            href={`/kik/proekty/${project.id}`}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--kik-accent)] transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            До сторінки проєкту
          </Link>

          <div className="rounded-3xl border border-[var(--kik-accent)]/20 bg-white/95 p-6 sm:p-8 shadow-[0_26px_62px_-40px_rgba(15,23,42,0.4)] mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Підтримати «{project.name}»
                </h1>
                <p className="text-slate-600 text-base sm:text-lg max-w-3xl">
                  Оберіть варіант: замовити фіксовану версію гри або підтримати сумою без нагороди.
                </p>
              </div>
              <Link
                href="/kik/pro-kik"
                className="inline-flex items-center gap-2 self-start lg:self-auto px-4 py-2.5 rounded-xl border border-[var(--kik-accent)]/30 bg-white text-slate-700 font-medium hover:text-[var(--kik-accent)] hover:border-[var(--kik-accent)] transition-colors"
              >
                <CircleHelp className="w-4 h-4" />
                Як працює KIK вдома
              </Link>
            </div>
          </div>

          {canSupport ? (
            <SupportOptionsClient
              projectId={project.id}
              projectName={project.name}
              minDonation={supportConfig.minDonation}
              defaultDonation={supportConfig.defaultDonation}
              tiers={supportConfig.tiers}
            />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 sm:p-8 shadow-[0_26px_62px_-40px_rgba(15,23,42,0.35)]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-4">
                <Lock className="w-3.5 h-3.5" />
                Підтримка скоро відкриється
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Для цього проєкту ще не стартував збір коштів
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Підтримка стане доступною, коли проєкт перейде в етап «Збір коштів». Слідкуйте за оновленнями сторінки.
              </p>
              <Link
                href={`/kik/proekty/${project.id}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--kik-accent)] text-white font-semibold hover:bg-[var(--teal-accent)] transition-colors"
              >
                Назад до проєкту
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
