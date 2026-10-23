<script setup lang="ts">
import { ArrowRight, ArrowUpDown, CalendarDays, Hotel, MapPin, Search, Ship, Star, Utensils, X } from '@lucide/vue';
import data from '~/assets/data/packages.json';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const siteUrl = useSiteConfig().url;
const { loc, img, pkgPrice, fxNote, facility, ferryAddOn, waUrl } = useSite();

useSeoMeta({
  title: () => t('packages.metaTitle'),
  description: () => t('packages.metaDescription', { price: Math.min(...data.packages.map((p) => p.price)) }),
});
useHead(() => ({
  script: [
    {
      key: 'ld-collection',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('packages.metaTitle'),
        url: siteUrl + localePath('/packages'),
        inLanguage: locale.value,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: data.packages.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: siteUrl + localePath(`/packages/${x.slug}`), name: `${x.code} ${loc(x.name)}` })),
        },
      }),
    },
    {
      key: 'ld-breadcrumb',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: t('nav.home'), path: '/' },
          { name: t('nav.packages'), path: '/packages' },
        ].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: siteUrl + localePath(c.path) })),
      }),
    },
  ],
}));

type Pkg = (typeof data.packages)[number];
const filter = ref('all');
const searchQuery = ref('');
const sortBy = ref<'popular' | 'price-asc' | 'price-desc' | 'duration'>('popular');
const tabs = computed(() => [
  { id: 'all', label: t('packages.filterAll') },
  { id: 'batam', label: t('packages.filterBatam') },
  { id: 'batam-bintan', label: t('packages.filterBatamBintan') },
  { id: 'full-board', label: t('packages.filterFullBoard') },
]);
const matches = (p: Pkg) => {
  if (filter.value !== 'all' && (filter.value === 'full-board' ? !p.fullBoard : p.region !== filter.value)) return false;
  const q = searchQuery.value.toLowerCase().trim();
  return !q || `${p.code} ${loc(p.name)} ${p.includes.map((k) => facility(k).label).join(' ')}`.toLowerCase().includes(q);
};
const list = computed(() =>
  data.packages.filter(matches).sort((a, b) => {
    if (sortBy.value === 'price-asc') return a.price - b.price;
    if (sortBy.value === 'price-desc') return b.price - a.price;
    if (sortBy.value === 'duration') return b.days - a.days || a.price - b.price;
    return Number(b.featured) - Number(a.featured) || a.price - b.price;
  }),
);
const sortOptions = computed(() => [
  { value: 'popular', label: t('common.sortPopular') },
  { value: 'price-asc', label: t('common.sortPriceAsc') },
  { value: 'price-desc', label: t('common.sortPriceDesc') },
  { value: 'duration', label: t('common.sortDuration') },
]);
</script>

<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-4 dark:bg-slate-950">
    <!-- 1. Hero full-width: gradasi beranimasi + cari & urutkan -->
    <section class="relative z-20 flex items-center min-h-[420px] sm:min-h-[500px] bg-gradient-to-br from-[#BFDBFE] via-[#F8FAFC] to-[#FDE68A] bg-[length:300%_300%] animate-gradient pt-16 sm:pt-24 pb-16 sm:pb-20 dark:from-slate-900 dark:via-[#0B1B4D] dark:to-amber-950/40">
      <!-- Decorative ambient glow circles (terisolasi overflow-hidden agar tidak menyebabkan scrollbar dan tidak memotong dropdown) -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-amber-300/30 blur-3xl animate-float" />
        <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl animate-float [animation-delay:-4s]" />
      </div>

      <!-- Transisi halus menyatu dengan warna konten di bawahnya tanpa garis pembatas -->
      <div class="pointer-events-none absolute bottom-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent dark:from-slate-950 dark:via-slate-950/60" />

      <div class="wrap relative z-10">
        <div class="max-w-3xl">
          <h1 class="anim-fade-up text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] dark:text-white">
            {{ t('packages.title') }} <span class="text-[#1E40AF] dark:text-sky-400">Batam &amp; Bintan</span>
          </h1>
          <!-- Aksen garis kuning di bawah judul hero -->
          <div class="anim-fade-up delay-100 h-1.5 w-24 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-3.5 mb-4 shadow-xs" />
          <p class="anim-fade-up delay-100 text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl dark:text-slate-300">{{ t('packages.intro') }}</p>
        </div>

        <!-- Cari & urutkan -->
        <div class="anim-fade-up delay-150 mt-10 max-w-2xl mx-auto relative z-30">
          <div class="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl sm:rounded-full p-1.5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 dark:border-slate-700 dark:bg-slate-900/95">
            <div class="flex items-center gap-2.5 flex-1 pl-4 pr-2 py-1.5">
              <Search aria-hidden="true" class="w-4 h-4 text-slate-400 shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('common.searchPackagePlaceholder')"
                class="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden dark:text-slate-200"
              />
              <button v-if="searchQuery" type="button" class="text-slate-400 hover:text-slate-600 p-1 dark:hover:text-slate-200" @click="searchQuery = ''">
                <X aria-hidden="true" class="w-4 h-4" />
              </button>
            </div>
            <CustomSelect
              v-model="sortBy"
              :options="sortOptions"
              :prefix-text="t('common.sort')"
              button-class="h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-slate-200/70 dark:border-slate-700 text-slate-900 dark:text-white px-4 hover:bg-slate-200/70 dark:hover:bg-slate-700 shrink-0"
              dropdown-class="w-56"
            >
              <template #icon>
                <ArrowUpDown aria-hidden="true" class="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </template>
            </CustomSelect>
          </div>
        </div>
      </div>
    </section>

    <main class="wrap py-10 sm:py-14 space-y-6">
      <!-- Tab filter -->
      <div role="tablist" :aria-label="t('packages.title')" class="anim-fade-up delay-200 flex flex-wrap items-center gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          role="tab"
          type="button"
          :aria-selected="filter === tab.id"
          :class="[
            'min-h-[40px] rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer active:scale-95',
            filter === tab.id ? 'bg-[#1E40AF] text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800',
          ]"
          @click="filter = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="anim-fade-up delay-250 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-white">{{ t('packages.title') }}</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 dark:text-slate-400">{{ t('common.packagesSubtitle') }}</p>
        </div>
        <span class="text-xs font-bold text-slate-400 self-start sm:self-auto whitespace-nowrap">{{ t('common.packagesCount', { count: list.length }) }}</span>
      </div>

      <!-- Kartu paket (gaya sama dengan kartu kendaraan) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(p, idx) in list"
          :key="p.slug"
          :class="[
            'anim-card group bg-white rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] dark:bg-slate-900',
            idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : idx === 2 ? 'delay-200' : idx === 3 ? 'delay-250' : idx === 4 ? 'delay-300' : 'delay-350',
            p.featured ? 'border-2 border-amber-400/80 shadow-[0_6px_20px_rgba(250,204,21,0.12)]' : 'border border-[#E2E8F0] shadow-[0_4px_12px_rgba(30,64,175,0.08)] dark:border-slate-800',
          ]"
        >
          <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="relative block rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-100 dark:bg-slate-800">
            <img v-if="img(p.images[0])" :src="img(p.images[0])" :alt="loc(p.name)" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-black text-[#1E40AF] shadow-sm">{{ p.code }}</span>
            <span v-if="p.featured" class="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              <Star aria-hidden="true" class="h-3 w-3 fill-current" /> {{ t('common.popular') }}
            </span>
          </NuxtLink>

          <div class="flex-1 flex flex-col px-1">
            <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mb-3 dark:text-white">
              <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">{{ loc(p.name) }}</NuxtLink>
            </h3>

            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-800">
              <div class="flex items-center gap-1.5"><CalendarDays aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.durationLong', { days: p.days, nights: p.nights }) }}</div>
              <div class="flex items-center gap-1.5"><Hotel aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.hotelNights', { count: p.nights }) }}</div>
              <div class="flex items-center gap-1.5"><MapPin aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ p.region === 'batam' ? t('packages.filterBatam') : t('packages.filterBatamBintan') }}</div>
              <div class="flex items-center gap-1.5"><Utensils aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ p.fullBoard ? t('common.fullBoard') : t('common.breakfastHotel') }}</div>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-3">
              <span v-for="k in p.includes.slice(0, 3)" :key="k" class="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#1E40AF] dark:bg-slate-800 dark:text-sky-400">{{ facility(k).label }}</span>
            </div>

            <!-- Penegasan rute & terminal feri (Malaysia Base vs Singapore Add-on) -->
            <div class="mb-4 rounded-xl border border-blue-100/90 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-2.5 dark:border-slate-800 dark:bg-slate-800/50">
              <div class="flex items-center gap-1.5 font-extrabold text-[11px] text-[#1E40AF] dark:text-sky-400 mb-1">
                <Ship aria-hidden="true" class="h-3.5 w-3.5 shrink-0" />
                <span>{{ t('package.ferryTitle') }}</span>
              </div>
              <div class="space-y-1 text-[11px] leading-snug">
                <p class="flex items-start gap-1.5 text-slate-700 dark:text-slate-200">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-blue-100 text-[#1E40AF] dark:bg-blue-900/60 dark:text-sky-300 shrink-0">MY</span>
                  <span>{{ t('package.ferryTextMY') }}</span>
                </p>
                <p class="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 shrink-0">SG</span>
                  <span>{{ t('package.ferryTextSG') }}</span>
                </p>
              </div>
            </div>

            <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
              <span class="block text-[10px] font-semibold text-slate-400">{{ t('common.from') }}</span>
              <div class="flex items-baseline gap-1 mb-3">
                <span class="text-xl sm:text-2xl font-extrabold text-[#1E40AF] tabular-nums dark:text-sky-400">{{ pkgPrice(p.price) }}</span>
                <span class="text-xs text-slate-400 font-medium">{{ t('common.perPax') }}</span>
              </div>
              <NuxtLink
                :to="localePath(`/packages/${p.slug}`)"
                class="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-sm font-bold py-2.5 sm:py-3 px-4 rounded-full shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                <span>{{ t('common.viewDetails') }}</span>
                <ArrowRight aria-hidden="true" class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <p v-if="!list.length" class="text-center text-sm text-slate-500 py-10 dark:text-slate-400">{{ t('common.notFoundPackage') }}</p>
    </main>

    <Cta />
  </div>
</template>
