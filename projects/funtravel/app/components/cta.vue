<script setup lang="ts">
import { MessageCircle } from '@lucide/vue';

/** Blok ajakan akhir halaman: tombol WhatsApp ke tiap admin. */
const { t } = useI18n();
const { site, waUrl } = useSite();
</script>

<template>
  <section class="section">
    <div class="wrap">
      <div class="rounded-card bg-ocean p-8 text-white sm:p-12">
        <h2 class="text-3xl font-extrabold">{{ t('home.ctaTitle') }}</h2>
        <p class="mt-2 text-white/85">{{ t('home.ctaText') }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a v-for="(a, i) in site.admins" :key="a.id" :href="waUrl(t('whatsapp.generic'), i)" target="_blank" rel="noopener" data-wa="cta" class="btn-secondary">
            <MessageCircle aria-hidden="true" class="h-4 w-4" />{{ a.label }}: {{ a.display }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
