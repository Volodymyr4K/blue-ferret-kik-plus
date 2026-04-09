import fs from 'node:fs';
import path from 'node:path';
import gamesData from '../src/content/games.json';
import projectsData from '../src/content/projects.json';
import siteContentData from '../src/content/site-content.json';
import uiContentData from '../src/content/ui-content.json';
import {
  GamesSchema,
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
const projects = ProjectsSchema.parse(projectsData);
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

const contentPaths = collectPaths({ games, projects, site, ui });
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
