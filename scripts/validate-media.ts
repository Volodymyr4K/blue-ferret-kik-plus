import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';
import gamesData from '../src/content/games.json';
import gamesBasicData from '../src/content/manager/games-basic.json';
import projectsData from '../src/content/projects.json';
import projectsBasicData from '../src/content/manager/projects-basic.json';
import siteContentData from '../src/content/site-content.json';
import uiContentData from '../src/content/ui-content.json';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.avif',
]);

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const MIN_UPLOAD_WIDTH = 600;
const MIN_UPLOAD_HEIGHT = 400;

function collectPaths(value: unknown, acc = new Set<string>()): Set<string> {
  if (typeof value === 'string') {
    if (value.startsWith('/images/') || value.startsWith('/uploads/')) {
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

function fail(message: string): never {
  throw new Error(message);
}

const mediaPaths = collectPaths({
  gamesData,
  gamesBasicData,
  projectsData,
  projectsBasicData,
  siteContentData,
  uiContentData,
});

for (const mediaPath of mediaPaths) {
  const extension = path.extname(mediaPath).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
    fail(`Unsupported media extension "${extension}" for ${mediaPath}`);
  }

  const absolutePath = path.join(publicDir, mediaPath);
  if (!fs.existsSync(absolutePath)) {
    fail(`Referenced media file does not exist: ${mediaPath}`);
  }

  const stat = fs.statSync(absolutePath);
  const isUpload = mediaPath.startsWith('/uploads/');
  if (isUpload && stat.size > MAX_FILE_SIZE_BYTES) {
    fail(
      `Media file is too large (${Math.round(stat.size / 1024)} KB): ${mediaPath}. Max: ${
        MAX_FILE_SIZE_BYTES / 1024
      } KB`
    );
  }

  const isSvg = extension === '.svg';
  if (!isUpload || isSvg) continue;

  const dimensions = imageSize(absolutePath);
  if (!dimensions.width || !dimensions.height) {
    fail(`Unable to read image dimensions: ${mediaPath}`);
  }

  if (dimensions.width < MIN_UPLOAD_WIDTH || dimensions.height < MIN_UPLOAD_HEIGHT) {
    fail(
      `Upload image is too small: ${mediaPath} (${dimensions.width}x${dimensions.height}). Minimum: ${MIN_UPLOAD_WIDTH}x${MIN_UPLOAD_HEIGHT}`
    );
  }
}

console.log(`Media validation passed: ${mediaPaths.size} file references checked.`);
