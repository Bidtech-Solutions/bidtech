import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Kami - Proyek & Sistem Digital Unggulan",
  description:
    "Jelajahi portofolio sistem dan website unggulan yang telah dikembangkan oleh BIDTECH, mulai dari sistem kasir IoT AyoCuci, reservasi rental mobil NadimTrans, portal bisnis VIS Society, agribisnis HKTI, hingga CRM Piposmart.",
  keywords: [
    "portofolio bidtech",
    "proyek pembuatan website",
    "ayocuci kasir laundry",
    "nadimtrans rental batam",
    "vis society",
    "hkti batam",
    "crm piposmart",
    "aplikasi kasir pos",
    "software house batam indonesia",
  ],
  openGraph: {
    title: "Portofolio Kami - BIDTECH",
    description:
      "Koleksi sistem dan website unggulan yang dirancang modern, responsif, dan siap disesuaikan dengan identitas bisnis Anda.",
    url: "https://bidtech.co.id/portofolio",
    siteName: "BidTech",
    locale: "id_ID",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
