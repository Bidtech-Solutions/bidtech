import type { Metadata } from 'next';
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import '../styles/globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-latin.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'KONTERKU | Smartphone Store',
  description: 'Toko smartphone baru, second, dan aksesoris terpercaya.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={manrope.variable}>
      <body className="bg-background text-ink-900 antialiased font-sans selection:bg-gold-200">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
