<script setup lang="ts">
import logo from '~/assets/images/logo.webp';

const { t } = useI18n();
const { site, initClient } = useSite();
const siteUrl = useSiteConfig().url;
const { gaId } = useRuntimeConfig().public;
// hreflang (4 bahasa + x-default), canonical, og:url, og:locale → dari @nuxtjs/i18n (butuh i18n.baseUrl)
const i18nHead = useLocaleHead({ lang: true, seo: true });

const developer = {
  '@type': 'Organization',
  name: 'Bidtech',
  alternateName: 'PT Bidtech Solusi Teknologi',
  url: 'https://www.bidtech.co.id',
  description: 'Software House Batam - Jasa Pembuatan Website, Aplikasi Mobile, dan Sistem Informasi Profesional di Batam',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Batam',
    addressRegion: 'Kepulauan Riau',
    addressCountry: 'ID',
  },
};

const agency = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  additionalType: 'https://schema.org/AutoRental',
  '@id': `${siteUrl}/#organization`,
  name: site.brandName,
  alternateName: site.shortName,
  legalName: site.legalName,
  url: siteUrl,
  logo: siteUrl + logo,
  image: siteUrl + logo,
  telephone: `+${site.admins[0]?.phone}`,
  sameAs: Object.values(site.socials),
  areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
  currenciesAccepted: 'IDR, MYR, SGD',
  paymentAccepted: 'QRIS, Bank Transfer',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 1.1301,
    longitude: 104.0529,
  },
  creator: developer,
  publisher: developer,
  contactPoint: site.admins.map((a) => ({
    '@type': 'ContactPoint',
    telephone: `+${a.phone}`,
    contactType: 'customer service',
    availableLanguage: ['en', 'ms', 'zh', 'id'],
  })),
  // TODO(OQ-13): tambahkan "address" bila klien sudah memberi alamat kantor
};

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: [
    ...(i18nHead.value.meta ?? []),
    { name: 'author', content: 'Bidtech — Software House Batam (https://www.bidtech.co.id)' },
    { name: 'publisher', content: 'Bidtech' },
    { name: 'developer', content: 'Bidtech — Software House Batam (www.bidtech.co.id)' },
    { name: 'creator', content: 'Bidtech' },
    { name: 'geo.region', content: 'ID-KR' },
    { name: 'geo.placename', content: 'Batam, Kepulauan Riau, Indonesia' },
    { name: 'geo.position', content: '1.1301;104.0529' },
    { name: 'ICBM', content: '1.1301, 104.0529' },
  ],
  titleTemplate: (title?: string) => (title ? `${title} | ${t('meta.titleSuffix')}` : t('meta.siteTitle')),
  script: [
    // Tema sebelum paint (tanpa kedip): default terang; gelap hanya bila pengunjung memilihnya (ft_theme). Kelas di <html> tidak dirender Vue → hidrasi aman.
    {
      key: 'theme',
      tagPosition: 'head',
      innerHTML: `try{if(localStorage.getItem('ft_theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
    },
    { key: 'ld-agency', type: 'application/ld+json', innerHTML: JSON.stringify(agency) },
    ...(gaId
      ? [
          { key: 'ga', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
          { key: 'ga-init', innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');` },
        ]
      : []),
  ],
}));
useSeoMeta({
  ogSiteName: site.brandName,
  ogType: 'website',
  ogImage: siteUrl + logo,
  twitterCard: 'summary_large_image',
  creator: 'Bidtech (www.bidtech.co.id)',
});

onNuxtReady(initClient);
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <Header />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <Footer />
    <WhatsappFloater />
  </div>
</template>
