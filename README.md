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
```

## Дизайн-система (з ТЗ)

- **Blue Ferret**: #009FE3
- **KIK вдома**: #4BB272
- **Сторінка гри**: #283D57

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Статичний export у папку out/ для GitHub Pages
npm run check    # Повна перевірка: content schema + typecheck + lint + build
```

## CMS-ready структура

Контент зберігається у JSON-файлах:

- `src/content/games.json` — ігри (товари)
- `src/content/projects.json` — проєкти KIK
- `src/content/site-content.json` — тексти та блоки сайту
- `src/content/ui-content.json` — UI-тексти сторінок і компонентів

Файли `src/data/*.ts` є адаптерами типів для фронтенду.

## Етапи гри

Кожна гра має 4 етапи: Анонс → Виробництво → Передзамовлення → У вільному продажі.  
Заблоковані етапи візуально затемнені з іконкою замка.

## Деплой на GitHub Pages

- У репозиторії є workflow: `.github/workflows/deploy-pages.yml`
- Після push у `main` сайт автоматично деплоїться у GitHub Pages
- Кастомний домен: `blueferret.com.ua` (файл `public/CNAME`)

## Адмінка (Pages CMS)

- Конфігурація CMS: `.pages.yml`
- Медіа-uploads: `public/uploads/*`
- Контент для редагування:
  - `src/content/games.json`
  - `src/content/projects.json`
  - `src/content/site-content.json`

Підключення:

1. Відкрити `https://app.pagescms.org`
2. Увійти через GitHub і вибрати репозиторій `Volodymyr4K/blue-ferret-kik-plus`
3. Редагувати контент у секціях `Каталог` і `Сайт`
4. Після commit у `main` GitHub Actions автоматично задеплоїть оновлення

## Quality/Security Gate

- Валідація контенту (strict schema): `npm run validate:content`
- Типи: `npm run typecheck`
- Лінт: `npm run lint`
- CI workflow:
  - `.github/workflows/quality.yml`
  - `.github/workflows/security-audit.yml`
- Dependabot увімкнено: `.github/dependabot.yml`

## Обов'язкові GitHub налаштування (ручні)

У `Settings → Branches → Branch protection rules` для `main`:
1. Увімкнути `Require a pull request before merging`
2. Увімкнути `Require approvals` (мінімум 1)
3. Увімкнути `Require status checks to pass` і вибрати `Quality Gate`
4. Увімкнути `Dismiss stale pull request approvals when new commits are pushed`
5. Увімкнути `Do not allow bypassing the above settings`

## Важливо про оплату (Mono)

GitHub Pages — це лише статичний хостинг, тому API-роути для Mono у `src/app/api/*` вимкнено для цього деплою.
Заготовки серверної логіки збережені в `src/server/mono/*` для майбутнього переносу на серверний хостинг.

Додатково встановлено прапорець безпеки:
- `NEXT_PUBLIC_ENABLE_PAYMENTS=false` (за замовчуванням)
- якщо прапорець не `true`, UI-кнопки і API-створення інвойсу повертають контрольовану помилку.
