export interface GameStage {
  state: 'active' | 'locked' | 'archived' | 'hidden';
  title: string;
  content?: string;
  image?: string;
  lastUpdate?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface GamePassport {
  players?: string;
  duration?: string;
  age?: string;
  author?: string;
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  slogan?: string;
  shortDescription: string;
  aboutGame?: string;
  status: 'announcement' | 'production' | 'preorder' | 'onsale';
  heroImage?: string;
  coverImage?: string;
  palette?: string;
  accent?: string;
  price?: number;
  passport?: GamePassport;
  stages: {
    announcement: GameStage;
    production: GameStage;
    preorder: GameStage;
    onsale: GameStage;
  };
}

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
  support?: ProjectSupportConfig;
}

export interface ProjectSupportTier {
  id: string;
  title: string;
  description: string;
  amount: number;
  featured?: boolean;
  includes?: string[];
}

export interface ProjectSupportConfig {
  minDonation: number;
  defaultDonation: number;
  tiers: ProjectSupportTier[];
}

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
