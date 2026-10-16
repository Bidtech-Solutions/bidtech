<script setup lang="ts">
import { Ban, CheckCircle2, ChevronRight, Info, MessageCircle, Ship, Sparkles } from '@lucide/vue';
import data from '~/assets/data/packages.json';

const route = useRoute();
const pkg = data.packages.find((p) => p.slug === String(route.params.slug));
if (!pkg) throw createError({ statusCode: 404, statusMessage: 'Package not found', fatal: true });

const { t, locale } = useI18n();
const localePath = useLocalePath();
const siteUrl = useSiteConfig().url;
const { loc, img, fmtDate, waUrl, currency, pkgPrice, fxNote, facility, ferryAddOn } = useSite();

const name = computed(() => `${pkg.code} ${loc(pkg.name)}`);
const url = computed(() => `${siteUrl}${localePath(`/packages/${pkg.slug}`)}`);
const dests = data.destinations.filter((d) => pkg.destinations.includes(d.id));
const others = data.packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);

// Ringkasan faktual (AnswerBox) & meta description dibentuk dari data → tidak bisa berbeda dari daftar fasilitas.
const items = computed(() =>
  new Intl.ListFormat(locale.value, { type: 'conjunction' }).format(
    pkg.includes.map((k) => facility(k).label).map((s) => (locale.value === 'zh' ? s : s.charAt(0).toLowerCase() + s.slice(1))),
  ),
);
const priceText = computed(() => `RM ${pkg.price}`); // SEO selalu dalam mata uang dasar (MYR)
const answer = computed(() => t('package.answer', { name: name.value, price: priceText.value, items: items.value }));

useSeoMeta({
  title: name,
  description: () => t('package.metaDescription', { name: name.value, price: priceText.value, items: items.value }),
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

// ── Panel pemesanan → pesan WhatsApp otomatis ──
const date = ref('');
const adults = ref(2);
const children = ref(0);
const terminal = ref<'MY' | 'SG'>('MY');
const picked = ref<string[]>([]);
const notes = ref('');
const pax = computed(() => Math.max(1, adults.value || 1));

function toggle(id: string) {
  if (picked.value.includes(id)) picked.value = picked.value.filter((x) => x !== id);
  else if (picked.value.length < pkg!.maxDestinations) picked.value = [...picked.value, id];
}
const message = computed(() =>
  t('whatsapp.package', {
    code: pkg.code,
    name: loc(pkg.name),
    date: fmtDate(date.value),
    adults: pax.value,
    children: Math.max(0, children.value || 0),
    terminal: terminal.value === 'MY' ? t('booking.terminalMY') : t('booking.terminalSG'),
    destinations: picked.value.length ? dests.filter((d) => picked.value.includes(d.id)).map((d) => loc(d.name)).join(', ') : t('booking.notSet'),
    price: pkgPrice(pkg.price),
    total: pkgPrice(pkg.price, pax.value),
    notes: notes.value.trim() || t('booking.notSet'),
    url: url.value,
  }),
);
</script>

<template>
  <div>
    <section class="section">
      <div class="wrap">
        <nav aria-label="Breadcrumb" class="mb-6 text-sm text-muted">
          <ol class="flex flex-wrap items-center gap-1">
            <li><NuxtLink :to="localePath('/')" class="hover:text-ocean hover:underline">{{ t('nav.home') }}</NuxtLink></li>
            <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><NuxtLink :to="localePath('/packages')" class="hover:text-ocean hover:underline">{{ t('nav.packages') }}</NuxtLink></li>
            <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><span aria-current="page" class="font-semibold text-navy">{{ loc(pkg.name) }}</span></li>
          </ol>
        </nav>
        <p v-if="locale === 'id'" class="mb-6 flex gap-2 rounded-xl bg-sky/15 p-4 text-sm font-semibold text-navy">
          <Info aria-hidden="true" class="h-5 w-5 shrink-0 text-ocean" />{{ t('packages.localBanner') }}
        </p>

        <!-- Galeri: foto di app/assets/images/packages/<slug>-1.webp, dst. (daftarkan di packages.json → images) -->
        <div id="galeri" class="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
          <div class="ph aspect-[4/3] rounded-card sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:h-full" :data-label="t('common.photoComingSoon')">
            <img v-if="img(pkg.images[0])" :src="img(pkg.images[0])" :alt="name" fetchpriority="high">
          </div>
          <template v-for="f in pkg.images.slice(1, 5)" :key="f">
            <div v-if="img(f)" class="ph hidden aspect-[4/3] rounded-xl sm:block"><img :src="img(f)" :alt="name" loading="lazy"></div>
          </template>
        </div>

        <div class="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div class="min-w-0 space-y-10">
            <header class="space-y-4" :data-accent="pkg.accent">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-xl border-4 border-white bg-[var(--accent)] px-3 py-1 text-lg font-black text-white shadow-card">{{ pkg.code }}</span>
                <span class="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{{ t('common.durationLong', { days: pkg.days, nights: pkg.nights }) }}</span>
                <span v-if="pkg.fullBoard" class="rounded-full bg-sun px-3 py-1 text-xs font-bold text-navy">{{ t('common.fullBoard') }}</span>
              </div>
              <h1 class="text-3xl font-extrabold text-navy sm:text-5xl">{{ loc(pkg.name) }}</h1>
              <p class="text-muted">
                {{ t('common.from') }} <span class="brush text-4xl font-extrabold tabular-nums text-navy">{{ pkgPrice(pkg.price) }}</span> {{ t('common.perPax') }}
              </p>
              <p v-if="fxNote('package')" class="text-xs text-muted">{{ fxNote('package') }}</p>
              <div class="flex gap-3 rounded-card bg-sand p-5 text-ink">
                <Sparkles aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-sun-deep" />
                <p class="leading-relaxed">{{ answer }}</p>
              </div>
              <!-- Wajib di setiap paket (permintaan klien): harga dari terminal Malaysia; Singapura = add-on -->
              <div class="flex gap-3 rounded-card border border-sun bg-sun/15 p-4">
                <Ship aria-hidden="true" class="mt-0.5 h-6 w-6 shrink-0 text-navy" />
                <div>
                  <p class="font-bold text-navy">{{ t('package.ferryTitle') }}</p>
                  <p class="text-sm text-ink">{{ t('package.ferryText') }}</p>
                  <p class="text-sm font-semibold text-ink">{{ ferryAddOn(pkg.sgAddOn) }}</p>
                </div>
              </div>
            </header>

            <section aria-labelledby="inc">
              <h2 id="inc" class="mb-4 text-2xl font-extrabold text-navy">{{ t('package.included') }}</h2>
              <ul class="grid gap-3">
                <li v-for="k in pkg.includes" :key="k" class="flex gap-3">
                  <CheckCircle2 aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-palm" />
                  <span><b class="text-navy">{{ facility(k).label }}</b><span v-if="facility(k).detail" class="block text-sm text-muted">{{ facility(k).detail }}</span></span>
                </li>
              </ul>
            </section>
            <section aria-labelledby="exc">
              <h2 id="exc" class="mb-4 text-2xl font-extrabold text-navy">{{ t('package.excluded') }}</h2>
              <ul class="grid gap-3">
                <li v-for="k in pkg.excludes" :key="k" class="flex gap-3">
                  <Ban aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                  <span><b class="text-navy">{{ facility(k).label }}</b><span v-if="facility(k).detail" class="block text-sm text-muted">{{ facility(k).detail }}</span></span>
                </li>
              </ul>
            </section>
            <section aria-labelledby="notes">
              <h2 id="notes" class="mb-4 text-2xl font-extrabold text-navy">{{ t('package.notes') }}</h2>
              <ul class="grid gap-3">
                <li v-for="k in pkg.notes" :key="k" class="flex gap-3">
                  <Info aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-ocean" /><span>{{ facility(k).label }}</span>
                </li>
              </ul>
            </section>

            <section aria-labelledby="dest">
              <h2 id="dest" class="text-2xl font-extrabold text-navy">{{ t('package.destinationsTitle') }}</h2>
              <p class="mb-4 text-muted">{{ t('package.destinationsHint', { max: pkg.maxDestinations }) }}</p>
              <ul class="grid grid-cols-2 gap-4 md:grid-cols-3">
                <li v-for="d in dests" :key="d.id">
                  <figure class="h-full rounded-md bg-white p-2 pb-3 shadow-card">
                    <div class="ph aspect-square rounded" :data-label="loc(d.name)">
                      <img v-if="img(d.image)" :src="img(d.image)" :alt="loc(d.name)" loading="lazy">
                    </div>
                    <figcaption class="mt-2 px-1">
                      <span class="font-script block text-center text-lg text-navy">{{ loc(d.name) }}</span>
                      <span class="mt-1 block text-xs text-muted">{{ loc(d.summary) }}</span>
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </section>
          </div>

          <!-- Panel pemesanan -->
          <aside class="lg:sticky lg:top-24 lg:self-start">
            <div class="rounded-card bg-white p-5 shadow-card">
              <h2 class="text-lg font-extrabold text-navy">{{ t('booking.titlePackage') }}</h2>
              <div class="mt-4 grid gap-4">
                <label class="text-sm font-semibold text-navy">{{ t('booking.date') }}<input v-model="date" type="date" class="field"></label>
                <div class="grid grid-cols-2 gap-3">
                  <label class="text-sm font-semibold text-navy">{{ t('booking.adults') }}<input v-model.number="adults" type="number" inputmode="numeric" min="1" max="50" class="field"></label>
                  <label class="text-sm font-semibold text-navy">{{ t('booking.children') }}<input v-model.number="children" type="number" inputmode="numeric" min="0" max="50" class="field"></label>
                </div>
                <p v-if="children > 0" class="-mt-2 text-xs text-muted">{{ t('booking.childrenNote') }}</p>

                <fieldset>
                  <legend class="text-sm font-semibold text-navy">{{ t('booking.terminal') }}</legend>
                  <div class="mt-1 grid grid-cols-2 gap-2">
                    <label
                      v-for="v in (['MY', 'SG'] as const)"
                      :key="v"
                      :class="['cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold', terminal === v ? 'border-ocean bg-ocean text-white' : 'border-navy/15 text-navy']"
                    >
                      <input v-model="terminal" type="radio" name="terminal" :value="v" class="sr-only">
                      {{ v === 'MY' ? t('booking.terminalMY') : t('booking.terminalSG') }}
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend class="text-sm font-semibold text-navy">
                    {{ t('booking.destinations') }}
                    <span class="font-normal text-muted">({{ t('booking.selected', { count: picked.length, max: pkg.maxDestinations }) }})</span>
                  </legend>
                  <div class="mt-1 flex flex-wrap gap-2">
                    <label
                      v-for="d in dests"
                      :key="d.id"
                      :class="[
                        'rounded-full border px-3 py-1.5 text-xs font-semibold',
                        picked.includes(d.id) ? 'border-palm bg-palm text-white' : 'border-navy/15 text-navy',
                        !picked.includes(d.id) && picked.length >= pkg.maxDestinations ? 'opacity-50' : 'cursor-pointer',
                      ]"
                    >
                      <input type="checkbox" class="sr-only" :checked="picked.includes(d.id)" :disabled="!picked.includes(d.id) && picked.length >= pkg.maxDestinations" @change="toggle(d.id)">
                      {{ loc(d.name) }}
                    </label>
                  </div>
                  <p v-if="picked.length >= pkg.maxDestinations" class="mt-1 text-xs text-muted">{{ t('booking.limitReached', { max: pkg.maxDestinations }) }}</p>
                </fieldset>

                <label class="text-sm font-semibold text-navy">{{ t('booking.notes') }}<textarea v-model="notes" rows="2" class="field" /></label>

                <dl class="grid grid-cols-2 gap-y-1 rounded-xl bg-sand p-4 text-sm">
                  <dt class="text-muted">{{ t('booking.estimate') }}</dt>
                  <dd class="text-right font-semibold">{{ pkgPrice(pkg.price) }} {{ t('common.perPax') }}</dd>
                  <dt class="text-muted">{{ t('booking.estimateTotal') }}</dt>
                  <dd class="text-right text-lg font-extrabold text-navy">{{ pkgPrice(pkg.price, pax) }}</dd>
                </dl>

                <a :href="waUrl(message)" target="_blank" rel="noopener" data-wa="package" class="btn-wa w-full !py-4 text-base">
                  <MessageCircle aria-hidden="true" class="h-5 w-5" />{{ t('common.bookWhatsApp') }}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="bg-sand">
      <div class="section wrap">
        <h2 class="mb-6 text-2xl font-extrabold text-navy">{{ t('package.otherPackages') }}</h2>
        <ul class="grid gap-3 sm:grid-cols-3">
          <li v-for="p in others" :key="p.slug">
            <NuxtLink :to="localePath(`/packages/${p.slug}`)" class="flex h-full flex-col rounded-card bg-white p-5 shadow-card hover:-translate-y-0.5">
              <span class="font-extrabold text-navy">{{ p.code }} · {{ loc(p.name) }}</span>
              <span class="mt-1 text-sm text-muted">{{ t('common.from') }} {{ pkgPrice(p.price) }} {{ t('common.perPax') }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
    <Cta />
  </div>
</template>
