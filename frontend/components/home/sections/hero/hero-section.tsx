"use client";

import { LogoLoop, type LogoLoopItem } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";
import { HeroShowcase } from "./hero-showcase";

const HERO_PARTNER_LOGOS: LogoLoopItem[] = [
  {
    src: "/images/mitra/mitra-kadin-batam-20260728.png",
    alt: "Kadin Batam",
    width: 140,
    height: 60,
  },
  {
    src: "/images/mitra/mitra-batamnow-20260728.png",
    alt: "Koran Digital BatamNow",
    width: 210,
    height: 56,
  },
  {
    src: "/images/mitra/mitra-appeknas-20260728.png",
    alt: "APPEKNAS",
    width: 140,
    height: 60,
  },
  {
    src: "/images/mitra/mitra-apindo-20260728.png",
    alt: "APINDO - Asosiasi Pengusaha Indonesia",
    width: 190,
    height: 60,
  },
];

export function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white text-slate-950 pt-8 sm:pt-12 lg:pt-16 pb-0"
      id="hero"
    >
      {/* Subtle clean ambient lighting at top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(95,201,74,0.06),_transparent_70%)] z-0"
      />

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
