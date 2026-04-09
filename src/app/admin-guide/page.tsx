'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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

export default function AdminGuidePage() {
  const [gameName, setGameName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [customDescription, setCustomDescription] = useState('');

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
            У CMS працюйте переважно в секції <strong>Менеджер (базовий режим)</strong>.
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
