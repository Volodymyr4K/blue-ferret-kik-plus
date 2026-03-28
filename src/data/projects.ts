export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  status: string;
  statusLabel: string;
  raised: number;
  goal: number;
  currency: string;
  lastUpdate: string;
  updatePreview: string;
  coverImage?: string;
  link: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Місто таємниць',
    shortDescription: 'Детективна гра для 2–6 гравців. Розслідуйте злочини, збирайте докази та знаходьте винних. Кожна партія — нова справу.',
    status: 'active',
    statusLabel: 'Збір коштів',
    raised: 67500,
    goal: 120000,
    currency: 'UAH',
    lastUpdate: '2026-03-12',
    updatePreview: 'Завершено друк карток та коробок. Наступний етап — упаковка.',
    coverImage: '/images/placeholder-project.svg',
    link: '/kik/proekty/1',
  },
  {
    id: '2',
    name: 'Острів скарбів',
    shortDescription: 'Пригодницька гра для дітей та дорослих. Шукайте скарби, уникайте пасток та станьте найвідважнішим піратом.',
    status: 'active',
    statusLabel: 'Збір коштів',
    raised: 42000,
    goal: 80000,
    currency: 'UAH',
    lastUpdate: '2026-03-10',
    updatePreview: 'Ілюстрації готові. Початок виробництва — квітень.',
    coverImage: '/images/placeholder-project.svg',
    link: '/kik/proekty/2',
  },
  {
    id: '3',
    name: 'Казковий ліс',
    shortDescription: 'Кооперативна гра для родини. Допоможіть мешканцям лісу подолати темряву. Чарівні ілюстрації та проста механіка.',
    status: 'preparing',
    statusLabel: 'Підготовка',
    raised: 0,
    goal: 95000,
    currency: 'UAH',
    lastUpdate: '2026-03-08',
    updatePreview: 'Тестування механіки. Скоро анонс збору.',
    coverImage: '/images/placeholder-project.svg',
    link: '/kik/proekty/3',
  },
  {
    id: '4',
    name: 'Епоха відкриттів',
    shortDescription: 'Стратегічна гра про великі географічні відкриття. Будьте першим, хто дослідить нові землі та заснує колонії.',
    status: 'preparing',
    statusLabel: 'Анонс',
    raised: 0,
    goal: 150000,
    currency: 'UAH',
    lastUpdate: '2026-03-01',
    updatePreview: 'Концепція та механіка в розробці.',
    coverImage: '/images/placeholder-project.svg',
    link: '/kik/proekty/4',
  },
  {
    id: '5',
    name: 'Кухня шефа',
    shortDescription: 'Напружена гра про змагання кухарів. Збирайте інгредієнти, готуйте страви та перемагайте на кулінарному шоу.',
    status: 'active',
    statusLabel: 'Збір коштів',
    raised: 89000,
    goal: 100000,
    currency: 'UAH',
    lastUpdate: '2026-03-14',
    updatePreview: '89% зібрано! Виробництво розпочнеться на початку квітня.',
    coverImage: '/images/placeholder-project.svg',
    link: '/kik/proekty/5',
  },
  {
    id: '6',
    name: 'Космічна станція',
    shortDescription: 'Кооперативна гра про виживання в космосі. Розподіляйте ресурси, вирішуйте кризи та врятуйте екіпаж.',
    status: 'preparing',
    statusLabel: 'Анонс',
    raised: 0,
    goal: 180000,
    currency: 'UAH',
    lastUpdate: '2026-02-25',
    updatePreview: 'Розробка прототипу. Очікуваний запуск збору — травень.',
    coverImage: '/images/placeholder-project.svg',
    link: '/kik/proekty/6',
  },
];

export default projects;
