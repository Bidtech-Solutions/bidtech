import type { Metadata, Viewport } from "next";
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import "../styles/globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const playfair = localFont({
  src: [
    { path: "./fonts/playfair-display-latin.woff2", weight: "400 900", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BUILDINGBLOCKS — Architectural & Luxury Real Estate Platform",
  description:
    "Editorial Swiss-inspired luxury real estate & architectural atelier presenting monumental residences across Zurich, Dubai, Singapore, and Jakarta.",
  keywords: [
    "Luxury Real Estate",
    "Architectural Monoliths",
    "Swiss Architecture",
    "Sander House",
    "Penthouse Singapore",
    "Dubai Luxury Villas",
    "Architectural Blueprints",
  ],
  authors: [{ name: "BUILDINGBLOCKS Atelier" }],
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark bg-[#0A0A0A] text-white`}>
      <body className="bg-[#0A0A0A] text-white antialiased selection:bg-amber-400 selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
