export const siteConfig = {
  url: "https://ironforce.example.com",

  brand: {
    name: "IRONFORCE",
    tagline: "Built For Strength",
    logo: "/images/logo.svg",
    icon: "/images/logo-icon.svg",
  },

  seo: {
    title: "IRONFORCE — Premium Fitness Experience",
    description:
      "Gym premium dengan fasilitas modern, trainer profesional, dan program latihan yang dirancang untuk membantu Anda mencapai performa terbaik.",
  },

  contact: {
    email: "hello@ironforce.com",
    phone: "+62 813-6764-825",
    whatsapp: "628136764825",
    address: "123 Power Ave, Gymtown",
  },

  navigation: [
    {
      label: "Fasilitas",
      href: "/fasilitas",
    },
    {
      label: "Trainer",
      href: "/trainer",
    },
    {
      label: "Membership",
      href: "/membership",
    },
    {
      label: "Testimoni",
      href: "/testimoni",
    },
    {
      label: "Lokasi",
      href: "/lokasi",
    },
  ],

  hero: {
    eyebrow: "Gym Premium untuk Gaya Hidup Sehat",

    title: {
      first: "Wujudkan Tubuh",
      second: "Impian.",
    },

    description:
      "Tempat latihan modern dengan fasilitas lengkap, pelatih profesional, dan suasana nyaman untuk membantu Anda mencapai tujuan kebugaran.",

    primaryCta: {
      label: "Daftar Sekarang",
    },

    secondaryCta: {
      label: "Lihat Fasilitas",
      href: "#fasilitas",
    },

    image: "/images/hero-gym.webp",
  },

  stats: [
    {
      value: "10K+",
      label: "Member Aktif",
    },
    {
      value: "50+",
      label: "Pelatih Profesional",
    },
    {
      value: "12",
      label: "Cabang Gym",
    },
    {
      value: "4.9",
      label: "Member Rating",
    },
  ],

  socials: {
    instagram: "#",
    youtube: "#",
    twitter: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
