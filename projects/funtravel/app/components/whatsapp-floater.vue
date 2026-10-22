<script setup lang="ts">

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
    class="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-2.5 rounded-full bg-[#15803D] hover:bg-[#166534] text-white p-3.5 sm:px-5 sm:py-3.5 font-bold shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/40"
    :aria-label="t('nav.chatWhatsApp')"
  >
    <span aria-hidden="true" class="icon-wa h-6 w-6 shrink-0" />
    <span class="hidden sm:inline text-sm tracking-tight">{{ t('nav.chatWhatsApp') }}</span>
  </a>
</template>
