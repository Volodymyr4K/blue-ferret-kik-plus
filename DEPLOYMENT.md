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

## API endpoints

- `POST /api/mono/invoice` — створення рахунку для оплати
- `POST /api/mono/webhook` — webhook для Mono (налаштувати в кабінеті Monobank)

## Webhook (Mono)

У кабінеті [web.monobank.ua](https://web.monobank.ua) вкажіть URL:
```
https://ваш-домен.com/api/mono/webhook
```

## Структура даних (для інтеграції з CMS)

- **Ігри**: `src/data/games.ts` — можна замінити на API
- **Проєкти KIK**: `src/data/projects.ts` — можна замінити на API
- **Контент сайту**: `src/data/site-content.ts` — можна замінити на API

## Production build

```bash
npm run build
```

Вихід: `.next/` — готовий до деплою на Vercel, Node.js сервер тощо.

Для статичного експорту (опційно) — потрібна додаткова конфігурація, оскільки є динамічні маршрути (`/igry/[slug]`) та API.
