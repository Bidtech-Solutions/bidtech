import type { Metadata, Viewport } from 'next';
import { Manrope, Space_Grotesk } from "next/font/google";
import '../styles/globals.css';

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: 'IRONFORCE',
  description: 'Tempat Gym Terbaik dan Termurah Se Kota Batam',
  keywords: ['Gym', 'Fitness'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${spaceGrotesk.variable} ${manrope.variable}`}>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
