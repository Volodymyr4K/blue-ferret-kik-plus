# Інструкція для деплою (бекенд)

## Версія: 1.0.0

## Передумови

- Node.js 18+
- npm або yarn

## Швидкий старт

```bash
npm install
cp .env.example .env
# Відредагуйте .env — додайте MONO_API_TOKEN та NEXT_PUBLIC_SITE_URL
npm run build
npm start
```

## Змінні середовища

| Змінна | Опис | Обов'язкова |
|--------|------|-------------|
| `MONO_API_TOKEN` | Токен API Monobank (Plata by Mono) | Так, для оплати |
| `NEXT_PUBLIC_SITE_URL` | Публічний URL сайту (напр. https://blueferret.com.ua) | Так, для webhook і редіректів |
| `NEXT_PUBLIC_ENABLE_PAYMENTS` | Увімкнення онлайн-оплати (`true`/`false`) | Ні, за замовчуванням `false` |

## API endpoints

- `POST /api/mono/invoice` — створення рахунку для оплати
- `POST /api/mono/webhook` — webhook для Mono (налаштувати в кабінеті Monobank)

## Webhook (Mono)

У кабінеті [web.monobank.ua](https://web.monobank.ua) вкажіть URL:
```
https://ваш-домен.com/api/mono/webhook
```

## Структура даних (для інтеграції з CMS)

- **Ігри**: `src/content/games.json`
- **Проєкти KIK**: `src/content/projects.json`
- **Контент сайту**: `src/content/site-content.json`
- **UI-тексти**: `src/content/ui-content.json`

`src/data/*.ts` — адаптери з типами, що читають ці JSON.

## Production build

```bash
npm run validate:content
npm run validate:media
npm run typecheck
npm run lint
npm run build
```

Вихід: `out/` — статичний сайт для GitHub Pages.

Важливо:
- На GitHub Pages API-роути `src/app/api/*` не виконуються.
- Моноплатіжна серверна логіка (`src/server/mono/*`) збережена для майбутнього серверного хостингу.
