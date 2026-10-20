// Semua teks & data halaman ada di satu tempat.
export const BRAND = {
  name: "Chef's Table",
  tagline: 'Gastronomi Autentik',
  taglineEn: 'Authentic Gastronomy',
  description:
    'Pengalaman kuliner yang berfokus pada bahan-bahan musiman dan teknik yang halus.',
  descriptionEn:
    'A culinary experience centered on seasonal ingredients and refined techniques.',
  phone: '0823-7668-0987',
  address: 'Jl. Pemuda, Cijantra, Kec. Pagedangan, Banten 15336',
};

const basePath = process.env.NEXT_PUBLIC_DEMO_BASE_PATH || '';

export const NAV_LINKS = [
  { label: 'Beranda', labelEn: 'Home', href: basePath + '/' },
  { label: 'Menu', labelEn: 'Menu', href: basePath + '/menu' },
  { label: 'Tentang', labelEn: 'About', href: basePath + '/tentang' },
  { label: 'Galeri', labelEn: 'Gallery', href: basePath + '/galeri' },
  { label: 'Tim Kami', labelEn: 'Our Team', href: basePath + '/tim' },
  { label: 'Kontak', labelEn: 'Contact', href: basePath + '/kontak' },
];

export const HERO = {
  eyebrow: 'Gastronomi Autentik',
  eyebrowEn: 'Authentic Gastronomy',
  titleLines: ['Bahan Segar,', 'Rasa Tak Terlupakan'],
  titleLinesEn: ['Fresh Ingredients,', 'Unforgettable Taste'],
  subtitle:
    'Rasakan seni kuliner kelas atas dengan kesegaran langsung dari ladang di setiap gigitan.',
  subtitleEn:
    'Experience high culinary artistry with farm-fresh freshness in every delicious bite.',
  primaryCta: { label: 'Reservasi Meja', labelEn: 'Book a Table', href: '/kontak' },
  secondaryCta: { label: 'Lihat Menu', labelEn: 'View Menu', href: basePath + '/menu' },
  image: '/assets/banner.webp',
};

export const PILLARS = [
  {
    title: 'Bahan Segar dari Petani',
    titleEn: 'Farm Fresh Ingredients',
    description:
      'Diambil setiap hari dari pertanian organik lokal untuk memastikan kualitas tertinggi dan rasa musiman yang optimal.',
    descriptionEn:
      'Harvested daily from local organic farms to ensure optimal seasonal quality and vibrant flavors.',
  },
  {
    title: 'Resep Racikan Koki',
    titleEn: 'Chef-Crafted Recipes',
    description:
      'Koki kami meracik hidangan dengan hati, menyeimbangkan rasa tradisi dan sentuhan modern.',
    descriptionEn:
      'Our chefs craft dishes with heart, balancing rich heritage with modern finesse.',
  },
  {
    title: 'Pengalaman yang Hangat',
    titleEn: 'Warm Hospitality',
    description:
      'Bukan sekadar makan — kami ingin Anda pulang dengan perut kenyang dan hati senang.',
    descriptionEn:
      'More than just dining — we strive to send you home with a satisfied palate and a delighted heart.',
  },
];

export const MENU_FILTERS = [
  { key: 'Semua', labelId: 'Semua', labelEn: 'All' },
  { key: 'Burger', labelId: 'Burger', labelEn: 'Burger' },
  { key: 'Taco', labelId: 'Taco', labelEn: 'Taco' },
  { key: 'Wrap', labelId: 'Wrap', labelEn: 'Wrap' },
  { key: 'Minuman', labelId: 'Minuman', labelEn: 'Beverages' },
];

export const MENU_ITEMS = [
  {
    slug: 'burger-spesial',
    name: 'Burger Spesial',
    nameEn: 'Special Gourmet Burger',
    category: 'Burger',
    description: 'Daging sapi pilihan dengan bawang bombay karamel dan keju cheddar tua.',
    descriptionEn: 'Selected beef patty with caramelized onions and aged cheddar cheese.',
    price: 75000,
    badge: 'Populer',
    badgeEn: 'Popular',
    image: '/assets/menu/burger-special.webp',
  },
  {
    slug: 'taco-al-pastor',
    name: 'Taco Al Pastor',
    nameEn: 'Taco Al Pastor',
    category: 'Taco',
    description: 'Daging panggang lambat dengan nanas panggang, ketumbar, dan salsa verde.',
    descriptionEn: 'Slow-roasted meat with grilled pineapple, fresh cilantro, and salsa verde.',
    price: 60000,
    image: '/assets/menu/taco-al-pastor.webp',
  },
  {
    slug: 'wrap-ayam-gurih',
    name: 'Wrap Ayam Gurih',
    nameEn: 'Savory Chicken Wrap',
    category: 'Wrap',
    description: 'Ayam herbal panggang dengan alpukat Hass, selada romaine, dan saus yogurt.',
    descriptionEn: 'Herb-roasted chicken with Hass avocado, romaine lettuce, and yogurt sauce.',
    price: 40000,
    image: '/assets/menu/wrap-ayam-gurih.webp',
  },
  {
    slug: 'soda-jeruk-khas',
    name: 'Soda Jeruk Khas',
    nameEn: 'Signature Citrus Soda',
    category: 'Minuman',
    description: 'Dibuat sendiri dengan bahan botani segar, grapefruit, dan sirup rosemary.',
    descriptionEn: 'House-crafted with fresh botanicals, ruby grapefruit, and rosemary syrup.',
    price: 30000,
    image: '/assets/menu/soda-jeruk-khas.webp',
  },
  {
    slug: 'burger-cheese',
    name: 'Burger Cheese',
    nameEn: 'Melted Cheddar Burger',
    category: 'Burger',
    description: 'Daging sapi panggang premium, lelehan keju cheddar, tomat, dan selada renyah.',
    descriptionEn: 'Premium grilled beef, melted cheddar cheese, tomatoes, and crisp lettuce.',
    price: 50000,
    image: '/assets/menu/burger-cheese.webp',
  },
  {
    slug: 'burger-beef',
    name: 'Burger Beef',
    nameEn: 'Classic Beef Burger',
    category: 'Burger',
    description: 'Patty sapi premium dengan selada renyah, tomat, bawang merah, dan saus rumah.',
    descriptionEn: 'Premium beef patty with crisp lettuce, fresh tomato, red onions, and house sauce.',
    price: 65000,
    image: '/assets/menu/burger-beef.webp',
  },
  {
    slug: 'veggie-taco',
    name: 'Veggie Taco',
    nameEn: 'Garden Veggie Taco',
    category: 'Taco',
    description: 'Taco vegetarian dengan kacang lembut, guacamole, sayur segar, dan crema ringan.',
    descriptionEn: 'Vegetarian taco with tender beans, fresh guacamole, garden vegetables, and crema.',
    price: 70000,
    image: '/assets/menu/taco-veggie.webp',
  },
  {
    slug: 'mexican-taco',
    name: 'Mexican Taco',
    nameEn: 'Authentic Mexican Taco',
    category: 'Taco',
    description: 'Isian daging melimpah, crema rempah, alpukat, kubis segar, dan tortilla hangat.',
    descriptionEn: 'Rich spiced meat filling, flavored crema, avocado, crisp cabbage, and warm tortillas.',
    price: 50000,
    image: '/assets/menu/taco-mexican.webp',
  },
  {
    slug: 'italian-wrap',
    name: 'Italian Wrap',
    nameEn: 'Italian Herb Wrap',
    category: 'Wrap',
    description: 'Wrap premium dengan tomat panggang, mozzarella, basil, zaitun, dan daging asap.',
    descriptionEn: 'Premium wrap with sun-ripened tomatoes, mozzarella, basil, olives, and smoked meat.',
    price: 35000,
    image: '/assets/menu/wrap-italian.webp',
  },
  {
    slug: 'roast-beef-wrap',
    name: 'Roast Beef Wrap',
    nameEn: 'Juicy Roast Beef Wrap',
    category: 'Wrap',
    description: 'Slice daging sapi panggang yang super juicy dengan selada, tomat, dan saus krim.',
    descriptionEn: 'Juicy roasted beef slices layered with crisp lettuce, tomatoes, and creamy sauce.',
    price: 60000,
    image: '/assets/menu/wrap-beef.webp',
  },
  {
    slug: 'cola',
    name: 'Cola',
    nameEn: 'Artisan Chilled Cola',
    category: 'Minuman',
    description: 'Minuman soda kola legendaris dengan sensasi dingin yang segar dan ringan.',
    descriptionEn: 'Classic chilled cola soda delivering crisp, refreshing refreshment.',
    price: 20000,
    image: '/assets/menu/cola.webp',
  },
  {
    slug: 'es-teh',
    name: 'Es Teh',
    nameEn: 'Signature Iced Tea',
    category: 'Minuman',
    description: 'Seduhan teh pilihan dengan rasa manis pas dan aroma yang bersih.',
    descriptionEn: 'Freshly brewed artisan tea with balanced sweetness and a clean fragrant aroma.',
    price: 15000,
    image: '/assets/menu/es-teh.webp',
  },
];

export const GALLERY_FILTERS = [
  { key: 'Food', labelId: 'Makanan', labelEn: 'Food' },
  { key: 'Interior', labelId: 'Interior', labelEn: 'Interior' },
  { key: 'Events', labelId: 'Acara', labelEn: 'Events' },
  { key: 'Staff', labelId: 'Staf & Dapur', labelEn: 'Staff & Kitchen' },
];

export const GALLERY_ITEMS = [
  {
    id: 'food-sandwich-platter',
    title: 'Sandwich platter dengan salad segar',
    titleEn: 'Sandwich platter with crisp garden salad',
    category: 'Food',
    image: '/assets/gallery/sandwich-platter.webp',
  },
  {
    id: 'food-wrap-board',
    title: 'Wrap panggang di atas papan kayu',
    titleEn: 'Artisan grilled wraps on rustic wooden board',
    category: 'Food',
    image: '/assets/gallery/wrap-board.webp',
  },
  {
    id: 'food-burger-closeup',
    title: 'Burger malam dengan saus rumah',
    titleEn: 'Signature evening burger with house sauce',
    category: 'Food',
    image: '/assets/gallery/burger-closeup.webp',
  },
  {
    id: 'food-taco-table',
    title: 'Taco meja panjang untuk berbagi',
    titleEn: 'Communal taco spread for sharing',
    category: 'Food',
    image: '/assets/gallery/taco-table.webp',
    moreCount: '10+',
  },
  {
    id: 'interior-main-dining',
    title: 'Ruang makan utama dengan cahaya hangat',
    titleEn: 'Main dining hall with warm atmospheric lighting',
    category: 'Interior',
    image: '/assets/gallery/interior-main-dining.webp',
  },
  {
    id: 'interior-bar-counter',
    title: 'Counter bar untuk tamu malam',
    titleEn: 'Intimate bar counter for evening guests',
    category: 'Interior',
    image: '/assets/gallery/interior-bar-counter.webp',
  },
  {
    id: 'interior-open-kitchen',
    title: 'Dapur terbuka dekat area servis',
    titleEn: 'Open concept kitchen near service gallery',
    category: 'Interior',
    image: '/assets/gallery/interior-open-kitchen.webp',
  },
  {
    id: 'interior-corner-table',
    title: 'Meja sudut untuk makan santai',
    titleEn: 'Cozy corner table for relaxed conversations',
    category: 'Interior',
    image: '/assets/gallery/interior-corner-table.webp',
    moreCount: '8+',
  },
  {
    id: 'events-shared-table',
    title: 'Meja panjang untuk acara keluarga',
    titleEn: 'Long family celebration banquet table',
    category: 'Events',
    image: '/assets/gallery/events-shared-table.webp',
  },
  {
    id: 'events-private-dinner',
    title: 'Private dinner dengan menu pilihan',
    titleEn: 'Private dinner with curated tasting menu',
    category: 'Events',
    image: '/assets/gallery/events-private-dinner.webp',
  },
  {
    id: 'events-catering-table',
    title: 'Catering table untuk perayaan kecil',
    titleEn: 'Catering setup for bespoke small gatherings',
    category: 'Events',
    image: '/assets/gallery/events-catering-table.webp',
  },
  {
    id: 'events-seasonal-menu',
    title: 'Seasonal tasting untuk tamu grup',
    titleEn: 'Seasonal tasting course for group guests',
    category: 'Events',
    image: '/assets/gallery/events-seasonal-menu.webp',
    moreCount: '12+',
  },
  {
    id: 'staff-head-chef',
    title: 'Head chef saat plating menu malam',
    titleEn: 'Head chef plating exquisite evening courses',
    category: 'Staff',
    image: '/assets/gallery/staff-head-chef.webp',
  },
  {
    id: 'staff-prep-station',
    title: 'Persiapan bahan segar di stasiun dapur',
    titleEn: 'Fresh ingredient preparation at kitchen station',
    category: 'Staff',
    image: '/assets/gallery/staff-prep-station.webp',
  },
  {
    id: 'staff-line-cook',
    title: 'Koki utama di garis pemanggangan',
    titleEn: 'Line cook managing the grill station',
    category: 'Staff',
    image: '/assets/gallery/staff-line-cook.webp',
  },
  {
    id: 'staff-service-team',
    title: 'Tim pelayanan siap menyambut Anda',
    titleEn: 'Hospitality team ready to welcome you',
    category: 'Staff',
    image: '/assets/gallery/staff-service-team.webp',
  },
];

export const FOOTER_LINKS = {
  ID: {
    'Tautan Cepat': [
      { label: 'Beranda', href: '/' },
      { label: 'Menu Lengkap', href: '/menu' },
      { label: 'Tentang Kami', href: '/tentang' },
      { label: 'Galeri Foto', href: '/galeri' },
      { label: 'Tim Kami', href: '/tim' },
      { label: 'Kontak & Reservasi', href: '/kontak' },
    ],
  },
  EN: {
    'Quick Links': [
      { label: 'Home', href: '/' },
      { label: 'Full Menu', href: '/menu' },
      { label: 'About Us', href: '/tentang' },
      { label: 'Photo Gallery', href: '/galeri' },
      { label: 'Our Team', href: '/tim' },
      { label: 'Contact & Booking', href: '/kontak' },
    ],
  },
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
