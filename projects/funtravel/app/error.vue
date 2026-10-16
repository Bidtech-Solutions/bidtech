<script setup lang="ts">
import type { NuxtError } from '#app';

/** Halaman error global (404.html statis untuk Nginx). Tanpa layout/i18n → teks 4 bahasa ditulis langsung. */
defineProps<{ error: NuxtError }>();
const links = [
  { code: 'en', text: 'Page not found', name: 'English' },
  { code: 'ms', text: 'Halaman tidak dijumpai', name: 'Bahasa Melayu' },
  { code: 'zh', text: '页面不存在', name: '简体中文' },
  { code: 'id', text: 'Halaman tidak ditemukan', name: 'Bahasa Indonesia' },
];
useHead({ title: '404 — FUN TRAVEL & TRANSPORT', meta: [{ name: 'robots', content: 'noindex, follow' }] });
</script>

<template>
  <main class="mx-auto max-w-[520px] px-6 py-[15vh] text-center text-navy">
    <p class="text-6xl font-black text-ocean">{{ error?.statusCode ?? 404 }}</p>
    <p class="mt-2 text-xl font-extrabold">FUN TRAVEL &amp; TRANSPORT</p>
    <ul class="mt-6 grid gap-2.5">
      <li v-for="l in links" :key="l.code">
        {{ l.text }} — <a :href="`/${l.code}`" class="font-bold text-ocean underline">{{ l.name }}</a>
      </li>
    </ul>
  </main>
</template>
