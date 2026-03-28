import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blueferret.com.ua'),
  title: "Blue Ferret | Незалежне видавництво настільних ігор",
  description: "Blue Ferret — незалежне видавництво настільних ігор. Грайливий, авторський, теплий стиль. Для настільних гравців. KIK вдома — платформа підтримки авторських проєктів.",
  icons: {
    icon: "/logo-blue-ferret.png",
    apple: "/logo-blue-ferret.png",
  },
  openGraph: {
    title: "Blue Ferret | Настільні ігри",
    description: "Незалежне видавництво настільних ігор. Грайливий, авторський, теплий стиль для настільних гравців.",
    images: ["/logo-blue-ferret.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
