'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import uiContent from '@/data/ui-content';

const CYRILLIC_MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye', ж: 'zh', з: 'z',
  и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
  р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ь: '', ю: 'yu', я: 'ya',
};

function slugify(input: string) {
  const lower = input.trim().toLowerCase();
  const transliterated = lower
    .split('')
    .map((char) => CYRILLIC_MAP[char] ?? char)
    .join('');

  return transliterated
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

type WorkflowRunStatus = {
  name: string;
  status: string;
  conclusion: string | null;
  html_url: string;
  head_branch: string;
  created_at: string;
};

const REPO_OWNER = 'Volodymyr4K';
const REPO_NAME = 'blue-ferret-kik-plus';

async function fetchLatestWorkflowRun(workflowFile: string): Promise<WorkflowRunStatus | null> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${workflowFile}/runs?per_page=1`;
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { workflow_runs?: WorkflowRunStatus[] };
  return payload.workflow_runs?.[0] ?? null;
}

function statusLabel(run: WorkflowRunStatus | null) {
  if (!run) return 'Немає даних';
  if (run.status !== 'completed') return 'В процесі';
  if (run.conclusion === 'success') return 'Успішно';
  if (run.conclusion === 'failure') return 'Помилка';
  return run.conclusion ?? 'Невідомо';
}

function statusClass(run: WorkflowRunStatus | null) {
  if (!run) return 'text-slate-600 bg-slate-100';
  if (run.status !== 'completed') return 'text-amber-700 bg-amber-100';
  if (run.conclusion === 'success') return 'text-emerald-700 bg-emerald-100';
  if (run.conclusion === 'failure') return 'text-rose-700 bg-rose-100';
  return 'text-slate-700 bg-slate-100';
}

export default function AdminGuidePage() {
  const [gameName, setGameName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [qualityRun, setQualityRun] = useState<WorkflowRunStatus | null>(null);
  const [stagingRun, setStagingRun] = useState<WorkflowRunStatus | null>(null);

  useEffect(() => {
    void (async () => {
      const [quality, staging] = await Promise.all([
        fetchLatestWorkflowRun('quality.yml'),
        fetchLatestWorkflowRun('staging-preview.yml'),
      ]);
      setQualityRun(quality);
      setStagingRun(staging);
    })();
  }, []);

  const generatedSlug = useMemo(() => slugify(gameName), [gameName]);
  const gameMetaTitle = useMemo(
    () => uiContent.metadata.gameTitleTemplate.replace('{name}', gameName || 'Назва гри'),
    [gameName]
  );
  const projectMetaTitle = useMemo(
    () => uiContent.metadata.projectTitleTemplate.replace('{name}', projectName || 'Назва проєкту'),
    [projectName]
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Портал менеджера контенту</h1>
          <p className="text-slate-600">
            Ця сторінка допомагає редагувати контент без технічних дій: швидкі посилання, генерація slug та превʼю метаданих.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            У CMS працюйте переважно в секції <strong>Менеджер (базовий режим)</strong> — вона покриває весь операційний контент.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Швидкі дії</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="https://app.pagescms.org" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-slate-900 text-white text-center font-semibold">
              Відкрити Pages CMS
            </a>
            <a href="https://github.com/Volodymyr4K/blue-ferret-kik-plus/pulls" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold">
              Відкрити Pull Requests
            </a>
            <Link href="/igry" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold">
              Перевірити каталог ігор
            </Link>
            <Link href="/kik/proekty" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold">
              Перевірити проєкти KIK
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Стан перевірок</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="font-semibold text-slate-900">Quality Gate</p>
                <span className={`text-xs px-2 py-1 rounded-full ${statusClass(qualityRun)}`}>
                  {statusLabel(qualityRun)}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                {qualityRun
                  ? `Гілка: ${qualityRun.head_branch} • ${new Date(qualityRun.created_at).toLocaleString('uk-UA')}`
                  : 'Не вдалося отримати дані workflow.'}
              </p>
              <a
                href={qualityRun?.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/actions/workflows/quality.yml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-900 underline"
              >
                Відкрити workflow
              </a>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="font-semibold text-slate-900">Staging Preview</p>
                <span className={`text-xs px-2 py-1 rounded-full ${statusClass(stagingRun)}`}>
                  {statusLabel(stagingRun)}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                {stagingRun
                  ? `Гілка: ${stagingRun.head_branch} • ${new Date(stagingRun.created_at).toLocaleString('uk-UA')}`
                  : 'Не вдалося отримати дані workflow.'}
              </p>
              <a
                href={stagingRun?.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/actions/workflows/staging-preview.yml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-900 underline"
              >
                Відкрити preview run
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Slug генератор</h2>
          <input
            type="text"
            value={gameName}
            onChange={(event) => setGameName(event.target.value)}
            placeholder="Введіть назву гри"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
          <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
            <p className="text-sm text-slate-500 mb-1">Згенерований slug:</p>
            <p className="font-mono text-slate-900">{generatedSlug || '—'}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Превʼю метаданих</h2>

          <input
            type="text"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="Назва проєкту"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
          <textarea
            value={customDescription}
            onChange={(event) => setCustomDescription(event.target.value)}
            placeholder="Короткий опис (description)"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[100px]"
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
              <p className="text-sm text-slate-500 mb-1">Title для гри</p>
              <p className="text-slate-900">{gameMetaTitle}</p>
            </div>
            <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
              <p className="text-sm text-slate-500 mb-1">Title для проєкту</p>
              <p className="text-slate-900">{projectMetaTitle}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
            <p className="text-sm text-slate-500 mb-1">Description превʼю</p>
            <p className="text-slate-900">
              {customDescription || 'Додайте короткий опис, який менеджер вставить у відповідне поле.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
