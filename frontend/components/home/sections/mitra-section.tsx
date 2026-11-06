"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { BlurText, SpotlightCard } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";

interface ClientLogoItem {
  id: string;
  src: string;
  alt: string;
  /** Warna utama logo (hex 6 digit), dipakai untuk efek hover kartu. */
  brandColor: string;
  className?: string;
}

const TRUSTED_CLIENTS_GRID: ClientLogoItem[] = [
  {
    id: "semestapro",
    src: "/images/clients/semestapro.png",
    alt: "SemestaPro - Jual Beli Property",
    brandColor: "#1e3a8a",
    className: "max-h-12 sm:max-h-14 md:max-h-16 max-w-[155px] sm:max-w-[175px]",
  },
  {
    id: "funtravel",
    src: "/images/clients/funtravel.webp",
    alt: "Fun Travel & Transport",
    brandColor: "#f59e0b",
    className: "max-h-14 sm:max-h-16 md:max-h-[72px] max-w-[160px] sm:max-w-[180px]",
  },
  {
    id: "hkti-1",
    src: "/images/clients/hkti.webp",
    alt: "HKTI DPC Kota Batam",
    brandColor: "#dc2626",
    className: "max-h-16 sm:max-h-18 md:max-h-[80px] max-w-[120px] sm:max-w-[140px]",
  },
  {
    id: "ntr",
    src: "/images/clients/ntr.webp",
    alt: "NTR - Nadim Trans RentCar",
    brandColor: "#c9a227",
    className: "max-h-16 sm:max-h-18 md:max-h-[80px] max-w-[115px] sm:max-w-[130px] rounded-xs",
  },
  {
    id: "ayocuci",
    src: "/images/clients/ayocuci.png",
    alt: "AyoCuci",
    brandColor: "#f97316",
    className: "max-h-10 sm:max-h-11 md:max-h-[48px] max-w-[145px] sm:max-w-[165px]",
  },
  {
    id: "vis-society",
    src: "/images/clients/vis-society.webp",
    alt: "VIS Society",
    brandColor: "#0f4c6e",
    className: "max-h-12 sm:max-h-14 md:max-h-16 max-w-[155px] sm:max-w-[175px]",
  },
  {
    id: "masterpro",
    src: "/images/clients/masterpro.png",
    alt: "Master Pro Real Estate",
    brandColor: "#2563eb",
    className: "max-h-14 sm:max-h-16 md:max-h-[72px] max-w-[145px] sm:max-w-[165px]",
  },
  {
    id: "hkti-2",
    src: "/images/clients/hkti.webp",
    alt: "HKTI DPC Kota Batam",
    brandColor: "#dc2626",
    className: "max-h-16 sm:max-h-18 md:max-h-[80px] max-w-[120px] sm:max-w-[140px]",
  },
];

export function MitraSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section
      id="mitra"
      className="landing-panel relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/25 via-slate-50/50 to-white"
    >
      {/* Ambient central glow aura */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-emerald-400/8 via-[#5fc94a]/10 to-lime-400/8 blur-3xl -z-10 rounded-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER: Klien yang Mempercayai Kami */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <BlurText
            as="h2"
            className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-[-0.025em] text-slate-900 leading-tight"
            segments={
              isEn
                ? [
                    { text: "Clients Who" },
                    { text: "Trust Us", className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent" },
                  ]
                : [
                    { text: "Klien yang" },
                    { text: "Mempercayai Kami", className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent" },
                  ]
            }
          />
          <Reveal y={14} delay={100}>
            <p className="mt-3.5 text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {isEn
                ? "Now it's your turn to grow your business with BidTech. Let's build the best digital solution for your business!"
                : "Kini giliran bisnis Anda berkembang bersama BidTech. Yuk, wujudkan solusi digital terbaik untuk bisnis Anda!"}
            </p>
          </Reveal>
        </div>

        {/* 2. 4x2 SPOTLIGHT MICRO-CARDS GRID (Opsi 2) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 items-stretch justify-items-center py-2">
          {TRUSTED_CLIENTS_GRID.map((client, index) => (
            <Reveal
              key={`${client.id}-${index}`}
              delay={index * 60}
              y={16}
              className="w-full h-full"
            >
              <SpotlightCard
                spotlightColor={`${client.brandColor}24`}
                style={
                  {
                    "--brand": client.brandColor,
                    "--brand-shadow": `${client.brandColor}40`,
                  } as CSSProperties
                }
                className="group relative flex items-center justify-center h-28 sm:h-32 lg:h-36 w-full rounded-[20px] sm:rounded-[22px] bg-gradient-to-b from-white via-white to-slate-50/40 border border-slate-200/80 hover:border-[var(--brand)] hover:shadow-[0_8px_24px_var(--brand-shadow)] transition-all duration-300 p-4 sm:p-5 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex w-full h-full items-center justify-center select-none">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={220}
                    height={110}
                    className={`w-auto object-contain transition-all duration-300 opacity-85 group-hover:opacity-100 group-hover:scale-106 ${client.className ?? ""}`}
                  />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* 3. BOTTOM CAPTION: Dan masih banyak lagi... */}
        <Reveal y={10} delay={350}>
          <p className="mt-10 sm:mt-12 text-center text-xs sm:text-sm font-medium text-slate-400 tracking-wide">
            {isEn
              ? "And many more businesses growing with BidTech..."
              : "Dan masih banyak lagi bisnis & institusi yang tumbuh bersama BidTech..."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
