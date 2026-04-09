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

const staticRoutes = new Set([
  '/',
  '/igry',
  '/kik',
  '/kik/pro-kik',
  '/kik/proekty',
  '/kontakty',
  '/admin-guide',
]);

for (const game of games) {
  staticRoutes.add(`/igry/${game.slug}`);
}

for (const project of projects) {
  staticRoutes.add(`/kik/proekty/${project.id}`);
  staticRoutes.add(`/kik/proekty/${project.id}/pidtrymaty`);
}

const errors: string[] = [];
const links: Array<{ label: string; value: string }> = [];

for (const game of games) {
  links.push({ label: `game:${game.id}:slug`, value: `/igry/${game.slug}` });
  for (const [stage, stageData] of Object.entries(game.stages)) {
    if (stageData.ctaLink) {
      links.push({ label: `game:${game.id}:stage:${stage}`, value: stageData.ctaLink });
    }
  }
}

for (const project of projects) {
  links.push({ label: `project:${project.id}:link`, value: project.link });
}

if (site.contacts.social.instagram) {
  links.push({ label: 'site:contacts:instagram', value: site.contacts.social.instagram });
}
if (site.contacts.social.facebook) {
  links.push({ label: 'site:contacts:facebook', value: site.contacts.social.facebook });
}
if (site.contacts.social.telegram) {
  links.push({ label: 'site:contacts:telegram', value: site.contacts.social.telegram });
}

for (const pillar of site.pillars ?? []) {
  links.push({ label: `site:pillar:${pillar.title}`, value: pillar.href });
}
for (const pillar of ui.home.fallbackPillars) {
  links.push({ label: `ui:fallbackPillar:${pillar.title}`, value: pillar.href });
}

function validateInternalPath(label: string, value: string) {
  if (!value.startsWith('/')) {
    errors.push(`${label}: internal link must start with "/" (${value})`);
    return;
  }
  if (value.startsWith('//')) {
    errors.push(`${label}: protocol-relative link is not allowed (${value})`);
    return;
  }
  if (/\s/.test(value)) {
    errors.push(`${label}: spaces are not allowed in URL (${value})`);
    return;
  }
  if (!staticRoutes.has(value)) {
    errors.push(`${label}: route does not exist in known site map (${value})`);
  }
}

function validateExternalUrl(label: string, value: string) {
  try {
    const parsed = new URL(value);
    if (!['https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      errors.push(`${label}: unsupported protocol ${parsed.protocol} (${value})`);
    }
    if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && !parsed.hostname) {
      errors.push(`${label}: URL missing hostname (${value})`);
    }
  } catch {
    errors.push(`${label}: invalid URL (${value})`);
  }
}

for (const link of links) {
  const value = link.value.trim();
  if (!value) {
    errors.push(`${link.label}: empty link value`);
    continue;
  }
  if (value === '#') {
    continue;
  }
  if (value.startsWith('/')) {
    validateInternalPath(link.label, value);
  } else {
    validateExternalUrl(link.label, value);
  }
}

if (errors.length > 0) {
  throw new Error(`Link validation failed:\n${errors.join('\n')}`);
}

console.log(`Link validation passed: ${links.length} links checked.`);
