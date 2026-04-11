import { Metadata } from 'next';
import uiContent from '@/data/ui-content';

export const metadata: Metadata = {
  title: uiContent.metadata.gamesTitle,
  description: uiContent.metadata.gamesDescription,
  alternates: {
    canonical: '/igry/',
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
