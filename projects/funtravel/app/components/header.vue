<script setup lang="ts">
import { Banknote, Car, Globe, Menu, Moon, Sun, TreePalm, X } from '@lucide/vue';
import logo from '~/assets/images/logo.webp';

const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const { site, currency, setCurrency, waUrl, toggleTheme } = useSite();

const nav = computed(() => [
  { to: localePath('/'), label: t('nav.home'), page: 'home' },
  { to: localePath('/vehicles'), label: t('nav.vehicles'), page: 'vehicles' },
  { to: localePath('/packages'), label: 'Paket Holiday', page: 'packages' },
  { to: `${localePath('/')}#destinasi`, label: t('home.destinations') },
  { to: `${localePath('/')}#faq`, label: 'FAQ' },
  { to: localePath('/contact'), label: t('nav.contact') },
]);

const selectStyle =
  'h-9 cursor-pointer appearance-none rounded-full border border-slate-200 bg-slate-100 pl-7 pr-3 text-xs font-bold text-slate-700 hover:bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition focus:outline-none focus:ring-2 focus:ring-[#1E40AF]';

// Halaman aktif untuk nav desktop & switcher mobile
const onVehicles = computed(() => route.path.startsWith(localePath('/vehicles')));
const isActive = (page?: string) =>
  page === 'vehicles'
    ? onVehicles.value
    : page === 'packages'
      ? route.path.startsWith(localePath('/packages'))
      : page === 'home' && route.path === localePath('/');

// Pilihan bahasa: pindah ke halaman yang sama di bahasa lain (kode locale disimpan @nuxtjs/i18n di cookie ft_locale).
const changeLocale = (e: Event) => navigateTo(switchLocalePath((e.target as HTMLSelectElement).value as typeof locale.value));

// Menu mobile
const open = ref(false);
watch(() => route.fullPath, () => (open.value = false));
watch(open, (v) => import.meta.client && (document.body.style.overflow = v ? 'hidden' : ''));
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90" @keydown.esc="open = false">
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
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors duration-200',
            'hover:text-[#1E40AF] hover:bg-blue-50 dark:hover:text-amber-400 dark:hover:bg-slate-800',
            isActive(i.page) && 'text-[#1E40AF] dark:text-amber-400 font-extrabold',
          ]"
        >
          <span>{{ i.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Right Action Controls -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <!-- Language Selector -->
        <label class="relative inline-flex items-center">
          <span class="sr-only">{{ t('nav.language') }}</span>
          <Globe aria-hidden="true" class="pointer-events-none absolute left-2 h-4 w-4 text-ocean sm:left-2.5 dark:text-sky-400" />
          <select :value="locale" :class="selectStyle" @change="changeLocale">
            <option v-for="l in locales" :key="l.code" :value="l.code" :lang="l.language">
              {{ l.code.toUpperCase() }}
            </option>
          </select>
        </label>

        <!-- Currency Selector with Banknote Icon -->
        <label class="relative inline-flex items-center">
          <span class="sr-only">{{ t('nav.currency') }}</span>
          <Banknote aria-hidden="true" class="pointer-events-none absolute left-2 h-4 w-4 text-[#15803D] sm:left-2.5" />
          <select :value="currency" :class="selectStyle" @change="setCurrency(($event.target as HTMLSelectElement).value as 'IDR' | 'MYR' | 'SGD')">
            <option value="MYR">MYR</option>
            <option value="SGD">SGD</option>
            <option value="IDR">IDR</option>
          </select>
        </label>

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

        <!-- Theme / Dark Mode Button (ikon dipilih lewat CSS `dark:` agar SSR & klien identik) -->
        <button
          type="button"
          :aria-label="t('nav.theme')"
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
          @click="toggleTheme"
        >
          <Moon aria-hidden="true" class="h-4 w-4 dark:hidden" />
          <Sun aria-hidden="true" class="hidden h-4 w-4 text-amber-400 dark:block" />
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full text-navy hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = true"
        >
          <Menu aria-hidden="true" class="h-5 w-5" />
          <span class="sr-only">{{ t('nav.menu') }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile Quick Page Switcher Bar -->
    <div class="flex items-center gap-2 border-t border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
      <NuxtLink
        :to="localePath('/')"
        :class="['flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-extrabold transition-all', onVehicles ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' : 'bg-[#1E40AF] text-white']"
      >
        <TreePalm aria-hidden="true" class="h-3.5 w-3.5" />
        <span>{{ t('nav.home') }}</span>
      </NuxtLink>
      <NuxtLink
        :to="localePath('/vehicles')"
        :class="['flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-extrabold transition-all', onVehicles ? 'bg-[#1E40AF] text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300']"
      >
        <Car aria-hidden="true" class="h-3.5 w-3.5" />
        <span>{{ t('nav.vehicles') }}</span>
      </NuxtLink>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div v-if="open" id="mobile-menu" role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex flex-col bg-[#061749] p-6 text-white lg:hidden">
      <div class="flex items-center justify-between pb-4 border-b border-white/10">
        <img :src="logo" :alt="site.brandName" class="h-9 w-auto object-contain brightness-0 invert" />
        <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" @click="open = false">
          <X aria-hidden="true" class="h-6 w-6" />
          <span class="sr-only">{{ t('nav.close') }}</span>
        </button>
      </div>
      <nav class="mt-6 flex flex-col gap-2">
        <NuxtLink
          v-for="i in nav"
          :key="i.to"
          :to="i.to"
          class="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-bold hover:bg-white/10 hover:text-sun transition"
        >
          <span>{{ i.label }}</span>
        </NuxtLink>
      </nav>
      <a
        :href="waUrl(t('whatsapp.generic'))"
        target="_blank"
        rel="noopener"
        data-wa="menu"
        class="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#15803D] px-5 py-3.5 text-center font-bold text-white shadow-lg"
      >
        <span aria-hidden="true" class="icon-wa h-5 w-5" />
        <span>{{ t('common.bookWhatsApp') }}</span>
      </a>
    </div>
  </header>
</template>
