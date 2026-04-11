import { Metadata } from 'next';
import uiContent from '@/data/ui-content';

export const metadata: Metadata = {
  title: uiContent.metadata.contactsTitle,
  description: uiContent.metadata.contactsDescription,
  alternates: {
    canonical: '/kontakty/',
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
