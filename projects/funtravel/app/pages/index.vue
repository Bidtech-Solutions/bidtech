<script setup lang="ts">
import { ArrowRight, Car, Check, ChevronDown, Hotel, Info, Ship, Star, Utensils, X } from '@lucide/vue';
import faqs from '~/assets/data/faqs.json';
import pkgData from '~/assets/data/packages.json';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { site, loc, img, pkgPrice, vehPrice, fxNote, facility, ferryAddOn, scheme, waUrl } = useSite();

useSeoMeta({
  title: () => `${site.brandName} — Explore Batam & Bintan with Zero Hassle`,
  description: () => t('meta.siteDescription'),
});

// Interactive state
const selectedDeparture = ref<'MY' | 'SG'>('MY');
const activeCategory = ref<'ALL' | 'BATAM' | 'BINTAN' | 'FULL_BOARD'>('ALL');
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

const filteredPackages = computed(() => {
  if (activeCategory.value === 'BATAM') {
    return allPackages.value.filter((p) => p.region === 'batam');
  }
  if (activeCategory.value === 'BINTAN') {
    return allPackages.value.filter((p) => p.region === 'batam-bintan');
  }
  if (activeCategory.value === 'FULL_BOARD') {
    return allPackages.value.filter((p) => p.fullBoard);
  }
  return allPackages.value;
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


// Chip fitur banner VIP (paket A4 Full Board)
const vipChips = [
  { icon: Utensils, label: 'Meals', value: 'Full Board' },
  { icon: Hotel, label: 'Stay', value: 'Hotel + Breakfast' },
  { icon: Car, label: 'Transport', value: 'Dedicated MPV' },
  { icon: Ship, label: 'Ferry', value: 'Included' },
];
</script>

<template>
  <div class="bg-[#F8FAFC] text-[#0F172A] selection:bg-ocean selection:text-white dark:bg-slate-950 dark:text-slate-100">
    <!-- ========================================== -->
    <!-- 1. HERO SECTION (MATCHING SCREENSHOT)      -->
    <!-- ========================================== -->
    <section class="wrap pt-6 pb-8 sm:pb-10">
      <div class="relative rounded-3xl overflow-hidden shadow-lg min-h-[460px] sm:min-h-[520px] flex items-center px-6 py-12 sm:px-12 lg:px-16">
        <!-- Hero Tropical Seascape Background -->
        <img
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Jembatan_Barelang.jpg/1280px-Jembatan_Barelang.jpg"
          alt="Jembatan Barelang, Batam"
          fetchpriority="high"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <!-- Dark Scrim Gradient on Left for WCAG AAA Text Contrast -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B1B4D]/90 via-[#1E3A8A]/65 to-[#1E40AF]/25" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B1B4D]/70 via-transparent to-[#1E40AF]/15" />

        <!-- Content Overlay (Left-aligned, Clean & Spacious) -->
        <div class="relative z-10 max-w-2xl space-y-5">
          <!-- Top Specialist Badge -->
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEC71D] text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm">
            <Star aria-hidden="true" class="h-3.5 w-3.5 fill-current" />
            <span>BATAM &amp; BINTAN TOUR SPECIALIST</span>
          </div>

          <!-- Main Bold Headline -->
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Explore Batam &amp; Bintan with Zero Hassle
          </h1>

          <!-- Subtitle Description -->
          <p class="text-xs sm:text-base text-slate-200/90 font-normal leading-relaxed max-w-xl">
            Private car charters with driver, curated holiday packages, resort stays, and seamless ferry arrangements — tailored for Malaysia &amp; Singapore travelers.
          </p>

          <!-- Action CTA Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#packages"
              class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Packages</span>
              <ArrowRight class="w-4 h-4 stroke-[2.5]" />
            </a>
            <NuxtLink
              :to="localePath('/vehicles')"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              <Car class="w-4 h-4 text-[#FACC15]" />
              <span>Rent a Vehicle</span>
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
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
              Batam &amp; Bintan Holiday Packages
            </h2>
            <p class="text-sm sm:text-base text-[#475569] mt-1 dark:text-slate-300">
              All-inclusive packages with ferry, private transport, hotel, and guided tours.
            </p>
          </div>

          <!-- Category Filter Pills -->
          <div class="p-1.5 bg-white rounded-full shadow-sm flex items-center gap-2 border border-[#E2E8F0] self-start md:self-auto overflow-x-auto max-w-full dark:bg-slate-900 dark:border-slate-800">
            <button
              v-for="f in [
                { id: 'ALL', label: 'ALL PACKAGES' },
                { id: 'BATAM', label: 'BATAM ONLY' },
                { id: 'BINTAN', label: 'BINTAN ISLAND' },
              ]"
              :key="f.id"
              type="button"
              @click="activeCategory = f.id as any"
              :class="[
                'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer',
                activeCategory === f.id ? 'bg-[#1E40AF] text-white' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300',
              ]"
            >
              {{ f.label }}
            </button>
          </div>
        </div>

        <!-- Catatan mata uang (IDR → paket tetap MYR; MYR→SGD = estimasi kurs) -->
        <p v-if="fxNote('package')" class="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 -mt-4">
          <Info aria-hidden="true" class="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />
          <span>{{ fxNote('package') }}</span>
        </p>

        <!-- Packages Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="p in filteredPackages"
            :key="p.slug"
            class="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-[0_4px_12px_rgba(30,64,175,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col dark:bg-slate-900 dark:border-slate-800"
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

              <!-- Ferry terminal note (wajib di setiap kartu paket) -->
              <p class="mt-auto mb-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Ship class="w-3.5 h-3.5 text-[#1E40AF] shrink-0 dark:text-sky-400" />
                <span>{{ t('package.ferryText') }} {{ ferryAddOn(p.sgAddOn) }}</span>
              </p>

              <button
                type="button"
                @click="openBookingModal('package', loc(p.name))"
                class="w-full bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm py-3 rounded-full shadow-sm hover:shadow transition-all active:scale-[0.99] cursor-pointer"
              >
                Book Package
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 3. VIP GOURMET & ISLAND TOUR BANNER        -->
    <!-- ========================================== -->
    <section id="vip-tour" class="wrap scroll-mt-24 py-8 sm:py-10">
      <div class="relative rounded-3xl overflow-hidden shadow-xl min-h-[360px] flex items-center p-6 sm:p-10 lg:p-14">
        <!-- Background Dining Photo -->
        <img
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Barelang_Bridge_%2834095925856%29.jpg/1280px-Barelang_Bridge_%2834095925856%29.jpg"
          alt="3D2N Batam Full Board VIP Gourmet & Island Tour"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
        <!-- Deep Navy Gradient Scrim -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B1B4D]/95 via-[#1E3A8A]/85 to-[#1E40AF]/60" />

        <!-- VIP Content Grid -->
        <div class="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left 8 Cols: Title, Description & 4 Glassmorphism Chips -->
          <div class="lg:col-span-8 text-white">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3">
              3D2N Batam Full Board VIP Gourmet &amp; Island Tour
            </h2>
            <p class="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-2xl mb-7">
              Everything taken care of from arrival to departure. Enjoy resort accommodation, daily gourmet seafood feasts, return ferry tickets, and a dedicated MPV with driver throughout your trip.
            </p>

            <!-- 4 Glassmorphism Feature Chips -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              <div v-for="c in vipChips" :key="c.label" class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3">
                <div class="text-[#FACC15] text-xs font-bold mb-1 flex items-center gap-1.5">
                  <component :is="c.icon" aria-hidden="true" class="h-3.5 w-3.5" />
                  <span class="text-[10px] uppercase tracking-wider text-slate-300">{{ c.label }}</span>
                </div>
                <p class="text-xs sm:text-sm font-extrabold text-white">{{ c.value }}</p>
              </div>
            </div>
          </div>

          <!-- Right 4 Cols: Floating White Pricing Card -->
          <div class="lg:col-span-4 flex lg:justify-end">
            <div class="w-full max-w-xs bg-white rounded-2xl p-6 text-center shadow-2xl border border-white/40 dark:bg-slate-900">
              <span class="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                All-In Promo Price
              </span>
              <div class="text-3xl sm:text-4xl font-extrabold text-[#1E40AF] tabular-nums tracking-tight my-1 dark:text-sky-400">
                {{ pkgPrice(666) }}
              </div>
              <span class="block text-xs text-slate-500 dark:text-slate-400" :class="fxNote('package') ? 'mb-2' : 'mb-5'">per pax &bull; min 2 to go</span>
              <p v-if="fxNote('package')" class="mb-4 text-[11px] leading-snug text-slate-400">{{ fxNote('package') }}</p>
              <button
                type="button"
                @click="openBookingModal('package', '3D2N Batam Full Board VIP Gourmet & Island Tour')"
                class="w-full inline-flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span aria-hidden="true" class="icon-wa w-4 h-4" />
                <span>Book VIP via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 5. POPULAR DESTINATIONS BENTO GRID         -->
    <!-- ========================================== -->
    <section id="destinasi" class="wrap scroll-mt-24 py-8 sm:py-10 space-y-7">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="block text-[11px] font-extrabold uppercase tracking-widest text-[#1E40AF] mb-1 dark:text-sky-400">Destination Highlights</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
            Spot Wisata Ikonik Batam &amp; Bintan
          </h2>
          <p class="text-sm sm:text-base text-[#475569] mt-1 max-w-xl dark:text-slate-300">
            Jembatan megah Barelang, danau gurun pasir Bintan, pusat perbelanjaan bebas bea, dan kelezatan seafood kelong tepi laut.
          </p>
        </div>
        <button
          type="button"
          @click="openBookingModal('package', 'Custom Itinerary Destinasi Batam & Bintan')"
          class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ocean hover:text-navy transition cursor-pointer self-start md:self-auto dark:text-sky-400 dark:hover:text-white"
        >
          <span>Request Custom Tour</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Bento Grid with Real Photos from destinations array -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        <div
          v-for="(dest, i) in destinations"
          :key="dest.id"
          @click="openBookingModal('package', 'Tur Destinasi ' + loc(dest.name))"
          :class="[
            'group cursor-pointer relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300',
            i === 0 ? 'md:col-span-6 h-64 sm:h-72' : i === 1 || i === 2 ? 'md:col-span-3 h-64 sm:h-72' : 'md:col-span-6 h-60 sm:h-64',
          ]"
        >
          <img
            v-if="img(dest.image)"
            :src="img(dest.image)"
            :alt="loc(dest.name)"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
          <span class="absolute top-3.5 left-3.5 bg-white/95 text-navy text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
            {{ dest.island.toUpperCase() }}
          </span>
          <div class="absolute bottom-0 inset-x-0 p-5 text-white">
            <h3 class="text-base sm:text-lg font-extrabold mb-1 group-hover:text-sun transition-colors">
              {{ loc(dest.name) }}
            </h3>
            <p class="text-xs text-slate-200 line-clamp-2 leading-relaxed">
              {{ loc(dest.summary) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================== -->
    <!-- 7. FREQUENTLY ASKED QUESTIONS (FAQ)        -->
    <!-- ========================================== -->
    <section id="faq" class="wrap scroll-mt-24 py-8 sm:py-10 max-w-3xl space-y-8">
      <div class="text-center">
        <span class="block text-[11px] font-extrabold uppercase tracking-widest text-[#1E40AF] mb-1 dark:text-sky-400">Got Questions?</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-white">
          {{ t('faq.title') }}
        </h2>
        <p class="text-sm text-[#475569] mt-1 dark:text-slate-300">
          Pertanyaan yang sering diajukan mengenai tiket feri, prosedur sewa kendaraan, dan pembayaran.
        </p>
      </div>

      <div class="space-y-3">
        <div v-for="f in homeFaqs" :key="f.id" class="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <button
            type="button"
            :aria-expanded="openFaq === f.id"
            @click="openFaq = openFaq === f.id ? null : f.id"
            class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors cursor-pointer dark:hover:bg-slate-800/50 dark:text-white"
          >
            <span>{{ loc(f.q) }}</span>
            <ChevronDown
              :class="['w-4 h-4 shrink-0 stroke-[2.5] transition-transform duration-200', openFaq === f.id ? 'rotate-180 text-[#1E40AF] dark:text-sky-400' : 'text-slate-400']"
            />
          </button>
          <p v-if="openFaq === f.id" class="px-5 pb-4 pt-3 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100 dark:text-slate-300 dark:border-slate-800">
            {{ loc(f.a) }}
          </p>
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
            <h3 class="text-lg font-bold tracking-tight">Formulir Pemesanan WhatsApp</h3>
            <p class="text-xs text-blue-100">Harga resmi operator langsung tanpa biaya perantara</p>
          </div>
          <button
            type="button"
            @click="isModalOpen = false"
            class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleBookingSubmit" class="p-6 space-y-4 overflow-y-auto">
          <!-- Type Tabs -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1.5 dark:text-white">Kategori Layanan</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="bookingCategory = 'package'"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-bold border text-center transition cursor-pointer',
                  bookingCategory === 'package' ? 'bg-ocean text-white border-ocean' : 'bg-slate-50 text-navy border-slate-200 dark:bg-slate-800/60 dark:text-white dark:border-slate-800',
                ]"
              >
                Paket Wisata
              </button>
              <button
                type="button"
                @click="bookingCategory = 'car'"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-bold border text-center transition cursor-pointer',
                  bookingCategory === 'car' ? 'bg-ocean text-white border-ocean' : 'bg-slate-50 text-navy border-slate-200 dark:bg-slate-800/60 dark:text-white dark:border-slate-800',
                ]"
              >
                Mobil + Supir
              </button>
              <button
                type="button"
                @click="bookingCategory = 'scooter'"
                :class="[
                  'py-2 px-3 rounded-xl text-xs font-bold border text-center transition cursor-pointer',
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
            <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Jeti Keberangkatan / Titik Jemput</label>
            <select
              v-model="formDeparture"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden bg-white dark:bg-slate-900 dark:border-slate-800"
            >
              <option value="Johor Bahru (Stulang Laut)">Johor Bahru (Stulang Laut Ferry)</option>
              <option value="Johor Bahru (Pasir Gudang)">Johor Bahru (Pasir Gudang Ferry)</option>
              <option value="Singapore (HarbourFront)">Singapore (HarbourFront Ferry)</option>
              <option value="Singapore (Tanah Merah)">Singapore (Tanah Merah Ferry)</option>
              <option value="Pelabuhan Batam Centre">Pelabuhan Batam Centre</option>
              <option value="Pelabuhan Harbour Bay">Pelabuhan Harbour Bay</option>
              <option value="Bandara Hang Nadim Batam">Bandara Hang Nadim Batam</option>
              <option value="Hotel di Batam">Hotel di Batam</option>
            </select>
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
              class="inline-flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold py-3.5 px-4 rounded-full w-full text-sm shadow-md transition-all cursor-pointer"
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
