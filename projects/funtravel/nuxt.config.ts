import tailwindcss from '@tailwindcss/vite';
import packagesData from './app/assets/data/packages.json';
import vehiclesData from './app/assets/data/vehicles.json';

// URL produksi tanpa "/" akhir. Dipakai canonical, hreflang, sitemap, robots, llms.txt.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://funtravel.example').replace(/\/$/, '');

// Kode URL = ISO 639-1 ("ms" untuk Melayu); nama file terjemahan mengikuti struktur proyek (my.json).
const locales = [
  { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json' },
  { code: 'en', language: 'en', name: 'English', file: 'en.json' },
  { code: 'ms', language: 'ms-MY', name: 'Bahasa Melayu', file: 'my.json' },
  { code: 'zh', language: 'zh-Hans-SG', name: '简体中文', file: 'zh.json' },
];

// Semua halaman yang di-prerender: 4 bahasa × halaman statis + detail dari data JSON.
const paths = [
  '',
  '/packages',
  '/vehicles',
  '/contact',
  ...packagesData.packages.map((p) => `/packages/${p.slug}`),
  ...vehiclesData.vehicles.map((v) => `/vehicles/${v.slug}`),
];

// llms.txt (bahasa Inggris) dibentuk dari data yang sama dengan halaman.
const facilities = packagesData.facilities as Record<string, { label: { en: string } }>;
const rm = (n: number) => `RM ${n}`;
const idr = (n: number) => `Rp ${n.toLocaleString('en-US')}`;

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-llms'],

  // 100% statis: `nuxt generate` → .output/public (disajikan Nginx). Tanpa server Node di produksi.
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      routes: locales.flatMap((l) => paths.map((p) => `/${l.code}${p}`)),
      crawlLinks: true,
      failOnError: true,
    },
  },

  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
      meta: [
        { name: 'theme-color', content: '#0B1B4D' },
        { name: 'format-detection', content: 'telephone=no, address=no, email=no' },
      ],
    },
  },

  runtimeConfig: {
    public: { gaId: '' }, // NUXT_PUBLIC_GA_ID (opsional)
  },

  // ── @nuxtjs/i18n ── https://next.i18n.nuxtjs.org
  i18n: {
    restructureDir: 'app/i18n', // app/i18n/{i18n.config.ts, locales/*.json}
    langDir: 'locales',
    locales,
    defaultLocale: 'en',
    strategy: 'prefix', // /id/…, /en/…, /ms/…, /zh/…
    baseUrl: siteUrl,
    detectBrowserLanguage: { useCookie: true, cookieKey: 'ft_locale', redirectOn: 'root', fallbackLocale: 'en' },
  },

  // ── @nuxtjs/sitemap & @nuxtjs/robots ── membaca `site` (nuxt-site-config)
  site: { url: siteUrl, name: 'FUN TRAVEL & TRANSPORT' },

  // ── nuxt-llms ──
  llms: {
    domain: siteUrl,
    title: 'FUN TRAVEL & TRANSPORT (PT Fun Batam Holiday)',
    description:
      'Travel agency in Batam, Indonesia. All-in Batam and Batam–Bintan holiday packages for international travellers from Malaysia and Singapore, plus car rental with driver and self-drive scooter rental.',
    sections: [
      {
        title: 'Holiday packages',
        description: 'Prices are "from" prices per person in MYR, departing from a Malaysian ferry terminal. Departing from Singapore has an add-on.',
        links: packagesData.packages.map((p) => ({
          title: `${p.code} — ${p.name.en}`,
          description: `From ${rm(p.price)}/pax. Includes: ${p.includes.map((k) => facilities[k]?.label.en).join('; ')}.`,
          href: `${siteUrl}/en/packages/${p.slug}`,
        })),
      },
      {
        title: 'Vehicle rental',
        description: 'Cars are always rented with a driver; scooters are self-drive. Prices in IDR per day.',
        links: vehiclesData.vehicles.map((v) => ({
          title: `${v.brand} ${v.model}`,
          description: `From ${idr(v.pricePerDay)}/day, ${v.type === 'car' ? 'with driver' : 'self-drive'}.`,
          href: `${siteUrl}/en/vehicles/${v.slug}`,
        })),
      },
      {
        title: 'Contact',
        links: [{ title: 'Contact, official payment methods and FAQ', description: 'WhatsApp admins, QRIS, bank accounts, frequently asked questions.', href: `${siteUrl}/en/contact` }],
      },
    ],
  },
});
