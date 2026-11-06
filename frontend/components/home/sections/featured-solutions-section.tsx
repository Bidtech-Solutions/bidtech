"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { BlurText } from "@/components/react-bits";
import { SolutionCard } from "@/components/home/components/solution-card";
import { FEATURED_SOLUTIONS_DATA } from "@/lib/data/featured-solutions";
import { useLanguage } from "@/lib/i18n";

// Beranda (web) menampilkan maksimal 9 solusi; di mobile hanya 3, sisanya lewat tombol ke halaman solusi.
const MAX_HOME_SOLUTIONS = 9;
const MOBILE_SOLUTIONS = 3;

export function FeaturedSolutionsSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const visibleSolutions = FEATURED_SOLUTIONS_DATA.slice(0, MAX_HOME_SOLUTIONS);

  return (
    <section
      id="featured-solutions"
      className="landing-panel relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/70 to-emerald-50/30"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-gradient-to-br from-[#45a02e]/10 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-gradient-to-tr from-[#a3e635]/12 to-transparent blur-3xl -z-10" />

      {/* Anchor alias so existing #portfolio links scroll here seamlessly */}
      <span id="portfolio" className="absolute -top-24 left-0 pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER with BidTech Green Mix & React Bits BlurText */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <BlurText
            as="h2"
            className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[38px] font-bold tracking-[-0.025em] text-slate-900 leading-tight"
            segments={
              isEn
                ? [
                    { text: "Our Featured" },
                    { text: "Engineered Solutions", className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent" },
                  ]
                : [
                    { text: "Produk & Solusi" },
                    { text: "Unggulan Rekayasa", className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent" },
                    { text: "Kami" },
                  ]
            }
          />
          <Reveal y={14} delay={120}>
            <p className="mt-3.5 text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              {isEn
                ? "Precision-designed, engineered to the highest code standards, and proven to deliver real business impact."
                : "Dirancang presisi, direkayasa dengan standar kode tertinggi, dan terbukti menghasilkan dampak bisnis nyata."}
            </p>
          </Reveal>
        </div>

        {/* 2. GRID KARTU PRODUK UNGGULAN (maks. 9 di web, 3 di mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {visibleSolutions.map((item, index) => (
            <Reveal
              key={item.id}
              delay={(index % 3) * 120}
              y={24}
              // Mobile: hanya 3 kartu pertama; sisanya tampil mulai tablet (md).
              className={`h-full ${index >= MOBILE_SOLUTIONS ? "hidden md:block" : ""}`}
            >
              <SolutionCard item={item} isEn={isEn} priority={index === 0} />
            </Reveal>
          ))}
        </div>

        {/* 3. Tautan ke halaman solusi (khusus mobile, karena di web semua kartu sudah tampil) */}
        <Reveal y={10} delay={200} className="md:hidden">
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              href={`/${lang}/solusi`}
              className="group inline-flex items-center gap-2 rounded-full border border-[#45a02e]/40 bg-white px-6 py-3 text-sm font-semibold text-[#45a02e] shadow-[0_2px_10px_rgba(69,160,46,0.08)] transition-all duration-300 hover:border-[#45a02e] hover:bg-[#45a02e] hover:text-white"
            >
              <span>{isEn ? "See Other Solutions" : "Lihat Solusi Lainnya"}</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
