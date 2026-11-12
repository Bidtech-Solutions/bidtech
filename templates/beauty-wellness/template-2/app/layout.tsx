import type { Metadata } from "next";
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";

import '../styles/globals.css';

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "CHULLA — Thoughtful Skincare", template: "%s — CHULLA" },
  description: "A premium frontend-only skincare showcase built around product discovery, calm routines, and editorial storytelling.",
  keywords: ['Beauty', 'Skincare'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}