<script setup lang="ts">
import { Car, Hotel, Ship, Utensils } from '@lucide/vue';

const { t } = useI18n();
const { waUrl, pkgPrice } = useSite();

const vipChips = computed(() => [
  { icon: Utensils, label: t('package.facilities'), value: t('cta.vipChipMeals') },
  { icon: Hotel, label: 'Hotel', value: t('cta.vipChipHotel') },
  { icon: Car, label: 'Transport', value: t('cta.vipChipTransport') },
  { icon: Ship, label: 'Ferry', value: t('cta.vipChipFerry') },
]);
</script>

<template>
  <section id="vip-tour" class="wrap scroll-mt-24 py-10 sm:py-14">
    <div class="relative rounded-3xl overflow-hidden shadow-xl min-h-[360px] flex items-center p-6 sm:p-10 lg:p-14">
      <!-- Background Dining Photo -->
      <img
        src="/images/destinations/barelang-bridge.webp"
        :alt="t('cta.vipTitle')"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <!-- Deep Navy Gradient Scrim -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B1B4D]/95 via-[#1E3A8A]/85 to-[#1E40AF]/60" />

      <!-- VIP Content Grid -->
      <div class="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Left 8 Cols: Title, Description & 4 Glassmorphism Chips -->
        <div class="anim-fade-up lg:col-span-8 text-white">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            {{ t('cta.vipTitle') }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-2xl mb-7">
            {{ t('cta.vipDesc') }}
          </p>

          <!-- 4 Glassmorphism Feature Chips -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            <div v-for="c in vipChips" :key="c.label" class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3">
              <div class="text-[#FACC15] text-xs font-bold mb-1 flex items-center gap-1.5">
                <component :is="c.icon" aria-hidden="true" class="h-3.5 w-3.5" />
                <span class="text-[10px] uppercase tracking-wider text-slate-300">{{ c.label }}</span>
              </div>
              <p class="text-xs sm:text-sm font-extrabold text-white">{{ c.value }}</p>
            </div>
          </div>
        </div>

        <!-- Right 4 Cols: Floating White Pricing Card -->
        <div class="lg:col-span-4 flex lg:justify-end">
          <div class="anim-card delay-150 w-full max-w-xs bg-white rounded-2xl p-6 text-center shadow-2xl border border-white/40 dark:bg-slate-900">
            <span class="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
              {{ t('cta.vipPriceLabel') }}
            </span>
            <div class="text-3xl sm:text-4xl font-extrabold text-[#1E40AF] tabular-nums tracking-tight my-1 dark:text-sky-400">
              {{ pkgPrice(666) }}
            </div>
            <span class="block text-xs text-slate-500 dark:text-slate-400 mb-5">{{ t('common.perPax') }} &bull; min 2 to go</span>
            <a
              :href="waUrl(t('whatsapp.packageQuick', { name: '3D2N VIP Gourmet Barelang' }))"
              target="_blank"
              rel="noopener"
              data-wa="cta"
              class="w-full inline-flex items-center justify-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span aria-hidden="true" class="icon-wa w-4 h-4" />
              <span>{{ t('cta.vipBookButton') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
