import { Metadata } from 'next';
import KikNav from '@/components/KikNav';

export const metadata: Metadata = {
  title: 'KIK вдома | Blue Ferret',
  description: 'KIK вдома — платформа підтримки авторських настільних ігор',
};

export default function KikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <KikNav />
      <main>{children}</main>
    </div>
  );
}
