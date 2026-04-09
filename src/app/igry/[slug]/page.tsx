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
  return {
    title: uiContent.metadata.gameTitleTemplate.replace('{name}', game.name),
    description: game.shortDescription,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  return <GamePageClient game={game} />;
}
