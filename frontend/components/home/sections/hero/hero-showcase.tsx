"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Magnet, TiltedCard } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";
import { HeroCharacterBackdrop } from "./hero-character-backdrop";

export function HeroShowcase() {
  const { t, lang } = useLanguage();

  const heroCopy = t.heroShowcase as typeof t.heroShowcase & {
    titlePart1?: string;
    titlePart2?: string;
    titlePartGreen?: string;
    subtitleMain?: string;
    ctaSolutions?: string;
    floatingBadges?: {
      badge1Title: string;
      badge1Sub: string;
      badge2Title: string;
      badge2Sub: string;
    };
  };

  const titlePart1 = heroCopy.titlePart1 || "Tingkatkan Skala Bisnis";
  const titlePart2 = heroCopy.titlePart2 || "Anda dengan";
  const titlePartGreen = heroCopy.titlePartGreen || "Solusi Digital Cerdas";
  const subtitle =
    heroCopy.subtitleMain ||
    "Software house terdepan untuk pengembangan web skala enterprise, aplikasi mobile kustom, dan sistem automasi bisnis berbasis analitik cerdas.";
  const ctaPrimary = heroCopy.ctaSolutions || "Jelajahi Solusi";

  const floatingBadges = heroCopy.floatingBadges || {
    badge1Title: "High-Performance Arch",
    badge1Sub: "Next.js & Cloud-Native",
    badge2Title: "50+ Klien Terpercaya",
    badge2Sub: "Kepuasan 99%+",
  };

  return (
    <div className="relative w-full">
      {/* HERO CONTENT GRID: Aligned to Bottom (items-end) with pb-0 */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-end gap-6 lg:gap-8 min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] xl:min-h-[600px] pt-4 sm:pt-8 pb-0">
        {/* KOLOM KIRI: Headings, Subtitle & Single Focused CTA */}
        <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0 self-center pb-6 sm:pb-12 lg:pb-16 pt-2 sm:pt-4 w-full">
          {/* Main Title (3-line with Plus Jakarta Sans & BidTech Green Highlight) */}
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-[clamp(1.125rem,5.6vw,3rem)] lg:text-[48px] xl:text-[54px] font-bold tracking-[-0.03em] text-slate-900 leading-[1.15] text-center lg:text-left"
          >
            {/* Di bawah lg setiap baris tidak boleh patah; ukuran huruf mengikuti lebar layar (vw) agar baris terpanjang tetap muat. */}
            <span className="block whitespace-nowrap lg:whitespace-normal">{titlePart1}</span>
            <span className="block whitespace-nowrap lg:whitespace-normal mt-1 sm:mt-1.5">
              {titlePart2}{" "}
              <span className="bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent inline-block">
                {titlePartGreen.split(" ").slice(0, 2).join(" ")}
              </span>
            </span>
            <span className="block whitespace-nowrap lg:whitespace-normal bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent mt-0.5">
              {titlePartGreen.split(" ").slice(2).join(" ")}
            </span>
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0"
          >
            {subtitle}
          </motion.p>

          {/* Single Focused CTA Button with React Bits Magnet */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start w-full"
          >
            <Magnet padding={36} magnetStrength={4} className="w-auto">
              <Link
                href={`/${lang}/solusi`}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#45a02e] via-[#4db734] to-[#388e22] hover:from-[#388e22] hover:to-[#2e741b] text-white px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold shadow-[0_6px_20px_rgba(69,160,46,0.28)] hover:shadow-[0_8px_26px_rgba(69,160,46,0.38)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-center"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnet>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Model Showcase dengan React Bits TiltedCard 3D & Floating Badges */}
        <div className="relative flex items-end justify-center lg:justify-end h-[380px] xs:h-[440px] sm:h-[520px] lg:h-[580px] xl:h-[620px] w-full self-end">
          {/* Bulatan Aurora di Belakang Karakter */}
          <HeroCharacterBackdrop />

          <TiltedCard
            maxAngle={7}
            scaleOnHover={1.015}
            perspective={1000}
            className="relative h-full w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] xl:max-w-[510px] flex items-end justify-center z-10"
          >
            {/* Floating Micro Badge 1: Top Left */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-2 sm:-left-6 z-20 hidden xs:flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#edf8eb] text-[#45a02e]">
                <Zap className="size-4" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  {floatingBadges.badge1Title}
                </div>
                <div className="text-[9px] text-slate-500 font-medium mt-0.5">
                  {floatingBadges.badge1Sub}
                </div>
              </div>
            </motion.div>

            {/* Floating Micro Badge 2: Right Middle */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-24 -right-2 sm:-right-4 z-20 hidden xs:flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Star className="size-4 fill-amber-500" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-slate-900 leading-tight">
                  {floatingBadges.badge2Title}
                </div>
                <div className="text-[9px] text-slate-500 font-medium mt-0.5">
                  {floatingBadges.badge2Sub}
                </div>
              </div>
            </motion.div>

            {/* Main Consultant/Laptop Illustration (Flushed to bottom) */}
            <div className="relative h-full w-full">
              <Image
                src="/images/hero/iconlanding.webp"
                alt="Bidtech Solusi Digital"
                fill
                priority
                className="object-contain object-bottom select-none pointer-events-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.06)]"
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 510px"
              />
            </div>
          </TiltedCard>
        </div>
      </div>
    </div>
  );
}
