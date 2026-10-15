export interface NavItem {
  label: string;
  labelId: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Gallery", labelId: "Galeri", href: "/gallery" },
  { label: "About Us", labelId: "Tentang Kami", href: "/about-us" },
  { label: "Properties", labelId: "Properti", href: "/properties" },
  { label: "Locations", labelId: "Lokasi", href: "/locations" },
  { label: "Contact Us", labelId: "Kontak", href: "/contact-us" },
];

export interface KPIMetric {
  value: string;
  label: string;
  labelId: string;
}

export const KPI_METRICS: KPIMetric[] = [
  {
    value: "$1.4B+",
    label: "Portfolio Value Created",
    labelId: "Nilai Portofolio Tercipta",
  },
  {
    value: "24",
    label: "Global Architecture Awards",
    labelId: "Penghargaan Arsitektur Global",
  },
  {
    value: "99.4%",
    label: "Client Satisfaction Score",
    labelId: "Skor Kepuasan Klien",
  },
  {
    value: "08",
    label: "Metropolitan Hubs",
    labelId: "Hub Metropolitan Dunia",
  },
];

export interface GalleryProject {
  id: string;
  num: string;
  name: string;
  nameId: string;
  slug: string;
  location: string;
  category: string;
  categoryId: string;
  year: string;
  area: string;
  image: string;
  architect: string;
  dossierCode: string;
  description: {
    en: string;
    id: string;
  };
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "proj-1",
    num: "01",
    name: "Sander House",
    nameId: "Sander House",
    slug: "sander-house",
    location: "Dubai Hills, UAE",
    category: "Cantilever Monolith",
    categoryId: "Monolit Kantilever",
    year: "2024",
    area: "1,450 m²",
    image: "/images/craft-1.webp",
    architect: "Denn Architecture Atelier",
    dossierCode: "DH-DXB-01",
    description: {
      en: "A monumental cantilevered residence sculpted from board-formed concrete and Swiss thermal bronze, suspended above Dubai Hills.",
      id: "Hunian monolitik kantilever monumental yang dipahat dari beton arsitektural dan perunggu termal Swiss, membentang di atas Dubai Hills.",
    },
  },
  {
    id: "proj-2",
    num: "02",
    name: "Azure Villa",
    nameId: "Azure Villa",
    slug: "azure-villa",
    location: "Palm Jumeirah, Dubai",
    category: "Coastal Architecture",
    categoryId: "Arsitektur Pesisir",
    year: "2024",
    area: "1,650 m²",
    image: "/images/craft-2.webp",
    architect: "Denn Atelier x Studio Zurich",
    dossierCode: "DH-PLM-02",
    description: {
      en: "Oceanfront brutalist sanctuary framed by private coral lagoons and floor-to-ceiling frameless sea apertures.",
      id: "Suaka tepi laut bergaya brutalist mewah yang dikelilingi laguna koral privat dengan bukaan kaca tanpa bingkai menghadap laut lepas.",
    },
  },
  {
    id: "proj-3",
    num: "03",
    name: "The Oasis",
    nameId: "The Oasis",
    slug: "the-oasis",
    location: "Emirates Hills, Dubai",
    category: "Desert Modernism",
    categoryId: "Modernisme Gurun",
    year: "2023",
    area: "2,100 m²",
    image: "/images/craft-3.webp",
    architect: "Denn Architecture Atelier",
    dossierCode: "DH-EMR-03",
    description: {
      en: "Biophilic architectural fortress blending volcanic rock, native date palms, and reflective water courtyards.",
      id: "Benteng arsitektur biofilik yang memadukan batu vulkanik, kanopi kurma alami, dan pelataran air reflektif yang menyejukkan.",
    },
  },
  {
    id: "proj-4",
    num: "04",
    name: "Luma Residence",
    nameId: "Luma Residence",
    slug: "luma-residence",
    location: "Downtown Dubai",
    category: "Sky Penthouse",
    categoryId: "Penthouse Angkasa",
    year: "2024",
    area: "980 m²",
    image: "/images/craft-4.webp",
    architect: "Denn High-Rise Studio",
    dossierCode: "DH-DTN-04",
    description: {
      en: "A dual-level sky palace with a cantilevered glass-bottom lap pool overlooking the Burj Khalifa skyline.",
      id: "Istana angkasa dua lantai dengan kolam renang kantilever berdasar kaca tembus pandang yang menghadap cakrawala Burj Khalifa.",
    },
  },
  {
    id: "proj-5",
    num: "05",
    name: "Kairos Pavilion",
    nameId: "Kairos Pavilion",
    slug: "kairos-pavilion",
    location: "Jumeirah Bay Island",
    category: "Waterfront Sanctuary",
    categoryId: "Suaka Tepi Air",
    year: "2024",
    area: "1,320 m²",
    image: "/images/prop-5.webp",
    architect: "Denn Architecture Atelier",
    dossierCode: "DH-JMB-05",
    description: {
      en: "Private seaplane moorings and sculptural floating volumes designed for absolute discretion and yacht lifestyle.",
      id: "Dermaga seaplane privat dan massa bangunan terapung skulptural yang dirancang untuk privasi mutlak dan gaya hidup yacht.",
    },
  },
  {
    id: "proj-6",
    num: "06",
    name: "Seraphina Villa",
    nameId: "Seraphina Villa",
    slug: "seraphina-villa",
    location: "Zurichberg Hills, Switzerland",
    category: "Alpine Modernist",
    categoryId: "Modernis Alpen",
    year: "2023",
    area: "1,150 m²",
    image: "/images/prop-6.webp",
    architect: "Denn Atelier Zurich",
    dossierCode: "DH-ZUR-06",
    description: {
      en: "Valser quartzite masonry integrated into alpine slope topography with panoramic views of Lake Zurich and Glarus Alps.",
      id: "Dinding batu kuarsit Valser yang menyatu dengan topografi perbukitan Alpen dengan panorama Danau Zurich dan Pegunungan Glarus.",
    },
  },
];

export interface PropertyItem {
  id: string;
  slug: string;
  name: string;
  nameId: string;
  tagline: string;
  taglineId: string;
  location: string;
  locationId: string;
  city: string;
  type: string;
  typeId: string;
  price: string;
  priceNumeric: number;
  specs: string;
  beds: number;
  baths: number;
  area: string;
  plotArea: string;
  floors: number;
  garages: number;
  yearBuilt: string;
  architect: string;
  status: "Available" | "Private Reserve" | "Under Offer";
  statusId: "Tersedia" | "Reservasi Privat" | "Dalam Penawaran";
  image: string;
  heroImage: string;
  gallery: string[];
  description: {
    en: string;
    id: string;
  };
  architecturalHighlights: {
    en: string[];
    id: string[];
  };
  materials: {
    name: string;
    nameId: string;
    origin: string;
  }[];
  amenities: {
    name: string;
    nameId: string;
    category: string;
  }[];
  floorplanLevels: {
    level: string;
    levelId: string;
    name: string;
    nameId: string;
    area: string;
    description: string;
    descriptionId: string;
    features: string[];
    featuresId: string[];
  }[];
  specifications: Record<string, string>;
}

export const PROPERTIES_DATA: PropertyItem[] = [
  {
    id: "prop-1",
    slug: "sander-house",
    name: "SANDER HOUSE",
    nameId: "SANDER HOUSE",
    tagline: "The Flagship Cantilever Monolith",
    taglineId: "Mahakarya Monolit Kantilever Utama",
    location: "Dubai Hills, UAE",
    locationId: "Dubai Hills, UEA",
    city: "Dubai",
    type: "Contemporary Residence",
    typeId: "Residensi Kontemporer",
    price: "$64,000,000",
    priceNumeric: 64000000,
    specs: "6 Beds • 8 Baths • 1,450 m²",
    beds: 6,
    baths: 8,
    area: "1,450 m²",
    plotArea: "2,200 m²",
    floors: 3,
    garages: 6,
    yearBuilt: "2024",
    architect: "Denn Architecture Atelier",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-1.webp",
    heroImage: "/images/hero-dark.webp",
    gallery: [
      "/images/prop-1.webp",
      "/images/craft-1.webp",
      "/images/hero-dark.webp",
      "/images/philosophy-main.webp",
    ],
    description: {
      en: "Sander House stands as the definitive expression of modern monolithic architecture in the Middle East. Sculpted from continuous off-shutter Swiss concrete and enveloped in triple-glazed acoustic curtain walls, the residence cantilevers 14 meters over manicured landscape gardens.",
      id: "Sander House adalah manifestasi arsitektur monolitik modern paling ikonik di Timur Tengah. Dipahat dari beton arsitektural Swiss berkualitas tinggi dengan kaca akustik rangkap tiga, struktur kantilever sepanjang 14 meter ini melayang anggun di atas taman lanskap privat.",
    },
    architecturalHighlights: {
      en: [
        "14-meter structural post-tensioned cantilever terrace overlooking Dubai skyline",
        "Curated interior atrium with 7-meter ceiling height and sunken Japanese rock garden",
        "Custom bronze-clad pivot entry portal weighing 1.2 metric tons with biometric locking",
        "Geothermal subterranean cooling integration reducing thermal load by 42%",
      ],
      id: [
        "Teras kantilever pasca-tarik sepanjang 14 meter dengan panorama langsung cakrawala Dubai",
        "Atrium interior setinggi 7 meter dengan taman batu Zen Jepang yang menenangkan",
        "Pintu gerbang pivot perunggu tempa seberat 1,2 ton dengan sistem keamanan biometrik",
        "Integrasi pendingin geotermal bawah tanah yang mereduksi beban termal hingga 42%",
      ],
    },
    materials: [
      { name: "Valser Quartzite Stone", nameId: "Batu Kuarsit Valser", origin: "Graubünden, Switzerland" },
      { name: "Architectural Off-Shutter Concrete", nameId: "Beton Ekspos Arsitektural", origin: "Zurich, Switzerland" },
      { name: "Thermal Anodized Architectural Bronze", nameId: "Perunggu Termal Anodized", origin: "Milan, Italy" },
      { name: "Smoked Rift-Cut European Oak", nameId: "Kayu Ek Eropa Asap", origin: "Bavaria, Germany" },
    ],
    amenities: [
      { name: "25m Heated Cantilever Infinity Pool", nameId: "Kolam Renang Infinity Kantilever 25m Berpemanas", category: "Wellness" },
      { name: "1,200-Bottle Climate Controlled Wine Vault", nameId: "Gudang Anggur Terkontrol Suhu 1.200 Botol", category: "Lifestyle" },
      { name: "Full Wellness Spa & Finnish Cedar Sauna", nameId: "Spa Wellness Lengkap & Sauna Kayu Cedar Finlandia", category: "Wellness" },
      { name: "6-Car Air-Conditioned Subterranean Vault", nameId: "Garasi Bawah Tanah Berpendingin Udara 6 Mobil", category: "Automotive" },
      { name: "Dolby Atmos 14-Seat Private Screening Room", nameId: "Bioskop Privat 14 Kursi Berteknologi Dolby Atmos", category: "Entertainment" },
      { name: "Private Security & Diplomatic Panic Suite", nameId: "Ruang Aman Standar Diplomatik & Keamanan Privat", category: "Security" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Grand Atrium & Social Sanctuary",
        nameId: "Grand Atrium & Area Sosial",
        area: "580 m²",
        description: "Expansive formal salon, professional show kitchen, dining pavilion, and direct terrace integration.",
        descriptionId: "Salon formal megah, dapur show profesional, paviliun bersantap, dan integrasi teras luas.",
        features: ["7m Double Height Living", "Poliform Show Kitchen", "Infinity Pool Deck", "Reflective Water Gardens"],
        featuresId: ["Ruang Tamu Plafon 7m", "Dapur Poliform Italia", "Dek Kolam Renang Infinity", "Kolam Air Reflektif"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Private Executive Family Enclave",
        nameId: "Lantai Kamar Privat Keluarga",
        area: "520 m²",
        description: "Primary Presidential Suite with dual walk-in dressing galleries, and 4 secondary ensuite retreats.",
        descriptionId: "Kamar tidur utama presidensial dengan dua ruang ganti walk-in, serta 4 kamar tidur tamu ensuite.",
        features: ["Presidential Master Suite", "Private Breakfast Terrace", "His & Hers Spa Baths", "Executive Study"],
        featuresId: ["Kamar Utama Presidensial", "Teras Sarapan Privat", "Kamar Mandi Spa Pria & Wanita", "Ruang Kerja Eksekutif"],
      },
      {
        level: "Level B1",
        levelId: "Lantai Bawah Tanah",
        name: "Wellness Gallery & Motor Pavilion",
        nameId: "Galeri Kebugaran & Paviliun Otomotif",
        area: "350 m²",
        description: "Subterranean wellness retreat, 14-seat screening theatre, and climate-controlled supercar gallery.",
        descriptionId: "Pusat relaksasi bawah tanah, teater film 14 kursi, dan galeri pameran supercar ber-AC.",
        features: ["Finnish Cedar Sauna & Hammam", "Dolby Atmos Cinema", "Supercar Gallery (6 Cars)", "Wine Vault"],
        featuresId: ["Sauna Kayu Cedar & Hammam", "Bioskop Dolby Atmos", "Galeri Supercar (6 Mobil)", "Gudang Anggur Koleksi"],
      },
    ],
    specifications: {
      "Structure": "Reinforced Concrete Post-Tensioned Monolith",
      "Glazing": "Guardian Glass Triple-Laminated Low-E",
      "Climate Control": "Geothermal Heat Exchange + Daikin VRV IV",
      "Automation": "Crestron Home OS 4 with Lutron Palladiom Keypads",
      "Ceiling Heights": "3.8m typical, 7.2m atrium",
      "Orientation": "North-West optimal solar daylighting",
    },
  },
  {
    id: "prop-2",
    slug: "azure-villa",
    name: "AZURE VILLA",
    nameId: "AZURE VILLA",
    tagline: "Ultra-Luxury Waterfront Cantilever",
    taglineId: "Vila Tepi Laut Mewah Berkonsep Kantilever",
    location: "Palm Jumeirah, Dubai",
    locationId: "Palm Jumeirah, Dubai",
    city: "Dubai",
    type: "Luxury Villa",
    typeId: "Vila Mewah",
    price: "$85,000,000",
    priceNumeric: 85000000,
    specs: "7 Beds • 9 Baths • 1,650 m²",
    beds: 7,
    baths: 9,
    area: "1,650 m²",
    plotArea: "2,600 m²",
    floors: 3,
    garages: 8,
    yearBuilt: "2024",
    architect: "Denn Atelier x Studio Zurich",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-2.webp",
    heroImage: "/images/craft-2.webp",
    gallery: [
      "/images/prop-2.webp",
      "/images/craft-2.webp",
      "/images/prop-5.webp",
      "/images/about.webp",
    ],
    description: {
      en: "Positioned on the tip of a premier Palm frond, Azure Villa offers unprecedented open-sea orientation with uninterrupted vistas of the Arabian Gulf. Designed as a floating white stone sculpture punctuated by water mirrors and bronze louvers.",
      id: "Terletak di ujung eksklusif frond Palm Jumeirah, Azure Villa menawarkan panorama laut terbuka tanpa batas menghadap Teluk Arab. Dirancang sebagai pahatan batu putih terapung yang dipadukan cermin air dan kisi-kisi perunggu elegan.",
    },
    architecturalHighlights: {
      en: [
        "Private 60-meter deepwater boat mooring accommodating yachts up to 45 meters",
        "Wraparound seawater moat connecting beachfront infinity pool to private internal courtyards",
        "Floor-to-ceiling guillotine glass panels opening the entire salon directly to sea breezes",
        "Hand-honed Thassos snow-white marble flooring throughout all primary living zones",
      ],
      id: [
        "Dermaga kapal air dalam sepanjang 60 meter yang mampu menampung yacht hingga ukuran 45 meter",
        "Parit air laut melingkar yang menghubungkan kolam renang infinity pantai ke pelataran dalam",
        "Panel kaca guillotine raksasa yang membuka seluruh ruang keluarga langsung ke semilir angin laut",
        "Lantai marmer putih salju Thassos Yunani buatan tangan di seluruh area utama",
      ],
    },
    materials: [
      { name: "Thassos Snow White Marble", nameId: "Marmer Putih Salju Thassos", origin: "Thassos, Greece" },
      { name: "Brushed Champagne Titanium", nameId: "Titanium Warna Champagne", origin: "Kobe, Japan" },
      { name: "Burmese Teak Decking", nameId: "Kayu Jati Burma Tahan Laut", origin: "Myanmar" },
      { name: "Marine-Grade Structural Glass", nameId: "Kaca Arsitektural Ketahanan Laut", origin: "Saint-Gobain, France" },
    ],
    amenities: [
      { name: "Private Sandy Beachfront Access", nameId: "Akses Pantai Berpasir Putih Privat", category: "Beach" },
      { name: "Deepwater Superyacht Mooring", nameId: "Dermaga Superyacht Air Dalam", category: "Marine" },
      { name: "Ozone-Treated Seawater Infinity Pool", nameId: "Kolam Infinity Air Laut Bersistem Ozon", category: "Wellness" },
      { name: "Rooftop Stargazing Sky Lounge with Bar", nameId: "Lounge Atap Pengamatan Bintang & Bar", category: "Entertainment" },
      { name: "Commercial Teppanyaki Outdoor Kitchen", nameId: "Dapur Outdoor Teppanyaki Standar Restoran", category: "Dining" },
      { name: "Staff Quarters for 6 Full-Time Personnel", nameId: "Area Hunian Khusus 6 Staf Rumah Tangga", category: "Service" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Oceanfront Pavilions & Yacht Terrace",
        nameId: "Paviliun Tepi Laut & Teras Yacht",
        area: "650 m²",
        description: "Open floor plan beachfront salon, chef's prep galley, guest suites, and seamless beach connectivity.",
        descriptionId: "Ruang tamu tepi pantai berkonsep terbuka, dapur chef profesional, dan akses langsung ke pantai.",
        features: ["Oceanfront Grand Living", "Double Chef Kitchens", "Guest Villa Suite", "Beach Lounge Deck"],
        featuresId: ["Ruang Tamu Hadap Laut", "Dapur Ganda Chef", "Suite Tamu Terpisah", "Dek Bersantai Pantai"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Upper Sanctuary & Sea Terraces",
        nameId: "Lantai Istirahat Atas & Teras Laut",
        area: "600 m²",
        description: "Master retreat spanning the entire beachfront facade, flanked by private plunge pool and dressing saloons.",
        descriptionId: "Kamar utama megah membentang di sepanjang fasad laut, dilengkapi kolam renang mini privat.",
        features: ["Panoramic Master Suite", "Private Plunge Pool", "4 Ensuite Bedrooms", "Family Sky Salon"],
        featuresId: ["Suite Utama Panorama Laut", "Kolam Celup Privat", "4 Kamar Tidur Ensuite", "Ruang Keluarga Atas"],
      },
      {
        level: "Level 03",
        levelId: "Lantai Atap",
        name: "Rooftop Starlight Observatory",
        nameId: "Observatorium Atap & Bar Bintang",
        area: "400 m²",
        description: "Panoramic entertainment terrace with 360-degree views of Palm Jumeirah and Dubai Marina skyline.",
        descriptionId: "Teras hiburan dengan panorama 360 derajat mengelilingi Palm Jumeirah dan Dubai Marina.",
        features: ["Cocktail Sky Bar", "Jacuzzi Sunbed Island", "Alfresco Dining Deck", "Fireplace Pavilion"],
        featuresId: ["Sky Bar Koktail", "Pulau Kasur Santai & Jacuzzi", "Area Makan Terbuka", "Paviliun Perapian"],
      },
    ],
    specifications: {
      "Structure": "Marine-Grade Sulfate-Resistant Concrete",
      "Yacht Berth": "Up to 45 meters / 147 ft LOA",
      "Power System": "Grid + 45kW Solar Roof Integration",
      "Water Treatment": "Integrated Reverse Osmosis Desalination",
      "Ceiling Heights": "4.2m living zones",
      "Security": "Perimeter Infrared Virtual Fencing + Marine Radar",
    },
  },
  {
    id: "prop-3",
    slug: "the-oasis",
    name: "THE OASIS",
    nameId: "THE OASIS",
    tagline: "Desert Modernist Architectural Estate",
    taglineId: "Kawasan Arsitektur Modernis Gurun Eksklusif",
    location: "Emirates Hills, Dubai",
    locationId: "Emirates Hills, Dubai",
    city: "Dubai",
    type: "Modern Mansion",
    typeId: "Rumah Mewah Modern",
    price: "$94,000,000",
    priceNumeric: 94000000,
    specs: "8 Beds • 10 Baths • 2,100 m²",
    beds: 8,
    baths: 10,
    area: "2,100 m²",
    plotArea: "3,500 m²",
    floors: 3,
    garages: 10,
    yearBuilt: "2023",
    architect: "Denn Architecture Atelier",
    status: "Private Reserve",
    statusId: "Reservasi Privat",
    image: "/images/prop-3.webp",
    heroImage: "/images/craft-3.webp",
    gallery: [
      "/images/prop-3.webp",
      "/images/craft-3.webp",
      "/images/prop-1.webp",
      "/images/hero-light.webp",
    ],
    description: {
      en: "Embodying the spirit of desert modernism, The Oasis provides an inward-looking private biosphere with triple-courtyard circulation, subterranean art galleries, and lush internal microclimates protected by rammed earth and fluted limestone walls.",
      id: "Menghidupkan keindahan modernisme gurun pasir, The Oasis dirancang sebagai biosfer privat dengan sirkulasi tiga pelataran dalam, galeri seni bawah tanah, serta mikroklimat asri yang dilindungi dinding batu kapur berpola.",
    },
    architecturalHighlights: {
      en: [
        "Internal botanical oasis with mature 60-year-old olive trees and climate-regulated misting system",
        "Subterranean 30-meter art gallery with museum-grade UV lighting and humidity stabilization",
        "Massive fluted travertine facade shielding thermal radiation while casting dynamic shadow lines",
        "Private equestrian viewing loggia bordering the Montgomerie golf championship grounds",
      ],
      id: [
        "Oase botani dalam ruangan dengan pohon zaitun berusia 60 tahun dan sistem kabut penyejuk otomatis",
        "Galeri seni bawah tanah 30 meter berstandar museum dengan pencahayaan anti-UV dan kestabilan suhu",
        "Fasad travertine beralur masif yang menahan radiasi panas sekaligus menciptakan bayangan artistik",
        "Loggia privat dengan pemandangan langsung padang golf kejuaraan Montgomerie",
      ],
    },
    materials: [
      { name: "Roman Fluted Travertine", nameId: "Travertine Beralur Roma", origin: "Tivoli, Italy" },
      { name: "Compressed Stabilized Rammed Earth", nameId: "Tanah Padat Arsitektural", origin: "Local UAE Sourced" },
      { name: "Acoustic Natural Cork Panels", nameId: "Panel Gabus Akustik Alami", origin: "Alentejo, Portugal" },
      { name: "Solid American Walnut Millwork", nameId: "Kayu Walnut Amerika Solid", origin: "Pennsylvania, USA" },
    ],
    amenities: [
      { name: "30-Meter Climate-Controlled Art Vault", nameId: "Galeri Seni Bawah Tanah 30 Meter", category: "Culture" },
      { name: "Olympic-Length Indoor Heated Lap Pool", nameId: "Kolam Renang Panjang Indoor Berpemanas", category: "Wellness" },
      { name: "Championship Tennis & Padel Court", nameId: "Lapangan Tenis & Padel Berstandar Turnamen", category: "Sports" },
      { name: "Organic Kitchen Garden & Greenhouse", nameId: "Kebun Sayur Organik & Rumah Kaca Privat", category: "Lifestyle" },
      { name: "Automated 10-Car Collector Showroom", nameId: "Showroom Kolektor Supercar 10 Mobil", category: "Automotive" },
      { name: "Standalone Guest House with 2 Suites", nameId: "Paviliun Tamu Mandiri dengan 2 Kamar Mewah", category: "Hospitality" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Courtyard Galleries & Living Pavilions",
        nameId: "Pelataran Galeri & Paviliun Hunian",
        area: "900 m²",
        description: "Triple-courtyard layout seamlessly connecting formal galleries, grand reception salon, and garden loggias.",
        descriptionId: "Tata letak tiga pelataran yang menghubungkan galeri formal, ruang resepsi agung, dan taman terbuka.",
        features: ["Triple Atrium Courtyards", "Grand Reception Hall", "Gourmet Kitchen Suite", "Library & Study"],
        featuresId: ["Tiga Pelataran Atrium", "Aula Resepsi Utama", "Dapur Gourmet Lengkap", "Perpustakaan & Ruang Baca"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Master Sanctuary & Family Wings",
        nameId: "Kamar Utama & Sayap Keluarga",
        area: "750 m²",
        description: "Dual master suites with private meditation gardens and 5 additional ensuite family rooms.",
        descriptionId: "Dua kamar utama dengan taman meditasi privat, ditambah 5 kamar keluarga ensuite.",
        features: ["Dual Master Sanctuaries", "Meditation Roof Terraces", "Private Family Den", "Kid's Activity Wing"],
        featuresId: ["Dua Kamar Tidur Utama", "Teras Meditasi Atap", "Ruang Santai Keluarga", "Sayap Bermain Anak"],
      },
      {
        level: "Level B1",
        levelId: "Lantai Bawah Tanah",
        name: "Museum Gallery & Auto Showroom",
        nameId: "Museum Galeri & Showroom Mobil",
        area: "450 m²",
        description: "Museum-grade private art storage, temperature-controlled 10-car gallery, and wellness spa.",
        descriptionId: "Penyimpanan karya seni privat berstandar museum, galeri 10 mobil ber-AC, dan spa kebugaran.",
        features: ["Art Exhibition Gallery", "10-Car Collector Vault", "Indoor 20m Lap Pool", "Hydrotherapy Circuit"],
        featuresId: ["Galeri Pameran Seni", "Garasi Koleksi 10 Mobil", "Kolam Renang Indoor 20m", "Sirkuit Hidroterapi"],
      },
    ],
    specifications: {
      "Plot Frontage": "75 meters bordering championship golf course",
      "Air Purification": "Hospital-grade MERV 16 HEPA positive pressure",
      "Solar Harvesting": "120kW BIPV solar roof tiles",
      "Water Harvesting": "100% Greywater recycling for botanical gardens",
      "Energy Efficiency": "Net-Zero ready operational envelope",
      "Security": "Military-grade perimeter radar and encrypted fiber backbone",
    },
  },
  {
    id: "prop-4",
    slug: "luma-residence",
    name: "LUMA RESIDENCE",
    nameId: "LUMA RESIDENCE",
    tagline: "Panoramic Sky Villa Over Downtown",
    taglineId: "Vila Angkasa Panorama Menghadap Downtown",
    location: "Downtown Dubai",
    locationId: "Downtown Dubai",
    city: "Dubai",
    type: "Luxury Penthouse",
    typeId: "Penthouse Mewah",
    price: "$52,000,000",
    priceNumeric: 52000000,
    specs: "5 Beds • 6 Baths • 980 m²",
    beds: 5,
    baths: 6,
    area: "980 m²",
    plotArea: "1,100 m²",
    floors: 2,
    garages: 4,
    yearBuilt: "2024",
    architect: "Denn High-Rise Studio",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-4.webp",
    heroImage: "/images/craft-4.webp",
    gallery: [
      "/images/prop-4.webp",
      "/images/craft-4.webp",
      "/images/prop-7.webp",
      "/images/prop-1.webp",
    ],
    description: {
      en: "Crown jewel penthouse suspended 68 floors above Downtown Dubai. Featuring a 360-degree panoramic perimeter terrace, double-height ceiling voids, and a private glass elevator connecting its dual levels.",
      id: "Mahkota penthouse termewah yang melayang 68 lantai di atas gemerlap Downtown Dubai. Dilengkapi teras keliling panorama 360 derajat, plafon ganda ekstra tinggi, dan lift kaca privat yang menghubungkan kedua lantainya.",
    },
    architecturalHighlights: {
      en: [
        "Private high-speed biometric elevator traveling from private parking vault directly into salon",
        "Cantilevered infinity sky pool featuring transparent structural acrylic floor",
        "8-meter custom curved glass facade with motorized blackout acoustic drapery",
        "Bespoke Boffi kitchen with integrated Sub-Zero & Gaggenau 400 series appliances",
      ],
      id: [
        "Lift biometrik berkecepatan tinggi dari garasi privat langsung membuka ke ruang tamu",
        "Kolam renang langit kantilever dengan lantai kaca akrilik tembus pandang yang spektakuler",
        "Fasad kaca lengkung 8 meter dengan tirai akustik bermotor otomatis",
        "Dapur Boffi Italia kustom dengan peralatan lengkap Sub-Zero & Gaggenau seri 400",
      ],
    },
    materials: [
      { name: "Nero Marquina Black Marble", nameId: "Marmer Hitam Nero Marquina", origin: "Basque Country, Spain" },
      { name: "Liquid Metal Bronze Panels", nameId: "Panel Logam Cair Perunggu", origin: "London, UK" },
      { name: "Acoustic Suede Wallcoverings", nameId: "Pelapis Dinding Suede Akustik", origin: "Paris, France" },
      { name: "Ultra-Clear Low-Iron Starphire Glass", nameId: "Kaca Ekstra Bening Starphire", origin: "USA" },
    ],
    amenities: [
      { name: "Suspended Glass-Bottom Sky Pool", nameId: "Kolam Langit Berdasar Kaca Transparan", category: "Pool" },
      { name: "Helipad Priority Landing Rights", nameId: "Hak Pendaratan Prioritas Helipad Menara", category: "Aviation" },
      { name: "Private Wellness Cryotherapy Suite", nameId: "Ruang Kebugaran & Terapi Dingin (Cryotherapy)", category: "Wellness" },
      { name: "Sommelier Tasting Room with Enomatic Dispensers", nameId: "Ruang Cicip Anggur dengan Dispenser Enomatic", category: "Dining" },
      { name: "4 Private Executive Parking Bays", nameId: "4 Lot Parkir Eksekutif Tertutup", category: "Automotive" },
      { name: "24/7 Dedicated White-Glove Concierge", nameId: "Layanan Concierge Privat Siaga 24 Jam", category: "Service" },
    ],
    floorplanLevels: [
      {
        level: "Level 68",
        levelId: "Lantai 68",
        name: "Grand Reception & Sky Terraces",
        nameId: "Ruang Tamu Utama & Teras Angkasa",
        area: "540 m²",
        description: "Double-height formal living salon, formal dining for 20 guests, and wraparound pool deck.",
        descriptionId: "Ruang tamu plafon ganda, ruang makan formal untuk 20 orang, dan dek kolam langit keliling.",
        features: ["8m High Living Salon", "Dining for 20", "Show & Prep Kitchens", "Sky Pool Deck"],
        featuresId: ["Ruang Tamu Plafon 8m", "Meja Makan 20 Kursi", "Dapur Show & Servis", "Dek Kolam Langit"],
      },
      {
        level: "Level 69",
        levelId: "Lantai 69",
        name: "Presidential Sky Suites & Spa",
        nameId: "Kamar Tidur Utama & Spa Privat",
        area: "440 m²",
        description: "Primary presidential wing overlooking Burj Khalifa, 4 ensuite bedrooms, and private cryo spa.",
        descriptionId: "Sayap utama presidensial menghadap Burj Khalifa, 4 kamar tidur tamu, dan spa krioterapi privat.",
        features: ["Master Bedroom Suite", "His & Hers Walk-In Dressing", "Cryo Wellness Room", "Private Office"],
        featuresId: ["Suite Kamar Tidur Utama", "Ruang Ganti Busana Mewah", "Ruang Spa Cryo", "Kantor Kerja Privat"],
      },
    ],
    specifications: {
      "Building": "The Royal Towers Downtown",
      "Floor Elevation": "285 meters above ground level",
      "Acoustic Rating": "STC 58 soundproofing throughout",
      "Elevators": "2 Private Dedicated Express Car",
      "View Exposure": "360-degree Burj Khalifa, Dubai Canal, and Sea",
      "Security": "Biometric Retina Keyless Entry",
    },
  },
  {
    id: "prop-5",
    slug: "kairos-pavilion",
    name: "KAIROS PAVILION",
    nameId: "KAIROS PAVILION",
    tagline: "Ultra-Private Island Sanctuary",
    taglineId: "Suaka Pulau Privat Ultra-Eksklusif",
    location: "Jumeirah Bay, Dubai",
    locationId: "Jumeirah Bay, Dubai",
    city: "Dubai",
    type: "Waterfront Sanctuary",
    typeId: "Suaka Tepi Air",
    price: "$78,000,000",
    priceNumeric: 78000000,
    specs: "6 Beds • 7 Baths • 1,320 m²",
    beds: 6,
    baths: 7,
    area: "1,320 m²",
    plotArea: "2,050 m²",
    floors: 2,
    garages: 6,
    yearBuilt: "2024",
    architect: "Denn Architecture Atelier",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-5.webp",
    heroImage: "/images/prop-5.webp",
    gallery: [
      "/images/prop-5.webp",
      "/images/craft-2.webp",
      "/images/prop-2.webp",
      "/images/hero-dark.webp",
    ],
    description: {
      en: "Located on the ultra-exclusive seahorse-shaped Jumeirah Bay Island, Kairos Pavilion captures refined oceanic tranquility. Cantilevered teak terraces hover directly above gentle turquoise tides with private yacht berthing.",
      id: "Terletak di pulau mewah berbentuk kuda laut Jumeirah Bay Island, Kairos Pavilion memadukan ketenangan laut dengan kemewahan kelas dunia. Teras jati kantilever melayang di atas air toska jernih dilengkapi dermaga yacht privat.",
    },
    architecturalHighlights: {
      en: [
        "Private 40-meter yacht pontoon with direct open Gulf maritime navigation",
        "Sculptural bronze kinetic shading screens that adjust automatically to solar angles",
        "Internal salt-water plunge pools in all ground-floor guest villas",
        "Calacatta gold marble island kitchen designed by Piero Lissoni",
      ],
      id: [
        "Dermaga yacht terapung 40 meter dengan akses langsung ke perairan laut lepas",
        "Penyekat kinetik perunggu yang berputar otomatis mengikuti pergerakan matahari",
        "Kolam celup air laut privat di setiap vila tamu lantai dasar",
        "Dapur marmer Calacatta Gold karya desainer terkemuka Piero Lissoni",
      ],
    },
    materials: [
      { name: "Calacatta Gold Marble", nameId: "Marmer Calacatta Gold", origin: "Carrara, Italy" },
      { name: "Weathered Teak Wood", nameId: "Kayu Jati Alami Tahan Cuaca", origin: "Java, Indonesia" },
      { name: "Patinated Architectural Copper", nameId: "Tembaga Arsitektural Berpatina", origin: "Austria" },
      { name: "Acoustic Travertine Pavers", nameId: "Batu Travertine Akustik", origin: "Tivoli, Italy" },
    ],
    amenities: [
      { name: "Private 40m Yacht Pontoon", nameId: "Dermaga Yacht Privat 40m", category: "Marine" },
      { name: "Direct Beach & Lagoon Access", nameId: "Akses Langsung ke Pantai & Laguna", category: "Beach" },
      { name: "Salt-Water Hydrotherapy Pool", nameId: "Kolam Hidroterapi Air Garam Alami", category: "Wellness" },
      { name: "Private Wine Cellar & Cigar Lounge", nameId: "Gudang Anggur & Lounge Cerutu Privat", category: "Lifestyle" },
      { name: "Smart Home Automated Shading", nameId: "Peneduh Otomatis Berbasis Smart Home", category: "Technology" },
      { name: "Separate Staff & Butler Quarters", nameId: "Ruang Akomodasi Khusus Staf & Butler", category: "Service" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Lagoon Pavilion & Mooring Deck",
        nameId: "Paviliun Laguna & Dermaga Kapal",
        area: "720 m²",
        description: "Open reception halls, direct yacht mooring access, guest pavilion, and oceanside infinity pool.",
        descriptionId: "Aula penerima tamu terbuka, akses langsung dermaga kapal, paviliun tamu, dan kolam infinity.",
        features: ["Lagoon Front Living", "Boffi Kitchen", "Guest Villa Suite", "Yacht Deck"],
        featuresId: ["Ruang Tamu Hadap Laguna", "Dapur Boffi", "Suite Vila Tamu", "Dek Kapal Yacht"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Private Island Suites",
        nameId: "Lantai Suite Kamar Tidur",
        area: "600 m²",
        description: "Master retreat with 180-degree ocean views, private sundeck, and 4 luxurious ensuite bedrooms.",
        descriptionId: "Kamar tidur utama dengan pemandangan laut 180 derajat, sundeck privat, dan 4 kamar ensuite.",
        features: ["Master Ocean Suite", "Private Sun Deck", "4 Ensuite Bedrooms", "Family Lounge"],
        featuresId: ["Suite Utama Tepi Laut", "Dek Berjemur Privat", "4 Kamar Tidur Ensuite", "Ruang Keluarga"],
      },
    ],
    specifications: {
      "Island Security": "Controlled access bridge with 24/7 security gate",
      "Mooring Depth": "6.5 meters at low tide",
      "Air Handling": "Variable refrigerant with dedicated outdoor air system",
      "Waterproofing": "Dual-membrane submarine standard basement envelope",
      "Glass Rating": "Acoustic category 4, hurricane rated 160 mph",
      "Finishes": "Hand-applied Italian marmorino plaster throughout",
    },
  },
  {
    id: "prop-6",
    slug: "seraphina-villa",
    name: "SERAPHINA VILLA",
    nameId: "SERAPHINA VILLA",
    tagline: "Swiss Alpine Architectural Marvel",
    taglineId: "Mahakarya Arsitektur Alpen Swiss",
    location: "Zurichberg Hills, Switzerland",
    locationId: "Perbukitan Zurichberg, Swiss",
    city: "Zurich",
    type: "Alpine Modernist",
    typeId: "Modernis Alpen",
    price: "$68,000,000",
    priceNumeric: 68000000,
    specs: "5 Beds • 6 Baths • 1,150 m²",
    beds: 5,
    baths: 6,
    area: "1,150 m²",
    plotArea: "2,800 m²",
    floors: 3,
    garages: 5,
    yearBuilt: "2023",
    architect: "Denn Atelier Zurich",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-6.webp",
    heroImage: "/images/prop-6.webp",
    gallery: [
      "/images/prop-6.webp",
      "/images/craft-1.webp",
      "/images/prop-12.webp",
      "/images/philosophy-main.webp",
    ],
    description: {
      en: "Carved into the hillside of prestige Zurichberg, Seraphina Villa integrates native Swiss stone and blackened steel cantilevers. Floor-to-ceiling glass reveals breathtaking vistas across Lake Zurich and the snowcapped Glarus Alps.",
      id: "Dipahat pada lereng bukit bergengsi Zurichberg, Seraphina Villa memadukan batu kuarsit asli Swiss dan kantilever baja hitam. Dinding kaca menyeluruh mempersembahkan pemandangan magis Danau Zurich dan Pegunungan Alpen yang bersalju.",
    },
    architecturalHighlights: {
      en: [
        "Terraced hillside architecture following the natural slope with zero excavation waste",
        "Geothermal borehole heating system delivering 100% emission-free year-round warmth",
        "Indoor-outdoor heated swimming pool with sliding glass threshold into snow gardens",
        "Private 1,500-bottle alpine wine & cheese maturation cellar with granite tasting bench",
      ],
      id: [
        "Arsitektur terasering yang mengikuti kemiringan lereng alami tanpa merusak kontur tanah",
        "Sistem pemanas geotermal bawah tanah yang 100% bebas emisi dan ramah lingkungan",
        "Kolam renang air hangat indoor-outdoor dengan pembatas kaca geser menuju taman salju",
        "Gudang pematangan anggur & keju Alpen kapasitas 1.500 botol dengan meja cicip granit",
      ],
    },
    materials: [
      { name: "Valser Quartzite Masonry", nameId: "Batu Kuarsit Valser Swiss", origin: "Vals, Switzerland" },
      { name: "Blackened Architectural Steel", nameId: "Baja Hitam Arsitektural", origin: "Solothurn, Switzerland" },
      { name: "Swiss Larch Timber", nameId: "Kayu Larch Hutan Alpen", origin: "Graubünden, Switzerland" },
      { name: "Triple-Pane Passive House Glass", nameId: "Kaca Standar Rumah Pasif Rangkap Tiga", origin: "Germany" },
    ],
    amenities: [
      { name: "Indoor/Outdoor Heated Pool", nameId: "Kolam Renang Hangat Indoor/Outdoor", category: "Pool" },
      { name: "Finnish Wood-Fired Sauna & Cold Plunge", nameId: "Sauna Kayu Asli Finlandia & Kolam Air Dingin", category: "Wellness" },
      { name: "Geothermal Underfloor Radiant Heating", nameId: "Pemanas Lantai Geotermal Seluruh Ruangan", category: "Comfort" },
      { name: "Private Heated Driveway with Snow-Melt", nameId: "Jalan Masuk Berpemanas Otomatis Pelebur Salju", category: "Automotive" },
      { name: "Panoramic Lake Zurich Balconies", nameId: "Balkon Luas Panorama Danau Zurich", category: "View" },
      { name: "Integrated Smart Home & Energy Storage", nameId: "Sistem Energi Mandiri & Otomasi Rumah Cerdas", category: "Technology" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Panoramic Alpine Salon & Hearth",
        nameId: "Salon Panorama Alpen & Perapian",
        area: "420 m²",
        description: "Open hearth living area, custom Boffi kitchen, dining room, and expansive lake terrace.",
        descriptionId: "Ruang keluarga berpenghangat api terbuka, dapur Boffi kustom, ruang makan, dan teras danau.",
        features: ["Suspended Fireplace", "Lakeview Dining", "Chef's Kitchen", "Wrap Balcony"],
        featuresId: ["Perapian Gantung", "Ruang Makan Hadap Danau", "Dapur Chef", "Balkon Melingkar"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Upper Private Quarters",
        nameId: "Kamar Tidur Utama & Keluarga",
        area: "390 m²",
        description: "Master retreat with ensuite spa bath, fireplace, dressing gallery, and 3 guest bedrooms.",
        descriptionId: "Kamar tidur utama dengan kamar mandi spa, perapian, ruang ganti, dan 3 kamar tidur tamu.",
        features: ["Master Spa Suite", "Walk-in Dressing", "3 Ensuite Bedrooms", "Private Study"],
        featuresId: ["Suite Kamar Mandi Spa", "Ruang Ganti Busana", "3 Kamar Tidur Ensuite", "Ruang Kerja Privat"],
      },
      {
        level: "Level B1",
        levelId: "Lantai Bawah Tanah",
        name: "Spa Sanctuary & Auto Lounge",
        nameId: "Sanctuary Spa & Garasi Koleksi",
        area: "340 m²",
        description: "Indoor-outdoor pool, Finnish cedar sauna, steam hammam, and heated 5-car motor vault.",
        descriptionId: "Kolam renang dalam-luar, sauna kayu Finlandia, hammam uap, dan garasi 5 mobil berpemanas.",
        features: ["Indoor-Outdoor Pool", "Cedar Sauna", "Alpine Wine Cellar", "5-Car Heated Vault"],
        featuresId: ["Kolam Dalam/Luar", "Sauna Cedar", "Gudang Anggur Alpen", "Garasi 5 Mobil"],
      },
    ],
    specifications: {
      "Energy Standard": "Swiss Minergie-P-Eco Certified",
      "Heating Source": "8 Geothermal boreholes down to 250m depth",
      "Sound Insulation": "Swiss SIA 181 enhanced acoustic standard",
      "Fireplace": "Custom suspended steel hearth with external air supply",
      "Elevation": "610 meters above sea level",
      "Security": "Direct connection to Zurich Cantonal Police Dispatch",
    },
  },
  {
    id: "prop-7",
    slug: "nexus-monolith",
    name: "NEXUS MONOLITH",
    nameId: "NEXUS MONOLITH",
    tagline: "Brutalist Urban Penthouse",
    taglineId: "Penthouse Urban Konsep Brutalis Mewah",
    location: "Bahnhofstrasse Enclave, Zurich",
    locationId: "Kawasan Bahnhofstrasse, Zurich",
    city: "Zurich",
    type: "Brutalist Penthouse",
    typeId: "Penthouse Brutalis",
    price: "$59,000,000",
    priceNumeric: 59000000,
    specs: "4 Beds • 5 Baths • 890 m²",
    beds: 4,
    baths: 5,
    area: "890 m²",
    plotArea: "1,050 m²",
    floors: 2,
    garages: 4,
    yearBuilt: "2024",
    architect: "Denn High-Rise Studio",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-7.webp",
    heroImage: "/images/prop-7.webp",
    gallery: [
      "/images/prop-7.webp",
      "/images/craft-4.webp",
      "/images/prop-4.webp",
      "/images/hero-dark.webp",
    ],
    description: {
      en: "Perched atop a heritage stone facade on the world's most prestigious luxury avenue, Nexus Monolith is an architectural juxtaposition of raw board-formed concrete and ultra-delicate Swiss precision steel.",
      id: "Berdiri anggun di atas bangunan warisan bersejarah di jalan perbelanjaan paling prestisius di dunia, Nexus Monolith menyajikan perpaduan kontras beton ekspos arsitektural dan baja presisi Swiss yang sangat memukau.",
    },
    architecturalHighlights: {
      en: [
        "Rooftop Japanese Zen gravel sanctuary with 360-degree views of the historic old town and lake",
        "Direct private elevator access from private underground banking vault parking",
        "Double-height concrete fireplace hearth engineered from single 18-ton monolith",
        "Bulletproof acoustic glazing ensuring pin-drop silence in the heart of the financial district",
      ],
      id: [
        "Taman Zen Jepang di atap dengan panorama 360 derajat kota tua bersejarah dan Danau Zurich",
        "Akses lift privat langsung dari garasi bawah tanah dengan standar keamanan perbankan",
        "Perapian beton setinggi dua lantai yang dibuat dari satu bongkahan monolit seberat 18 ton",
        "Kaca kedap suara anti-peluru yang memastikan kesunyian total di pusat distrik keuangan dunia",
      ],
    },
    materials: [
      { name: "Board-Formed Architectural Concrete", nameId: "Beton Ekspos Motif Papan", origin: "Zurich, Switzerland" },
      { name: "Hand-Charred Yakisugi Cedar", nameId: "Kayu Cedar Bakar Yakisugi", origin: "Kyoto, Japan" },
      { name: "Brushed Gunmetal Stainless Steel", nameId: "Baja Gunmetal Disikat Halus", origin: "Germany" },
      { name: "Pietra di Cardoso Sandstone", nameId: "Batu Pasir Pietra di Cardoso", origin: "Tuscany, Italy" },
    ],
    amenities: [
      { name: "Rooftop Zen Garden & Plunge Pool", nameId: "Taman Zen Atap & Kolam Rendam", category: "Outdoor" },
      { name: "Private Vault Room with Reinforced Safe", nameId: "Ruang Khazanah Khusus dengan Brankas Baja", category: "Security" },
      { name: "Custom Boffi Monolith Kitchen", nameId: "Dapur Monolitik Mewah Boffi", category: "Dining" },
      { name: "Private Executive Boardroom / Library", nameId: "Ruang Rapat Eksekutif & Perpustakaan", category: "Business" },
      { name: "4 Climate-Controlled Parking Bays", nameId: "4 Lot Parkir Mobil Berpendingin Suhu", category: "Automotive" },
      { name: "Direct Bahnhofstrasse Private Entryway", nameId: "Akses Masuk Privat Khusus Jalan Bahnhofstrasse", category: "Privacy" },
    ],
    floorplanLevels: [
      {
        level: "Level 07",
        levelId: "Lantai 07",
        name: "Grand Reception & Gallery",
        nameId: "Ruang Resepsi Agung & Galeri",
        area: "480 m²",
        description: "Open gallery salon with 6m ceilings, executive library, kitchen, and dining for 16.",
        descriptionId: "Salon galeri terbuka berplafon 6m, perpustakaan eksekutif, dapur, dan meja makan 16 kursi.",
        features: ["6m High Concrete Salon", "Executive Library", "Boffi Kitchen", "Urban Terrace"],
        featuresId: ["Salon Plafon Beton 6m", "Perpustakaan Eksekutif", "Dapur Mewah Boffi", "Teras Kota"],
      },
      {
        level: "Level 08",
        levelId: "Lantai 08",
        name: "Rooftop Master & Zen Garden",
        nameId: "Suite Kamar Utama & Taman Zen",
        area: "410 m²",
        description: "Master presidential bedroom, Japanese stone bath, Zen gravel garden, and heated plunge pool.",
        descriptionId: "Kamar tidur utama presidensial, bak mandi batu Jepang, taman Zen kerikil, dan kolam rendam hangat.",
        features: ["Master Bed Suite", "Japanese Stone Tub", "Rooftop Zen Garden", "Sky Plunge Pool"],
        featuresId: ["Suite Kamar Tidur Utama", "Bak Mandi Batu Jepang", "Taman Zen Atap", "Kolam Celup Langit"],
      },
    ],
    specifications: {
      "Location": "Bahnhofstrasse, Zurich Old Town",
      "Ceiling Heights": "3.5m to 6.2m",
      "Security": "Class 4 Bank-Grade Vault Specification",
      "Air Quality": "Active carbon filtration with HEPA 14",
      "Heating/Cooling": "Hydro-thermal Lake Zurich exchange loop",
      "Elevator": "Schindler custom glass cab with fingerprint scanner",
    },
  },
  {
    id: "prop-8",
    slug: "solaria-estate",
    name: "SOLARIA ESTATE",
    nameId: "SOLARIA ESTATE",
    tagline: "Sentosa Cove Oceanfront Palace",
    taglineId: "Istana Megah Tepi Laut Sentosa Cove",
    location: "Sentosa Cove, Singapore",
    locationId: "Sentosa Cove, Singapura",
    city: "Singapore",
    type: "Tropical Waterfront",
    typeId: "Residensi Tropis Tepi Laut",
    price: "$92,000,000",
    priceNumeric: 92000000,
    specs: "7 Beds • 8 Baths • 1,780 m²",
    beds: 7,
    baths: 8,
    area: "1,780 m²",
    plotArea: "2,500 m²",
    floors: 3,
    garages: 6,
    yearBuilt: "2024",
    architect: "Denn Architecture Atelier",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-8.webp",
    heroImage: "/images/prop-8.webp",
    gallery: [
      "/images/prop-8.webp",
      "/images/prop-2.webp",
      "/images/craft-2.webp",
      "/images/about.webp",
    ],
    description: {
      en: "The zenith of tropical waterfront living in Singapore. Situated on the exclusive oceanfront strip of Sentosa Cove, Solaria Estate features double-cantilevered living pavilions, a 30-meter infinity pool reaching into the South China Sea, and private superyacht berthing.",
      id: "Puncak hunian tepi laut tropis paling prestisius di Singapura. Terletak di tepi laut eksklusif Sentosa Cove, Solaria Estate memadukan paviliun beratap kantilever ganda, kolam renang infinity 30 meter menghadap Laut Cina Selatan, dan dermaga superyacht privat.",
    },
    architecturalHighlights: {
      en: [
        "Deep water private yacht berth accommodating vessels up to 35 meters with direct marine navigation",
        "Biophilic passive cooling system with deep architectural overhangs and vertical hydroponic green walls",
        "Double-volume living pavilion with 8-meter motorized sliding glass walls vanishing into cavity pockets",
        "Subterranean entertainment sanctum with underwater viewing window into the 30-meter pool",
      ],
      id: [
        "Dermaga yacht privat air dalam untuk kapal hingga 35 meter dengan akses pelayaran langsung",
        "Sistem pendinginan pasif biofilik dengan teritisan atap lebar dan dinding hijau hidroponik vertikal",
        "Paviliun ruang keluarga dua lantai dengan dinding kaca geser 8 meter yang dapat disembunyikan penuh",
        "Ruang hiburan bawah tanah dengan jendela kaca bawah air yang menghadap ke kolam renang 30 meter",
      ],
    },
    materials: [
      { name: "Indonesian Ironwood (Ulin)", nameId: "Kayu Ulin Kalimantan", origin: "Kalimantan, Indonesia" },
      { name: "Honest Architectural Concrete", nameId: "Beton Arsitektural Presisi", origin: "Singapore" },
      { name: "Statuary White Carrara Marble", nameId: "Marmer Putih Statuario", origin: "Carrara, Italy" },
      { name: "Perforated Bronze Shading Screens", nameId: "Kisi-Kisi Peneduh Perunggu Berpori", origin: "Germany" },
    ],
    amenities: [
      { name: "30-Meter Sea-Facing Infinity Pool", nameId: "Kolam Infinity 30 Meter Menghadap Laut", category: "Pool" },
      { name: "Private Deepwater Yacht Berth", nameId: "Dermaga Yacht Privat Air Dalam", category: "Marine" },
      { name: "Subterranean Underwater Viewing Lounge", nameId: "Lounge Bawah Air dengan Jendela Kaca Kolam", category: "Entertainment" },
      { name: "Wine Tasting Sanctuary for 1,000 Bottles", nameId: "Ruang Koleksi Anggur 1.000 Botol", category: "Dining" },
      { name: "Private Air-Conditioned 6-Car Vault", nameId: "Garasi Mewah Ber-AC untuk 6 Mobil", category: "Automotive" },
      { name: "Separate 2-Bedroom Butler Quarters", nameId: "Kamar Khusus Pelayan & Staf 2 Kamar", category: "Service" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Oceanfront Living & Water Mooring",
        nameId: "Ruang Tamu Tepi Laut & Dermaga Kapal",
        area: "700 m²",
        description: "Grand reception salon, show kitchen, dining pavilion, and 30m pool terrace extending to the yacht berth.",
        descriptionId: "Salon resepsi agung, dapur show, paviliun makan, dan teras kolam 30m menuju dermaga yacht.",
        features: ["8m High Grand Salon", "Show & Prep Kitchens", "30m Infinity Pool", "Private Yacht Berth"],
        featuresId: ["Salon Plafon 8m", "Dapur Show & Basah", "Kolam Infinity 30m", "Dermaga Yacht Privat"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Master Presidential Wing",
        nameId: "Sayap Kamar Utama Presidensial",
        area: "650 m²",
        description: "Presidential master suite with private wrap-around terrace, his & hers dressing galleries, and 4 family suites.",
        descriptionId: "Kamar utama presidensial dengan teras keliling, dua ruang ganti mewah, dan 4 suite keluarga.",
        features: ["Presidential Master Suite", "Dual Dressing Galleries", "4 Ensuite Family Suites", "Upper Sky Lounge"],
        featuresId: ["Kamar Utama Presidensial", "Dua Ruang Ganti Mewah", "4 Kamar Keluarga Ensuite", "Lounge Langit Atas"],
      },
      {
        level: "Level B1",
        levelId: "Lantai Bawah Tanah",
        name: "Underwater Lounge & Supercar Vault",
        nameId: "Lounge Bawah Air & Garasi Supercar",
        area: "430 m²",
        description: "Underwater pool viewing lounge, private cinema, 1,000-bottle wine cellar, and 6-car garage.",
        descriptionId: "Lounge pemandangan bawah air kolam renang, bioskop privat, gudang anggur, dan garasi 6 mobil.",
        features: ["Underwater Viewing Lounge", "Private Screening Room", "Wine Tasting Cellar", "6-Car Vault"],
        featuresId: ["Lounge Bawah Air", "Ruang Bioskop Privat", "Gudang Anggur Koleksi", "Garasi 6 Mobil"],
      },
    ],
    specifications: {
      "Tenure": "99 Years Sentosa Cove Waterfront",
      "Berth Capacity": "Yachts up to 115 feet / 35 meters",
      "Green Mark": "BCA Green Mark Platinum Certified",
      "Air Conditioning": "Daikin Water-Cooled VRV System",
      "Security": "Sentosa Cove Security Island Access + Gated Point",
      "Ceiling Heights": "Up to 8.2 meters in central living pavilion",
    },
  },
  {
    id: "prop-9",
    slug: "orchard-sky-suite",
    name: "ORCHARD SKY SUITE",
    nameId: "ORCHARD SKY SUITE",
    tagline: "Ultra-Prime High-Rise Sanctum",
    taglineId: "Hunian Puncak Pencakar Langit di Orchard",
    location: "Orchard Boulevard, Singapore",
    locationId: "Orchard Boulevard, Singapura",
    city: "Singapore",
    type: "Glass High-Rise",
    typeId: "Penthouse Kaca Bertingkat",
    price: "$46,000,000",
    priceNumeric: 46000000,
    specs: "4 Beds • 5 Baths • 760 m²",
    beds: 4,
    baths: 5,
    area: "760 m²",
    plotArea: "850 m²",
    floors: 2,
    garages: 3,
    yearBuilt: "2024",
    architect: "Denn High-Rise Studio",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-9.webp",
    heroImage: "/images/prop-9.webp",
    gallery: [
      "/images/prop-9.webp",
      "/images/craft-4.webp",
      "/images/prop-4.webp",
      "/images/prop-7.webp",
    ],
    description: {
      en: "Rising above the prestigious trees of Orchard Boulevard, this triplex penthouse offers unhindered views over Singapore's skyline and the lush greenery of the Botanic Gardens. Features a private rooftop pool and vertical sky courtyard.",
      id: "Menjulang tinggi di atas kerindangan pohon Orchard Boulevard yang bergengsi, penthouse triplex ini menyuguhkan pemandangan cakrawala Singapura dan kehijauan Botanic Gardens tanpa batas. Dilengkapi kolam renang atap privat dan pelataran langit.",
    },
    architecturalHighlights: {
      en: [
        "Private high-speed dedicated elevator arriving directly into dramatic double-height foyer",
        "Cantilevered heated sky pool floating above the city canopy with transparent glass balustrades",
        "Custom Poliform Varenna kitchen equipped with Gaggenau 400 series induction and steam ovens",
        "Double-glazed motorized acoustic panels reducing urban ambient noise to near zero",
      ],
      id: [
        "Lift privat berkecepatan tinggi yang langsung membuka ke serambi berplafon ganda yang megah",
        "Kolam renang langit air hangat kantilever dengan pembatas kaca akrilik transparan",
        "Dapur Poliform Varenna Italia kustom dengan oven uap dan kompor induksi Gaggenau seri 400",
        "Panel kaca akustik ganda bermotor yang meredam suara perkotaan hingga hening total",
      ],
    },
    materials: [
      { name: "Silver Travertine Flooring", nameId: "Lantai Travertine Perak", origin: "Rapolano, Italy" },
      { name: "Matte Blackened Aluminum", nameId: "Aluminium Hitam Doff", origin: "Germany" },
      { name: "Natural Fluted Teak Paneling", nameId: "Panel Kayu Jati Beralur Alami", origin: "Java, Indonesia" },
      { name: "Acoustic Double-Glazed Low-E Glass", nameId: "Kaca Low-E Akustik Ganda", origin: "Japan" },
    ],
    amenities: [
      { name: "Private Heated Sky Pool", nameId: "Kolam Renang Langit Air Hangat", category: "Pool" },
      { name: "Dedicated Private Express Elevator", nameId: "Lift Ekspres Khusus Pribadi", category: "Access" },
      { name: "Private Wine Cellar & Bar", nameId: "Bar & Ruang Simpan Anggur Privat", category: "Dining" },
      { name: "3 Private Basement Parking Lots", nameId: "3 Lot Parkir Bawah Tanah Khusus", category: "Automotive" },
      { name: "Smart Home Touchscreen & Voice Control", nameId: "Kontrol Rumah Pintar Layar Sentuh & Suara", category: "Technology" },
      { name: "Private Gym & Sauna Suite", nameId: "Ruang Gym & Sauna Privat", category: "Wellness" },
    ],
    floorplanLevels: [
      {
        level: "Level 42",
        levelId: "Lantai 42",
        name: "Grand Sky Living & Dining",
        nameId: "Ruang Tamu & Ruang Makan Langit",
        area: "420 m²",
        description: "Double-height formal living room, show kitchen, wine display, and panoramic balcony.",
        descriptionId: "Ruang tamu berplafon ganda, dapur pamer, display anggur, dan balkon panorama luas.",
        features: ["7m High Living Room", "Designer Kitchen", "Wine Showcase", "Sky Balcony"],
        featuresId: ["Ruang Tamu Plafon 7m", "Dapur Desainer", "Pameran Anggur", "Balkon Langit"],
      },
      {
        level: "Level 43",
        levelId: "Lantai 43",
        name: "Master Suites & Sky Terrace",
        nameId: "Suite Kamar Tidur & Teras Atap",
        area: "340 m²",
        description: "Presidential bedroom with luxury spa bathroom, 3 guest rooms, and private sky pool deck.",
        descriptionId: "Kamar tidur presidensial dengan kamar mandi spa, 3 kamar tidur tamu, dan dek kolam langit.",
        features: ["Presidential Master Suite", "Private Sky Pool", "3 Ensuite Bedrooms", "Private Gym"],
        featuresId: ["Suite Kamar Presidensial", "Kolam Langit Privat", "3 Kamar Tidur Ensuite", "Gym Privat"],
      },
    ],
    specifications: {
      "Building": "The Boulevard Residences",
      "Tenure": "Freehold (Hak Milik Bebas)",
      "Floor Elevation": "180 meters above Orchard Boulevard",
      "Elevators": "2 Private Direct-Entry High Speed Lifts",
      "View": "Botanic Gardens Greenery + Marina Bay Skyline",
      "Automation": "Lutron HomeWorks QS + Crestron Audio Distribution",
    },
  },
  {
    id: "prop-10",
    slug: "menteng-sanctuary",
    name: "MENTENG SANCTUARY",
    nameId: "MENTENG SANCTUARY",
    tagline: "Colonial-Contemporary Heritage Manor",
    taglineId: "Rumah Mewah Kontemporer Bernuansa Heritage",
    location: "Menteng Heritage, Jakarta",
    locationId: "Kawasan Heritage Menteng, Jakarta",
    city: "Jakarta",
    type: "Contemporary Manor",
    typeId: "Manor Kontemporer",
    price: "$38,000,000",
    priceNumeric: 38000000,
    specs: "6 Beds • 7 Baths • 1,500 m²",
    beds: 6,
    baths: 7,
    area: "1,500 m²",
    plotArea: "2,200 m²",
    floors: 3,
    garages: 8,
    yearBuilt: "2024",
    architect: "Denn Architecture Atelier",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-10.webp",
    heroImage: "/images/prop-10.webp",
    gallery: [
      "/images/prop-10.webp",
      "/images/prop-3.webp",
      "/images/about.webp",
      "/images/philosophy-main.webp",
    ],
    description: {
      en: "Situated in Jakarta's historic diplomatic heartland, Menteng Sanctuary marries colonial symmetry with dramatic brutalist concrete cantilevers. Hidden behind high basalt stone walls, it features lush tropical gardens, a 25-meter courtyard pool, and ambassadorial reception halls.",
      id: "Terletak di kawasan diplomatik bersejarah Menteng, Menteng Sanctuary memadukan simetri klasik dengan kantilever beton brutalist kontemporer. Tersembunyi di balik dinding batu basal tinggi, hunian ini dilengkapi taman tropis asri, kolam renang 25 meter, dan aula resepsi standar diplomatik.",
    },
    architecturalHighlights: {
      en: [
        "Diplomatic-grade security perimeter with biometric security gates and reinforced guardhouse",
        "Central tropical courtyard with 25-meter dark basalt lap pool and shaded dining verandas",
        "Grand ballroom reception hall capable of comfortably hosting 150 cocktail guests",
        "Air filtration and positive-pressure ventilation system maintaining pristine indoor air quality",
      ],
      id: [
        "Pengamanan standar kedutaan dengan gerbang biometrik dan pos keamanan berlapis",
        "Pelataran tropis tengah dengan kolam renang batu basal hitam 25 meter dan beranda bersantap teduh",
        "Aula resepsi ballroom megah yang sanggup menampung 150 tamu kehormatan dengan nyaman",
        "Sistem filtrasi udara bertekanan positif yang menjaga kesegaran dan kemurnian udara dalam ruangan",
      ],
    },
    materials: [
      { name: "Cirebon Andesite Dark Basalt", nameId: "Batu Candi Andesit Cirebon", origin: "West Java, Indonesia" },
      { name: "Old-Growth Teak Flooring", nameId: "Kayu Jati Kuno Reklamasi", origin: "Central Java, Indonesia" },
      { name: "Italian Statuario Marble", nameId: "Marmer Statuario Italia", origin: "Carrara, Italy" },
      { name: "Acoustic High-Impact Security Glass", nameId: "Kaca Keamanan Akustik Tahan Benturan", origin: "Germany" },
    ],
    amenities: [
      { name: "25-Meter Courtyard Swimming Pool", nameId: "Kolam Renang Pelataran Tengah 25 Meter", category: "Pool" },
      { name: "Ambassadorial Reception Ballroom", nameId: "Aula Resepsi Megah Standar Duta Besar", category: "Reception" },
      { name: "Subterranean 8-Car Collector Garage", nameId: "Garasi Bawah Tanah Ber-AC untuk 8 Mobil", category: "Automotive" },
      { name: "Dedicated Security Command Post & Guard Suite", nameId: "Pos Komando Keamanan & Ruang Staf Khusus", category: "Security" },
      { name: "Private Wine Cellar & Cigar Salon", nameId: "Gudang Anggur & Ruang Cerutu Pribadi", category: "Lifestyle" },
      { name: "Commercial-Grade Catering Kitchen", nameId: "Dapur Katering Komersial Lengkap", category: "Dining" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Ambassadorial Salon & Garden Pavilions",
        nameId: "Salon Resepsi & Paviliun Taman",
        area: "650 m²",
        description: "Formal reception ballroom, state dining room, gourmet kitchen, and open verandahs facing the 25m pool.",
        descriptionId: "Aula resepsi formal, ruang makan kenegaraan, dapur gourmet, dan beranda menghadap kolam 25m.",
        features: ["Grand Ballroom", "State Dining for 24", "Catering Kitchen", "25m Basalt Pool"],
        featuresId: ["Ballroom Agung", "Ruang Makan 24 Kursi", "Dapur Katering", "Kolam Basal 25m"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Presidential Family Quarters",
        nameId: "Kamar Tidur Utama & Keluarga",
        area: "550 m²",
        description: "Primary presidential master suite, 4 ensuite bedrooms, private family lounge, and study room.",
        descriptionId: "Kamar tidur utama presidensial, 4 kamar tidur ensuite, ruang santai keluarga, dan perpustakaan.",
        features: ["Master Bedroom Suite", "His & Hers Bathrooms", "4 Ensuite Bedrooms", "Private Family Den"],
        featuresId: ["Suite Kamar Tidur Utama", "Dua Kamar Mandi Marmer", "4 Kamar Tidur Ensuite", "Ruang Santai"],
      },
      {
        level: "Level B1",
        levelId: "Lantai Bawah Tanah",
        name: "Security Post & Collector Garage",
        nameId: "Pos Keamanan & Garasi Koleksi",
        area: "300 m²",
        description: "Underground parking for 8 vehicles, security command post, and staff quarters.",
        descriptionId: "Parkir bawah tanah 8 kendaraan, pos komando keamanan, dan tempat tinggal staf.",
        features: ["8-Car Air-Conditioned Garage", "Security Operations Post", "Wine Vault", "Staff Suites"],
        featuresId: ["Garasi 8 Mobil Ber-AC", "Pos Komando Keamanan", "Gudang Anggur", "Kamar Staf Lengkap"],
      },
    ],
    specifications: {
      "Location": "Menteng, Central Jakarta",
      "Land Title": "Sertifikat Hak Milik (SHM Freehold)",
      "Security": "Bullet-resistant glass & infrared perimeter boundary",
      "Air Quality": "HEPA 13 central filtration with positive air pressure",
      "Power": "Dual Grid + 100kVA Cummins Silent Backup Generator",
      "Water Supply": "Triple-stage ultrafiltration deep well + municipal connection",
    },
  },
  {
    id: "prop-11",
    slug: "scbd-sky-villa",
    name: "SCBD SKY VILLA",
    nameId: "SCBD SKY VILLA",
    tagline: "Triplex Penthouse in Jakarta's Core",
    taglineId: "Penthouse Triplex Mewah di Pusat Bisnis SCBD",
    location: "SCBD District, Jakarta",
    locationId: "Kawasan Bisnis SCBD, Jakarta",
    city: "Jakarta",
    type: "Triplex Penthouse",
    typeId: "Penthouse Tiga Lantai",
    price: "$44,000,000",
    priceNumeric: 44000000,
    specs: "5 Beds • 6 Baths • 920 m²",
    beds: 5,
    baths: 6,
    area: "920 m²",
    plotArea: "1,050 m²",
    floors: 3,
    garages: 4,
    yearBuilt: "2024",
    architect: "Denn High-Rise Studio",
    status: "Available",
    statusId: "Tersedia",
    image: "/images/prop-11.webp",
    heroImage: "/images/prop-11.webp",
    gallery: [
      "/images/prop-11.webp",
      "/images/craft-4.webp",
      "/images/prop-4.webp",
      "/images/prop-7.webp",
    ],
    description: {
      en: "Crown jewel triplex residence hovering 55 levels above Jakarta's premier financial epicentre. Featuring a cantilevered private pool, private internal spiral staircase sculpted from bronze and carbon steel, and unmatched views across the cityscape.",
      id: "Mahkota hunian triplex tiga lantai yang melayang 55 lantai di atas pusat keuangan paling bergengsi di Jakarta (SCBD). Dilengkapi kolam renang langit kantilever privat, tangga spiral tempa perunggu artistik, dan pemandangan megah cakrawala kota.",
    },
    architecturalHighlights: {
      en: [
        "Private direct high-speed express elevator from basement vault directly into triplex foyer",
        "Cantilevered 15-meter heated sky pool with infinity edge overlooking SCBD skyscrapers",
        "Double-height 7.5-meter ceiling voids with motorized panoramic acoustic curtain walls",
        "Integrated Italian Poliform kitchen and private temperature-controlled wine room",
      ],
      id: [
        "Lift ekspres privat berkecepatan tinggi dari lantai parkir langsung membuka ke serambi triplex",
        "Kolam renang langit air hangat 15 meter dengan tepian infinity menghadap gedung pencakar langit SCBD",
        "Plafon tinggi 7,5 meter dengan dinding kaca panorama bermotor kedap suara",
        "Dapur Poliform Italia terintegrasi dan ruang koleksi anggur terkontrol suhu",
      ],
    },
    materials: [
      { name: "Pietra Grey Polished Marble", nameId: "Marmer Kilap Pietra Grey", origin: "Isfahan" },
      { name: "Smoked Brushed Stainless Steel", nameId: "Baja Stainless Doff Abu Asap", origin: "Germany" },
      { name: "Acoustic Acoustic Wood Slat Panels", nameId: "Panel Kayu Akustik Linear", origin: "Denmark" },
      { name: "High-Performance Double-Laminated Glass", nameId: "Kaca Laminasi Ganda Performa Tinggi", origin: "Japan" },
    ],
    amenities: [
      { name: "15m Heated Cantilever Sky Pool", nameId: "Kolam Langit Kantilever 15m Berpemanas", category: "Pool" },
      { name: "Dedicated Private Express Lift", nameId: "Lift Pribadi Ekspres Khusus", category: "Access" },
      { name: "Private Wine Cellar & Tasting Bar", nameId: "Gudang Anggur & Bar Cicip Privat", category: "Dining" },
      { name: "4 Private Executive Parking Bays", nameId: "4 Lot Parkir Eksekutif Khusus", category: "Automotive" },
      { name: "Private Gym & Infrared Sauna", nameId: "Ruang Gym & Sauna Inframerah Privat", category: "Wellness" },
      { name: "24/7 VIP Concierge & Security Escort", nameId: "Layanan Concierge VIP & Keamanan 24 Jam", category: "Service" },
    ],
    floorplanLevels: [
      {
        level: "Level 54",
        levelId: "Lantai 54",
        name: "Grand Reception & Sky Terraces",
        nameId: "Ruang Tamu Agung & Teras Langit",
        area: "400 m²",
        description: "Double-height formal living room, Poliform show kitchen, formal dining, and 15m cantilever pool.",
        descriptionId: "Ruang tamu berplafon ganda, dapur show Poliform, ruang makan formal, dan kolam kantilever 15m.",
        features: ["7.5m Ceiling Height", "15m Cantilever Sky Pool", "Show Kitchen", "Outdoor Dining Deck"],
        featuresId: ["Plafon Tinggi 7.5m", "Kolam Langit Kantilever 15m", "Dapur Mewah", "Teras Makan Terbuka"],
      },
      {
        level: "Level 55",
        levelId: "Lantai 55",
        name: "Master Suites & Sky Lounge",
        nameId: "Kamar Tidur Utama & Sky Lounge",
        area: "350 m²",
        description: "Primary presidential bedroom with walk-in dressing room, spa bathroom, and 3 guest suites.",
        descriptionId: "Kamar tidur utama dengan ruang ganti luas, kamar mandi spa marmer, dan 3 kamar tidur tamu.",
        features: ["Presidential Master Suite", "Spa Bath with City View", "3 Ensuite Bedrooms", "Private Office"],
        featuresId: ["Suite Utama Presidensial", "Kamar Mandi Hadap Kota", "3 Kamar Tidur Ensuite", "Ruang Kerja Privat"],
      },
      {
        level: "Level 56",
        levelId: "Lantai 56",
        name: "Rooftop Starlight Observatory & Lounge",
        nameId: "Observatorium Atap & Lounge Bintang",
        area: "170 m²",
        description: "Private rooftop cocktail lounge, outdoor hot tub, and private wellness gym suite.",
        descriptionId: "Lounge koktail atap privat, hot tub air panas terbuka, dan ruang kebugaran gym mandiri.",
        features: ["Rooftop Cocktail Bar", "Outdoor Jacuzzi", "Private Gym", "Sunset Deck"],
        featuresId: ["Bar Koktail Atap", "Jacuzzi Luar Ruangan", "Gym Privat", "Dek Pemandangan Senja"],
      },
    ],
    specifications: {
      "Building": "SCBD Landmark Residences",
      "Floor Elevation": "220 meters above ground",
      "Elevators": "2 Dedicated High-Speed Private Lifts",
      "Air Filtration": "Central Plasma Air Ionization & HEPA filtration",
      "Acoustic Rating": "STC 56 soundproofing against city noise",
      "Smart Controls": "Full iPad & smartphone automation for lighting, climate, shades",
    },
  },
  {
    id: "prop-12",
    slug: "avalon-cove",
    name: "AVALON COVE",
    nameId: "AVALON COVE",
    tagline: "Private Shoreline Manor on Lake Zurich",
    taglineId: "Kawasan Manor Tepi Danau Eksklusif di Lake Zurich",
    location: "Lake Zurich, Switzerland",
    locationId: "Danau Zurich, Swiss",
    city: "Zurich",
    type: "Private Shore Estate",
    typeId: "Manor Tepi Danau Privat",
    price: "$105,000,000",
    priceNumeric: 105000000,
    specs: "8 Beds • 10 Baths • 2,400 m²",
    beds: 8,
    baths: 10,
    area: "2,400 m²",
    plotArea: "4,800 m²",
    floors: 3,
    garages: 10,
    yearBuilt: "2024",
    architect: "Denn Architecture Atelier",
    status: "Private Reserve",
    statusId: "Reservasi Privat",
    image: "/images/prop-12.webp",
    heroImage: "/images/prop-12.webp",
    gallery: [
      "/images/prop-12.webp",
      "/images/craft-1.webp",
      "/images/prop-6.webp",
      "/images/about.webp",
    ],
    description: {
      en: "One of the rarest lakeside private holdings in Western Europe. Encompassing nearly five thousand square meters of secluded shoreline on Lake Zurich's prestigious Gold Coast, Avalon Cove offers a private boathouse, indoor Olympic-standard pool, and private helicopter landing rights.",
      id: "Salah satu aset tanah privat tepi danau paling langka di Eropa Barat. Membentang di hampir lima ribu meter persegi garis pantai danau di Gold Coast Danau Zurich yang tersohor, Avalon Cove dilengkapi rumah perahu privat, kolam renang indoor standar olimpiade, dan izin pendaratan helikopter.",
    },
    architecturalHighlights: {
      en: [
        "Direct 120-meter private shoreline with private stone jetty and automated boathouse",
        "Indoor heated 25-meter Olympic-standard pool flanked by Valser granite colonnades",
        "Geothermal subterranean heating and hydro-exchange system with zero carbon emissions",
        "Private helicopter landing apron with certified Swiss Federal Aviation authority clearance",
      ],
      id: [
        "Garis pantai danau privat sepanjang 120 meter dengan dermaga batu dan rumah perahu otomatis",
        "Kolam renang air hangat 25 meter standar olimpiade diapit pilar batu granit Valser megah",
        "Pemanas geotermal dan pertukaran hidro-termal ramah lingkungan tanpa emisi karbon",
        "Landasan helikopter privat bersertifikat resmi dari otoritas penerbangan federal Swiss",
      ],
    },
    materials: [
      { name: "Swiss Valser Granite", nameId: "Granit Valser Swiss", origin: "Vals, Switzerland" },
      { name: "Brushed Alpine Bronze", nameId: "Perunggu Alpen Doff", origin: "Austria" },
      { name: "Centuries-Old Reclaimed Larch", nameId: "Kayu Larch Kuno Reklamasi", origin: "Glarus, Switzerland" },
      { name: "Acoustic Low-E Triple Glazing", nameId: "Kaca Low-E Rangkap Tiga Akustik", origin: "Germany" },
    ],
    amenities: [
      { name: "120m Private Lake Shoreline & Boathouse", nameId: "Garis Pantai Danau 120m & Rumah Perahu", category: "Marine" },
      { name: "Indoor 25m Olympic Lap Pool & Thermal Spa", nameId: "Kolam Renang 25m Standar Olimpiade & Spa Termal", category: "Wellness" },
      { name: "Certified Private Helicopter Apron", nameId: "Landasan Pendaratan Helikopter Bersertifikat", category: "Aviation" },
      { name: "Private 10-Car Air-Conditioned Motor Vault", nameId: "Garasi Mewah Ber-AC untuk 10 Supercar", category: "Automotive" },
      { name: "Standalone Guest House with 3 Suites", nameId: "Paviliun Tamu Terpisah dengan 3 Kamar Tidur", category: "Hospitality" },
      { name: "Wine Cellar & Private Tasting Pavilion", nameId: "Gudang Anggur & Paviliun Cicip Eksklusif", category: "Dining" },
    ],
    floorplanLevels: [
      {
        level: "Level 01",
        levelId: "Lantai 01",
        name: "Lakeside Grand Salon & Harbor Verandah",
        nameId: "Salon Agung Tepi Danau & Beranda Dermaga",
        area: "1,050 m²",
        description: "Palatial formal reception hall, banquet dining for 30, Boffi kitchens, and panoramic lake verandah.",
        descriptionId: "Aula resepsi megah, ruang makan perjamuan 30 tamu, dapur Boffi, dan beranda panorama danau.",
        features: ["Grand Reception Hall", "Banquet Dining for 30", "Gourmet & Prep Kitchens", "Lakeside Terrace"],
        featuresId: ["Aula Resepsi Megah", "Meja Makan 30 Kursi", "Dapur Gourmet & Servis", "Teras Tepi Danau"],
      },
      {
        level: "Level 02",
        levelId: "Lantai 02",
        name: "Presidential Master Suite & Family Suites",
        nameId: "Kamar Tidur Utama Presidensial & Suite Keluarga",
        area: "850 m²",
        description: "Presidential master suite with wrap-around terrace, dual spa bathrooms, and 6 ensuite family bedrooms.",
        descriptionId: "Kamar tidur utama dengan teras keliling danau, dua kamar mandi spa, dan 6 kamar tidur ensuite.",
        features: ["Presidential Master Suite", "His & Hers Bathrooms", "6 Ensuite Bedrooms", "Private Lake Balconies"],
        featuresId: ["Kamar Utama Presidensial", "Dua Kamar Mandi Marmer", "6 Kamar Tidur Ensuite", "Balkon Hadap Danau"],
      },
      {
        level: "Level B1",
        levelId: "Lantai Bawah Tanah",
        name: "Olympic Pool, Spa & Car Vault",
        nameId: "Kolam Olimpiade, Spa Termal & Garasi 10 Mobil",
        area: "500 m²",
        description: "Indoor 25m heated pool, Finnish sauna, wine cellar, 10-car garage, and boat slip access.",
        descriptionId: "Kolam renang indoor 25m, sauna Finlandia, gudang anggur, garasi 10 mobil, dan akses perahu.",
        features: ["25m Olympic Indoor Pool", "Thermal Sauna & Hammam", "10-Car Collector Vault", "Boathouse Slip"],
        featuresId: ["Kolam Renang 25m", "Sauna & Hammam Termal", "Garasi 10 Mobil Koleksi", "Dermaga Rumah Perahu"],
      },
    ],
    specifications: {
      "Shoreline": "120 meters direct riparian rights on Lake Zurich",
      "Boathouse": "Automated electric boatlift accommodating twin motorcraft",
      "Energy Efficiency": "100% Lake hydro-exchange heating & cooling",
      "Helipad": "Certified single-engine turbine landing pad",
      "Security": "Subterranean bank-grade safe room & private security guardhouse",
      "Tenure": "Swiss Freehold Land Title",
    },
  },
];

export function getPropertyBySlug(slug: string): PropertyItem | undefined {
  return PROPERTIES_DATA.find((p) => p.slug === slug || p.id === slug);
}

export function getAllPropertySlugs(): string[] {
  return PROPERTIES_DATA.map((p) => p.slug);
}

export interface LocationData {
  title: string;
  tag: string;
  tagId: string;
  description: {
    en: string;
    id: string;
  };
  hubs: string[];
  hubsId: string[];
  btn: string;
  featuredPropertySlug?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const LOCATIONS_DATA: Record<string, LocationData> = {
  BATAM: {
    title: "BATAM",
    tag: "KEPULAUAN RIAU, ID",
    tagId: "KEPULAUAN RIAU, ID",
    description: {
      en: "Strategic maritime gateway neighboring Singapore, hosting world-class luxury waterfront estates, golf sanctuaries, and private marina enclaves.",
      id: "Pintu gerbang maritim strategis di dekat Singapura, menghadirkan kawasan hunian tepi laut mewah, suaka golf berstandar dunia, dan marina privat.",
    },
    hubs: [
      "Nongsa Coast & Marina Resorts",
      "HarbourBay Waterfront Skyline",
      "Sukajadi Championship Golf Sanctuary",
      "Batam Center Diplomatic Enclave",
      "Barelang Archipelago Oceanfront",
    ],
    hubsId: [
      "Kawasan Pesisir & Marina Nongsa",
      "Cakrawala Tepi Air HarbourBay",
      "Kawasan Golf Kejuaraan Sukajadi",
      "Kawasan Pusat Batam Center",
      "Kawasan Kepulauan Barelang",
    ],
    btn: "EXPLORE BATAM HUBS",
    featuredPropertySlug: "solaria-estate",
    coordinates: { lat: 1.1301, lng: 104.0529 },
  },
  DUBAI: {
    title: "DUBAI",
    tag: "UNITED ARAB EMIRATES",
    tagId: "UNI EMIRAT ARAB",
    description: {
      en: "Global capital of architectural ambition, home to iconic private estates in Dubai Hills, Palm Jumeirah, Emirates Hills, and Downtown sky villas.",
      id: "Pusat arsitektur megah dunia, rumah bagi hunian privat termewah di Dubai Hills, Palm Jumeirah, Emirates Hills, dan vila angkasa Downtown.",
    },
    hubs: [
      "Dubai Hills Monolithic Enclave",
      "Palm Jumeirah Oceanfront Fronds",
      "Emirates Hills Private Sanctuary",
      "Downtown Dubai Sky Penthouses",
      "Jumeirah Bay Island Marina",
    ],
    hubsId: [
      "Kawasan Monolit Dubai Hills",
      "Kawasan Pesisir Palm Jumeirah",
      "Suaka Privat Emirates Hills",
      "Penthouse Angkasa Downtown Dubai",
      "Marina Pulau Jumeirah Bay",
    ],
    btn: "EXPLORE DUBAI HUBS",
    featuredPropertySlug: "sander-house",
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  ZURICH: {
    title: "ZURICH",
    tag: "SWITZERLAND",
    tagId: "SWISS",
    description: {
      en: "The historic cradle of Swiss architecture, presenting pristine alpine hillside villas, historic urban penthouses, and private lakefront holdings.",
      id: "Pusat lahirnya kemurnian arsitektur Swiss, menghadirkan vila lereng Alpen nan asri, penthouse urban bersejarah, dan kepemilikan tanah tepi danau privat.",
    },
    hubs: [
      "Zurichberg Hills Panoramic Villas",
      "Bahnhofstrasse Heritage Penthouses",
      "Lake Zurich Gold Coast Estates",
      "Alpenblick Modernist Retreats",
      "Limmat Riverside Enclaves",
    ],
    hubsId: [
      "Vila Panorama Perbukitan Zurichberg",
      "Penthouse Warisan Bahnhofstrasse",
      "Kawasan Gold Coast Danau Zurich",
      "Suaka Modernis Alpenblick",
      "Kawasan Tepi Sungai Limmat",
    ],
    btn: "EXPLORE ZURICH HUBS",
    featuredPropertySlug: "seraphina-villa",
    coordinates: { lat: 47.3769, lng: 8.5417 },
  },
  SINGAPORE: {
    title: "SINGAPORE",
    tag: "REPUBLIC OF SINGAPORE",
    tagId: "REPUBLIK SINGAPURA",
    description: {
      en: "Premier wealth metropolis featuring waterfront superyacht estates on Sentosa Cove, high-rise sky sanctums on Orchard Boulevard, and Good Class Bungalows.",
      id: "Metropolis finansial terkemuka dengan hunian tepi laut superyacht di Sentosa Cove, tempat perlindungan angkasa di Orchard Boulevard, dan Good Class Bungalow.",
    },
    hubs: [
      "Sentosa Cove Waterfront Strip",
      "Orchard Boulevard High-Rise Sanctums",
      "Nassim Road Good Class Enclaves",
      "Marina Bay Skyline Penthouses",
      "Tanglin Architectural Residences",
    ],
    hubsId: [
      "Kawasan Tepi Laut Sentosa Cove",
      "Penthouse Menjulang Orchard Boulevard",
      "Kawasan Good Class Bungalow Nassim Road",
      "Penthouse Cakrawala Marina Bay",
      "Residensi Arsitektur Tanglin",
    ],
    btn: "EXPLORE SINGAPORE HUBS",
    featuredPropertySlug: "solaria-estate",
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
  JAKARTA: {
    title: "JAKARTA",
    tag: "INDONESIA",
    tagId: "INDONESIA",
    description: {
      en: "Dynamic Southeast Asian capital uniting prestigious colonial heritage manors in Menteng, diplomatic enclaves in Dharmawangsa, and SCBD financial triplexes.",
      id: "Ibu kota dinamis Asia Tenggara yang menyatukan manor heritage di Menteng, kawasan diplomatik Dharmawangsa, dan triplex modern di pusat bisnis SCBD.",
    },
    hubs: [
      "Menteng Historic Diplomatic Manors",
      "SCBD Financial Epicentre Penthouses",
      "Dharmawangsa Botanical Sanctuaries",
      "Senopati Architectural Pavilions",
      "Pondok Indah Private Estates",
    ],
    hubsId: [
      "Manor Diplomatik Bersejarah Menteng",
      "Penthouse Pusat Keuangan SCBD",
      "Suaka Botani Dharmawangsa",
      "Paviliun Arsitektur Senopati",
      "Kawasan Hunian Megah Pondok Indah",
    ],
    btn: "EXPLORE JAKARTA HUBS",
    featuredPropertySlug: "menteng-sanctuary",
    coordinates: { lat: -6.2088, lng: 106.8456 },
  },
};

export interface TeamMember {
  name: string;
  role: string;
  roleId: string;
  bio: {
    en: string;
    id: string;
  };
  image: string;
  credentials: string;
}

export const ATELIER_TEAM: TeamMember[] = [
  {
    name: "James Sander",
    role: "Founder & Principal Architect",
    roleId: "Pendiri & Kepala Arsitek",
    credentials: "ETH Zurich • SIA • RIBA Fellow",
    image: "/images/about.webp",
    bio: {
      en: "Trained at ETH Zurich, James Sander founded the atelier with a commitment to sculptural monolithic concrete, raw geological honesty, and environmental longevity.",
      id: "Lulusan ETH Zurich, James Sander mendirikan atelier ini dengan dedikasi pada beton monolitik skulptural, kejujuran geologis material, dan daya tahan lingkungan jangka panjang.",
    },
  },
  {
    name: "Elena Vance",
    role: "Partner & Head of Structural Innovation",
    roleId: "Partner & Kepala Inovasi Struktural",
    credentials: "MIT Structural Engineering • Swiss PE",
    image: "/images/avatar-1.webp",
    bio: {
      en: "Pioneering post-tensioned cantilever engineering and ultra-high-performance concrete envelopes across extreme desert and alpine climates.",
      id: "Memelopori rekayasa kantilever pasca-tarik dan selubung beton performa ultra-tinggi untuk iklim ekstrem gurun pasir hingga pegunungan Alpen.",
    },
  },
  {
    name: "Marcello Rossi",
    role: "Design Director — Interiors & Materiality",
    roleId: "Direktur Desain — Interior & Materialitas",
    credentials: "Politecnico di Milano • AD100",
    image: "/images/avatar-2.webp",
    bio: {
      en: "Overseeing custom stone quarries in Carrara and Swiss quartzite cuts, ensuring tactile harmony between monumental shells and bespoke interior appointments.",
      id: "Mengawasi tambang batu khusus di Carrara dan pemotongan kuarsit Swiss, memastikan keselarasan taktil antara struktur monolitik dan furnitur kustom.",
    },
  },
  {
    name: "Dr. Aris Thorne",
    role: "Principal of Sustainability & Biophilia",
    roleId: "Kepala Arsitektur Berkelanjutan & Biofilia",
    credentials: "Cambridge Architecture • LEED AP BD+C",
    image: "/images/avatar-3.webp",
    bio: {
      en: "Engineering geothermal loops, passive solar envelopes, and greywater biological biospheres that achieve net-zero operational milestones.",
      id: "Merancang sirkulasi geotermal, selubung surya pasif, dan biosfer biologis air daur ulang untuk mencapai efisiensi energi net-zero.",
    },
  },
];

export interface OfficeLocation {
  city: string;
  cityId: string;
  role: string;
  roleId: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  hoursId: string;
}

export const GLOBAL_OFFICES: OfficeLocation[] = [
  {
    city: "Zurich",
    cityId: "Zurich",
    role: "Global Headquarters & Architectural Atelier",
    roleId: "Kantor Pusat Global & Studio Arsitektur",
    address: "Bahnhofstrasse 45, 8001 Zurich, Switzerland",
    phone: "+41 44 211 88 00",
    email: "zurich@dennhouse.com",
    hours: "Mon – Fri: 08:30 – 18:30 CET",
    hoursId: "Sen – Jum: 08:30 – 18:30 CET",
  },
  {
    city: "Dubai",
    cityId: "Dubai",
    role: "Middle East Design Studio & Private Client Desk",
    roleId: "Studio Desain Timur Tengah & Meja Klien Privat",
    address: "DIFC Gate Village, Building 03, Dubai, UAE",
    phone: "+971 4 362 7700",
    email: "dubai@dennhouse.com",
    hours: "Sun – Thu: 09:00 – 19:00 GST",
    hoursId: "Min – Kam: 09:00 – 19:00 GST",
  },
  {
    city: "Singapore",
    cityId: "Singapura",
    role: "Southeast Asia Regional Advisory Hub",
    roleId: "Pusat Konsultasi Regional Asia Tenggara",
    address: "Marina Bay Financial Centre Tower 2, Singapore 018983",
    phone: "+65 6812 9000",
    email: "singapore@dennhouse.com",
    hours: "Mon – Fri: 09:00 – 18:00 SGT",
    hoursId: "Sen – Jum: 09:00 – 18:00 SGT",
  },
  {
    city: "Jakarta",
    cityId: "Jakarta",
    role: "Indonesia Representative & Private Client Lounge",
    roleId: "Perwakilan Indonesia & Lounge Klien Privat",
    address: "Pacific Century Place, Level 28, SCBD, Jakarta 12190",
    phone: "+62 813-6764-825",
    email: "jakarta@dennhouse.com",
    hours: "Mon – Fri: 09:00 – 17:30 WIB",
    hoursId: "Sen – Jum: 09:00 – 17:30 WIB",
  },
];
