export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
  tag?: string;
  accentColor?: string;
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "erp",
    title: "ERP Development",
    description:
      "Integrasikan operasional bisnis melalui satu sistem yang membantu mengelola stok, keuangan, pembelian, dan proses kerja agar lebih efisien dan terkontrol.",
    slug: "erp",
    imageSrc: "/images/assets/erp-illustration.png",
  },
  {
    id: "android",
    title: "Aplikasi Android",
    description:
      "Hadirkan bisnis Anda di perangkat Android melalui aplikasi mobile yang responsif, intuitif, dan dirancang sesuai kebutuhan pengguna serta proses bisnis.",
    slug: "android",
    imageSrc: "/images/assets/android-illustration.png",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description:
      "Bangun toko online profesional untuk memasarkan produk, menerima pesanan, dan transaksi otomatis dengan pengalaman belanja yang mulus.",
    slug: "ecommerce",
    imageSrc: "/images/assets/Icon Desain Bid (3) 1.png",
  },
];
