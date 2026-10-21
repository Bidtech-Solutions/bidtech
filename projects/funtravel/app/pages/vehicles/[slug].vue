<script setup lang="ts">
import {
  FileText,
  ListChecks,
  ScrollText,
  ArrowRight,
  Bike,
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  CreditCard,
  FileCheck2,
  Fuel,
  Globe2,
  Home,
  IdCard,
  KeyRound,
  Luggage,
  MapPin,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  Users,
  Wallet,
} from '@lucide/vue';
import data from '~/assets/data/vehicles.json';

const route = useRoute();
const v = data.vehicles.find((x) => x.slug === String(route.params.slug));
if (!v) throw createError({ statusCode: 404, statusMessage: 'Vehicle not found', fatal: true });

const { t, locale } = useI18n();
const localePath = useLocalePath();
const siteUrl = useSiteConfig().url;
const { loc, locArray, chipLoc, img, fmt, fmtDate, waUrl, vehPrice, fxNote, scheme } = useSite();

const name = `${v.brand} ${v.model}`;
const isCar = v.type === 'car';
const url = computed(() => `${siteUrl}${localePath(`/vehicles/${v.slug}`)}`);
// Kendaraan lainnya: tipe yang sama didahulukan
const others = [...data.vehicles.filter((x) => x.slug !== v.slug && x.type === v.type), ...data.vehicles.filter((x) => x.type !== v.type)].slice(0, 3);
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

// ── Galeri: foto utama + grid thumbnail (klik → jadi foto utama) ──
const photos = v.images.filter((f) => img(f));
const active = ref(0);

const policyMap: Record<'car' | 'motor', Record<string, { title: string; text: string }[]>> = {
  car: {
    id: [
      { title: 'Bebas Capek & Tanpa Resiko Kerusakan', text: 'Anda tidak perlu khawatir klaim baret bodi atau tersesat di jalan sempit. Supir lokal kami yang bertanggung jawab penuh terhadap mobil.' },
      { title: 'Durasi Standar 10–12 Jam per Hari', text: 'Fleksibel mulai dari kedatangan ferry atau jam jemput hotel. Overtime sangat transparan hanya Rp 50.000 (RM 15) per jam.' },
      { title: 'Paket Termasuk BBM & Jasa Supir', text: 'Harga paket sudah termasuk bahan bakar dan akomodasi harian supir di pulau Batam. Uang makan supir bersifat sukarela.' },
      { title: 'Metode Pembayaran Mudah', text: 'Terima Ringgit (MYR), Dollar Singapura (SGD), Transfer BCA/Mandiri, atau QRIS instan saat serah terima.' },
    ],
    en: [
      { title: 'Stress-Free & Zero Damage Liability', text: 'No need to worry about narrow streets or scratches. Our experienced local driver takes full responsibility for the car.' },
      { title: 'Standard 10–12 Hours Daily Service', text: 'Flexible pickup directly from ferry terminals or hotels. Transparent overtime fee of only Rp 50,000 (~RM 15) per hour.' },
      { title: 'Package Includes Fuel & Driver', text: 'Rental rates fully include fuel and daily driver expenses across Batam Island. Meal allowance is voluntary.' },
      { title: 'Convenient Multi-Currency Payment', text: 'We accept Malaysian Ringgit (MYR), Singapore Dollar (SGD), BCA/Mandiri bank transfer, or instant QRIS.' },
    ],
    ms: [
      { title: 'Bebas Penat & Tanpa Risiko Kerosakan', text: 'Anda tidak perlu risau tentang jalan sempit atau calar. Pemandu tempatan kami bertanggungjawab sepenuhnya terhadap kereta.' },
      { title: 'Tempoh Standard 10–12 Jam Sehari', text: 'Fleksibel bermula dari terminal feri atau hotel. Lebih masa sangat telus hanya RM 15 (Rp 50,000) sejam.' },
      { title: 'Pakej Termasuk Minyak & Pemandu', text: 'Kadar sewaan termasuk minyak dan penginapan pemandu di Pulau Batam. Wang makan pemandu adalah sukarela.' },
      { title: 'Kaedah Pembayaran Mudah', text: 'Menerima Ringgit (MYR), Dolar Singapura (SGD), pindahan bank, atau QRIS segera semasa penerimaan unit.' },
    ],
    zh: [
      { title: '全程无忧·零车损赔付风险', text: '无需担心狭窄小巷路况或剐蹭纠纷，经验丰富的本地专职司机全程全权负责车辆安全与路线引导。' },
      { title: '标准包车时长 10–12 小时/天', text: '从抵达渡轮码头或酒店大堂起算，超时费透明标准仅需约 RM 15（5万印尼盾）/小时。' },
      { title: '全包价含全程燃油与司机服务', text: '套餐一口价已含全程燃油消耗与司机工时费，绝无隐形消费，司机餐费随心自愿。' },
      { title: '支持多币种灵活便捷结算', text: '支持马币 (MYR)、新币 (SGD)、印尼盾银行转账及码头现场扫码 QRIS 即时结算。' },
    ],
  },
  motor: {
    id: [
      { title: 'Dokumen SIM yang Berlaku', text: 'Wajib menunjukkan SIM C (Indonesia) atau Driving License sah (Malaysia Class B2, Singapore 2B, atau SIM Internasional).' },
      { title: 'Jaminan Identitas Asli', text: 'Cukup titip foto paspor/IC/KTP dan satu dokumen identitas fisik asli yang disimpan secara aman selama masa sewa.' },
      { title: 'Deposit Keamanan 100% Refundable', text: 'Deposit jaminan RM 50 / Rp 150.000 per unit, langsung dikembalikan utuh tanpa potongan saat motor dikembalikan.' },
      { title: 'Free Drop & Return Point', text: 'Antar dan jemput unit gratis di Harbour Bay Ferry Terminal, Batam Centre, Mega Mall, serta seluruh hotel di Nagoya.' },
    ],
    en: [
      { title: 'Valid Riding License', text: 'Requires valid national motorbike license (e.g., Malaysia Class B2, Singapore 2B, Indonesian SIM C, or IDP).' },
      { title: 'Original ID Verification', text: 'A copy of passport/ID plus one physical identification document held safely for the duration of the rental.' },
      { title: '100% Refundable Security Deposit', text: 'Security deposit of RM 50 / Rp 150,000 per unit, fully refunded immediately upon motorbike return.' },
      { title: 'Free Delivery & Return Points', text: 'Complimentary drop-off & pickup at Batam Centre, Harbour Bay Terminal, and all major hotels in Nagoya.' },
    ],
    ms: [
      { title: 'Lesen Memandu Sah', text: 'Wajib mengemukakan lesen memandu motosikal yang sah (Kelas B2 Malaysia, Singapura 2B, atau lesen antarabangsa).' },
      { title: 'Pengesahan Identiti Asli', text: 'Salinan pasport/IC dan satu dokumen fizikal asli disimpan secara selamat sepanjang tempoh sewa.' },
      { title: 'Deposit Keselamatan Dikembalikan 100%', text: 'Deposit jaminan RM 50 / Rp 150,000 seunit, dikembalikan sepenuhnya sebaik sahaja motosikal dipulangkan.' },
      { title: 'Titik Hantar & Pulang Percuma', text: 'Penghantaran percuma di Terminal Feri Batam Centre, Harbour Bay, Mega Mall, serta semua hotel di Nagoya.' },
    ],
    zh: [
      { title: '持有效合法驾驶执照', text: '需持有有效驾照（如中国驾照翻译件/国际驾照/马来西亚B2/新加坡2B或印尼当地SIM C）。' },
      { title: '正规身份登记保障', text: '仅需出示护照/身份证复印件，并暂存一件有效随身证件原件，还车时完整奉还。' },
      { title: '押金 100% 全额秒退', text: '每台摩托车押金仅 RM 50 / 15万印尼盾，验车无误还车现场立即秒退还。' },
      { title: '免费全岛码头与酒店送取车', text: '巴淡中心码头、海湾码头 (Harbour Bay) 及名古屋商业区核心酒店均支持免费上门送车还车。' },
    ],
  },
};

const policyLabelMap: Record<'car' | 'motor', Record<string, string>> = {
  car: {
    id: 'Aturan Resmi Charter Mobil — 100% Wajib Didampingi Supir',
    en: 'Official Car Charter Terms — 100% Guided with Dedicated Local Driver',
    ms: 'Syarat Rasmi Sewa Kereta — 100% Bersama Pemandu Tempatan',
    zh: '正规商务包车协议须知 — 100%配备本地专职司机全程护航',
  },
  motor: {
    id: 'Syarat Resmi Sewa Motor — Khusus Lepas Kunci (Self-Drive)',
    en: 'Official Scooter Rental Terms — Self-Drive Freedom',
    ms: 'Syarat Rasmi Sewa Motosikal — Pandu Sendiri (Self-Drive)',
    zh: '正规摩托车租赁须知 — 纯自由自驾 (Self-Drive)',
  },
};

// ── Fasilitas ──
const specs = computed(() => [
  { icon: Users, label: t('vehicle.capacity'), value: t('common.seatsCount', { count: v.seats }) },
  { icon: Luggage, label: t('vehicle.luggageLabel'), value: t('vehicle.luggageUnit', { count: v.luggage }) },
  { icon: Cog, label: t('vehicle.transmissionLabel'), value: t(`common.transmission.${v.transmission}`) },
  { icon: isCar ? UserCheck : KeyRound, label: t('vehicle.serviceLabel'), value: isCar ? t('common.driverService') : t('common.selfDriveService') },
]);

const policy = computed(() => {
  const pType = isCar ? 'car' : 'motor';
  const list = policyMap[pType][locale.value] ?? policyMap[pType].en ?? policyMap[pType].id;
  const icons = isCar ? [Shield, Clock, Fuel, CreditCard] : [IdCard, ShieldCheck, Wallet, MapPin];
  return list.map((item, idx) => ({ icon: icons[idx], title: item.title, text: item.text }));
});

const policyLabel = computed(() => {
  const pType = isCar ? 'car' : 'motor';
  return policyLabelMap[pType][locale.value] ?? policyLabelMap[pType].en ?? policyLabelMap[pType].id;
});
// Syarat dokumen: tamu mancanegara = paspor (+ IDP untuk motor); lokal = KTP (+ SIM C untuk motor). Locale id menampilkan syarat lokal dulu.
const requirements = computed(() => {
  const r = [
    { key: 'intl', icon: Globe2, title: t('vehicle.reqInternational'), text: isCar ? t('vehicle.reqCarInternational') : t('vehicle.reqMotorInternational') },
    { key: 'local', icon: Home, title: t('vehicle.reqLocal'), text: isCar ? t('vehicle.reqCarLocal') : t('vehicle.reqMotorLocal') },
  ];
  return locale.value === 'id' ? r.reverse() : r;
});

// ── Kalender sewa (klien saja: bergantung tanggal hari ini → dirender di <ClientOnly>) ──
const INTL: Record<string, string> = { en: 'en-SG', ms: 'ms-MY', zh: 'zh-SG', id: 'id-ID' };
const iso = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10);
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
// Senin–Minggu (1 Jan 2024 = Senin)
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
const start = ref('');
const finish = ref('');
function pick(d: string) {
  if (!start.value || finish.value || d < start.value) {
    start.value = d;
    finish.value = '';
  } else finish.value = d;
}
const days = computed(() => {
  if (!start.value || !finish.value) return 1;
  return Math.min(60, Math.round((Date.parse(finish.value) - Date.parse(start.value)) / 86400000) + 1);
});
const end = computed(() => finish.value || start.value);
const message = computed(() =>
  t('whatsapp.vehicle', {
    vehicle: name,
    service: scheme(v.type),
    start: fmtDate(start.value),
    end: fmtDate(end.value),
    days: days.value,
    total: vehPrice(v.pricePerDay, days.value),
    url: url.value,
  }),
);

// ── Tab kartu ringkasan ──
const tab = ref('fasilitas');
const detailTabs = computed(() => [
  { id: 'fasilitas', label: t('vehicle.facilities'), icon: ListChecks },
  { id: 'deskripsi', label: t('vehicle.description'), icon: FileText },
  { id: 'ketentuan', label: t('vehicle.terms'), icon: ScrollText },
]);
</script>

<template>
  <div class="bg-[#F8FAFC] dark:bg-slate-950">
    <section class="wrap pt-6 pb-12 sm:pb-16">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="mb-5 text-sm text-slate-500 dark:text-slate-400">
        <ol class="flex flex-wrap items-center gap-1">
          <li><NuxtLink :to="localePath('/')" class="hover:text-[#1E40AF] hover:underline dark:hover:text-sky-400">{{ t('nav.home') }}</NuxtLink></li>
          <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><NuxtLink :to="localePath('/vehicles')" class="hover:text-[#1E40AF] hover:underline dark:hover:text-sky-400">{{ t('nav.vehicles') }}</NuxtLink></li>
          <li class="flex items-center gap-1"><ChevronRight aria-hidden="true" class="h-3.5 w-3.5" /><span aria-current="page" class="font-semibold text-slate-900 dark:text-white">{{ name }}</span></li>
        </ol>
      </nav>

      <div class="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div class="min-w-0 space-y-8">
          <!-- 1. Galeri: foto utama + baris thumbnail di bawahnya -->
          <div id="galeri" class="scroll-mt-24 space-y-3">
            <div class="relative overflow-hidden rounded-3xl bg-slate-200 aspect-[16/10] shadow-lg dark:bg-slate-800">
              <img v-if="photos[active]" :src="img(photos[active])" :alt="name" fetchpriority="high" class="h-full w-full object-cover" />
            </div>
            <div v-if="photos.length > 1" class="grid grid-cols-4 gap-3">
              <button
                v-for="(f, i) in photos.slice(0, 4)"
                :key="f"
                type="button"
                :aria-label="`${name} — foto ${i + 1}`"
                :class="[
                  'relative overflow-hidden rounded-2xl bg-slate-200 aspect-[4/3] transition dark:bg-slate-800',
                  i === active ? 'ring-4 ring-[#1E40AF] dark:ring-sky-400' : 'hover:opacity-90',
                ]"
                @click="active = i"
              >
                <img :src="img(f)" :alt="`${name} ${i + 1}`" loading="lazy" class="h-full w-full object-cover" />
              </button>
            </div>
          </div>

          <!-- 2. Judul -->
          <!-- Kartu judul -->
          <header class="rounded-3xl border border-[#E2E8F0] bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3 p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-slate-200/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">{{ t(`vehicle.category.${v.category}`) }}</span>
              <span v-if="v.bestSeller" class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold uppercase text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                <Star aria-hidden="true" class="h-3 w-3 fill-current" /> {{ t('common.bestSeller') }}
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ name }}</h1>
            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300">{{ loc(v.tagline) }}</p>
          </header>

          <!-- Kartu tab: fasilitas, deskripsi, (destinasi), ketentuan -->
          <article class="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
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
            <h2 id="fasilitas" class="sr-only">{{ t('vehicle.facilities') }}</h2>
            <dl class="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div v-for="s in specs" :key="s.label" class="rounded-2xl bg-blue-50/70 p-4 dark:bg-slate-800">
                <component :is="s.icon" aria-hidden="true" class="h-5 w-5 text-[#1E40AF] dark:text-sky-400" />
                <dt class="mt-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ s.label }}</dt>
                <dd class="font-extrabold text-slate-900 dark:text-white">{{ s.value }}</dd>
              </div>
            </dl>
            <ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
              <li v-for="inc in locArray(v.inclusions)" :key="inc" class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#16A34A] dark:bg-emerald-950/60"><Check aria-hidden="true" class="h-3.5 w-3.5 stroke-[3]" /></span>
                {{ inc }}
              </li>
            </ul>
            <div v-if="v.chips" class="mt-5 flex flex-wrap gap-2">
              <span v-for="chip in locArray(v.chips)" :key="chip" class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-[#1E40AF] dark:bg-slate-800 dark:text-sky-400">{{ chip }}</span>
            </div>
          </section>

          <!-- 4. Deskripsi -->
          <section id="panel-deskripsi" role="tabpanel" :aria-labelledby="`tab-deskripsi`" v-show="tab === 'deskripsi'" class="p-6 sm:p-8">
            <h2 id="deskripsi" class="sr-only">{{ t('vehicle.description') }}</h2>
            <p class="leading-relaxed text-slate-700 dark:text-slate-200">{{ description }}</p>
            <div class="mt-4 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-slate-700 dark:bg-amber-950/30 dark:text-slate-200">
              <Sparkles aria-hidden="true" class="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <p class="leading-relaxed">{{ answer }}</p>
            </div>
          </section>

          <!-- 5. Ketentuan -->
          <section id="panel-ketentuan" role="tabpanel" :aria-labelledby="`tab-ketentuan`" v-show="tab === 'ketentuan'" class="p-6 sm:p-8">
            <h2 id="ketentuan" class="sr-only">{{ t('vehicle.terms') }}</h2>
            <p :class="['mt-1 mb-5 text-xs font-extrabold uppercase tracking-wider', isCar ? 'text-[#1E40AF] dark:text-sky-400' : 'text-amber-600 dark:text-amber-400']">{{ policyLabel }}</p>
            <ul class="space-y-3.5 text-sm text-slate-600 leading-relaxed dark:text-slate-300">
              <li v-for="item in policy" :key="item.title" class="flex items-start gap-3">
                <span :class="['flex h-8 w-8 shrink-0 items-center justify-center rounded-xl', isCar ? 'bg-blue-50 text-[#1E40AF] dark:bg-blue-950/60 dark:text-sky-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400']">
                  <component :is="item.icon" aria-hidden="true" class="h-4 w-4" />
                </span>
                <div><strong class="text-slate-900 dark:text-white">{{ item.title }}:</strong> {{ item.text }}</div>
              </li>
            </ul>
            <h3 class="mt-6 mb-3 text-base font-extrabold text-slate-900 dark:text-white">{{ t('vehicle.requirementsTitle') }}</h3>
            <div class="grid gap-3 sm:grid-cols-2">
              <div v-for="r in requirements" :key="r.key" class="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                <p class="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white"><component :is="r.icon" aria-hidden="true" class="h-4 w-4 text-[#1E40AF] dark:text-sky-400" />{{ r.title }}</p>
                <p class="mt-2 flex gap-2 text-sm text-slate-600 dark:text-slate-300"><FileCheck2 aria-hidden="true" class="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />{{ r.text }}</p>
              </div>
            </div>
          </section>
          </article>
        </div>

        <!-- Kartu harga: harga, kalender, tombol WhatsApp -->
        <aside class="lg:sticky lg:top-24 lg:self-start space-y-3">
          <div class="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <span class="block text-xs font-semibold text-slate-400">{{ t('common.from') }}</span>
            <p class="flex items-baseline gap-1.5">
              <span class="text-3xl font-extrabold tabular-nums text-[#1E40AF] dark:text-sky-400">{{ vehPrice(v.pricePerDay) }}</span>
              <span class="text-sm text-slate-400">{{ t('vehicle.perDayShort') }}</span>
            </p>
            <p v-if="fxNote('vehicle')" class="mt-1 text-[11px] text-slate-400">{{ fxNote('vehicle') }}</p>

            <!-- Kalender -->
            <div class="mt-5 rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
              <p class="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white"><CalendarDays aria-hidden="true" class="h-4 w-4 text-[#1E40AF] dark:text-sky-400" />{{ t('booking.pickDates') }}</p>
              <ClientOnly>
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <button type="button" :disabled="!canPrev" :aria-label="t('booking.prevMonth')" class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 disabled:opacity-30 dark:hover:bg-slate-800" @click="shift(-1)">
                      <ChevronLeft aria-hidden="true" class="h-4 w-4" />
                    </button>
                    <span class="text-sm font-extrabold capitalize text-slate-900 dark:text-white">{{ monthLabel }}</span>
                    <button type="button" :aria-label="t('booking.nextMonth')" class="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" @click="shift(1)">
                      <ChevronRight aria-hidden="true" class="h-4 w-4" />
                    </button>
                  </div>
                  <div class="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-slate-400">
                    <span v-for="(w, i) in weekdays" :key="i">{{ w }}</span>
                  </div>
                  <div class="mt-1 grid grid-cols-7 gap-1">
                    <template v-for="(d, i) in cells" :key="i">
                      <span v-if="!d" />
                      <button
                        v-else
                        type="button"
                        :disabled="d < today"
                        :aria-pressed="d === start || d === finish"
                        :class="[
                          'h-9 rounded-lg text-sm font-semibold tabular-nums transition disabled:cursor-not-allowed disabled:text-slate-300 dark:disabled:text-slate-600',
                          d === start || d === finish
                            ? 'bg-[#1E40AF] text-white shadow-md'
                            : start && finish && d > start && d < finish
                              ? 'bg-blue-100 text-[#1E40AF] dark:bg-blue-950/70 dark:text-sky-300'
                              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                          d === today && d !== start && 'ring-1 ring-[#1E40AF]/40',
                        ]"
                        @click="pick(d)"
                      >
                        {{ Number(d.slice(8)) }}
                      </button>
                    </template>
                  </div>
                </div>
                <template #fallback>
                  <div class="h-[264px] animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
                </template>
              </ClientOnly>
              <p class="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                {{ !start ? t('booking.pickStart') : !finish ? t('booking.selectEnd') : `${fmtDate(start)} – ${fmtDate(finish)}` }}
              </p>
            </div>

            <!-- Ringkasan & tombol WA -->
            <div class="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <span class="text-sm text-slate-500 dark:text-slate-400">{{ t('booking.daysSelected', { days }) }}</span>
              <span class="text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">{{ vehPrice(v.pricePerDay, days) }}</span>
            </div>
            <a
              :href="waUrl(message)"
              target="_blank"
              rel="noopener"
              data-wa="vehicle"
              class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#15803D] py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-[#166534] hover:shadow-lg active:scale-[0.99]"
            >
              <span aria-hidden="true" class="icon-wa h-5 w-5" />{{ t('common.bookWhatsApp') }}
            </a>
          </div>
          <p class="px-2 text-center text-xs text-slate-500 dark:text-slate-400">
            {{ t('payment.warning') }}
            <NuxtLink :to="`${localePath('/contact')}#payment`" class="font-bold text-[#1E40AF] underline dark:text-sky-400">{{ t('booking.paymentTitle') }}</NuxtLink>
          </p>
        </aside>
      </div>
    </section>

    <!-- 6. Kendaraan lainnya (kartu sama dengan halaman daftar) -->
    <section class="wrap pb-4">
      <div class="mb-6 flex items-end justify-between gap-3">
        <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{{ t('common.recommendations') }}</h2>
        <NuxtLink :to="localePath('/vehicles')" class="inline-flex items-center gap-1 text-sm font-bold text-[#1E40AF] hover:underline dark:text-sky-400">
          {{ t('vehicle.fleetTitle') }} <ArrowRight aria-hidden="true" class="h-4 w-4" />
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="x in others"
          :key="x.slug"
          :class="[
            'group bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900',
            x.bestSeller ? 'border-2 border-amber-400/80 shadow-[0_6px_20px_rgba(250,204,21,0.12)]' : 'border border-[#E2E8F0] shadow-[0_4px_12px_rgba(30,64,175,0.08)] dark:border-slate-800',
          ]"
        >
          <NuxtLink :to="localePath(`/vehicles/${x.slug}`)" class="relative block rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-100 dark:bg-slate-800">
            <img v-if="img(x.images[0])" :src="img(x.images[0])" :alt="`${x.brand} ${x.model}`" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </NuxtLink>
          <div class="flex-1 flex flex-col px-1">
            <h3 class="text-base sm:text-lg font-extrabold text-slate-900 mb-1 dark:text-white">
              <NuxtLink :to="localePath(`/vehicles/${x.slug}`)" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">{{ x.brand }} {{ x.model }}</NuxtLink>
            </h3>
            <p class="text-xs text-slate-500 leading-relaxed mb-3.5 line-clamp-2 dark:text-slate-400">{{ loc(x.tagline) }}</p>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 dark:bg-slate-800/60 dark:text-slate-200 dark:border-slate-800">
              <div class="flex items-center gap-1.5"><Users aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.seatsCount', { count: x.seats }) }}</div>
              <div class="flex items-center gap-1.5"><Luggage aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t('common.luggageCount', { count: x.luggage }) }}</div>
              <div class="flex items-center gap-1.5"><Cog aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />{{ t(`common.transmission.${x.transmission}`) }}</div>
              <div class="flex items-center gap-1.5">
                <component :is="x.type === 'car' ? UserCheck : KeyRound" aria-hidden="true" class="h-3.5 w-3.5 shrink-0 text-[#1E40AF] dark:text-sky-400" />
                {{ x.type === 'car' ? t('common.driverService') : t('common.selfDriveService') }}
              </div>
            </div>
            <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
              <span class="block text-[10px] font-semibold text-slate-400">{{ t('common.from') }}</span>
              <div class="flex items-baseline gap-1 mb-3">
                <span class="text-xl sm:text-2xl font-extrabold text-[#1E40AF] tabular-nums dark:text-sky-400">{{ vehPrice(x.pricePerDay) }}</span>
                <span class="text-xs text-slate-400 font-medium">{{ t('vehicle.perDayShort') }}</span>
              </div>
              <NuxtLink
                :to="localePath(`/vehicles/${x.slug}`)"
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

    <!-- 7. CTA -->
    <Cta />
  </div>
</template>
