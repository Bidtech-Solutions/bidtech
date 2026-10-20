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

export function useSite() {
  const { locale, t } = useI18n();
  const currency = useState<Cur>('ft-currency', () => DEFAULT_CUR[locale.value] ?? 'MYR');
  const rates = useState<Rates>('ft-rates', () => snapshot as Rates);

  /** Teks 4 bahasa dari data JSON: loc(pkg.name). */
  const loc = (v: Record<string, string>) => v[locale.value] ?? v.en ?? '';
  /** URL foto dari app/assets/images/<file> atau URL remote (http/https); undefined bila belum ada. */
  const img = (file?: string | null) => (!file ? undefined : file.startsWith('http') ? file : photos[file]);
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
    if (kind === 'package' && currency.value === 'IDR') return t('price.foreignOnly');
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

  return { site, loc, img, fmt, fmtDate, waUrl, currency, setCurrency, pkgPrice, vehPrice, fxNote, facility, ferryAddOn, scheme, toggleTheme, initClient };
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
