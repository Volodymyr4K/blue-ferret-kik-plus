import fs from 'node:fs';
import path from 'node:path';
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

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function collectPaths(value: unknown, acc = new Set<string>()): Set<string> {
  if (typeof value === 'string') {
    if (value.startsWith('/')) {
      acc.add(value);
    }
    return acc;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectPaths(item, acc));
    return acc;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectPaths(item, acc));
  }

  return acc;
}

const games = GamesSchema.parse(gamesData);
const gamesBasic = GamesBasicOverridesSchema.parse(gamesBasicData);
const projects = ProjectsSchema.parse(projectsData);
const projectsBasic = ProjectsBasicOverridesSchema.parse(projectsBasicData);
const site = SiteContentSchema.parse(siteContentData);
const ui = UIContentSchema.parse(uiContentData);

for (const game of games) {
  const activeStage = game.stages[game.status];
  assert(activeStage.state !== 'hidden', `Game "${game.id}" has hidden active stage`);
}

for (const project of projects) {
  if (project.status === 'active') {
    assert(project.support, `Project "${project.id}" is active but has no support config`);
    assert(
      (project.support?.tiers.length ?? 0) > 0,
      `Project "${project.id}" is active but has no support tiers`
    );
  }
}

const gameIds = new Set(games.map((item) => item.id));
const gameBasicIds = new Set(gamesBasic.map((item) => item.id));
for (const id of gameIds) {
  assert(gameBasicIds.has(id), `Missing manager/basic game override for "${id}"`);
}
for (const id of gameBasicIds) {
  assert(gameIds.has(id), `Orphan manager/basic game override "${id}"`);
}

const projectIds = new Set(projects.map((item) => item.id));
const projectBasicIds = new Set(projectsBasic.map((item) => item.id));
for (const id of projectIds) {
  assert(projectBasicIds.has(id), `Missing manager/basic project override for "${id}"`);
}
for (const id of projectBasicIds) {
  assert(projectIds.has(id), `Orphan manager/basic project override "${id}"`);
}

const contentPaths = collectPaths({ games, gamesBasic, projects, projectsBasic, site, ui });
const missingFiles: string[] = [];

for (const mediaPath of contentPaths) {
  if (
    mediaPath.startsWith('/images/') ||
    mediaPath.startsWith('/uploads/') ||
    mediaPath.startsWith('/sounds/') ||
    mediaPath.startsWith('/fonts/')
  ) {
    const fullPath = path.join(publicDir, mediaPath);
    if (!fs.existsSync(fullPath)) {
      missingFiles.push(mediaPath);
    }
  }
}

assert(missingFiles.length === 0, `Missing media files referenced in content:\n${missingFiles.join('\n')}`);

console.log(
  `Content validation passed: ${games.length} games, ${projects.length} projects, ${
    contentPaths.size
  } path references checked.`
);
