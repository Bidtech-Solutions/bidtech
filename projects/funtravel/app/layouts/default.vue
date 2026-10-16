<script setup lang="ts">
import logo from '~/assets/images/logo.webp';

const { t } = useI18n();
const { site, initClient } = useSite();
const siteUrl = useSiteConfig().url;
const { gaId } = useRuntimeConfig().public;
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
  meta: [...(i18nHead.value.meta ?? []), { name: 'geo.region', content: 'ID-KR' }, { name: 'geo.placename', content: 'Batam' }],
  titleTemplate: (title?: string) => (title ? `${title} | ${t('meta.titleSuffix')}` : t('meta.siteTitle')),
  script: [
    { key: 'ld-agency', type: 'application/ld+json', innerHTML: JSON.stringify(agency) },
    ...(gaId
      ? [
          { key: 'ga', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
          { key: 'ga-init', innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');` },
        ]
      : []),
  ],
}));
useSeoMeta({ ogSiteName: site.brandName, ogType: 'website', ogImage: siteUrl + logo, twitterCard: 'summary_large_image' });

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
