import gamesData from '../src/content/games.json';
import gamesBasicData from '../src/content/manager/games-basic.json';
import projectsData from '../src/content/projects.json';
import projectsBasicData from '../src/content/manager/projects-basic.json';
import siteContentData from '../src/content/site-content.json';
import uiContentData from '../src/content/ui-content.json';
import {
  GamesBasicOverridesSchema,
  GamesSchema,
  ProjectsBasicOverridesSchema,
  ProjectsSchema,
  SiteContentSchema,
  UIContentSchema,
} from '../src/lib/content-schemas';

const baseGames = GamesSchema.parse(gamesData);
const gamesBasic = GamesBasicOverridesSchema.parse(gamesBasicData);
const gamesOverridesById = new Map(gamesBasic.map((item) => [item.id, item]));
const games = GamesSchema.parse(
  baseGames.map((item) => {
    const override = gamesOverridesById.get(item.id);
    return override
      ? {
          ...item,
          name: override.name,
          slogan: override.slogan,
          shortDescription: override.shortDescription,
          aboutGame: override.aboutGame,
          status: override.status,
          heroImage: override.heroImage,
          coverImage: override.coverImage,
          price: override.price,
        }
      : item;
  })
);

const baseProjects = ProjectsSchema.parse(projectsData);
const projectsBasic = ProjectsBasicOverridesSchema.parse(projectsBasicData);
const projectsOverridesById = new Map(projectsBasic.map((item) => [item.id, item]));
const projects = ProjectsSchema.parse(
  baseProjects.map((item) => {
    const override = projectsOverridesById.get(item.id);
    return override
      ? {
          ...item,
          name: override.name,
          shortDescription: override.shortDescription,
          status: override.status,
          statusLabel: override.statusLabel,
          raised: override.raised,
          goal: override.goal,
          lastUpdate: override.lastUpdate,
          updatePreview: override.updatePreview,
          coverImage: override.coverImage,
        }
      : item;
  })
);
const site = SiteContentSchema.parse(siteContentData);
const ui = UIContentSchema.parse(uiContentData);

const errors: string[] = [];

function assertMaxLength(label: string, value: string | undefined, max: number) {
  if (!value) return;
  if (value.length > max) {
    errors.push(`${label}: length ${value.length} exceeds max ${max}`);
  }
}

function validateTrimmed(value: unknown, path = 'root') {
  if (typeof value === 'string') {
    if (value !== value.trim()) {
      errors.push(`${path}: has leading or trailing whitespace`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => validateTrimmed(item, `${path}[${index}]`));
    return;
  }

  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      validateTrimmed(nested, `${path}.${key}`);
    }
  }
}

for (const game of games) {
  assertMaxLength(`game:${game.id}:name`, game.name, 64);
  assertMaxLength(`game:${game.id}:slogan`, game.slogan, 96);
  assertMaxLength(`game:${game.id}:shortDescription`, game.shortDescription, 260);
  assertMaxLength(`game:${game.id}:aboutGame`, game.aboutGame, 1500);
  for (const [stage, data] of Object.entries(game.stages)) {
    assertMaxLength(`game:${game.id}:stage:${stage}:title`, data.title, 72);
    assertMaxLength(`game:${game.id}:stage:${stage}:content`, data.content, 2000);
    assertMaxLength(`game:${game.id}:stage:${stage}:ctaText`, data.ctaText, 36);
  }
}

for (const project of projects) {
  assertMaxLength(`project:${project.id}:name`, project.name, 72);
  assertMaxLength(`project:${project.id}:shortDescription`, project.shortDescription, 260);
  assertMaxLength(`project:${project.id}:statusLabel`, project.statusLabel, 36);
  assertMaxLength(`project:${project.id}:updatePreview`, project.updatePreview, 220);
  for (const tier of project.support?.tiers ?? []) {
    assertMaxLength(`project:${project.id}:tier:${tier.id}:title`, tier.title, 64);
    assertMaxLength(`project:${project.id}:tier:${tier.id}:description`, tier.description, 300);
    for (const include of tier.includes ?? []) {
      assertMaxLength(`project:${project.id}:tier:${tier.id}:include`, include, 120);
    }
  }
}

assertMaxLength('site.brand.tagline', site.brand.tagline, 90);
assertMaxLength('site.brand.description', site.brand.description, 320);
assertMaxLength('site.brand.heroDescription', site.brand.heroDescription, 420);
assertMaxLength('site.contacts.intro', site.contacts.intro, 420);
assertMaxLength('site.contacts.partnership', site.contacts.partnership, 600);
assertMaxLength('site.cta.title', site.cta?.title, 90);
assertMaxLength('site.cta.description', site.cta?.description, 320);

assertMaxLength('ui.metadata.siteTitle', ui.metadata.siteTitle, 70);
assertMaxLength('ui.metadata.siteDescription', ui.metadata.siteDescription, 170);
assertMaxLength('ui.metadata.openGraphTitle', ui.metadata.openGraphTitle, 70);
assertMaxLength('ui.metadata.openGraphDescription', ui.metadata.openGraphDescription, 200);
assertMaxLength('ui.errors.notFoundTitle', ui.errors.notFoundTitle, 80);
assertMaxLength('ui.errors.errorTitle', ui.errors.errorTitle, 80);
assertMaxLength('ui.orderModal.title', ui.orderModal.title, 60);

validateTrimmed({ games, projects, site, ui });

if (errors.length > 0) {
  throw new Error(`Copy validation failed:\n${errors.join('\n')}`);
}

console.log('Copy validation passed.');
