"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { mitraLogos } from "@/lib/data/mitra";
import { useLanguage } from "@/lib/i18n";

export function MitraSection() {
  const { t } = useLanguage();

  return (
    <section
      id="mitra"
      className="landing-panel relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#45a02e]/[0.05] via-white to-[rgba(95,201,74,0.08)]"
    >
      {/* BACKGROUND WAVE CANVAS: Menyambung harmonis dari Featured Solutions Section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      >
        <svg
          viewBox="0 0 1440 500"
          fill="none"
          preserveAspectRatio="none"
          className="hidden sm:block absolute inset-0 h-full w-full"
        >
          {/* Garis Putus-Putus dengan Node Marker Circle */}
          <path
            d="M -40 160 C 380 90, 740 220, 1120 150 C 1280 120, 1420 160, 1500 170"
            stroke="#84cc16"
            strokeOpacity="0.30"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          <circle cx="380" cy="90" r="5" fill="#84cc16" fillOpacity="0.7" />

          {/* Garis Utuh Tipis Bergelombang */}
          <path
            d="M -40 280 C 440 210, 820 320, 1220 250 C 1360 220, 1440 260, 1500 270"
            stroke="#45a02e"
            strokeOpacity="0.20"
            strokeWidth="1.0"
          />
        </svg>

        {/* Ambient Connected Glow River */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-full max-w-4xl rounded-full bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(95,201,74,0.10),transparent_70%)] filter blur-3xl" />
        <div className="absolute -left-20 top-1/4 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(69,160,46,0.08)_0%,transparent_70%)] filter blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.10)_0%,transparent_70%)] filter blur-3xl" />

        {/* Bottom Ambient Transition toward Contact Section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[rgba(95,201,74,0.08)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <Reveal y={16}>
            <h2 className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.mitra.titlePrefix}{" "}
              <span className="text-[#45a02e]">{t.mitra.titleHighlight}</span>
            </h2>
            <p className="mt-3.5 text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              {t.mitra.subtitle}
            </p>
          </Reveal>
        </div>

        {/* 2. LOGO MARQUEE (Clean Transparent Floating Logos with Edge Fade Mask) */}
        <div className="mitra-marquee-window relative mt-6 sm:mt-10 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="mitra-marquee-track flex w-max min-w-max items-center gap-6 sm:gap-8 will-change-transform">
            {[0, 1, 2].map((groupIndex) => (
              <div
                aria-hidden={groupIndex !== 0}
                className="flex shrink-0 items-center gap-6 sm:gap-8"
                key={`mitra-group-${groupIndex}`}
              >
                {mitraLogos.map((mitra) => (
                  <div
                    key={`${mitra.alt}-${groupIndex}`}
                    className="group relative flex h-20 sm:h-24 w-44 sm:w-52 shrink-0 items-center justify-center rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/50 hover:backdrop-blur-sm hover:border hover:border-[#45a02e]/25 hover:shadow-[0_8px_24px_rgba(69,160,46,0.08)] hover:-translate-y-1 cursor-pointer"
                  >
                    <Image
                      src={mitra.src}
                      alt={mitra.alt}
                      width={180}
                      height={80}
                      className="max-h-10 sm:max-h-12 w-auto max-w-[130px] sm:max-w-[150px] object-contain opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
