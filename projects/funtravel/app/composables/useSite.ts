/**
 * Satu-satunya composable proyek: data situs, teks per bahasa, mata uang, WhatsApp, foto.
 * Dipakai semua halaman & komponen: `const { site, loc, pkgPrice, waUrl } = useSite()`.
 * Aturan bisnis kurs ada di sini (jangan disalin ke halaman). Lihat docs/ARCHITECTURE.md §6.
 */
import site from '~/assets/data/site.json';
import snapshot from '~/assets/data/rates.json';
import pkgData from '~/assets/data/packages.json';

type Cur = 'IDR' | 'MYR' | 'SGD';
type Rates = { date: string | null; rates: Record<Cur, number> };

const SYMBOL: Record<Cur, string> = { IDR: 'Rp', MYR: 'RM', SGD: 'S$' };
const INTL: Record<string, string> = { en: 'en-SG', ms: 'ms-MY', zh: 'zh-SG', id: 'id-ID' };
const DEFAULT_CUR: Record<string, Cur> = { id: 'IDR', ms: 'MYR', zh: 'SGD', en: 'MYR' }; // default per bahasa
const COUNTRY_CUR: Record<string, Cur> = { ID: 'IDR', MY: 'MYR', SG: 'SGD' }; // cookie ft_country (Nginx)
// Kunci glob berbeda antara dev/build (/app/assets/… vs /assets/…), jadi dipetakan ulang ke path relatif: 'packages/a4-1.webp'.
const photos = Object.fromEntries(
  Object.entries(import.meta.glob<string>('~/assets/images/**/*.{webp,jpg,png}', { eager: true, import: 'default', query: '?url' })).map(([k, v]) => [
    k.replace(/^.*\/assets\/images\//, ''),
    v,
  ]),
);

/** Pembulatan SELALU ke atas: MYR/SGD ke 1 unit, IDR ke Rp 1.000 (epsilon menahan galat floating point). */
const roundUp = (n: number, cur: Cur) => (cur === 'IDR' ? Math.ceil((n - 1e-9) / 1000) * 1000 : Math.ceil(n - 1e-9));
const convert = (n: number, from: Cur, to: Cur, r: Rates) => (from === to ? n : roundUp((n / r.rates[from]) * r.rates[to], to));
const isCur = (v: unknown): v is Cur => v === 'IDR' || v === 'MYR' || v === 'SGD';

const CHIP_TRANSLATIONS: Record<string, Record<string, string>> = {
  'AC Double Blower': { id: 'AC Double Blower', en: 'Dual AC Blower', ms: 'Penyaman Udara Berkembar', zh: '双温区独立后排出风口' },
  'USB Charger': { id: 'USB Charger', en: 'USB Charger', ms: 'Pengecas Pantas USB', zh: 'USB 手机快充接口' },
  'Free Port Pickup': { id: 'Gratis Jemput Pelabuhan', en: 'Free Port Pickup', ms: 'Penjemputan Feri Percuma', zh: '免费码头接送迎宾' },
  'Extra Legroom Reclining': { id: 'Legroom Luas & Reclining', en: 'Extra Legroom & Recline', ms: 'Ruang Kaki Luas & Boleh Laras', zh: '超宽敞腿部空间与可调靠背' },
  'Coolbox Mineral': { id: 'Coolbox & Air Mineral', en: 'Coolbox & Mineral Water', ms: 'Kotak Sejuk & Air Mineral', zh: '车载冰盒与清凉矿泉水' },
  'Papan Nama Penjemputan': { id: 'Papan Nama Tamu', en: 'VIP Paging Nameboard', ms: 'Papan Nama Penjemputan', zh: '专属定制接送名牌' },
  'Modern TNGA Chassis': { id: 'Sasis TNGA Modern', en: 'Modern TNGA Platform', ms: 'Casis TNGA Moden', zh: '丰田新一代 TNGA 平台架构' },
  'Smart Key & Ambient': { id: 'Smart Key & Ambient Light', en: 'Smart Key & Ambient Light', ms: 'Kunci Pintar & Lampu Suasana', zh: '智能无钥匙启动与氛围灯' },
  'Super Smooth Drive': { id: 'Suspensi Super Halus', en: 'Super Smooth Ride', ms: 'Tunggangan Lembut & Selesa', zh: '旗舰级静谧平稳舒适驾乘' },
  '14 Kursi Reclining': { id: '14 Kursi Reclining', en: '14 Reclining Seats', ms: '14 Tempat Duduk Boleh Laras', zh: '14座可调高靠背商务座椅' },
  'High Ceiling Cabin': { id: 'Kabin Plafon Tinggi', en: 'High-Roof Cabin', ms: 'Kabin Siling Tinggi', zh: '高顶大空间尊贵通透车厢' },
  'Muat Bag Golf & Koper': { id: 'Muat Tas Golf & Koper', en: 'Fits Golf Bags & Luggage', ms: 'Muat Beg Golf & Bagasi', zh: '容纳高尔夫球包与大行李' },
  'Jok Kulit Mewah': { id: 'Jok Kulit Mewah', en: 'Luxury Leather Seats', ms: 'Kusyen Kulit Mewah', zh: '全包覆豪华真皮座椅' },
  'High Ground Clearance': { id: 'Ground Clearance Tinggi', en: 'High Ground Clearance', ms: 'Kelegaan Tanah Tinggi', zh: '高底盘强劲越野通过性' },
  'Gagah & Prestisius': { id: 'Gagah & Prestisius', en: 'Bold & Prestigious', ms: 'Gagah & Bergaya', zh: '硬派霸气尊贵商务外观' },
  'Ottoman Captain Seat': { id: 'Kursi Ottoman Captain Seat', en: 'Ottoman Captain Seats', ms: 'Tempat Duduk Kapten Ottoman VIP', zh: '头等舱 Ottoman 航空头枕座椅' },
  'Double Sunroof': { id: 'Double Sunroof Panoramic', en: 'Dual Panoramic Sunroof', ms: 'Bumbung Suria Berkembar', zh: '双天窗全景天幕视野' },
  'Layanan Protokol VIP': { id: 'Layanan Protokol VIP', en: 'VIP Protocol Service', ms: 'Perkhidmatan Protokol VIP', zh: '贵宾迎宾接待协议标准服务' },
  '2 Helm SNI Bersih': { id: '2 Helm Bersih & Nyaman', en: '2 Clean Certified Helmets', ms: '2 Topi Keledar Bersih', zh: '随车免费附赠2顶清洁头盔' },
  'Jas Hujan Siap': { id: 'Jas Hujan Siap Pakai', en: 'Raincoats Provided', ms: 'Baju Hujan Disediakan', zh: '贴心配备高品质雨衣' },
  'Super Irit Bensin': { id: 'Sangat Hemat BBM', en: 'Eco Fuel Efficient', ms: 'Sangat Jimat Minyak', zh: '百公里超低油耗省心环保' },
  'Tarikan Enteng': { id: 'Tarikan Mesin Enteng', en: 'Agile & Responsive', ms: 'Pecutan Ringan & Lincah', zh: '车身轻盈操控灵活自如' },
  'Sangat Irit': { id: 'Sangat Irit Bahan Bakar', en: 'Highly Economical', ms: 'Jimat Bahan Api', zh: '省油节能经济之选' },
  'Bebas Macet': { id: 'Lincah Bebas Macet', en: 'Traffic-Free Mobility', ms: 'Lancar Tanpa Kesesakan', zh: '自由穿梭城市小巷避开拥堵' },
  'Mesin 160cc Mantap': { id: 'Mesin 160cc Bertenaga', en: 'Powerful 160cc Engine', ms: 'Enjin 160cc Berkuasa', zh: '160cc eSP+ 强劲动力引擎' },
  'Bagasi Helm-In Luas': { id: 'Bagasi Helm-In Luas', en: 'Spacious Underseat Storage', ms: 'Ruang Simpanan Bawah Luas', zh: '大容量座桶轻松收纳头盔' },
  'Rem CBS Aman': { id: 'Sistem Rem CBS Aman', en: 'CBS Safety Braking', ms: 'Sistem Brek CBS Selamat', zh: 'CBS 智能联动安全制动系统' },
  'Posisi Duduk Selonjor': { id: 'Posisi Duduk Selonjor Nyaman', en: 'Relaxed Riding Stance', ms: 'Kedudukan Kaki Memanjang', zh: '巡航级宽适伸展搁脚踏板空间' },
  'Shock Tabung Empuk': { id: 'Shock Tabung Empuk', en: 'Comfort Sub-Tank Shocks', ms: 'Suspensi Tangki Tambahan Empuk', zh: '带气瓶双枪后减震器极致舒适' },
  'Bagasi 24 Liter': { id: 'Bagasi 24 Liter Luas', en: '24L Large Storage', ms: 'Ruang Simpanan 24 Liter', zh: '24升超大置物箱随行无忧' },
};

export function useSite() {
  const { locale, t } = useI18n();
  const currency = useState<Cur>('ft-currency', () => DEFAULT_CUR[locale.value] ?? 'MYR');
  const rates = useState<Rates>('ft-rates', () => snapshot as Rates);

  /** Teks 4 bahasa dari data JSON: loc(pkg.name). */
  const loc = (v: Record<string, string>) => v[locale.value] ?? v.en ?? '';
  /** Terjemahan chip spesifikasi kendaraan */
  const chipLoc = (chip: string) => CHIP_TRANSLATIONS[chip]?.[locale.value] ?? CHIP_TRANSLATIONS[chip]?.en ?? chip;
  /** Daftar array terjemahan (chips atau inclusions) */
  const locArray = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val.map((item) => (typeof item === 'string' ? chipLoc(item) : loc(item)));
    }
    const selected = val[locale.value] ?? val.en ?? val.id;
    return Array.isArray(selected) ? selected : [];
  };
  /** URL foto dari app/assets/images/<file>, folder public (/images/...), atau URL remote (http/https); undefined bila belum ada. */
  const img = (file?: string | null) => (!file ? undefined : file.startsWith('http') || file.startsWith('/') ? file : photos[file]);
  const fmt = (n: number, cur: Cur) => `${SYMBOL[cur]} ${new Intl.NumberFormat(INTL[locale.value]).format(n)}`;
  const fmtDate = (iso: string) =>
    iso ? new Intl.DateTimeFormat(INTL[locale.value], { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`)) : t('booking.notSet');
  /** wa.me dengan pesan ter-encode. Tidak ada data yang dikirim ke server mana pun. */
  const waUrl = (message: string, admin = 0) => `https://wa.me/${site.admins[admin]?.phone}?text=${encodeURIComponent(message)}`;

  // Paket: harga dasar MYR, tampil MYR/SGD (pilih IDR → tetap MYR + catatan). Per pax dibulatkan dulu, lalu × jumlah.
  const pkgCur = computed<Cur>(() => (currency.value === 'SGD' ? 'SGD' : 'MYR'));
  const pkgPrice = (myr: number, pax = 1) => fmt(convert(myr, 'MYR', pkgCur.value, rates.value) * pax, pkgCur.value);
  // Kendaraan: harga dasar IDR, tampil IDR/MYR/SGD. Total hari dibulatkan sekali.
  const vehPrice = (idr: number, days = 1) => fmt(convert(idr * days, 'IDR', currency.value, rates.value), currency.value);

  /** Catatan di dekat harga: "harga konversi = estimasi" atau "paket khusus mancanegara"; '' bila tidak perlu. */
  const fxNote = (kind: 'package' | 'vehicle') => {
    if (kind === 'package' && currency.value === 'IDR') return '';
    if (currency.value === (kind === 'package' ? 'MYR' : 'IDR')) return '';
    const d = rates.value.date;
    return d ? t('price.estimateNote', { date: fmtDate(d) }) : t('price.estimateNoteSeed');
  };

  /** Fasilitas paket (include/exclude/catatan) per kunci, sudah diterjemahkan. */
  const facility = (key: string) => {
    const f = (pkgData.facilities as Record<string, { label: Record<string, string>; detail?: Record<string, string> }>)[key];
    return { label: f ? loc(f.label) : key, detail: f?.detail ? loc(f.detail) : '' };
  };
  /** Catatan terminal ferry (wajib di setiap paket): harga dari terminal Malaysia, add-on dari Singapura. */
  const ferryAddOn = (a: { amount: number; currency: Cur } | null) =>
    a ? t('package.ferryAddOn', { price: fmt(a.amount, a.currency) }) : t('package.ferryAddOnUnknown');
  /** Skema sewa dikunci per jenis: mobil = dengan sopir, motor = lepas kunci (tidak ada toggle). */
  const scheme = (type: string) => (type === 'car' ? t('common.withDriver') : t('common.selfDrive'));

  function setCurrency(c: Cur) {
    currency.value = c;
    try {
      localStorage.setItem('ft_currency', c);
    } catch {
      /* penyimpanan diblokir */
    }
  }

  /** Mode gelap/terang: kelas `dark` di <html> + simpan pilihan (dibaca skrip head di layout). */
  function toggleTheme() {
    const dark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('ft_theme', dark ? 'dark' : 'light');
    } catch {
      /* penyimpanan diblokir */
    }
  }

  /** Dipanggil layout lewat onNuxtReady (setelah hidrasi, agar markup SSR & klien tetap identik). */
  function initClient() {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('ft_currency');
    } catch {
      /* diblokir */
    }
    const country = document.cookie.match(/(?:^|; )ft_country=([A-Z]{2})/)?.[1] ?? '';
    const pick = isCur(saved) ? saved : COUNTRY_CUR[country];
    if (pick) currency.value = pick;
    refreshRates(rates);

    // Pelacakan klik WhatsApp (GA4 bila aktif): elemen dengan atribut data-wa="<sumber>"
    document.addEventListener('click', (e) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-wa]');
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      if (el && gtag) gtag('event', 'wa_click', { source: el.dataset.wa, locale: document.documentElement.lang, currency: currency.value });
    });
  }

  return { site, loc, locArray, chipLoc, img, fmt, fmtDate, waUrl, currency, setCurrency, pkgPrice, vehPrice, fxNote, facility, ferryAddOn, scheme, toggleTheme, initClient };
}

// ── Kurs terbaru (client): snapshot build → kurs referensi harian, cache 12 jam ──────────────
const RATE_ENDPOINTS = ['https://api.frankfurter.dev/v1/latest?base=MYR&symbols=SGD,IDR', 'https://open.er-api.com/v6/latest/MYR'];

async function refreshRates(state: Ref<Rates>) {
  const KEY = 'ft_rates_v1';
  const apply = (r: Rates) => {
    if (r.rates.SGD !== state.value.rates.SGD || r.rates.IDR !== state.value.rates.IDR) state.value = r;
  };
  try {
    const c = JSON.parse(localStorage.getItem(KEY) ?? 'null') as { at: number; r: Rates } | null;
    if (c && Date.now() - c.at < 12 * 3600 * 1000) return apply(c.r);
  } catch {
    /* diblokir / rusak */
  }
  for (const url of RATE_ENDPOINTS) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const j = (await res.json()) as { rates?: Record<string, number>; date?: string; time_last_update_utc?: string };
      const { SGD, IDR } = j.rates ?? {};
      if (!SGD || !IDR) continue;
      const date = j.date ?? (j.time_last_update_utc ? new Date(j.time_last_update_utc).toISOString().slice(0, 10) : null);
      const r: Rates = { date, rates: { MYR: 1, SGD, IDR } };
      try {
        localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), r }));
      } catch {
        /* abaikan */
      }
      return apply(r);
    } catch {
      /* coba endpoint berikutnya; gagal semua → tetap pakai snapshot build */
    }
  }
}
