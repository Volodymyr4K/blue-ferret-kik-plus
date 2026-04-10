import fs from 'node:fs';
import path from 'node:path';
import gamesData from '../src/content/games.json';
import gamesBasicData from '../src/content/manager/games-basic.json';
import projectsData from '../src/content/projects.json';
import projectsBasicData from '../src/content/manager/projects-basic.json';
import {
  GamesBasicOverridesSchema,
  GamesSchema,
  ProjectsBasicOverridesSchema,
  ProjectsSchema,
} from '../src/lib/content-schemas';

const outDir = path.join(process.cwd(), 'out');

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readHtml(routePath: string) {
  const normalized = routePath === '/' ? '/index.html' : `${routePath.replace(/\/$/, '')}/index.html`;
  const filePath = path.join(outDir, normalized);
  assert(fs.existsSync(filePath), `Missing exported file for route: ${routePath} (${normalized})`);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.includes('<html'), `Invalid HTML document for route: ${routePath}`);
  assert(!content.includes('Application error'), `Application error marker found in route: ${routePath}`);
  assert(!content.includes('Unhandled Runtime Error'), `Runtime error marker found in route: ${routePath}`);
  assert(!content.includes('__NEXT_DATA__'), `Unexpected server payload marker in static route: ${routePath}`);
  return content;
}

const baseGames = GamesSchema.parse(gamesData);
const gamesBasic = GamesBasicOverridesSchema.parse(gamesBasicData);
const gamesOverridesById = new Map(gamesBasic.map((item) => [item.id, item]));
const games = GamesSchema.parse(
  baseGames.map((item) => {
    const override = gamesOverridesById.get(item.id);
    return override
      ? {
          ...item,
          slug: override.slug,
          name: override.name,
          slogan: override.slogan,
          shortDescription: override.shortDescription,
          aboutGame: override.aboutGame,
          status: override.status,
          heroImage: override.heroImage,
          coverImage: override.coverImage,
          price: override.price,
          passport: override.passport,
          stages: override.stages,
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
          link: override.link,
          support: override.support,
        }
      : item;
  })
);

const staticRoutes = ['/', '/igry', '/kik', '/kik/pro-kik', '/kik/proekty', '/kontakty', '/admin-guide'];
for (const route of staticRoutes) {
  readHtml(route);
}

for (const game of games) {
  const route = `/igry/${game.slug}`;
  const html = readHtml(route);
  assert(
    html.includes(game.name),
    `Game route does not include game name "${game.name}": ${route}`
  );
}

for (const project of projects) {
  const detailsRoute = `/kik/proekty/${project.id}`;
  const supportRoute = `/kik/proekty/${project.id}/pidtrymaty`;
  const detailsHtml = readHtml(detailsRoute);
  const supportHtml = readHtml(supportRoute);
  assert(
    detailsHtml.includes(project.name),
    `Project route does not include project name "${project.name}": ${detailsRoute}`
  );
  assert(
    supportHtml.includes(project.name),
    `Support route does not include project name "${project.name}": ${supportRoute}`
  );
}

console.log(
  `Smoke test passed: ${staticRoutes.length} static routes, ${games.length} game routes, ${projects.length * 2} project routes.`
);
