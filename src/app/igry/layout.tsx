import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Наші ігри | Blue Ferret',
  description: 'Каталог настільних ігор видавництва Blue Ferret',
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
