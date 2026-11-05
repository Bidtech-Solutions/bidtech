"use client";

import { useLanguage } from "@/lib/i18n";
import { HeroShowcase } from "./hero-showcase";
import { HeroWaves } from "./hero-waves";

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white text-slate-950 pt-8 sm:pt-12 lg:pt-16 pb-0"
      id="hero"
    >
      {/* 1. Full-Width Background Waves across whole viewport */}
      <HeroWaves className="z-0" />

      {/* 2. Top Radial Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_top,_rgba(95,201,74,0.08),_transparent_70%)] z-0"
      />

      {/* 3. Bottom Seamless Gradient Transition to Services Section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#84cc16]/[0.03] to-[#84cc16]/[0.08] z-0"
      />

      {/* 4. Centered Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroShowcase key={lang} />
      </div>
    </section>
  );
}
