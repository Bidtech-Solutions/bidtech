<script setup lang="ts">
import { MessageCircle } from '@lucide/vue';

/** Tombol WhatsApp melayang di semua halaman (pesan pembuka sesuai bahasa). */
const { t } = useI18n();
const { waUrl } = useSite();
</script>

<template>
  <a
    :href="waUrl(t('whatsapp.generic'))"
    target="_blank"
    rel="noopener"
    data-wa="floater"
    class="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-wa px-4 font-bold text-navy shadow-card transition hover:-translate-y-0.5"
  >
    <MessageCircle aria-hidden="true" class="h-6 w-6" />
    <span class="hidden sm:inline">{{ t('nav.chatWhatsApp') }}</span>
    <span class="sr-only sm:hidden">{{ t('nav.chatWhatsApp') }}</span>
  </a>
</template>
