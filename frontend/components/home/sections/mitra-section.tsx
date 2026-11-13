"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { SplitText } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";

interface ClientLogoItem {
  id: string;
  src: string;
  alt: string;
  className?: string;
}

const TRUSTED_CLIENTS: ClientLogoItem[] = [
  {
    id: "semestapro",
    src: "/images/clients/semestapro.webp",
    alt: "SemestaPro - Jual Beli Property",
    className: "max-h-14 sm:max-h-16 md:max-h-20 max-w-[200px] sm:max-w-[240px] md:max-w-[260px]",
  },
  {
    id: "funtravel",
    src: "/images/clients/funtravel.webp",
    alt: "Fun Travel & Transport",
    className: "max-h-18 sm:max-h-22 md:max-h-26 max-w-[220px] sm:max-w-[260px] md:max-w-[280px]",
  },
  {
    id: "hkti",
    src: "/images/clients/hkti.webp",
    alt: "HKTI DPC Kota Batam",
    className: "max-h-22 sm:max-h-26 md:max-h-32 max-w-[150px] sm:max-w-[170px] md:max-w-[190px]",
  },
  {
    id: "ntr",
    src: "/images/clients/ntr.webp",
    alt: "NTR - Nadim Trans RentCar",
    className: "max-h-20 sm:max-h-24 md:max-h-28 max-w-[160px] sm:max-w-[180px] md:max-w-[200px] rounded-sm",
  },
  {
    id: "ayocuci",
    src: "/images/clients/ayocuci.webp",
    alt: "AyoCuci",
    className: "max-h-12 sm:max-h-14 md:max-h-18 max-w-[200px] sm:max-w-[240px] md:max-w-[260px]",
  },
  {
    id: "vis-society",
    src: "/images/clients/vis-society.webp",
    alt: "VIS Society",
    className: "max-h-16 sm:max-h-18 md:max-h-22 max-w-[210px] sm:max-w-[250px] md:max-w-[280px]",
  },
  {
    id: "masterpro",
    src: "/images/clients/masterpro.webp",
    alt: "Master Pro Real Estate",
    className: "max-h-18 sm:max-h-22 md:max-h-26 max-w-[200px] sm:max-w-[240px] md:max-w-[260px]",
  },
  {
    id: "sony-christanto",
    src: "/images/clients/sony-christanto.webp",
    alt: "Sahabat Sony Christanto",
    className: "max-h-20 sm:max-h-24 md:max-h-28 max-w-[150px] sm:max-w-[170px] md:max-w-[190px]",
  },
];

export function MitraSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <section
      id="mitra"
      className="landing-panel cv-auto relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/25 via-slate-50/50 to-white"
    >
      {/* Ambient central glow aura */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-emerald-400/8 via-[#5fc94a]/10 to-lime-400/8 blur-3xl -z-10 rounded-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER: Klien yang Mempercayai Kami */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <SplitText
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

        {/* 2. LOGO KLIEN BERSIH, BESAR, 2 BARIS RAPI (4 LOGO PER BARIS DI DESKTOP/TABLET) */}
        <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-items-center gap-x-8 sm:gap-x-12 md:gap-x-14 lg:gap-x-16 gap-y-8 sm:gap-y-12 md:gap-y-14 max-w-5xl mx-auto py-6 sm:py-8">
          {TRUSTED_CLIENTS.map((client, index) => (
            <Reveal
              key={client.id}
              delay={index * 50}
              y={16}
              className="flex items-center justify-center w-full"
            >
              <div className="group relative flex items-center justify-center h-20 sm:h-24 md:h-28 w-full max-w-[220px] select-none">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={320}
                  height={160}
                  className={`w-auto object-contain opacity-85 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-110 cursor-pointer ${client.className ?? ""}`}
                />
              </div>
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
