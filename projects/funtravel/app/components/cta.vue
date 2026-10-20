<script setup lang="ts">
import { BadgeCheck, ChevronRight, Clock, ShieldCheck } from '@lucide/vue';

/** Blok ajakan akhir halaman: tombol WhatsApp ke tiap admin. */
const { t } = useI18n();
const { site, waUrl } = useSite();
const points = computed(() => [
  { icon: Clock, text: t('cta.point1') },
  { icon: BadgeCheck, text: t('cta.point2') },
  { icon: ShieldCheck, text: t('cta.point3') },
]);
</script>

<template>
  <section id="contact" class="section scroll-mt-24">
    <div class="wrap">
      <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#B45309] bg-[length:300%_300%] animate-gradient p-6 sm:p-10 lg:p-14 text-white shadow-2xl">
        <!-- Dekorasi: glow bergerak + pola titik halus -->
        <div class="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl animate-float" />
        <div class="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-sky-400/30 blur-3xl animate-float [animation-delay:-4s]" />
        <div class="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <!-- Kiri: judul, teks, poin kepercayaan -->
          <div class="lg:col-span-7">
            <h2 class="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight">{{ t('cta.title') }}</h2>
            <p class="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-blue-100/90">{{ t('cta.text') }}</p>
            <ul class="mt-6 grid gap-2.5 sm:grid-cols-3">
              <li v-for="p in points" :key="p.text" class="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-xs font-semibold backdrop-blur-md">
                <component :is="p.icon" aria-hidden="true" class="h-4 w-4 shrink-0 text-amber-300" />
                {{ p.text }}
              </li>
            </ul>
          </div>

          <!-- Kanan: kartu admin WhatsApp -->
          <div class="lg:col-span-5 flex lg:justify-end">
            <div class="w-full max-w-sm rounded-3xl bg-white p-5 sm:p-6 text-slate-900 shadow-2xl ring-1 ring-white/40 dark:bg-slate-900 dark:text-white">
              <div class="mb-4 flex items-center justify-between gap-2">
                <p class="text-sm font-extrabold">{{ t('cta.cardTitle') }}</p>
                <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-[#15803D] dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {{ t('cta.online') }}
                </span>
              </div>
              <div class="space-y-2.5">
                <a
                  v-for="(a, i) in site.admins"
                  :key="a.id"
                  :href="waUrl(t('whatsapp.generic'), i)"
                  target="_blank"
                  rel="noopener"
                  data-wa="cta"
                  :class="[
                    'group flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-all hover:-translate-y-0.5',
                    i === 0
                      ? 'bg-[#15803D] text-white shadow-md hover:bg-[#166534] hover:shadow-lg'
                      : 'border border-blue-100 bg-[#EFF6FF] text-[#1E40AF] hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-slate-700',
                  ]"
                >
                  <span class="flex items-center gap-3 text-left">
                    <span :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-full', i === 0 ? 'bg-white/20' : 'bg-[#15803D]/10 text-[#15803D] dark:text-emerald-400']">
                      <span aria-hidden="true" class="icon-wa h-5 w-5" />
                    </span>
                    <span>
                      <span class="block text-sm font-extrabold leading-tight">{{ a.label }}<template v-if="a.name"> ({{ a.name }})</template></span>
                      <span :class="['block text-xs tabular-nums', i === 0 ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400']">{{ a.display }}</span>
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" class="h-5 w-5 stroke-[2.5] opacity-80 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
