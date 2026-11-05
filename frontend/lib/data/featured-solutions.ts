export interface FeaturedSolutionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  platforms: ("android" | "web" | "ios")[];
  imageSrc: string;
  href: string;
}

export const FEATURED_SOLUTIONS_DATA: FeaturedSolutionItem[] = [
  {
    id: "satu-rupiah",
    title: "Satu Rupiah",
    description:
      "Aplikasi pencatatan arus kas operasional, invoice otomatis PDF, dan rekonsiliasi bank instan yang dirancang untuk UMKM hingga korporasi menengah.",
    category: "Finansial App",
    platforms: ["android", "web"],
    imageSrc: "/images/assets/featured-satu-rupiah.png",
    href: "/solusi#erp",
  },
  {
    id: "ayo-cuci",
    title: "Ayo Cuci",
    description:
      "Platform kasir cerdas dan pelacakan cucian terintegrasi WhatsApp bot notifikasi, kalkulasi multi-cabang, dan dashboard analitik omzet pemilik bisnis.",
    category: "Kasir - Tracking",
    platforms: ["android", "web", "ios"],
    imageSrc: "/images/assets/featured-ayocuci.png",
    href: "https://ayocuci.co.id/",
  },
  {
    id: "stokin",
    title: "Stokin",
    description:
      "Sistem manajemen pergudangan berkecepatan tinggi dengan barcode scan multi-rak, pelacakan expired dan date otomatis.",
    category: "Smart Warehouse",
    platforms: ["android", "web"],
    imageSrc: "/images/assets/featured-stokin.png",
    href: "/solusi#stokin",
  },
];

