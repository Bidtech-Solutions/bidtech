"use client";

import { Globe } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { HeroDomainSearch } from "./hero/hero-domain-search";

export function DomainSection() {
  return (
    <section
      id="domain-search"
      className="landing-panel relative overflow-visible bg-gradient-to-b from-white via-slate-50/60 to-white py-12 sm:py-16 md:py-20 border-b border-slate-100"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <Reveal y={16}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4f2c5] bg-[#f0faee] px-4 py-1.5 text-xs font-bold text-[#45a02e]">
              <Globe className="size-3.5" />
              <span>Cek &amp; Daftarkan Domain</span>
            </div>
            <h2 className="mt-3.5 font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.025em] text-slate-900">
              Temukan Domain Impian untuk <span className="text-[#45a02e]">Bisnis Anda</span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm sm:text-base text-slate-600">
              Periksa ketersediaan alamat website resmi (.com, .id, .co.id, dll) secara instan dengan harga terjangkau.
            </p>
          </Reveal>
        </div>

        <Reveal y={20} delay={150}>
          <div className="max-w-4xl mx-auto">
            <HeroDomainSearch />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

