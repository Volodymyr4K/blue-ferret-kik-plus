# Інструкція для деплою (Cloudflare Pages)

## 1) Що деплоїмо

Проєкт зібраний як статичний експорт Next.js (`output: export`), тому для продакшену використовуємо Cloudflare Pages.

Результат збірки: папка `out/`.

## 2) Налаштування в Cloudflare (одноразово)

1. Відкрити Cloudflare Dashboard → `Workers & Pages`.
2. Натиснути `Create` → `Pages` → `Connect to Git`.
3. Підключити GitHub-репозиторій `Volodymyr4K/blue-ferret-kik-plus`.
4. Для проєкту Pages вказати:
   - Production branch: `main`
   - Build command: `npm ci && npm run check`
   - Build output directory: `out`
5. Додати environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://blueferret.com.ua`
6. У вкладці `Custom domains` додати `blueferret.com.ua`.

## 3) Поточний процес релізу

1. Менеджер вносить зміни через Pages CMS.
2. Після перевірки публікує зміни.
3. Cloudflare автоматично робить production deploy з `main`.

## 4) Що вже налаштовано в репозиторії

- `.github/workflows/quality.yml` — quality gate (валідації + typecheck + lint + build).
- `.github/workflows/staging-preview.yml` — preview build-артефакт для staging/PR.
- `.github/workflows/deploy-pages.yml` — legacy workflow для GitHub Pages, залишений лише як manual fallback.

## 5) Важливо про оплату (відкладено)

Оплата зараз вимкнена (`NEXT_PUBLIC_ENABLE_PAYMENTS=false`), а API-роути `src/app/api/*` не використовуються в статичному деплої.
Серверна логіка Mono збережена в `src/server/mono/*` для майбутнього серверного хостингу.
