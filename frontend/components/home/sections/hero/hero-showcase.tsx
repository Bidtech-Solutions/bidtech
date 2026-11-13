"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { Magnet, SplitText, TiltedCard } from "@/components/react-bits";
import { useLanguage } from "@/lib/i18n";
import { HeroCharacterBackdrop } from "./hero-character-backdrop";

const HERO_GRADIENT = "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent";

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

  const titlePart1 = heroCopy.titlePart1 || "Tingkatkan Skala";
  const titlePart2 = heroCopy.titlePart2 || "Bisnis Anda dengan";
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
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-end gap-6 lg:gap-8 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px] pt-1 sm:pt-2 pb-0">
        {/* KOLOM KIRI: Headings, Subtitle & Single Focused CTA */}
        <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0 self-center pb-6 sm:pb-10 lg:pb-12 pt-0 w-full">
          {/* Main Title: 3 baris seimbang ("Tingkatkan Skala / Bisnis Anda dengan / Solusi Digital Cerdas").
              Di bawah lg setiap baris tidak boleh patah; ukuran huruf mengikuti lebar layar (vw) agar memenuhi layar mobile.
              Animasi huruf memakai CSS (animateOn="load") supaya mulai saat halaman tampil, tanpa menunggu JavaScript. */}
          <SplitText
            as="h1"
            animateOn="load"
            className={`font-[family-name:var(--font-plus-jakarta),sans-serif] ${
              // Baris terpanjang versi EN lebih panjang, jadi skalanya sedikit lebih kecil agar sama-sama memenuhi layar.
              lang === "en" ? "text-[clamp(1.5rem,9vw,3.25rem)]" : "text-[clamp(1.5rem,9.6vw,3.4rem)]"
            } lg:text-[48px] xl:text-[54px] font-bold tracking-[-0.03em] text-slate-900 leading-[1.15] text-center lg:text-left`}
            lineClassName="whitespace-nowrap lg:whitespace-normal"
            segments={[
              { text: titlePart1 },
              { text: titlePart2, newLine: true },
              { text: titlePartGreen, className: HERO_GRADIENT, newLine: true },
            ]}
          />

          {/* Subtitle Description (animasi CSS, tidak menunggu JavaScript) */}
          <p
            className="hero-fade-up mt-4 sm:mt-6 text-sm sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0"
            style={{ animationDelay: "0.35s" }}
          >
            {subtitle}
          </p>

          {/* CTA: selebar layar di mobile, ukuran biasa mulai sm */}
          <div
            className="hero-fade-up mt-6 sm:mt-8 flex items-center justify-center lg:justify-start w-full"
            style={{ animationDelay: "0.5s" }}
          >
            <Magnet padding={36} magnetStrength={4} className="w-full sm:w-auto">
              <Link
                href={`/${lang}/solusi`}
                className="group flex w-full sm:inline-flex sm:w-auto items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#45a02e] via-[#4db734] to-[#388e22] hover:from-[#388e22] hover:to-[#2e741b] text-white px-6 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-bold shadow-[0_6px_20px_rgba(69,160,46,0.28)] hover:shadow-[0_8px_26px_rgba(69,160,46,0.38)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-center"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnet>
          </div>
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
            {/* Animasi melayang via CSS (GPU); tanpa backdrop-blur karena latar sudah putih solid */}
            <div
              className="hero-float absolute top-10 -left-2 sm:-left-6 z-20 hidden xs:flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              style={{ "--float-y": "-7px" } as CSSProperties}
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
            </div>

            {/* Floating Micro Badge 2: Right Middle */}
            <div
              className="hero-float absolute bottom-24 -right-2 sm:-right-4 z-20 hidden xs:flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              style={{ "--float-y": "7px", animationDuration: "4.5s", animationDelay: "1s" } as CSSProperties}
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
            </div>

            {/* Main Consultant/Laptop Illustration (Flushed to bottom) */}
            <div className="relative h-full w-full">
              <Image
                src="/images/hero/iconlanding.webp"
                alt="Bidtech Solusi Digital"
                fill
                priority
                fetchPriority="high"
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
