export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  badge: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tips-memilih-desain-website-bisnis",
    category: "Website & SEO",
    title: "Panduan Memilih Template vs Custom Website untuk UMKM dan Bisnis Modern",
    excerpt:
      "Kapan bisnis Anda membutuhkan template siap pakai dan kapan waktu yang tepat untuk beralih ke pembuatan web custom? Simak ulasan komprehensifnya.",
    date: "7 Oktober 2026",
    readTime: "5 menit baca",
    badge: "Populer",
    author: {
      name: "Tim Editorial Bidtech",
      role: "Solusi Digital & Arsitektur Web",
    },
    content: [
      "Di era transformasi digital saat ini, memiliki kehadiran online yang solid bukan lagi sekadar pilihan tambahan, melainkan pondasi utama kredibilitas bisnis Anda. Calon pelanggan mencari produk, mengecek testimoni, hingga membandingkan harga langsung melalui mesin pencarian.",
      "Namun, pertanyaan krusial yang sering dihadapi oleh pemilik bisnis, founder UMKM, maupun praktisi adalah: Apakah sebaiknya memulai dengan website berbasis template siap pakai, atau langsung berinvestasi pada pembuatan website kustom (custom development)?",
      "Kelebihan Menggunakan Template Siap Pakai: Template website modern yang dikembangkan secara profesional menawarkan kecepatan waktu peluncuran (time-to-market). Anda tidak perlu menunggu berminggu-minggu untuk proses desain awal dari nol. Selain itu, biaya implementasi jauh lebih efisien, sangat cocok untuk validasi pasar produk baru atau bisnis yang ingin segera go-online.",
      "Kapan Harus Memilih Custom Development? Ketika alur bisnis Anda memerlukan integrasi API khusus yang rumit, perhitungan kalkulator kustom, arsitektur multi-tenant, atau branding unik yang tidak dapat diakomodasi oleh tata letak standar, maka custom development adalah langkah investasi jangka panjang yang tepat.",
      "Kesimpulan: Bagi sebagian besar bisnis bertumbuh, memulai dengan template website berkualitas tinggi yang mobile-friendly dan SEO-ready dari Bidtech adalah solusi tercepat dan paling ekonomis untuk meraih penjualan pertama.",
    ],
  },
  {
    slug: "mengapa-kecepatan-website-berpengaruh-ke-penjualan",
    category: "Tips Bisnis",
    title: "Mengapa Kecepatan Website Berpengaruh Langsung terhadap Konversi Penjualan?",
    excerpt:
      "Studi membuktikan keterlambatan 1 detik dapat menurunkan penjualan hingga 7%. Pelajari cara mengoptimalkan performa web Anda agar selalu ngebut.",
    date: "4 Oktober 2026",
    readTime: "4 menit baca",
    badge: "Penting",
    author: {
      name: "Tim Engineering Bidtech",
      role: "Performa & Infrastruktur Cloud",
    },
    content: [
      "Perilaku pengguna internet saat ini menuntut kecepatan instan. Jika website Anda membutuhkan waktu lebih dari 3 detik untuk memuat konten, lebih dari 50% calon pembeli akan langsung menutup tab browser dan beralih ke kompetitor.",
      "Google juga secara resmi menetapkan Core Web Vitals sebagai faktor penentu peringkat pencarian SEO. Website yang lambat tidak hanya ditinggalkan pengunjung, tetapi juga sulit tampil di halaman pertama hasil pencarian Google.",
      "Faktor Utama Penyebab Website Lambat: Ukuran gambar aset yang tidak dioptimalkan (masih format JPEG/PNG besar tanpa WebP/AVIF), skrip analitik pihak ketiga yang berlebihan, serta hosting server yang tidak memiliki jaringan CDN lokal di Indonesia.",
      "Bagaimana Bidtech Memastikan Kecepatan Tinggi? Seluruh template dan website yang kami bangun dioptimalkan dengan teknologi modern seperti Next.js, caching canggih, serta kompresi otomatis gambar sehingga meraih skor performa hijau di Google PageSpeed.",
    ],
  },
  {
    slug: "otomasi-sistem-manajemen-inventaris",
    category: "Aplikasi Mobile",
    title: "Otomasi Operasional Bisnis: Dari Pencatatan Manual ke Aplikasi Internal Terintegrasi",
    excerpt:
      "Tinggalkan spreadsheet manual yang rentan kesalahan. Cari tahu bagaimana sistem ERP & CRM custom membantu tim bergerak 3x lebih efisien.",
    date: "1 Oktober 2026",
    readTime: "6 menit baca",
    badge: "Solusi",
    author: {
      name: "Bidtech Solutions",
      role: "Sistem ERP & Aplikasi Internal",
    },
    content: [
      "Banyak bisnis skala menengah masih mengandalkan dokumen spreadsheet manual yang terpisah-pisah untuk mencatat stok barang, pesanan masuk, dan laporan keuangan harian. Akibatnya timbul kesalahan input data ganda, salah kirim barang, hingga laporan omzet yang terlambat berminggu-minggu.",
      "Otomasi melalui aplikasi internal terintegrasi (ERP / CRM) memberikan visibilitas realtime terhadap seluruh perputaran barang dari gudang sampai ke tangan pelanggan.",
      "Manfaat Langsung Sistem Otomasi: Efisiensi kerja meningkat hingga 300%, risiko kesalahan manusia (human error) dapat ditekan drastis, serta keputusan bisnis dapat diambil berdasarkan data nyata secara seketika.",
      "Langkah Awal Digitalisasi Operasional: Mulailah dengan memetakan proses bisnis yang paling memakan waktu secara rutin, kemudian bangun modul bertahap mulai dari manajemen inventaris hingga integrasi laporan WhatsApp otomatis.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
