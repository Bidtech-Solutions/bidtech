<script setup lang="ts">
import { Cog, Users } from '@lucide/vue';
import data from '~/assets/data/vehicles.json';

const { t } = useI18n();
const localePath = useLocalePath();
const { loc, img, fmt, vehPrice, fxNote, scheme } = useSite();

const min = (type: string) => Math.min(...data.vehicles.filter((v) => v.type === type).map((v) => v.pricePerDay));
useSeoMeta({
  title: () => t('vehicles.metaTitle'),
  description: () => t('vehicles.metaDescription', { carPrice: fmt(min('car'), 'IDR'), motorPrice: fmt(min('motorcycle'), 'IDR') }),
});

const filter = ref('all');
const tabs = computed(() => [
  { id: 'all', label: t('vehicles.filterAll') },
  { id: 'car', label: t('vehicles.filterCars') },
  { id: 'motorcycle', label: t('vehicles.filterMotorcycles') },
]);
</script>

<template>
  <div>
    <section class="section">
      <div class="wrap">
        <h1 class="text-3xl font-extrabold text-navy sm:text-5xl">{{ t('vehicles.title') }}</h1>
        <p class="mt-2 max-w-2xl text-lg text-muted">{{ t('vehicles.intro') }}</p>
        <p v-if="fxNote('vehicle')" class="mt-2 text-xs text-muted">{{ fxNote('vehicle') }}</p>

        <div role="tablist" :aria-label="t('vehicles.title')" class="mb-6 mt-8 flex flex-wrap gap-2">
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

        <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="v in data.vehicles" v-show="filter === 'all' || v.type === filter" :key="v.slug">
            <article class="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card">
              <div class="ph aspect-[16/10]" :data-label="`${v.brand} ${v.model}`">
                <img v-if="img(v.images[0])" :src="img(v.images[0])" :alt="`${v.brand} ${v.model}`" loading="lazy">
              </div>
              <div class="flex flex-1 flex-col gap-3 p-5">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold uppercase tracking-wide text-muted">{{ t(`vehicle.category.${v.category}`) }}</span>
                  <span :class="['rounded-full px-3 py-1 text-xs font-bold', v.type === 'car' ? 'bg-ocean text-white' : 'bg-sun text-navy']">{{ scheme(v.type) }}</span>
                </div>
                <h2 class="text-xl font-extrabold text-navy">
                  <NuxtLink :to="`${localePath(`/vehicles/${v.slug}`)}#galeri`" class="hover:text-ocean">{{ v.brand }} {{ v.model }}</NuxtLink>
                </h2>
                <p class="text-sm text-muted">{{ loc(v.tagline) }}</p>
                <ul class="flex flex-wrap gap-4 text-sm text-ink">
                  <li v-if="v.seats" class="flex items-center gap-1.5"><Users aria-hidden="true" class="h-4 w-4 text-ocean" />{{ t('common.seats', { count: v.seats }) }}</li>
                  <li v-if="v.transmission" class="flex items-center gap-1.5"><Cog aria-hidden="true" class="h-4 w-4 text-ocean" />{{ t(`common.transmission.${v.transmission}`) }}</li>
                </ul>
                <p class="mt-auto text-sm text-muted">
                  {{ t('common.from') }} <span class="text-xl font-extrabold tabular-nums text-navy">{{ vehPrice(v.pricePerDay) }}</span> {{ t('common.perDay') }}
                </p>
                <NuxtLink :to="`${localePath(`/vehicles/${v.slug}`)}#galeri`" class="btn-primary w-full">{{ t('common.viewDetails') }}</NuxtLink>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <Cta />
  </div>
</template>
