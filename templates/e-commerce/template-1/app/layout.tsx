import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import '../styles/globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import PageProgressBar from '@/components/common/PageProgressBar';
import { LanguageProvider } from '@/context/LanguageContext';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
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
        <LanguageProvider>
          <PageProgressBar />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
