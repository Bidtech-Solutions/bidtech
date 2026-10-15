/* ==========================================================================
   DENY RESTAURANT — Core Data Model & Content
   Updated with Staff profiles, rich Menu Details & Categories.
   ========================================================================== */

export type CategoryId =
  | "pizza"
  | "burgers"
  | "pasta"
  | "starters"
  | "desserts"
  | "drinks";

export type DietaryTag = "vegetarian" | "spicy" | "gluten-free";

const img = (photoId: string, width = 1000) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fm=webp&fit=crop&w=${width}&q=80`;

/* --- Curated Restaurant Photo IDs --- */
const PHOTO = {
  pizza: "1513104890138-7c749659a591",
  margherita: "1604068549290-dea0e4a305ca",
  pizzaSlice: "1565299624946-b28f40a0ae38",
  burger: "1568901346375-23c9450c58cd",
  burgerStack: "1550547660-d9450f859349",
  pasta: "1621996346565-e3dbc646d9a9",
  dessert: "1571877227200-a0d98ea607e9",
  drink: "1551024709-8f23befc6f87",
  coffee: "1509042239860-f550ce710b93",
  starter: "1541529086526-db283c563270",

  /* Staff Portraits */
  chefDeny: "1577219491135-ce391730fb2c", // Executive Chef
  pizzaiolo: "1583394838336-acd977736f90", // Pizza master
  pastaChef: "1581299894007-aaa50297cf16", // Pasta artisan
  grillChef: "1574966740929-e47854be7c87", // Burger & grill
  pastryChef: "1595273670150-bd0c3c392e46", // Pastry chef
  mixologist: "1534528741775-53994a69daeb", // Bar & drink director
  generalManager: "1507003211169-0a1dd7228f2d", // Hospitality Lead
  farmLead: "1539571696357-5a69c17a67c6", // Sourcing specialist
} as const;

/** Letter-hover images used by animated headings across the app */
export const headingImages = [
  img(PHOTO.pizzaSlice, 600),
  img(PHOTO.burger, 600),
  img(PHOTO.pasta, 600),
  img(PHOTO.dessert, 600),
  img(PHOTO.coffee, 600),
  img(PHOTO.pizza, 600),
];

/* ==========================================================================
   CATEGORIES (Integrated into the Menu Experience)
   ========================================================================== */
export interface Category {
  id: CategoryId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  itemsCount: string;
  tag: string;
  tagIcon: "flame" | "sparkles" | "award";
  image: string;
  priceStart: string;
  gradient: string;
  popularDish: string;
}

export const categories: Category[] = [
  {
    id: "pizza",
    title: "Wood-Fired Pizza",
    shortTitle: "Pizza",
    subtitle: "48-Hour Proofed Sourdough",
    description:
      "San Marzano D.O.P. tomatoes, fresh fior di latte, and blistered crust charred at 900°F.",
    itemsCount: "6 Creations",
    tag: "Wood Fired",
    tagIcon: "flame",
    image: img(PHOTO.pizza),
    priceStart: "Mulai Rp 72.000",
    gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
    popularDish: "Margherita di Bufala",
  },
  {
    id: "burgers",
    title: "Craft Smash Burgers",
    shortTitle: "Burgers",
    subtitle: "100% Grass-Fed Angus",
    description:
      "Double lacy-crust patties, aged American cheddar, and caramelized shallots on warm brioche.",
    itemsCount: "6 Varieties",
    tag: "Best Seller",
    tagIcon: "award",
    image: img(PHOTO.burger),
    priceStart: "Mulai Rp 58.000",
    gradient: "from-orange-500/20 via-red-600/10 to-transparent",
    popularDish: "Truffle Smash Deluxe",
  },
  {
    id: "pasta",
    title: "Artisan Hand-Rolled Pasta",
    shortTitle: "Pasta",
    subtitle: "Extruded & Cut Fresh Daily",
    description:
      "Silky rich egg dough ribbons, 12-hour braised Bolognese ragù, and freshly grated Parmigiano.",
    itemsCount: "6 Plates",
    tag: "Handmade",
    tagIcon: "sparkles",
    image: img(PHOTO.pasta),
    priceStart: "Mulai Rp 78.000",
    gradient: "from-yellow-500/20 via-amber-600/10 to-transparent",
    popularDish: "Tagliatelle al Tartufo",
  },
  {
    id: "starters",
    title: "Starters & Shared Plates",
    shortTitle: "Starters",
    subtitle: "Crispy Bites & Dips",
    description:
      "Whipped ricotta crostini, blistered shishito peppers, and truffle parmesan polenta fries.",
    itemsCount: "5 Appetizers",
    tag: "For the Table",
    tagIcon: "award",
    image: img(PHOTO.starter),
    priceStart: "Mulai Rp 42.000",
    gradient: "from-amber-500/20 via-yellow-600/10 to-transparent",
    popularDish: "Whipped Ricotta Toast",
  },
  {
    id: "desserts",
    title: "Dolci & Sweet Treats",
    shortTitle: "Desserts",
    subtitle: "Crafted In-House Daily",
    description:
      "Classic espresso-dipped savoiardi tiramisu, crisp pistachio cannoli, and Madagascar vanilla gelato.",
    itemsCount: "5 Specialties",
    tag: "Sweet Endings",
    tagIcon: "sparkles",
    image: img(PHOTO.dessert),
    priceStart: "Mulai Rp 38.000",
    gradient: "from-pink-500/20 via-rose-600/10 to-transparent",
    popularDish: "Signature Tiramisu",
  },
  {
    id: "drinks",
    title: "Specialty Drinks & Brews",
    shortTitle: "Drinks",
    subtitle: "Single-Origin & Botanical",
    description:
      "Micro-lot espresso, 18-hour nitro cold brew, fermented shrubs, and artisanal mocktails.",
    itemsCount: "6 Drinks",
    tag: "Craft Bar",
    tagIcon: "flame",
    image: img(PHOTO.drink),
    priceStart: "Mulai Rp 28.000",
    gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
    popularDish: "Smoked Rosemary Spritz",
  },
];

export const categoryById = (id: CategoryId) =>
  categories.find((c) => c.id === id)!;

/** Helper untuk format Rupiah rapi (contoh: 78000 -> "Rp 78.000") */
export const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

/* ==========================================================================
   MENU ITEMS WITH RICH FOOD DETAILS FOR POPUP MODAL
   ========================================================================== */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  tags?: DietaryTag[];
  popular?: boolean;
  image: string;

  /* Rich detail fields for interactive modal */
  rating: number;
  prepTime: string;
  calories: string;
  portion: string;
  spiceLevel?: number; // 0 to 3
  ingredients: string[];
  allergens?: string[];
  chefNote: string;
  story?: string;
  gallery?: string[];
}

export const categoryGalleries: Record<CategoryId, string[]> = {
  pizza: [
    img("1565299624946-b28f40a0ae38", 1000), // Pizza slice pull
    img("1513104890138-7c749659a591", 1000), // Wood-fired crust on peel
    img("1590947132387-155cc02f3212", 1000), // Sourdough prep & basil
    img("1574071318508-1cdbab80d002", 1000), // Whole neapolitan pie
  ],
  burgers: [
    img("1550547660-d9450f859349", 1000), // Double patty cheddar stack
    img("1586190848861-99aa4a171e90", 1000), // Burger & golden fries
    img("1572802419224-296b0aeee0d9", 1000), // Flat-top grill sear
    img("1568901346375-23c9450c58cd", 1000), // Smash burger hero
  ],
  pasta: [
    img("1551183053-bf91a1d81141", 1000), // Truffle & parmigiano grating
    img("1556761223-4c4282c73f77", 1000), // Swirl fork lift
    img("1608897013039-887f21d8c804", 1000), // Rustic pan sizzle
    img("1621996346565-e3dbc646d9a9", 1000), // Golden egg pasta ribbons
  ],
  starters: [
    img("1544025162-d76694265947", 1000), // Crispy bites & sea salt
    img("1505253758473-96b46d5f69ec", 1000), // Shared appetizers table
    img("1626082927389-6cd097cdc6ec", 1000), // Artisan dip & garnish
    img("1541529086526-db283c563270", 1000), // Crostini & ricotta toast
  ],
  desserts: [
    img("1587314168485-3236d6710814", 1000), // Gelato churn
    img("1551024601-bec78aea704b", 1000), // Chocolate melt
    img("1509440159596-0249088772ff", 1000), // Pastry crust
    img("1571877227200-a0d98ea607e9", 1000), // Tiramisu cocoa dust
  ],
  drinks: [
    img("1509042239860-f550ce710b93", 1000), // Single-origin espresso pour
    img("1514432324607-a09d9b4aefdd", 1000), // Nitro cold brew froth
    img("1536935338788-846bb9981813", 1000), // Iced botanical beverage
    img("1551024709-8f23befc6f87", 1000), // Spritz glass
  ],
};

const extractPhotoId = (url: string): string => {
  const match = url.match(/photo-([a-zA-Z0-9_-]+)/);
  return match ? match[1] : url.split("?")[0];
};

/**
 * Returns a 3-photo curated gallery for a dish (1 hero dish photo + 2 complementary detail photos)
 * Guarantees that photo 1, 2, and 3 are 100% distinct (no duplicates).
 */
export const getDishGallery = (item: MenuItem): string[] => {
  if (item.gallery && item.gallery.length >= 2) {
    return item.gallery.slice(0, 3);
  }
  const mainPhotoId = extractPhotoId(item.image);
  const pool = categoryGalleries[item.category] || categoryGalleries.pizza;

  // Filter out any photo matching the main photo ID regardless of query params (e.g. w=800 vs w=1000)
  const filtered = pool.filter((url) => extractPhotoId(url) !== mainPhotoId);

  const result: string[] = [item.image];
  for (const url of filtered) {
    if (result.length >= 3) break;
    const pid = extractPhotoId(url);
    if (!result.some((r) => extractPhotoId(r) === pid)) {
      result.push(url);
    }
  }
  return result;
};

export const menuItems: MenuItem[] = [
  /* --- Pizza --- */
  {
    id: "margherita-di-bufala",
    name: "Margherita di Bufala",
    description: "San Marzano D.O.P. tomato, buffalo mozzarella, fresh sweet basil, and Sicilian extra-virgin olive oil.",
    price: 78000,
    category: "pizza",
    image: img(PHOTO.margherita, 800),
    tags: ["vegetarian"],
    popular: true,
    rating: 4.9,
    prepTime: "90 sec bake",
    calories: "780 kcal",
    portion: "12-inch pizza (6 slices)",
    ingredients: [
      "48-Hour Cold-Fermented Sourdough",
      "San Marzano D.O.P. Tomatoes",
      "Campania Buffalo Mozzarella",
      "Fresh Genovese Basil",
      "Cold-Pressed Extra Virgin Olive Oil",
      "Maldon Sea Salt Flakes",
    ],
    allergens: ["Gluten (Wheat)", "Dairy (Milk)"],
    chefNote: "Cooked at 900°F for precisely 90 seconds. The leopard spotting along the crust gives it its distinctive smoky aroma.",
    story: "Our foundational recipe dating back to 2013. We use live mother yeast cultivated in-house.",
  },
  {
    id: "truffle-pepperoni",
    name: "Truffle Pepperoni",
    description: "Artisan Calabrian pepperoni, Italian white truffle oil, smoked mozzarella, and infused hot chili blossom honey.",
    price: 115000,
    category: "pizza",
    image: img(PHOTO.pizza, 800),
    tags: ["spicy"],
    popular: true,
    rating: 4.9,
    prepTime: "2 min bake",
    calories: "920 kcal",
    portion: "12-inch pizza (6 slices)",
    spiceLevel: 2,
    ingredients: [
      "Artisan Calabrian Pepperoni",
      "White Truffle Essence",
      "Naturally Smoked Mozzarella",
      "Crushed San Marzano Sauce",
      "Wildflower Hot Chili Honey",
      "Aged Parmigiano Shavings",
    ],
    allergens: ["Gluten", "Dairy"],
    chefNote: "The marriage of hot spicy pepperoni and smooth sweet chili honey creates a balanced savory bite.",
    story: "Created by chef Deny during late-night kitchen tests, now one of our most ordered pies.",
  },
  {
    id: "diavola",
    name: "Diavola Rustica",
    description: "Spicy Soppressata salami, crushed Calabrian chilies, fior di latte mozzarella, and wild Sicilian oregano.",
    price: 95000,
    category: "pizza",
    image: img(PHOTO.pizzaSlice, 800),
    tags: ["spicy"],
    rating: 4.7,
    prepTime: "2 min bake",
    calories: "890 kcal",
    portion: "12-inch pizza (6 slices)",
    spiceLevel: 3,
    ingredients: [
      "Dry-Cured Spicy Salami",
      "Calabrian Chili Paste",
      "Fior di Latte Mozzarella",
      "Organic Tomato Coulis",
      "Wild Dried Oregano",
    ],
    allergens: ["Gluten", "Dairy"],
    chefNote: "True southern Italian heat that stays lively on the palate without overpowering the sourdough crust.",
  },
  {
    id: "funghi-bianca",
    name: "Funghi Bianca",
    description: "Roasted porcini and cremini mushrooms, garlic herb cream, thyme sprigs, and Pecorino Romano.",
    price: 98000,
    category: "pizza",
    image: img(PHOTO.pizza, 800),
    tags: ["vegetarian"],
    rating: 4.8,
    prepTime: "2 min bake",
    calories: "820 kcal",
    portion: "12-inch pizza (6 slices)",
    ingredients: [
      "Wild Porcini & Cremini Mushrooms",
      "Roasted Garlic Cream Base",
      "Fresh Thyme Leaves",
      "Pecorino Romano D.O.P.",
      "Truffle Sea Salt",
    ],
    allergens: ["Gluten", "Dairy"],
    chefNote: "No red sauce here — the garlic cream base lets the forest mushrooms sing.",
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Fior di latte, aged gorgonzola dolce, alpine fontina, and 24-month Parmigiano Reggiano with roasted walnut crumble.",
    price: 95000,
    category: "pizza",
    image: img(PHOTO.margherita, 800),
    tags: ["vegetarian"],
    rating: 4.6,
    prepTime: "2 min bake",
    calories: "940 kcal",
    portion: "12-inch pizza (6 slices)",
    ingredients: [
      "Fior di Latte",
      "Gorgonzola Dolce",
      "Val d'Aosta Fontina",
      "24-Month Parmigiano",
      "Toasted Walnuts",
    ],
    allergens: ["Gluten", "Dairy", "Tree Nuts (Walnuts)"],
    chefNote: "Rich and comforting. The gorgonzola dolce provides depth without being excessively sharp.",
  },
  {
    id: "prosciutto-rucola",
    name: "Prosciutto & Rucola",
    description: "24-month aged Parma prosciutto, wild baby arugula, shaved Parmigiano Reggiano, and Amalfi lemon drizzle.",
    price: 118000,
    category: "pizza",
    image: img(PHOTO.pizzaSlice, 800),
    rating: 4.8,
    prepTime: "2 min bake",
    calories: "840 kcal",
    portion: "12-inch pizza (6 slices)",
    ingredients: [
      "24-Month Prosciutto di Parma",
      "Baby Rocket / Arugula",
      "Parmigiano Reggiano Shavings",
      "Fior di Latte Base",
      "Lemon Infused Olive Oil",
    ],
    allergens: ["Gluten", "Dairy"],
    chefNote: "Prosciutto is laid cold across the blistering pizza right out of the oven so it gently melts into the crust.",
  },

  /* --- Burgers --- */
  {
    id: "double-smash",
    name: "Deny Double Smash",
    description: "Two 100% grass-fed Angus beef patties smashed with lacy crust, double aged American cheddar, house secret sauce, and brioche bun.",
    price: 75000,
    category: "burgers",
    image: img(PHOTO.burger, 800),
    popular: true,
    rating: 4.9,
    prepTime: "10 min",
    calories: "860 kcal",
    portion: "Includes hand-cut seasoned fries",
    ingredients: [
      "Grass-Fed Prime Angus Beef",
      "Aged Sharp American Cheddar",
      "House Pickled Dill Cucumbers",
      "Deny Signature Relish Sauce",
      "Buttery Toasted Brioche Bun",
    ],
    allergens: ["Gluten", "Dairy", "Eggs", "Mustard"],
    chefNote: "Smashed on our 500°F flat-top grill using cast-iron presses for maximum caramelization.",
    story: "Awarded top city burger choice. Simplicity and intense crust make this our pride.",
  },
  {
    id: "truffle-smash-deluxe",
    name: "Truffle Smash Deluxe",
    description: "Double smash patty, black truffle roasted garlic aioli, melted aged Gruyère cheese, and sweet balsamic caramelized shallots.",
    price: 95000,
    category: "burgers",
    image: img(PHOTO.burgerStack, 800),
    popular: true,
    rating: 4.9,
    prepTime: "12 min",
    calories: "920 kcal",
    portion: "Includes truffle parmesan fries",
    ingredients: [
      "Double Angus Beef Patties",
      "Black Truffle Aioli",
      "Cave-Aged Gruyère",
      "Slow-Caramelized French Shallots",
      "Artisan Potato Brioche Bun",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    chefNote: "The sweet shallots cut cleanly through the earthy richness of the truffle aioli.",
  },
  {
    id: "mushroom-bacon",
    name: "Smoky Mushroom Bacon",
    description: "Sautéed wild porcini mushrooms, applewood smoked crispy bacon, melted Swiss cheese, and house garlic butter glaze.",
    price: 85000,
    category: "burgers",
    image: img(PHOTO.burgerStack, 800),
    rating: 4.7,
    prepTime: "12 min",
    calories: "890 kcal",
    portion: "Includes hand-cut seasoned fries",
    ingredients: [
      "Double Smash Beef",
      "Applewood Smoked Bacon",
      "Sautéed Wild Porcini",
      "Swiss Alpine Cheese",
      "Herb Garlic Butter",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    chefNote: "Porcini are pan-seared with thyme and butter right before assembling onto the melted patties.",
  },
  {
    id: "hot-honey-smash",
    name: "Hot Honey Jalapeño Smash",
    description: "Crispy jalapeño crisps, Monterey pepper jack cheese, house hot honey drizzle, and tangy chipotle slaw.",
    price: 82000,
    category: "burgers",
    image: img(PHOTO.burger, 800),
    tags: ["spicy"],
    rating: 4.7,
    prepTime: "11 min",
    calories: "880 kcal",
    portion: "Includes spiced shoestring fries",
    spiceLevel: 2,
    ingredients: [
      "Double Smashed Beef",
      "House Pickled Jalapeños",
      "Pepper Jack Cheese",
      "Spicy Honey Glaze",
      "Crunchy Chipotle Slaw",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    chefNote: "Crisp jalapeños give a satisfying crunch that plays against the tender beef patties.",
  },
  {
    id: "garden-smash",
    name: "Green Garden Smash",
    description: "House-made mushroom and roasted black bean patty, avocado slices, vine ripened tomato, and vegan herbal aioli on seeded bun.",
    price: 68000,
    category: "burgers",
    image: img(PHOTO.burgerStack, 800),
    tags: ["vegetarian"],
    rating: 4.6,
    prepTime: "10 min",
    calories: "640 kcal",
    portion: "Includes rosemary sweet potato chips",
    ingredients: [
      "Black Bean & Mushroom Patty",
      "Hass Avocado",
      "Heirloom Tomato",
      "Tarragon Vegan Aioli",
      "Toasted Multigrain Bun",
    ],
    allergens: ["Gluten"],
    chefNote: "No processed fake meat — entirely whole vegetables, grains, and herbs crafted from scratch.",
  },
  {
    id: "classic-cheeseburger",
    name: "Heritage Cheeseburger",
    description: "Single Angus patty, yellow cheddar, crisp iceberg lettuce, thinly sliced red onion, house pickles, and classic diner mustard.",
    price: 58000,
    category: "burgers",
    image: img(PHOTO.burger, 800),
    rating: 4.6,
    prepTime: "8 min",
    calories: "620 kcal",
    portion: "Includes french fries",
    ingredients: [
      "Angus Patty",
      "American Cheddar",
      "Crisp Iceberg Lettuce",
      "House Dill Pickles",
      "Diner Special Mustard",
    ],
    allergens: ["Gluten", "Dairy", "Eggs", "Mustard"],
    chefNote: "Old-school simplicity with high-grade prime beef.",
  },

  /* --- Pasta --- */
  {
    id: "tagliatelle-al-tartufo",
    name: "Tagliatelle al Tartufo",
    description: "Hand-rolled golden egg tagliatelle ribbons, cultured Normandy butter, 24-month Parmigiano Reggiano, and fresh Norcia black truffle.",
    price: 115000,
    category: "pasta",
    image: img(PHOTO.pasta, 800),
    tags: ["vegetarian"],
    popular: true,
    rating: 4.9,
    prepTime: "12 min",
    calories: "760 kcal",
    portion: "Generous bowl (220g fresh pasta)",
    ingredients: [
      "Hand-Rolled 30-Yolk Egg Tagliatelle",
      "Normandy Cultured Butter",
      "24-Month Parmigiano Reggiano",
      "Fresh Italian Black Truffle",
      "Emulsified Starch Pasta Water",
    ],
    allergens: ["Gluten", "Eggs", "Dairy"],
    chefNote: "Rolled every morning at 7:00 AM on our maple wood table. Finished strictly in the saute pan to create an emulsified velvety glaze.",
    story: "Our tribute to Bologna and Norcia traditions.",
  },
  {
    id: "tagliatelle-bolognese",
    name: "Tagliatelle alla Bolognese",
    description: "Traditional 12-hour slow-simmered beef, veal, and pancetta ragù with San Marzano tomatoes, wine, and Parmigiano.",
    price: 88000,
    category: "pasta",
    image: img(PHOTO.pasta, 800),
    popular: true,
    rating: 4.9,
    prepTime: "12 min",
    calories: "820 kcal",
    portion: "Generous bowl (220g fresh pasta)",
    ingredients: [
      "Fresh Egg Tagliatelle",
      "12-Hour Braised Beef & Pancetta Ragù",
      "San Marzano Tomatoes",
      "Trebbiano White Wine",
      "Grated Parmigiano Reggiano",
    ],
    allergens: ["Gluten", "Eggs", "Dairy", "Celery"],
    chefNote: "We simmer the ragù with whole milk and white wine for half a day until the meat becomes meltingly tender.",
  },
  {
    id: "cacio-e-pepe",
    name: "Tonnarelli Cacio e Pepe",
    description: "Handmade square-cut tonnarelli pasta, aged Pecorino Romano D.O.P., and toasted Tellicherry crushed black peppercorns.",
    price: 78000,
    category: "pasta",
    image: img(PHOTO.pasta, 800),
    tags: ["vegetarian"],
    rating: 4.8,
    prepTime: "10 min",
    calories: "710 kcal",
    portion: "Standard pasta bowl (200g)",
    ingredients: [
      "Semolina Tonnarelli",
      "Pecorino Romano D.O.P.",
      "Toasted Whole Tellicherry Peppercorns",
      "Starchy Cooking Water",
    ],
    allergens: ["Gluten", "Dairy"],
    chefNote: "Peppercorns are toasted in a dry skillet to release volatile aromatic oils before cheese emulsion.",
  },
  {
    id: "amatriciana",
    name: "Rigatoni all'Amatriciana",
    description: "Crispy cured pork guanciale, San Marzano tomato sauce, fresh pecorino, and gentle Calabrian chili heat.",
    price: 85000,
    category: "pasta",
    image: img(PHOTO.pasta, 800),
    tags: ["spicy"],
    rating: 4.7,
    prepTime: "11 min",
    calories: "780 kcal",
    portion: "Standard bowl (210g)",
    spiceLevel: 1,
    ingredients: [
      "Bronze-Die Extruded Rigatoni",
      "Crisp Cured Guanciale",
      "San Marzano DOP Tomatoes",
      "Aged Pecorino",
      "Red Pepper Flakes",
    ],
    allergens: ["Gluten", "Dairy"],
    chefNote: "Fat rendered from authentic pork jowl (guanciale) creates the deeply savory sauce base.",
  },
  {
    id: "ragu-di-funghi",
    name: "Pappardelle ai Funghi",
    description: "Wide hand-cut pappardelle ribbons, wild forest mushroom ragù, fresh thyme, and white wine butter sauce.",
    price: 88000,
    category: "pasta",
    image: img(PHOTO.pasta, 800),
    tags: ["vegetarian"],
    rating: 4.7,
    prepTime: "12 min",
    calories: "740 kcal",
    portion: "Standard bowl (220g)",
    ingredients: [
      "Wide Egg Pappardelle",
      "Chanterelles & Cremini Mushrooms",
      "Thyme Butter Emulsion",
      "Aged Parmigiano",
    ],
    allergens: ["Gluten", "Eggs", "Dairy"],
    chefNote: "Rich earthy notes made entirely from forest fungi and sweet butter.",
  },
  {
    id: "linguine-vongole",
    name: "Linguine alle Vongole",
    description: "Fresh Manila clams in the shell, garlic slivers, white wine, cold-pressed olive oil, and chopped flat parsley.",
    price: 125000,
    category: "pasta",
    image: img(PHOTO.pasta, 800),
    rating: 4.8,
    prepTime: "14 min",
    calories: "690 kcal",
    portion: "Large bowl (240g with shellfish)",
    ingredients: [
      "Bronze-Cut Linguine",
      "Fresh Live Manila Clams",
      "Pinot Grigio Wine",
      "Garlic & Flat Parsley",
      "Calabrian Chili Touch",
    ],
    allergens: ["Gluten", "Molluscs / Shellfish"],
    chefNote: "Clams are steamed open in wine and garlic right in the saute pan to capture pure ocean broth.",
  },

  /* --- Starters --- */
  {
    id: "whipped-ricotta-toast",
    name: "Whipped Ricotta Crostini",
    description: "Creamy sheep's milk whipped ricotta on grilled sourdough, wildflower hot honey, roasted pistachios, and fresh lemon thyme.",
    price: 55000,
    category: "starters",
    image: img(PHOTO.starter, 800),
    tags: ["vegetarian"],
    popular: true,
    rating: 4.8,
    prepTime: "6 min",
    calories: "480 kcal",
    portion: "3 thick grilled crostini",
    ingredients: [
      "Wood-Fired Grilled Sourdough",
      "Whipped Sheep's Milk Ricotta",
      "Raw Infused Hot Honey",
      "Crushed Sicilian Pistachios",
      "Lemon Thyme Leaves",
    ],
    allergens: ["Gluten", "Dairy", "Tree Nuts (Pistachios)"],
    chefNote: "We bake the bread using the exact same sourdough levain as our pizza crust.",
  },
  {
    id: "shishito-peppers",
    name: "Blistered Shishito Peppers",
    description: "Charred sweet Japanese peppers, flaky Maldon sea salt, lemon cheek, and smoked paprika garlic aioli.",
    price: 42000,
    category: "starters",
    image: img(PHOTO.starter, 800),
    tags: ["vegetarian", "gluten-free", "spicy"],
    rating: 4.6,
    prepTime: "5 min",
    calories: "280 kcal",
    portion: "Sharing bowl for the table",
    spiceLevel: 1,
    ingredients: [
      "Fresh Shishito Peppers",
      "Maldon Flaky Sea Salt",
      "Smoked Paprika Garlic Dip",
      "Fresh Lemon",
    ],
    allergens: ["Eggs (Aioli)"],
    chefNote: "Blistered in a smoking-hot cast iron skillet with olive oil. One in ten is pleasantly fiery!",
  },
  {
    id: "polenta-fries",
    name: "Truffle Parmesan Polenta Fries",
    description: "Crispy fried golden polenta batons, white truffle oil, rosemary sea salt, and shaved 24-month parmesan.",
    price: 48000,
    category: "starters",
    image: img(PHOTO.starter, 800),
    tags: ["vegetarian"],
    rating: 4.7,
    prepTime: "7 min",
    calories: "510 kcal",
    portion: "Sharing cone / basket",
    ingredients: [
      "Coarse Italian Polenta",
      "White Truffle Essence",
      "Parmigiano Reggiano",
      "Fresh Rosemary Salt",
    ],
    allergens: ["Dairy"],
    chefNote: "Polenta is cooked, chilled overnight in trays, cut into thick fries, and fried to extreme crunch.",
  },
  {
    id: "burrata-heirloom",
    name: "Burrata & Heirloom Caprese",
    description: "300g whole creamy Italian burrata, heirloom garden tomatoes, emerald basil oil, and 12-year Modena balsamic glaze.",
    price: 68000,
    category: "starters",
    image: img(PHOTO.starter, 800),
    tags: ["vegetarian", "gluten-free"],
    rating: 4.9,
    prepTime: "5 min",
    calories: "540 kcal",
    portion: "Large plate to share",
    ingredients: [
      "Fresh Artisanal Burrata",
      "Multi-Colored Heirloom Tomatoes",
      "House Cold-Pressed Basil Oil",
      "Aged Balsamic of Modena",
    ],
    allergens: ["Dairy"],
    chefNote: "Tomatoes are lightly salted 10 minutes prior to awaken their natural juices.",
  },
  {
    id: "calamari-fritti",
    name: "Crispy Calamari Fritti",
    description: "Tender Monterey squid dusted in seasoned semolina, flash fried, with spicy San Marzano marinara dip and fresh lemon.",
    price: 58000,
    category: "starters",
    image: img(PHOTO.starter, 800),
    rating: 4.7,
    prepTime: "6 min",
    calories: "520 kcal",
    portion: "Basket with 2 house dips",
    ingredients: [
      "Fresh Squid Rings & Tentacles",
      "Fine Durum Semolina Flour",
      "Spicy Marinara Sauce",
      "Herb Aioli Dip",
      "Charred Lemon",
    ],
    allergens: ["Gluten", "Molluscs", "Eggs"],
    chefNote: "Flash fried for under 90 seconds so the squid remains tender, never rubbery.",
  },

  /* --- Desserts --- */
  {
    id: "signature-tiramisu",
    name: "Deny Signature Tiramisu",
    description: "Espresso-soaked Italian ladyfingers, velvety whipped mascarpone cream, dark chocolate shavings, and Valrhona cocoa dust.",
    price: 45000,
    category: "desserts",
    image: img(PHOTO.dessert, 800),
    tags: ["vegetarian"],
    popular: true,
    rating: 4.9,
    prepTime: "Chilled ready",
    calories: "460 kcal",
    portion: "Individual handcrafted glass / slice",
    ingredients: [
      "House Italian Savoiardi",
      "Lombardy Mascarpone",
      "Fresh Brewed Espresso",
      "Marsala Wine Touch",
      "Valrhona 70% Cocoa Dust",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    chefNote: "Rested in our cooling cellar for 24 hours to allow the coffee and mascarpone layers to harmonize.",
    story: "Prepared every morning following nonna's 1968 handwritten Italian recipe.",
  },
  {
    id: "pistachio-cannoli",
    name: "Bronte Pistachio Cannoli",
    description: "Crispy Marsala wine pastry shell filled to order with sweet sheep's ricotta cream, dark chocolate chips, and crushed Sicilian pistachios.",
    price: 42000,
    category: "desserts",
    image: img(PHOTO.dessert, 800),
    tags: ["vegetarian"],
    rating: 4.8,
    prepTime: "3 min",
    calories: "380 kcal",
    portion: "Pair of 2 filled cannoli",
    ingredients: [
      "Fried Cannoli Shells",
      "Sheep's Milk Ricotta",
      "Bronte Sicilian Pistachios",
      "Candied Orange Peel",
    ],
    allergens: ["Gluten", "Dairy", "Tree Nuts (Pistachios)"],
    chefNote: "Filled strictly upon order so the shell remains shatteringly crisp.",
  },
  {
    id: "vanilla-gelato",
    name: "Madagascar Vanilla Gelato",
    description: "Slow-churned artisan gelato made with whole jersey milk and double Madagascar bourbon vanilla beans.",
    price: 38000,
    category: "desserts",
    image: img(PHOTO.dessert, 800),
    tags: ["vegetarian", "gluten-free"],
    rating: 4.7,
    prepTime: "2 min",
    calories: "320 kcal",
    portion: "2 large scoops with waffle crisp",
    ingredients: [
      "Organic Jersey Cow Milk & Cream",
      "Bourbon Vanilla Pods",
      "Pure Cane Sugar",
    ],
    allergens: ["Dairy"],
    chefNote: "Churned daily at slower speeds for higher density and lower overrun.",
  },
  {
    id: "olive-oil-cake",
    name: "Ligurian Olive Oil Cake",
    description: "Moist sponge infused with cold-pressed Ligurian olive oil, orange blossom glaze, and sweet mascarpone chantilly.",
    price: 45000,
    category: "desserts",
    image: img(PHOTO.dessert, 800),
    tags: ["vegetarian"],
    rating: 4.7,
    prepTime: "Chilled ready",
    calories: "410 kcal",
    portion: "Generous cake slice",
    ingredients: [
      "Ligurian Extra Virgin Olive Oil",
      "Citrus Blossom Zest",
      "Fluffy Sponge Batter",
      "Mascarpone Chantilly",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    chefNote: "Surprisingly light with a bright herbal note that pairs perfectly with black coffee.",
  },
  {
    id: "affogato",
    name: "Classico Affogato al Caffè",
    description: "Scoop of creamy fior di latte gelato drowned in a freshly pulled double shot of single-origin espresso with almond biscotti.",
    price: 38000,
    category: "desserts",
    image: img(PHOTO.dessert, 800),
    tags: ["vegetarian", "gluten-free"],
    rating: 4.8,
    prepTime: "2 min",
    calories: "280 kcal",
    portion: "Served in chilled rocks glass",
    ingredients: [
      "Fior di Latte Gelato",
      "Single-Origin Micro-Lot Espresso",
      "Handmade Cantucci / Biscotto",
    ],
    allergens: ["Dairy", "Tree Nuts (Almond in biscuit)"],
    chefNote: "Pour the piping-hot espresso over the ice-cold gelato right at your table.",
  },

  /* --- Drinks --- */
  {
    id: "smoked-rosemary-spritz",
    name: "Smoked Rosemary Spritz",
    description: "Botanical non-alcoholic bitter aperitivo, sparkling mineral tonic, cold-pressed blood orange, and torched fresh garden rosemary.",
    price: 38000,
    category: "drinks",
    image: img(PHOTO.drink, 800),
    popular: true,
    rating: 4.8,
    prepTime: "3 min",
    calories: "90 kcal",
    portion: "Served in balloon goblet over ice",
    ingredients: [
      "Botanical Bitters (Zero Proof)",
      "Sicilian Blood Orange Cordial",
      "Fever-Tree Aromatic Tonic",
      "Torched Garden Rosemary Sprig",
    ],
    allergens: [],
    chefNote: "The rosemary sprig is lightly torched before serving, adding an intoxicating herbal aroma to every sip.",
  },
  {
    id: "nitro-cold-brew",
    name: "Signature Nitro Cold Brew",
    description: "Single-origin Ethiopian Yirgacheffe coffee beans steeped cold for 18 hours and charged with pure nitrogen.",
    price: 35000,
    category: "drinks",
    image: img(PHOTO.coffee, 800),
    rating: 4.8,
    prepTime: "1 min",
    calories: "5 kcal",
    portion: "16 oz cold glass",
    ingredients: [
      "Ethiopian Yirgacheffe Beans",
      "Triple Filtered Cold Water",
      "Food-Grade Nitrogen Infusion",
    ],
    allergens: [],
    chefNote: "Pours with a cascading Guinness-like foam head. Creamy mouthfeel with zero dairy or added sugar.",
  },
  {
    id: "single-origin-espresso",
    name: "Micro-Lot Double Espresso",
    description: "Direct-trade rotating seasonal beans, extracted at 9 bars of pressure with notes of jasmine, bergamot, and dark cacao.",
    price: 28000,
    category: "drinks",
    image: img(PHOTO.coffee, 800),
    tags: ["gluten-free"],
    rating: 4.7,
    prepTime: "1 min",
    calories: "2 kcal",
    portion: "Double shot (2 oz)",
    ingredients: ["100% Specialty Arabica Beans", "Filtered Soft Water"],
    allergens: [],
    chefNote: "Ground per shot with burr calibration monitored every morning.",
  },
  {
    id: "blood-orange-shrub",
    name: "Blood Orange Fermented Shrub",
    description: "Raw apple cider vinegar infused with crushed blood oranges, sparkling spring water, and crushed mint leaves.",
    price: 32000,
    category: "drinks",
    image: img(PHOTO.drink, 800),
    tags: ["gluten-free"],
    rating: 4.6,
    prepTime: "2 min",
    calories: "85 kcal",
    portion: "14 oz tall glass",
    ingredients: [
      "Fermented Fruit Shrub",
      "Sparkling Spring Water",
      "Fresh Mint",
      "Cane Sugar Balance",
    ],
    allergens: [],
    chefNote: "Natural gut-friendly acidity that refreshes the palate between rich pizza and pasta bites.",
  },
  {
    id: "botanical-mocktail",
    name: "Elderflower Botanical Fizz",
    description: "English elderflower cordial, cucumber ribbon, fresh pressed lime juice, and sparkling soda.",
    price: 35000,
    category: "drinks",
    image: img(PHOTO.drink, 800),
    tags: ["gluten-free"],
    rating: 4.7,
    prepTime: "3 min",
    calories: "110 kcal",
    portion: "Highball over crystal clear ice",
    ingredients: [
      "Elderflower Cordial",
      "English Cucumber Slivers",
      "Fresh Lime Juice",
      "Effervescent Club Soda",
    ],
    allergens: [],
    chefNote: "Crisp, floral, and ultra refreshing on a sunny afternoon.",
  },
  {
    id: "green-elixir",
    name: "Cold-Pressed Green Elixir",
    description: "Green gala apple, crisp celery, cold-pressed ginger root, fresh spinach, and key lime juice pressed fresh daily.",
    price: 35000,
    category: "drinks",
    image: img(PHOTO.drink, 800),
    tags: ["gluten-free"],
    rating: 4.6,
    prepTime: "2 min",
    calories: "120 kcal",
    portion: "12 oz bottle / chilled tumbler",
    ingredients: [
      "Green Apple",
      "Celery Stalk",
      "Wild Spinach",
      "Organic Ginger",
      "Key Lime",
    ],
    allergens: ["Celery"],
    chefNote: "Zero pasteurization, pressed cold each morning to retain all enzymes and vital minerals.",
  },
];

/* ==========================================================================
   CUSTOMER REVIEWS & COMMENTS DATA
   ========================================================================== */
export interface CustomerReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  badge?: string;
}

export const sampleReviews: Record<string, CustomerReview[]> = {
  "margherita-di-bufala": [
    {
      id: "rev-1",
      author: "Raditya Pratama",
      rating: 5,
      date: "Kemarin",
      comment: "Kerak sourdough-nya luar biasa renyah di luar tapi chewy di dalam. Tomat San Marzano-nya manis asam alami, rasanya otentik banget!",
      badge: "Verified Diner",
    },
    {
      id: "rev-2",
      author: "Sarah Wijaya",
      rating: 5,
      date: "3 hari yang lalu",
      comment: "Keju buffalo mozzarella-nya lumer sempurna dan aroma daun basil segarnya wangi semerbak. Menu wajib tiap ke Deny Restaurant.",
      badge: "Regular Guest",
    },
  ],
  "double-smash": [
    {
      id: "rev-3",
      author: "Bimo Wicaksono",
      rating: 5,
      date: "2 hari yang lalu",
      comment: "Smash patty terbaik yang pernah saya coba. Bagian pinggir patty-nya garing berkaramel, saus rahasianya nagih abis!",
      badge: "Burger Lover",
    },
    {
      id: "rev-4",
      author: "Dimas Anggara",
      rating: 4,
      date: "1 minggu yang lalu",
      comment: "Dagingnya juicy, kejunya meleleh sampai ke roti brioche yang lembut hangat. Kentang gorengnya juga renyah.",
      badge: "Verified Diner",
    },
  ],
  "truffle-pepperoni": [
    {
      id: "rev-5",
      author: "Nadia Utami",
      rating: 5,
      date: "4 hari yang lalu",
      comment: "Kombinasi minyak truffle dan hot chili honey-nya bener-bener genius! Pedas, manis, gurihnya seimbang banget.",
      badge: "Verified Diner",
    },
  ],
  "tagliatelle-al-tartufo": [
    {
      id: "rev-6",
      author: "Jessica Tania",
      rating: 5,
      date: "Kemarin",
      comment: "Aroma black truffle-nya mewah banget. Tekstur pasta buatan tangannya sangat kenyal pas (al dente). Worth every penny!",
      badge: "Verified Diner",
    },
  ],
  "signature-tiramisu": [
    {
      id: "rev-7",
      author: "Kevin Chandra",
      rating: 5,
      date: "2 hari yang lalu",
      comment: "Tiramisu paling creamy dan kopinya berasa banget tanpa bikin enek. Mascarpone-nya lembut meleleh di lidah.",
      badge: "Sweet Tooth",
    },
  ],
  "smoked-rosemary-spritz": [
    {
      id: "rev-8",
      author: "Alya Putri",
      rating: 5,
      date: "3 hari yang lalu",
      comment: "Presentasinya keren banget pas disajikan masih ada asap rosemary bakar. Rasanya segar dan cocok buat penutup makan pizza.",
      badge: "Verified Diner",
    },
  ],
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id);
};

export const getRandomRecommendations = (
  currentId: string,
  count = 3
): MenuItem[] => {
  const others = menuItems.filter((item) => item.id !== currentId);
  return [...others].sort(() => 0.5 - Math.random()).slice(0, count);
};

/* ==========================================================================
   STAFF PROFILES (Replacing the old dishes page)
   ========================================================================== */
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  experience: string;
  badge: string;
  bio: string;
  quote: string;
  specialty: string;
  favoriteDish: string;
  image: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: "deny-pratama",
    name: "Deny Pratama",
    role: "Founder & Executive Chef",
    department: "Kitchen Masters",
    experience: "14+ Years in Culinary Arts",
    badge: "Founder & Visionary",
    bio: "Trained in Naples and Lyon, Chef Deny founded Deny Restaurant with a relentless obsession: stripping away formal pretenses while holding fast to uncompromising culinary rigor and fire cooking.",
    quote: "A great plate of food needs no pretension, just honest fire, true sourdough patience, and respect for who eats it.",
    specialty: "Wood-Fired Fermentation & Charcoal Technique",
    favoriteDish: "Margherita di Bufala",
    image: "/staff/deny-pratama.webp",
  },
  {
    id: "marco-rossi",
    name: "Marco Rossi",
    role: "Head Pizzaiolo & Dough Alchemist",
    department: "Kitchen Masters",
    experience: "11 Years Wood-Fired Pizza",
    badge: "Naples Certified",
    bio: "Born in Caserta, Marco manages our 48-hour cold fermentation room and our 900°F refractory brick oven. He measures humidity, ambient heat, and flour hydration twice daily.",
    quote: "The pizza is alive. If you rush the fermentation by even three hours, the oven knows, and you taste the difference.",
    specialty: "48-Hour Cold Proofing & High-Heat Baking",
    favoriteDish: "Truffle Pepperoni",
    image: "/staff/marco-rossi.webp",
  },
  {
    id: "sofia-bianchi",
    name: "Sofia Bianchi",
    role: "Master Pasta Artisan",
    department: "Kitchen Masters",
    experience: "9 Years Traditional Sfloglina",
    badge: "Hand-Rolled Specialist",
    bio: "Sofia learned pasta rolling from her grandmother in Emilia-Romagna. She rolls and cuts every ribbon of tagliatelle and pappardelle by hand with traditional maple rolling pins.",
    quote: "A pasta machine cannot feel the elasticity of the egg yolk. Your palms and rolling pin must do the talking.",
    specialty: "30-Yolk Silk Ribbons & Braised Ragù",
    favoriteDish: "Tagliatelle al Tartufo",
    image: "/staff/sofia-bianchi.webp",
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "Head Grillmaster & Burger Specialist",
    department: "Kitchen Masters",
    experience: "8 Years Craft Smash Griddles",
    badge: "Crust Master",
    bio: "David developed our bespoke cast-iron pressing technique that locks in juice while producing a lacy, crunchy caramelized edge on every single Angus smash patty.",
    quote: "The magic is in the sizzle and the millisecond contact with a screaming 500-degree surface.",
    specialty: "Lacy-Crust Smashes & Secret Relish Blends",
    favoriteDish: "Deny Double Smash",
    image: "/staff/david-chen.webp",
  },
  {
    id: "clara-laurent",
    name: "Clara Laurent",
    role: "Head Pastry & Dolci Chef",
    department: "Bakery & Dolci",
    experience: "10 Years Artisan Pastry",
    badge: "Dolci Master",
    bio: "Former pastry lead at Michelin-awarded bistros in Paris and Milan, Clara crafts our single-origin tiramisu, slow-churned gelato, and fresh-filled cannoli every morning.",
    quote: "Dessert is the final memory of a meal. It should be comforting, light, and leave a sweet smile.",
    specialty: "Espresso Tiramisu, Cannoli & Gelato",
    favoriteDish: "Signature Tiramisu",
    image: "/staff/clara-laurent.webp",
  },
  {
    id: "elena-vance",
    name: "Elena Vance",
    role: "Beverage Director & Mixologist",
    department: "Bar & Craft",
    experience: "7 Years Botanical Craft",
    badge: "Craft Alchemist",
    bio: "Elena heads our botanical bar, pairing wood-fired pizza and hearty pasta with zero-proof shrubs, single-origin nitro cold brews, and smoked rosemary mocktails.",
    quote: "A drink should elevate the dish, cleansing the palate and awakening fresh flavor notes.",
    specialty: "Botanical Fermentation & Smoked Spritzers",
    favoriteDish: "Smoked Rosemary Spritz",
    image: "/staff/elena-vance.webp",
  },
  {
    id: "julian-meyer",
    name: "Julian Meyer",
    role: "General Manager & Hospitality Lead",
    department: "Hospitality",
    experience: "12 Years Guest Experience",
    badge: "Warm Host",
    bio: "Julian orchestrates the dining room with seamless warmth. He ensures every guest feels at home, whether grabbing a 12-minute casual lunch or spending the evening with family.",
    quote: "Hospitality is not about rules; it is about remembering people, smiling, and making every plate feel like home.",
    specialty: "Fast-Casual Flow & Warm Community Hospitality",
    favoriteDish: "Whipped Ricotta Crostini",
    image: "/staff/julian-meyer.webp",
  },
  {
    id: "aria-santos",
    name: "Aria Santos",
    role: "Head of Farm Partnerships & Sourcing",
    department: "Hospitality",
    experience: "8 Years Sustainable Agriculture",
    badge: "Farm Direct",
    bio: "Aria visits our dairy farmers, flour millers, and vegetable growers weekly. She ensures 100% trace-to-source integrity across every ingredient that enters our kitchen.",
    quote: "Great cooking starts six weeks before the pan, out in the soil with our local farmers.",
    specialty: "Organic Sourcing & Zero-Waste Logistics",
    favoriteDish: "Burrata & Heirloom Caprese",
    image: "/staff/aria-santos.webp",
  },
];

export const getStaffMemberById = (id: string): StaffMember | undefined => {
  return staffMembers.find((staff) => staff.id === id);
};

export const getRandomOtherStaff = (
  currentId: string,
  count = 3
): StaffMember[] => {
  const others = staffMembers.filter((staff) => staff.id !== currentId);
  return [...others].sort(() => 0.5 - Math.random()).slice(0, count);
};

/* ==========================================================================
   STORY
   ========================================================================== */
export const storyStats = [
  { value: "10+", label: "Years of Cooking" },
  { value: "900°F", label: "Wood-Fired Oven" },
  { value: "48h", label: "Dough Fermentation" },
  { value: "15 min", label: "Average Wait Time" },
];

export const storyTimeline = [
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

export const storyValues = [
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
] as const;

export const storyTeam = [
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
] as const;

export const storyImages = {
  oven: img(PHOTO.pizza, 1000),
  pasta: img(PHOTO.pasta, 800),
  burger: img(PHOTO.burger, 800),
};
