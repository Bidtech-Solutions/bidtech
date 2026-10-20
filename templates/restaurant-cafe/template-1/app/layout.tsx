import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import SmoothScroll from '../components/SmoothScroll';
import { LanguageProvider } from '../context/LanguageContext';
import { BRAND } from '../lib/constants';
import '../styles/globals.css';

const jakarta = localFont({
  src: '../public/fonts/PlusJakartaSans-VariableFont_wght.ttf',
  variable: '--font-jakarta',
  weight: '200 800',
  display: 'swap',
});

const siteUrl = 'https://chefstable.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: [{ url: '/assets/banner-1024.webp', width: 1024, height: 576 }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>
        <LanguageProvider>
          <SmoothScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}