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
npm run build    # Production build (--webpack через баг Turbopack з кирилицею в шляху)
```

## CMS-ready структура

Дані для ігор та проєктів: `src/data/games.ts` та `src/data/projects.ts`.  
Можна замінити на API або JSON з бекенду.

## Етапи гри

Кожна гра має 4 етапи: Анонс → Виробництво → Передзамовлення → У вільному продажі.  
Заблоковані етапи візуально затемнені з іконкою замка.

## Платіжна система (Plata by Mono)

Інтегровано **Plata by Mono** (Monobank еквайринг) для оплати картками Visa/Mastercard.

**Налаштування:**
1. Скопіюйте `.env.example` → `.env`
2. Додайте `MONO_API_TOKEN` — токен з [api.monobank.ua](https://api.monobank.ua/) (тест) або [web.monobank.ua](https://web.monobank.ua/) (продакшн)
3. Для продакшн — налаштуйте webhook URL у кабінеті Mono: `https://your-site.com/api/mono/webhook`

**Як працює:**

- У модальному вікні замовлення (кнопка «ПРИДБАТИ» на сторінці гри) з’являється кнопка «Оплатити через Mono»
- Після натискання створюється рахунок і користувач перенаправляється на сторінку оплати Mono
- Після успішної оплати — редірект на `/igry?payment=success` з повідомленням

**Потрібно:** додати поле `price` (грн) до ігор у `src/data/games.ts`.
