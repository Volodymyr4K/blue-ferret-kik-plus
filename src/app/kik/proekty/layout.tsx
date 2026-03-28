import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Проєкти | KIK вдома',
  description: 'Каталог авторських проєктів платформи KIK вдома',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
