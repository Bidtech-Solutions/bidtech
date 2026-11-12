import type { Metadata } from "next";
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import "../styles/globals.css";
import SmoothScroller from "@/components/common/SmoothScroller";

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pinjam Mobil | Sewa Mobil Harian & Bulanan",
  description: "Sewa mobil harian atau bulanan lebih praktis, fleksibel, dan nyaman bersama Pinjam Mobil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
