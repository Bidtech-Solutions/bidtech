<script setup lang="ts">
import { Globe, Menu, MessageCircle, X } from '@lucide/vue';
import logo from '~/assets/images/logo.webp';

const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const { site, currency, setCurrency, waUrl } = useSite();

const nav = computed(() => [
  { to: localePath('/packages'), label: t('nav.packages') },
  { to: localePath('/vehicles'), label: t('nav.vehicles') },
  { to: localePath('/contact'), label: t('nav.contact') },
]);
const select =
  'h-9 cursor-pointer appearance-none rounded-full border border-navy/15 bg-white pl-7 pr-2 text-xs font-bold text-navy field-sizing-content hover:border-ocean sm:pl-8 sm:pr-3';

// Pilihan bahasa: pindah ke halaman yang sama di bahasa lain (kode locale disimpan @nuxtjs/i18n di cookie ft_locale).
const changeLocale = (e: Event) => navigateTo(switchLocalePath((e.target as HTMLSelectElement).value as typeof locale.value));

// Menu mobile
const open = ref(false);
watch(() => route.fullPath, () => (open.value = false));
watch(open, (v) => import.meta.client && (document.body.style.overflow = v ? 'hidden' : ''));
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur" @keydown.esc="open = false">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-2">
      {{ t('nav.skip') }}
    </a>
    <div class="wrap flex h-16 items-center gap-2 lg:h-20">
      <NuxtLink :to="localePath('/')" class="shrink-0" :aria-label="site.brandName">
        <img :src="logo" :alt="site.brandName" width="640" height="360" class="h-11 w-auto lg:h-14" >
      </NuxtLink>

      <nav aria-label="Main" class="hidden flex-1 justify-center gap-1 lg:flex">
        <NuxtLink v-for="i in nav" :key="i.to" :to="i.to" class="rounded-full px-3 py-2 text-sm font-semibold text-navy hover:bg-sand">
          {{ i.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1.5 sm:gap-2">
        <label class="relative inline-flex items-center">
          <span class="sr-only">{{ t('nav.language') }}</span>
          <Globe aria-hidden="true" class="pointer-events-none absolute left-2 h-4 w-4 text-navy sm:left-2.5" />
          <select :value="locale" :class="select" @change="changeLocale">
            <option v-for="l in locales" :key="l.code" :value="l.code" :lang="l.language">{{ l.name }}</option>
          </select>
        </label>
        <label class="relative inline-flex items-center">
          <span class="sr-only">{{ t('nav.currency') }}</span>
          <span aria-hidden="true" class="pointer-events-none absolute left-2.5 text-xs font-bold text-navy sm:left-3">¤</span>
          <select :value="currency" :class="select" @change="setCurrency(($event.target as HTMLSelectElement).value as 'IDR' | 'MYR' | 'SGD')">
            <option v-for="c in ['MYR', 'SGD', 'IDR']" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
        <a :href="waUrl(t('whatsapp.generic'))" target="_blank" rel="noopener" data-wa="header" class="btn-wa !py-2.5 max-lg:!hidden">
          <MessageCircle aria-hidden="true" class="h-4 w-4" />{{ t('nav.chatWhatsApp') }}
        </a>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy hover:bg-navy/5 lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = true"
        >
          <Menu aria-hidden="true" class="h-6 w-6" />
          <span class="sr-only">{{ t('nav.menu') }}</span>
        </button>
      </div>
    </div>

    <div v-if="open" id="mobile-menu" role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex flex-col bg-navy p-6 text-white lg:hidden">
      <button type="button" class="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10" @click="open = false">
        <X aria-hidden="true" class="h-6 w-6" />
        <span class="sr-only">{{ t('nav.close') }}</span>
      </button>
      <nav class="mt-6 flex flex-col gap-1">
        <NuxtLink v-for="i in nav" :key="i.to" :to="i.to" class="rounded-xl px-3 py-3 text-xl font-bold hover:bg-white/10">{{ i.label }}</NuxtLink>
      </nav>
      <a :href="waUrl(t('whatsapp.generic'))" target="_blank" rel="noopener" data-wa="menu" class="mt-auto rounded-full bg-wa px-5 py-4 text-center font-bold text-navy">
        {{ t('nav.chatWhatsApp') }}
      </a>
    </div>
  </header>
</template>
