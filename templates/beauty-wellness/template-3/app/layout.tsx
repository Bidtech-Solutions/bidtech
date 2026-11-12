import type { Metadata } from "next";
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const playfair = localFont({
  src: [
    { path: "./fonts/playfair-display-latin.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/playfair-display-latin-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin.woff2", weight: "100 800", style: "normal" },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agak Rapi — Precision Hair Architecture",
  description:
    "Editorial brutalist grooming studio design system merging dark/light studio aesthetics with high-precision architectural drafting elements.",
  keywords: [
    "Barbershop Jakarta",
    "Precision Haircut",
    "Agak Rapi",
    "Grooming Studio",
    "Cranial Bone Mapping",
    "Senopati Barbershop",
    "Fade Cut",
    "Two-Block Haircut",
  ],
  authors: [{ name: "Agak Rapi Studio" }],
  openGraph: {
    title: "Agak Rapi — Precision Hair Architecture",
    description:
      "Bukan sekadar potong rambut. Konstruksi geometris presisi dengan kalkulasi kranium kepala dan alat medis di Senopati, Jakarta Selatan.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`dark ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="selection:bg-brand-lime selection:text-brand-black bg-[#F6F6F2] dark:bg-[#0B0B0C] text-[#0E0E10] dark:text-zinc-100 transition-colors duration-250">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
