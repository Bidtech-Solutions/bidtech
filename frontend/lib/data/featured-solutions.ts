export interface FeaturedSolutionItem {
  id: string;
  title: string;
  description: string;
  descriptionEn: string;
  platforms: ("android" | "web" | "ios")[];
  /** Kosongkan bila gambar belum ada; kartu akan menampilkan placeholder. */
  imageSrc?: string;
  /** Kosongkan bila situs belum tersedia; tombol "Lihat Situs" disembunyikan. */
  href?: string;
}

export const FEATURED_SOLUTIONS_DATA: FeaturedSolutionItem[] = [
  {
    id: "fun-travel",
    title: "Fun Travel & Transport",
    description:
      "Platform layanan wisata dan transportasi yang memudahkan pelanggan menjelajahi Batam dan Bintan, mulai dari pemesanan paket liburan, penyewaan kendaraan, hingga informasi destinasi wisata dalam satu website",
    descriptionEn:
      "Tourism and transportation service platform that allows customers to explore Batam and Bintan, from booking holiday packages, vehicle rentals, to travel destination info in one website.",
    platforms: ["web"],
    imageSrc: "/images/solutions/fun-travel-v2.webp",
    href: "https://fungetgo.com/id",
  },
  {
    id: "ayo-cuci",
    title: "Ayo Cuci",
    description:
      "Aplikasi kasir laundry yang memudahkan pemilik usaha mengelola transaksi, pelanggan, karyawan, dan keuangan. Dilengkapi pemantauan status pesanan serta laporan bisnis dalam satu aplikasi yang praktis dan terintegrasi.",
    descriptionEn:
      "Smart laundry POS application helping business owners manage transactions, customers, staff, and finances with real-time order tracking and business analytics.",
    platforms: ["android", "web", "ios"],
    imageSrc: "/images/solutions/ayocuci-v3.webp",
    href: "https://ayocuci.co.id/",
  },
  {
    id: "nadim-trans",
    title: "NadimTrans Rentcar",
    description:
      "Website layanan rental mobil di Batam yang memudahkan pelanggan menjelajahi pilihan kendaraan, melihat harga sewa, dan melakukan pemesanan. Menyediakan layanan lepas kunci maupun dengan sopir untuk kebutuhan wisata, bisnis, dan perjalanan pribadi",
    descriptionEn:
      "Car rental service website in Batam enabling customers to browse fleets, check rates, and book vehicles with self-drive or chauffeur options for business and leisure.",
    platforms: ["web"],
    imageSrc: "/images/solutions/nadimtrans-v2.webp",
    href: "https://nadimtrans.com/",
  },
  {
    id: "masterpro",
    title: "MasterPro Real Estate",
    description:
      "Website agen properti di Batam untuk jual beli dan sewa rumah. Pengunjung dapat mencari properti berdasarkan lokasi, tipe, dan harga, melihat listing terbaru, lalu langsung menghubungi agen profesional.",
    descriptionEn:
      "Property agency website in Batam for buying, selling, and renting homes. Visitors can search listings by location, type, and price, browse the latest properties, and contact a professional agent directly.",
    platforms: ["web"],
    imageSrc: "/images/solutions/masterpro-v2.webp",
    href: "https://masterpro.co.id/id",
  },
  {
    id: "hkti-batam",
    title: "HKTI Kota Batam",
    description:
      "Website resmi DPC Himpunan Kerukunan Tani Indonesia Kota Batam yang menyajikan profil organisasi, visi dan misi, struktur pengurus, program kerja, serta dokumentasi kegiatan untuk masyarakat dan anggota.",
    descriptionEn:
      "Official website of the Indonesian Farmers Association (HKTI) Batam chapter, presenting the organization profile, vision and mission, board structure, work programs, and activity documentation.",
    platforms: ["web"],
    imageSrc: "/images/solutions/hkti-v2.webp",
    href: "https://hktikotabatam.org/",
  },
  {
    id: "vis-society",
    title: "VIS Society",
    description:
      "Website komunitas yang membangun koneksi, kolaborasi, dan peluang tanpa batas. Menampilkan profil komunitas, agenda kegiatan, susunan pengurus, hingga pendaftaran keanggotaan secara online.",
    descriptionEn:
      "Community website built for connection, collaboration, and limitless opportunities, featuring the community profile, event agenda, leadership team, and online membership registration.",
    platforms: ["web"],
    imageSrc: "/images/solutions/vis-society-v2.webp",
    href: "https://www.vissociety.org/",
  },
  {
    id: "semestapro",
    title: "SemestaPro",
    description:
      "Platform jual beli properti di Batam yang fokus pada rumah secondary. Calon pembeli dapat menelusuri listing rumah, membandingkan harga, dan melihat lokasi properti dengan mudah dan cepat.",
    descriptionEn:
      "Property marketplace in Batam focused on secondary homes. Buyers can browse listings, compare prices, and check property locations quickly and easily.",
    platforms: ["web"],
    imageSrc: "/images/solutions/semestapro-v2.webp",
    href: "https://semestapro.co.id/",
  },
  {
    id: "sapa-kerja",
    title: "Sapa Kerja",
    description:
      "Sistem presensi dan manajemen kehadiran tim berbasis web dan aplikasi mobile. Memudahkan perusahaan memantau absensi secara real-time, mengelola rekap keterlambatan, dan melihat analitik operasional dalam satu layar.",
    descriptionEn:
      "Smart attendance and team presence management system across web and mobile apps. Enables companies to monitor attendance in real-time, track tardiness, and view operational analytics on a single dashboard.",
    platforms: ["web", "android", "ios"],
    imageSrc: "/images/solutions/login-rek-v2.webp",
    href: "https://sapakerja.com",
  },
  {
    id: "sony-christanto",
    title: "Sony Christanto",
    description:
      "Website profil publik dan personal branding Anggota DPRD Kota Batam yang menyajikan biografi, rekam jejak legislatif, kiprah organisasi, serta kanal penyampaian aspirasi masyarakat secara digital.",
    descriptionEn:
      "Official public profile and personal branding website for Batam City DPRD Member, presenting biography, legislative track record, organizational initiatives, and a digital channel for public aspirations.",
    platforms: ["web"],
    imageSrc: "/images/solutions/sony-christanto-v2.webp",
    href: "https://sonychristanto.com/id",
  },
];
