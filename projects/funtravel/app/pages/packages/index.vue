<script setup lang="ts">
import { CheckCircle2, Info, Ship } from '@lucide/vue';
import data from '~/assets/data/packages.json';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { loc, img, pkgPrice, fxNote, facility, ferryAddOn } = useSite();

useSeoMeta({
  title: () => t('packages.metaTitle'),
  description: () => t('packages.metaDescription', { price: Math.min(...data.packages.map((p) => p.price)) }),
});

const filter = ref('all');
const tabs = computed(() => [
  { id: 'all', label: t('packages.filterAll') },
  { id: 'batam', label: t('packages.filterBatam') },
  { id: 'batam-bintan', label: t('packages.filterBatamBintan') },
  { id: 'full-board', label: t('packages.filterFullBoard') },
]);
const visible = (p: (typeof data.packages)[number]) => filter.value === 'all' || (filter.value === 'full-board' ? p.fullBoard : p.region === filter.value);
</script>

<template>
  <div>
    <section class="section">
      <div class="wrap">
        <h1 class="text-3xl font-extrabold text-navy sm:text-5xl">{{ t('packages.title') }}</h1>
        <p class="mt-2 max-w-2xl text-lg text-muted">{{ t('packages.intro') }}</p>
        <p v-if="locale === 'id'" class="mt-4 flex gap-2 rounded-xl bg-sky/15 p-4 text-sm font-semibold text-navy">
          <Info aria-hidden="true" class="h-5 w-5 shrink-0 text-ocean" />{{ t('packages.localBanner') }}
        </p>
        <p v-if="fxNote('package')" class="mt-2 text-xs text-muted">{{ fxNote('package') }}</p>

        <div role="tablist" :aria-label="t('packages.title')" class="mb-6 mt-8 flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            role="tab"
            type="button"
            :aria-selected="filter === tab.id"
            :class="['rounded-full px-4 py-2 text-sm font-bold transition', filter === tab.id ? 'bg-navy text-white' : 'bg-sand text-navy hover:bg-sun/40']"
            @click="filter = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Semua kartu tetap ada di HTML statis; filter hanya menyembunyikan (SEO aman) -->
        <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="p in data.packages" v-show="visible(p)" :key="p.slug">
            <article :data-accent="p.accent" class="flex h-full flex-col overflow-hidden rounded-card border-t-4 border-t-[var(--accent)] bg-white shadow-card">
              <div class="ph aspect-[4/3]" :data-label="t('common.photoComingSoon')">
                <img v-if="img(p.images[0])" :src="img(p.images[0])" :alt="loc(p.name)" loading="lazy">
                <span class="absolute left-3 top-3 z-10 rounded-xl border-4 border-white bg-[var(--accent)] px-3 py-1 text-lg font-black text-white shadow-card">{{ p.code }}</span>
              </div>
              <div class="flex flex-1 flex-col gap-3 p-5">
                <div class="flex flex-wrap gap-2">
                  <span class="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{{ t('common.duration', { days: p.days, nights: p.nights }) }}</span>
                  <span v-if="p.fullBoard" class="rounded-full bg-sun px-3 py-1 text-xs font-bold text-navy">{{ t('common.fullBoard') }}</span>
                </div>
                <h2 class="text-xl font-extrabold text-navy">
                  <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="hover:text-ocean">{{ loc(p.name) }}</NuxtLink>
                </h2>
                <p class="text-sm text-muted">
                  {{ t('common.from') }} <span class="brush text-2xl font-extrabold tabular-nums text-navy">{{ pkgPrice(p.price) }}</span> {{ t('common.perPax') }}
                </p>
                <ul class="grid gap-1.5 text-sm">
                  <li v-for="k in p.includes.slice(0, 4)" :key="k" class="flex gap-2">
                    <CheckCircle2 aria-hidden="true" class="h-4 w-4 shrink-0 text-palm" />{{ facility(k).label }}
                  </li>
                </ul>
                <div class="mt-auto space-y-3 pt-2">
                  <p class="flex gap-2 text-xs text-muted">
                    <Ship aria-hidden="true" class="h-4 w-4 shrink-0 text-ocean" />
                    <span>{{ t('package.ferryText') }} {{ ferryAddOn(p.sgAddOn) }}</span>
                  </p>
                  <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="btn-primary w-full">{{ t('common.viewDetails') }}</NuxtLink>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <Cta />
  </div>
</template>
