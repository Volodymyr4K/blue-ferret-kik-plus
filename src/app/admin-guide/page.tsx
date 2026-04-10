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

type ContentCommitSummary = {
  sha: string;
  message: string;
  author: string;
  createdAt: string;
  htmlUrl: string;
  files: string[];
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

function summarizeLength(length: number, min: number, max: number) {
  if (length === 0) {
    return {
      label: 'Порожньо',
      className: 'text-slate-700 bg-slate-100',
    };
  }
  if (length < min) {
    return {
      label: `Коротко (${min}-${max})`,
      className: 'text-amber-700 bg-amber-100',
    };
  }
  if (length > max) {
    return {
      label: `Задовго (${min}-${max})`,
      className: 'text-rose-700 bg-rose-100',
    };
  }
  return {
    label: `Норма (${min}-${max})`,
    className: 'text-emerald-700 bg-emerald-100',
  };
}

async function fetchRecentContentCommits(): Promise<ContentCommitSummary[]> {
  const commitsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=staging&path=src/content&per_page=6`;
  const commitsResponse = await fetch(commitsUrl, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!commitsResponse.ok) {
    return [];
  }

  const commitsPayload = (await commitsResponse.json()) as Array<{
    sha: string;
    html_url: string;
    commit?: {
      message?: string;
      author?: { name?: string; date?: string };
    };
  }>;

  const enriched = await Promise.all(
    commitsPayload.map(async (item) => {
      const detailsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${item.sha}`;
      const detailsResponse = await fetch(detailsUrl, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      let files: string[] = [];
      if (detailsResponse.ok) {
        const details = (await detailsResponse.json()) as {
          files?: Array<{ filename?: string }>;
        };
        files = (details.files ?? [])
          .map((file) => file.filename ?? '')
          .filter((filename) => filename.startsWith('src/content/'))
          .map((filename) => filename.replace('src/content/', ''));
      }

      return {
        sha: item.sha,
        message: item.commit?.message?.split('\n')[0] ?? 'Без повідомлення',
        author: item.commit?.author?.name ?? 'Невідомо',
        createdAt: item.commit?.author?.date ?? '',
        htmlUrl: item.html_url,
        files,
      } satisfies ContentCommitSummary;
    })
  );

  return enriched;
}

export default function AdminGuidePage() {
  const [gameName, setGameName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [qualityRun, setQualityRun] = useState<WorkflowRunStatus | null>(null);
  const [stagingRun, setStagingRun] = useState<WorkflowRunStatus | null>(null);
  const [recentContentCommits, setRecentContentCommits] = useState<ContentCommitSummary[] | null>(null);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmPagesChecked, setConfirmPagesChecked] = useState(false);
  const [confirmTextChecked, setConfirmTextChecked] = useState(false);
  const [confirmStatusChecked, setConfirmStatusChecked] = useState(false);

  useEffect(() => {
    void (async () => {
      const [quality, staging, commits] = await Promise.all([
        fetchLatestWorkflowRun('quality.yml'),
        fetchLatestWorkflowRun('staging-preview.yml'),
        fetchRecentContentCommits(),
      ]);
      setQualityRun(quality);
      setStagingRun(staging);
      setRecentContentCommits(commits);
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
  const pagesCmsUrl = 'https://app.pagescms.org';
  const previewRunUrl = stagingRun?.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/actions/workflows/staging-preview.yml`;
  const publishUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/compare/main...staging?expand=1`;
  const checksUrl = qualityRun?.html_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/actions/workflows/quality.yml`;
  const isQualityGreen = qualityRun?.status === 'completed' && qualityRun.conclusion === 'success';
  const qualityBlocksPublish = Boolean(qualityRun) && !isQualityGreen;
  const checklistComplete = confirmPagesChecked && confirmTextChecked && confirmStatusChecked;
  const canPublish = checklistComplete && !qualityBlocksPublish;
  const seoTitleInfo = summarizeLength(seoTitle.trim().length, 45, 65);
  const seoDescriptionInfo = summarizeLength(seoDescription.trim().length, 120, 160);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Портал менеджера контенту</h1>
          <p className="text-slate-600">
            Простий сценарій: редагуйте контент у CMS, натискайте збереження, потім тут обирайте один із двох варіантів: Preview або Опублікувати.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Головні дії</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href={pagesCmsUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-slate-900 text-white text-center font-semibold">
              1. Відкрити адмінку (CMS)
            </a>
            <button
              type="button"
              onClick={() => {
                setConfirmPagesChecked(false);
                setConfirmTextChecked(false);
                setConfirmStatusChecked(false);
                setDecisionOpen(true);
              }}
              className="px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 text-center font-semibold"
            >
              2. Я зберегла зміни
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-3">
            У CMS редагуйте переважно секцію <strong>Менеджер (базовий режим)</strong>.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Швидка перевірка контенту</h2>
          <div className="grid sm:grid-cols-2 gap-3">
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
                href={checksUrl}
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
                href={previewRunUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-slate-900 underline"
              >
                Відкрити preview run
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Останні зміни контенту</h2>
          {recentContentCommits === null ? (
            <p className="text-slate-500 text-sm">Завантаження...</p>
          ) : recentContentCommits.length === 0 ? (
            <p className="text-slate-500 text-sm">Не вдалося отримати історію змін або змін у `src/content` поки немає.</p>
          ) : (
            <div className="space-y-3">
              {recentContentCommits.map((commit) => (
                <div key={commit.sha} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{commit.message}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {commit.author} •{' '}
                    {commit.createdAt
                      ? new Date(commit.createdAt).toLocaleString('uk-UA')
                      : 'без дати'}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    {commit.files.length > 0
                      ? `Файли: ${commit.files.slice(0, 4).join(', ')}${commit.files.length > 4 ? ` +${commit.files.length - 4}` : ''}`
                      : 'Файли контенту не визначені'}
                  </p>
                  <a
                    href={commit.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-900 underline mt-2 inline-block"
                  >
                    Відкрити коміт
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">SEO-помічник для тексту</h2>
          <p className="text-sm text-slate-600">
            Вставте фінальні `title` і `description` перед публікацією. Блок покаже, чи довжина в безпечному діапазоні.
          </p>
          <input
            type="text"
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            placeholder="SEO Title"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
          <textarea
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            placeholder="SEO Description"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[100px]"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-slate-700">Title: {seoTitle.trim().length} символів</p>
                <span className={`text-xs px-2 py-1 rounded-full ${seoTitleInfo.className}`}>
                  {seoTitleInfo.label}
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-slate-700">Description: {seoDescription.trim().length} символів</p>
                <span className={`text-xs px-2 py-1 rounded-full ${seoDescriptionInfo.className}`}>
                  {seoDescriptionInfo.label}
                </span>
              </div>
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

      {decisionOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-900/50 p-4 flex items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Зміни збережено</h2>
            <p className="text-slate-600 mb-5">
              Перед публікацією відмітьте короткий чекліст.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4 space-y-3">
              <label className="flex items-start gap-3 text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={confirmPagesChecked}
                  onChange={(event) => setConfirmPagesChecked(event.target.checked)}
                  className="mt-0.5"
                />
                <span>Перевірила сторінки: головна, ігри, проєкти.</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={confirmTextChecked}
                  onChange={(event) => setConfirmTextChecked(event.target.checked)}
                  className="mt-0.5"
                />
                <span>Перевірила тексти, дати та зображення без помилок.</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-slate-800">
                <input
                  type="checkbox"
                  checked={confirmStatusChecked}
                  onChange={(event) => setConfirmStatusChecked(event.target.checked)}
                  className="mt-0.5"
                />
                <span>У блоці “Стан перевірок” немає помилки.</span>
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={previewRunUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold"
              >
                Переглянути Preview
              </a>
              <a
                href={publishUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canPublish}
                className={`px-4 py-3 rounded-xl text-center font-semibold ${
                  canPublish
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-300 text-slate-500 pointer-events-none'
                }`}
              >
                Опублікувати
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {!checklistComplete
                ? 'Щоб опублікувати, відмітьте всі пункти чекліста.'
                : qualityBlocksPublish
                  ? 'Публікація заблокована: Quality Gate ще не успішний.'
                  : 'Готово до публікації.'}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href={checksUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-700 underline"
              >
                Відкрити Quality Gate
              </a>
              <a
                href={previewRunUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-700 underline"
              >
                Відкрити Staging Preview
              </a>
            </div>
            <button
              type="button"
              onClick={() => setDecisionOpen(false)}
              className="mt-4 w-full px-4 py-2 rounded-xl text-slate-700 border border-slate-200"
            >
              Закрити
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
