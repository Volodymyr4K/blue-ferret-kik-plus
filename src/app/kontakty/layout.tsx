import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакти | Blue Ferret',
  description: 'Зв\'яжіться з Blue Ferret — видавництвом настільних ігор',
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
