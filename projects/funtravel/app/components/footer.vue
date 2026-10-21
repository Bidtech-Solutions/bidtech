<script setup lang="ts">
import { MapPin } from '@lucide/vue';
import logo from '~/assets/images/logo.webp';
import bgLight from '~/assets/images/Latar Putih dengan Palma dan Jembatan Kabut.png';
import bgDark from '~/assets/images/Latar Gelap Siluet Tropis dan Jembatan.png';

const { t } = useI18n();
const localePath = useLocalePath();
const { site, waUrl } = useSite();

const links = computed(() => [
  { to: localePath('/'), label: t('footer.links.home') },
  { to: localePath('/vehicles'), label: t('footer.links.vehicles') },
  { to: localePath('/packages'), label: t('footer.links.packages') },
  { to: `${localePath('/')}#destinasi`, label: t('footer.links.destinations') },
  { to: localePath('/contact'), label: t('footer.links.contact') },
]);

const year = new Date().getFullYear();
</script>

<template>
  <footer
    id="about"
    class="relative mt-20 border-t border-slate-200/80 bg-white text-[#475569] pt-14 pb-8 text-xs sm:text-sm dark:border-slate-800 dark:bg-[#070D1B] dark:text-slate-300 overflow-hidden"
  >
    <!-- ======================================================== -->
    <!-- AMBIENT ARTWORK BACKDROP (Light & Dark Images)            -->
    <!-- ======================================================== -->
    <div class="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
      <!-- Light Mode Background Image -->
      <img
        :src="bgLight"
        alt=""
        class="h-full w-full object-cover object-bottom select-none dark:hidden"
      />

      <!-- Dark Mode Background Image -->
      <img
        :src="bgDark"
        alt=""
        class="h-full w-full object-cover object-bottom select-none hidden dark:block"
      />
    </div>

    <!-- ======================================================== -->
    <!-- MAIN FOOTER CONTENT (3 COLUMNS WITH VERTICAL DIVIDERS)   -->
    <!-- ======================================================== -->
    <div class="wrap relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
        <!-- ==================================================== -->
        <!-- COL 1: Brand & Office (5 cols desktop)               -->
        <!-- ==================================================== -->
        <div class="lg:col-span-5 space-y-4">
          <NuxtLink :to="localePath('/')" class="inline-block focus:outline-none" :aria-label="site.brandName">
            <img
              :src="logo"
              :alt="site.brandName"
              width="220"
              height="60"
              class="h-12 sm:h-14 w-auto object-contain"
            />
          </NuxtLink>

          <p class="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
            {{ t('footer.description') }}
          </p>

          <div class="flex items-start gap-2.5 pt-2">
            <div class="w-6 h-6 rounded-full bg-blue-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 dark:bg-slate-800 dark:text-sky-400">
              <MapPin class="h-4 w-4 fill-current stroke-white dark:stroke-slate-900" />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white leading-tight">
                {{ site.legalName }}
              </p>
              <p class="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Batam, Kepulauan Riau, Indonesia
              </p>
            </div>
          </div>
        </div>

        <!-- ==================================================== -->
        <!-- COL 2: Menu Cepat (3 cols desktop)                   -->
        <!-- ==================================================== -->
        <div class="lg:col-span-3 space-y-2.5">
          <div>
            <h3 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
              {{ t('footer.quickLinks') }}
            </h3>
            <!-- Blue-cyan accent line matching mockup -->
            <div class="h-1 w-7 rounded-full bg-gradient-to-r from-[#0047AB] to-[#38BDF8] mt-2 mb-4" />
          </div>

          <ul class="space-y-3 text-xs sm:text-sm font-medium">
            <li v-for="l in links" :key="l.to">
              <NuxtLink
                :to="l.to"
                class="text-slate-600 hover:text-[#0047AB] dark:text-slate-300 dark:hover:text-sky-400 transition-colors inline-block"
              >
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- ==================================================== -->
        <!-- COL 3: Layanan WhatsApp 24 jam (4 cols desktop)      -->
        <!-- ==================================================== -->
        <div class="lg:col-span-4 space-y-3.5">
          <h3 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ t('footer.supportTitle') }}
          </h3>

          <p class="text-xs sm:text-sm text-slate-500 leading-relaxed dark:text-slate-400">
            {{ t('footer.supportText') }}
          </p>

          <!-- WhatsApp Mint-Green Pills -->
          <div class="space-y-2.5 pt-1">
            <a
              v-for="(admin, idx) in site.admins"
              :key="admin.id"
              :href="waUrl(t('whatsapp.generic'), idx)"
              target="_blank"
              rel="noopener"
              :data-wa="`footer-${admin.id}`"
              class="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-800/40 dark:hover:bg-emerald-900/40 text-[#065F46] dark:text-emerald-300 font-extrabold text-xs sm:text-sm shadow-xs transition-all duration-200 group"
            >
              <span aria-hidden="true" class="icon-wa h-5 w-5 shrink-0 text-[#15803D] group-hover:scale-110 transition-transform" />
              <span class="tracking-wide">{{ admin.display }}</span>
            </a>
          </div>

          <!-- Social Media Pills Row -->
          <div class="flex flex-wrap items-center gap-2 pt-2">
            <!-- Instagram -->
            <a
              :href="site.socials.instagram"
              target="_blank"
              rel="noopener me"
              aria-label="Instagram"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold shadow-xs transition-all dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="igGradFooter" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FFDC80" />
                    <stop offset="50%" stop-color="#E1306C" />
                    <stop offset="100%" stop-color="#833AB4" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#igGradFooter)" stroke-width="2" />
                <circle cx="12" cy="12" r="4" stroke="url(#igGradFooter)" stroke-width="2" />
                <circle cx="18" cy="6" r="1.2" fill="url(#igGradFooter)" />
              </svg>
              <span>Instagram</span>
            </a>

            <!-- TikTok -->
            <a
              :href="site.socials.tiktok"
              target="_blank"
              rel="noopener me"
              aria-label="TikTok"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold shadow-xs transition-all dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <svg class="h-4 w-4 shrink-0 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.32V9.05a8.16 8.16 0 0 0 4.89 1.64V7.27a4.91 4.91 0 0 1-1-.58z"/>
              </svg>
              <span>TikTok</span>
            </a>

            <!-- Facebook -->
            <a
              :href="site.socials.facebook"
              target="_blank"
              rel="noopener me"
              aria-label="Facebook"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold shadow-xs transition-all dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <svg class="h-4 w-4 shrink-0 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <!-- ==================================================== -->
      <!-- BOTTOM COPYRIGHT & LEGAL BAR (PIPE DELIMITED)         -->
      <!-- ==================================================== -->
      <div class="relative z-10 border-t border-slate-200/80 pt-6 pb-2 text-[11px] sm:text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div class="flex flex-col md:flex-row items-center justify-between gap-y-3 gap-x-4">
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-x-3 sm:gap-x-4 gap-y-1.5 text-center md:text-left">
            <p>{{ t('footer.rights', { year }) }}</p>
            <span class="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <p>
              {{ t('footer.developedBy') }}
              <a
                href="https://www.bidtech.co.id"
                target="_blank"
                rel="noopener"
                class="font-extrabold text-[#0047AB] hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
              >
                Bidtech
              </a>
              – Software House Batam.
            </p>
            <span class="hidden lg:inline text-slate-300 dark:text-slate-700">|</span>
            <div class="flex items-center gap-3 sm:gap-4">
              <NuxtLink :to="localePath('/contact')" class="hover:text-slate-800 dark:hover:text-white transition-colors">
                {{ t('footer.privacy') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/contact')" class="hover:text-slate-800 dark:hover:text-white transition-colors">
                {{ t('footer.terms') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/contact')" class="hover:text-slate-800 dark:hover:text-white transition-colors">
                {{ t('footer.bookingTerms') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
