import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Портал менеджера контенту',
  description: 'Службова сторінка для менеджера контенту.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: '/admin-guide/',
  },
};

export default function AdminGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
