import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import games from '@/data/games';
import GamePageClient from './GamePageClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return { title: 'Гра не знайдена' };
  return {
    title: `${game.name} | Blue Ferret`,
    description: game.shortDescription,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  return <GamePageClient game={game} />;
}
