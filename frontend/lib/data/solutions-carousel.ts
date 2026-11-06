export interface SolutionItem {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  slug: string;
  imageSrc: string;
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "erp",
    title: "ERP Development",
    titleEn: "ERP Development",
    description:
      "Integrasikan operasional bisnis melalui satu sistem yang membantu mengelola stok, keuangan, pembelian, dan proses kerja agar lebih efisien dan terkontrol.",
    descriptionEn:
      "Integrate business operations through a single system managing inventory, finance, purchasing, and workflows efficiently.",
    slug: "erp",
    imageSrc: "/images/assets/erp-illustration.png",
  },
  {
    id: "android",
    title: "Aplikasi Android",
    titleEn: "Android Application",
    description:
      "Hadirkan bisnis Anda di perangkat Android melalui aplikasi mobile yang responsif, intuitif, dan dirancang sesuai kebutuhan pengguna serta proses bisnis.",
    descriptionEn:
      "Bring your business to Android devices through responsive, intuitive mobile apps tailored to your users and business processes.",
    slug: "android",
    imageSrc: "/images/assets/android-illustration.png",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    titleEn: "E-Commerce Platform",
    description:
      "Bangun toko online profesional untuk memasarkan produk, menerima pesanan, dan transaksi otomatis dengan pengalaman belanja yang mulus.",
    descriptionEn:
      "Build professional online storefronts to market products, receive orders, and automate transactions with seamless shopping experiences.",
    slug: "ecommerce",
    imageSrc: "/images/assets/ecommerce-showcase.png",
  },
  {
    id: "custom",
    title: "Custom Software",
    titleEn: "Custom Software",
    description:
      "Kembangkan solusi perangkat lunak khusus dan dashboard bisnis yang disesuaikan presisi dengan alur kerja, otomasi data, dan skala usaha Anda.",
    descriptionEn:
      "Engineer tailored software solutions and custom dashboards built with precision for your exact workflows and enterprise scale.",
    slug: "custom",
    imageSrc: "/images/assets/custom-illustration.png",
  },
];
