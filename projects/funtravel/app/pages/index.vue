<script setup lang="ts">
import { BadgeCheck, CheckCircle2, Heart, Ship, ShieldCheck, Tag } from '@lucide/vue';
import faqs from '~/assets/data/faqs.json';
import pkgData from '~/assets/data/packages.json';
import vehData from '~/assets/data/vehicles.json';

const { t } = useI18n();
const localePath = useLocalePath();
const { loc, img, pkgPrice, vehPrice, fxNote, facility, ferryAddOn, scheme } = useSite();

useSeoMeta({ description: () => t('meta.siteDescription') });

const featuredPackages = pkgData.packages.filter((p) => p.featured);
const featuredVehicles = vehData.vehicles.filter((v) => v.featured);
const homeFaqs = faqs.filter((f) => f.home);
const trust = computed(() => [
  { icon: ShieldCheck, label: t('home.trustSafe') },
  { icon: Tag, label: t('home.trustPrice') },
  { icon: Heart, label: t('home.trustHappy') },
  { icon: BadgeCheck, label: t('home.trustCompany') },
]);
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-b from-sky/25 via-sand to-white">
      <div class="wrap grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p class="mb-4 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-bold text-ocean shadow-card">{{ t('home.heroChip') }}</p>
          <h1 class="text-4xl font-extrabold leading-tight text-navy sm:text-6xl">{{ t('home.heroTitle') }}</h1>
          <p class="font-script mt-3 text-2xl text-ocean sm:text-3xl">{{ t('home.heroScript') }}</p>
          <p class="mt-5 max-w-xl text-lg text-ink">{{ t('home.heroSubtitle') }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink :to="localePath('/packages')" class="btn-primary">{{ t('home.ctaPackages') }}</NuxtLink>
            <NuxtLink :to="localePath('/vehicles')" class="btn-secondary">{{ t('home.ctaVehicles') }}</NuxtLink>
          </div>
        </div>
        <!-- Foto hero: letakkan di app/assets/images/home/hero.webp -->
        <div class="ph aspect-[4/3] rounded-card shadow-card" data-label="Batam & Bintan">
          <img v-if="img('home/hero.webp')" :src="img('home/hero.webp')" alt="Batam & Bintan" fetchpriority="high">
        </div>
      </div>
    </section>

    <!-- Trust bar -->
    <section class="border-y border-navy/10 bg-white">
      <div class="wrap grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
        <p v-for="item in trust" :key="item.label" class="flex items-center gap-3 text-sm font-bold text-navy">
          <component :is="item.icon" aria-hidden="true" class="h-7 w-7 shrink-0 text-ocean" />{{ item.label }}
        </p>
      </div>
    </section>

    <!-- Paket terpopuler -->
    <section class="section">
      <div class="wrap">
        <h2 class="text-2xl font-extrabold text-navy sm:text-4xl">{{ t('home.popularPackages') }}</h2>
        <p class="mb-8 mt-2 text-muted">{{ t('home.popularPackagesIntro') }}</p>
        <p v-if="fxNote('package')" class="-mt-6 mb-6 text-xs text-muted">{{ fxNote('package') }}</p>
        <div class="snap-row -mx-4 flex gap-5 overflow-x-auto px-4 pb-4">
          <article
            v-for="p in featuredPackages"
            :key="p.slug"
            :data-accent="p.accent"
            class="flex w-[85%] shrink-0 flex-col overflow-hidden rounded-card border-t-4 border-t-[var(--accent)] bg-white shadow-card sm:w-[46%] lg:w-[31.5%]"
          >
            <div class="ph aspect-[4/3]" :data-label="t('common.photoComingSoon')">
              <img v-if="img(p.images[0])" :src="img(p.images[0])" :alt="loc(p.name)" loading="lazy">
              <span class="absolute left-3 top-3 z-10 rounded-xl border-4 border-white bg-[var(--accent)] px-3 py-1 text-lg font-black text-white shadow-card">{{ p.code }}</span>
            </div>
            <div class="flex flex-1 flex-col gap-3 p-5">
              <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{{ t('common.duration', { days: p.days, nights: p.nights }) }}</span>
                <span v-if="p.fullBoard" class="rounded-full bg-sun px-3 py-1 text-xs font-bold text-navy">{{ t('common.fullBoard') }}</span>
              </div>
              <h3 class="text-xl font-extrabold text-navy">
                <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="hover:text-ocean">{{ loc(p.name) }}</NuxtLink>
              </h3>
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
        </div>
        <NuxtLink :to="localePath('/packages')" class="btn-outline mt-4">{{ t('common.allPackages') }}</NuxtLink>
      </div>
    </section>

    <!-- Banner sewa -->
    <section class="bg-navy text-white">
      <div class="wrap flex flex-col items-start gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-2xl font-extrabold sm:text-3xl">{{ t('home.rentalBanner') }}</h2>
          <p class="mt-1 text-white/80">{{ t('home.rentalBannerText') }}</p>
        </div>
        <NuxtLink :to="localePath('/vehicles')" class="btn-secondary">{{ t('home.ctaVehicles') }}</NuxtLink>
      </div>
    </section>

    <!-- Kendaraan terpopuler -->
    <section class="section">
      <div class="wrap">
        <h2 class="mb-8 text-2xl font-extrabold text-navy sm:text-4xl">{{ t('home.popularVehicles') }}</h2>
        <div class="snap-row -mx-4 flex gap-5 overflow-x-auto px-4 pb-4">
          <article v-for="v in featuredVehicles" :key="v.slug" class="flex w-[80%] shrink-0 flex-col overflow-hidden rounded-card bg-white shadow-card sm:w-[46%] lg:w-[23.5%]">
            <div class="ph aspect-[16/10]" :data-label="`${v.brand} ${v.model}`">
              <img v-if="img(v.images[0])" :src="img(v.images[0])" :alt="`${v.brand} ${v.model}`" loading="lazy">
            </div>
            <div class="flex flex-1 flex-col gap-3 p-5">
              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-bold uppercase tracking-wide text-muted">{{ t(`vehicle.category.${v.category}`) }}</span>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', v.type === 'car' ? 'bg-ocean text-white' : 'bg-sun text-navy']">{{ scheme(v.type) }}</span>
              </div>
              <h3 class="text-xl font-extrabold text-navy">
                <NuxtLink :to="`${localePath(`/vehicles/${v.slug}`)}#galeri`" class="hover:text-ocean">{{ v.brand }} {{ v.model }}</NuxtLink>
              </h3>
              <p class="mt-auto text-sm text-muted">
                {{ t('common.from') }} <span class="text-xl font-extrabold tabular-nums text-navy">{{ vehPrice(v.pricePerDay) }}</span> {{ t('common.perDay') }}
              </p>
              <NuxtLink :to="`${localePath(`/vehicles/${v.slug}`)}#galeri`" class="btn-primary w-full">{{ t('common.viewDetails') }}</NuxtLink>
            </div>
          </article>
        </div>
        <p v-if="fxNote('vehicle')" class="mt-2 text-xs text-muted">{{ fxNote('vehicle') }}</p>
        <NuxtLink :to="localePath('/vehicles')" class="btn-outline mt-4">{{ t('common.allVehicles') }}</NuxtLink>
      </div>
    </section>

    <!-- Destinasi (bagian dari paket; foto di app/assets/images/destinations/<id>.webp) -->
    <section class="bg-sand">
      <div class="section wrap">
        <h2 class="mb-8 text-2xl font-extrabold text-navy sm:text-4xl">{{ t('home.destinations') }}</h2>
        <ul class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          <li v-for="(d, i) in pkgData.destinations" :key="d.id" :class="i % 2 ? 'rotate-1' : '-rotate-1'">
            <figure class="rounded-md bg-white p-2 pb-3 shadow-card">
              <div class="ph aspect-square rounded" :data-label="loc(d.name)">
                <img v-if="img(d.image)" :src="img(d.image)" :alt="loc(d.name)" loading="lazy">
              </div>
              <figcaption class="font-script mt-2 text-center text-lg text-navy">{{ loc(d.name) }}</figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>

    <!-- Cara pesan -->
    <section class="section">
      <div class="wrap">
        <h2 class="mb-8 text-2xl font-extrabold text-navy sm:text-4xl">{{ t('home.howToTitle') }}</h2>
        <ol class="grid gap-5 md:grid-cols-3">
          <li v-for="n in 3" :key="n" class="rounded-card border border-navy/10 p-6">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sun text-lg font-black text-navy">{{ n }}</span>
            <h3 class="mt-4 text-lg font-extrabold text-navy">{{ t(`home.step${n}`) }}</h3>
            <p class="mt-1 text-muted">{{ t(`home.step${n}Text`) }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- FAQ singkat (lengkap di halaman Kontak) -->
    <section class="bg-sand">
      <div class="section wrap">
        <h2 class="mb-8 text-2xl font-extrabold text-navy sm:text-4xl">{{ t('faq.title') }}</h2>
        <div class="divide-y divide-navy/10 rounded-card border border-navy/10 bg-white">
          <details v-for="f in homeFaqs" :key="f.id" class="p-5">
            <summary class="cursor-pointer font-bold text-navy">{{ loc(f.q) }}</summary>
            <p class="mt-3 leading-relaxed text-muted">{{ loc(f.a) }}</p>
          </details>
        </div>
      </div>
    </section>

    <Cta />
  </div>
</template>
