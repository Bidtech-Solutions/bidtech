import React from 'react';
import type { Metadata } from 'next';
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import './globals.css';

const plusJakartaSans = localFont({
  src: [
    { path: "./fonts/plus-jakarta-sans-latin.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Aliansi Kepemimpinan Indonesia — Organisasi Pemuda & Inovasi Sosial (2026–2030)',
  description:
    'Situs resmi Aliansi Kepemimpinan Indonesia Periode 2026–2030. Wadah kepemimpinan, transformasi sosial, dan kolaborasi strategis.',
  keywords: [
    'Aliansi Kepemimpinan Indonesia',
    'Organisasi Pemuda',
    'Inovasi Sosial',
    'Kepemimpinan Indonesia',
    'Pemberdayaan Masyarakat',
  ],
  authors: [{ name: 'Dewan Pimpinan Pusat' }],
  icons: {
    icon: '/images/logo.webp',
  },
  openGraph: {
    title: 'Aliansi Kepemimpinan Indonesia — Masa Bakti 2026–2030',
    description:
      'Situs resmi Aliansi Kepemimpinan Indonesia. Slogan: BERSATU, BERKARYA, BERMARTABAT.',
    url: 'https://aliansipemuda.id',
    siteName: 'Aliansi Kepemimpinan Indonesia',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="bg-[#FAFAFA] text-hkti-slate font-sans antialiased selection:bg-hkti-gold selection:text-white min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
