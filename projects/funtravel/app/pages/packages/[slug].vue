<script setup lang="ts">
import { ArrowRight, Ban, CalendarDays, Check, ChevronLeft, ChevronRight, FileText, Hotel, ListChecks, MapPin, Minus, Plus, ScrollText, Ship, Sparkles, Utensils } from '@lucide/vue';
import data from '~/assets/data/packages.json';

const route = useRoute();
const pkg = data.packages.find((p) => p.slug === String(route.params.slug));
if (!pkg) throw createError({ statusCode: 404, statusMessage: 'Package not found', fatal: true });

const { t, locale } = useI18n();
const localePath = useLocalePath();
const siteUrl = useSiteConfig().url;
const { loc, img, fmtDate, waUrl, pkgPrice, fxNote, facility, ferryAddOn } = useSite();

const name = computed(() => `${pkg.code} ${loc(pkg.name)}`);
const url = computed(() => `${siteUrl}${localePath(`/packages/${pkg.slug}`)}`);
const dests = data.destinations.filter((d) => pkg.destinations.includes(d.id));

// Ringkasan faktual (AnswerBox) & meta description dibentuk dari data → tidak bisa berbeda dari daftar fasilitas.
const items = computed(() =>
  new Intl.ListFormat(locale.value, { type: 'conjunction' }).format(
    pkg.includes.map((k) => facility(k).label).map((s) => (locale.value === 'zh' ? s : s.charAt(0).toLowerCase() + s.slice(1))),
  ),
);
// ── Galeri: foto paket + foto destinasi paket ──
const photos = [...new Set([...pkg.images, ...dests.map((d) => d.image)])].filter((f): f is string => !!f && !!img(f)); // tanpa foto ganda
const absUrl = (u?: string) => (u?.startsWith('/') ? siteUrl + u : u);
const priceText = computed(() => `RM ${pkg.price}`); // SEO selalu dalam mata uang dasar (MYR)
const answer = computed(() => t('package.answer', { name: name.value, price: priceText.value, items: items.value }));

useSeoMeta({
  title: name,
  description: () => t('package.metaDescription', { name: name.value, price: priceText.value, items: items.value }),
  ogImage: () => absUrl(img(photos[0])),
});
useHead(() => ({
  script: [
    {
      key: 'ld-package',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: name.value,
        description: answer.value,
        url: url.value,
        image: photos.slice(0, 4).map((f) => absUrl(img(f))),
        touristType: ['Family', 'Leisure'],
        provider: { '@id': `${siteUrl}/#organization` },
        itinerary: {
          '@type': 'ItemList',
          itemListElement: dests.map((d, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: loc(d.name), description: loc(d.summary) } })),
        },
        offers: {
          '@type': 'Offer',
          url: url.value,
          price: pkg.price,
          priceCurrency: 'MYR',
          priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: pkg.price, priceCurrency: 'MYR', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' } },
          availability: 'https://schema.org/InStock',
          seller: { '@id': `${siteUrl}/#organization` },
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
          { name: loc(pkg.name), path: `/packages/${pkg.slug}` },
        ].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: siteUrl + localePath(c.path) })),
      }),
    },
  ],
}));

const active = ref(0);
const recs = [...data.packages.filter((p) => p.slug !== pkg.slug && p.region === pkg.region), ...data.packages.filter((p) => p.region !== pkg.region)].slice(0, 3);

// ── Kartu harga: kalender (tanggal berangkat; pulang otomatis +nights) → pesan WhatsApp otomatis ──
const INTL: Record<string, string> = { en: 'en-SG', ms: 'ms-MY', zh: 'zh-SG', id: 'id-ID' };
const iso = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10);
const addDays = (s: string, n: number) => new Date(Date.parse(`${s}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const today = ref('');
const view = ref({ y: 2026, m: 0 });
onMounted(() => {
  const d = new Date();
  today.value = iso(d.getFullYear(), d.getMonth(), d.getDate());
  view.value = { y: d.getFullYear(), m: d.getMonth() };
});
const monthLabel = computed(() =>
  new Intl.DateTimeFormat(INTL[locale.value], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(view.value.y, view.value.m, 1))),
);
const weekdays = computed(() =>
  Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(INTL[locale.value], { weekday: 'narrow', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, 0, 1 + i)))),
);
const cells = computed(() => {
  const { y, m } = view.value;
  const lead = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7;
  const count = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return [...Array.from({ length: lead }, () => ''), ...Array.from({ length: count }, (_, i) => iso(y, m, i + 1))];
});
const canPrev = computed(() => today.value && iso(view.value.y, view.value.m, 1) > today.value.slice(0, 8) + '01');
const shift = (n: number) => {
  const d = new Date(Date.UTC(view.value.y, view.value.m + n, 1));
  view.value = { y: d.getUTCFullYear(), m: d.getUTCMonth() };
};
const date = ref('');
const back = computed(() => (date.value ? addDays(date.value, pkg.nights) : ''));
const adults = ref(2);
const children = ref(0);
const terminal = ref<'MY' | 'SG'>('MY');
const picked = ref<string[]>([]);
const pax = computed(() => Math.max(1, adults.value || 1));

function toggle(id: string) {
  if (picked.value.includes(id)) picked.value = picked.value.filter((x) => x !== id);
  else if (picked.value.length < pkg!.maxDestinations) picked.value = [...picked.value, id];
}
const message = computed(() =>
  t('whatsapp.package', {
    code: pkg.code,
    name: loc(pkg.name),
    date: date.value ? `${fmtDate(date.value)} – ${fmtDate(back.value)}` : t('booking.notSet'),
    adults: pax.value,
    children: Math.max(0, children.value || 0),
    terminal: terminal.value === 'MY' ? t('booking.terminalMY') : t('booking.terminalSG'),
    destinations: picked.value.length ? dests.filter((d) => picked.value.includes(d.id)).map((d) => loc(d.name)).join(', ') : t('booking.notSet'),
    price: pkgPrice(pkg.price),
    total: pkgPrice(pkg.price, pax.value),
    url: url.value,
  }),
);

// ── Tab kartu ringkasan ──
const tab = ref('fasilitas');
const detailTabs = computed(() => [
  { id: 'fasilitas', label: t('package.facilities'), icon: ListChecks },
  { id: 'deskripsi', label: t('vehicle.description'), icon: FileText },
  { id: 'dest', label: t('package.destinationsTitle'), icon: MapPin },
  { id: 'ketentuan', label: t('package.terms'), icon: ScrollText },
]);
</script>

<template>
  <div class="bg-[#F8FAFC] dark:bg-slate-950">
    <section class="wrap pt-6 pb-12 sm:pb-16">
      <nav aria-label="Breadcrumb" class="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <ol class="flex flex-wrap items-center gap-1">
          <li><NuxtLink :to="localePath('/')" class="hover:text-[#1E40AF] hover:underline dark:hover:text-sky-400">{{ t('nav.home') }}</NuxtLink></li>
          <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><NuxtLink :to="localePath('/packages')" class="hover:text-[#1E40AF] hover:underline dark:hover:text-sky-400">{{ t('nav.packages') }}</NuxtLink></li>
          <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><span aria-current="page" class="font-semibold text-slate-900 dark:text-white">{{ loc(pkg.name) }}</span></li>
        </ol>
      </nav>

      <div class="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div class="min-w-0 space-y-8">
          <!-- 1. Galeri: foto utama + baris thumbnail -->
          <div id="galeri" class="anim-card scroll-mt-24 space-y-3">
            <div class="relative overflow-hidden rounded-3xl bg-slate-200 aspect-[16/10] shadow-lg dark:bg-slate-800">
              <img v-if="photos[active]" :src="img(photos[active])" :alt="name" fetchpriority="high" class="h-full w-full object-cover" />
              <span class="absolute top-4 left-4 rounded-xl bg-white/95 px-3 py-1 text-base font-black text-[#1E40AF] shadow-md">{{ pkg.code }}</span>
            </div>
            <div v-if="photos.length > 1" class="grid grid-cols-4 gap-3">
              <button
                v-for="(f, i) in photos.slice(0, 4)"
                :key="f"
                type="button"
                :aria-label="`${name} — foto ${i + 1}`"
                :class="['relative overflow-hidden rounded-2xl bg-slate-200 aspect-[4/3] transition dark:bg-slate-800', i === active ? 'ring-4 ring-[#1E40AF] dark:ring-sky-400' : 'hover:opacity-90']"
                @click="active = i"
              >
                <img :src="img(f)" :alt="`${name} ${i + 1}`" loading="lazy" class="h-full w-full object-cover" />
              </button>
            </div>
          </div>

          <!-- 2. Judul -->
          <!-- Kartu judul -->
          <header class="anim-fade-up delay-75 rounded-3xl border border-[#E2E8F0] bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3 p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-[#1E40AF] px-3 py-1 text-xs font-bold text-white">{{ t('common.durationLong', { days: pkg.days, nights: pkg.nights }) }}</span>
              <span class="rounded-full bg-slate-200/70 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{{ pkg.region === 'batam' ? t('packages.filterBatam') : t('packages.filterBatamBintan') }}</span>
              <span v-if="pkg.fullBoard" class="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">{{ t('common.fullBoard') }}</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ loc(pkg.name) }}</h1>
          </header>

          <!-- Kartu tab: fasilitas, deskripsi, (destinasi), ketentuan -->
          <article class="anim-card delay-150 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <!-- Tab: hanya satu bagian tampil (semua tetap di HTML untuk SEO) -->
          <div role="tablist" :aria-label="name" class="flex gap-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] border-b border-slate-100 px-3 sm:px-5 dark:border-slate-800">
            <button
              v-for="tb in detailTabs"
              :id="`tab-${tb.id}`"
              :key="tb.id"
              type="button"
              role="tab"
              :aria-selected="tab === tb.id"
              :aria-controls="`panel-${tb.id}`"
              :class="[
                '-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3.5 text-sm font-bold transition-colors',
                tab === tb.id ? 'border-[#1E40AF] text-[#1E40AF] dark:border-sky-400 dark:text-sky-400' : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
              ]"
              @click="tab = tb.id"
            >
              <component :is="tb.icon" aria-hidden="true" class="h-4 w-4" />{{ tb.label }}
            </button>
          </div>

          <!-- 3. Fasilitas -->
          <section id="panel-fasilitas" role="tabpanel" :aria-labelledby="`tab-fasilitas`" v-show="tab === 'fasilitas'" class="p-6 sm:p-8">
            <h2 id="fasilitas" class="sr-only">{{ t('package.facilities') }}</h2>
            <div class="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 class="mb-3 text-sm font-extrabold uppercase tracking-wide text-[#16A34A]">{{ t('package.included') }}</h3>
                <ul class="space-y-2.5">
                  <li v-for="k in pkg.includes" :key="k" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#16A34A] dark:bg-emerald-950/60"><Check aria-hidden="true" class="h-3.5 w-3.5 stroke-[3]" /></span>
                    <span><b class="text-slate-900 dark:text-white">{{ facility(k).label }}</b><span v-if="facility(k).detail" class="block text-xs text-slate-500 dark:text-slate-400">{{ facility(k).detail }}</span></span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="mb-3 text-sm font-extrabold uppercase tracking-wide text-coral">{{ t('package.excluded') }}</h3>
                <ul class="space-y-2.5">
                  <li v-for="k in pkg.excludes" :key="k" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-coral dark:bg-red-950/50"><Ban aria-hidden="true" class="h-3.5 w-3.5" /></span>
                    <span><b class="text-slate-900 dark:text-white">{{ facility(k).label }}</b><span v-if="facility(k).detail" class="block text-xs text-slate-500 dark:text-slate-400">{{ facility(k).detail }}</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- 4. Deskripsi -->
          <section id="panel-deskripsi" role="tabpanel" :aria-labelledby="`tab-deskripsi`" v-show="tab === 'deskripsi'" class="p-6 sm:p-8">
            <h2 id="deskripsi" class="sr-only">{{ t('vehicle.description') }}</h2>
            <div class="flex gap-3 rounded-2xl bg-amber-50 p-4 text-slate-700 dark:bg-amber-950/30 dark:text-slate-200">
              <Sparkles aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <p class="leading-relaxed">{{ answer }}</p>
            </div>
          </section>

          <!-- 5. Pilihan destinasi -->
          <section id="panel-dest" role="tabpanel" :aria-labelledby="`tab-dest`" v-show="tab === 'dest'" class="p-6 sm:p-8">
            <div class="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="dest" class="sr-only">{{ t('package.destinationsTitle') }}</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('package.destinationsHint', { max: pkg.maxDestinations }) }}</p>
              </div>
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1E40AF] dark:bg-slate-800 dark:text-sky-400">{{ t('booking.selected', { count: picked.length, max: pkg.maxDestinations }) }}</span>
            </div>
            <ul class="grid grid-cols-2 gap-4 md:grid-cols-3">
              <li v-for="d in dests" :key="d.id">
                <button
                  type="button"
                  :aria-pressed="picked.includes(d.id)"
                  :disabled="!picked.includes(d.id) && picked.length >= pkg.maxDestinations"
                  :class="[
                    'group relative block w-full overflow-hidden rounded-2xl border-2 text-left transition disabled:cursor-not-allowed disabled:opacity-50',
                    picked.includes(d.id) ? 'border-[#1E40AF] shadow-lg dark:border-sky-400' : 'border-transparent hover:border-blue-200 dark:hover:border-slate-700',
                  ]"
                  @click="toggle(d.id)"
                >
                  <div class="aspect-[4/3] bg-slate-200 dark:bg-slate-800">
                    <img v-if="img(d.image)" :src="img(d.image)" :alt="loc(d.name)" loading="lazy" class="h-full w-full object-cover" />
                  </div>
                  <span v-if="picked.includes(d.id)" class="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#1E40AF] text-white shadow"><Check aria-hidden="true" class="h-4 w-4 stroke-[3]" /></span>
                  <span class="block p-3">
                    <span class="block text-sm font-extrabold text-slate-900 dark:text-white">{{ loc(d.name) }}</span>
                    <span class="mt-0.5 block text-xs text-slate-500 line-clamp-2 dark:text-slate-400">{{ loc(d.summary) }}</span>
                  </span>
                </button>
              </li>
            </ul>
            <p v-if="picked.length >= pkg.maxDestinations" class="mt-3 text-xs text-slate-500 dark:text-slate-400">{{ t('booking.limitReached', { max: pkg.maxDestinations }) }}</p>
          </section>

          <!-- 6. Ketentuan -->
          <section id="panel-ketentuan" role="tabpanel" :aria-labelledby="`tab-ketentuan`" v-show="tab === 'ketentuan'" class="p-6 sm:p-8">
            <h2 id="ketentuan" class="sr-only">{{ t('package.terms') }}</h2>
            <!-- Wajib di setiap paket (permintaan klien): harga dari terminal Malaysia; Singapura = add-on -->
            <div class="flex gap-3.5 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-sky-50/50 to-indigo-50/40 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <Ship aria-hidden="true" class="mt-0.5 h-6 w-6 shrink-0 text-[#1E40AF] dark:text-sky-400" />
              <div class="space-y-1.5">
                <p class="font-extrabold text-base text-slate-900 dark:text-white">{{ t('package.ferryTitle') }}</p>
                <div class="space-y-1 text-sm">
                  <p class="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-[#1E40AF] dark:bg-blue-900/60 dark:text-sky-300 shrink-0">MY</span>
                    <span>{{ t('package.ferryTextMY') }}</span>
                  </p>
                  <p class="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 shrink-0">SG</span>
                    <span>{{ t('package.ferryTextSG') }}</span>
                  </p>
                </div>
              </div>
            </div>
            <ul class="mt-4 space-y-2.5">
              <li v-for="k in pkg.notes" :key="k" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                <Info aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF] dark:text-sky-400" /><span>{{ facility(k).label }}</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                <Info aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-[#1E40AF] dark:text-sky-400" /><span>{{ t('booking.childrenNote') }}</span>
              </li>
            </ul>
          </section>
          </article>
        </div>

        <!-- Kartu harga (samping galeri): harga, kalender, peserta, terminal, WhatsApp -->
        <aside class="anim-card delay-200 lg:sticky lg:top-24 lg:self-start space-y-3">
          <div class="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <span class="block text-xs font-semibold text-slate-400">{{ t('common.from') }}</span>
            <p class="flex items-baseline gap-1.5">
              <span class="text-3xl font-extrabold tabular-nums text-[#1E40AF] dark:text-sky-400">{{ pkgPrice(pkg.price) }}</span>
              <span class="text-sm text-slate-400">{{ t('common.perPax') }}</span>
            </p>

            <!-- Kalender keberangkatan -->
            <div class="mt-5 rounded-2xl border border-slate-100 p-3 notranslate dark:border-slate-800" translate="no">
              <p class="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white"><CalendarDays aria-hidden="true" class="h-4 w-4 text-[#1E40AF] dark:text-sky-400" />{{ t('booking.departDate') }}</p>
              <ClientOnly>
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <button type="button" :disabled="!canPrev" :aria-label="t('booking.prevMonth')" class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" @click="shift(-1)">
                      <ChevronLeft aria-hidden="true" class="h-4 w-4" />
                    </button>
                    <span class="text-sm font-extrabold capitalize text-slate-900 notranslate dark:text-white" translate="no">{{ monthLabel }}</span>
                    <button type="button" :aria-label="t('booking.nextMonth')" class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" @click="shift(1)">
                      <ChevronRight aria-hidden="true" class="h-4 w-4" />
                    </button>
                  </div>
                  <div class="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-slate-400 notranslate" translate="no">
                    <span v-for="(w, i) in weekdays" :key="i">{{ w }}</span>
                  </div>
                  <div class="mt-1 grid grid-cols-7 gap-1 notranslate" translate="no">
                    <template v-for="(d, i) in cells" :key="i">
                      <span v-if="!d" class="h-9 w-full block" />
                      <button
                        v-else
                        type="button"
                        translate="no"
                        :disabled="d < today"
                        :aria-pressed="d === date"
                        :class="[
                          'h-9 min-h-[36px] max-h-[36px] w-full rounded-lg text-sm font-semibold tabular-nums transition notranslate flex items-center justify-center overflow-hidden whitespace-nowrap select-none disabled:cursor-not-allowed disabled:text-slate-300 dark:disabled:text-slate-600',
                          d === date || d === back
                            ? 'bg-[#1E40AF] text-white shadow-md'
                            : date && d > date && d < back
                              ? 'bg-blue-100 text-[#1E40AF] dark:bg-blue-950/70 dark:text-sky-300'
                              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                          d === today && d !== date && 'ring-1 ring-[#1E40AF]/40',
                        ]"
                        @click="date = d"
                      >
                        <span class="notranslate" translate="no">{{ Number(d.slice(8)) }}</span>
                      </button>
                    </template>
                  </div>
                </div>
                <template #fallback>
                  <div class="h-[264px] animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
                </template>
              </ClientOnly>
              <p class="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                {{ date ? `${fmtDate(date)} – ${fmtDate(back)} (${t('common.durationLong', { days: pkg.days, nights: pkg.nights })})` : t('booking.pickDepart') }}
              </p>
            </div>

            <!-- Peserta -->
            <div class="mt-4 grid grid-cols-2 gap-3">
              <div v-for="row in [{ label: t('booking.adults'), model: adults, min: 1, set: (n: number) => (adults = n) }, { label: t('booking.children'), model: children, min: 0, set: (n: number) => (children = n) }]" :key="row.label">
                <p class="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">{{ row.label }}</p>
                <div class="flex items-center justify-between rounded-xl border border-slate-200 px-1 py-1 dark:border-slate-700">
                  <button type="button" :aria-label="`${row.label} −`" :disabled="row.model <= row.min" class="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" @click="row.set(row.model - 1)">
                    <Minus aria-hidden="true" class="h-4 w-4" />
                  </button>
                  <span class="text-sm font-extrabold tabular-nums text-slate-900 dark:text-white">{{ row.model }}</span>
                  <button type="button" :aria-label="`${row.label} +`" :disabled="row.model >= 50" class="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" @click="row.set(row.model + 1)">
                    <Plus aria-hidden="true" class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Pilihan Terminal Keberangkatan (Malaysia Standar vs Singapura Add-on) -->
            <div class="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Ship aria-hidden="true" class="h-3.5 w-3.5 text-[#1E40AF] dark:text-sky-400" />
                  <span>{{ t('booking.terminal') }}</span>
                </p>
                <span class="text-[10px] font-semibold text-slate-400">{{ terminal === 'SG' ? t('booking.terminalSgHint') : t('booking.terminalMyHint') }}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 p-1 bg-white rounded-xl border border-slate-200/80 dark:bg-slate-900 dark:border-slate-700">
                <button
                  type="button"
                  :class="[
                    'py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer',
                    terminal === 'MY'
                      ? 'bg-[#1E40AF] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800',
                  ]"
                  @click="terminal = 'MY'"
                >
                  <FlagIcon code="MY" class="h-3.5 w-4.5" />
                  <span>{{ t('booking.terminalMY') }}</span>
                </button>
                <button
                  type="button"
                  :class="[
                    'py-2 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer',
                    terminal === 'SG'
                      ? 'bg-[#1E40AF] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800',
                  ]"
                  @click="terminal = 'SG'"
                >
                  <FlagIcon code="SG" class="h-3.5 w-4.5" />
                  <span>{{ t('booking.terminalSG') }}</span>
                </button>
              </div>
            </div>

            <!-- Total & WhatsApp -->
            <div class="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <span class="text-sm text-slate-500 dark:text-slate-400">{{ t('booking.estimateTotal') }}</span>
              <span class="text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">{{ pkgPrice(pkg.price, pax) }}</span>
            </div>
            <a
              :href="waUrl(message)"
              target="_blank"
              rel="noopener"
              data-wa="package"
              class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#15803D] py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-[#166534] hover:shadow-lg active:scale-[0.99]"
            >
              <span aria-hidden="true" class="icon-wa h-5 w-5" />{{ t('common.bookWhatsApp') }}
            </a>
          </div>
        </aside>
      </div>
    </section>

    <!-- 7. Rekomendasi lainnya (kartu sama dengan halaman daftar paket) -->
    <section class="wrap pb-4">
      <div class="mb-6 flex items-end justify-between gap-3">
        <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ t('common.recommendations') }}</h2>
        <NuxtLink :to="localePath('/packages')" class="inline-flex items-center gap-1 text-sm font-bold text-[#1E40AF] hover:underline dark:text-sky-400">
          {{ t('common.allPackages') }} <ArrowRight aria-hidden="true" class="h-4 w-4" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(p, idx) in recs"
          :key="p.slug"
          :class="[
            'anim-card group bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900',
            idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : 'delay-200',
            p.featured ? 'border-2 border-amber-400/80 shadow-[0_6px_20px_rgba(250,204,21,0.12)]' : 'border border-[#E2E8F0] shadow-[0_4px_12px_rgba(30,64,175,0.08)] dark:border-slate-800',
          ]"
        >
          <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="relative block rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-100 dark:bg-slate-800">
            <img v-if="img(p.images[0])" :src="img(p.images[0])" :alt="loc(p.name)" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-black text-[#1E40AF] shadow-sm">{{ p.code }}</span>
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
            <!-- Penegasan rute & terminal feri -->
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
                class="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-full transition-all dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200"
              >
                <span>{{ t('common.viewDetails') }}</span>
                <ArrowRight aria-hidden="true" class="h-3.5 w-3.5" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>

    <Cta />
  </div>
</template>
