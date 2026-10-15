import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans, Sora } from "next/font/google";

import { AnnouncementBar } from "@/components/layouts/announcement-bar";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { WhatsAppFloat } from "@/components/layouts/whatsapp-float";
import { StructuredData } from "@/components/seo/structured-data";
import { LanguageProvider } from "@/lib/i18n";

import "../styles/global.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

export const viewport: Viewport = {
  themeColor: "#5fc94a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bidtech.co.id"),
  title: {
    default: "BidTech - Software House & Solusi Digital Indonesia",
    template: "%s | BidTech",
  },
  description:
    "Software house profesional di Indonesia melayani jasa pembuatan website modern, aplikasi mobile Android & iOS, software custom (ERP/CRM), serta template website siap pakai. Konsultasi gratis!",
  applicationName: "BidTech",
  authors: [{ name: "BidTech", url: "https://bidtech.co.id" }],
  generator: "Next.js",
  keywords: [
    "software house indonesia",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi mobile",
    "custom software erp crm",
    "jasa web developer jakarta",
    "software house batam",
    "website company profile",
    "template website siap pakai",
    "jasa bikin web murah profesional",
    "aplikasi kasir pos",
    "bidtech",
    "bidtech solutions",
    "software developer indonesia",
  ],
  referrer: "origin-when-cross-origin",
  creator: "BidTech",
  publisher: "BidTech",
  category: "Technology",
  classification: "Software Development & Digital Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "https://bidtech.co.id",
      "en-US": "https://bidtech.co.id",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://bidtech.co.id",
    siteName: "BidTech Solutions",
    title: "BidTech - Software House, Website & Mobile App Development",
    description:
      "Transformasi bisnis Anda bersama BidTech. Solusi website modern, aplikasi mobile handal, dan sistem bisnis kustom yang terukur untuk percepatan pertumbuhan bisnis Anda.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "BidTech - Business Innovative Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BidTech - Software House & Solusi Digital Indonesia",
    description:
      "Jasa pembuatan website modern, aplikasi mobile Android & iOS, dan sistem software custom ERP/CRM terbaik di Indonesia.",
    images: ["/images/og-image.png"],
    creator: "@bidtechsolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "ID-JK",
    "geo.placename": "Jakarta",
    "geo.position": "-6.207275;106.822519",
    ICBM: "-6.207275, 106.822519",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${sora.variable} ${inter.variable} ${playfair.variable} ${plusJakartaSans.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="bg-white font-[family-name:var(--font-inter)] text-slate-900 antialiased">
        <LanguageProvider>
          <div className="min-h-screen bg-white">
            <AnnouncementBar />
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
