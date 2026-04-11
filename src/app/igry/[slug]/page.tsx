import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import games from '@/data/games';
import uiContent from '@/data/ui-content';
import GamePageClient from './GamePageClient';

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return { title: uiContent.metadata.gameNotFoundTitle };

  const canonical = `/igry/${game.slug}/`;

  return {
    title: uiContent.metadata.gameTitleTemplate.replace('{name}', game.name),
    description: game.shortDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: uiContent.metadata.gameTitleTemplate.replace('{name}', game.name),
      description: game.shortDescription,
      url: canonical,
      type: 'article',
      images: game.coverImage ? [game.coverImage] : ['/logo-blue-ferret.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: uiContent.metadata.gameTitleTemplate.replace('{name}', game.name),
      description: game.shortDescription,
      images: game.coverImage ? [game.coverImage] : ['/logo-blue-ferret.png'],
    },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  return <GamePageClient game={game} />;
}
