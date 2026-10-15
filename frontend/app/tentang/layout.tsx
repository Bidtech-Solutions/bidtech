import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - Membangun Masa Depan Bersama",
  description:
    "BIDTECH hadir mendampingi korporasi, UMKM, hingga institusi mulai dari rancang bangun website profesional, aplikasi mobile, sistem e-commerce, hingga arsitektur ERP terintegrasi yang relevan, teruji, dan berkelanjutan.",
  keywords: [
    "tentang bidtech",
    "software house indonesia",
    "profil perusahaan bidtech",
    "pengembang website aplikasi",
    "tim developer batam jakarta",
    "bidtech solutions",
  ],
  openGraph: {
    title: "Tentang Kami - BIDTECH",
    description:
      "Membangun masa depan digital bersama BIDTECH. Rekayasa perangkat lunak terpercaya untuk transformasi bisnis Anda.",
    url: "https://bidtech.co.id/tentang",
    siteName: "BidTech",
    locale: "id_ID",
    type: "website",
  },
};

export default function TentangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
