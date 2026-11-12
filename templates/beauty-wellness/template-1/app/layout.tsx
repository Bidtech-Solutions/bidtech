import type { Metadata } from 'next';
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import '../styles/globals.css';

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: 'IRONFORCE',
  description: 'Tempat Gym Terbaik dan Termurah Se Kota Batam',
  keywords: ['Gym', 'Fitness'],
};

const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-latin.woff2", weight: "300 700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-latin.woff2", weight: "200 800", style: "normal" },
  ],
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
