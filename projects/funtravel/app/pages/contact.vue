<script setup lang="ts">
import {
  Building2,
  Phone,
  PhoneCall,
} from '@lucide/vue';
const { t, locale } = useI18n();
const { site, loc, waUrl } = useSite();

useSeoMeta({
  title: () => `${t('contact.metaTitle')} — ${site.brandName}`,
  description: () => t('contact.metaDescription'),
});
</script>

<template>
  <div class="bg-[#F8FAFC] min-h-screen text-[#0F172A] pb-4 dark:bg-slate-950 dark:text-slate-100">
    <!-- ============================================================ -->
    <!-- 1. HERO BANNER (Gradasi Biru/Kuning + Judul Biru/Hitam)      -->
    <!-- ============================================================ -->
    <section class="relative overflow-hidden flex items-center min-h-[360px] sm:min-h-[420px] bg-gradient-to-br from-[#BFDBFE] via-[#F8FAFC] to-[#FDE68A] bg-[length:300%_300%] animate-gradient pt-16 sm:pt-24 pb-16 sm:pb-20 dark:from-slate-900 dark:via-[#0B1B4D] dark:to-amber-950/40">
      <!-- Ambient Glow Blobs -->
      <div class="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-amber-300/30 blur-3xl animate-float" />
      <div class="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl animate-float [animation-delay:-4s]" />

      <!-- Transisi halus menyatu dengan warna konten di bawahnya tanpa garis pembatas -->
      <div class="pointer-events-none absolute bottom-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/60 to-transparent dark:from-slate-950 dark:via-slate-950/60" />

      <div class="wrap relative z-10">
        <div class="max-w-3xl">
          <h1 class="anim-fade-up text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] dark:text-white">
            {{ t('contact.heroTitlePart1') }}<span class="text-[#1E40AF] dark:text-sky-400">{{ t('contact.heroTitlePart2') }}</span>
          </h1>

          <!-- Aksen Garis Kuning di Bawah Judul Hero -->
          <div class="anim-fade-up delay-100 h-1.5 w-24 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-3.5 mb-4 shadow-xs" />

          <p class="anim-fade-up delay-100 text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl dark:text-slate-300">
            {{ t('contact.heroIntro') }}
          </p>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 2. KONTEN UTAMA: 3 KARTU KONTAK PERSIS SEPERTI CONTOH GAMBAR  -->
    <!-- ============================================================ -->
    <main class="wrap py-10 sm:py-14 space-y-12">
      <!-- 3-Column Grid Cards -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <!-- ==================================================== -->
        <!-- CARD 1: Kontak Resmi Kantor (PT Fun Batam Holiday)    -->
        <!-- ==================================================== -->
        <article class="anim-card delay-150 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
          <div class="space-y-4">
            <!-- Header -->
            <div class="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#1E40AF] flex items-center justify-center dark:bg-slate-800 dark:text-sky-400">
                <Building2 class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-base font-extrabold text-slate-900 dark:text-white leading-tight">{{ t('contact.officialOfficeTitle') }}</h2>
                <p class="text-xs text-slate-400 font-medium">{{ t('contact.legalCompany') }}</p>
              </div>
            </div>

            <!-- Hotline / Telepon Kantor -->
            <div class="bg-[#F8FAFC] rounded-2xl p-4 flex items-start gap-3.5 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
              <div class="w-10 h-10 rounded-xl bg-[#0047AB] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Phone class="w-5 h-5" />
              </div>
              <div class="min-w-0">
                <span class="text-[11px] font-semibold text-slate-400 block">{{ t('common.hotline') }}</span>
                <span class="text-base sm:text-lg font-black text-[#0047AB] dark:text-sky-400 block tracking-tight leading-snug">(0778) 456-890</span>
                <span class="text-[11px] text-slate-400 block mt-0.5">{{ t('common.hours') }}: {{ t('contact.hotlineTime') }}</span>
              </div>
            </div>

          </div>

          <!-- Media Sosial Resmi -->
          <div class="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
            <span class="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-3">{{ t('common.officialSocial') }}:</span>
            <div class="grid grid-cols-3 gap-2 sm:gap-2.5">
              <a
                :href="site.socials.instagram"
                target="_blank"
                rel="noopener me"
                class="bg-[#F0F3FF] hover:bg-[#E0E7FF] text-slate-800 rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <svg aria-hidden="true" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span class="text-[11px] font-bold">Instagram</span>
              </a>
              <a
                :href="site.socials.tiktok"
                target="_blank"
                rel="noopener me"
                class="bg-[#F0F3FF] hover:bg-[#E0E7FF] text-slate-800 rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <svg aria-hidden="true" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.32V9.05a8.16 8.16 0 0 0 4.89 1.64V7.27a4.91 4.91 0 0 1-1-.58z"/>
                </svg>
                <span class="text-[11px] font-bold">TikTok</span>
              </a>
              <a
                :href="site.socials.facebook"
                target="_blank"
                rel="noopener me"
                class="bg-[#F0F3FF] hover:bg-[#E0E7FF] text-slate-800 rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <svg aria-hidden="true" class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span class="text-[11px] font-bold">Facebook</span>
              </a>
            </div>
          </div>
        </article>

        <!-- ==================================================== -->
        <!-- CARD 2: Billy (Admin 1)                               -->
        <!-- ==================================================== -->
        <article class="anim-card delay-250 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          <!-- Ambient Glow Corner -->
          <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-100/40 blur-2xl pointer-events-none dark:bg-blue-900/10" />

          <div class="space-y-5 relative z-10">
            <!-- Header with Avatar -->
            <div class="flex items-center gap-3.5">
              <div class="relative shrink-0">
                <div class="w-14 h-14 rounded-2xl bg-[#0047AB] text-white flex items-center justify-center font-black text-xl shadow-sm">
                  B
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white dark:border-slate-900 shadow-xs" />
              </div>
              <div>
                <h2 class="text-xl font-black text-slate-900 dark:text-white leading-tight">{{ t('contact.budiTitle') }}</h2>
              </div>
            </div>

            <!-- Info Block -->
            <div class="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-100/90 space-y-3 dark:bg-slate-800/60 dark:border-slate-800">
              <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60 dark:border-slate-700/60">
                <span class="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold dark:text-slate-400">
                  <PhoneCall class="w-3.5 h-3.5 text-[#0047AB] dark:text-sky-400" />
                  {{ t('common.contactNumber') }}
                </span>
                <span class="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">{{ site.admins[0]?.display || '+62 859 6057 7702' }}</span>
              </div>

              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong class="font-extrabold text-slate-900 dark:text-white">{{ t('common.serving') }}</strong>
                {{ t('contact.budiServices') }}
              </p>
            </div>
          </div>

          <!-- Bottom Action -->
          <div class="pt-5 mt-4 relative z-10">
            <a
              :href="waUrl(t('contact.budiTemplate'), 0)"
              target="_blank"
              rel="noopener"
              data-wa="contact-budi"
              class="w-full inline-flex items-center justify-center gap-2 bg-[#0B6623] hover:bg-[#08501B] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span aria-hidden="true" class="icon-wa h-4 w-4 shrink-0" />
              <span>{{ t('contact.budiButton') }}</span>
            </a>
          </div>
        </article>

        <!-- ==================================================== -->
        <!-- CARD 3: Billy (Admin 2)                               -->
        <!-- ==================================================== -->
        <article class="anim-card delay-350 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          <!-- Ambient Glow Corner -->
          <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-100/50 blur-2xl pointer-events-none dark:bg-amber-900/10" />

          <div class="space-y-5 relative z-10">
            <!-- Header with Avatar -->
            <div class="flex items-center gap-3.5">
              <div class="relative shrink-0">
                <div class="w-14 h-14 rounded-2xl bg-[#6E540C] text-white flex items-center justify-center font-black text-xl shadow-sm">
                  B
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white dark:border-slate-900 shadow-xs" />
              </div>
              <div>
                <h2 class="text-xl font-black text-slate-900 dark:text-white leading-tight">{{ t('contact.dewiTitle') }}</h2>
              </div>
            </div>

            <!-- Info Block -->
            <div class="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-100/90 space-y-3 dark:bg-slate-800/60 dark:border-slate-800">
              <div class="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60 dark:border-slate-700/60">
                <span class="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold dark:text-slate-400">
                  <PhoneCall class="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  {{ t('common.contactNumber') }}
                </span>
                <span class="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">{{ site.admins[1]?.display || '+62 852 7202 3809' }}</span>
              </div>

              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong class="font-extrabold text-slate-900 dark:text-white">{{ t('common.serving') }}</strong>
                {{ t('contact.dewiServices') }}
              </p>
            </div>
          </div>

          <!-- Bottom Action -->
          <div class="pt-5 mt-4 relative z-10">
            <a
              :href="waUrl(t('contact.dewiTemplate'), 1)"
              target="_blank"
              rel="noopener"
              data-wa="contact-dewi"
              class="w-full inline-flex items-center justify-center gap-2 bg-[#0B6623] hover:bg-[#08501B] text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
            >
              <span aria-hidden="true" class="icon-wa h-4 w-4 shrink-0" />
              <span>{{ t('contact.dewiButton') }}</span>
            </a>
          </div>
        </article>
      </section>
    </main>

    <!-- Global CTA Banner Component -->
    <Cta />
  </div>
</template>
