import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import uiContent from "@/data/ui-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blueferret.com.ua';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: uiContent.metadata.siteTitle,
  description: uiContent.metadata.siteDescription,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: uiContent.metadata.openGraphTitle,
    description: uiContent.metadata.openGraphDescription,
    url: siteUrl,
    siteName: 'Blue Ferret',
    locale: 'uk_UA',
    type: 'website',
    images: ["/logo-blue-ferret.png"],
  },
  twitter: {
    card: 'summary_large_image',
    title: uiContent.metadata.openGraphTitle,
    description: uiContent.metadata.openGraphDescription,
    images: ['/logo-blue-ferret.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blue Ferret',
    url: siteUrl,
    logo: `${siteUrl}/logo-blue-ferret.png`,
  };
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blue Ferret',
    url: siteUrl,
    inLanguage: 'uk',
  };

  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
