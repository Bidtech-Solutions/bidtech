export interface PortfolioDetailItem {
  id: string;
  title: string;
  shortTitle?: string;
  domain: string;
  href: string;
  tag: string;
  tagType?: "amber" | "green" | "blue";
  image: string;
  mockupImage?: string;
  laptopImage?: string;
  tabletImage?: string;
  mobileImage?: string;
  shortDescription: string;
  detailedDescription: string;
  stats?: { value: string; label: string }[];
}

export const PORTFOLIO_ITEMS_ID: PortfolioDetailItem[] = [
  {
    id: "ayocuci",
    title: "AyoCuci",
    shortTitle: "AyoCuci",
    domain: "ayocuci.co.id",
    href: "https://ayocuci.co.id/",
    tag: "WEB & MOBILE",
    tagType: "amber",
    image: "/images/portofolio/ayocuci.webp",
    mockupImage: "/images/portofolio/ayocuci-mockup-hd.webp",
    laptopImage: "/images/portofolio/ayocuci.webp",
    tabletImage: "/images/ayocuci-tablet-screen.webp",
    mobileImage: "/images/ayocuci-phone-screen.webp",
    shortDescription:
      "AyoCuci adalah solusi kasir point-of-sale (POS) all-in-one yang dirancang untuk mempercepat transaksi laundry mandiri maupun kiloan dengan pemantauan omset otomatis.",
    detailedDescription:
      "solusi kasir point-of-sale (POS) all-in-one yang dirancang untuk mempercepat transaksi laundry mandiri (self- service laundromat) maupun laundry kiloan tradisional. Dilengkapi dengan sinkronisasi multi-device tanpa jeda, integrasi koin pintar IoT, dan pemantauan omset otomatis dari manapun.",
    stats: [
      { value: "100+", label: "Mitra Bisnis" },
      { value: "99%", label: "Data Aman" },
      { value: "5x", label: "Lebih Cepat" },
    ],
  },
  {
    id: "nadimtrans",
    title: "NadimTrans Rentcar Batam",
    shortTitle: "NadimTrans",
    domain: "nadimtrans.com",
    href: "https://nadimtrans.com/",
    tag: "RENTAL & RESERVASI",
    tagType: "amber",
    image: "/images/portofolio/nadimtrans.webp",
    laptopImage: "/images/portofolio/nadimtrans.webp",
    tabletImage: "/images/nadim-tablet-screen.webp",
    mobileImage: "/images/nadim-phone-screen.webp",
    shortDescription:
      "PT. Nadim Auto Transindo atau lebih dikenal dengan NadimTrans Rentcar Batam, merupakan penyedia layanan sewa mobil terpercaya di Batam dengan armada lengkap.",
    detailedDescription:
      "solusi reservasi rental mobil terpadu dari PT Nadim Auto Transindo yang dirancang untuk melayani pemesanan armada lepas kunci maupun dengan supir. Dilengkapi dengan kalkulasi tarif multi-valuta otomatis (IDR, SGD, MYR), penjemputan bandara & pelabuhan interaktif, serta konfirmasi instan via WhatsApp.",
    stats: [
      { value: "50+", label: "Armada Mobil" },
      { value: "24 Jam", label: "Layanan Siap" },
      { value: "100%", label: "Terpercaya" },
    ],
  },
  {
    id: "vissociety",
    title: "VIS Society",
    shortTitle: "VIS Society",
    domain: "vissociety.org",
    href: "https://www.vissociety.org/",
    tag: "PORTAL & KOMUNITAS",
    tagType: "amber",
    image: "/images/portofolio/vissociety.webp",
    laptopImage: "/images/portofolio/vissociety.webp",
    tabletImage: "/images/vis-tablet-screen.webp",
    mobileImage: "/images/vis-phone-screen.webp",
    shortDescription:
      "VIS Society adalah organisasi lintas industri, lintas profesi, dan lintas jabatan/usia yang dibentuk untuk memperluas jaringan koneksi dan kolaborasi strategis.",
    detailedDescription:
      "portal komunitas bisnis lintas batas (Indonesia, Singapura, dan Malaysia) untuk menghubungkan para pengusaha, profesional, dan pemangku kepentingan strategis. Dilengkapi sistem direktori keanggotaan terverifikasi, publikasi program kolaborasi, dan kurasi peluang investasi regional.",
    stats: [
      { value: "47+", label: "Anggota Aktif" },
      { value: "3", label: "Negara Mitra" },
      { value: "100%", label: "Kolaboratif" },
    ],
  },
  {
    id: "hkti",
    title: "HKTI Kota Batam",
    shortTitle: "HKTI Batam",
    domain: "hktikotabatam.org",
    href: "https://hktikotabatam.org/",
    tag: "PORTAL WEB",
    tagType: "amber",
    image: "/images/portofolio/hkti.webp",
    laptopImage: "/images/portofolio/hkti.webp",
    tabletImage: "/images/hkti-tablet-screen.webp",
    mobileImage: "/images/hkti-phone-screen.webp",
    shortDescription:
      "DPC HIMPUNAN KERUKUNAN TANI INDONESIA (HKTI) KOTA BATAM - Menghimpun potensi tani, modernisasi agribisnis perkotaan, dan publikasi program terpadu.",
    detailedDescription:
      "portal agribisnis dan database kemitraan tani maritim DPC HKTI Kota Batam untuk menghimpun potensi petani lokal, memodernisasi tata kelola agribisnis perkotaan, menyalurkan hasil panen ke jaringan pasar modern, serta mempublikasikan program kerja organisasi secara transparan.",
    stats: [
      { value: "12", label: "Kecamatan" },
      { value: "500+", label: "Petani Terbina" },
      { value: "24/7", label: "Akses Portal" },
    ],
  },
  {
    id: "crmpiposmart",
    title: "CRM Piposmart",
    shortTitle: "CRM Piposmart",
    domain: "crm.piposmart.com",
    href: "https://crm.piposmart.com/",
    tag: "ENTERPRISE WEB",
    tagType: "amber",
    image: "/images/portofolio/crmpiposmart.webp",
    laptopImage: "/images/crm-desktop-screen.webp",
    tabletImage: "/images/crm-tablet-screen.webp",
    mobileImage: "/images/crm-phone-screen.webp",
    shortDescription:
      "Platform mengelola data nasabah Piposmart menjadi laporan, serta menjadi platform automasi prospek dan performa tim sales secara terpadu.",
    detailedDescription:
      "platform manajemen relasi pelanggan (CRM) terintegrasi untuk mengelola database prospek dan nasabah secara terstruktur. Dilengkapi fitur otomatisasi alur follow-up, pemantauan pipeline penjualan, pelaporan analitik performa tim marketing, serta sinkronisasi multi-cabang secara real-time.",
    stats: [
      { value: "10.000+", label: "Data Nasabah" },
      { value: "100%", label: "Sinkronisasi" },
      { value: "4x", label: "Pertumbuhan Tim" },
    ],
  },
];

export const PORTFOLIO_ITEMS_EN: PortfolioDetailItem[] = [
  {
    id: "ayocuci",
    title: "AyoCuci",
    shortTitle: "AyoCuci",
    domain: "ayocuci.co.id",
    href: "https://ayocuci.co.id/",
    tag: "WEB & MOBILE",
    tagType: "amber",
    image: "/images/portofolio/ayocuci.webp",
    mockupImage: "/images/portofolio/ayocuci-mockup-hd.webp",
    laptopImage: "/images/portofolio/ayocuci.webp",
    tabletImage: "/images/ayocuci-tablet-screen.webp",
    mobileImage: "/images/ayocuci-phone-screen.webp",
    shortDescription:
      "AyoCuci is an all-in-one point-of-sale (POS) solution designed to accelerate transactions for self-service laundromats and laundry businesses.",
    detailedDescription:
      "all-in-one point-of-sale (POS) solution designed to accelerate transactions for self-service laundromats as well as traditional laundry businesses. Equipped with instant multi-device syncing, smart IoT coin integration, and automated revenue monitoring from anywhere.",
    stats: [
      { value: "100+", label: "Business Partners" },
      { value: "99%", label: "Secure Data" },
      { value: "5x", label: "Faster Operations" },
    ],
  },
  {
    id: "nadimtrans",
    title: "NadimTrans Rentcar Batam",
    shortTitle: "NadimTrans",
    domain: "nadimtrans.com",
    href: "https://nadimtrans.com/",
    tag: "RENTAL & RESERVATION",
    tagType: "amber",
    image: "/images/portofolio/nadimtrans.webp",
    laptopImage: "/images/portofolio/nadimtrans.webp",
    tabletImage: "/images/nadim-tablet-screen.webp",
    mobileImage: "/images/nadim-phone-screen.webp",
    shortDescription:
      "PT. Nadim Auto Transindo (NadimTrans Rentcar Batam) is a trusted car rental provider in Batam featuring modern fleet reservations.",
    detailedDescription:
      "integrated car rental reservation solution from PT Nadim Auto Transindo tailored for self-drive and chauffeur bookings. Featuring automated multi-currency rates (IDR, SGD, MYR), interactive airport/ferry pickup points, and instant WhatsApp confirmation.",
    stats: [
      { value: "50+", label: "Fleet Vehicles" },
      { value: "24/7", label: "Ready Support" },
      { value: "100%", label: "Trusted Service" },
    ],
  },
  {
    id: "vissociety",
    title: "VIS Society",
    shortTitle: "VIS Society",
    domain: "vissociety.org",
    href: "https://www.vissociety.org/",
    tag: "PORTAL & COMMUNITY",
    tagType: "amber",
    image: "/images/portofolio/vissociety.webp",
    laptopImage: "/images/portofolio/vissociety.webp",
    tabletImage: "/images/vis-tablet-screen.webp",
    mobileImage: "/images/vis-phone-screen.webp",
    shortDescription:
      "VIS Society is a cross-industry, cross-border business network built to expand professional connections and strategic investment partnerships.",
    detailedDescription:
      "cross-border business community portal connecting entrepreneurs, leaders, and strategic professionals across Indonesia, Singapore, and Malaysia. Features verified membership directories, collaboration project boards, and curated regional investment opportunities.",
    stats: [
      { value: "47+", label: "Active Members" },
      { value: "3", label: "Partner Countries" },
      { value: "100%", label: "Collaborative" },
    ],
  },
  {
    id: "hkti",
    title: "HKTI Kota Batam",
    shortTitle: "HKTI Batam",
    domain: "hktikotabatam.org",
    href: "https://hktikotabatam.org/",
    tag: "WEB PORTAL",
    tagType: "amber",
    image: "/images/portofolio/hkti.webp",
    laptopImage: "/images/portofolio/hkti.webp",
    tabletImage: "/images/hkti-tablet-screen.webp",
    mobileImage: "/images/hkti-phone-screen.webp",
    shortDescription:
      "DPC HKTI Kota Batam - Consolidating agricultural potential, modern agribusiness management, and institutional action programs.",
    detailedDescription:
      "integrated agribusiness portal and maritime farming partnership database for DPC HKTI Kota Batam to register local farmers, modernize urban agro-management, channel harvests into retail networks, and transparently publish organizational initiatives.",
    stats: [
      { value: "12", label: "Sub-Districts" },
      { value: "500+", label: "Farming Partners" },
      { value: "24/7", label: "Portal Access" },
    ],
  },
  {
    id: "crmpiposmart",
    title: "CRM Piposmart",
    shortTitle: "CRM Piposmart",
    domain: "crm.piposmart.com",
    href: "https://crm.piposmart.com/",
    tag: "ENTERPRISE WEB",
    tagType: "amber",
    image: "/images/portofolio/crmpiposmart.webp",
    laptopImage: "/images/crm-desktop-screen.webp",
    tabletImage: "/images/crm-tablet-screen.webp",
    mobileImage: "/images/crm-phone-screen.webp",
    shortDescription:
      "Smart CRM platform to manage customer records, automate follow-ups, and track marketing and sales pipeline performance.",
    detailedDescription:
      "intelligent customer relationship management (CRM) platform to systematically organize lead and client databases. Features automated follow-up workflows, sales funnel tracking, real-time marketing analytics, and multi-branch cloud synchronization.",
    stats: [
      { value: "10,000+", label: "Client Records" },
      { value: "100%", label: "Realtime Sync" },
      { value: "4x", label: "Team Growth" },
    ],
  },
];
