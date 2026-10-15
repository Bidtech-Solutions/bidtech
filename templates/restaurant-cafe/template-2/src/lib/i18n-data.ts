import {
  type Category,
  type MenuItem,
  type StaffMember,
  categories,
  menuItems,
  staffMembers,
} from "@/lib/restaurant-data";

export type Language = "id" | "en";

/* ==========================================================================
   STAFF LOCALIZATION
   ========================================================================== */
interface StaffTranslation {
  role: string;
  department: string;
  experience: string;
  badge: string;
  specialty: string;
  bio: string;
  quote: string;
}

const staffTranslations: Record<string, Record<Language, StaffTranslation>> = {
  "deny-pratama": {
    en: {
      role: "Founder & Executive Chef",
      department: "Kitchen Masters",
      experience: "14+ Years in Culinary Arts",
      badge: "Founder & Visionary",
      specialty: "Wood-Fired Fermentation & Charcoal Technique",
      bio: "Trained in Naples and Lyon, Chef Deny founded Deny Restaurant with a relentless obsession: stripping away formal pretenses while holding fast to uncompromising culinary rigor and fire cooking.",
      quote: "A great plate of food needs no pretension, just honest fire, true sourdough patience, and respect for who eats it.",
    },
    id: {
      role: "Pendiri & Koki Eksekutif",
      department: "Master Dapur",
      experience: "14+ Tahun di Seni Kuliner",
      badge: "Pendiri & Visioner",
      specialty: "Fermentasi Kayu Api & Teknik Arang",
      bio: "Dididik di Napoli dan Lyon, Chef Deny mendirikan Deny Restaurant dengan satu tekad kuat: meniadakan formalitas kaku tanpa mengurangi kedisiplinan teknik memasak dan olahan api.",
      quote: "Sepiring makanan lezat tidak butuh kepura-puraan, hanya api yang jujur, kesabaran adonan sourdough, dan rasa hormat kepada yang menyantapnya.",
    },
  },
  "marco-rossi": {
    en: {
      role: "Head Pizzaiolo & Dough Alchemist",
      department: "Kitchen Masters",
      experience: "11 Years Wood-Fired Pizza",
      badge: "Naples Certified",
      specialty: "48-Hour Cold Proofing & High-Heat Baking",
      bio: "Born in Caserta, Marco manages our 48-hour cold fermentation room and our 900°F refractory brick oven. He measures humidity, ambient heat, and flour hydration twice daily.",
      quote: "The pizza is alive. If you rush the fermentation by even three hours, the oven knows, and you taste the difference.",
    },
    id: {
      role: "Kepala Pizzaiolo & Ahli Adonan",
      department: "Master Dapur",
      experience: "11 Tahun Pizza Tungku Api",
      badge: "Tersertifikasi Napoli",
      specialty: "Fermentasi Dingin 48 Jam & Pemanggangan Suhu Tinggi",
      bio: "Lahir di Caserta, Marco mengelola ruang fermentasi dingin 48 jam dan oven bata 500°C kami. Ia mengukur kelembaban, panas sekitar, dan hidrasi tepung dua kali sehari.",
      quote: "Adonan pizza itu hidup. Jika fermentasi dipercepat bahkan hanya tiga jam, oven akan mengetahuinya dan Anda akan merasakan bedanya.",
    },
  },
  "sofia-bianchi": {
    en: {
      role: "Master Pasta Artisan",
      department: "Kitchen Masters",
      experience: "9 Years Traditional Sfloglina",
      badge: "Hand-Rolled Specialist",
      specialty: "30-Yolk Silk Ribbons & Braised Ragù",
      bio: "Sofia learned pasta rolling from her grandmother in Emilia-Romagna. She rolls and cuts every ribbon of tagliatelle and pappardelle by hand with traditional maple rolling pins.",
      quote: "A pasta machine cannot feel the elasticity of the egg yolk. Your palms and rolling pin must do the talking.",
    },
    id: {
      role: "Master Pengrajin Pasta",
      department: "Master Dapur",
      experience: "9 Tahun Sfoglina Tradisional",
      badge: "Spesialis Gilas Tangan",
      specialty: "Pasta Sutra 30 Kuning Telur & Ragù Rebusan Perlahan",
      bio: "Sofia belajar menggiling pasta dari neneknya di Emilia-Romagna. Ia menggiling dan memotong setiap helai tagliatelle dan pappardelle dengan tangan menggunakan penggilas kayu maple tradisional.",
      quote: "Mesin pasta tidak bisa merasakan keelastisan kuning telur. Telapak tangan dan kayu penggilas Anda yang harus berkomunikasi dengannya.",
    },
  },
  "david-chen": {
    en: {
      role: "Head Grillmaster & Burger Specialist",
      department: "Kitchen Masters",
      experience: "8 Years Craft Smash Griddles",
      badge: "Crust Master",
      specialty: "Lacy-Crust Smashes & Secret Relish Blends",
      bio: "David developed our bespoke cast-iron pressing technique that locks in juice while producing a lacy, crunchy caramelized edge on every single Angus smash patty.",
      quote: "The magic is in the sizzle and the millisecond contact with a screaming 500-degree surface.",
    },
    id: {
      role: "Kepala Pemanggang & Spesialis Burger",
      department: "Master Dapur",
      experience: "8 Tahun Plat Besi Smash",
      badge: "Ahli Kerak Renyah",
      specialty: "Smash Kerak Renda & Saus Relish Rahasia",
      bio: "David menyempurnakan teknik penekanan wajan besi cor khusus yang mengunci sari daging sekaligus menghasilkan pinggiran berenda yang renyah terkaramelisasi pada setiap daging smash Angus.",
      quote: "Keajaiban ada pada desisan dan kontak milidetik dengan permukaan wajan bersuhu 260 derajat.",
    },
  },
  "clara-laurent": {
    en: {
      role: "Head Pastry & Dolci Chef",
      department: "Bakery & Dolci",
      experience: "10 Years Artisan Pastry",
      badge: "Dolci Master",
      specialty: "Espresso Tiramisu, Cannoli & Gelato",
      bio: "Former pastry lead at Michelin-awarded bistros in Paris and Milan, Clara crafts our single-origin tiramisu, slow-churned gelato, and fresh-filled cannoli every morning.",
      quote: "Dessert is the final memory of a meal. It should be comforting, light, and leave a sweet smile.",
    },
    id: {
      role: "Kepala Koki Pastry & Dolci",
      department: "Roti & Dolci",
      experience: "10 Tahun Pastry Artisan",
      badge: "Master Dolci",
      specialty: "Tiramisu Espresso, Cannoli & Gelato Artisan",
      bio: "Mantan pemimpin pastry di bistro berbintang di Paris dan Milan, Clara meracik tiramisu single-origin, gelato buatan tangan, dan cannoli isi segar setiap pagi.",
      quote: "Pencuci mulut adalah kenangan penutup dari sebuah santapan. Harus menenangkan, ringan, dan meninggalkan senyuman manis.",
    },
  },
  "elena-vance": {
    en: {
      role: "Beverage Director & Mixologist",
      department: "Bar & Craft",
      experience: "7 Years Botanical Craft",
      badge: "Craft Alchemist",
      specialty: "Botanical Fermentation & Smoked Spritzers",
      bio: "Elena heads our botanical bar, pairing wood-fired pizza and hearty pasta with zero-proof shrubs, single-origin nitro cold brews, and smoked rosemary mocktails.",
      quote: "A drink should elevate the dish, cleansing the palate and awakening fresh flavor notes.",
    },
    id: {
      role: "Direktur Minuman & Mixologist",
      department: "Bar & Racikan",
      experience: "7 Tahun Racikan Botani",
      badge: "Alkemis Racikan",
      specialty: "Fermentasi Botani & Spritzer Rosemary Asap",
      bio: "Elena memimpin bar botani kami, memadukan pizza tungku api dan pasta kaya rasa dengan shrub bebas alkohol, nitro cold brew single-origin, dan mocktail rosemary asap.",
      quote: "Minuman harus melengkapi hidangan, membersihkan lidah, dan membangkitkan aroma rasa baru.",
    },
  },
  "julian-meyer": {
    en: {
      role: "General Manager & Hospitality Lead",
      department: "Hospitality",
      experience: "12 Years Guest Experience",
      badge: "Warm Host",
      specialty: "Fast-Casual Flow & Warm Community Hospitality",
      bio: "Julian orchestrates the dining room with seamless warmth. He ensures every guest feels at home, whether grabbing a 12-minute casual lunch or spending the evening with family.",
      quote: "Hospitality is not about rules; it is about remembering people, smiling, and making every plate feel like home.",
    },
    id: {
      role: "Manajer Umum & Pemandu Tamu",
      department: "Keramahan Tamu",
      experience: "12 Tahun Layanan Tamu",
      badge: "Tuan Rumah Hangat",
      specialty: "Alur Santap Cepat & Keramahan Hangat Komunitas",
      bio: "Julian memimpin ruang makan dengan kehangatan tulus. Ia memastikan setiap tamu merasa disambut seperti di rumah, baik saat makan siang cepat 15 menit maupun makan malam keluarga.",
      quote: "Keramahan bukanlah soal aturan kaku; ini tentang mengingat tamu, tersenyum, dan membuat setiap piring terasa seperti rumah.",
    },
  },
  "aria-santos": {
    en: {
      role: "Head of Farm Partnerships & Sourcing",
      department: "Hospitality",
      experience: "8 Years Sustainable Agriculture",
      badge: "Farm Direct",
      specialty: "Organic Sourcing & Zero-Waste Logistics",
      bio: "Aria visits our dairy farmers, flour millers, and vegetable growers weekly. She ensures 100% trace-to-source integrity across every ingredient that enters our kitchen.",
      quote: "Great cooking starts six weeks before the pan, out in the soil with our local farmers.",
    },
    id: {
      role: "Kepala Kemitraan Petani & Pasokan",
      department: "Keramahan Tamu",
      experience: "8 Tahun Pertanian Berkelanjutan",
      badge: "Langsung dari Kebun",
      specialty: "Pasokan Bahan Organik & Logistik Tanpa Sisa",
      bio: "Aria mengunjungi peternak sapi perah, penggiling gandum, dan pekebun lokal setiap minggu untuk memastikan integritas asal 100% bahan dapur kami.",
      quote: "Masakan istimewa dimulai enam minggu sebelum wajan menyala, bermula dari tanah subur bersama para petani lokal kami.",
    },
  },
};

export function getLocalizedStaff(member: StaffMember, lang: Language): StaffMember {
  const trans = staffTranslations[member.id]?.[lang];
  if (!trans) return member;
  return {
    ...member,
    role: trans.role,
    department: trans.department,
    experience: trans.experience,
    badge: trans.badge,
    specialty: trans.specialty,
    bio: trans.bio,
    quote: trans.quote,
  };
}

/* ==========================================================================
   CATEGORY LOCALIZATION
   ========================================================================== */
interface CategoryTranslation {
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  itemsCount: string;
  tag: string;
}

const categoryTranslations: Record<string, Record<Language, CategoryTranslation>> = {
  pizza: {
    en: {
      title: "Wood-Fired Pizza",
      shortTitle: "Pizza",
      subtitle: "48-Hour Proofed Sourdough",
      description: "San Marzano D.O.P. tomatoes, fresh fior di latte, and blistered crust charred at 900°F.",
      itemsCount: "6 Creations",
      tag: "Wood Fired",
    },
    id: {
      title: "Pizza Tungku Api",
      shortTitle: "Pizza",
      subtitle: "Fermentasi Sourdough 48 Jam",
      description: "Tomat San Marzano D.O.P., fior di latte segar, dan kulit bergelembung renyah dipanggang pada suhu 500°C.",
      itemsCount: "6 Pilihan",
      tag: "Tungku Kayu",
    },
  },
  burgers: {
    en: {
      title: "Craft Smash Burgers",
      shortTitle: "Burgers",
      subtitle: "100% Grass-Fed Angus",
      description: "Double lacy-crust patties, aged American cheddar, and caramelized shallots on warm brioche.",
      itemsCount: "6 Varieties",
      tag: "Best Seller",
    },
    id: {
      title: "Burger Smash Pilihan",
      shortTitle: "Burger",
      subtitle: "100% Daging Sapi Angus",
      description: "Patty ganda berenda renyah, lelehan keju cheddar matang, dan bawang karamel di atas roti brioche hangat.",
      itemsCount: "6 Varian",
      tag: "Paling Laris",
    },
  },
  pasta: {
    en: {
      title: "Artisan Hand-Rolled Pasta",
      shortTitle: "Pasta",
      subtitle: "Extruded & Cut Fresh Daily",
      description: "Silky rich egg dough ribbons, 12-hour braised Bolognese ragù, and freshly grated Parmigiano.",
      itemsCount: "6 Plates",
      tag: "Handmade",
    },
    id: {
      title: "Pasta Gulung Tangan Artisan",
      shortTitle: "Pasta",
      subtitle: "Digilas & Dipotong Segar Tiap Hari",
      description: "Pita adonan telur lembut kaya rasa, saus Bolognese yang dimasak perlahan 12 jam, dan parutan Parmigiano segar.",
      itemsCount: "6 Menu",
      tag: "Gilas Tangan",
    },
  },
  starters: {
    en: {
      title: "Starters & Shared Plates",
      shortTitle: "Starters",
      subtitle: "Crispy Bites & Dips",
      description: "Whipped ricotta crostini, blistered shishito peppers, and truffle parmesan polenta fries.",
      itemsCount: "5 Appetizers",
      tag: "For the Table",
    },
    id: {
      title: "Hidangan Pembuka & Piring Berbagi",
      shortTitle: "Pembuka",
      subtitle: "Gigitan Renyah & Saus Celup",
      description: "Crostini ricotta kocok lembut, cabai shishito wajan bakar, dan kentang polenta parmesan aroma truffle.",
      itemsCount: "5 Menu Pembuka",
      tag: "Untuk Meja Berbagi",
    },
  },
  desserts: {
    en: {
      title: "Dolci & Sweet Treats",
      shortTitle: "Desserts",
      subtitle: "Crafted In-House Daily",
      description: "Classic espresso-dipped savoiardi tiramisu, crisp pistachio cannoli, and Madagascar vanilla gelato.",
      itemsCount: "5 Specialties",
      tag: "Sweet Endings",
    },
    id: {
      title: "Dolci & Makanan Penutup",
      shortTitle: "Dolci",
      subtitle: "Dibuat Segar di Dapur Tiap Hari",
      description: "Tiramisu klasik biskuit savoiardi celup espresso, cannoli renyah pistachio, dan gelato vanila Madagaskar.",
      itemsCount: "5 Menu Manis",
      tag: "Penutup Manis",
    },
  },
  drinks: {
    en: {
      title: "Craft Drinks & Elixirs",
      shortTitle: "Drinks",
      subtitle: "Single-Origin & Botanicals",
      description: "Single-origin nitro cold brew, herbal botanical spritzers, and house cold-pressed elixirs.",
      itemsCount: "6 Sips",
      tag: "Botanical",
    },
    id: {
      title: "Minuman Racikan & Eliksir",
      shortTitle: "Minuman",
      subtitle: "Kopi Single-Origin & Botani",
      description: "Mocktail botani herbal, soda spritzer rosemary bakar, dan seduhan kopi dingin nitro 18 jam.",
      itemsCount: "6 Menu Minuman",
      tag: "Sari Botani",
    },
  },
};

export function getLocalizedCategory(cat: Category, lang: Language): Category {
  const trans = categoryTranslations[cat.id]?.[lang];
  if (!trans) return cat;
  return {
    ...cat,
    title: trans.title,
    shortTitle: trans.shortTitle,
    subtitle: trans.subtitle,
    description: trans.description,
    itemsCount: trans.itemsCount,
    tag: trans.tag,
  };
}

/* ==========================================================================
   MENU ITEM LOCALIZATION
   ========================================================================== */
interface MenuItemTranslation {
  description: string;
  story?: string;
  chefNote?: string;
  portion?: string;
  prepTime?: string;
  ingredients?: string[];
  allergens?: string[];
}

const menuItemTranslations: Record<string, Record<Language, MenuItemTranslation>> = {
  "margherita-di-bufala": {
    en: {
      description: "San Marzano D.O.P. tomato, buffalo mozzarella, fresh sweet basil, and Sicilian extra-virgin olive oil on 48-hour cold-fermented sourdough.",
      story: "Our foundational recipe dating back to 2013. We use live mother yeast cultivated in-house.",
      chefNote: "Cooked at 900°F for precisely 90 seconds. The leopard spotting along the crust gives it its distinctive smoky aroma.",
      portion: "12-inch pizza (6 slices)",
      prepTime: "90 sec bake",
      ingredients: ["48-Hour Cold-Fermented Sourdough","San Marzano D.O.P. Tomatoes","Campania Buffalo Mozzarella","Fresh Genovese Basil","Cold-Pressed Extra Virgin Olive Oil","Maldon Sea Salt Flakes"],
      allergens: ["Gluten (Wheat)","Dairy (Milk)"],
    },
    id: {
      description: "Tomat San Marzano D.O.P., keju mozzarella kerbau Campania segar, daun kemangi manis, dan minyak zaitun murni Sisilia di atas adonan sourdough fermentasi dingin 48 jam.",
      story: "Resep dasar kami sejak tahun 2013 yang menggunakan biang ragi alami (mother yeast) yang dirawat sendiri di dapur kami.",
      chefNote: "Dipanggang pada suhu 500°C tepat selama 90 detik. Bercak macan khas di pinggirannya memberikan aroma panggangan kayu bakar yang menggugah selera.",
      portion: "Ukuran 30 cm (6 potong)",
      prepTime: "Panggang 90 detik",
      ingredients: ["Sourdough Fermentasi Dingin 48 Jam","Tomat San Marzano D.O.P.","Mozzarella Kerbau Campania","Kemangi Genovese Segar","Minyak Zaitun Ekstra Virgin Dingin","Garam Laut Maldon"],
      allergens: ["Gluten (Gandum)","Produk Susu (Susu)"],
    },
  },
  "truffle-pepperoni": {
    en: {
      description: "Artisan Calabrian pepperoni, Italian white truffle oil, smoked mozzarella, and infused hot chili blossom honey.",
      story: "Created by chef Deny during late-night kitchen tests, now one of our most ordered pies.",
      chefNote: "The marriage of hot spicy pepperoni and smooth sweet chili honey creates a balanced savory bite.",
      portion: "12-inch pizza (6 slices)",
      prepTime: "2 min bake",
      ingredients: ["Artisan Calabrian Pepperoni","White Truffle Essence","Naturally Smoked Mozzarella","Crushed San Marzano Sauce","Wildflower Hot Chili Honey","Aged Parmigiano Shavings"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Pepperoni pedas artisan Calabria, minyak truffle putih Italia, keju smoked mozzarella, dan siraman madu cabai mekar alami.",
      story: "Kreasi koki Deny saat eksperimen dapur larut malam, kini menjadi salah satu pizza paling banyak dipesan.",
      chefNote: "Perpaduan pepperoni pedas gurih dan madu cabai manis menciptakan gigitan lezat yang seimbang sempurna.",
      portion: "Ukuran 30 cm (6 potong)",
      prepTime: "Panggang 2 menit",
      ingredients: ["Pepperoni Artisan Calabria","Ekstrak Truffle Putih","Mozzarella Asap Alami","Saus Tomat San Marzano Tumbuk","Madu Bunga Liar Cabai Pedas","Serutan Keju Parmigiano Tua"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "diavola": {
    en: {
      description: "Spicy Spianata Calabrese salami, wood-blistered chili peppers, fresh mozzarella, and house-made hot sauce drizzle.",
      story: "A fiery tribute to southern Italian heat, balanced with the rich sweet fat of cured pork.",
      chefNote: "We layer the hot salami beneath a light veil of cheese to keep the edges crisp without burning.",
      portion: "12-inch pizza (6 slices)",
      prepTime: "2 min bake",
      ingredients: ["Spicy Spianata Calabrese","Wood-Blistered Hot Chili","Whole Milk Mozzarella","San Marzano D.O.P. Tomatoes","Deny Hot Chili Infusion"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Salami pedas Spianata Calabrese, cabai panggang wajan, mozzarella segar, dan saus cabai pedas Deny.",
      story: "Dibuat khusus untuk pecinta rasa pedas membakar yang berpadu dengan gurihnya keju leleh dan kerak renyah.",
      chefNote: "Cabai diiris tipis agar minyak atsiri pedasnya meresap ke dalam keju saat menyentuh api oven.",
      portion: "Ukuran 30 cm (6 potong)",
      prepTime: "Panggang 2 menit",
      ingredients: ["Salami Spianata Calabrese Pedas","Cabai Panggang Wajan","Mozzarella Susu Sapi Segar","Saus Cabai Pedas Rahasia Deny","Daun Oregano Liar"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "funghi-bianca": {
    en: {
      description: "Wild porcini and cremini mushrooms, melted Taleggio, roasted garlic confit, fresh thyme, and cold-pressed olive oil.",
      story: "A white pizza celebrating earthy foraged mushrooms without the acidity of tomatoes.",
      chefNote: "Mushrooms are flash-sautéed in butter with garlic and thyme before hitting the pizza peel.",
      portion: "12-inch pizza (6 slices)",
      prepTime: "2 min bake",
      ingredients: ["Wild Porcini Mushrooms","Cremini Mushrooms","Taleggio DOP Cheese","Roasted Garlic Confit","Fresh Garden Thyme"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Campuran jamur porcini liar, krim keju taleggio, bawang putih panggang, timi segar, dan minyak zaitun wangi tanpa saus tomat.",
      story: "Pizza putih tanpa tomat yang menonjolkan aroma tanah dan gurih alami jamur hutan pilihan.",
      chefNote: "Jamur ditumis cepat dengan mentega sebelum diletakkan di atas adonan agar kelembapannya terkunci.",
      portion: "Ukuran 30 cm (6 potong)",
      prepTime: "Panggang 2 menit",
      ingredients: ["Jamur Porcini & Cremini Liar","Keju Taleggio Lembut","Bawang Putih Panggang Manis","Timi Kebun Segar","Minyak Zaitun Ekstra Virgin"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "quattro-formaggi": {
    en: {
      description: "Gorgonzola dolce, mountain Fontina, fresh Fior di Latte, and 24-month Parmigiano with hot wildflower honey drizzle.",
      story: "A harmonious dance of salty, nutty, creamy, and sweet-heat notes.",
      chefNote: "We lightly dock the center dough to allow the heavy cheese blend to melt evenly.",
      portion: "12-inch pizza (6 slices)",
      prepTime: "90 sec bake",
      ingredients: ["Gorgonzola Dolce","Mountain Fontina","Fresh Fior di Latte","Parmigiano Reggiano 24 Month","Wildflower Hot Chili Honey"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Kombinasi empat keju: Gorgonzola dolce, Fontina pegunungan, Fior di Latte segar, dan Parmigiano Reggiano 24 bulan dengan siraman madu cabai pedas manis.",
      story: "Keseimbangan sempurna antara gurihnya keju pegunungan dan manis pedasnya madu artisan.",
      chefNote: "Ditusuk garpu sebelum masuk oven agar keju meleleh merata tanpa membentuk gelembung udara berlebih.",
      portion: "Ukuran 30 cm (6 potong)",
      prepTime: "Panggang 90 detik",
      ingredients: ["Gorgonzola Dolce","Keju Fontina Pegunungan","Fior di Latte Segar","Parmigiano Reggiano 24 Bulan","Madu Bunga Liar Pedas"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "prosciutto-rucola": {
    en: {
      description: "24-month aged Prosciutto di Parma, wild baby arugula, shaved Parmigiano-Reggiano, and aged Modena balsamic drizzle.",
      story: "The prosciutto is laid delicate and cold onto the blistering-hot pie just after it leaves the wood oven.",
      chefNote: "The residual crust heat softens the prosciutto fat into silky perfection without cooking the cured meat.",
      portion: "12-inch pizza (6 slices)",
      prepTime: "2 min bake",
      ingredients: ["24-Month Prosciutto di Parma","Fresh Baby Arugula","Shaved Parmigiano Reggiano","Aged Modena Balsamic Glaze","Buffalo Mozzarella Base"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Prosciutto di Parma matang 24 bulan, daun rucola liar segar, serutan Parmigiano Reggiano, dan siraman glasir balsamik Modena matang.",
      story: "Prosciutto diiris super tipis dan diletakkan tepat setelah pizza keluar dari oven agar lemaknya meleleh lembut dari sisa panas.",
      chefNote: "Rucola segar memberikan rasa segar sedikit pahit yang mengimbangi gurihnya daging ham matang.",
      portion: "Ukuran 30 cm (6 potong)",
      prepTime: "Panggang 2 menit",
      ingredients: ["Prosciutto di Parma 24 Bulan","Daun Rucola Liar","Serutan Parmigiano Reggiano","Glasir Balsamik Modena Matang","Fior di Latte"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "double-smash": {
    en: {
      description: "Two 3.5oz grass-fed Angus patties smashed thin with lacy crisp edges, double American cheddar, secret sauce, on toasted brioche.",
      story: "Our foundational burger born from countless tests to achieve the crispiest lacy skirt.",
      chefNote: "Smashed with 10lbs of pressure within the first 10 seconds of hitting the screaming-hot steel.",
      portion: "1 Double Burger with Dipping Sauce",
      prepTime: "6 min",
      ingredients: ["100% Grass-Fed Angus Beef","Double Aged Cheddar","Deny Secret Sauce","Toasted Butter Brioche","House Bread & Butter Pickles"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Dua patty daging sapi Angus 100g ditekan tipis hingga berenda renyah di tepian, keju cheddar tua lumer ganda, saus rahasia Deny, di atas roti brioche mentega wangi.",
      story: "Menu burger ikonik kami yang lahir dari ratusan kali riset untuk menghasilkan pinggiran berenda paling garing dan juicy.",
      chefNote: "Ditekan dengan plat besi pemberat 5 kg pada detik pertama kontak dengan wajan super panas 260°C.",
      portion: "1 Burger Jumbo dengan Saus Celup",
      prepTime: "6 menit",
      ingredients: ["Daging Sapi Angus Pilihan Peternak","Keju Cheddar Tua Lumer","Saus Rahasia Deny","Roti Brioche Mentega","Acar Timun Buatan Dapur"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "truffle-smash-deluxe": {
    en: {
      description: "Double Angus patties, buttered caramelized onion & mushroom duxelles, melted Swiss gruyère, and black truffle aioli.",
      story: "An opulent twist on the classic smash burger with intense umami notes.",
      chefNote: "Steamed under a metal dome for 20 seconds to melt the gruyère into every crevice.",
      portion: "1 Burger Jumbo",
      prepTime: "7 min",
      ingredients: ["Double Angus Smash Patties","Buttered Mushroom Duxelles","Caramelized Sweet Onions","Melted Swiss Gruyère","Black Truffle Aioli"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Dua patty daging sapi Angus, duxelles jamur bawang karamel tumis mentega Prancis, lelehan keju Swiss Gruyère, dan aioli truffle hitam aromatik.",
      story: "Kombinasi mewah aroma truffle dan manisnya bawang karamel di atas daging panggang renyah.",
      chefNote: "Keju Gruyère dilelehkan di bawah tudung uap agar menutupi seluruh permukaan daging secara merata.",
      portion: "1 Burger Jumbo Premium",
      prepTime: "7 menit",
      ingredients: ["Patty Sapi Angus Ganda","Tumisan Jamur Duxelles & Bawang Karamel","Keju Gruyère Swiss","Aioli Truffle Hitam","Roti Brioche Panggang"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "mushroom-bacon": {
    en: {
      description: "Angus smash patty, pan-roasted wild porcini, house-cured thick-cut bacon, smoked gouda, and roasted garlic aioli.",
      story: "An ode to campfire cooking: deep wood smoke, earthy forest fungi, and rich melting fat.",
      chefNote: "The thick-cut bacon is slow-smoked over applewood before a hard sear on the flat-top.",
      portion: "1 Specialty Burger",
      prepTime: "7 min",
      ingredients: ["Grass-Fed Angus Beef Patty","Applewood Thick-Cut Bacon","Pan-Seared Porcini Mushrooms","Smoked Farmhouse Gouda","Roasted Garlic Confit Aioli"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Patty sapi Angus tebal, jamur tumis mentega gurih, potongan bacon renyah resep asap dapur, keju gouda asap, dan saus aioli bawang putih.",
      story: "Perpaduan rasa asap kayu dan jamur liar yang memberikan kenyamanan maksimal di setiap gigitan.",
      chefNote: "Bacon dipanggang perlahan dengan suhu rendah agar menghasilkan kerenyahan maksimal tanpa rasa pahit.",
      portion: "1 Porsi Burger Berisi",
      prepTime: "7 menit",
      ingredients: ["Patty Sapi Angus","Bacon Asap Renyah","Jamur Hutan Tumis Mentega","Keju Gouda Asap","Aioli Bawang Putih Panggang"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "hot-honey-smash": {
    en: {
      description: "Double Angus patties, griddled pickled jalapeños, melted pepper jack, and a generous cascade of warm chili-infused honey.",
      story: "Born from our kitchen team's late-night burger competitions, perfectly balancing fiery spice and honey sweetness.",
      chefNote: "The hot honey is warmed gently so it sinks into the crevices of the brioche crown.",
      portion: "1 Spicy-Sweet Burger",
      prepTime: "6 min",
      ingredients: ["Double Angus Smashed Patties","Quick-Pickled Fresh Jalapeños","Melted Pepper Jack Cheese","Warm Chili-Infused Wild Honey","Buttered Potato Bun"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Dua patty Angus renyah berenda, irisan jalapeño segar tumis kilat, keju pepper jack pedas, dan siraman madu cabai hangat buatan koki.",
      story: "Keseimbangan menggoda antara pedasnya cabai jalapeño dan manis gurih madu berbumbu.",
      chefNote: "Madu cabai dituang hangat sesaat sebelum burger ditutup agar sausnya meresap ke dalam roti brioche lembut.",
      portion: "1 Burger Pedas Manis",
      prepTime: "6 menit",
      ingredients: ["Patty Daging Sapi Angus","Cabai Jalapeño Iris Segar","Keju Pepper Jack Lumer","Siraman Madu Cabai Hangat","Roti Brioche Lembut"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "garden-smash": {
    en: {
      description: "Crispy house-made mushroom & black bean patty, sliced avocado, provolone, slow-roasted tomato, and basil green goddess spread.",
      story: "A plant-forward burger that refuses to sacrifice bold sear, crunch, or savory indulgence.",
      chefNote: "Bound with walnuts and roasted grains for a satisfying bite that never turns mushy on the griddle.",
      portion: "1 Wholesome Burger",
      prepTime: "8 min",
      ingredients: ["House Mushroom-Grain Patty","Hass Avocado Slices","Smoked Provolone","Slow-Roasted Roma Tomato","Tarragon Green Goddess Aioli"],
      allergens: ["Gluten","Dairy","Tree Nuts (Walnuts)"],
    },
    id: {
      description: "Patty jamur portobello & biji-bijian panggang renyah, alpukat mentega segar, keju provolone lembut, tomat panggang, dan saus herba hijau wangi.",
      story: "Pilihan vegetarian yang kaya rasa dan memuaskan tanpa mengorbankan kenikmatan tekstur burger smash sejati.",
      chefNote: "Patty dipadatkan dengan kacang kenari dan biji-bijian panggang untuk tekstur nabati padat alami.",
      portion: "1 Burger Sayur Sehat",
      prepTime: "8 menit",
      ingredients: ["Patty Jamur Portobello & Biji-bijian","Alpukat Mentega Segar","Keju Provolone","Tomat Panggang Oven","Saus Herba Hijau Kemangi"],
      allergens: ["Gluten","Produk Susu","Kacang Pohon (Walnut)"],
    },
  },
  "classic-cheeseburger": {
    en: {
      description: "Single thick 6oz Angus patty seared to medium, aged sharp cheddar, crisp butter lettuce, beefsteak tomato, and house burger spread.",
      story: "A reverent celebration of the mid-century roadside diner classic made with prime-grade butchery.",
      chefNote: "Left to rest for two minutes post-sear so every ounce of natural beef jus stays locked in the patty.",
      portion: "1 Classic Burger with Fries",
      prepTime: "6 min",
      ingredients: ["Prime 6oz Ground Chuck Patty","Sharp Wisconsin Cheddar","Crisp Butterhead Lettuce","Vine-Ripened Beefsteak Tomato","House Mustard-Relish Aioli"],
      allergens: ["Gluten","Dairy","Eggs","Mustard"],
    },
    id: {
      description: "Patty sapi Angus tunggal 180g dipanggang juicy, keju cheddar klasik Amerika, selada renyah segar, irisan tomat matang, bawang bombay, dan mustard Dijon.",
      story: "Penghormatan terhadap cita rasa cheeseburger asli era 1950-an dengan standar bahan kuliner modern.",
      chefNote: "Daging didiamkan sejenak setelah dipanggang agar sari kaldu daging tetap mengalir saat digigit pertama kali.",
      portion: "1 Burger Klasik dengan Kentang",
      prepTime: "6 menit",
      ingredients: ["Patty Sapi Angus 180g","Keju Cheddar Leleh","Selada Romaine Segar","Tomat Matang & Bawang Bombay","Mustard Dijon & Mayones"],
      allergens: ["Gluten","Produk Susu","Telur","Mustard"],
    },
  },
  "tagliatelle-al-tartufo": {
    en: {
      description: "Hand-rolled daily egg ribbons, cultured French butter, 24-month Parmigiano Reggiano, and freshly shaved black truffle.",
      story: "A classic northern Italian celebration of hand-rolled pasta and luxurious black truffles.",
      chefNote: "Cooked for exactly 90 seconds and emulsified vigorously with pasta water and butter off the heat.",
      portion: "1 plate (approx 180g pasta)",
      prepTime: "5 min",
      ingredients: ["Hand-Rolled Egg Tagliatelle","French Cultured Butter","24-Month Parmigiano Reggiano","Fresh Shaved Black Truffle","Maldon Sea Salt Flakes"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Pasta telur tagliatelle gulung tangan segar, mentega Prancis berbusa, parutan keju Parmigiano 24 bulan, dan irisan truffle hitam segar.",
      story: "Tradisi kuliner Emilia-Romagna di mana pasta telur dan truffle menjadi bintang utama piring saji.",
      chefNote: "Pasta hanya direbus 90 detik dan langsung diaduk dengan air rebusan berkanji untuk membentuk emulsi saus yang mengkilap.",
      portion: "1 Piring Pasta (sekitar 180g)",
      prepTime: "5 menit",
      ingredients: ["Pasta Telur Tagliatelle Gilas Tangan","Mentega Fermentasi Prancis","Parmigiano Reggiano 24 Bulan","Irisan Truffle Hitam Segar","Garam Laut Maldon"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "tagliatelle-bolognese": {
    en: {
      description: "Ribbons of daily hand-rolled egg pasta, 12-hour braised beef shank and veal ragù, San Marzano tomatoes, and aged Pecorino Romano.",
      story: "The quintessential comfort dish of Bologna, simmered patiently over half a day with mirepoix, wine, and marrow.",
      chefNote: "We never rinse fresh pasta; its starchy surface clings lovingly to the unctuous slow-simmered meat sauce.",
      portion: "1 Full Pasta Plate",
      prepTime: "6 min",
      ingredients: ["Handmade 30-Yolk Egg Pasta","12-Hour Braised Beef Shank","San Marzano Plum Tomatoes","Aged Pecorino Romano DOP","Fresh Rosemary & Bay Leaf"],
      allergens: ["Gluten","Dairy","Eggs","Celery"],
    },
    id: {
      description: "Pasta pita lebar tagliatelle buatan tangan, saus ragù daging sapi dan anak sapi yang direbus perlahan 12 jam dengan anggur merah, tomat San Marzano, dan keju Pecorino parut.",
      story: "Puncak kehangatan masakan pedesaan Bologna, dimasak dengan kesabaran setengah hari bersama sayuran aromatik dan sumsum sapi.",
      chefNote: "Dimasak dengan api lilin kecil hingga serat daging hancur lembut menyatu alami menjadi saus kental yang pekat.",
      portion: "1 Piring Pasta Porsi Penuh",
      prepTime: "6 menit",
      ingredients: ["Pasta Tagliatelle Telur Segar","Ragù Sapi Rebus Perlahan 12 Jam","Tomat San Marzano D.O.P.","Minyak Zaitun Ekstra Virgin","Keju Pecorino Romano Parut"],
      allergens: ["Gluten","Produk Susu","Telur","Seledri"],
    },
  },
  "cacio-e-pepe": {
    en: {
      description: "Chewy square-cut tonnarelli pasta, emulsified aged Pecorino Romano D.O.P., and coarse toasted Tellicherry black pepper.",
      story: "Rome's most famous three-ingredient masterpiece that requires obsessive technique to prevent the cheese from curdling.",
      chefNote: "Pepper corns are toasted whole in dry pans before a rough pestle smash to release volatile aromatic oils.",
      portion: "1 Traditional Pasta Bowl",
      prepTime: "5 min",
      ingredients: ["Fresh Square-Cut Tonnarelli","Pecorino Romano DOP Cheese","Toasted Tellicherry Black Pepper","Starchy Pasta Emulsion Water"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Pasta tonnarelli kenyal khas Roma, emulsi saus keju Pecorino Romano D.O.P. murni, dan lada hitam Tellicherry sangrai tumbuk kasar.",
      story: "Tiga bahan sederhana yang membutuhkan keterampilan tingkat tinggi untuk menghasilkan saus krim kental tanpa setetes pun krim instan.",
      chefNote: "Lada hitam disangrai kering di wajan terlebih dahulu untuk melepaskan minyak aromatik dan rasa pedas hangat yang elegan.",
      portion: "1 Piring Pasta Tradisional",
      prepTime: "5 menit",
      ingredients: ["Pasta Tonnarelli Telur Segar","Keju Pecorino Romano D.O.P.","Lada Hitam Tellicherry Sangrai","Air Rebusan Pasta Berkanji"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "amatriciana": {
    en: {
      description: "Ridged rigatoni pasta, crisp-rendered cured guanciale pork cheek, sweet San Marzano sauce, fiery peperoncino, and Pecorino.",
      story: "Born in the mountain town of Amatrice, this sauce delivers an intoxicating interplay of rich rendered pork fat and tangy tomatoes.",
      chefNote: "The guanciale is rendered slowly until amber-crisp; its rendered fat forms the flavor base of the tomato sauce.",
      portion: "1 Hearty Pasta Bowl",
      prepTime: "6 min",
      ingredients: ["Bronze-Die Cut Rigatoni","Cured Artisanal Guanciale","Crushed San Marzano Sauce","Calabrian Dried Peperoncino","Shaved Pecorino Romano"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Pasta rigatoni berongga saus tomat manis San Marzano, guanciale pipi sapi/unggas asap renyah khas Amatrice, cabai peperoncino, dan taburan keju Pecorino.",
      story: "Resep klasik legendaris wilayah Lazio dengan cita rasa gurih lemak renyah yang berpadu dengan keasaman tomat segar.",
      chefNote: "Lemak dari guanciale digunakan sebagai dasar menumis saus tomat sehingga memberikan aroma asap khas yang kaya rasa.",
      portion: "1 Piring Pasta Kenyang",
      prepTime: "6 menit",
      ingredients: ["Pasta Rigatoni Kenyal","Guanciale Asap Renyah","Saus Tomat San Marzano","Cabai Peperoncino","Pecorino Romano Parut"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "ragu-di-funghi": {
    en: {
      description: "Broad pappardelle pasta ribbons, slow-braised wild porcini, chanterelles, and cremini with white wine, herbs, and butter.",
      story: "A rustic forest ragù packed with earth, pine, and rich vegetable stock, satisfying even the heartiest carnivore.",
      chefNote: "Dried porcini soaking liquor is strained and reduced to give the sauce an almost meat-like depth of umami.",
      portion: "1 Woodland Pasta Bowl",
      prepTime: "6 min",
      ingredients: ["Hand-Cut Wide Pappardelle","Wild Foraged Porcini & Chanterelle","Dry Italian White Wine","French Cultured Butter","Aged Parmigiano Reggiano"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Pita pasta pappardelle lebar dengan ragù jamur porcini liar, jamur chanterelle, dan cremini yang dimasak dengan anggur putih, mentega, dan daun herba.",
      story: "Sajian pasta nabati penuh kehangatan musim gugur dengan aroma tanah hutan yang wangi dan tekstur kenyal memuaskan.",
      chefNote: "Kaldu jamur kering disaring dan direbus kembali untuk memberikan dasar rasa saus yang sangat pekat dan gurih alami.",
      portion: "1 Piring Pasta Sayur Mewah",
      prepTime: "6 menit",
      ingredients: ["Pasta Pappardelle Gilas Tangan","Jamur Porcini & Chanterelle Liar","Mentega Fermentasi & Anggur Putih","Bawang Putih & Peterseli Segar","Parmigiano Reggiano"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "linguine-vongole": {
    en: {
      description: "Slender linguine strands, sweet live clams, garlic confit in extra-virgin olive oil, white wine, crushed chili, and parsley.",
      story: "The iconic coastal classic of the Gulf of Naples, capturing the pure briny sweetness of the Mediterranean.",
      chefNote: "Clams steam open under a lid; their extracted liquor is vigorously emulsified with olive oil and pasta starch.",
      portion: "1 Seafood Pasta Plate",
      prepTime: "7 min",
      ingredients: ["Artisanal Bronze Linguine","Fresh Sweet Manila Clams","Cold-Pressed Olive Oil","Dry Pinot Grigio Reduction","Flat-Leaf Italian Parsley"],
      allergens: ["Gluten","Molluscs / Shellfish"],
    },
    id: {
      description: "Pasta linguine halus dengan kerang remis laut segar, bawang putih tumis minyak zaitun murni, cabai kering, peterseli segar, dan sari kaldu kerang anggur putih.",
      story: "Tradisi pesisir Napoli yang membawa aroma kesegaran laut Mediterania langsung ke meja Anda.",
      chefNote: "Kerang dibuka langsung di atas wajan panas bertutup untuk menangkap tetesan sari laut asin alami ke dalam saus pasta.",
      portion: "1 Piring Pasta Hasil Laut",
      prepTime: "7 menit",
      ingredients: ["Pasta Linguine Halus","Kerang Remis Laut Segar","Minyak Zaitun Ekstra Virgin Sisilia","Bawang Putih & Cabai Kering","Peterseli Daun Datar Segar"],
      allergens: ["Gluten","Moluska / Hewan Laut Bercangkang"],
    },
  },
  "whipped-ricotta-toast": {
    en: {
      description: "Cloud-light whipped sheep's milk ricotta, hot wildflower honey, fresh garden thyme, and sea salt on charred country sourdough.",
      story: "Our most requested starter since day one, balancing warm crackling toast against silky cool sweet cheese.",
      chefNote: "The ricotta is strained overnight then whipped at high speed with Sicilian olive oil until fluffy as mousse.",
      portion: "3 Shared Crostini Toasts",
      prepTime: "4 min",
      ingredients: ["House Charred Country Sourdough","Whipped Fresh Sheep Ricotta","Raw Local Wildflower Honey","Fresh Garden Thyme Sprigs","Flaky Maldon Sea Salt"],
      allergens: ["Gluten","Dairy"],
    },
    id: {
      description: "Keju ricotta susu segar dikocok lembut berudara, madu bunga liar pegunungan, timi kebun, dan garam laut di atas roti sourdough bakar arang renyah.",
      story: "Menu pembuka favorit pelanggan kami yang memadukan kelembutan keju awan dengan gurih manis alami.",
      chefNote: "Ricotta disaring dua kali lalu dikocok kecepatan tinggi dengan sedikit minyak zaitun agar teksturnya seringan mousse.",
      portion: "3 Potong Roti Panggang Berbagi",
      prepTime: "4 menit",
      ingredients: ["Roti Sourdough Panggang Arang","Keju Ricotta Susu Segar Kocok","Madu Bunga Liar Lokal","Daun Timi Kebun","Garam Laut Maldon"],
      allergens: ["Gluten","Produk Susu"],
    },
  },
  "shishito-peppers": {
    en: {
      description: "Sweet Japanese shishito peppers blistered at 600°F on cast iron, tossed in smoked flaked sea salt and fresh lime zest.",
      story: "The ultimate table snack: one in ten peppers carries an elusive, delightful spicy kick.",
      chefNote: "Cast iron must be smoking hot before the peppers hit so skins blister in 45 seconds without softening the flesh.",
      portion: "1 Shared Appetizer Bowl",
      prepTime: "3 min",
      ingredients: ["Sweet Japanese Shishito Peppers","First Cold-Pressed Olive Oil","Oak-Smoked Maldon Sea Salt","Fresh Grated Key Lime Zest"],
      allergens: [],
    },
    id: {
      description: "Cabai shishito manis Jepang dibakar kilat di atas wajan besi membara hingga kulitnya melepuh bergelembung, ditaburi garam laut asap dan kucuran jeruk nipis segar.",
      story: "Satu dari sepuluh cabai shishito memiliki sengatan pedas kejutan yang menyenangkan untuk dinikmati bersama teman satu meja.",
      chefNote: "Wajan harus bersuhu di atas 300°C agar kulit cabai melepuh dalam 45 detik tanpa membuat dagingnya lembek.",
      portion: "1 Mangkuk Penuh untuk Meja",
      prepTime: "3 menit",
      ingredients: ["Cabai Shishito Manis Segar","Minyak Zaitun Tekan Dingin","Garam Laut Asap Maldon","Perasan Jeruk Nipis Segar"],
      allergens: [],
    },
  },
  "polenta-fries": {
    en: {
      description: "Crispy fried stone-ground polenta batons, white truffle oil mist, finely grated Parmigiano Reggiano, and roasted garlic aioli.",
      story: "An Italian alpine tradition reimagined into an addictive, golden finger food with a steaming creamy center.",
      chefNote: "Polenta is cooked slow with broth and butter, cooled for 6 hours, then double-fried for maximum crust.",
      portion: "1 Shared Basket",
      prepTime: "5 min",
      ingredients: ["Stone-Ground Yellow Corn Polenta","White Truffle Essence Mist","24-Month Parmigiano Reggiano","Roasted Garlic Confit Aioli","Minced Garden Rosemary"],
      allergens: ["Dairy","Eggs (Aioli)"],
    },
    id: {
      description: "Batang polenta jagung giling tradisional digoreng emas renyah di luar dan lembut di dalam, diberi taburan minyak truffle putih, keju Parmigiano, dan saus aioli bawang putih panggang.",
      story: "Camilan pembuka asal Italia utara yang diolah kembali menjadi stik renyah mewah pengganti kentang goreng biasa.",
      chefNote: "Polenta didinginkan selama 6 jam sebelum dipotong menjadi balok presisi agar tidak pecah saat digoreng kering.",
      portion: "1 Keranjang Camilan Renyah",
      prepTime: "5 menit",
      ingredients: ["Tepung Polenta Jagung Tradisional","Minyak Truffle Putih Italia","Keju Parmigiano Parut Halus","Aioli Bawang Putih Panggang","Daun Rosemary Cincang"],
      allergens: ["Produk Susu","Telur (Aioli)"],
    },
  },
  "burrata-heirloom": {
    en: {
      description: "Fresh Puglia burrata with liquid cream center, multi-colored heirloom farm tomatoes, fresh Genovese basil, and aged balsamic glaze.",
      story: "A pristine showcase of summer farm harvests partnered with fresh daily curd cheese.",
      chefNote: "Served strictly at room temperature so the rich stracciatella cream flows naturally when pierced.",
      portion: "1 Shared Salad Plate",
      prepTime: "4 min",
      ingredients: ["Fresh Cream-Filled Burrata Ball","Multi-Colored Farm Heirloom Tomatoes","Fresh Genovese Sweet Basil","Cold-Pressed Extra Virgin Olive Oil","Aged Traditional Balsamic Glaze"],
      allergens: ["Dairy"],
    },
    id: {
      description: "Bola keju burrata segar isi krim leleh lembut, tomat pusaka aneka warna manis dari petani lokal, daun kemangi Genovese, dan reduksi cuka balsamik Modena matang.",
      story: "Perayaan hasil panen musim panas terbaik dari kebun kemitraan petani Deny Restaurant.",
      chefNote: "Disajikan pada suhu ruang agar bagian dalam stracciatella burrata mengalir lembut begitu dipotong pisau.",
      portion: "1 Piring Salad Pembuka Segar",
      prepTime: "4 menit",
      ingredients: ["Keju Burrata Segar Lembut","Tomat Pusaka Heirloom Aneka Warna","Kemangi Genovese Segar","Minyak Zaitun Ekstra Virgin","Glasir Balsamik Modena"],
      allergens: ["Produk Susu"],
    },
  },
  "calamari-fritti": {
    en: {
      description: "Tender day-boat squid rings dusted in semolina, flash-fried crispy with charred lemon wheels and squid ink aioli.",
      story: "Classic Italian seaside trattoria crunch, made with ultra-fresh squid that stays remarkably tender.",
      chefNote: "Flash-fried for only 75 seconds at 375°F to ensure crisp semolina exterior without turning rubbery.",
      portion: "1 Generous Shared Plate",
      prepTime: "5 min",
      ingredients: ["Day-Boat Fresh Atlantic Squid","Hard Durum Semolina Flour","Charred Meyer Lemon Halves","Garlic Squid Ink Black Aioli","Chopped Italian Parsley"],
      allergens: ["Gluten","Molluscs","Eggs"],
    },
    id: {
      description: "Cumi-cumi laut segar dipotong cincin dan dilapisi tepung semolina tipis renyah, digoreng emas dengan irisan lemon dan cabai panggang, disajikan dengan aioli tinta cumi bawang putih.",
      story: "Teknik penggorengan kilat suhu tinggi yang memastikan cumi-cumi tetap empuk kenyal dan lapisan luar renyah tahan lama.",
      chefNote: "Hanya digoreng selama 75 detik pada minyak 190°C untuk menjaga kelembutan daging cumi-cumi.",
      portion: "1 Piring Penuh Berbagi",
      prepTime: "5 menit",
      ingredients: ["Cumi-Cumi Laut Segar Tangkapan Hari Ini","Tepung Semolina Gandum Keras","Irisan Jeruk Lemon Kuning","Aioli Bawang Putih Tinta Cumi","Garam Laut & Peterseli"],
      allergens: ["Gluten","Moluska","Telur"],
    },
  },
  "signature-tiramisu": {
    en: {
      description: "Single-origin espresso-dipped ladyfingers, velvety whipped mascarpone sabayon, and dark Valrhona cocoa dust.",
      story: "Crafted fresh every morning following our Venetian family recipe with unpasteurized farm-fresh yolks.",
      chefNote: "Dipped for precisely one second so the biscuit core retains structural integrity without turning soggy.",
      portion: "1 Glass Bowl",
      prepTime: "2 min",
      ingredients: ["Italian Savoiardi Ladyfingers","Fresh Pulled Single-Origin Espresso","Cultured Farm Mascarpone","Free-Range Egg Yolks","Valrhona Pure Dutch Cocoa Powder"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Biskuit savoiardi Italia yang dicelupkan ke dalam espresso single-origin panas, krim keju mascarpone kocok lembut, dan taburan bubuk kakao murni Valrhona.",
      story: "Pencuci mulut legendaris Italia yang kami buat segar setiap pagi tanpa bahan pengawet.",
      chefNote: "Biskuit dicelup hanya satu detik agar tetap memiliki tekstur kenyal dan tidak lembek berair.",
      portion: "1 Porsi Mangkuk Kaca",
      prepTime: "2 menit",
      ingredients: ["Biskuit Savoiardi Italia","Espresso Single-Origin Ekstraksi Segar","Keju Mascarpone Segar","Kuning Telur Ayam Kampung Bebas Sangkar","Bubuk Kakao Gelap Valrhona"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "pistachio-cannoli": {
    en: {
      description: "Crispy fried Sicilian pastry shells stuffed with sweet sheep's milk ricotta, rolled in toasted Bronte pistachios and powdered sugar.",
      story: "The iconic dessert of Sicily, piped strictly to order so the pastry shell stays shatteringly crisp.",
      chefNote: "Ricotta is drained for 24 hours to remove all whey, ensuring a firm, pipeable filling scented with orange peel.",
      portion: "2 Crisp Cannoli",
      prepTime: "3 min",
      ingredients: ["Crisp Wine-Dough Cannoli Shells","Sweetened Sheep Ricotta Cream","Roasted Bronte Green Pistachios","Candied Orange Blossom Peel","Fine Confectioner's Sugar"],
      allergens: ["Gluten","Dairy","Tree Nuts (Pistachios)"],
    },
    id: {
      description: "Kulit cannoli Sisilia renyah bergelembung diisi krim keju ricotta domba manis beraroma vanila, dicelup kacang pistachio Bronte cincang dan taburan gula salju.",
      story: "Kue khas Sisilia yang digoreng garing dan diisi krim ricotta sesaat sebelum disajikan agar kulit tetap super renyah.",
      chefNote: "Krim ricotta ditiriskan semalaman untuk membuang kelebihan air sebelum diaduk bersama kulit jeruk manis.",
      portion: "2 Buah Cannoli Renyah",
      prepTime: "3 menit",
      ingredients: ["Kulit Cannoli Goreng Renyah","Keju Ricotta Manis Sisilia","Kacang Pistachio Bronte Cincang","Kulit Jeruk Manis Manisan","Gula Halus Murni"],
      allergens: ["Gluten","Produk Susu","Kacang Pohon (Pistachio)"],
    },
  },
  "vanilla-gelato": {
    en: {
      description: "Slow-churned artisan gelato made with local whole milk, fresh cream, and whole Madagascar Bourbon vanilla beans.",
      story: "Churned slowly every morning in our authentic batch freezer to achieve dense, silky, low-air Italian gelato.",
      chefNote: "Contains 70% less overrun air than standard ice cream, yielding an intensely concentrated vanilla flavor.",
      portion: "2 Generous Scoops in Glass",
      prepTime: "2 min",
      ingredients: ["Farm-Fresh Whole Jersey Milk","Heavy Sweet Cream","Whole Madagascar Bourbon Vanilla","Organic Cane Sugar","House Butter Pizzelle Wafer"],
      allergens: ["Dairy","Eggs"],
    },
    id: {
      description: "Gelato artisan Italia dibuat segar dari susu sapi perah lokal dan biji polong vanila murni Madagaskar, disajikan dengan biskuit wafel mentega buatan sendiri.",
      story: "Diputar lambat setiap pagi dalam mesin pembuat gelato tradisional Italia untuk menghasilkan tekstur padat sehalus sutra.",
      chefNote: "Mengandung udara jauh lebih sedikit dibandingkan es krim biasa, menghasilkan rasa susu dan vanila yang jauh lebih pekat.",
      portion: "2 Sendok Bulat dalam Gelas Kaca",
      prepTime: "2 menit",
      ingredients: ["Susu Sapi Murni Peternak Lokal","Krim Susu Segar","Biji Vanila Hitam Madagaskar","Gula Tebu Organik","Wafel Mentega Renyah"],
      allergens: ["Produk Susu","Telur"],
    },
  },
  "olive-oil-cake": {
    en: {
      description: "Tender Ligurian sponge cake baked with extra-virgin olive oil, fresh lemon zest, whipped mascarpone, and macerated berries.",
      story: "An ancient Mediterranean tradition replacing butter with fruity olive oil for an impossibly moist crumb that lasts days.",
      chefNote: "The olive oil is whisked in as the final step to preserve its bright, grassy, fruity notes during baking.",
      portion: "1 Generous Cake Slice",
      prepTime: "3 min",
      ingredients: ["Cold-Pressed Sicilian Olive Oil","Organic Unbleached Flour","Fresh Meyer Lemon Zest","Whipped Sweet Mascarpone","Macerated Wild Forest Berries"],
      allergens: ["Gluten","Dairy","Eggs"],
    },
    id: {
      description: "Kue bolu lembut khas Liguria dipanggang menggunakan minyak zaitun ekstra virgin Sisilia, parutan kulit lemon segar, dan disajikan dengan krim mascarpone kocok serta manisan beri.",
      story: "Kue tradisional Italia yang menggantikan mentega dengan minyak zaitun, menghasilkan tekstur sangat lembap dan wangi buah zaitun alami.",
      chefNote: "Minyak zaitun dituang pada tahap akhir adonan agar aroma floral zaitun tetap terjaga utuh selama proses pemanggangan.",
      portion: "1 Potong Kue Tebal",
      prepTime: "3 menit",
      ingredients: ["Minyak Zaitun Ekstra Virgin Sisilia","Tepung Gandum Organik","Kulit Lemon Segar Parut","Krim Mascarpone Kocok Lembut","Selai Buah Beri Liar"],
      allergens: ["Gluten","Produk Susu","Telur"],
    },
  },
  "affogato": {
    en: {
      description: "A large scoop of Madagascar vanilla gelato drowned in a freshly pulled double shot of piping hot single-origin espresso.",
      story: "Italy's simplest, most dramatic dessert: the clash of freezing sweet cream and scorching bitter crema.",
      chefNote: "The espresso is served in a small copper pitcher table-side so you can pour it at the exact moment of eating.",
      portion: "1 Chilled Crystal Goblet",
      prepTime: "2 min",
      ingredients: ["Fresh Pulled Double Espresso Arabica","Artisan Madagascar Vanilla Gelato","Crisp Almond Cantucci Dipping Cookie"],
      allergens: ["Dairy","Tree Nuts (Almond in biscuit)"],
    },
    id: {
      description: "Satu sendok besar gelato vanila artisan dingin disiram dengan satu sloki double espresso single-origin panas pekat yang baru diekstraksi.",
      story: "Kontras memikat antara es krim manis dingin dan pekatnya kopi espresso Italia panas yang melelehkannya seketika.",
      chefNote: "Espresso disajikan dalam teko tembaga kecil terpisah agar tamu dapat menuangkannya sendiri saat siap menikmatinya.",
      portion: "1 Gelas Kristal Dingin",
      prepTime: "2 menit",
      ingredients: ["Double Shot Espresso Arabika Single-Origin","Gelato Vanila Madagaskar Artisan","Biskuit Cantucci Almond Renyah"],
      allergens: ["Produk Susu","Kacang Pohon (Almond pada biskuit)"],
    },
  },
  "smoked-rosemary-spritz": {
    en: {
      description: "Botanical zero-proof bitter aperitivo, Sicilian blood orange cordial, sparkling aromatic tonic, and torched garden rosemary.",
      story: "A sophisticated zero-proof aperitivo that cleanses the palate with bittersweet botanical notes.",
      chefNote: "The rosemary sprig is lightly torched before serving, adding an intoxicating herbal aroma to every sip.",
      portion: "Served in balloon goblet over ice",
      prepTime: "3 min",
      ingredients: ["Botanical Bitters (Zero Proof)","Sicilian Blood Orange Cordial","Fever-Tree Aromatic Tonic","Torched Garden Rosemary Sprig"],
      allergens: [],
    },
    id: {
      description: "Aperitif non-alkohol sari botani herbal, air tonik sparkling berkilau, perasan jeruk darah Sisilia segar, dan ranting rosemary kebun yang dibakar wangi.",
      story: "Minuman penyegar lidah tanpa alkohol yang elegan dengan aroma herbal asap yang menawan.",
      chefNote: "Ranting rosemary dibakar sesaat sebelum disajikan agar mengeluarkan aroma herbal hutan yang menenangkan di setiap sesapan.",
      portion: "Gelas Balon Dingin dengan Es Batu Kristal",
      prepTime: "3 menit",
      ingredients: ["Bitter Botani Herbal (Bebas Alkohol)","Sari Jeruk Darah Sisilia","Air Tonik Aromatik Berkualitas","Ranting Rosemary Bakar Segar"],
      allergens: [],
    },
  },
  "nitro-cold-brew": {
    en: {
      description: "Single-origin Ethiopian Yirgacheffe coffee beans steeped cold for 18 hours and charged with pure nitrogen.",
      story: "Naturally sweet, floral, and incredibly creamy without a drop of dairy or sugar.",
      chefNote: "Pours with a cascading Guinness-like foam head. Creamy mouthfeel with zero dairy or added sugar.",
      portion: "16 oz cold glass",
      prepTime: "1 min",
      ingredients: ["Ethiopian Yirgacheffe Beans","Triple Filtered Cold Water","Food-Grade Nitrogen Infusion"],
      allergens: [],
    },
    id: {
      description: "Biji kopi single-origin Ethiopia Yirgacheffe yang diseduh dingin selama 18 jam dan dialiri gas nitrogen murni untuk buih lembut seperti bir draft.",
      story: "Kopi dingin dengan rasa manis alami buah beri dan tekstur busa sehalus sutra tanpa tambahan gula.",
      chefNote: "Dituang dari kran bertekanan tinggi untuk menciptakan efek air terjun gelembung mikro yang memukau.",
      portion: "Gelas Dingin 16 oz",
      prepTime: "1 menit",
      ingredients: ["Biji Kopi Ethiopia Yirgacheffe","Air Dingin Tersaring Tiga Kali","Infusi Gas Nitrogen Murni Kualitas Makanan"],
      allergens: [],
    },
  },
  "single-origin-espresso": {
    en: {
      description: "Direct-trade rotating seasonal beans, extracted at 9 bars of pressure with notes of jasmine, bergamot, and dark cacao.",
      story: "Uncompromising coffee calibrated twice daily for temperature, grind coarseness, and extraction yield.",
      chefNote: "Ground per shot with burr calibration monitored every morning.",
      portion: "Double shot (2 oz)",
      prepTime: "1 min",
      ingredients: ["100% Specialty Arabica Beans","Filtered Soft Water"],
      allergens: [],
    },
    id: {
      description: "Biji kopi sangrai musiman pilihan petani langsung, diekstraksi pada tekanan 9 bar dengan aroma melati, bergamot, dan cokelat kakao gelap yang intens.",
      story: "Kopi espresso murni tanpa kompromi yang dikalibrasi gilingannya dua kali sehari oleh barista kami.",
      chefNote: "Digiling per cangkir dengan mesin burr presisi untuk crema keemasan yang tebal dan aroma maksimal.",
      portion: "Cangkir Keramik Dobel (60 ml)",
      prepTime: "1 menit",
      ingredients: ["100% Biji Kopi Arabika Spesialti Pilihan","Air Mineral Lunak Tersaring"],
      allergens: [],
    },
  },
  "blood-orange-shrub": {
    en: {
      description: "Raw apple cider vinegar infused with crushed blood oranges, sparkling spring water, and crushed mint leaves.",
      story: "An ancient drinking vinegar tradition providing sharp, invigorating probiotic hydration.",
      chefNote: "Fermented cold for 7 days with organic cane sugar before bottling.",
      portion: "12 oz tall glass with crushed ice",
      prepTime: "2 min",
      ingredients: ["Organic Apple Cider Vinegar","Crushed Blood Orange Pulp","Sparkling Mountain Spring Water","Muddled Fresh Mint Leaves"],
      allergens: [],
    },
    id: {
      description: "Sari fermentasi cuka apel alami berpadu dengan tumbukan jeruk darah segar Sisilia, air mata air sparkling berkilau, dan daun mint segar.",
      story: "Minuman fermentasi herbal kuno yang menyegarkan pencernaan dengan kombinasi rasa asam manis menyegarkan.",
      chefNote: "Fermentasi dingin selama 7 hari menghasilkan rasa asam buah yang lembut dan tidak menyengat tenggorokan.",
      portion: "Gelas Tinggi dengan Es Batu Penuh",
      prepTime: "2 menit",
      ingredients: ["Cuka Apel Alami Fermentasi Dapur","Sari Perasan Jeruk Darah Segar","Air Mineral Sparkling","Daun Mint Segar Tumbuk"],
      allergens: [],
    },
  },
  "botanical-mocktail": {
    en: {
      description: "House-made elderflower cordial, pressed cucumber juice, fresh squeezed lime, garden mint, and botanical club soda.",
      story: "Crisp, floral, and deeply revitalizing on a sunny afternoon without any alcohol.",
      chefNote: "Cucumbers are cold-pressed fresh daily to maintain their vibrant bright green chlorophyll hue.",
      portion: "Stemmed Collins glass with edible floral garnish",
      prepTime: "3 min",
      ingredients: ["Organic Elderflower Cordial","Fresh Cold-Pressed Cucumber Juice","Fresh Key Lime Juice","Spearmint Leaves","Botanical Club Soda"],
      allergens: [],
    },
    id: {
      description: "Sirup bunga elderflower harum, ekstrak mentimun segar dingin, sari jeruk nipis peras, daun mint segar, dan soda sparkling botani.",
      story: "Racikan mocktail artisan yang sangat menyegarkan di hari yang cerah dengan aroma bebungaan putih yang menenangkan.",
      chefNote: "Mentimun diparut dan disaring dingin setiap pagi agar aroma segarnya tidak teroksidasi warna cokelat.",
      portion: "Gelas Kristal Bertangkai dengan Garnish Bunga",
      prepTime: "3 menit",
      ingredients: ["Sirup Bunga Elderflower Organik","Sari Mentimun Dingin Segar","Perasan Jeruk Nipis Murni","Daun Mint Kebun","Air Soda Botani Berkualitas"],
      allergens: [],
    },
  },
  "green-elixir": {
    en: {
      description: "Hydraulic cold-pressed green apple, celery stalks, baby spinach, crisp cucumber, fresh ginger root, and lemon.",
      story: "Pure unpasteurized living nutrients to energize the palate and nourish the body.",
      chefNote: "Extracted using a 2-ton hydraulic cold press with zero heat generation.",
      portion: "12 oz glass bottle served chilled",
      prepTime: "2 min",
      ingredients: ["Granny Smith Green Apples","Organic Crisp Celery Stalks","Fresh Baby Leaf Spinach","English Seedless Cucumbers","Fresh Ginger & Lemon Juice"],
      allergens: ["Celery"],
    },
    id: {
      description: "Sari sayur dan buah peras dingin (cold-pressed) tanpa pemanasan: apel hijau renyah, seledri segar, bayam hijau, mentimun, jahe hangat, dan lemon segar.",
      story: "Minuman kesehatan murni tanpa tambahan air atau gula yang memberikan energi segar seketika bagi tubuh.",
      chefNote: "Diperas menggunakan mesin hidrolik berkecepatan rendah sehingga seluruh vitamin dan enzim alami tetap terjaga aktif.",
      portion: "Botol Kaca Dingin 350 ml",
      prepTime: "2 menit",
      ingredients: ["Apel Hijau Granny Smith","Batang Seledri Segar","Daun Bayam Hijau Muda","Mentimun Segar","Akar Jahe Hangat & Jeruk Lemon"],
      allergens: ["Seledri"],
    },
  },
};

export const allergenTranslations: Record<string, Record<Language, string>> = {
  "Gluten (Wheat)": { en: "Gluten (Wheat)", id: "Gluten (Gandum)" },
  "Dairy (Milk)": { en: "Dairy (Milk)", id: "Produk Susu (Susu)" },
  "Gluten": { en: "Gluten", id: "Gluten" },
  "Dairy": { en: "Dairy", id: "Produk Susu" },
  "Tree Nuts (Walnuts)": { en: "Tree Nuts (Walnuts)", id: "Kacang Pohon (Walnut)" },
  "Eggs": { en: "Eggs", id: "Telur" },
  "Mustard": { en: "Mustard", id: "Mustard" },
  "Celery": { en: "Celery", id: "Seledri" },
  "Molluscs / Shellfish": { en: "Molluscs / Shellfish", id: "Moluska / Hewan Laut Bercangkang" },
  "Tree Nuts (Pistachios)": { en: "Tree Nuts (Pistachios)", id: "Kacang Pohon (Pistachio)" },
  "Eggs (Aioli)": { en: "Eggs (Aioli)", id: "Telur (Aioli)" },
  "Molluscs": { en: "Molluscs", id: "Moluska" },
  "Tree Nuts (Almond in biscuit)": { en: "Tree Nuts (Almond in biscuit)", id: "Kacang Pohon (Almond pada biskuit)" },
};

export const dietaryTranslations: Record<string, Record<Language, string>> = {
  "vegetarian": { en: "Vegetarian", id: "Vegetarian" },
  "spicy": { en: "Spicy", id: "Pedas" },
  "gluten-free": { en: "Gluten-Free", id: "Bebas Gluten" },
};

export const categoryNameTranslations: Record<string, Record<Language, string>> = {
  "pizza": { en: "Wood-Fired Pizza", id: "Pizza Tungku Api" },
  "burgers": { en: "Craft Smash Burgers", id: "Burger Smash" },
  "pasta": { en: "Fresh Pasta Bar", id: "Bar Pasta Segar" },
  "starters": { en: "Starters & Shared Plates", id: "Hidangan Pembuka" },
  "desserts": { en: "Dolci & Desserts", id: "Dolci & Pencuci Mulut" },
  "drinks": { en: "Specialty Craft Drinks", id: "Minuman Racikan Spesial" },
};

export function getAllergenName(allergen: string, lang: Language): string {
  return allergenTranslations[allergen]?.[lang] || allergen;
}

export function getDietaryName(tag: string, lang: Language): string {
  return dietaryTranslations[tag]?.[lang] || tag;
}

export function getCategoryName(id: string, lang: Language): string {
  return categoryNameTranslations[id]?.[lang] || id;
}

export function getLocalizedMenuItem(item: MenuItem, lang: Language): MenuItem {
  const trans = menuItemTranslations[item.id]?.[lang];
  if (!trans) {
    if (lang === "id") {
      return {
        ...item,
        prepTime: item.prepTime?.replace("min", "menit").replace("sec", "detik").replace("bake", "panggang"),
        allergens: item.allergens?.map((a) => getAllergenName(a, lang)),
      };
    }
    return item;
  }
  return {
    ...item,
    description: trans.description || item.description,
    story: trans.story || item.story,
    chefNote: trans.chefNote || item.chefNote,
    portion: trans.portion || item.portion,
    prepTime: trans.prepTime || item.prepTime,
    ingredients: trans.ingredients || item.ingredients,
    allergens: trans.allergens || item.allergens?.map((a) => getAllergenName(a, lang)),
  };
}

/* ==========================================================================
   STORY LOCALIZATION HELPERS
   ========================================================================== */
export function getLocalizedStoryStats(lang: Language) {
  if (lang === "id") {
    return [
      { value: "10+", label: "Tahun Memasak" },
      { value: "500°C", label: "Oven Kayu Bakar" },
      { value: "48 Jam", label: "Fermentasi Adonan" },
      { value: "15 Menit", label: "Rata-rata Waktu Siap" },
    ];
  }
  return [
    { value: "10+", label: "Years of Cooking" },
    { value: "900°F", label: "Wood-Fired Oven" },
    { value: "48h", label: "Dough Fermentation" },
    { value: "15 min", label: "Average Wait Time" },
  ];
}

export function getLocalizedStoryTimeline(lang: Language) {
  if (lang === "id") {
    return [
      {
        year: "2013",
        title: "Satu tungku oven kayu bakar",
        text: "Dimulai dari satu oven bekas dan keyakinan bahwa pizza lezat tidak harus menjadi barang mewah.",
      },
      {
        year: "2016",
        title: "Ruang makan pertama kami",
        text: "Pintu dibuka untuk pertama kali, menu dibuat ringkas, dan seluruh bahan dimasak segar setiap hari.",
      },
      {
        year: "2019",
        title: "Stasiun pasta segar & sfoglina",
        text: "Tagliatelle buatan tangan hadir di menu, ditemani saus ragù yang direbus perlahan selama dua belas jam.",
      },
      {
        year: "2022",
        title: "Lebih dekat dengan para petani",
        text: "Membangun kemitraan langsung jangka panjang dengan petani lokal untuk hasil bumi, susu sapi, dan gandum.",
      },
      {
        year: "2025",
        title: "Bar racikan modern",
        text: "Kopi single-origin, sari fermentasi buah, dan mocktail botani melengkapi pengalaman bersantap istimewa.",
      },
    ];
  }
  return [
    {
      year: "2013",
      title: "A single wood-fired oven",
      text: "It started with one second-hand oven and a belief that great pizza should not be a luxury.",
    },
    {
      year: "2016",
      title: "Our first dining room",
      text: "We opened the doors, kept the menu short, and cooked everything from scratch, every single day.",
    },
    {
      year: "2019",
      title: "The pasta bar & sfoglina station",
      text: "Hand-rolled tagliatelle joined the line-up, with ragù braised for twelve hours in the back.",
    },
    {
      year: "2022",
      title: "Closer to the farm",
      text: "We established long-term direct partnerships with local farms for produce, dairy, and ancient grains.",
    },
    {
      year: "2025",
      title: "The modern craft bar",
      text: "Micro-lot coffee, fermented shrubs, and botanical mocktails completed the full table experience.",
    },
  ];
}

export function getLocalizedStoryValues(lang: Language) {
  if (lang === "id") {
    return [
      {
        icon: "utensils",
        title: "Menu Olahan Koki",
        text: "Setiap hidangan dibuat dari awal menggunakan teknik Eropa tradisional dengan sentuhan modern yang berani.",
      },
      {
        icon: "clock",
        title: "Cepat & Menghargai Waktu",
        text: "Kami yakin makanan lezat tidak harus menunggu lama. Dapatkan hidangan segar Anda dalam waktu di bawah 15 menit.",
      },
      {
        icon: "leaf",
        title: "Bahan Hasil Tani Lokal",
        text: "Kami bermitra langsung dengan perkebunan lokal untuk menjamin hasil panen paling segar dan bebas pestisida.",
      },
      {
        icon: "wheat",
        title: "Dibuat Segar Tiap Hari",
        text: "Adonan sourdough, pita pasta segar, saus rahasia, dan gelato artisan dibuat langsung di dapur, bukan makanan kaleng.",
      },
      {
        icon: "recycle",
        title: "Dapur Ramah Lingkungan",
        text: "Sisa potongan sayuran dan tulang diolah menjadi kaldu kaya rasa dan makanan staf, tanpa ada bahan baik yang terbuang.",
      },
      {
        icon: "heart",
        title: "Keramahan Tulus Hangat",
        text: "Tanpa suasana taplak meja putih yang kaku. Hanya pelayanan tulus yang membuat Anda merasa seperti keluarga.",
      },
    ];
  }
  return [
    {
      icon: "utensils",
      title: "Chef-Driven Menu",
      text: "Every dish is crafted from scratch using traditional European techniques and modern energetic twists.",
    },
    {
      icon: "clock",
      title: "Fast Casual Respect",
      text: "We believe great food shouldn’t mean a long wait. Get your fresh favorites in under 15 minutes.",
    },
    {
      icon: "leaf",
      title: "Locally Sourced Produce",
      text: "We partner with local farms and regional artisans to guarantee the freshest, pesticide-free harvest.",
    },
    {
      icon: "wheat",
      title: "Made From Scratch Daily",
      text: "Sourdough, fresh pasta ribbons, secret sauces, and artisan gelato are made in-house, never from a box.",
    },
    {
      icon: "recycle",
      title: "Zero-Waste Kitchen",
      text: "Vegetable and bone trimmings become rich stocks and staff meals, so nothing good is wasted.",
    },
    {
      icon: "heart",
      title: "True Warm Hospitality",
      text: "No stiff white tablecloths. Just genuine, attentive service that makes you feel like an everyday regular.",
    },
  ];
}

export function getLocalizedStoryTeam(lang: Language) {
  if (lang === "id") {
    return [
      {
        icon: "chef",
        role: "Kepala Koki",
        text: "Menentukan menu setiap musim dan mencicipi setiap saus sebelum jam buka layanan.",
      },
      {
        icon: "flame",
        role: "Pizzaiolo",
        text: "Menjaga suhu oven di 500°C dan waktu fermentasi adonan tepat 48 jam.",
      },
      {
        icon: "pasta",
        role: "Master Pasta",
        text: "Menggiling dan memotong setiap helai pasta dengan tangan sebelum pintu restoran dibuka.",
      },
      {
        icon: "sweet",
        role: "Koki Pastry",
        text: "Meracik tiramisu, cannoli, dan gelato segar dari bahan mentah setiap pagi.",
      },
    ];
  }
  return [
    {
      icon: "chef",
      role: "Head Chef",
      text: "Sets the menu each season and tastes every sauce before service.",
    },
    {
      icon: "flame",
      role: "Pizzaiolo",
      text: "Keeps the oven at 900°F and the dough at exactly 48 hours.",
    },
    {
      icon: "pasta",
      role: "Pasta Master",
      text: "Rolls and cuts every ribbon by hand before the doors open.",
    },
    {
      icon: "sweet",
      role: "Pastry Chef",
      text: "Builds our tiramisu, cannoli and gelato from scratch each morning.",
    },
  ];
}
