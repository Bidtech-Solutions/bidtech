export const categories = [
  { id: 1, name: "Smartphones", icon: "Smartphone", slug: "smartphones" },
  { id: 2, name: "Tablets", icon: "Tablet", slug: "tablets" },
  { id: 3, name: "Smartwatches", icon: "Watch", slug: "smartwatches" },
  { id: 4, name: "Audio & TWS", icon: "Headphones", slug: "audio" },
  { id: 5, name: "Accessories", icon: "BatteryCharging", slug: "accessories" },
];

export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    price: 24999000,
    originalPrice: 26999000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop", // Placeholder
    specs: ["256GB", "Titanium", "A17 Pro"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 21999000,
    originalPrice: 23999000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop", // Placeholder
    specs: ["512GB", "Snapdragon 8 Gen 3", "AI"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: 3,
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "Audio & TWS",
    price: 3999000,
    originalPrice: 4299000,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2070&auto=format&fit=crop", // Placeholder
    specs: ["Active Noise Cancellation", "USB-C"],
    isNew: false,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Xiaomi 14",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 11999000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2027&auto=format&fit=crop", // Placeholder
    specs: ["256GB", "Leica Optics", "HyperOS"],
    isNew: true,
    isBestseller: false,
  },
  {
    id: 5,
    name: "iPad Air (M2)",
    brand: "Apple",
    category: "Tablets",
    price: 10999000,
    originalPrice: 11499000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2027&auto=format&fit=crop", // Placeholder
    specs: ["M2 Chip", "11-inch", "Wi-Fi"],
    isNew: true,
    isBestseller: false,
  },
  {
    id: 6,
    name: "Galaxy Watch 6 Classic",
    brand: "Samsung",
    category: "Smartwatches",
    price: 5499000,
    originalPrice: 5999000,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop", // Placeholder
    specs: ["47mm", "LTE", "Rotating Bezel"],
    isNew: false,
    isBestseller: true,
  }
];

export const brands = [
  "Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Asus", "Realme", "Infinix"
];

export const usps = [
  { id: 1, title: "Garansi Resmi", description: "Semua produk bergaransi resmi", icon: "ShieldCheck" },
  { id: 2, title: "Pasti Original", description: "Jaminan 100% uang kembali", icon: "CheckCircle" },
  { id: 3, title: "Cicilan 0%", description: "Tersedia cicilan tanpa kartu kredit", icon: "CreditCard" },
  { id: 4, title: "Pelayanan Ramah", description: "Konsultasi jujur dan solutif setiap hari", icon: "HeartHandshake" },
];
