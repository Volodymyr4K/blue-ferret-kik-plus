export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    heroSubtitle: string;
    heroDescription: string;
    brandWords?: string[];
    antiWords?: string[];
  };
  kik: {
    name: string;
    tagline: string;
    description: string;
    proKik?: {
      intro: string;
      story: string;
      benefit: string;
      trust: string;
    };
  };
  nav: { blueFerret: string[]; kik: string[] };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    paragraph2: string;
    paragraph3: string;
  };
  /** Cult of the Lamb style: 3 feature pillars */
  pillars?: { title: string; description: string; href: string; icon: string }[];
  testimonial?: { quote: string; author: string; role?: string }[];
  values: { title: string; items: { title: string; description: string }[] };
  approach: { title: string; items: string[] };
  contacts: {
    email: string;
    phone: string;
    address: string;
    intro: string;
    partnership: string;
    social: { instagram: string; facebook: string; telegram: string };
  };
  cta?: { title: string; subtitle: string; description: string };
}

const siteContent: SiteContent = {
  brand: {
    name: 'Blue Ferret',
    tagline: 'Незалежне видавництво настільних ігор',
    description: 'Blue Ferret — це незалежне видавництво настільних ігор із власною інтонацією. Теплий, авторський і грайливий стиль.',
    heroSubtitle: 'Місце, де мрії збуваються',
    heroDescription: 'Ми створюємо настільні ігри, які варто відкрити — з любов\'ю до деталей, авторським почерком та атмосферою, що залишається з вами після партії.',
    /** З опитувальника: playful, artisan, warm, tactile | anti-generic, anti-corporate | aud: boardgamers */
    brandWords: ['грайливий', 'авторський', 'теплий', 'тактильний'],
    antiWords: ['не шаблонний', 'не корпоративний'],
  },
  kik: {
    name: 'KIK вдома',
    tagline: 'Платформа підтримки авторських проєктів',
    description: 'Зрозумілий та прозорий спосіб підтримувати авторські настільні ігри. Тут збираються проєкти з різними історіями та цілями — ви можете обрати те, що резонує з вами, і стати частиною історії гри.',
    proKik: {
      intro: 'KIK вдома — це зрозумілий та свій спосіб підтримувати цікаві авторські настільні ігри.',
      story: 'Це окремий підпростір усередині Blue Ferret. Тут ми представляємо авторські проєкти настільних ігор, які потребують підтримки спільноти. Це не лише показ однієї гри — це платформа, де можна знайти різноманітні проєкти, побачити їхній статус, зібрану суму та оновлення.',
      benefit: 'Ми віримо, що кожен цікавий проєкт вартий уваги. KIK вдома — це спосіб зробити підтримку авторських ігор зручною та прозорою. Просто, зрозуміло, без зайвого шуму.',
      trust: 'Чому можна довіряти? Тому що ми самі — незалежне видавництво. Ми знаємо, як важлива прозорість на кожному етапі. Кожен проєкт має свою історію, ціль і відкритий статус.',
    },
  },
  about: {
    title: 'Хто ми',
    subtitle: 'Місце, де мрії збуваються',
    intro: 'Blue Ferret — це не просто видавництво. Це простір, де настільні ігри народжуються з любов\'ю до гри та перетворюють мрії на живі історії за столом.',
    paragraph2: 'Ми віримо, що кожна гра — це світ. Світ з власними правилами, історією та емоціями. Наша місія — створювати ігри, які варто відкрити знову і знову: для настільних гравців, родини, друзів.',
    paragraph3: 'Від ідеї до коробки — ми контролюємо кожен етап. Авторський підхід, тактильна якість компонентів і тепла атмосфера — те, що робить наші ігри особливими.',
  },
  values: {
    title: 'Наші цінності',
    items: [
      { title: 'Авторськість', description: 'Кожна гра — унікальний проєкт з власним голосом. Ручна робота, не шаблон. Ми створюємо світи, а не копіюємо.' },
      { title: 'Якість', description: 'Від ілюстрацій до картону — тактильна якість, яку відчуваєш. Матеріали та виробництво, яким довіряємо.' },
      { title: 'Атмосфера', description: 'Гра має відчуватися. Тепло, характер, емоції — те, що залишається після партії. Грайливий дух.' },
      { title: 'Честність', description: 'Прозорість на всіх етапах. Без корпоративного шуму — говоримо як є про терміни, процес, ідеї.' },
    ],
  },
  approach: {
    title: 'Наш підхід',
    items: [
      'Кожна гра проходить повний цикл: від концепції до виробництва',
      'Тісна співпраця з авторами та ілюстраторами',
      'Тестування та доопрацювання перед випуском',
      'Увага до деталей у дизайні та компонентах',
    ],
  },
  nav: {
    blueFerret: ['Головна', 'Наші ігри', 'Контакти', 'KIK вдома'],
    kik: ['Про КІК', 'Проєкти'],
  },
  contacts: {
    email: 'hello@blueferret.com.ua',
    phone: '+380 XX XXX XX XX',
    address: 'Україна',
    intro: 'Ми відкриті до співпраці, запитів щодо проєктів, партнерств та замовлень. Напишіть нам — відповімо в найближчий час.',
    partnership: 'Маєте ідею гри або хочете обговорити співпрацю? Ми завжди відкриті до цікавих пропозицій та нових авторів. Пропонуємо авторські ігри, ілюстрації, механіки — разом створимо щось особливе.',
    social: {
      instagram: 'https://instagram.com/blueferret',
      facebook: 'https://facebook.com/blueferret',
      telegram: 'https://t.me/blueferret_game',
    },
  },
  cta: {
    title: 'Готові відкрити новий світ?',
    subtitle: 'Відкрийте світ настільних ігор',
    description: 'Досліджуйте наші ігри, підтримуйте авторські проєкти на KIK вдома — або просто напишіть нам.',
  },
  pillars: [
    { title: 'Створюйте світи', description: 'Від ідеї до коробки — ми контролюємо кожен етап. Якість, характер і «ручність», яка робить наші ігри особливими.', href: '/igry', icon: 'sparkles' },
    { title: 'Відкривайте ігри', description: 'Каталог настільних ігор Blue Ferret. Кожна гра — окремий світ мрій, механік та атмосфери.', href: '/igry', icon: 'gamepad' },
    { title: 'Об\'єднуйте гравців', description: 'KIK вдома — платформа підтримки авторських проєктів. Підтримуйте цікаві ігри та станьте частиною їхньої історії.', href: '/kik', icon: 'heart' },
  ],
  testimonial: [
    { quote: 'Кожна гра — це світ з власними правилами та емоціями. Blue Ferret створює ігри, які варто відкрити знову і знову.', author: 'Гравець', role: 'відгук' },
  ],
};

export default siteContent;
