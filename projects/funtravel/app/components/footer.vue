<script setup lang="ts">
import { ExternalLink, Phone } from '@lucide/vue';

const { t } = useI18n();
const localePath = useLocalePath();
const { site, waUrl } = useSite();
const links = computed(() => [
  { to: localePath('/packages'), label: t('nav.packages') },
  { to: localePath('/vehicles'), label: t('nav.vehicles') },
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
  <footer class="mt-16 bg-navy text-white">
    <div class="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="text-lg font-extrabold">{{ site.brandName }}</p>
        <p class="text-sm text-white/70">{{ site.legalName }}</p>
        <p class="mt-3 text-sm text-white/80">{{ t('footer.tagline') }}</p>
      </div>
      <div>
        <h2 class="mb-3 font-bold text-sun">{{ t('footer.quickLinks') }}</h2>
        <ul class="space-y-1.5 text-sm">
          <li v-for="l in links" :key="l.to"><NuxtLink :to="l.to" class="text-white/80 hover:text-white hover:underline">{{ l.label }}</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h2 class="mb-3 font-bold text-sun">{{ t('footer.contact') }}</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="(a, i) in site.admins" :key="a.id">
            <a :href="waUrl(t('whatsapp.generic'), i)" target="_blank" rel="noopener" data-wa="footer" class="inline-flex items-center gap-2 text-white/80 hover:text-white">
              <Phone aria-hidden="true" class="h-4 w-4" />{{ a.label }}<template v-if="a.name"> ({{ a.name }})</template>: {{ a.display }}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="mb-3 font-bold text-sun">{{ t('footer.followUs') }}</h2>
        <ul class="space-y-1.5 text-sm">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.href" target="_blank" rel="noopener me" class="inline-flex items-center gap-1.5 text-white/80 hover:text-white">
              {{ s.label }} <ExternalLink aria-hidden="true" class="h-3.5 w-3.5" />
            </a>
          </li>
        </ul>
        <h2 class="mb-2 mt-6 font-bold text-sun">{{ t('footer.payments') }}</h2>
        <p class="text-sm text-white/80">QRIS · BCA · Mandiri</p>
      </div>
    </div>
    <div class="border-t border-white/10">
      <p class="wrap py-5 text-xs text-white/60">{{ t('footer.rights', { year, legal: site.legalName }) }}</p>
    </div>
  </footer>
</template>
