"use client";

import { useLanguage } from "@/lib/i18n";

import { HeroShowcase } from "./hero-showcase";

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white text-slate-950 pt-4 sm:pt-8 md:pt-10 pb-12 sm:pb-16"
      id="hero"
    >
      {/* 
        Background Ambient Gradiasi Putih ke Hijau Sesuai Referensi:
        - Mobile & iPad (< 1024px): Gradiasi lembut dari putih (atas) ke hijau pastel (#bfeab7) lalu memudar kembali ke putih (bawah)
        - Desktop (>= 1024px): Ambient radial glow halus di bagian atas
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] xs:h-[580px] sm:h-[640px] md:h-[720px] lg:hidden"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #bfeab7 36%, #def5d9 68%, #ffffff 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] hidden lg:block"
        style={{
          background: "radial-gradient(ellipse at top, rgba(95, 201, 74, 0.08), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <HeroShowcase key={lang} />
      </div>
    </section>
  );
}
