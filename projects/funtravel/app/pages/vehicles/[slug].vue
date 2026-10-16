<script setup lang="ts">
import { ChevronRight, Cog, FileCheck2, Globe2, Home, LocateFixed, MessageCircle, Sparkles, Users } from '@lucide/vue';
import data from '~/assets/data/vehicles.json';

const route = useRoute();
const v = data.vehicles.find((x) => x.slug === String(route.params.slug));
if (!v) throw createError({ statusCode: 404, statusMessage: 'Vehicle not found', fatal: true });

const { t, tm, rt, locale } = useI18n();
const localePath = useLocalePath();
const siteUrl = useSiteConfig().url;
const { loc, img, fmt, fmtDate, waUrl, currency, vehPrice, fxNote, scheme } = useSite();

const name = `${v.brand} ${v.model}`;
const isCar = v.type === 'car';
const url = computed(() => `${siteUrl}${localePath(`/vehicles/${v.slug}`)}`);
const others = data.vehicles.filter((x) => x.slug !== v.slug).slice(0, 3);
const description = computed(() => t(isCar ? 'vehicle.descCar' : 'vehicle.descMotor', { model: name }));
const answer = computed(() => t('vehicle.answer', { name, price: fmt(v.pricePerDay, 'IDR'), scheme: scheme(v.type) })); // SEO: mata uang dasar (IDR)

useSeoMeta({
  title: () => `${name} — ${fmt(v.pricePerDay, 'IDR')}${t('common.perDay')}`,
  description: () => `${answer.value} ${description.value}`,
});
useHead(() => ({
  script: [
    {
      key: 'ld-vehicle',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        brand: { '@type': 'Brand', name: v.brand },
        model: v.model,
        description: answer.value,
        url: url.value,
        category: isCar ? 'Car rental with driver' : 'Self-drive scooter rental',
        offers: {
          '@type': 'Offer',
          url: url.value,
          price: v.pricePerDay,
          priceCurrency: 'IDR',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: v.pricePerDay, priceCurrency: 'IDR', unitCode: 'DAY' },
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
          { name: t('nav.vehicles'), path: '/vehicles' },
          { name, path: `/vehicles/${v.slug}` },
        ].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: siteUrl + localePath(c.path) })),
      }),
    },
  ],
}));

const specs = computed(() => [
  { icon: Users, label: t('vehicle.capacity'), value: v.seats ? t('common.seats', { count: v.seats }) : t('common.notConfirmed') },
  { icon: Cog, label: t('vehicle.transmissionLabel'), value: v.transmission ? t(`common.transmission.${v.transmission}`) : t('common.notConfirmed') },
  { icon: FileCheck2, label: t('vehicle.serviceLabel'), value: scheme(v.type) },
]);
// Syarat dokumen: tamu mancanegara = paspor (+ IDP untuk motor); lokal = KTP (+ SIM C untuk motor). Locale id menampilkan syarat lokal dulu.
const requirements = computed(() => {
  const r = [
    { key: 'intl', icon: Globe2, title: t('vehicle.reqInternational'), text: isCar ? t('vehicle.reqCarInternational') : t('vehicle.reqMotorInternational') },
    { key: 'local', icon: Home, title: t('vehicle.reqLocal'), text: isCar ? t('vehicle.reqCarLocal') : t('vehicle.reqMotorLocal') },
  ];
  return locale.value === 'id' ? r.reverse() : r;
});
const rules = computed(() => (tm('vehicle.rules') as unknown[]).map((m) => rt(m as Parameters<typeof rt>[0])));

// ── Panel pemesanan → pesan WhatsApp otomatis (skema dikunci per jenis: tidak ada toggle) ──
const start = ref('');
const days = ref(1);
const time = ref('09:00');
const pickup = ref(data.pickupPoints[0]?.id ?? '');
const address = ref('');
const geo = ref(''); // '', 'loading', 'failed', atau URL Google Maps
const notes = ref('');

const safeDays = computed(() => Math.min(60, Math.max(1, Number(days.value) || 1)));
const end = computed(() => {
  if (!start.value) return '';
  const d = new Date(`${start.value}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + safeDays.value - 1);
  return d.toISOString().slice(0, 10);
});
const pickupText = computed(() => {
  const point = data.pickupPoints.find((p) => p.id === pickup.value);
  const placeName = point ? loc(point.name) : '';
  const maps = geo.value.startsWith('https://') ? ` (${geo.value})` : '';
  const addr = address.value.trim();
  return pickup.value === 'other' ? `${addr || placeName}${maps}` : `${placeName}${addr ? ` — ${addr}` : ''}${maps}`;
});
const message = computed(() =>
  t('whatsapp.vehicle', {
    vehicle: name,
    service: scheme(v.type),
    start: fmtDate(start.value),
    end: fmtDate(end.value),
    days: safeDays.value,
    time: time.value,
    pickup: pickupText.value,
    total: vehPrice(v.pricePerDay, safeDays.value),
    notes: notes.value.trim() || t('booking.notSet'),
    url: url.value,
  }),
);
function locate() {
  if (!navigator.geolocation) return (geo.value = 'failed');
  geo.value = 'loading';
  navigator.geolocation.getCurrentPosition(
    (pos) => (geo.value = `https://maps.google.com/?q=${pos.coords.latitude.toFixed(6)},${pos.coords.longitude.toFixed(6)}`),
    () => (geo.value = 'failed'),
    { enableHighAccuracy: true, timeout: 10000 },
  );
}
</script>

<template>
  <div>
    <section class="section">
      <div class="wrap">
        <nav aria-label="Breadcrumb" class="mb-6 text-sm text-muted">
          <ol class="flex flex-wrap items-center gap-1">
            <li><NuxtLink :to="localePath('/')" class="hover:text-ocean hover:underline">{{ t('nav.home') }}</NuxtLink></li>
            <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><NuxtLink :to="localePath('/vehicles')" class="hover:text-ocean hover:underline">{{ t('nav.vehicles') }}</NuxtLink></li>
            <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><span aria-current="page" class="font-semibold text-navy">{{ name }}</span></li>
          </ol>
        </nav>

        <div class="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div class="min-w-0 space-y-10">
            <!-- Galeri: foto di app/assets/images/vehicles/<slug>-1.webp, dst. (daftarkan di vehicles.json → images) -->
            <div id="galeri" class="scroll-mt-24 space-y-3">
              <div class="ph aspect-[16/10] rounded-card" :data-label="name">
                <img v-if="img(v.images[0])" :src="img(v.images[0])" :alt="name" fetchpriority="high">
              </div>
              <div v-if="v.images.length > 1" class="grid grid-cols-4 gap-3">
                <template v-for="f in v.images.slice(1, 5)" :key="f">
                  <div v-if="img(f)" class="ph aspect-[4/3] rounded-xl"><img :src="img(f)" :alt="name" loading="lazy"></div>
                </template>
              </div>
            </div>

            <header class="space-y-4">
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wide text-muted">{{ t(`vehicle.category.${v.category}`) }}</span>
                <span :class="['rounded-full px-3 py-1 text-xs font-bold', isCar ? 'bg-ocean text-white' : 'bg-sun text-navy']">{{ scheme(v.type) }}</span>
              </div>
              <h1 class="text-3xl font-extrabold text-navy sm:text-5xl">{{ name }}</h1>
              <p class="text-lg text-muted">{{ loc(v.tagline) }}</p>
              <p class="text-muted">
                {{ t('common.from') }} <span class="brush text-4xl font-extrabold tabular-nums text-navy">{{ vehPrice(v.pricePerDay) }}</span> {{ t('common.perDay') }}
              </p>
              <p v-if="fxNote('vehicle')" class="text-xs text-muted">{{ fxNote('vehicle') }}</p>
              <div class="flex gap-3 rounded-card bg-sand p-5 text-ink">
                <Sparkles aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-sun-deep" />
                <p class="leading-relaxed">{{ answer }}</p>
              </div>
            </header>

            <section aria-labelledby="specs">
              <h2 id="specs" class="mb-4 text-2xl font-extrabold text-navy">{{ t('vehicle.specs') }}</h2>
              <dl class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div v-for="s in specs" :key="s.label" class="rounded-xl bg-sand p-4">
                  <dt class="flex items-center gap-2 text-xs font-bold uppercase text-muted"><component :is="s.icon" aria-hidden="true" class="h-4 w-4" />{{ s.label }}</dt>
                  <dd class="mt-1 font-bold text-navy">{{ s.value }}</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="desc">
              <h2 id="desc" class="mb-3 text-2xl font-extrabold text-navy">{{ t('vehicle.description') }}</h2>
              <p class="leading-relaxed text-ink">{{ description }}</p>
            </section>

            <section aria-labelledby="req">
              <h2 id="req" class="mb-4 text-2xl font-extrabold text-navy">{{ t('vehicle.requirementsTitle') }}</h2>
              <div class="grid gap-4 sm:grid-cols-2">
                <div v-for="r in requirements" :key="r.key" class="rounded-card border border-navy/10 p-5">
                  <p class="flex items-center gap-2 font-bold text-navy"><component :is="r.icon" aria-hidden="true" class="h-5 w-5 text-ocean" />{{ r.title }}</p>
                  <p class="mt-2 flex gap-2 text-sm text-ink"><FileCheck2 aria-hidden="true" class="h-4 w-4 shrink-0 text-palm" />{{ r.text }}</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="rules">
              <h2 id="rules" class="mb-4 text-2xl font-extrabold text-navy">{{ t('vehicle.rulesTitle') }}</h2>
              <ol class="list-decimal space-y-2 pl-5 text-ink">
                <li v-for="r in rules" :key="r">{{ r }}</li>
              </ol>
            </section>
          </div>

          <!-- Panel pemesanan -->
          <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div class="rounded-card bg-white p-5 shadow-card">
              <h2 class="text-lg font-extrabold text-navy">{{ t('booking.titleVehicle') }}</h2>
              <div class="mt-4 grid gap-4">
                <div>
                  <p class="text-sm font-semibold text-navy">{{ t('booking.service') }}</p>
                  <p class="mt-1 inline-flex rounded-full bg-ocean px-3 py-1 text-sm font-bold text-white">{{ scheme(v.type) }}</p>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <label class="text-sm font-semibold text-navy">{{ t('booking.startDate') }}<input v-model="start" type="date" class="field"></label>
                  <label class="text-sm font-semibold text-navy">{{ t('booking.duration') }}<input v-model.number="days" type="number" inputmode="numeric" min="1" max="60" class="field"></label>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <label class="text-sm font-semibold text-navy">{{ t('booking.pickupTime') }}<input v-model="time" type="time" class="field"></label>
                  <div class="text-sm font-semibold text-navy">
                    {{ t('booking.endDate') }}
                    <p class="mt-1 rounded-xl bg-sand px-3 py-2.5 font-normal text-ink">{{ fmtDate(end) }}</p>
                  </div>
                </div>
                <label class="text-sm font-semibold text-navy">
                  {{ t('booking.pickupPoint') }}
                  <select v-model="pickup" class="field"><option v-for="p in data.pickupPoints" :key="p.id" :value="p.id">{{ loc(p.name) }}</option></select>
                </label>
                <label class="text-sm font-semibold text-navy">{{ t('booking.pickupAddress') }}<input v-model="address" type="text" autocomplete="street-address" class="field"></label>
                <button type="button" class="inline-flex items-center gap-2 self-start text-sm font-semibold text-ocean hover:underline" @click="locate">
                  <LocateFixed aria-hidden="true" class="h-4 w-4" />
                  {{ geo === 'loading' ? t('booking.locating') : geo.startsWith('https://') ? t('booking.locationShared') : t('booking.useLocation') }}
                </button>
                <p v-if="geo === 'failed'" class="-mt-2 text-xs text-coral">{{ t('booking.locationFailed') }}</p>
                <label class="text-sm font-semibold text-navy">{{ t('booking.notes') }}<textarea v-model="notes" rows="2" class="field" /></label>

                <dl class="grid grid-cols-2 gap-y-1 rounded-xl bg-sand p-4 text-sm">
                  <dt class="text-muted">{{ t('booking.summary') }}</dt>
                  <dd class="text-right font-semibold">{{ name }} · {{ safeDays }}×</dd>
                  <dt class="text-muted">{{ t('booking.estimateTotal') }}</dt>
                  <dd class="text-right text-lg font-extrabold text-navy">{{ vehPrice(v.pricePerDay, safeDays) }}</dd>
                </dl>

                <a :href="waUrl(message)" target="_blank" rel="noopener" data-wa="vehicle" class="btn-wa w-full !py-4 text-base">
                  <MessageCircle aria-hidden="true" class="h-5 w-5" />{{ t('common.bookWhatsApp') }}
                </a>
              </div>
            </div>
            <div class="rounded-card bg-coral/10 p-4 text-sm">
              <p class="font-semibold text-coral">{{ t('payment.warning') }}</p>
              <NuxtLink :to="`${localePath('/contact')}#payment`" class="mt-2 inline-block font-bold text-ocean underline">{{ t('booking.paymentTitle') }}</NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="bg-sand">
      <div class="section wrap">
        <h2 class="mb-6 text-2xl font-extrabold text-navy">{{ t('vehicle.otherVehicles') }}</h2>
        <ul class="grid gap-3 sm:grid-cols-3">
          <li v-for="x in others" :key="x.slug">
            <NuxtLink :to="localePath(`/vehicles/${x.slug}`)" class="flex h-full flex-col rounded-card bg-white p-5 shadow-card hover:-translate-y-0.5">
              <span class="font-extrabold text-navy">{{ x.brand }} {{ x.model }}</span>
              <span class="mt-1 text-sm text-muted">{{ t('common.from') }} {{ vehPrice(x.pricePerDay) }} {{ t('common.perDay') }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
    <Cta />
  </div>
</template>
