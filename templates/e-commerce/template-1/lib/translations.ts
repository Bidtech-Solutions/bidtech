export type Language = "id" | "en";

export interface TranslationDictionary {
  nav: {
    home: string;
    products: string;
    accessories: string;
    about: string;
    contact: string;
    chatWa: string;
  };
  hero: {
    title1: string;
    title2: string;
    title3: string;
    description: string;
    viewProducts: string;
    chatWa: string;
    badge1: string;
    badge1Sub: string;
    badge2: string;
    badge2Sub: string;
    badge3: string;
    badge3Sub: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    features: Array<{
      title: string;
      desc: string;
    }>;
  };
  productGrid: {
    eyebrow: string;
    title: string;
    desc: string;
    viewAll: string;
    orderWa: string;
    condition: string;
    storage: string;
    newBadge: string;
    secondBadge: string;
  };
  about: {
    eyebrow: string;
    title: string;
    story1: string;
    story2: string;
    statYears: string;
    statCustomers: string;
    statTransactions: string;
  };
  promo: {
    eyebrow: string;
    title: string;
    desc: string;
    viewPromo: string;
    claimCashback: string;
    seeAll: string;
  };
  testimonial: {
    eyebrow: string;
    title: string;
    role: string;
    ariaPrev: string;
    ariaNext: string;
    quotes: Array<{
      id: number;
      text: string;
      name: string;
    }>;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    description: string;
    storeBadge: string;
    storyEyebrow: string;
    storyTitle: string;
    story1: string;
    story2: string;
    advantagesEyebrow: string;
    advantagesTitle: string;
    advantage1Title: string;
    advantage1Desc: string;
    advantage2Title: string;
    advantage2Desc: string;
    advantage3Title: string;
    advantage3Desc: string;
    infoEyebrow: string;
    infoTitle: string;
    infoDesc: string;
    infoSidebarTitle: string;
    infoSidebarSubtitle: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    sections: {
      howToBuy: {
        title: string;
        subtitle: string;
        steps: Array<{ num: string; title: string; desc: string }>;
      };
      warranty: {
        title: string;
        subtitle: string;
        steps: Array<{ num: string; title: string; desc: string }>;
      };
      shipping: {
        title: string;
        subtitle: string;
        steps: Array<{ num: string; title: string; desc: string }>;
      };
      terms: {
        title: string;
        subtitle: string;
        steps: Array<{ num: string; title: string; desc: string }>;
      };
      privacy: {
        title: string;
        subtitle: string;
        steps: Array<{ num: string; title: string; desc: string }>;
      };
    };
  };
  contactPage: {
    eyebrow: string;
    titlePart1: string;
    titleHighlight: string;
    desc: string;
    checklist: string[];
    formName: string;
    formNamePlaceholder: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formMsg: string;
    formMsgPlaceholder: string;
    formSubmit: string;
    formNote: string;
    optionsEyebrow: string;
    optionsTitle: string;
    optionsDesc: string;
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card1Action: string;
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card2Action: string;
    card3Badge: string;
    card3Title: string;
    card3Desc: string;
    card3Action: string;
    locationEyebrow: string;
    locationTitle: string;
    addressTitle: string;
    addressText: string;
    hoursTitle: string;
    hoursText: string;
    directContactTitle: string;
    socialTitle: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  productCatalog: {
    eyebrow: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    filterMore: string;
    categories: {
      all: string;
      new: string;
      second: string;
      tablet: string;
    };
    allBrands: string;
    priceLabels: {
      all: string;
      under3: string;
      range3to7: string;
      range7to12: string;
      above12: string;
    };
    promoOnly: string;
    sort: {
      recommended: string;
      priceAsc: string;
      priceDesc: string;
      rating: string;
    };
    resetFilter: string;
    showingCount: string;
    inStock: string;
    lowStock: string;
    consultWa: string;
    viewDetails: string;
    noResultsTitle: string;
    noResultsDesc: string;
  };
  accessoriesPage: {
    badge: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    filterMore: string;
    allCategories: string;
    categories: {
      all: string;
      audio: string;
      charger: string;
      powerbank: string;
      case: string;
    };
    allBrands: string;
    promoOnly: string;
    resetFilter: string;
    sortBy: string;
    sortLowest: string;
    sortHighest: string;
    sortNewest: string;
    sortPopular: string;
    activeFilters: string;
    clearFilters: string;
    found: string;
    orderWa: string;
    detail: string;
    stock: {
      available: string;
      low: string;
      empty: string;
    };
    noResultsTitle: string;
    noResultsDesc: string;
  };
  accessoryDetail: {
    stock: string;
    stockAvailable: string;
    originalWarranty: string;
    productDescription: string;
    keySpecs: string;
    orderViaWa: string;
    backToCatalog: string;
    garansiToko: string;
    bantuanPindahData: string;
    deliveryBatam: string;
    badges: {
      warranty: string;
      delivery: string;
      response: string;
      original: string;
    };
    recommendationTitle: string;
    recommendationEyebrow: string;
    viewAll: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  productDetail: {
    inStockCount: string;
    color: string;
    storageCapacity: string;
    specsAndFeatures: string;
    orderViaWa: string;
    originalWarranty: string;
    backToCatalog: string;
    description: string;
    aboutProduct: string;
    keyFeatures: string;
    inTheBox: string;
    technicalSpecs: string;
    specsLabels: {
      screen: string;
      chipset: string;
      camera: string;
      battery: string;
      network: string;
      os: string;
      warranty: string;
    };
    otherSeries: string;
    recommendedTitle: string;
    viewAll: string;
    deliveryNote: string;
    inStockBadge: string;
    limitedStockBadge: string;
    consultWa: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  footer: {
    tagline: string;
    menu: string;
    categories: string;
    categoryNew: string;
    categorySecond: string;
    information: string;
    contact: string;
    howToBuy: string;
    warrantyReturn: string;
    shipping: string;
    terms: string;
    privacy: string;
    rights: string;
  };
  location: {
    eyebrow: string;
    title: string;
    desc: string;
    openHoursTitle: string;
    openHours: string;
    addressTitle: string;
    address: string;
    openMaps: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  id: {
    nav: {
      home: "Home",
      products: "Produk",
      accessories: "Aksesoris",
      about: "Tentang Kami",
      contact: "Kontak",
      chatWa: "Chat WhatsApp",
    },
    hero: {
      title1: "Temukan",
      title2: "Smartphone",
      title3: "Impianmu",
      description:
        "Smartphone original berkualitas dengan harga terbaik, garansi resmi dan pelayanan terpercaya.",
      viewProducts: "Lihat Produk",
      chatWa: "Chat WhatsApp",
      badge1: "Garansi Resmi",
      badge1Sub: "Aman & Terpercaya",
      badge2: "Produk 100% Original",
      badge2Sub: "Bukan Barang Rekondisi",
      badge3: "Harga Terbaik",
      badge3Sub: "Promo & Cashback Tiap Hari",
    },
    whyUs: {
      eyebrow: "KENAPA MEMBELI DI KONTERKU?",
      title: "Lebih dari Sekadar Toko HP",
      features: [
        {
          title: "Produk Terpercaya",
          desc: "Semua produk original dan berkualitas.",
        },
        {
          title: "Garansi Resmi",
          desc: "Garansi resmi untuk setiap produk.",
        },
        {
          title: "Harga Kompetitif",
          desc: "Harga terbaik dengan kualitas terbaik.",
        },
        {
          title: "Layanan Ramah",
          desc: "Kami siap membantu kebutuhanmu.",
        },
      ],
    },
    productGrid: {
      eyebrow: "PILIHAN SMARTPHONE",
      title: "Produk Terbaru & Terlaris",
      desc: "Berbagai pilihan smartphone dari brand terbaik dengan harga bersaing.",
      viewAll: "Lihat Semua Produk",
      orderWa: "Pesan Sekarang",
      condition: "Kondisi",
      storage: "Memori",
      newBadge: "Baru",
      secondBadge: "Second Berkualitas",
    },
    about: {
      eyebrow: "TENTANG KAMI",
      title: "Lebih dari Sekadar Toko HP",
      story1:
        "KONTERKU berdiri sejak 2018 dengan komitmen memberikan produk smartphone terbaik dengan harga bersaing dan pelayanan yang jujur & ramah.",
      story2: "Kepuasan pelanggan adalah prioritas kami.",
      statYears: "Tahun Pengalaman",
      statCustomers: "Pelanggan Puas",
      statTransactions: "Transaksi Aman",
    },
    promo: {
      eyebrow: "PROMO SPESIAL BULAN INI",
      title: "Diskon Hingga 30%",
      desc: "Dapatkan harga spesial untuk berbagai smartphone pilihan.",
      viewPromo: "Lihat Promo",
      claimCashback: "Klaim Cashback",
      seeAll: "Lihat Semua Promo",
    },
    testimonial: {
      eyebrow: "TESTIMONI PELANGGAN",
      title: "Apa Kata Mereka?",
      role: "Pelanggan",
      ariaPrev: "Testimoni Sebelumnya",
      ariaNext: "Testimoni Berikutnya",
      quotes: [
        {
          id: 1,
          name: "Rizky Pratama",
          text: "Pelayanan ramah, harga terbaik dan barang original. Recommended!",
        },
        {
          id: 2,
          name: "Dewi Sartika",
          text: "Sudah langganan disini, selalu puas dengan produknya.",
        },
        {
          id: 3,
          name: "Fajar Nugroho",
          text: "Garansi resmi dan proses cepat. Top banget!",
        },
        {
          id: 4,
          name: "Budi Santoso",
          text: "Unit iPhone 15 Pro Max BNIB segel resmi. CS sangat responsif dan informatif!",
        },
        {
          id: 5,
          name: "Siti Rahma",
          text: "Tukar tambah Samsung S24 Ultra dinilai dengan harga pantas. Rekomendasi toko gadget terbaik.",
        },
      ],
    },
    aboutPage: {
      eyebrow: "TENTANG KAMI",
      title: "Pusat Smartphone & Gadget Resmi di Batam",
      description:
        "KONTERKU hadir memberikan pengalaman belanja gadget yang aman, jujur, dan menyenangkan dengan jaminan unit 100% original.",
      storeBadge: "Store Batam Center — Jl. Raja H. Fisabilillah No. 123",
      storyEyebrow: "Didedikasikan untuk Pelanggan",
      storyTitle: "Komitmen Sederhana: Kualitas Asli & Transparan",
      story1:
        "Berdiri sejak 2018 di Batam, KONTERKU berkomitmen menjadi tempat terpercaya bagi siapa saja yang ingin membeli smartphone idaman tanpa rasa khawatir.",
      story2:
        "Seluruh unit yang kami sediakan dipastikan melalui proses pengecekan menyeluruh dengan IMEI resmi terdaftar dan garansi toko yang jelas.",
      advantagesEyebrow: "KEUNGGULAN KAMI",
      advantagesTitle: "Alasan Berbelanja di KONTERKU",
      advantage1Title: "100% Original & Bergaransi",
      advantage1Desc:
        "Semua smartphone dan aksesoris dijamin keasliannya dengan nomor IMEI resmi yang terdaftar dan aman digunakan selamanya.",
      advantage2Title: "Garansi Resmi & Layanan Purna Jual",
      advantage2Desc:
        "Garansi toko yang jelas dan transparan. Tim teknisi kami siap membantu jika ada kendala pabrik pada perangkat kamu.",
      advantage3Title: "Gratis Pindah Data & Pasang",
      advantage3Desc:
        "Beli HP baru tanpa repot. Kami bantu pindah kontak, foto, chat WhatsApp, serta pemasangan tempered glass secara rapi tanpa biaya.",
      infoEyebrow: "PUSAT PANDUAN PELANGGAN",
      infoTitle: "Informasi",
      infoDesc:
        "Panduan lengkap cara pembelian, garansi & retur, pengiriman, syarat & ketentuan, serta kebijakan privasi di KONTERKU.",
      infoSidebarTitle: "Informasi",
      infoSidebarSubtitle: "Pilih topik panduan layanan",
      ctaTitle: "Punya Pertanyaan Seputar Produk & Layanan Kami?",
      ctaDesc:
        "Tim customer care kami siap membantu konsultasi unit, garansi, maupun pengiriman resmi setiap hari.",
      ctaBtn: "Tanya Admin via WhatsApp",
      sections: {
        howToBuy: {
          title: "Cara Pembelian",
          subtitle: "Panduan pemesanan unit baru & second di KONTERKU",
          steps: [
            {
              num: "1",
              title: "Pilih Unit & Cek Ketersediaan",
              desc: "Lihat katalog kami di website atau konsultasikan tipe HP, varian memori, dan pilihan warna ready stock langsung ke WhatsApp customer care.",
            },
            {
              num: "2",
              title: "Pilihan Cara Transaksi",
              desc: "Datang langsung ke toko fisik di Batam Center atau pilih opsi pengiriman online aman (layanan COD untuk area Batam & transfer bank resmi).",
            },
            {
              num: "3",
              title: "Uji Fisik & Bantuan Pindah Data",
              desc: "Unit diuji fungsionalitasnya bersama tim kami, dibantu pindah kontak & chat WhatsApp dari HP lama, serta pemasangan pelindung layar secara gratis.",
            },
          ],
        },
        warranty: {
          title: "Garansi & Retur",
          subtitle: "Jaminan perlindungan unit resmi & toko terpercaya",
          steps: [
            {
              num: "1",
              title: "Garansi Resmi Unit Baru",
              desc: "Semua produk baru dilindungi garansi resmi distributor/prinsipal selama 1 tahun dan dapat diklaim di seluruh service center resmi di Indonesia.",
            },
            {
              num: "2",
              title: "Garansi Toko Unit Second",
              desc: "Unit second mendapatkan garansi fungsionalitas mesin 30 hari serta garansi IMEI aktif seumur hidup bebas dari risiko blokir sinyal.",
            },
            {
              num: "3",
              title: "Kebijakan Retur 7 Hari",
              desc: "Jika ditemukan kendala cacat pabrik dalam kurun 7 hari pertama sejak pembelian, kami siap melakukan penggantian unit secara cepat.",
            },
          ],
        },
        shipping: {
          title: "Pengiriman",
          subtitle: "Layanan kirim cepat, aman, dan berasuransi",
          steps: [
            {
              num: "1",
              title: "Ambil Langsung di Toko (Store Pickup)",
              desc: "Unit disiapkan sebelum kedatangan pelanggan di toko Batam Center. Buka setiap hari pukul 09.00 — 22.00 WIB tanpa biaya tambahan.",
            },
            {
              num: "2",
              title: "Kurir Instan & COD Batam",
              desc: "Layanan antar cepat tiba dalam hitungan jam untuk seluruh wilayah Kota Batam dengan opsi pembayaran saat barang tiba (Cash On Delivery).",
            },
            {
              num: "3",
              title: "Ekspedisi Nasional Berasuransi",
              desc: "Pengiriman ke seluruh Indonesia menggunakan JNE/J&T dengan bubble wrap tebal, proteksi asuransi penuh, dan nomor resi pengiriman real-time.",
            },
          ],
        },
        terms: {
          title: "Syarat & Ketentuan",
          subtitle: "Aturan transaksi transparan & legalitas terjamin",
          steps: [
            {
              num: "1",
              title: "Legalitas IMEI Terdaftar Resmi",
              desc: "Seluruh unit smartphone dan tablet yang dijual berstatus legal dengan nomor IMEI terdaftar resmi pada database Kemenperin atau Bea Cukai RI.",
            },
            {
              num: "2",
              title: "Transparansi Harga & Nota Resmi",
              desc: "Harga yang tertera adalah harga netto tanpa biaya terselubung. Setiap transaksi selalu disertai nota fisik/digital resmi sebagai bukti klaim garansi.",
            },
            {
              num: "3",
              title: "Ketentuan Pembatalan & Tukar Tambah",
              desc: "Pesanan yang telah diproses kirim tidak dapat dibatalkan sepihak. Program tukar tambah (trade-in) mengikuti estimasi grade fisik unit lama secara transparan.",
            },
          ],
        },
        privacy: {
          title: "Kebijakan Privasi",
          subtitle: "Perlindungan data pribadi dan keamanan pelanggan",
          steps: [
            {
              num: "1",
              title: "Kerahasiaan Data Pelanggan",
              desc: "Data identitas, nomor telepon WhatsApp, dan alamat pengiriman hanya digunakan untuk memproses pesanan, pengiriman, dan pencatatan garansi.",
            },
            {
              num: "2",
              title: "Bebas Spam & Tanpa Pihak Ketiga",
              desc: "KONTERKU berkomitmen tidak pernah membagikan, menyewakan, atau menjual data pribadi pelanggan kepada pihak ketiga mana pun.",
            },
            {
              num: "3",
              title: "Keamanan Backup & Pindah Data",
              desc: "Saat proses bantuan pindah data di toko, seluruh file, foto, kontak, dan pesan pelanggan dijamin terjaga kerahasiaannya dan tidak disimpan di sistem toko.",
            },
          ],
        },
      },
    },
    contactPage: {
      eyebrow: "KONTERKU HUBUNGI KAMI",
      titlePart1: "Ceritakan apa yang",
      titleHighlight: "kamu butuhkan.",
      desc: "Isi formulir di samping. Setelah dikirim, kamu akan diarahkan langsung ke WhatsApp resmi KONTERKU untuk melanjutkan percakapan.",
      checklist: [
        "Konsultasi pemilihan smartphone & budget",
        "Informasi promo aktif & cashback mingguan",
        "Pengecekan stok unit & pilihan warna terlengkap",
      ],
      formName: "Nama Lengkap",
      formNamePlaceholder: "Nama kamu",
      formPhone: "No. WhatsApp",
      formPhonePlaceholder: "08xxxxxxxxxx",
      formMsg: "Pesan / Pertanyaan",
      formMsgPlaceholder: "Contoh: Saya sedang mencari smartphone untuk fotografi dengan budget sekitar...",
      formSubmit: "Kirim via WhatsApp",
      formNote: "Setelah menekan tombol, kamu akan diarahkan ke WhatsApp resmi KONTERKU.",
      optionsEyebrow: "Pilihan Komunikasi",
      optionsTitle: "Pilih Cara yang Paling Nyaman",
      optionsDesc: "Kami siap memberikan tanggapan cepat agar kamu bisa langsung mendapatkan informasi yang dibutuhkan.",
      card1Badge: "Fast Response",
      card1Title: "WhatsApp",
      card1Desc: "Cara tercepat untuk bertanya tentang produk, ketersediaan stok, promo, maupun rekomendasi smartphone.",
      card1Action: "Chat sekarang",
      card2Badge: "Formulir Pesan",
      card2Title: "Tanya Spesifik",
      card2Desc: "Punya pertanyaan yang lebih rinci? Sampaikan kebutuhanmu lewat formulir untuk kami siapkan rekomendasi.",
      card2Action: "Isi formulir",
      card3Badge: "Store Fisik",
      card3Title: "Datang Langsung",
      card3Desc: "Ingin melihat dan mencoba unit secara langsung? Kunjungi toko kami di Batam Center untuk pengalaman langsung.",
      card3Action: "Lihat peta lokasi",
      locationEyebrow: "Kunjungi Toko Kami",
      locationTitle: "Lokasi & Informasi Kontak",
      addressTitle: "Alamat Toko",
      addressText: "Jl. Raja H. Fisabilillah No. 123, Batam Center, Kota Batam, Kepulauan Riau 29461",
      hoursTitle: "Jam Operasional",
      hoursText: "Buka setiap hari: 09.00 — 22.00 WIB",
      directContactTitle: "Hubungi Kami Langsung",
      socialTitle: "Kanal Media Sosial",
      ctaTitle: "Lebih Suka Diskusi Langsung via WhatsApp?",
      ctaDesc: "Customer care kami siap membantu pertanyaan spesifikasi, ketersediaan unit, dan rekomendasi terbaik setiap hari.",
      ctaBtn: "Mulai Chat WhatsApp",
    },
    productCatalog: {
      eyebrow: "KOLEKSI LENGKAP",
      title: "Semua Produk Smartphone & Tablet",
      desc: "Pilihan lengkap HP baru, second bergaransi, dan tablet original dengan harga terbaik di Batam.",
      searchPlaceholder: "Cari nama atau spesifikasi smartphone & tablet...",
      filterMore: "Filter Tambahan",
      categories: {
        all: "Semua Kategori",
        new: "HP Baru",
        second: "Second",
        tablet: "Tablet",
      },
      allBrands: "Semua Merek",
      priceLabels: {
        all: "Semua Harga",
        under3: "Di bawah 3 Juta",
        range3to7: "3 - 7 Juta",
        range7to12: "7 - 12 Juta",
        above12: "Di atas 12 Juta",
      },
      promoOnly: "Promo",
      sort: {
        recommended: "Urutkan: Rekomendasi",
        priceAsc: "Harga: Termurah",
        priceDesc: "Harga: Termahal",
        rating: "Rating Tertinggi",
      },
      resetFilter: "Reset Filter",
      showingCount: "Menampilkan",
      inStock: "Stok Tersedia",
      lowStock: "Stok Terbatas",
      consultWa: "Konsultasi via WA",
      viewDetails: "Lihat Detail",
      noResultsTitle: "Tidak ada produk yang cocok",
      noResultsDesc: "Coba ubah kata kunci atau reset filter pencarian kamu.",
    },
    accessoriesPage: {
      badge: "Katalog Aksesoris Resmi",
      title: "Koleksi Aksesoris Smartphone",
      desc: "Lengkapi smartphone kamu dengan TWS audio, fast charger GaN, powerbank, casing MagSafe, dan pelindung layar 9H original bergaransi.",
      searchPlaceholder: "Cari aksesoris (misal: Anker, GaN, Spigen, AirPods, Powerbank)...",
      filterMore: "Filter Tambahan",
      allCategories: "Semua Kategori",
      categories: {
        all: "Semua Kategori",
        audio: "Audio",
        charger: "Charger & Kabel",
        powerbank: "Powerbank",
        case: "Case & Aksesoris",
      },
      allBrands: "Semua Merek",
      promoOnly: "Promo",
      resetFilter: "Reset Filter",
      sortBy: "Urutkan",
      sortLowest: "Harga: Termurah",
      sortHighest: "Harga: Termahal",
      sortNewest: "Terbaru",
      sortPopular: "Rating Tertinggi",
      activeFilters: "Filter Aktif",
      clearFilters: "Hapus Semua",
      found: "aksesoris ditemukan",
      orderWa: "Konsultasi via WA",
      detail: "Detail",
      stock: {
        available: "Stok Tersedia",
        low: "Stok Terbatas",
        empty: "Habis",
      },
      noResultsTitle: "Tidak ada aksesoris yang cocok",
      noResultsDesc: "Coba ubah kata kunci atau reset filter pencarian kamu.",
    },
    accessoryDetail: {
      stock: "Stok",
      stockAvailable: "Stok Tersedia",
      originalWarranty: "Harga original & bergaransi resmi.",
      productDescription: "Deskripsi Produk",
      keySpecs: "Keunggulan & Spesifikasi",
      orderViaWa: "Pesan via WhatsApp Sekarang",
      backToCatalog: "Kembali ke Katalog Aksesoris",
      garansiToko: "Garansi Toko Resmi",
      bantuanPindahData: "Jaminan Unit Baru & Segel",
      deliveryBatam: "Bisa COD Batam & Kirim Luar Kota",
      badges: {
        warranty: "Garansi Resmi",
        delivery: "Pengiriman Aman",
        response: "Respon Cepat",
        original: "Produk Original",
      },
      recommendationTitle: "Aksesoris Sejenis Lainnya",
      recommendationEyebrow: "PILIHAN LAINNYA",
      viewAll: "Lihat Semua",
      ctaTitle: "Dapatkan Aksesoris Gadget Pilihanmu Sekarang",
      ctaDesc: "Semua produk aksesoris dijamin 100% original dan bergaransi resmi. Hubungi tim kami via WhatsApp untuk pemesanan cepat.",
      ctaBtn: "Pesan via WhatsApp",
    },
    productDetail: {
      inStockCount: "unit ready",
      color: "Pilihan Warna",
      storageCapacity: "Kapasitas",
      specsAndFeatures: "Spesifikasi Unggulan",
      orderViaWa: "Pesan via WhatsApp Sekarang",
      originalWarranty: "Harga original & bergaransi resmi.",
      backToCatalog: "Kembali ke Katalog Produk",
      description: "Deskripsi Produk",
      aboutProduct: "Tentang",
      keyFeatures: "Fitur Utama",
      inTheBox: "Isi Dalam Kotak",
      technicalSpecs: "Spesifikasi Teknis",
      specsLabels: {
        screen: "Layar",
        chipset: "Chipset",
        camera: "Kamera",
        battery: "Baterai",
        network: "Jaringan",
        os: "Sistem Operasi",
        warranty: "Garansi",
      },
      otherSeries: "LAINNYA",
      recommendedTitle: "Rekomendasi Smartphone",
      viewAll: "Lihat Semua",
      deliveryNote: "Unit dapat diambil langsung di toko fisik Batam Center atau dikirim dengan kurir instan se-Kota Batam & ekspedisi seluruh Indonesia.",
      inStockBadge: "Stok Tersedia",
      limitedStockBadge: "Stok Terbatas",
      consultWa: "Konsultasi via WA",
      ctaTitle: "Tertarik Membawa Pulang Smartphone Ini?",
      ctaDesc: "Dapatkan penawaran harga terbaik dan konsultasikan ketersediaan unit langsung via WhatsApp bersama customer care kami.",
      ctaBtn: "Pesan Unit Ini via WhatsApp",
    },
    cta: {
      title: "Belum Menemukan Smartphone yang Kamu Cari?",
      description:
        "Tanyakan ketersediaan tipe, warna, atau promo aktif hari ini langsung ke tim kami. Kami siap mencarikan unit terbaik untukmu.",
      button: "Tanya Stok via WhatsApp",
    },
    footer: {
      tagline:
        "Smartphone baru & second berkualitas dengan harga terbaik dan pelayanan terpercaya.",
      menu: "Menu",
      categories: "Kategori",
      categoryNew: "Smartphone Baru",
      categorySecond: "Smartphone Second",
      information: "Informasi",
      contact: "Kontak",
      howToBuy: "Cara Pembelian",
      warrantyReturn: "Garansi & Retur",
      shipping: "Pengiriman",
      terms: "Syarat & Ketentuan",
      privacy: "Kebijakan Privasi",
      rights: "Semua hak dilindungi undang-undang.",
    },
    location: {
      eyebrow: "LOKASI TOKO KAMI",
      title: "Kunjungi Store KONTERKU",
      desc: "Datang langsung untuk konsultasi tipe, cek fisik smartphone impianmu, dan nikmati layanan ramah dari staf kami.",
      openHoursTitle: "Jam Operasional",
      openHours: "Setiap Hari: 09.00 — 22.00 WIB",
      addressTitle: "Alamat Toko",
      address: "Store Batam Center — Jl. Raja H. Fisabilillah No. 123",
      openMaps: "Buka di Google Maps",
    },
  },

  en: {
    nav: {
      home: "Home",
      products: "Products",
      accessories: "Accessories",
      about: "About Us",
      contact: "Contact",
      chatWa: "Chat WhatsApp",
    },
    hero: {
      title1: "Discover Your",
      title2: "Dream",
      title3: "Smartphone",
      description:
        "Premium original smartphones at the best prices, official warranty, and trusted service.",
      viewProducts: "View Products",
      chatWa: "Chat WhatsApp",
      badge1: "Official Warranty",
      badge1Sub: "Safe & Trusted",
      badge2: "100% Original Products",
      badge2Sub: "Never Refurbished",
      badge3: "Best Price Guarantee",
      badge3Sub: "Daily Promos & Cashback",
    },
    whyUs: {
      eyebrow: "WHY SHOP AT KONTERKU?",
      title: "More Than Just a Phone Store",
      features: [
        {
          title: "Trusted Quality",
          desc: "All products are 100% genuine and strictly tested.",
        },
        {
          title: "Official Warranty",
          desc: "Official manufacturer and store warranty on every unit.",
        },
        {
          title: "Competitive Pricing",
          desc: "Best market rates with complete transparency.",
        },
        {
          title: "Friendly Service",
          desc: "Our dedicated team is always ready to assist you.",
        },
      ],
    },
    productGrid: {
      eyebrow: "CURATED SMARTPHONES",
      title: "Latest & Best-Selling Devices",
      desc: "Explore top brand smartphones tailored to your needs and budget.",
      viewAll: "View All Products",
      orderWa: "Order Now",
      condition: "Condition",
      storage: "Storage",
      newBadge: "Brand New",
      secondBadge: "Certified Pre-Owned",
    },
    about: {
      eyebrow: "ABOUT US",
      title: "More Than Just a Phone Store",
      story1:
        "Founded in 2018, KONTERKU is committed to delivering top-tier smartphones at competitive prices with honest, warm, and attentive customer service.",
      story2: "Customer satisfaction is our utmost priority.",
      statYears: "Years Experience",
      statCustomers: "Happy Customers",
      statTransactions: "Secure Orders",
    },
    promo: {
      eyebrow: "SPECIAL PROMO THIS MONTH",
      title: "Discounts Up to 30%",
      desc: "Get exclusive deals on selected flagship and mid-range devices.",
      viewPromo: "View Promo",
      claimCashback: "Claim Cashback",
      seeAll: "View All Offers",
    },
    testimonial: {
      eyebrow: "CUSTOMER TESTIMONIALS",
      title: "What Our Customers Say",
      role: "Customer",
      ariaPrev: "Previous Testimonial",
      ariaNext: "Next Testimonial",
      quotes: [
        {
          id: 1,
          name: "Rizky Pratama",
          text: "Warm customer service, best pricing, and 100% original units. Highly recommended!",
        },
        {
          id: 2,
          name: "Dewi Sartika",
          text: "A regular customer here, always completely satisfied with the products.",
        },
        {
          id: 3,
          name: "Fajar Nugroho",
          text: "Official warranty and lightning-fast process. Truly top notch!",
        },
        {
          id: 4,
          name: "Budi Santoso",
          text: "iPhone 15 Pro Max BNIB factory sealed. Support was super responsive and informative!",
        },
        {
          id: 5,
          name: "Siti Rahma",
          text: "Trade-in for my Samsung S24 Ultra was valued at a very fair price. The best gadget store in Batam.",
        },
      ],
    },
    aboutPage: {
      eyebrow: "ABOUT US",
      title: "Official Smartphone & Gadget Hub in Batam",
      description:
        "KONTERKU delivers a secure, honest, and delightful gadget shopping experience with 100% original unit guarantee.",
      storeBadge: "Batam Center Store — Jl. Raja H. Fisabilillah No. 123",
      storyEyebrow: "Dedicated to Customers",
      storyTitle: "Simple Commitment: Genuine Quality & Transparency",
      story1:
        "Established since 2018 in Batam, KONTERKU is dedicated to being a trusted destination for anyone seeking their dream smartphone with total peace of mind.",
      story2:
        "All devices we provide undergo rigorous multi-point inspection with officially registered IMEI and crystal-clear store warranty.",
      advantagesEyebrow: "OUR ADVANTAGES",
      advantagesTitle: "Why Shop at KONTERKU",
      advantage1Title: "100% Genuine & Guaranteed",
      advantage1Desc:
        "All smartphones and accessories are guaranteed authentic with official registered IMEI numbers for lifetime peace of mind.",
      advantage2Title: "Official Warranty & After-Sales",
      advantage2Desc:
        "Transparent store warranty. Our certified technician team is ready to assist should any factory defects arise on your device.",
      advantage3Title: "Free Data Transfer & Installation",
      advantage3Desc:
        "Hassle-free phone upgrade. We help transfer contacts, photos, WhatsApp chats, and install tempered glass neatly at zero cost.",
      infoEyebrow: "CUSTOMER GUIDE CENTER",
      infoTitle: "Information & Guides",
      infoDesc:
        "Comprehensive guidelines for ordering, warranty & returns, nationwide delivery, terms & conditions, and privacy policy at KONTERKU.",
      infoSidebarTitle: "Information",
      infoSidebarSubtitle: "Select service guide topic",
      ctaTitle: "Have Questions About Our Products & Services?",
      ctaDesc:
        "Our customer care team is ready to assist with device inquiries, warranty, and nationwide delivery every day.",
      ctaBtn: "Ask Admin via WhatsApp",
      sections: {
        howToBuy: {
          title: "How to Order",
          subtitle: "Ordering guide for new and certified pre-owned devices at KONTERKU",
          steps: [
            {
              num: "1",
              title: "Select Unit & Check Stock",
              desc: "Explore our catalog on this website or consult phone models, storage capacities, and available colors directly with our WhatsApp customer care.",
            },
            {
              num: "2",
              title: "Choose Payment & Delivery",
              desc: "Visit our physical store in Batam Center directly or choose safe online delivery (COD available across Batam & official bank transfer).",
            },
            {
              num: "3",
              title: "Physical Inspection & Data Migration",
              desc: "The device is tested for full functionality with our team, followed by free contact & WhatsApp chat migration from your old device and complimentary screen protector installation.",
            },
          ],
        },
        warranty: {
          title: "Warranty & Returns",
          subtitle: "Complete protection for official units from a trusted store",
          steps: [
            {
              num: "1",
              title: "Official 1-Year Distributor Warranty",
              desc: "All brand new units come with a 1-year official distributor/brand warranty claimable at any authorized service center across Indonesia.",
            },
            {
              num: "2",
              title: "Pre-Owned Hardware & IMEI Guarantee",
              desc: "Certified pre-owned devices include a 30-day comprehensive store functional warranty and lifetime active IMEI guarantee against signal blocking.",
            },
            {
              num: "3",
              title: "7-Day Fast Replacement Policy",
              desc: "If any factory defect is discovered within the first 7 days of purchase, we offer immediate replacement unit support.",
            },
          ],
        },
        shipping: {
          title: "Shipping & Delivery",
          subtitle: "Fast, insured, and reliable delivery service",
          steps: [
            {
              num: "1",
              title: "Store Pickup at Batam Center",
              desc: "Your device is carefully prepared before your arrival at our Batam Center store. Open every day from 09:00 AM to 10:00 PM WIB with no extra fees.",
            },
            {
              num: "2",
              title: "Instant Courier & COD in Batam",
              desc: "Rapid delivery within hours across Batam City with Cash on Delivery (COD) payment upon inspection.",
            },
            {
              num: "3",
              title: "Insured Nationwide Expedition",
              desc: "Shipping across Indonesia via JNE/J&T with extra thick bubble wrap, full transit insurance protection, and real-time tracking.",
            },
          ],
        },
        terms: {
          title: "Terms & Conditions",
          subtitle: "Transparent transaction rules & guaranteed legality",
          steps: [
            {
              num: "1",
              title: "Legally Registered IMEI Numbers",
              desc: "Every smartphone and tablet sold is 100% legal with verified IMEI registration on official Indonesian Ministry (Kemenperin / Bea Cukai) databases.",
            },
            {
              num: "2",
              title: "Transparent Net Pricing & Official Invoice",
              desc: "Displayed prices are net without hidden fees. Every purchase includes an official physical or digital invoice for valid warranty claims.",
            },
            {
              num: "3",
              title: "Cancellation & Trade-In Terms",
              desc: "Orders that have been dispatched cannot be unilaterally cancelled. Trade-in valuation follows clear physical and functional grading standards.",
            },
          ],
        },
        privacy: {
          title: "Privacy Policy",
          subtitle: "Customer personal data protection and digital security",
          steps: [
            {
              num: "1",
              title: "Customer Data Confidentiality",
              desc: "Identity, WhatsApp phone numbers, and shipping addresses are strictly used to process orders, shipments, and warranty registrations.",
            },
            {
              num: "2",
              title: "Zero Spam & No Third-Party Sharing",
              desc: "KONTERKU is committed to never sharing, leasing, or selling customer personal data to any third parties.",
            },
            {
              num: "3",
              title: "Secure In-Store Data Migration",
              desc: "During complimentary data transfer at our store, all files, photos, contacts, and personal messages remain strictly confidential and are never retained.",
            },
          ],
        },
      },
    },
    contactPage: {
      eyebrow: "CONTACT KONTERKU",
      titlePart1: "Tell us what",
      titleHighlight: "you need.",
      desc: "Fill out the form below. Once submitted, you will be redirected straight to KONTERKU's official WhatsApp to chat with our team.",
      checklist: [
        "Smartphone & budget consultation",
        "Active deals & weekly cashback details",
        "Live unit stock & complete color checks",
      ],
      formName: "Full Name",
      formNamePlaceholder: "Your name",
      formPhone: "WhatsApp Number",
      formPhonePlaceholder: "08xxxxxxxxxx",
      formMsg: "Message / Inquiry",
      formMsgPlaceholder: "Example: I am looking for a camera-centric smartphone with budget...",
      formSubmit: "Send via WhatsApp",
      formNote: "After clicking the button, you will be redirected to KONTERKU's official WhatsApp.",
      optionsEyebrow: "Communication Options",
      optionsTitle: "Choose Your Preferred Way",
      optionsDesc: "We provide prompt responses so you can quickly get all the information you need.",
      card1Badge: "Fast Response",
      card1Title: "WhatsApp",
      card1Desc: "The quickest way to ask about products, stock availability, promo deals, or device recommendations.",
      card1Action: "Chat now",
      card2Badge: "Inquiry Form",
      card2Title: "Specific Inquiry",
      card2Desc: "Have detailed requirements? Send them through our form and we will prepare tailored recommendations.",
      card2Action: "Fill out form",
      card3Badge: "Physical Store",
      card3Title: "Visit In-Store",
      card3Desc: "Want to hold and test devices hands-on? Stop by our Batam Center store for a firsthand experience.",
      card3Action: "View store map",
      locationEyebrow: "Visit Our Store",
      locationTitle: "Location & Contact Information",
      addressTitle: "Store Address",
      addressText: "Jl. Raja H. Fisabilillah No. 123, Batam Center, Batam City, Riau Islands 29461",
      hoursTitle: "Opening Hours",
      hoursText: "Open every day: 09:00 AM — 10:00 PM WIB",
      directContactTitle: "Contact Us Directly",
      socialTitle: "Social Media Channels",
      ctaTitle: "Prefer Chatting Directly via WhatsApp?",
      ctaDesc: "Our customer care team is ready to help with specifications, unit availability, and best recommendations every day.",
      ctaBtn: "Start WhatsApp Chat",
    },
    productCatalog: {
      eyebrow: "COMPLETE CATALOG",
      title: "All Smartphones & Tablets",
      desc: "Full collection of brand new, certified pre-owned devices, and original tablets at the best value in Batam.",
      searchPlaceholder: "Search smartphone or tablet name & specs...",
      filterMore: "Additional Filters",
      categories: {
        all: "All Categories",
        new: "New Phones",
        second: "Pre-Owned",
        tablet: "Tablets",
      },
      allBrands: "All Brands",
      priceLabels: {
        all: "All Prices",
        under3: "Under 3 Million",
        range3to7: "3 - 7 Million",
        range7to12: "7 - 12 Million",
        above12: "Above 12 Million",
      },
      promoOnly: "Promo",
      sort: {
        recommended: "Sort: Recommended",
        priceAsc: "Price: Lowest",
        priceDesc: "Price: Highest",
        rating: "Top Rated",
      },
      resetFilter: "Reset Filters",
      showingCount: "Showing",
      inStock: "In Stock",
      lowStock: "Limited Stock",
      consultWa: "Inquire via WA",
      viewDetails: "View Details",
      noResultsTitle: "No products match your criteria",
      noResultsDesc: "Try changing keywords or resetting your search filters.",
    },
    accessoriesPage: {
      badge: "Official Accessories Catalog",
      title: "Smartphone Accessories Collection",
      desc: "Elevate your smartphone with genuine TWS audio, GaN fast chargers, powerbanks, MagSafe cases, and official warranty screen protectors.",
      searchPlaceholder: "Search accessories (e.g. Anker, GaN, Spigen, AirPods, Powerbank)...",
      filterMore: "Additional Filters",
      allCategories: "All Categories",
      categories: {
        all: "All Categories",
        audio: "Audio & TWS",
        charger: "Chargers & Cables",
        powerbank: "Powerbanks",
        case: "Cases & Protection",
      },
      allBrands: "All Brands",
      promoOnly: "Promo",
      resetFilter: "Reset Filters",
      sortBy: "Sort By",
      sortLowest: "Price: Lowest",
      sortHighest: "Price: Highest",
      sortNewest: "Newest",
      sortPopular: "Top Rated",
      activeFilters: "Active Filters",
      clearFilters: "Clear All",
      found: "accessories found",
      orderWa: "Inquire via WA",
      detail: "Details",
      stock: {
        available: "In Stock",
        low: "Limited Stock",
        empty: "Sold Out",
      },
      noResultsTitle: "No accessories found",
      noResultsDesc: "Try adjusting your search keyword or reset the category filters.",
    },
    accessoryDetail: {
      stock: "Stock",
      stockAvailable: "In Stock",
      originalWarranty: "Genuine product with official warranty.",
      productDescription: "Product Description",
      keySpecs: "Key Features & Specs",
      orderViaWa: "Order via WhatsApp Now",
      backToCatalog: "Back to Accessories Catalog",
      garansiToko: "Official Store Warranty",
      bantuanPindahData: "Brand New & Factory Sealed",
      deliveryBatam: "Same-Day Delivery & Nationwide Shipping",
      badges: {
        warranty: "Official Warranty",
        delivery: "Secure Delivery",
        response: "Quick Response",
        original: "100% Original",
      },
      recommendationTitle: "Related Accessories",
      recommendationEyebrow: "MORE OPTIONS",
      viewAll: "View All",
      ctaTitle: "Get Your Genuine Gadget Accessory Today",
      ctaDesc: "All accessories are guaranteed 100% authentic with official warranty. Reach out to our WhatsApp team for quick orders.",
      ctaBtn: "Order via WhatsApp",
    },
    productDetail: {
      inStockCount: "units available",
      color: "Color Option",
      storageCapacity: "Capacity",
      specsAndFeatures: "Highlighted Specifications",
      orderViaWa: "Order via WhatsApp Now",
      originalWarranty: "Genuine product with official warranty.",
      backToCatalog: "Back to Products Catalog",
      description: "Product Description",
      aboutProduct: "About",
      keyFeatures: "Key Features",
      inTheBox: "In The Box",
      technicalSpecs: "Technical Specifications",
      specsLabels: {
        screen: "Display",
        chipset: "Chipset",
        camera: "Camera",
        battery: "Battery",
        network: "Network",
        os: "Operating System",
        warranty: "Warranty",
      },
      otherSeries: "SERIES",
      recommendedTitle: "Recommended Smartphones",
      viewAll: "View All",
      deliveryNote: "Devices can be picked up directly at our Batam Center physical store or delivered via instant courier in Batam & nationwide expedition.",
      inStockBadge: "In Stock",
      limitedStockBadge: "Limited Stock",
      consultWa: "Inquire via WA",
      ctaTitle: "Interested in Taking This Smartphone Home?",
      ctaDesc: "Get the best price quote and check live unit availability directly via WhatsApp with our friendly customer care.",
      ctaBtn: "Order This Device via WhatsApp",
    },
    cta: {
      title: "Haven't Found the Phone You're Looking For?",
      description:
        "Ask our team directly about specific models, colors, or today's active deals. We're here to help you get the best smartphone.",
      button: "Check Stock via WhatsApp",
    },
    footer: {
      tagline:
        "Quality new & pre-owned smartphones with competitive pricing and trusted service.",
      menu: "Menu",
      categories: "Categories",
      categoryNew: "New Smartphones",
      categorySecond: "Pre-Owned Smartphones",
      information: "Information",
      contact: "Contact",
      howToBuy: "How to Buy",
      warrantyReturn: "Warranty & Returns",
      shipping: "Shipping",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
    },
    location: {
      eyebrow: "STORE LOCATION",
      title: "Visit KONTERKU Store",
      desc: "Stop by our physical store to check devices, test hands-on, and consult directly with our friendly team.",
      openHoursTitle: "Opening Hours",
      openHours: "Every Day: 09:00 AM — 10:00 PM WIB",
      addressTitle: "Store Address",
      address: "Batam Center Store — Jl. Raja H. Fisabilillah No. 123",
      openMaps: "Open in Google Maps",
    },
  },
};
