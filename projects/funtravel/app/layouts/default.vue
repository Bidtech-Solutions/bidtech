<script setup lang="ts">
import logo from '~/assets/images/logo.webp';

const { t } = useI18n();
const { site, initClient } = useSite();
const siteUrl = useSiteConfig().url;
const { gaId, googleSiteVerification, bingSiteVerification } = useRuntimeConfig().public;
// hreflang (4 bahasa + x-default), canonical, og:url, og:locale → dari @nuxtjs/i18n (butuh i18n.baseUrl)
const i18nHead = useLocaleHead({ lang: true, seo: true });

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
  priceRange: '$$',
  knowsLanguage: ['id', 'en', 'ms', 'zh'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  ...(site.email ? { email: site.email } : {}),
  contactPoint: site.admins.map((a) => ({
    '@type': 'ContactPoint',
    telephone: `+${a.phone}`,
    contactType: 'customer service',
    availableLanguage: ['en', 'ms', 'zh', 'id'],
  })),
  // TODO(OQ-xx): openingHoursSpecification & email menunggu data klien (site.json: openingHours, email)
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: site.brandName,
  inLanguage: ['id-ID', 'en', 'ms-MY', 'zh-Hans-SG'],
  publisher: { '@id': `${siteUrl}/#organization` },
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
    ...(googleSiteVerification ? [{ name: 'google-site-verification', content: googleSiteVerification }] : []),
    ...(bingSiteVerification ? [{ name: 'msvalidate.01', content: bingSiteVerification }] : []),
    { name: 'geo.region', content: 'ID-KR' },
    { name: 'geo.placename', content: 'Batam, Kepulauan Riau, Indonesia' },
    { name: 'geo.position', content: '1.1301;104.0529' },
    { name: 'ICBM', content: '1.1301, 104.0529' },
  ],
  titleTemplate: (title?: string) => (title ? `${title} | ${t('meta.titleSuffix')}` : t('meta.siteTitle')),
  script: [
    // Mode terang permanen: bersihkan kelas dark dan data ft_theme
    {
      key: 'theme',
      tagPosition: 'head',
      innerHTML: `try{document.documentElement.classList.remove('dark');localStorage.removeItem('ft_theme')}catch(e){}`,
    },
    { key: 'ld-agency', type: 'application/ld+json', innerHTML: JSON.stringify(agency) },
    { key: 'ld-website', type: 'application/ld+json', innerHTML: JSON.stringify(website) },
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
  ogImage: siteUrl + '/images/barelang-distant.webp', // default; halaman detail menimpa dengan foto produknya
  ogImageAlt: site.brandName,
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
