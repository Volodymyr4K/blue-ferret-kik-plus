import { Metadata } from 'next';
import uiContent from '@/data/ui-content';
import KikNav from '@/components/KikNav';

export const metadata: Metadata = {
  title: uiContent.metadata.kikTitle,
  description: uiContent.metadata.kikDescription,
  alternates: {
    canonical: '/kik/',
  },
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
