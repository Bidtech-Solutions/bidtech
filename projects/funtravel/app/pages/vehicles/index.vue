<script setup lang="ts">
import { ArrowRight, ArrowUpDown, Bike, Car, Cog, Info, KeyRound, Luggage, Search, Star, UserCheck, Users, X } from '@lucide/vue';
import data from '~/assets/data/vehicles.json';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { site, loc, img, fmt, vehPrice, fxNote, scheme, waUrl } = useSite();

useSeoMeta({
  title: () => `${t('vehicles.title')} — Fun Travel & Transport Batam`,
  description: () => t('vehicles.metaDescription', { carPrice: 'RM 140', motorPrice: 'RM 30' }),
});

// Interactive state
const filter = ref<'all' | 'car' | 'motorcycle'>('all');
const searchQuery = ref('');
const sortBy = ref<'popular' | 'price-asc' | 'price-desc' | 'capacity'>('popular');

// Booking Modal
const isModalOpen = ref(false);
const selectedVehicle = ref('');
const selectedType = ref<'car' | 'motorcycle'>('car');
const formName = ref('');
const formPhone = ref('');
const formDate = ref('');
const formDays = ref(1);
const formPickup = ref('Pelabuhan Ferry Batam Centre');
const formNotes = ref('');

const tabs = computed(() => [
  { id: 'all', label: t('vehicles.filterAll') },
  { id: 'car', label: 'Mobil (+ Supir)' },
  { id: 'motorcycle', label: 'Motor (Lepas Kunci)' },
]);

const processedVehicles = computed(() => {
  let list = [...data.vehicles];

  // Filter Type
  if (filter.value !== 'all') {
    list = list.filter((v) => v.type === filter.value);
  }

  // Filter Search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        loc(v.tagline).toLowerCase().includes(q) ||
        (v.chips && v.chips.some((c) => c.toLowerCase().includes(q)))
    );
  }

  // Sort
  list.sort((a, b) => {
    if (sortBy.value === 'price-asc') return a.pricePerDay - b.pricePerDay;
    if (sortBy.value === 'price-desc') return b.pricePerDay - a.pricePerDay;
    if (sortBy.value === 'capacity') return (b.seats || 2) - (a.seats || 2);
    return (a.popularRank ?? 99) - (b.popularRank ?? 99);
  });

  return list;
});

function openBooking(vehicleName: string, type: 'car' | 'motorcycle' = 'car') {
  selectedVehicle.value = vehicleName;
  selectedType.value = type;
  isModalOpen.value = true;
}

function handleBookingSubmit() {
  const serviceLabel = selectedType.value === 'car' ? 'Mobil + Supir Lokal' : 'Motor Matic Lepas Kunci';
  const message = [
    'Halo Fun Travel!',
    'Saya ingin memesan sewa kendaraan:',
    `• Unit: ${selectedVehicle.value}`,
    `• Layanan: ${serviceLabel}`,
    `• Nama: ${formName.value || 'Tamu'}`,
    `• WhatsApp: ${formPhone.value || '-'}`,
    `• Tanggal Mulai: ${formDate.value || 'Segera'}`,
    `• Durasi Sewa: ${formDays.value} Hari`,
    `• Titik Antar / Jemput: ${formPickup.value}`,
    `• Catatan Tambahan: ${formNotes.value || '-'}`,
    '',
    'Mohon konfirmasi ketersediaan unit dan total tarifnya. Terima kasih!',
  ].join('\n');

  window.open(waUrl(message, 0), '_blank');
  isModalOpen.value = false;
}
</script>

<template>
  <div class="bg-[#F8FAFC] min-h-screen text-[#0F172A] pb-16 dark:bg-slate-950 dark:text-slate-100">
    <!-- 1. Hero Header Banner with Soft Ambient Mesh & Floating Search/Sort Bar -->
    <section class="relative overflow-hidden flex items-center min-h-[420px] sm:min-h-[500px] bg-gradient-to-br from-[#BFDBFE] via-[#F8FAFC] to-[#FDE68A] bg-[length:300%_300%] animate-gradient border-b border-slate-200/80 pt-16 sm:pt-24 pb-16 sm:pb-20 dark:border-slate-800 dark:from-slate-900 dark:via-[#0B1B4D] dark:to-amber-950/40">
      <!-- Decorative ambient glow circles (bergerak pelan) -->
      <div class="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-amber-300/30 blur-3xl animate-float" />
      <div class="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl animate-float [animation-delay:-4s]" />

      <div class="wrap relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4 dark:text-white">
            Armada Transportasi &amp; Rental Batam
          </h1>
          <p class="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl dark:text-slate-300">
            Sewa mobil privat lengkap supir lokal berpengalaman &amp; rental motor matic keliling Batam tanpa ribet. Harga jujur tanpa biaya tersembunyi, unit wangi &amp; terawat, dengan layanan jemput gratis di pelabuhan ferry serta hotel.
          </p>
          <p v-if="fxNote('vehicle')" class="mt-2 text-xs text-slate-500 font-medium dark:text-slate-400">
            <Info aria-hidden="true" class="inline h-3.5 w-3.5 -mt-0.5 mr-1" />{{ fxNote('vehicle') }}
          </p>
        </div>

        <!-- Floating Search & Sort Bar -->
        <div class="mt-10 max-w-2xl mx-auto">
          <div class="bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl sm:rounded-full p-1.5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 dark:border-slate-700 dark:bg-slate-900/95">
            <!-- Search Input -->
            <div class="flex items-center gap-2.5 flex-1 pl-4 pr-2 py-1.5">
              <Search class="w-4 h-4 text-slate-400 shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari mobil atau motor (cth: Innova, HiAce, Scoopy)..."
                class="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden dark:text-slate-200"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="text-slate-400 hover:text-slate-600 p-1 dark:hover:text-slate-200"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Sort Dropdown -->
            <div class="flex items-center justify-between sm:justify-end gap-1.5 bg-slate-100 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200/70 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
              <span class="inline-flex items-center gap-1 text-slate-400"><ArrowUpDown aria-hidden="true" class="h-3.5 w-3.5" />Urutkan:</span>
              <select v-model="sortBy" class="bg-transparent font-extrabold text-slate-900 focus:outline-hidden cursor-pointer dark:text-white">
                <option value="popular">Paling Populer</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="capacity">Kapasitas Kursi</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Main Content Fleet Grids -->
    <main class="wrap py-10 sm:py-14 space-y-16">
      <!-- Category Tabs (filter section Mobil / Motor) -->
      <div class="flex flex-wrap items-center gap-2 !mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          @click="filter = tab.id as any"
          :class="[
            'rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer',
            filter === tab.id ? 'bg-[#1E40AF] text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Armada: satu grid, kartu mobil & motor seragam (beda hanya dari data) -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight dark:text-white">{{ t('vehicle.fleetTitle') }}</h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1 dark:text-slate-400">
              Mobil privat dengan supir lokal &amp; motor matic lepas kunci — pilih unit, cek detail, lalu pesan langsung via WhatsApp.
            </p>
          </div>
          <span class="text-xs font-bold text-slate-400 self-start sm:self-auto whitespace-nowrap">{{ processedVehicles.length }} Unit Tersedia</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="v in processedVehicles"
            :key="v.slug"
            :class="[
              'group bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900',
              v.bestSeller ? 'border-2 border-amber-400/80 shadow-[0_6px_20px_rgba(250,204,21,0.12)]' : 'border border-[#E2E8F0] shadow-[0_4px_12px_rgba(30,64,175,0.08)] dark:border-slate-800',
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
              <span
                v-if="v.bestSeller"
                class="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm"
              >
                <Star aria-hidden="true" class="h-3 w-3 fill-current" /> Paling Laris
              </span>
            </NuxtLink>

            <div class="flex-1 flex flex-col px-1">
              <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mb-1 dark:text-white">
                <NuxtLink :to="localePath(`/vehicles/${v.slug}`)" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">{{ v.brand }} {{ v.model }}</NuxtLink>
              </h3>
              <p class="text-xs text-slate-500 leading-relaxed mb-3.5 line-clamp-2 dark:text-slate-400">{{ loc(v.tagline) }}</p>

              <!-- Spesifikasi 2x2 (sama untuk mobil & motor) -->
              <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-1.5"><Users aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ v.seats }} Penumpang</div>
                <div class="flex items-center gap-1.5"><Luggage aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ v.luggage }} Bagasi</div>
                <div class="flex items-center gap-1.5"><Cog aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t(`common.transmission.${v.transmission}`) }}</div>
                <div class="flex items-center gap-1.5">
                  <component :is="v.type === 'car' ? UserCheck : KeyRound" aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />
                  {{ v.type === 'car' ? 'Supir Lokal' : 'Lepas Kunci' }}
                </div>
              </div>

              <div v-if="v.chips" class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="chip in v.chips" :key="chip" class="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#1E40AF] dark:bg-slate-800 dark:text-sky-400">{{ chip }}</span>
              </div>

              <!-- Harga & aksi -->
              <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                <span class="block text-[10px] font-semibold text-slate-400">{{ t('common.from') }}</span>
                <div class="flex items-baseline gap-1 mb-3">
                  <span class="text-xl sm:text-2xl font-extrabold text-[#1E40AF] tabular-nums dark:text-sky-400">{{ vehPrice(v.pricePerDay) }}</span>
                  <span class="text-xs text-slate-400 font-medium">/ hari</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    @click="openBooking(`${v.brand} ${v.model}`, v.type === 'car' ? 'car' : 'motorcycle')"
                    class="inline-flex items-center justify-center gap-1.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-bold py-2.5 px-3 rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    <span aria-hidden="true" class="icon-wa h-3.5 w-3.5" />
                    <span>Pesan WA</span>
                  </button>
                  <NuxtLink
                    :to="localePath(`/vehicles/${v.slug}`)"
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

        <p v-if="!processedVehicles.length" class="text-center text-sm text-slate-500 py-10 dark:text-slate-400">Kendaraan tidak ditemukan. Coba kata kunci lain.</p>
      </section>
    </main>

    <!-- Global CTA Banner Component -->
    <Cta />

    <!-- Interactive Booking Modal for Vehicles -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
      @click.self="isModalOpen = false"
    >
      <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] dark:bg-slate-900 dark:border-slate-800">
        <!-- Header -->
        <div class="px-6 py-4 bg-ocean text-white flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold tracking-tight">Booking Sewa Kendaraan</h3>
            <p class="text-xs text-blue-100">Reservasi instan langsung terhubung ke WhatsApp Admin</p>
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
          <!-- Selected Vehicle Info -->
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-800">
            <span class="text-[11px] font-semibold text-slate-400 block">Unit Terpilih:</span>
            <span class="text-base font-extrabold text-navy block dark:text-white">{{ selectedVehicle }}</span>
            <span class="text-xs font-semibold text-ocean dark:text-sky-400 mt-0.5 inline-flex items-center gap-1.5">
              <component :is="selectedType === 'car' ? Car : Bike" aria-hidden="true" class="h-3.5 w-3.5" />
              <span>{{ selectedType === 'car' ? 'Termasuk Supir Lokal + BBM' : 'Lepas Kunci (2 Helm + Jas Hujan)' }}</span>
            </span>
          </div>

          <!-- Name & WhatsApp -->
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

          <!-- Date & Duration -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Tanggal Mulai Sewa</label>
              <input
                v-model="formDate"
                type="date"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Durasi Sewa (Hari)</label>
              <input
                v-model="formDays"
                type="number"
                min="1"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
                required
              />
            </div>
          </div>

          <!-- Pickup Location -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Titik Antar / Jemput Unit</label>
            <select
              v-model="formPickup"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden bg-white dark:bg-slate-900 dark:border-slate-800"
            >
              <option value="Pelabuhan Ferry Batam Centre">Pelabuhan Ferry Batam Centre</option>
              <option value="Pelabuhan Ferry Harbour Bay">Pelabuhan Ferry Harbour Bay</option>
              <option value="Pelabuhan Ferry Sekupang">Pelabuhan Ferry Sekupang</option>
              <option value="Pelabuhan Ferry Nongsa Pura">Pelabuhan Ferry Nongsa Pura</option>
              <option value="Bandara Hang Nadim Batam (BTH)">Bandara Hang Nadim Batam (BTH)</option>
              <option value="Hotel di Area Batam Centre / Nagoya">Hotel di Area Batam Centre / Nagoya</option>
              <option value="Alamat Lainnya di Batam">Alamat Lainnya di Batam</option>
            </select>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-xs font-bold text-navy uppercase mb-1 dark:text-white">Catatan Tambahan (Opsional)</label>
            <textarea
              v-model="formNotes"
              rows="2"
              placeholder="Jam kedatangan feri / penerbangan / request khusus..."
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-ocean focus:outline-hidden dark:border-slate-800"
            ></textarea>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold py-3.5 px-4 rounded-full w-full text-sm shadow-md transition-all cursor-pointer"
            >
              <span aria-hidden="true" class="icon-wa w-4 h-4 shrink-0" />
              <span>Konfirmasi &amp; Hubungi via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
