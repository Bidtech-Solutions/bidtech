<script setup lang="ts">
import { ExternalLink, Phone } from '@lucide/vue';
import logo from '~/assets/images/logo.webp';

const { t } = useI18n();
const localePath = useLocalePath();
const { site, waUrl } = useSite();

const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/packages'), label: t('nav.packages') },
  { to: localePath('/vehicles'), label: t('nav.vehicles') },
  { to: `${localePath('/')}#destinasi`, label: t('home.destinations') },
  { to: `${localePath('/')}#faq`, label: 'FAQ' },
  { to: localePath('/contact'), label: t('nav.contact') },
]);

const socials = [
  { href: site.socials.instagram, label: 'Instagram' },
  { href: site.socials.tiktok, label: 'TikTok' },
  { href: site.socials.facebook, label: 'Facebook' },
];

const year = new Date().getFullYear();
</script>

<template>
  <footer id="about" class="mt-16 bg-white text-[#475569] border-t border-[#E2E8F0] pt-14 pb-10 text-xs sm:text-sm dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800">
    <div class="wrap">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
        <!-- Col 1: Brand Info & Legal Entity (4 cols) -->
        <div class="lg:col-span-4 space-y-3.5">
          <NuxtLink :to="localePath('/')" class="inline-block focus:outline-none" :aria-label="site.brandName">
            <img
              :src="logo"
              :alt="site.brandName"
              width="200"
              height="54"
              class="h-12 sm:h-14 w-auto object-contain"
            />
          </NuxtLink>
          <p class="text-xs leading-relaxed text-slate-500 pr-4 dark:text-slate-400">
            Official inbound tour agency, ferry ticketing, and private vehicle charter provider connecting Malaysia &amp; Singapore visitors to Batam and Bintan Island.
          </p>
          <div class="pt-1">
            <p class="text-xs font-extrabold text-slate-900 dark:text-white">{{ site.legalName }}</p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">Batam Center, Kepulauan Riau, Indonesia</p>
          </div>
        </div>

        <!-- Col 2: Quick Links (2 cols) -->
        <div class="lg:col-span-2 space-y-2.5">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 dark:text-white">Quick Links</h4>
          <ul class="space-y-2 text-xs font-medium">
            <li v-for="l in links" :key="l.to">
              <NuxtLink :to="l.to" class="hover:text-[#1E40AF] transition-colors dark:hover:text-sky-400">
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: 24/7 WhatsApp Support (3 cols) -->
        <div class="lg:col-span-3 space-y-2.5">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 dark:text-white">24/7 WhatsApp Support</h4>
          <p class="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
            For instant bookings, ferry schedules, and custom group quotations:
          </p>
          <div class="space-y-1.5 pt-1 text-xs font-bold text-[#15803D] tabular-nums">
            <a
              v-for="(a, i) in site.admins"
              :key="a.id"
              :href="waUrl(t('whatsapp.generic'), i)"
              target="_blank"
              rel="noopener"
              data-wa="footer"
              class="flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <span aria-hidden="true" class="icon-wa h-3.5 w-3.5" />
              <span>{{ a.label }}<template v-if="a.name"> ({{ a.name }})</template>: {{ a.display }}</span>
            </a>
          </div>
          <!-- Social Media Icons -->
          <div class="pt-2">
            <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Connect With Us</span>
            <div class="flex items-center gap-2">
              <a
                v-for="s in socials"
                :key="s.label"
                :href="s.href"
                target="_blank"
                rel="noopener me"
                class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#1E40AF] text-slate-600 hover:text-white text-[11px] font-semibold transition-colors flex items-center gap-1 dark:bg-slate-800 dark:text-slate-300"
              >
                <span>{{ s.label }}</span>
                <ExternalLink aria-hidden="true" class="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Col 4: Supported Payments (3 cols) -->
        <div class="lg:col-span-3 space-y-2.5">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 dark:text-white">Supported Payments</h4>
          <p class="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
            Cross-border transfers, QR payment, and multi-currency settlement supported:
          </p>
          <div class="flex flex-wrap gap-1.5 pt-2">
            <span class="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-800">BCA</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-800">Mandiri</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-800">QRIS</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-800">Maybank</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-extrabold text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-800">PayNow</span>
          </div>
        </div>
      </div>

      <!-- Bottom Copyright Bar -->
      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <p>© {{ year }} {{ site.legalName }} ({{ site.brandName }}). All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="#faq" class="hover:text-slate-600 transition-colors dark:hover:text-slate-200">Privacy Policy</a>
          <a href="#faq" class="hover:text-slate-600 transition-colors dark:hover:text-slate-200">Terms of Service</a>
          <a href="#faq" class="hover:text-slate-600 transition-colors dark:hover:text-slate-200">Booking Terms</a>
        </div>
      </div>

      <!-- Kredit foto Wikimedia Commons (atribusi wajib untuk lisensi CC BY / CC BY-SA) -->
      <details class="mt-4 text-[11px] text-slate-400">
        <summary class="cursor-pointer hover:text-slate-600 dark:hover:text-slate-200">{{ t('footer.photoCredits') }}</summary>
        <ul class="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="c in site.photoCredits" :key="c.url">
            <a :href="c.url" target="_blank" rel="noopener" class="hover:underline">{{ c.subject }}</a> — {{ c.author }}, {{ c.license }}
          </li>
        </ul>
      </details>
    </div>
  </footer>
</template>
