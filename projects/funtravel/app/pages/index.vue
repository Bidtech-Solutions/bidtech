<script setup lang="ts">
import {
  ArrowDown,
  ArrowRight,
  Bike,
  Car,
  Check,
  ChevronDown,
  Cog,
  KeyRound,
  Luggage,
  Ship,
  UserCheck,
  Users,
  X,
} from '@lucide/vue';
import faqs from '~/assets/data/faqs.json';
import pkgData from '~/assets/data/packages.json';
import vehData from '~/assets/data/vehicles.json';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { site, loc, img, pkgPrice, vehPrice, fxNote, facility, ferryAddOn, scheme, waUrl } = useSite();

useSeoMeta({
  title: () => t('home.metaTitle'),
  description: () => t('meta.siteDescription'),
});

useHead(() => ({
  script: [
    {
      key: 'ld-faq',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: locale.value,
        mainEntity: faqs.filter((f) => f.home).map((f) => ({ '@type': 'Question', name: loc(f.q), acceptedAnswer: { '@type': 'Answer', text: loc(f.a) } })),
      }),
    },
  ],
}));

// Interactive state
const selectedDeparture = ref<'MY' | 'SG'>('MY');
const activeCategory = ref<'ALL' | 'BATAM' | 'BINTAN' | 'FULL_BOARD'>('ALL');
const activeVehicleTab = ref<'all' | 'car' | 'motorcycle'>('all');
const openFaq = ref<string | null>(faqs[0]?.id || null);

// Modal Booking
const isModalOpen = ref(false);
const bookingCategory = ref<'package' | 'car' | 'scooter'>('package');
const selectedBookingItem = ref('');
const formName = ref('');
const formPhone = ref('');
const formDate = ref('');
const formPax = ref(2);
const formDeparture = ref('Johor Bahru (Stulang Laut)');
const formNotes = ref('');

const allPackages = computed(() => pkgData.packages);
const destinations = computed(() => pkgData.destinations);
const homeFaqs = computed(() => faqs.filter((f) => f.home));

const departureOptions = [
  { value: 'Johor Bahru (Stulang Laut)', label: 'Johor Bahru (Stulang Laut Ferry)' },
  { value: 'Johor Bahru (Pasir Gudang)', label: 'Johor Bahru (Pasir Gudang Ferry)' },
  { value: 'Singapore (HarbourFront)', label: 'Singapore (HarbourFront Ferry)' },
  { value: 'Singapore (Tanah Merah)', label: 'Singapore (Tanah Merah Ferry)' },
  { value: 'Pelabuhan Batam Centre', label: 'Pelabuhan Batam Centre' },
  { value: 'Pelabuhan Harbour Bay', label: 'Pelabuhan Harbour Bay' },
  { value: 'Bandara Hang Nadim Batam', label: 'Bandara Hang Nadim Batam' },
  { value: 'Hotel di Batam', label: 'Hotel di Batam' },
];

const filteredPackages = computed(() => {
  let list = allPackages.value;
  if (activeCategory.value === 'BATAM') {
    list = list.filter((p) => p.region === 'batam');
  } else if (activeCategory.value === 'BINTAN') {
    list = list.filter((p) => p.region === 'batam-bintan');
  } else if (activeCategory.value === 'FULL_BOARD') {
    list = list.filter((p) => p.fullBoard);
  }
  return list.slice(0, 3);
});

const vehTabs = computed(() => [
  { id: 'all', label: t('vehicles.filterAll') },
  { id: 'car', label: 'MOBIL' },
  { id: 'motorcycle', label: 'MOTOR' },
]);

const filteredVehicles = computed(() => {
  let list = [...vehData.vehicles];
  if (activeVehicleTab.value !== 'all') {
    list = list.filter((v) => v.type === activeVehicleTab.value);
  }
  list.sort((a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99));
  return list.slice(0, 3);
});

function openBookingModal(type: 'package' | 'car' | 'scooter', itemName = '') {
  bookingCategory.value = type;
  selectedBookingItem.value = itemName;
  isModalOpen.value = true;
}

function handleBookingSubmit() {
  const item = selectedBookingItem.value || (bookingCategory.value === 'package' ? 'Paket Wisata' : 'Rental Kendaraan');
  const message = [
    'Halo Fun Travel!',
    'Saya ingin memesan:',
    `• Kategori: ${bookingCategory.value.toUpperCase()}`,
    `• Pilihan: ${item}`,
    `• Nama: ${formName.value || 'Tamu'}`,
    `• No WhatsApp: ${formPhone.value || '-'}`,
    `• Tanggal Trip: ${formDate.value || 'Segera'}`,
    `• Jumlah Peserta/Unit: ${formPax.value}`,
    `• Jeti/Titik Penjemputan: ${formDeparture.value}`,
    `• Catatan Tambahan: ${formNotes.value || '-'}`,
    '',
    'Mohon info ketersediaan dan detailnya. Terima kasih!',
  ].join('\n');


  window.open(waUrl(message, 0), '_blank');
  isModalOpen.value = false;
}
</script>

<template>
  <div class="bg-[#F8FAFC] text-[#0F172A] selection:bg-ocean selection:text-white dark:bg-slate-950 dark:text-slate-100">
    <!-- ========================================== -->
    <!-- 1. HERO SECTION (MATCHING SCREENSHOT)      -->
    <!-- ========================================== -->
    <section class="wrap pt-6 pb-8 sm:pb-10">
      <div class="relative rounded-[2.25rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl min-h-[440px] sm:min-h-[500px] flex items-center px-6 py-12 sm:px-12 lg:px-16">
        <!-- Hero Tropical Seascape Background (Pemandangan Barelang Dari Jauh) -->
        <img
          src="/images/barelang-distant.webp"
          :alt="t('home.heroAlt')"
          width="1376"
          height="768"
          fetchpriority="high"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <!-- Dark Scrim Gradient on Left & Bottom for WCAG AAA Text Contrast -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#071638]/90 via-[#0c2452]/65 to-[#0e2c66]/20" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#061430]/90 via-[#07193f]/40 to-transparent" />

        <!-- Content Overlay (Left-aligned, Clean & Spacious) -->
        <div class="relative z-10 max-w-2xl space-y-4 sm:space-y-5">
          <!-- Main Bold Headline -->
          <h1 class="anim-fade-up text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] whitespace-pre-line">
            {{ t('home.heroTitle') }}
          </h1>

          <!-- Subtitle Description -->
          <p class="anim-fade-up delay-100 text-xs sm:text-sm lg:text-[15px] text-slate-200/95 font-normal leading-relaxed max-w-2xl">
            {{ t('home.heroSubtitle') }}
          </p>

          <!-- Action CTA Buttons -->
          <div class="anim-fade-up delay-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 w-full sm:w-auto">
            <a
              href="#packages"
              class="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-[#FFC72C] hover:bg-[#F2BD27] text-slate-950 font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{{ t('home.ctaPackages') }}</span>
              <ArrowDown class="w-4 h-4 stroke-[2.5]" />
            </a>
            <NuxtLink
              :to="localePath('/vehicles')"
              class="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#243c5a]/60 hover:bg-[#243c5a]/80 backdrop-blur-md border border-white/20 text-white font-bold text-sm sm:text-base transition-all active:scale-[0.98] hover:-translate-y-0.5 shadow-sm"
            >
              <Car class="w-4 h-4 text-slate-100" />
              <span>{{ t('home.ctaVehicles') }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 2. BEST-SELLING HOLIDAY PACKAGES           -->
    <!-- ========================================== -->
    <section id="packages" class="wrap scroll-mt-24 py-8 sm:py-10">
      <div class="space-y-8">
        <!-- Section Header & Filter Pills -->
        <div class="anim-fade-up flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
              {{ t('home.popularPackages') }}
            </h2>
            <p class="text-sm sm:text-base text-[#475569] mt-1 dark:text-slate-300">
              {{ t('home.popularPackagesIntro') }}
            </p>
          </div>

          <!-- Category Filter Pills (Responsif mobile w-full 3-kolom tanpa clipping, desktop flex pill) -->
          <div class="p-1 sm:p-1.5 bg-white rounded-2xl sm:rounded-full shadow-sm grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2 border border-[#E2E8F0] w-full sm:w-auto dark:bg-slate-900 dark:border-slate-800">
            <button
              v-for="f in [
                { id: 'ALL', label: t('common.allPackagesFilter') },
                { id: 'BATAM', label: t('common.batamOnlyFilter') },
                { id: 'BINTAN', label: t('common.bintanFilter') },
              ]"
              :key="f.id"
              type="button"
              @click="activeCategory = f.id as any"
              :class="[
                'min-h-[38px] sm:min-h-[40px] px-1.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center cursor-pointer active:scale-95',
                activeCategory === f.id ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300',
              ]"
            >
              {{ f.label }}
            </button>
          </div>
        </div>

        <!-- Packages Grid (Kembali ke awal: scroll ke bawah, 1 kolom di mobile, 2 di tablet, 3 di desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(p, idx) in filteredPackages"
            :key="p.slug"
            :class="[
              'anim-card bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-[0_4px_12px_rgba(30,64,175,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800',
              idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : 'delay-200',
            ]"
          >
            <!-- Visual Header with Image & Badges -->
            <div class="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-200 dark:bg-slate-700">
              <img
                v-if="img(p.images[0])"
                :src="img(p.images[0])"
                :alt="loc(p.name)"
                loading="lazy"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span class="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {{ t('common.duration', { days: p.days, nights: p.nights }) }}
              </span>
              <span class="absolute bottom-3 right-3 bg-[#1E40AF] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md tabular-nums">
                {{ t('common.from') }} {{ pkgPrice(p.price) }} {{ t('common.perPax') }}
              </span>
            </div>

            <div class="flex-1 flex flex-col px-1">
              <h3 class="text-lg font-extrabold text-slate-900 leading-snug mb-3 dark:text-white">
                <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">
                  {{ loc(p.name) }}
                </NuxtLink>
              </h3>

              <!-- Inclusions Checklist -->
              <ul class="space-y-2 text-xs font-medium text-slate-600 mb-4 dark:text-slate-300">
                <li v-for="k in p.includes.slice(0, 3)" :key="k" class="flex items-center gap-2">
                  <Check class="h-4 w-4 shrink-0 text-[#16A34A] stroke-[2.5]" />
                  <span>{{ facility(k).label }}</span>
                </li>
              </ul>

              <!-- Penegasan rute & terminal feri (Malaysia Base vs Singapore Add-on) -->
              <div class="mt-auto mb-4 rounded-xl border border-blue-100/90 bg-gradient-to-r from-blue-50/70 to-indigo-50/40 p-2.5 dark:border-slate-800 dark:bg-slate-800/50">
                <div class="flex items-center gap-1.5 font-extrabold text-[11px] text-[#1E40AF] dark:text-sky-400 mb-1">
                  <Ship class="w-3.5 h-3.5 text-[#1E40AF] shrink-0 dark:text-sky-400" />
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

              <NuxtLink
                :to="localePath(`/packages/${p.slug}`)"
                class="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-sm py-3 rounded-full shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                <span>{{ t('common.viewDetails') }}</span>
                <ArrowRight class="h-4 w-4" />
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- View All Packages Link -->
        <div class="flex justify-center pt-2">
          <NuxtLink
            :to="localePath('/packages')"
            class="inline-flex min-h-[44px] items-center justify-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-[#1E40AF] font-bold text-sm sm:text-base border border-[#E2E8F0] shadow-sm hover:shadow transition-all active:scale-[0.98] hover:-translate-y-0.5 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-sky-300 dark:border-slate-800"
          >
            <span>{{ t('common.allPackages') }}</span>
            <ArrowRight class="w-4 h-4 stroke-[2.5]" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 3. POPULAR VEHICLES & RENTAL FLEET         -->
    <!-- ========================================== -->
    <section id="vehicles" class="wrap scroll-mt-24 py-8 sm:py-10">
      <div class="space-y-8">
        <!-- Section Header & Filter Pills -->
        <div class="anim-fade-up flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
              {{ t('home.popularVehicles') }}
            </h2>
            <p class="text-sm sm:text-base text-[#475569] mt-1 dark:text-slate-300">
              {{ t('home.rentalBannerText') }}
            </p>
          </div>

          <!-- Category Filter Pills (Responsif mobile w-full 3-kolom, desktop flex pill) -->
          <div class="p-1 sm:p-1.5 bg-white rounded-2xl sm:rounded-full shadow-sm grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2 border border-[#E2E8F0] w-full sm:w-auto dark:bg-slate-900 dark:border-slate-800">
            <button
              v-for="f in vehTabs"
              :key="f.id"
              type="button"
              @click="activeVehicleTab = f.id as any"
              :class="[
                'min-h-[38px] sm:min-h-[40px] px-1.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center cursor-pointer active:scale-95',
                activeVehicleTab === f.id ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300',
              ]"
            >
              {{ f.label }}
            </button>
          </div>
        </div>

        <!-- Vehicles Grid (Sama persis seperti halaman /vehicles: 1 kolom mobile, 2 tablet, 3 desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(v, idx) in filteredVehicles"
            :key="v.slug"
            :class="[
              'anim-card group bg-white rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] border border-[#E2E8F0] shadow-[0_4px_12px_rgba(30,64,175,0.08)] dark:bg-slate-900 dark:border-slate-800',
              idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : 'delay-200',
            ]"
          >
            <!-- Foto + badge -->
            <NuxtLink :to="localePath(`/vehicles/${v.slug}`)" class="relative block rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-100 dark:bg-slate-800">
              <img
                v-if="img(v.images[0])"
                :src="img(v.images[0])"
                :alt="`${v.brand} ${v.model}`"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </NuxtLink>

            <div class="flex-1 flex flex-col px-1">
              <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mb-1 dark:text-white">
                <NuxtLink :to="localePath(`/vehicles/${v.slug}`)" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">{{ v.brand }} {{ v.model }}</NuxtLink>
              </h3>
              <p class="text-xs text-slate-500 leading-relaxed mb-3.5 line-clamp-2 dark:text-slate-400">{{ loc(v.tagline) }}</p>

              <!-- Spesifikasi 2x2 (sama untuk mobil & motor) -->
              <div class="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-700 bg-slate-50 rounded-xl p-2 sm:p-2.5 mb-3 border border-slate-100 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-1.5"><Users aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.seatsCount', { count: v.seats }) }}</div>
                <div class="flex items-center gap-1.5"><Luggage aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.luggageCount', { count: v.luggage }) }}</div>
                <div class="flex items-center gap-1.5"><Cog aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t(`common.transmission.${v.transmission}`) }}</div>
                <div class="flex items-center gap-1.5">
                  <component :is="v.type === 'car' ? UserCheck : KeyRound" aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />
                  {{ v.type === 'car' ? t('common.driverService') : t('common.selfDriveService') }}
                </div>
              </div>

              <!-- Harga & aksi -->
              <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                <span class="block text-[10px] font-semibold text-slate-400">{{ t('common.from') }}</span>
                <div class="flex items-baseline gap-1 mb-3">
                  <span class="text-xl sm:text-2xl font-extrabold text-[#1E40AF] tabular-nums dark:text-sky-400">{{ vehPrice(v.pricePerDay) }}</span>
                  <span class="text-xs text-slate-400 font-medium">{{ t('common.perDay') }}</span>
                </div>
                <NuxtLink
                  :to="localePath(`/vehicles/${v.slug}`)"
                  class="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-sm font-bold py-2.5 sm:py-3 px-4 rounded-full shadow-sm hover:shadow transition-all active:scale-[0.98]"
                >
                  <span>{{ t('common.viewDetails') }}</span>
                  <ArrowRight aria-hidden="true" class="h-4 w-4" />
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <!-- View All Vehicles Link -->
        <div class="flex justify-center pt-2">
          <NuxtLink
            :to="localePath('/vehicles')"
            class="inline-flex min-h-[44px] items-center justify-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-slate-50 text-[#1E40AF] font-bold text-sm sm:text-base border border-[#E2E8F0] shadow-sm hover:shadow transition-all active:scale-[0.98] hover:-translate-y-0.5 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-sky-300 dark:border-slate-800"
          >
            <span>{{ t('common.allVehicles') }}</span>
            <ArrowRight class="w-4 h-4 stroke-[2.5]" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 4. POPULAR DESTINATIONS BENTO GRID         -->
    <!-- ========================================== -->
    <section id="destinasi" class="wrap scroll-mt-24 py-8 sm:py-10 space-y-7">
      <div class="anim-fade-up">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
          {{ t('home.spotWisataTitle') }}
        </h2>
        <p class="text-sm sm:text-base text-[#475569] mt-1 max-w-xl dark:text-slate-300">
          {{ t('home.spotWisataDesc') }}
        </p>
      </div>

      <!-- Bento Grid with Real Photos from destinations array (Tema Biru Gelap - Borderless & Hover Only) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        <div
          v-for="(dest, i) in destinations"
          :key="dest.id"
          :class="[
            'anim-card group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#071330] shadow-[0_8px_24px_rgba(11,27,77,0.18)] hover:shadow-[0_16px_36px_rgba(14,35,95,0.32)] hover:-translate-y-1 transition-all duration-300',
            i === 0 ? 'md:col-span-6 h-64 sm:h-72 delay-75' : i === 1 ? 'md:col-span-3 h-64 sm:h-72 delay-150' : i === 2 ? 'md:col-span-3 h-64 sm:h-72 delay-200' : 'md:col-span-6 h-60 sm:h-64 delay-250',
          ]"
        >
          <img
            v-if="img(dest.image)"
            :src="img(dest.image)"
            :alt="loc(dest.name)"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <!-- Deep Midnight Blue Cinematic Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#06122d]/95 via-[#0b1b4d]/50 to-[#0b1b4d]/10 transition-opacity duration-300" />
          
          <!-- Island Badge (Warna Putih Polos Tanpa Titik) -->
          <span class="absolute top-3.5 left-3.5 bg-white/95 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
            {{ dest.island.toUpperCase() }}
          </span>

          <!-- Content Info Card -->
          <div class="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white flex flex-col justify-end">
            <h3 class="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors duration-200 mb-1">
              {{ loc(dest.name) }}
            </h3>
            <p class="text-xs text-slate-200/90 line-clamp-2 leading-relaxed">
              {{ loc(dest.summary) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 7. FREQUENTLY ASKED QUESTIONS (FAQ)        -->
    <!-- ========================================== -->
    <section id="faq" class="wrap scroll-mt-24 py-8 sm:py-10 space-y-7">
      <div class="anim-fade-up">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
          {{ t('faq.title') }}
        </h2>
        <p class="text-sm sm:text-base text-[#475569] mt-1 max-w-xl dark:text-slate-300">
          {{ t('faq.subtitle') }}
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(f, idx) in homeFaqs"
          :key="f.id"
          :class="[
            'anim-card bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-xs hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 transition-colors',
            idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : idx === 2 ? 'delay-200' : 'delay-250',
          ]"
        >
          <button
            type="button"
            :aria-expanded="openFaq === f.id"
            @click="openFaq = openFaq === f.id ? null : f.id"
            class="w-full px-5 py-4 sm:px-6 sm:py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors cursor-pointer dark:hover:bg-slate-800/50 dark:text-white"
          >
            <span>{{ loc(f.q) }}</span>
            <ChevronDown
              :class="['w-4 h-4 shrink-0 stroke-[2.5] transition-transform duration-300 ease-in-out', openFaq === f.id ? 'rotate-180 text-[#1E40AF] dark:text-sky-400' : 'text-slate-400']"
            />
          </button>
          <div
            class="grid transition-all duration-300 ease-in-out"
            :class="openFaq === f.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <p class="px-5 pb-5 pt-2 sm:px-6 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100 dark:text-slate-300 dark:border-slate-800">
                {{ loc(f.a) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 8. CONVERSION CTA BANNER                   -->
    <!-- ========================================== -->
    <Cta />

    <!-- ========================================== -->
    <!-- 9. INTERACTIVE BOOKING MODAL               -->
    <!-- ========================================== -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
      @click.self="isModalOpen = false"
    >
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] dark:bg-slate-900 dark:border-slate-800">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-ocean text-white flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold tracking-tight">{{ t('home.bookingTitle') }}</h3>
            <p class="text-xs text-blue-100">{{ t('home.bookingSubtitle') }}</p>
          </div>
          <button
            type="button"
            @click="isModalOpen = false"
            aria-label="Tutup modal"
            class="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleBookingSubmit" class="p-5 sm:p-6 space-y-4 overflow-y-auto">
          <!-- Type Tabs -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1.5 dark:text-white">Kategori Layanan</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="bookingCategory = 'package'"
                :class="[
                  'min-h-[42px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition active:scale-95 cursor-pointer',
                  bookingCategory === 'package' ? 'bg-ocean text-white border-ocean' : 'bg-slate-50 text-navy border-slate-200 dark:bg-slate-800/60 dark:text-white dark:border-slate-800',
                ]"
              >
                Paket Wisata
              </button>
              <button
                type="button"
                @click="bookingCategory = 'car'"
                :class="[
                  'min-h-[42px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition active:scale-95 cursor-pointer',
                  bookingCategory === 'car' ? 'bg-ocean text-white border-ocean' : 'bg-slate-50 text-navy border-slate-200 dark:bg-slate-800/60 dark:text-white dark:border-slate-800',
                ]"
              >
                Mobil + Supir
              </button>
              <button
                type="button"
                @click="bookingCategory = 'scooter'"
                :class="[
                  'min-h-[42px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition active:scale-95 cursor-pointer',
                  bookingCategory === 'scooter' ? 'bg-ocean text-white border-ocean' : 'bg-slate-50 text-navy border-slate-200 dark:bg-slate-800/60 dark:text-white dark:border-slate-800',
                ]"
              >
                Motor Matic
              </button>
            </div>
          </div>

          <!-- Specific Item -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Pilihan Paket / Unit</label>
            <input
              v-model="selectedBookingItem"
              type="text"
              placeholder="Contoh: Paket Batam 2D1N / Toyota Innova / Honda Scoopy"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
              required
            />
          </div>

          <!-- Name & Phone -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Nama Lengkap</label>
              <input
                v-model="formName"
                type="text"
                placeholder="Nama Anda"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">No. WhatsApp</label>
              <input
                v-model="formPhone"
                type="tel"
                placeholder="+60 / +65 / 08..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
                required
              />
            </div>
          </div>

          <!-- Date & Pax -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Tanggal Trip</label>
              <input
                v-model="formDate"
                type="date"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Jumlah Peserta / Unit</label>
              <input
                v-model="formPax"
                type="number"
                min="1"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
                required
              />
            </div>
          </div>

          <!-- Departure / Pickup -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1.5 dark:text-white">Jeti Keberangkatan / Titik Jemput</label>
            <CustomSelect
              v-model="formDeparture"
              :options="departureOptions"
              button-class="w-full h-11 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sm font-semibold"
              dropdown-class="w-full"
              align="left"
            />
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Catatan Tambahan (Opsional)</label>
            <textarea
              v-model="formNotes"
              rows="2"
              placeholder="Jam kedatangan feri / permintaan khusus..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
            ></textarea>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold py-3.5 px-4 rounded-full w-full text-sm sm:text-base shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span aria-hidden="true" class="icon-wa w-4 h-4 shrink-0" />
              <span>Kirim &amp; Hubungi via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
