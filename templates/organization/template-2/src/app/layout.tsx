import type { Metadata } from "next";
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import "@styles/globals.css";

const geistSans = localFont({
  src: [
    { path: "./fonts/geist-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yayasan Bhakti Nusantara - Merajut Kepedulian, Memberdayakan Masyarakat",
  description: "Yayasan Bhakti Nusantara adalah organisasi sosial kemasyarakatan nirlaba yang bergerak di bidang pemberdayaan ekonomi warga, beasiswa pendidikan, pos sehat gratis, dan kemanusiaan.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

import { LanguageProvider } from "@lib/LanguageContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
