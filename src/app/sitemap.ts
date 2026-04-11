import type { MetadataRoute } from 'next';
import games from '@/data/games';
import projects from '@/data/projects';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueferret.com.ua';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/igry/',
    '/kik/',
    '/kik/pro-kik/',
    '/kik/proekty/',
    '/kontakty/',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${siteUrl}/igry/${game.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => [
    {
      url: `${siteUrl}/kik/proekty/${project.id}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/kik/proekty/${project.id}/pidtrymaty/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]);

  return [...staticRoutes, ...gameRoutes, ...projectRoutes];
}
