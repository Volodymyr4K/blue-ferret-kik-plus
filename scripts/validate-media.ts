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

const MAX_UPLOAD_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const MAX_PUBLIC_ASSET_BYTES = 25 * 1024 * 1024;
const MIN_UPLOAD_WIDTH = 800;
const MIN_UPLOAD_HEIGHT = 600;

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

function collectPublicFiles(dir: string, acc: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPublicFiles(fullPath, acc);
    } else if (entry.isFile()) {
      acc.push(fullPath);
    }
  }
  return acc;
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
  if (isUpload && stat.size > MAX_UPLOAD_FILE_SIZE_BYTES) {
    fail(
      `Media file is too large (${Math.round(stat.size / 1024)} KB): ${mediaPath}. Max: ${
        MAX_UPLOAD_FILE_SIZE_BYTES / 1024
      } KB`
    );
  }

  const isSvg = extension === '.svg';
  if (isUpload && isSvg) {
    fail(`SVG uploads are not allowed for safety reasons: ${mediaPath}`);
  }
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

const publicFiles = collectPublicFiles(publicDir);
for (const filePath of publicFiles) {
  const stat = fs.statSync(filePath);
  if (stat.size > MAX_PUBLIC_ASSET_BYTES) {
    const relativePath = path.relative(publicDir, filePath);
    fail(
      `Public asset exceeds Cloudflare Pages 25 MiB limit: ${relativePath} (${(
        stat.size /
        1024 /
        1024
      ).toFixed(1)} MiB)`
    );
  }
}

console.log(`Media validation passed: ${mediaPaths.size} file references checked.`);
