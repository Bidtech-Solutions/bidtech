import type { Metadata } from "next";
// Font di-host sendiri agar build demo tidak bergantung pada unduhan Google Fonts.
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ConsultModalProvider } from "@/components/providers/consult-modal-provider";
import { RouteLine } from "@/components/layout/route-line";
import { SiteChrome } from "@/components/layout/site-chrome";
import { site } from "@/lib/data/site";
import { nivoraAssets } from "@/lib/data/asset-paths";
import { organizationJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const manrope = localFont({
  src: [
    { path: "./fonts/manrope-latin.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const dmSerifDisplay = localFont({
  src: [
    { path: "./fonts/dm-serif-display-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/dm-serif-display-latin-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "kursus online Indonesia",
    "bootcamp web programming",
    "belajar UI UX design",
    "kursus data analytics",
    "kursus Excel online",
    "beasiswa coding",
    "akademi digital Indonesia",
  ],
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "id_ID",
    type: "website",
    images: [{ url: nivoraAssets.seo.ogHome, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [nivoraAssets.seo.ogHome],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${manrope.variable} ${dmSerifDisplay.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a href="#konten" className="skip-link">
          Lompat ke konten
        </a>
        {/* <RouteLine /> */}
        <SmoothScroll>
          <ConsultModalProvider>
            <SiteChrome>{children}</SiteChrome>
          </ConsultModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}