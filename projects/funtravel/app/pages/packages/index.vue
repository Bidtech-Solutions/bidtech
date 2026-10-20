<script setup lang="ts">
import { ArrowRight, ArrowUpDown, CalendarDays, Hotel, Info, MapPin, Search, Ship, Star, Utensils, X } from '@lucide/vue';
import data from '~/assets/data/packages.json';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { loc, img, pkgPrice, fxNote, facility, ferryAddOn, waUrl } = useSite();

useSeoMeta({
  title: () => t('packages.metaTitle'),
  description: () => t('packages.metaDescription', { price: Math.min(...data.packages.map((p) => p.price)) }),
});

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
</script>

<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-4 dark:bg-slate-950">
    <!-- 1. Hero full-width: gradasi beranimasi + cari & urutkan -->
    <section class="relative overflow-hidden flex items-center min-h-[420px] sm:min-h-[500px] bg-gradient-to-br from-[#BFDBFE] via-[#F8FAFC] to-[#FDE68A] bg-[length:300%_300%] animate-gradient border-b border-slate-200/80 pt-16 sm:pt-24 pb-16 sm:pb-20 dark:border-slate-800 dark:from-slate-900 dark:via-[#0B1B4D] dark:to-amber-950/40">
      <div class="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-amber-300/30 blur-3xl animate-float" />
      <div class="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl animate-float [animation-delay:-4s]" />

      <div class="wrap relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4 dark:text-white">{{ t('packages.metaTitle') }}</h1>
          <p class="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl dark:text-slate-300">{{ t('packages.intro') }}</p>
          <p v-if="locale === 'id'" class="mt-4 inline-flex items-start gap-2 rounded-xl bg-white/70 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/60 dark:text-sky-100">
            <Info aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('packages.localBanner') }}
          </p>
          <p v-if="fxNote('package')" class="mt-2 text-xs text-slate-500 dark:text-slate-400">{{ fxNote('package') }}</p>
        </div>

        <!-- Cari & urutkan -->
        <div class="mt-10 max-w-2xl mx-auto">
          <div class="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl sm:rounded-full p-1.5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 dark:border-slate-700 dark:bg-slate-900/95">
            <div class="flex items-center gap-2.5 flex-1 pl-4 pr-2 py-1.5">
              <Search aria-hidden="true" class="w-4 h-4 text-slate-400 shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari paket (cth: 3D2N, Bintan, Full Board)..."
                class="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden dark:text-slate-200"
              />
              <button v-if="searchQuery" type="button" class="text-slate-400 hover:text-slate-600 p-1 dark:hover:text-slate-200" @click="searchQuery = ''">
                <X aria-hidden="true" class="w-4 h-4" />
              </button>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-1.5 bg-slate-100 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
              <span class="inline-flex items-center gap-1 text-slate-400"><ArrowUpDown aria-hidden="true" class="h-3.5 w-3.5" />Urutkan:</span>
              <select v-model="sortBy" class="bg-transparent font-extrabold text-slate-900 focus:outline-hidden cursor-pointer dark:text-white">
                <option value="popular">Paling Populer</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="duration">Durasi Terlama</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="wrap py-10 sm:py-14 space-y-6">
      <!-- Tab filter -->
      <div role="tablist" :aria-label="t('packages.title')" class="flex flex-wrap items-center gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          role="tab"
          type="button"
          :aria-selected="filter === tab.id"
          :class="[
            'rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer',
            filter === tab.id ? 'bg-[#1E40AF] text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800',
          ]"
          @click="filter = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-white">{{ t('packages.title') }}</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-1 dark:text-slate-400">Ferry PP, hotel, transport + sopir, dan tour leader dalam satu paket — pilih, cek detail, lalu pesan via WhatsApp.</p>
        </div>
        <span class="text-xs font-bold text-slate-400 self-start sm:self-auto whitespace-nowrap">{{ list.length }} Paket</span>
      </div>

      <!-- Kartu paket (gaya sama dengan kartu kendaraan) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="p in list"
          :key="p.slug"
          :class="[
            'group bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900',
            p.featured ? 'border-2 border-amber-400/80 shadow-[0_6px_20px_rgba(250,204,21,0.12)]' : 'border border-[#E2E8F0] shadow-[0_4px_12px_rgba(30,64,175,0.08)] dark:border-slate-800',
          ]"
        >
          <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="relative block rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-100 dark:bg-slate-800">
            <img v-if="img(p.images[0])" :src="img(p.images[0])" :alt="loc(p.name)" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-black text-[#1E40AF] shadow-sm">{{ p.code }}</span>
            <span v-if="p.featured" class="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              <Star aria-hidden="true" class="h-3 w-3 fill-current" /> Populer
            </span>
          </NuxtLink>

          <div class="flex-1 flex flex-col px-1">
            <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mb-3 dark:text-white">
              <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">{{ loc(p.name) }}</NuxtLink>
            </h3>

            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-800">
              <div class="flex items-center gap-1.5"><CalendarDays aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.durationLong', { days: p.days, nights: p.nights }) }}</div>
              <div class="flex items-center gap-1.5"><Hotel aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ p.nights }} malam hotel</div>
              <div class="flex items-center gap-1.5"><MapPin aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ p.region === 'batam' ? t('packages.filterBatam') : t('packages.filterBatamBintan') }}</div>
              <div class="flex items-center gap-1.5"><Utensils aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ p.fullBoard ? t('common.fullBoard') : 'Sarapan hotel' }}</div>
            </div>

            <div class="flex flex-wrap gap-1.5 mb-3">
              <span v-for="k in p.includes.slice(0, 3)" :key="k" class="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#1E40AF] dark:bg-slate-800 dark:text-sky-400">{{ facility(k).label }}</span>
            </div>

            <!-- Catatan terminal ferry (wajib di setiap kartu paket) -->
            <p class="mb-4 flex items-start gap-1.5 text-[11px] text-slate-400">
              <Ship aria-hidden="true" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />
              <span>{{ t('package.ferryText') }} {{ ferryAddOn(p.sgAddOn) }}</span>
            </p>

            <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
              <span class="block text-[10px] font-semibold text-slate-400">{{ t('common.from') }}</span>
              <div class="flex items-baseline gap-1 mb-3">
                <span class="text-xl sm:text-2xl font-extrabold text-[#1E40AF] tabular-nums dark:text-sky-400">{{ pkgPrice(p.price) }}</span>
                <span class="text-xs text-slate-400 font-medium">{{ t('common.perPax') }}</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <a
                  :href="waUrl(t('whatsapp.packageQuick', { name: `${p.code} ${loc(p.name)}` }))"
                  target="_blank"
                  rel="noopener"
                  data-wa="package-card"
                  class="inline-flex items-center justify-center gap-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-bold py-2.5 px-3 rounded-full shadow-sm transition-all"
                >
                  <span aria-hidden="true" class="icon-wa h-3.5 w-3.5" />
                  <span>Pesan WA</span>
                </a>
                <NuxtLink
                  :to="localePath(`/packages/${p.slug}`)"
                  class="inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-full transition-all dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight aria-hidden="true" class="h-3.5 w-3.5" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>

      <p v-if="!list.length" class="text-center text-sm text-slate-500 py-10 dark:text-slate-400">Paket tidak ditemukan. Coba kata kunci lain.</p>
    </main>

    <Cta />
  </div>
</template>
