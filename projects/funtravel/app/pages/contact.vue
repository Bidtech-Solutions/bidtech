<script setup lang="ts">
import { Check, Copy, ExternalLink, MessageCircle } from '@lucide/vue';
import faqs from '~/assets/data/faqs.json';
import qris from '~/assets/images/qris.webp'; // QRIS asli (webp lossless) → tetap terbaca scanner

const { t } = useI18n();
const { site, loc, waUrl } = useSite();

useSeoMeta({ title: () => t('contact.metaTitle'), description: () => t('contact.metaDescription') });
// Semua FAQ ditampilkan di sini (FAQPage untuk AEO/GEO); beranda hanya menampilkan ringkasannya.
useHead(() => ({
  script: [
    {
      key: 'ld-faq',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: loc(f.q), acceptedAnswer: { '@type': 'Answer', text: loc(f.a) } })),
      }),
    },
  ],
}));

const socials = [
  { href: site.socials.instagram, label: 'Instagram' },
  { href: site.socials.tiktok, label: 'TikTok' },
  { href: site.socials.facebook, label: 'Facebook' },
];
const copied = ref('');
async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    copied.value = value;
    setTimeout(() => (copied.value = ''), 1800);
  } catch {
    /* clipboard tidak tersedia */
  }
}
</script>

<template>
  <div class="section">
    <div class="wrap">
      <h1 class="text-3xl font-extrabold text-navy sm:text-5xl">{{ t('contact.title') }}</h1>
      <p class="mt-2 text-lg text-muted">{{ t('contact.intro') }}</p>

      <h2 class="mt-10 text-xl font-extrabold text-navy">{{ t('contact.admins') }}</h2>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2">
        <li v-for="(a, i) in site.admins" :key="a.id" class="rounded-card border border-navy/10 p-5">
          <p class="font-bold text-navy">{{ a.label }}<template v-if="a.name"> — {{ a.name }}</template></p>
          <p class="mt-1 font-mono text-lg text-ink">{{ a.display }}</p>
          <a :href="waUrl(t('whatsapp.generic'), i)" target="_blank" rel="noopener" data-wa="contact" class="btn-wa mt-4">
            <MessageCircle aria-hidden="true" class="h-4 w-4" />{{ t('nav.chatWhatsApp') }}
          </a>
        </li>
      </ul>

      <h2 class="mt-10 text-xl font-extrabold text-navy">{{ t('contact.socials') }}</h2>
      <ul class="mt-4 flex flex-wrap gap-3">
        <li v-for="s in socials" :key="s.label">
          <a :href="s.href" target="_blank" rel="noopener me" class="btn-outline">{{ s.label }} <ExternalLink aria-hidden="true" class="h-4 w-4" /></a>
        </li>
      </ul>
      <!-- TODO(OQ-13): alamat kantor + peta setelah dikonfirmasi klien. -->

      <!-- Pembayaran resmi -->
      <section id="payment" class="mt-14 scroll-mt-24">
        <h2 class="text-2xl font-extrabold text-navy">{{ t('payment.title') }}</h2>
        <p class="mt-2 text-muted">{{ t('payment.intro') }}</p>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div class="rounded-card border border-navy/10 bg-white p-4">
            <h3 class="mb-3 font-bold text-navy">{{ t('payment.qris') }}</h3>
            <a :href="qris" target="_blank" rel="noopener" class="block">
              <img :src="qris" :alt="t('payment.qrisAlt', { merchant: site.payment.qris.merchantName })" width="414" height="573" loading="lazy" class="mx-auto h-auto w-64">
            </a>
            <p class="mt-2 text-center text-xs text-muted">{{ site.payment.qris.merchantName }} · NMID {{ site.payment.qris.nmid }}</p>
          </div>
          <div class="space-y-3">
            <h3 class="font-bold text-navy">{{ t('payment.bank') }}</h3>
            <div v-for="b in site.payment.banks" :key="b.bank" class="rounded-card border border-navy/10 bg-white p-4">
              <p class="text-sm font-bold text-ocean">{{ b.bank }}</p>
              <div class="mt-1 flex flex-wrap items-center justify-between gap-2">
                <span class="font-mono text-lg font-bold tracking-wider text-navy">{{ b.accountNo }}</span>
                <button type="button" class="inline-flex items-center gap-1 rounded-full border border-navy/20 px-3 py-1 text-xs font-semibold text-navy hover:bg-navy hover:text-white" @click="copy(b.accountNo)">
                  <Check v-if="copied === b.accountNo" aria-hidden="true" class="h-3.5 w-3.5" />
                  <Copy v-else aria-hidden="true" class="h-3.5 w-3.5" />
                  <span aria-live="polite">{{ copied === b.accountNo ? t('payment.copied') : t('payment.copy') }}</span>
                </button>
              </div>
              <p class="mt-1 text-xs text-muted">{{ t('payment.holder') }}: {{ b.holder }}</p>
            </div>
            <p class="rounded-xl bg-coral/10 p-3 text-sm font-semibold text-coral">{{ t('payment.warning') }}</p>
          </div>
        </div>
      </section>

      <!-- FAQ lengkap -->
      <section id="faq" class="mt-14 scroll-mt-24">
        <h2 class="mb-6 text-2xl font-extrabold text-navy">{{ t('faq.title') }}</h2>
        <div class="divide-y divide-navy/10 rounded-card border border-navy/10 bg-white">
          <details v-for="f in faqs" :key="f.id" class="p-5">
            <summary class="cursor-pointer font-bold text-navy">{{ loc(f.q) }}</summary>
            <p class="mt-3 leading-relaxed text-muted">{{ loc(f.a) }}</p>
          </details>
        </div>
      </section>
    </div>
  </div>
</template>
