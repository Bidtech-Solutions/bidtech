import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Template Website Modern & Siap Pakai",
  description:
    "Jelajahi pilihan template website siap pakai untuk berbagai industri: e-commerce, company profile, konstruksi & industri, otomotif, dan portofolio. Desain modern, responsive, cepat, dan SEO-ready.",
  alternates: {
    canonical: "/template-website",
    languages: {
      "id-ID": "https://bidtech.co.id/id/template-website",
      "en-US": "https://bidtech.co.id/en/template-website",
    },
  },
  openGraph: {
    title: "Katalog Template Website Modern & Siap Pakai | BidTech",
    description:
      "Temukan template website siap pakai terbaik untuk bisnis Anda. Tampilan profesional, mobile-friendly, dan siap go-live dalam hitungan hari.",
    url: "https://bidtech.co.id/template-website",
    type: "website",
    siteName: "BidTech Solutions",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Katalog Template Website BidTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Template Website Modern & Siap Pakai | BidTech",
    description:
      "Temukan template website siap pakai terbaik untuk bisnis Anda. Tampilan profesional, mobile-friendly, dan siap go-live.",
    images: ["/images/og-image.png"],
  },
};

export default function LangTemplateWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

