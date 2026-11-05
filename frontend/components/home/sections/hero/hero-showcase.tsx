"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";

export function HeroShowcase() {
  const { t } = useLanguage();

  const heroCopy = t.heroShowcase as typeof t.heroShowcase & {
    titlePart1?: string;
    titlePart2?: string;
    titlePartGreen?: string;
    subtitleMain?: string;
    ctaSolutions?: string;
  };

  const titlePart1 = heroCopy.titlePart1 || "Tingkatkan Skala Bisnis";
  const titlePart2 = heroCopy.titlePart2 || "Anda dengan";
  const titlePartGreen = heroCopy.titlePartGreen || "Solusi Digital Cerdas";
  const subtitle =
    heroCopy.subtitleMain ||
    "Software house terdepan untuk pengembangan web skala enterprise, aplikasi mobile kustom, dan sistem automasi bisnis berbasis analitik cerdas.";
  const ctaText = heroCopy.ctaSolutions || "Jelajahi Solusi";

  return (
    <div className="relative w-full">
      {/* HERO CONTENT GRID: Aligned to Bottom (items-end) with pb-0 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-end gap-6 lg:gap-6 min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] xl:min-h-[640px] pt-2 sm:pt-8 pb-0">
        {/* KOLOM KIRI: Headings, Subtitle & CTA Button */}
        <div className="flex flex-col justify-center text-left max-w-2xl mx-auto lg:mx-0 self-center pb-4 sm:pb-12 lg:pb-16 pt-2 sm:pt-4 w-full">
          {/* Main Title (3-line matching reference) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-3xl xs:text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.16]"
          >
            <span className="block">{titlePart1}</span>
            <span className="block mt-1 sm:mt-1.5">
              {titlePart2}{" "}
              <span className="text-[#45a02e] inline-block">{titlePartGreen.split(" ").slice(0, 2).join(" ")}</span>
            </span>
            <span className="block text-[#45a02e] mt-0.5">
              {titlePartGreen.split(" ").slice(2).join(" ")}
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3.5 sm:mt-6 text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl"
          >
            {subtitle}
          </motion.p>

          {/* CTA Action Button: Full Width on Mobile (Panjang ke Kanan), Natural Pill on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-8 flex items-center justify-start w-full"
          >
            <Link
              href="/solusi"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#52c41a] hover:bg-[#43a613] text-white px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold shadow-[0_4px_16px_rgba(72,176,44,0.25)] hover:shadow-[0_8px_24px_rgba(72,176,44,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
            >
              <span>{ctaText}</span>
              <ArrowRight className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Model Showcase - Menyentuh Paling Bawah Section (Bottom-0 Flush) */}
        <div className="relative flex items-end justify-center lg:justify-end h-[380px] xs:h-[440px] sm:h-[540px] lg:h-[600px] xl:h-[640px] w-full self-end">
          <div className="relative h-full w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] xl:max-w-[510px]">
            <Image
              src="/images/assets/iconlanding.png"
              alt="Bidtech Solusi Digital"
              fill
              priority
              className="object-contain object-bottom select-none pointer-events-none"
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 510px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
