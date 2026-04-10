# Blue Ferret / KIK вдома

Сайт видавництва настільних ігор Blue Ferret та платформи KIK вдома. Зроблено за технічним завданням.

## Технології

- **Next.js 16** — React-фреймворк
- **TypeScript** — типізація
- **Tailwind CSS** — стилі
- **Motion** — анімації
- **Lucide React** — іконки

## Структура

```
/                    — Головна Blue Ferret
/igry                — Каталог ігор
/igry/[slug]         — Сторінка окремої гри (з етапами)
/kik                 — KIK вдома (Про КІК)
/kik/proekty         — Проєкти платформи
/kontakty            — Контакти
/admin-guide         — Портал менеджера контенту
```

## Дизайн-система (з ТЗ)

- **Blue Ferret**: #009FE3
- **KIK вдома**: #4BB272
- **Сторінка гри**: #283D57

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Статичний export у папку out/ для Cloudflare Pages
npm run check    # Повна перевірка: content schema + typecheck + lint + build
```

## CMS-ready структура

Контент зберігається у JSON-файлах:

- `src/content/games.json` — ігри (товари)
- `src/content/projects.json` — проєкти KIK
- `src/content/manager/games-basic.json` — базові менеджерські поля для ігор
- `src/content/manager/projects-basic.json` — базові менеджерські поля для проєктів
- `src/content/site-content.json` — тексти та блоки сайту
- `src/content/ui-content.json` — UI-тексти сторінок і компонентів

Файли `src/data/*.ts` є адаптерами типів для фронтенду.

## Етапи гри

Кожна гра має 4 етапи: Анонс → Виробництво → Передзамовлення → У вільному продажі.  
Заблоковані етапи візуально затемнені з іконкою замка.

## Деплой на Cloudflare Pages

Рекомендований прод-деплой для цього проєкту: **Cloudflare Pages** (статичний сайт без серверів).

Базові налаштування в Cloudflare:
1. `Workers & Pages` → `Create` → `Pages` → `Connect to Git`
2. Репозиторій: `Volodymyr4K/blue-ferret-kik-plus`
3. Production branch: `main`
4. Build command: `npm ci && npm run check`
5. Build output directory: `out`
6. Environment variable: `NEXT_PUBLIC_SITE_URL=https://blueferret.com.ua`
7. Додати custom domain: `blueferret.com.ua`

Після цього Cloudflare буде автоматично деплоїти `main`, а для pull request/branch створювати preview deployments.

## Адмінка (Pages CMS)

- Конфігурація CMS: `.pages.yml`
- Медіа-uploads: `public/uploads/*`
- Контент для редагування:
  - `src/content/games.json`
  - `src/content/projects.json`
  - `src/content/site-content.json`
  - `src/content/ui-content.json`

`site-content` та `ui-content` налаштовано як структуровані форми (без raw JSON) для безпечнішого редагування менеджером.

Підключення:

1. Відкрити `https://app.pagescms.org`
2. Увійти через GitHub і вибрати репозиторій `Volodymyr4K/blue-ferret-kik-plus`
3. Редагувати контент переважно в секції `Менеджер (базовий режим)`
4. Натиснути `Save changes` у CMS
5. Перейти на `/admin-guide` і натиснути `Я зберегла зміни`
6. У вікні вибрати: `Переглянути Preview` або `Опублікувати` (після чекліста та зеленого Quality Gate)

Для менеджера доступна сторінка-помічник: `/admin-guide` (slug/metadata підказки + швидкі посилання).
На ній також є live-блок `Стан перевірок` (Quality Gate + Staging Preview).
У CMS є два режими:
- `Менеджер (базовий режим)` — покриває весь щоденний менеджерський контент (ігри, проєкти, тексти сайту/UI)
- `Адмін (розширений режим)` — детальні технічні поля

## Quality/Security Gate

- Валідація контенту (strict schema): `npm run validate:content`
- Типи: `npm run typecheck`
- Лінт: `npm run lint`
- Валідація медіа/лінків/copy-лімітів:
  - `npm run validate:media`
  - `npm run validate:links`
  - `npm run validate:copy`
- Smoke-тест зібраного сайту:
  - `npm run smoke`
- CI workflow:
  - `.github/workflows/quality.yml`
  - `.github/workflows/security-audit.yml`
  - `.github/workflows/staging-preview.yml`
  - `.github/workflows/rollback-main.yml`
- Dependabot увімкнено: `.github/dependabot.yml`
- Шаблон PR для контенту: `.github/pull_request_template.md`
- Runbook для менеджера: `RUNBOOK.md`
- Шаблон інцидентів: `.github/ISSUE_TEMPLATE/content-incident.yml`

## Обов'язкові GitHub налаштування (ручні)

У `Settings → Branches → Branch protection rules` для `main`:
1. Увімкнути `Require a pull request before merging`
2. Увімкнути `Require approvals` (мінімум 1)
3. Увімкнути `Require status checks to pass` і вибрати `Quality Gate`
4. Увімкнути `Dismiss stale pull request approvals when new commits are pushed`
5. Увімкнути `Do not allow bypassing the above settings`

## Важливо про оплату (Mono)

Cloudflare Pages у цій конфігурації працює як статичний хостинг, тому API-роути для Mono у `src/app/api/*` вимкнено для цього деплою.
Заготовки серверної логіки збережені в `src/server/mono/*` для майбутнього переносу на серверний хостинг.

Додатково встановлено прапорець безпеки:
- `NEXT_PUBLIC_ENABLE_PAYMENTS=false` (за замовчуванням)
- якщо прапорець не `true`, UI-кнопки і API-створення інвойсу повертають контрольовану помилку.
