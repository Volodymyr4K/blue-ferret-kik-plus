'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import gamesData from '@/content/games.json';
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

const REPO_OWNER = 'teacheddoc';
const REPO_NAME = 'blue-ferret-kik-plus';
const PLACEHOLDER_VALUES = new Set(['test', 'testing', 'lorem', 'lorem ipsum', 'todo', 'tbd', 'n/a', 'na', 'none', '-', '--', '...']);

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

function isLikelyPlaceholder(value: string) {
  return PLACEHOLDER_VALUES.has(value.trim().toLowerCase());
}

function isValidHexColor(value: string) {
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
}

function isValidMediaPath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (!trimmed.startsWith('/')) return false;
  if (trimmed.startsWith('//')) return false;
  if (/\s/.test(trimmed)) return false;
  return trimmed.startsWith('/images/') || trimmed.startsWith('/uploads/');
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
  const [mode, setMode] = useState<'basic' | 'full'>('basic');
  const [fullTab, setFullTab] = useState<'editing' | 'quality' | 'tools'>('editing');
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [gameName, setGameName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [newGameName, setNewGameName] = useState('');
  const [newGameSlogan, setNewGameSlogan] = useState('');
  const [newGameShortDescription, setNewGameShortDescription] = useState('');
  const [newGameAbout, setNewGameAbout] = useState('');
  const [newGameStatus, setNewGameStatus] = useState<'announcement' | 'production' | 'preorder' | 'onsale'>('announcement');
  const [newGamePrice, setNewGamePrice] = useState('0');
  const [newGameHeroImage, setNewGameHeroImage] = useState('');
  const [newGameCoverImage, setNewGameCoverImage] = useState('');
  const [newGamePalette, setNewGamePalette] = useState('');
  const [newGameAccent, setNewGameAccent] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [qualityRun, setQualityRun] = useState<WorkflowRunStatus | null>(null);
  const [stagingRun, setStagingRun] = useState<WorkflowRunStatus | null>(null);
  const [recentContentCommits, setRecentContentCommits] = useState<ContentCommitSummary[] | null>(null);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmSavedChecked, setConfirmSavedChecked] = useState(false);
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
  const generatedNewGameId = useMemo(() => slugify(newGameName), [newGameName]);
  const generatedNewGameSlug = useMemo(() => slugify(newGameName), [newGameName]);
  const existingGameIds = useMemo(() => new Set(gamesData.map((item) => item.id)), []);
  const existingGameSlugs = useMemo(() => new Set(gamesData.map((item) => item.slug)), []);
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
  const qualityStateUnknown = qualityRun === null;
  const qualityBlocksPublish = !isQualityGreen;
  const previewChecklistComplete = confirmSavedChecked && confirmPagesChecked && confirmTextChecked;
  const checklistComplete = previewChecklistComplete && confirmStatusChecked;
  const canPublish = checklistComplete && !qualityBlocksPublish;
  const seoTitleInfo = summarizeLength(seoTitle.trim().length, 45, 65);
  const seoDescriptionInfo = summarizeLength(seoDescription.trim().length, 120, 160);
  const newGameErrors = useMemo(() => {
    const errors: string[] = [];
    const name = newGameName.trim();
    const slogan = newGameSlogan.trim();
    const shortDescription = newGameShortDescription.trim();
    const about = newGameAbout.trim();
    const heroImage = newGameHeroImage.trim();
    const coverImage = newGameCoverImage.trim();
    const palette = newGamePalette.trim();
    const accent = newGameAccent.trim();
    const price = Number(newGamePrice);

    if (!generatedNewGameId) {
      errors.push('Назва гри обов’язкова: без неї не можна згенерувати ID/slug.');
    }
    if (generatedNewGameId && existingGameIds.has(generatedNewGameId)) {
      errors.push(`ID вже існує: ${generatedNewGameId}`);
    }
    if (generatedNewGameSlug && existingGameSlugs.has(generatedNewGameSlug)) {
      errors.push(`Slug вже існує: ${generatedNewGameSlug}`);
    }
    if (name.length < 2 || name.length > 64) {
      errors.push('Назва гри: від 2 до 64 символів.');
    }
    if (isLikelyPlaceholder(name)) {
      errors.push('Назва гри схожа на placeholder.');
    }
    if (slogan && (slogan.length < 2 || slogan.length > 96)) {
      errors.push('Слоган: від 2 до 96 символів.');
    }
    if (slogan && isLikelyPlaceholder(slogan)) {
      errors.push('Слоган схожий на placeholder.');
    }
    if (shortDescription.length < 10 || shortDescription.length > 260) {
      errors.push('Короткий опис: від 10 до 260 символів.');
    }
    if (isLikelyPlaceholder(shortDescription)) {
      errors.push('Короткий опис схожий на placeholder.');
    }
    if (about && (about.length < 20 || about.length > 1500)) {
      errors.push('Повний опис: від 20 до 1500 символів або залиште пусто.');
    }
    if (about && isLikelyPlaceholder(about)) {
      errors.push('Повний опис схожий на placeholder.');
    }
    if (!Number.isFinite(price) || price < 0) {
      errors.push('Ціна має бути числом >= 0.');
    }
    if (!heroImage || !isValidMediaPath(heroImage)) {
      errors.push('Hero зображення: тільки /images/... або /uploads/...');
    }
    if (coverImage && !isValidMediaPath(coverImage)) {
      errors.push('Обкладинка: тільки /images/... або /uploads/...');
    }
    if (palette && !isValidHexColor(palette)) {
      errors.push('Основний колір має бути у форматі #RRGGBB або #RGB.');
    }
    if (accent && !isValidHexColor(accent)) {
      errors.push('Акцентний колір має бути у форматі #RRGGBB або #RGB.');
    }

    return errors;
  }, [
    newGameName,
    newGameSlogan,
    newGameShortDescription,
    newGameAbout,
    newGamePrice,
    newGameHeroImage,
    newGameCoverImage,
    newGamePalette,
    newGameAccent,
    generatedNewGameId,
    generatedNewGameSlug,
    existingGameIds,
    existingGameSlugs,
  ]);
  const canPrepareNewGame = newGameErrors.length === 0;
  const newGameCard = useMemo(() => {
    if (!canPrepareNewGame) return '';
    return [
      `ID: ${generatedNewGameId}`,
      `Slug: ${generatedNewGameSlug}`,
      `Назва: ${newGameName.trim()}`,
      `Слоган: ${newGameSlogan.trim() || '—'}`,
      `Короткий опис: ${newGameShortDescription.trim()}`,
      `Повний опис: ${newGameAbout.trim() || '—'}`,
      `Статус: ${newGameStatus}`,
      `Ціна: ${newGamePrice}`,
      `Hero: ${newGameHeroImage.trim()}`,
      `Обкладинка: ${newGameCoverImage.trim() || '—'}`,
      `Palette: ${newGamePalette.trim() || '—'}`,
      `Accent: ${newGameAccent.trim() || '—'}`,
    ].join('\n');
  }, [
    canPrepareNewGame,
    generatedNewGameId,
    generatedNewGameSlug,
    newGameName,
    newGameSlogan,
    newGameShortDescription,
    newGameAbout,
    newGameStatus,
    newGamePrice,
    newGameHeroImage,
    newGameCoverImage,
    newGamePalette,
    newGameAccent,
  ]);

  async function copyToClipboard(value: string, successMessage: string) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopyFeedback(successMessage);
      window.setTimeout(() => setCopyFeedback(''), 2200);
    } catch {
      setCopyFeedback('Не вдалося скопіювати. Скопіюйте вручну.');
      window.setTimeout(() => setCopyFeedback(''), 2200);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Портал менеджера контенту</h1>
          <p className="text-slate-600">
            Один портал для всього процесу. Редагування контенту відбувається в Pages CMS, а тут ви керуєте кроками, перевіркою і публікацією.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={() => setMode('basic')}
              className={`px-4 py-3 rounded-xl text-sm font-semibold border ${
                mode === 'basic'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Базовий режим (щоденна робота)
            </button>
            <button
              type="button"
              onClick={() => setMode('full')}
              className={`px-4 py-3 rounded-xl text-sm font-semibold border ${
                mode === 'full'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              Повний режим (100% контенту)
            </button>
          </div>
        </div>

        {mode === 'basic' ? (
          <>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Щоденна робота (4 кроки)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setWizardStep(step as 1 | 2 | 3 | 4)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold border ${
                      wizardStep === step
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    Крок {step}
                  </button>
                ))}
              </div>

              {wizardStep === 1 ? (
                <div className="space-y-3">
                  <p className="text-slate-700">Відкрийте CMS і внесіть зміни в секції <strong>Менеджер (базовий режим)</strong>.</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={pagesCmsUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold">
                      Відкрити CMS
                    </a>
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold"
                    >
                      Далі: перевірка
                    </button>
                  </div>
                </div>
              ) : null}

              {wizardStep === 2 ? (
                <div className="space-y-3">
                  <p className="text-slate-700">Поставте галочки перед preview.</p>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <label className="flex items-start gap-3 text-sm text-slate-800">
                      <input
                        type="checkbox"
                        checked={confirmSavedChecked}
                        onChange={(event) => setConfirmSavedChecked(event.target.checked)}
                        className="mt-0.5"
                      />
                      <span>Я натиснула `Save changes` у CMS.</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-slate-800">
                      <input
                        type="checkbox"
                        checked={confirmPagesChecked}
                        onChange={(event) => setConfirmPagesChecked(event.target.checked)}
                        className="mt-0.5"
                      />
                      <span>Я перевірила головну, ігри та проєкти.</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-slate-800">
                      <input
                        type="checkbox"
                        checked={confirmTextChecked}
                        onChange={(event) => setConfirmTextChecked(event.target.checked)}
                        className="mt-0.5"
                      />
                      <span>Я перевірила тексти, дати та фото.</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href={previewRunUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold">
                      Відкрити Preview
                    </a>
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      disabled={!previewChecklistComplete}
                      className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50"
                    >
                      Далі: фінальна перевірка
                    </button>
                  </div>
                </div>
              ) : null}

              {wizardStep === 3 ? (
                <div className="space-y-3">
                  <p className="text-slate-700">Переконайтеся, що автоматичні перевірки пройшли без помилки.</p>
                  <label className="flex items-start gap-3 text-sm text-slate-800 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      checked={confirmStatusChecked}
                      onChange={(event) => setConfirmStatusChecked(event.target.checked)}
                      className="mt-0.5"
                    />
                    <span>У блоці “Стан перевірок” `Quality Gate` успішний.</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <a href={checksUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold">
                      Відкрити Quality Gate
                    </a>
                    <button
                      type="button"
                      onClick={() => setWizardStep(4)}
                      disabled={!confirmStatusChecked}
                      className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50"
                    >
                      Далі: публікація
                    </button>
                  </div>
                </div>
              ) : null}

              {wizardStep === 4 ? (
                <div className="space-y-3">
                  <p className="text-slate-700">Фінальний крок: відкрийте вікно публікації та оберіть Preview або Publish.</p>
                  <button
                    type="button"
                    onClick={() => setDecisionOpen(true)}
                    disabled={!checklistComplete}
                    className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold disabled:opacity-50"
                  >
                    Відкрити вікно публікації
                  </button>
                  <p className="text-xs text-slate-500">
                    Якщо кнопка неактивна, поверніться до попередніх кроків і завершіть чекліст.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Швидка перевірка сайту</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/igry" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold">
                  Перевірити каталог ігор
                </Link>
                <Link href="/kik/proekty" className="px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold">
                  Перевірити проєкти KIK
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setMode('full')}
                className="mt-4 px-4 py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold"
              >
                Перейти в Повний режим (100% контенту)
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Повний режим (100% редагування)</h2>
              <p className="text-sm text-slate-600 mb-4">
                Редагування всіх текстів і фото виконується в Pages CMS. Тут ви обираєте потрібну категорію і переходите в CMS.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFullTab('editing')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold border ${
                    fullTab === 'editing'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  100% Редагування
                </button>
                <button
                  type="button"
                  onClick={() => setFullTab('quality')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold border ${
                    fullTab === 'quality'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Контроль якості
                </button>
                <button
                  type="button"
                  onClick={() => setFullTab('tools')}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold border ${
                    fullTab === 'tools'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Додаткові інструменти
                </button>
              </div>
            </div>

            {fullTab === 'editing' ? (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Де редагується 100% контенту</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900 mb-1">Менеджер (базовий режим)</p>
                    <p className="text-sm text-slate-600">Щоденний контент: назви, описи, статуси, фото, оновлення ігор/проєктів.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900 mb-1">Адмін (розширений режим)</p>
                    <p className="text-sm text-slate-600">Детальні поля товарів і проєктів, які рідко змінюються.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900 mb-1">Основний контент сайту (`siteContent`)</p>
                    <p className="text-sm text-slate-600">Тексти блоків бренду, сторінок, контактів, CTA.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900 mb-1">UI тексти (`uiContent`)</p>
                    <p className="text-sm text-slate-600">Кнопки, підписи, мета-тексти, системні повідомлення.</p>
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-800">
                    Так, редагування 100% текстового та фото-контенту доступне через ці секції в CMS.
                  </p>
                </div>
                <a href={pagesCmsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold">
                  Відкрити Pages CMS
                </a>
              </div>
            ) : null}

            {fullTab === 'quality' ? (
              <>
                <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Стан перевірок</h3>
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
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Останні зміни контенту</h3>
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

                <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Фінальна публікація</h3>
                  <button
                    type="button"
                    onClick={() => setDecisionOpen(true)}
                    className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold"
                  >
                    Відкрити вікно публікації
                  </button>
                </div>
              </>
            ) : null}

            {fullTab === 'tools' ? (
              <>
                <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Додати нову гру безпечно</h3>
                  <p className="text-sm text-slate-600">
                    Заповніть мінімальні поля. Система перевірить контент, згенерує `id/slug` і дасть готову картку значень.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newGameName}
                      onChange={(event) => setNewGameName(event.target.value)}
                      placeholder="Назва гри"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                    <input
                      type="text"
                      value={newGameSlogan}
                      onChange={(event) => setNewGameSlogan(event.target.value)}
                      placeholder="Слоган (опціонально)"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  <textarea
                    value={newGameShortDescription}
                    onChange={(event) => setNewGameShortDescription(event.target.value)}
                    placeholder="Короткий опис (10-260 символів)"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[96px]"
                  />
                  <textarea
                    value={newGameAbout}
                    onChange={(event) => setNewGameAbout(event.target.value)}
                    placeholder="Повний опис (опціонально, 20-1500 символів)"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[96px]"
                  />

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newGameHeroImage}
                      onChange={(event) => setNewGameHeroImage(event.target.value)}
                      placeholder="Hero image, напр. /uploads/games/new-game-hero.webp"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                    <input
                      type="text"
                      value={newGameCoverImage}
                      onChange={(event) => setNewGameCoverImage(event.target.value)}
                      placeholder="Cover image (опціонально)"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="grid sm:grid-cols-4 gap-3">
                    <select
                      value={newGameStatus}
                      onChange={(event) => setNewGameStatus(event.target.value as 'announcement' | 'production' | 'preorder' | 'onsale')}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
                    >
                      <option value="announcement">announcement</option>
                      <option value="production">production</option>
                      <option value="preorder">preorder</option>
                      <option value="onsale">onsale</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      value={newGamePrice}
                      onChange={(event) => setNewGamePrice(event.target.value)}
                      placeholder="Ціна"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                    <input
                      type="text"
                      value={newGamePalette}
                      onChange={(event) => setNewGamePalette(event.target.value)}
                      placeholder="Palette #RRGGBB"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                    <input
                      type="text"
                      value={newGameAccent}
                      onChange={(event) => setNewGameAccent(event.target.value)}
                      placeholder="Accent #RRGGBB"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
                      <p className="text-xs text-slate-500 mb-1">Авто ID</p>
                      <p className="font-mono text-slate-900">{generatedNewGameId || '—'}</p>
                    </div>
                    <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-3">
                      <p className="text-xs text-slate-500 mb-1">Авто Slug</p>
                      <p className="font-mono text-slate-900">{generatedNewGameSlug || '—'}</p>
                    </div>
                  </div>

                  <div className={`rounded-xl border px-4 py-3 ${canPrepareNewGame ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                    <p className={`font-semibold mb-2 ${canPrepareNewGame ? 'text-emerald-800' : 'text-rose-800'}`}>
                      {canPrepareNewGame ? 'Готово: можна додавати гру в CMS.' : 'Виправте перед додаванням:'}
                    </p>
                    {canPrepareNewGame ? (
                      <p className="text-sm text-emerald-800">Валідація пройдена. Дублів ID/slug не знайдено.</p>
                    ) : (
                      <ul className="list-disc pl-5 text-sm text-rose-800 space-y-1">
                        {newGameErrors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-900">Як додати гру в CMS без ризику:</p>
                    <p className="text-sm text-slate-700">1. Додайте запис у `Адмін (розширений режим) → Ігри (товари)`.</p>
                    <p className="text-sm text-slate-700">2. Додайте запис у `Менеджер (базовий режим) → Ігри (базово)` з тим самим ID.</p>
                    <p className="text-sm text-slate-700">3. Скопіюйте авто `ID` і `Slug` звідси, не придумуйте вручну.</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(generatedNewGameId, 'ID скопійовано')}
                      disabled={!generatedNewGameId}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-800 disabled:opacity-50"
                    >
                      Скопіювати ID
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(generatedNewGameSlug, 'Slug скопійовано')}
                      disabled={!generatedNewGameSlug}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-slate-800 disabled:opacity-50"
                    >
                      Скопіювати Slug
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyToClipboard(newGameCard, 'Картку значень скопійовано')}
                      disabled={!canPrepareNewGame}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white disabled:opacity-50"
                    >
                      Скопіювати картку значень
                    </button>
                  </div>
                  {copyFeedback ? <p className="text-xs text-slate-600">{copyFeedback}</p> : null}
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">SEO-помічник для тексту</h3>
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
                  <h3 className="text-lg font-bold text-slate-900">Slug генератор і превʼю метаданих</h3>
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
              </>
            ) : null}
          </>
        )}
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
                  checked={confirmSavedChecked}
                  onChange={(event) => setConfirmSavedChecked(event.target.checked)}
                  className="mt-0.5"
                />
                <span>Я натиснула `Save changes` у CMS.</span>
              </label>
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
                : qualityStateUnknown
                  ? 'Публікація заблокована: не вдалося отримати статус Quality Gate.'
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
