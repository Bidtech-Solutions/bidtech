<script setup lang="ts">
import {
  Car,
  Check,
  ChevronDown,
  Menu,
  TreePalm,
  X,
} from '@lucide/vue';
import logo from '~/assets/images/logo.webp';

const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const { site, currency, setCurrency, waUrl } = useSite();

const nav = computed(() => [
  { to: localePath('/'), label: t('nav.home'), page: 'home' },
  { to: localePath('/vehicles'), label: t('nav.vehicles'), page: 'vehicles' },
  { to: localePath('/packages'), label: t('nav.packages'), page: 'packages' },
  { to: localePath('/contact'), label: t('nav.contact'), page: 'contact' },
]);

// Language options
const languageList = [
  { code: 'id', label: 'ID', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'ms', label: 'MS', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'zh', label: 'ZH', name: '简体中文', flag: '🇨🇳' },
];

// Currency options
const currencyList = [
  { code: 'MYR', label: 'MYR', name: 'Ringgit Malaysia', symbol: 'RM', flag: '🇲🇾' },
  { code: 'SGD', label: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'IDR', label: 'IDR', name: 'Rupiah Indonesia', symbol: 'Rp', flag: '🇮🇩' },
];

// Dropdown state
const langOpen = ref(false);
const currOpen = ref(false);

const toggleLang = () => {
  langOpen.value = !langOpen.value;
  if (langOpen.value) currOpen.value = false;
};

const toggleCurr = () => {
  currOpen.value = !currOpen.value;
  if (currOpen.value) langOpen.value = false;
};

const closeAll = () => {
  langOpen.value = false;
  currOpen.value = false;
};

const changeLocale = (code: string) => {
  closeAll();
  open.value = false;
  navigateTo(switchLocalePath(code as typeof locale.value));
};

const changeCurrency = (c: 'IDR' | 'MYR' | 'SGD') => {
  closeAll();
  open.value = false;
  setCurrency(c);
};

// Halaman aktif untuk nav desktop & switcher mobile
const onVehicles = computed(() => route.path.startsWith(localePath('/vehicles')));
const onPackages = computed(() => route.path.startsWith(localePath('/packages')));
const onContact = computed(() => route.path.startsWith(localePath('/contact')));
const isHome = computed(() => route.path === localePath('/') || route.path === `/${locale.value}`);

const isActive = (page?: string) => {
  if (page === 'vehicles') return onVehicles.value;
  if (page === 'packages') return onPackages.value;
  if (page === 'contact') return onContact.value;
  if (page === 'home') return isHome.value;
  return false;
};

// Menu mobile
const open = ref(false);
watch(() => route.fullPath, () => {
  open.value = false;
  closeAll();
});
watch(open, (v) => import.meta.client && (document.body.style.overflow = v ? 'hidden' : ''));

onMounted(() => {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (!target.closest('[data-dropdown="lang"]') && !target.closest('[data-dropdown="curr"]')) {
      closeAll();
    }
  };
  document.addEventListener('click', handler);
  onUnmounted(() => document.removeEventListener('click', handler));
});
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95"
    @keydown.esc="closeAll(); open = false"
  >
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-2">
      {{ t('nav.skip') }}
    </a>
    <div class="wrap flex h-20 items-center justify-between gap-3">
      <!-- Official Brand Logo -->
      <NuxtLink :to="localePath('/')" class="shrink-0 flex items-center focus:outline-none" :aria-label="site.brandName">
        <img
          :src="logo"
          :alt="site.brandName"
          width="200"
          height="54"
          class="h-9 sm:h-11 md:h-12 w-auto object-contain"
        />
      </NuxtLink>

      <!-- Center Desktop Navigation -->
      <nav aria-label="Main" class="hidden flex-1 items-center justify-center gap-1 xl:gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex">
        <NuxtLink
          v-for="i in nav"
          :key="i.to"
          :to="i.to"
          :class="[
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0047AB]',
            isActive(i.page)
              ? 'text-[#0047AB] font-extrabold bg-blue-50/80 shadow-2xs'
              : 'text-slate-600 hover:text-[#0047AB] hover:bg-blue-50/60 font-semibold',
          ]"
        >
          <span>{{ i.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Right Action Controls -->
      <div class="flex items-center gap-2 sm:gap-2.5">
        <!-- 1. Custom Language Selector Dropdown (Desktop Only) -->
        <div class="relative hidden lg:block" data-dropdown="lang">
          <button
            type="button"
            :aria-expanded="langOpen"
            aria-haspopup="listbox"
            :class="[
              'h-9 px-3 sm:px-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-1.5 cursor-pointer text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-[#0047AB]',
              langOpen
                ? 'border-[#0047AB] bg-blue-50 text-[#0047AB] shadow-sm dark:bg-slate-800 dark:border-sky-400 dark:text-sky-400'
                : 'border-slate-200 bg-white hover:border-[#0047AB]/50 hover:bg-slate-50 text-[#0047AB] shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-sky-400'
            ]"
            @click.stop="toggleLang"
          >
            <FlagIcon :code="locale" class="w-5 h-3.5" />
            <span class="tracking-wide">{{ locale.toUpperCase() }}</span>
            <ChevronDown
              aria-hidden="true"
              :class="['h-3.5 w-3.5 shrink-0 transition-transform duration-200 text-[#0047AB] dark:text-sky-400', langOpen && 'rotate-180']"
            />
          </button>

          <!-- Floating Dropdown Card -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-1"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-1"
          >
            <div
              v-if="langOpen"
              class="absolute right-0 mt-2 w-52 sm:w-56 z-50 origin-top-right rounded-2xl bg-white border border-slate-200/90 shadow-xl p-1.5 space-y-1 dark:bg-slate-900 dark:border-slate-800"
              role="listbox"
              :aria-label="t('nav.language')"
            >
              <div class="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
                <span>{{ t('nav.languageTitle') }}</span>
                <span class="text-[9px] font-bold text-slate-400/80">4 REGIONS</span>
              </div>

              <button
                v-for="l in languageList"
                :key="l.code"
                type="button"
                role="option"
                :aria-selected="locale === l.code"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer text-left',
                  locale === l.code
                    ? 'bg-[#0047AB] text-white font-extrabold shadow-xs dark:bg-[#0047AB] dark:text-white'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-semibold dark:text-slate-200 dark:hover:bg-slate-800'
                ]"
                @click="changeLocale(l.code)"
              >
                <div class="flex items-center gap-2.5">
                  <FlagIcon :code="l.code" class="w-6 h-4" />
                  <div class="flex flex-col">
                    <span class="font-extrabold leading-tight">{{ l.label }}</span>
                    <span :class="['text-[10px] leading-tight mt-0.5', locale === l.code ? 'text-white/85' : 'text-slate-400 dark:text-slate-400']">{{ l.name }}</span>
                  </div>
                </div>
                <Check v-if="locale === l.code" aria-hidden="true" class="h-4 w-4 shrink-0 text-white stroke-[2.5]" />
              </button>
            </div>
          </Transition>
        </div>

        <!-- 2. Custom Currency Selector Dropdown (Desktop Only) -->
        <div class="relative hidden lg:block" data-dropdown="curr">
          <button
            type="button"
            :aria-expanded="currOpen"
            aria-haspopup="listbox"
            :class="[
              'h-9 px-3 sm:px-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-1.5 cursor-pointer text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-[#0047AB]',
              currOpen
                ? 'border-[#0047AB] bg-blue-50 text-[#0047AB] shadow-sm dark:bg-slate-800 dark:border-sky-400 dark:text-sky-400'
                : 'border-slate-200 bg-white hover:border-[#0047AB]/50 hover:bg-slate-50 text-[#0047AB] shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-sky-400'
            ]"
            @click.stop="toggleCurr"
          >
            <FlagIcon :code="currency" class="w-5 h-3.5" />
            <span class="tracking-wide">{{ currency }}</span>
            <ChevronDown
              aria-hidden="true"
              :class="['h-3.5 w-3.5 shrink-0 transition-transform duration-200 text-[#0047AB] dark:text-sky-400', currOpen && 'rotate-180']"
            />
          </button>

          <!-- Floating Dropdown Card -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-1"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-1"
          >
            <div
              v-if="currOpen"
              class="absolute right-0 mt-2 w-48 sm:w-52 z-50 origin-top-right rounded-2xl bg-white border border-slate-200/90 shadow-xl p-1.5 space-y-1 dark:bg-slate-900 dark:border-slate-800"
              role="listbox"
              :aria-label="t('nav.currency')"
            >
              <div class="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center justify-between">
                <span>{{ t('nav.currencyTitle') }}</span>
                <span class="text-[9px] font-bold text-slate-400/80">3 RATES</span>
              </div>

              <button
                v-for="c in currencyList"
                :key="c.code"
                type="button"
                role="option"
                :aria-selected="currency === c.code"
                :class="[
                  'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer text-left',
                  currency === c.code
                    ? 'bg-[#0047AB] text-white font-extrabold shadow-xs dark:bg-[#0047AB] dark:text-white'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-semibold dark:text-slate-200 dark:hover:bg-slate-800'
                ]"
                @click="changeCurrency(c.code as 'IDR' | 'MYR' | 'SGD')"
              >
                <div class="flex items-center gap-2.5">
                  <FlagIcon :code="c.code" class="w-6 h-4" />
                  <div class="flex flex-col">
                    <span class="font-extrabold leading-tight">{{ c.label }} <span class="font-normal opacity-85">({{ c.symbol }})</span></span>
                    <span :class="['text-[10px] leading-tight mt-0.5', currency === c.code ? 'text-white/85' : 'text-slate-400 dark:text-slate-400']">{{ c.name }}</span>
                  </div>
                </div>
                <Check v-if="currency === c.code" aria-hidden="true" class="h-4 w-4 shrink-0 text-white stroke-[2.5]" />
              </button>
            </div>
          </Transition>
        </div>

        <!-- Book via WhatsApp Button -->
        <a
          :href="waUrl(t('whatsapp.generic'))"
          target="_blank"
          rel="noopener"
          data-wa="header"
          class="inline-flex items-center gap-1.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-full shadow-xs hover:shadow transition-all max-md:hidden"
        >
          <span aria-hidden="true" class="icon-wa h-4 w-4 shrink-0" />
          <span>{{ t('common.bookWhatsApp') }}</span>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-2xl text-navy hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          <Menu v-if="!open" aria-hidden="true" class="h-5 w-5" />
          <X v-else aria-hidden="true" class="h-5 w-5" />
          <span class="sr-only">{{ open ? t('nav.close') : t('nav.menu') }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer via Teleport to body to escape sticky/backdrop-blur stacking context -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-full"
      >
        <div
          v-if="open"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex flex-col bg-[#061749] px-6 pt-[calc(env(safe-area-inset-top,0px)+1.25rem)] pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] text-white lg:hidden overflow-y-auto overscroll-contain"
        >
          <div class="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <NuxtLink :to="localePath('/')" class="shrink-0 flex items-center focus:outline-none" :aria-label="site.brandName" @click="open = false">
              <div class="bg-white rounded-xl px-2.5 py-1 shadow-sm flex items-center">
                <img :src="logo" :alt="site.brandName" class="h-8 w-auto object-contain" />
              </div>
            </NuxtLink>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              @click="open = false"
            >
              <X aria-hidden="true" class="h-6 w-6" />
              <span class="sr-only">{{ t('nav.close') }}</span>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="mt-6 flex flex-col gap-2">
            <NuxtLink
              v-for="i in nav"
              :key="i.to"
              :to="i.to"
              :class="[
                'flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition',
                isActive(i.page)
                  ? 'bg-blue-600/40 text-sky-300 ring-1 ring-sky-400/30'
                  : 'hover:bg-white/10 text-white'
              ]"
              @click="open = false"
            >
              <span>{{ i.label }}</span>
            </NuxtLink>
          </nav>

          <!-- Mobile Language & Currency Selector Grid -->
          <div class="mt-6 pt-6 border-t border-white/10 space-y-4">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-white/60 block mb-2">{{ t('nav.languageTitle') }}</span>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="l in languageList"
                  :key="l.code"
                  type="button"
                  :class="[
                    'flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all',
                    locale === l.code ? 'bg-[#0047AB] text-white ring-2 ring-white/60 shadow-md' : 'bg-white/10 text-white/80 hover:bg-white/20'
                  ]"
                  @click="changeLocale(l.code)"
                >
                  <FlagIcon :code="l.code" class="w-6 h-4 mb-1.5" />
                  <span>{{ l.label }}</span>
                </button>
              </div>
            </div>

            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-white/60 block mb-2">{{ t('nav.currencyTitle') }}</span>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="c in currencyList"
                  :key="c.code"
                  type="button"
                  :class="[
                    'flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all',
                    currency === c.code ? 'bg-[#0047AB] text-white ring-2 ring-white/60 shadow-md' : 'bg-white/10 text-white/80 hover:bg-white/20'
                  ]"
                  @click="changeCurrency(c.code as 'IDR' | 'MYR' | 'SGD')"
                >
                  <FlagIcon :code="c.code" class="w-5 h-3.5" />
                  <span>{{ c.label }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- WA Button in Mobile Drawer -->
          <a
            :href="waUrl(t('whatsapp.generic'))"
            target="_blank"
            rel="noopener"
            data-wa="menu"
            class="mt-8 mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#15803D] hover:bg-[#166534] px-5 py-3.5 text-center font-bold text-white shadow-lg transition"
            @click="open = false"
          >
            <span aria-hidden="true" class="icon-wa h-5 w-5" />
            <span>{{ t('common.bookWhatsApp') }}</span>
          </a>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
