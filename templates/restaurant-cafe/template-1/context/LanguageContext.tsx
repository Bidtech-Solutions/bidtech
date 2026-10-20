'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type LangCode = 'ID' | 'EN';

export interface LanguageOption {
  code: LangCode;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ID', label: 'Bahasa Indonesia' },
  { code: 'EN', label: 'English' },
];

export const ID = {
  // Nav
  nav: {
    home: 'Beranda',
    about: 'Tentang',
    menu: 'Menu',
    gallery: 'Galeri',
    team: 'Tim',
    contact: 'Kontak',
    reservation: 'Reservasi Meja',
  },
  // Backward compatibility
  home: 'Beranda',
  about: 'Tentang',
  menu: 'Menu',
  gallery: 'Galeri',
  contact: 'Kontak',
  team: 'Tim',
  reservation: 'Reservasi',

  // Hero Section
  hero: {
    eyebrow: 'Gastronomi Autentik',
    titleLine1: 'Bahan Segar,',
    titleLine2: 'Rasa Tak Terlupakan',
    subtitle: 'Rasakan seni kuliner kelas atas dengan kesegaran langsung dari ladang di setiap gigitan.',
    primaryCta: 'Reservasi Meja',
    secondaryCta: 'Lihat Menu',
  },

  // 3 Pillars / Features
  pillars: [
    {
      title: 'Bahan Segar dari Petani',
      description: 'Diambil setiap hari dari pertanian organik lokal untuk memastikan kualitas tertinggi dan rasa musiman yang optimal.',
    },
    {
      title: 'Resep Racikan Koki',
      description: 'Koki kami meracik hidangan dengan hati, menyeimbangkan rasa tradisi dan sentuhan modern.',
    },
    {
      title: 'Pengalaman yang Hangat',
      description: 'Bukan sekadar makan — kami ingin Anda pulang dengan perut kenyang dan hati senang.',
    },
  ],

  // Menu Section (Beranda & Halaman Menu)
  homeMenu: {
    eyebrow: 'PILIHAN MUSIMAN',
    title: 'Dari Dapur Kami',
    viewDetail: 'Lihat Detail',
    popular: 'Populer',
    pageOf: 'Halaman',
    from: 'dari',
    categories: {
      all: 'Semua',
      burger: 'Burger',
      taco: 'Taco',
      wrap: 'Wrap',
      beverage: 'Minuman',
    },
  },

  // Gallery Section
  homeGallery: {
    eyebrow: 'KOLEKSI KAMI',
    title: 'Galeri Momen & Kelezatan',
    desc: 'Jelajahi kehangatan ruang makan, kesegaran bahan pilihan, dan dedikasi tim kami dalam menyajikan hidangan istimewa untuk Anda.',
    viewAll: 'Lihat Semua Galeri',
    categories: {
      food: 'Makanan',
      interior: 'Interior',
      events: 'Acara',
      staff: 'Staf & Dapur',
    },
  },

  // CTA Section
  cta: {
    eyebrow: 'RESERVASI MEJA',
    title: 'Mari Luangkan Waktu & Nikmati Hidangan Bersama',
    desc: 'Apakah Anda merencanakan makan malam romantis, santap siang keluarga, atau acara khusus? Kami siap menyambut kedatangan Anda.',
    button: 'Pesan Meja Sekarang',
    call: 'Hubungi',
  },

  // Footer Section
  footer: {
    brandDesc: 'Pengalaman kuliner yang berfokus pada bahan-bahan musiman dan teknik yang halus.',
    quickLinks: 'Tautan Cepat',
    links: {
      home: 'Beranda',
      about: 'Tentang Kami',
      menu: 'Menu Lengkap',
      gallery: 'Galeri Foto',
      team: 'Tim Kami',
      contact: 'Kontak & Reservasi',
    },
    location: 'Lokasi',
    followUs: 'Ikuti Kami',
    copyright: 'Hak Cipta Dilindungi.',
    privacy: 'Kebijakan Privasi',
    terms: 'Ketentuan Layanan',
  },

  // Halaman Tentang (/tentang)
  tentang: {
    heroEyebrow: 'Kisah Di Balik Dapur Kami',
    heroTitle1: 'Integritas Bahan,',
    heroTitle2: 'Kualitas Tanpa Kompromi',
    heroDesc: 'Bermula dari kecintaan pada makanan sungguhan. Kami menolak jalan pintas demi menyajikan hidangan yang pantas Anda nikmati bersama orang terkasih.',
    valuesEyebrow: 'PRINSIP KAMI',
    valuesTitle: 'Tiga Fondasi Utama',
    value1Title: 'Bahan Baku Pilihan',
    value1Desc: 'Sayuran renyah dan daging segar kualitas premium yang kami kurasi setiap pagi dari pemasok terpercaya.',
    value2Title: 'Saus Buatan Sendiri',
    value2Desc: 'Tidak ada saus instan. Semua bumbu perap dan saus diracik langsung di dapur kami tanpa pengawet.',
    value3Title: 'Pelayanan Hangat',
    value3Desc: 'Kami menyambut setiap tamu layaknya keluarga yang berkunjung ke rumah kami sendiri.',
    storyEyebrow: 'PERJALANAN KAMI',
    storyTitle: 'Dari Gerobak Sederhana ke Meja Makan Impian',
    storyP1: 'Chef’s Table lahir di sebuah sudut kecil kota pada tahun 2018. Bermula dari dapur kecil berukuran tiga kali empat meter, kami bermimpi menghadirkan makanan berkelas restoran bintang lima dengan kehangatan masakan rumah yang akrab.',
    storyP2: 'Bagi kami, setiap piring bukan sekadar makanan melainkan bentuk rasa terima kasih. Ketika Anda duduk di meja kami, kami ingin Anda melupakan penat hari ini dan menikmati setiap suapan dengan tenang.',
    statsYears: 'Tahun Melayani',
    statsDishes: 'Kreasi Resep',
    statsGuests: 'Tamu Puas',
  },

  // Halaman Menu (/menu)
  menuPage: {
    eyebrow: 'PILIHAN MENU LENGKAP',
    title: 'Daftar Menu Kami',
    subtitle: 'Setiap hidangan dimasak segar saat Anda memesan dengan bahan berkualitas tinggi.',
    categoryFilterTitle: 'Kategori Menu',
    allMenuMobile: 'Pilih Kategori Menu',
    viewDetail: 'Lihat Detail',
    orderWa: 'Pesan via WhatsApp',
    badgePopular: 'Populer',
  },

  // Halaman Detail Produk (/menu/[slug])
  menuDetail: {
    back: 'Kembali ke Menu',
    portion: 'Jumlah Porsi',
    selectAddon: 'Pilih Saus / Tambahan',
    pricePerPortion: 'Harga per porsi',
    estimatedTotal: 'Total Estimasi',
    orderWaBtn: 'Pesan via WhatsApp Sekarang',
    descriptionTitle: 'Deskripsi Hidangan',
    freshGuarantee: 'Dijamin segar dan dibuat langsung saat dipesan',
    notFound: 'Menu tidak ditemukan',
  },

  // Halaman Tim (/tim)
  timPage: {
    heroEyebrow: 'TALENTA KAMI',
    heroTitle: 'Orang-orang di Balik Setiap Cita Rasa',
    heroDesc: 'Dari racikan bumbu koki hingga senyum ramah pelayan, kenali tim kami yang berdedikasi menciptakan pengalaman kuliner tak terlupakan.',
    categories: {
      all: 'Semua Tim',
      headChef: 'Staff Head Chef',
      lineCook: 'Staff Line Cook',
      prepStation: 'Staff Prep Station',
      serviceTeam: 'Staff Service Team',
    },
    expLabel: 'Pengalaman',
    specialtyLabel: 'Keahlian',
  },

  // Halaman Galeri (/galeri)
  galeriPage: {
    heroEyebrow: 'Koleksi Kami',
    heroTitle: 'Galeri Momen & Kelezatan',
    heroDesc: 'Jelajahi kehangatan ruang makan, kesegaran bahan pilihan, dan dedikasi tim kami dalam menyajikan hidangan istimewa untuk Anda.',
    paginationPage: 'Halaman',
    paginationFrom: 'dari',
    prev: 'Sebelumnya',
    next: 'Selanjutnya',
  },

  // Halaman Kontak (/kontak)
  kontakPage: {
    heroEyebrow: 'HUBUNGI KAMI',
    heroTitle: 'Mari Berbincang dengan Kami',
    heroDesc: 'Punya pertanyaan seputar menu, reservasi, atau ingin pesan untuk acara spesial? Kami siap membantu!',
    callBtn: 'Hubungi (0823-7668-0987)',
    locationTitle: 'LOKASI KAMI',
    formTitle: 'Kirim Pesan & Reservasi',
    formDesc: 'Isi formulir di bawah dan tim kami akan segera menghubungi Anda.',
    nameLabel: 'Nama Lengkap',
    namePlaceholder: 'Masukkan nama lengkap...',
    phoneLabel: 'Nomor WhatsApp / Telepon',
    phonePlaceholder: 'Contoh: 08123456789',
    dateLabel: 'Tanggal Kunjungan / Reservasi',
    guestsLabel: 'Jumlah Tamu',
    messageLabel: 'Catatan Khusus / Pesan',
    messagePlaceholder: 'Tuliskan catatan khusus atau pertanyaan Anda...',
    submitBtn: 'Kirim Reservasi Sekarang',
    submitting: 'Mengirim...',
    submittedSuccess: 'Terima kasih! Pesan dan reservasi Anda telah berhasil dikirim ke WhatsApp.',
    openingHoursTitle: 'Jam Operasional',
    monFri: 'Senin – Jumat',
    monFriTime: '10:00 – 22:00 WIB',
    satSun: 'Sabtu – Minggu',
    satSunTime: '09:00 – 23:00 WIB',
  },
};

export const EN: typeof ID = {
  // Nav
  nav: {
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    gallery: 'Gallery',
    team: 'Our Team',
    contact: 'Contact',
    reservation: 'Book a Table',
  },
  home: 'Home',
  about: 'About',
  menu: 'Menu',
  gallery: 'Gallery',
  contact: 'Contact',
  team: 'Our Team',
  reservation: 'Reservation',

  // Hero Section
  hero: {
    eyebrow: 'Authentic Gastronomy',
    titleLine1: 'Fresh Ingredients,',
    titleLine2: 'Unforgettable Taste',
    subtitle: 'Experience fine culinary artistry with farm-fresh seasonal ingredients served in every delicious bite.',
    primaryCta: 'Book a Table',
    secondaryCta: 'Explore Menu',
  },

  // 3 Pillars / Features
  pillars: [
    {
      title: 'Farm Fresh Ingredients',
      description: 'Harvested daily from local organic farms to ensure optimal seasonal quality and vibrant flavors.',
    },
    {
      title: 'Chef-Crafted Recipes',
      description: 'Our culinary artists craft every recipe with heart, harmonizing rich tradition with modern sophistication.',
    },
    {
      title: 'Warm Hospitality',
      description: 'More than just dining — we strive to send you home with a satisfied palate and a delighted heart.',
    },
  ],

  // Menu Section (Home & Menu Page)
  homeMenu: {
    eyebrow: 'SEASONAL SELECTION',
    title: 'From Our Kitchen',
    viewDetail: 'View Details',
    popular: 'Popular',
    pageOf: 'Page',
    from: 'of',
    categories: {
      all: 'All',
      burger: 'Burgers',
      taco: 'Tacos',
      wrap: 'Wraps',
      beverage: 'Beverages',
    },
  },

  // Gallery Section
  homeGallery: {
    eyebrow: 'OUR COLLECTION',
    title: 'Moments & Delicacies Gallery',
    desc: 'Explore the comforting warmth of our dining hall, the freshness of handpicked ingredients, and our team’s dedication to exquisite dishes.',
    viewAll: 'View Full Gallery',
    categories: {
      food: 'Food',
      interior: 'Interior',
      events: 'Events',
      staff: 'Staff & Kitchen',
    },
  },

  // CTA Section
  cta: {
    eyebrow: 'TABLE RESERVATION',
    title: 'Take Time & Enjoy Exquisite Dishes Together',
    desc: 'Whether planning a romantic dinner, family feast, or private celebration, we look forward to welcoming you.',
    button: 'Book a Table Now',
    call: 'Call Us',
  },

  // Footer Section
  footer: {
    brandDesc: 'A premier culinary destination dedicated to seasonal ingredients, thoughtful craft, and unforgettable moments.',
    quickLinks: 'Quick Links',
    links: {
      home: 'Home',
      about: 'About Us',
      menu: 'Full Menu',
      gallery: 'Photo Gallery',
      team: 'Our Team',
      contact: 'Contact & Booking',
    },
    location: 'Location',
    followUs: 'Follow Us',
    copyright: 'All Rights Reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },

  // Halaman Tentang (/tentang)
  tentang: {
    heroEyebrow: 'The Story Behind Our Kitchen',
    heroTitle1: 'Ingredient Integrity,',
    heroTitle2: 'Uncompromised Quality',
    heroDesc: 'Born from a genuine passion for honest food. We reject shortcuts to bring you dishes truly worthy of sharing with those you cherish.',
    valuesEyebrow: 'OUR DOCTRINE',
    valuesTitle: 'Three Core Pillars',
    value1Title: 'Finest Ingredients',
    value1Desc: 'Crisp seasonal greens and premium meats curated every morning from our trusted local farmers and purveyors.',
    value2Title: 'House-Crafted Sauces',
    value2Desc: 'Zero artificial shortcuts. Every marinade, dressing, and glaze is simmered from scratch right in our kitchen.',
    value3Title: 'Warm Hospitality',
    value3Desc: 'We treat every guest just like a beloved family member welcomed warmly into our own home.',
    storyEyebrow: 'OUR HERITAGE',
    storyTitle: 'From Humble Beginnings to Your Favorite Dining Table',
    storyP1: 'Chef’s Table was established in a cozy neighborhood corner in 2018. Starting from a modest kitchen, we dreamed of delivering five-star culinary finesse paired with the comfort of heartfelt home cooking.',
    storyP2: 'For our brigade, every plate is an expression of gratitude. When you take a seat at our table, we want you to leave everyday haste behind and relish each flavor in tranquility.',
    statsYears: 'Years of Service',
    statsDishes: 'Recipe Creations',
    statsGuests: 'Delighted Guests',
  },

  // Halaman Menu (/menu)
  menuPage: {
    eyebrow: 'COMPLETE MENU SELECTION',
    title: 'Our Complete Menu',
    subtitle: 'Every creation is cooked fresh to order using finest quality ingredients.',
    categoryFilterTitle: 'Menu Categories',
    allMenuMobile: 'Select Category',
    viewDetail: 'View Details',
    orderWa: 'Order via WhatsApp',
    badgePopular: 'Popular',
  },

  // Halaman Detail Produk (/menu/[slug])
  menuDetail: {
    back: 'Back to Menu',
    portion: 'Portion Quantity',
    selectAddon: 'Select Sauce / Add-ons',
    pricePerPortion: 'Price per portion',
    estimatedTotal: 'Estimated Total',
    orderWaBtn: 'Order via WhatsApp Now',
    descriptionTitle: 'Dish Description',
    freshGuarantee: 'Guaranteed fresh and prepared right upon order',
    notFound: 'Menu item not found',
  },

  // Halaman Tim (/tim)
  timPage: {
    heroEyebrow: 'OUR ARTISANS',
    heroTitle: 'The Talents Behind Every Flavor',
    heroDesc: 'From masterful seasoning by our chefs to gracious smiles from our service staff, meet the passionate people making your meal unforgettable.',
    categories: {
      all: 'All Team',
      headChef: 'Head Chef Brigade',
      lineCook: 'Line Cook Brigade',
      prepStation: 'Prep Station Brigade',
      serviceTeam: 'Hospitality Service',
    },
    expLabel: 'Experience',
    specialtyLabel: 'Specialty',
  },

  // Halaman Galeri (/galeri)
  galeriPage: {
    heroEyebrow: 'Our Collection',
    heroTitle: 'Moments & Delicacies Gallery',
    heroDesc: 'Explore the comforting warmth of our dining hall, the freshness of handpicked ingredients, and our team’s dedication to exquisite dishes.',
    paginationPage: 'Page',
    paginationFrom: 'of',
    prev: 'Previous',
    next: 'Next',
  },

  // Halaman Kontak (/kontak)
  kontakPage: {
    heroEyebrow: 'CONTACT US',
    heroTitle: 'Let’s Have a Conversation',
    heroDesc: 'Have inquiries regarding our menus, private dining reservations, or custom catering? We are delighted to assist you!',
    callBtn: 'Call (+62 823-7668-0987)',
    locationTitle: 'OUR LOCATION',
    formTitle: 'Send Inquiries & Reservations',
    formDesc: 'Complete the form below and our team will get in touch with you promptly.',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name...',
    phoneLabel: 'WhatsApp / Phone Number',
    phonePlaceholder: 'e.g. +62 812-3456-789',
    dateLabel: 'Visit / Reservation Date',
    guestsLabel: 'Number of Guests',
    messageLabel: 'Special Requests / Notes',
    messagePlaceholder: 'Share any special requests, dietary notes, or questions...',
    submitBtn: 'Submit Reservation Now',
    submitting: 'Submitting...',
    submittedSuccess: 'Thank you! Your reservation details have been prepared for WhatsApp.',
    openingHoursTitle: 'Opening Hours',
    monFri: 'Monday – Friday',
    monFriTime: '10:00 AM – 10:00 PM',
    satSun: 'Saturday – Sunday',
    satSunTime: '09:00 AM – 11:00 PM',
  },
};

const TRANSLATIONS: Record<LangCode, typeof ID> = { ID, EN };
export type TranslationKeys = typeof ID;

interface LanguageContextType {
  selectedLang: LanguageOption;
  setSelectedLang: (lang: LanguageOption) => void;
  lang: LangCode;
  isId: boolean;
  isEn: boolean;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLang, setSelectedLangState] = useState<LanguageOption>(LANGUAGES[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_lang') as LangCode | null;
      if (saved === 'ID' || saved === 'EN') {
        setSelectedLangState(LANGUAGES.find((l) => l.code === saved) || LANGUAGES[0]);
      }
    } catch (e) {
      // LocalStorage access fallback
    }
  }, []);

  const setSelectedLang = (lang: LanguageOption) => {
    setSelectedLangState(lang);
    try {
      localStorage.setItem('app_lang', lang.code);
    } catch (e) {}
  };

  const lang = selectedLang.code;
  const isId = lang === 'ID';
  const isEn = lang === 'EN';
  const t = TRANSLATIONS[lang] || ID;

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang, lang, isId, isEn, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      selectedLang: LANGUAGES[0],
      setSelectedLang: () => {},
      lang: 'ID' as LangCode,
      isId: true,
      isEn: false,
      t: ID,
    };
  }
  return context;
}
