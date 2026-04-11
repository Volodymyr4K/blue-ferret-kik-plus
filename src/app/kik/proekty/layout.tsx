import { Metadata } from 'next';
import uiContent from '@/data/ui-content';

export const metadata: Metadata = {
  title: uiContent.metadata.kikProjectsTitle,
  description: uiContent.metadata.kikProjectsDescription,
  alternates: {
    canonical: '/kik/proekty/',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
