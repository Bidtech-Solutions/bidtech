"use client";

import { LogoLoop, type LogoLoopItem } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";
import { HeroShowcase } from "./hero-showcase";
import { HeroWaves } from "./hero-waves";

const HERO_PARTNER_LOGOS: LogoLoopItem[] = [
  {
    src: "/images/mitra/mitra-kadin-batam-20260728.webp",
    alt: "Kadin Batam",
    width: 140,
    height: 60,
  },
  {
    src: "/images/mitra/mitra-batamnow-20260728.webp",
    alt: "Koran Digital BatamNow",
    width: 210,
    height: 56,
  },
  {
    src: "/images/mitra/mitra-appeknas-20260728.webp",
    alt: "APPEKNAS",
    width: 140,
    height: 60,
  },
  {
    src: "/images/mitra/mitra-apindo-20260728.webp",
    alt: "APINDO - Asosiasi Pengusaha Indonesia",
    width: 190,
    height: 60,
  },
];

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white text-slate-950 pt-4 sm:pt-6 lg:pt-8 pb-0"
      id="hero"
    >
      {/* Background Gelombang Hijau, Garis Kontur & Pencahayaan Halus sesuai Desain */}
      <HeroWaves />

      {/* Centered Hero Showcase Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroShowcase key={lang} />
      </div>

      {/* Bottom Hero Partner & Community Logo Loop Bar */}
      <div className="relative z-20 border-y border-slate-100 bg-white/90 backdrop-blur-xs py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LogoLoop logos={HERO_PARTNER_LOGOS} speedSeconds={24} />
        </div>
      </div>
    </section>
  );
}
