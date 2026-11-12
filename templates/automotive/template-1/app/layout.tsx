import type { Metadata } from 'next';
import '../styles/globals.css';
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const bebasNeue = localFont({
  src: [
    { path: "./fonts/bebas-neue-latin.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'RentCar - Layanan Sewa Mobil Mewah & Terpercaya',
  description: 'Rasakan puncak rekayasa otomotif dengan pilihan kendaraan mewah kami yang dikurasi, siap sedia setiap saat.',
  keywords: ['sewa mobil', 'rental mobil mewah', 'rentcar', 'sewa alphard'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable, bebasNeue.variable)}>
      <body className="bg-white text-gray-900">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
