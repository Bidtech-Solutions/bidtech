import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DENN HOUSE — Architectural & Luxury Real Estate Platform",
  description:
    "Editorial Swiss-inspired luxury real estate & architectural atelier presenting monumental residences across Zurich, Dubai, Singapore, and Jakarta.",
  keywords: [
    "Luxury Real Estate",
    "Architectural Monoliths",
    "Swiss Architecture",
    "Denn House",
    "Sander House",
    "Penthouse Singapore",
    "Dubai Luxury Villas",
    "Architectural Blueprints",
  ],
  authors: [{ name: "DENN HOUSE Atelier" }],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="antialiased selection:bg-amber-400 selection:text-black">
        <LanguageProvider>
          <ThemeProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
