"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface SubpageHeroProps {
  darkImage: string;
  lightImage?: string;
  subheadEn: string;
  subheadId: string;
  titlePrimary: string;     // e.g. "DENN"
  titleSecondary: string;   // e.g. "GALLERY" (rendered in text-stroke outline!)
  taglineEn: string;
  taglineId: string;
  descriptionEn: string;
  descriptionId: string;
  metricNumber: string;     // e.g. "48+"
  metricLabelEn: string;
  metricLabelId: string;
  ctaTextEn?: string;
  ctaTextId?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  breadcrumbs?: Array<{ labelEn: string; labelId: string; href?: string }>;
}

export default function SubpageHero({
  darkImage,
  lightImage = "/images/hero-light.webp",
  subheadEn,
  subheadId,
  titlePrimary,
  titleSecondary,
  taglineEn,
  taglineId,
  descriptionEn,
  descriptionId,
  metricNumber,
  metricLabelEn,
  metricLabelId,
  ctaTextEn = "EXPLORE COLLECTION",
  ctaTextId = "JELAJAHI KOLEKSI",
  ctaHref = "#content",
  onCtaClick,
  breadcrumbs = [],
}: SubpageHeroProps) {
  const { lang } = useLanguage();
  const { isLight } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);

  const activeImage = isLight ? lightImage : darkImage;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
      return;
    }
    if (ctaHref.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(ctaHref);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[85vh] sm:min-h-[92vh] w-full flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 overflow-hidden select-none transition-colors duration-500 ${
        isLight ? "bg-[#F8F9FA] text-neutral-900" : "bg-[#0A0A0A] text-white"
      }`}
    >
      {/* Background Architectural Canvas with Parallax & Theme Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <Image
          src={activeImage}
          alt={`${titlePrimary} ${titleSecondary} Architectural Backdrop`}
          fill
          priority
          sizes="100vw"
          className={`w-full h-full object-cover object-center scale-105 transition-all duration-700 ${
            isLight ? "brightness-[0.95]" : "brightness-[0.80]"
          }`}
        />

        {/* Dynamic Atmospheric Gradients */}
        {isLight ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/30 to-[#F8F9FA] pointer-events-none transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/50 pointer-events-none transition-opacity duration-500" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#0A0A0A] pointer-events-none transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/60 pointer-events-none transition-opacity duration-500" />
          </>
        )}
      </div>

      {/* Top Subhead Bar & Breadcrumbs */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-8 md:mb-12">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold transition-colors duration-500 ${
              isLight ? "text-neutral-700" : "text-white/80"
            }`}
          >
            {lang === "en" ? subheadEn : subheadId}
          </span>
        </div>

        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
            <Link
              href="/"
              className={`transition-colors ${
                isLight ? "text-neutral-500 hover:text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              DENN
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3 h-3 text-neutral-500" />
                {b.href ? (
                  <Link
                    href={b.href}
                    className={`transition-colors ${
                      isLight ? "text-neutral-500 hover:text-black" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "en" ? b.labelEn : b.labelId}
                  </Link>
                ) : (
                  <span className={`font-bold ${isLight ? "text-neutral-900" : "text-white"}`}>
                    {lang === "en" ? b.labelEn : b.labelId}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Mega Display Typography (Solid + Outline with breathing room) */}
      <div
        className={`relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 my-4 sm:my-8 md:my-auto transition-colors duration-500 ${
          isLight ? "text-neutral-900" : "text-white"
        }`}
      >
        <div className="relative">
          <h1 className="text-[3.25rem] xs:text-[3.75rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[11.5rem] font-black tracking-[-0.03em] sm:tracking-[-0.04em] leading-[0.88] sm:leading-[0.85] uppercase select-none">
            <div className="overflow-hidden">
              <span
                className={`block transition-colors duration-500 ${
                  isLight ? "text-neutral-900 drop-shadow-sm" : "text-white drop-shadow-lg"
                }`}
              >
                {titlePrimary}
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className={`block -mt-1.5 sm:-mt-5 md:-mt-8 lg:-mt-12 transition-colors duration-500 ${
                  isLight ? "text-stroke-dark opacity-85" : "text-stroke-white opacity-90"
                }`}
              >
                {titleSecondary}
              </span>
            </div>
          </h1>
        </div>
      </div>

      {/* Bottom Details & Solid Metric Card with Spacious Hierarchy */}
      <div
        className={`relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-8 transition-colors duration-500 ${
          isLight ? "text-neutral-900" : "text-white"
        }`}
      >
        {/* Left Info & CTA */}
        <div className="max-w-xl space-y-3 sm:space-y-4">
          <div className="space-y-2 sm:space-y-2.5">
            <span
              className={`hidden sm:inline-block text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${
                isLight ? "text-neutral-500 font-bold" : "text-neutral-400"
              }`}
            >
              DENN HOUSE • {titleSecondary} ARCHIVE
            </span>

            <h2 className="text-base sm:text-2xl md:text-3xl font-bold tracking-tight uppercase leading-snug">
              {lang === "en" ? taglineEn : taglineId}
            </h2>

            <p
              className={`text-xs sm:text-sm leading-relaxed font-sans normal-case pt-0.5 sm:pt-1 max-w-lg transition-colors duration-500 ${
                isLight ? "text-neutral-600 font-normal" : "text-neutral-300 font-normal"
              }`}
            >
              {lang === "en" ? descriptionEn : descriptionId}
            </p>
          </div>

          <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4">
            <a
              href={ctaHref}
              onClick={handleCtaClick}
              className={`group flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-xl active:scale-95 cursor-pointer ${
                isLight
                  ? "bg-black text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              <span>{lang === "en" ? ctaTextEn : ctaTextId}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Solid Metric Card */}
        <div
          className={`p-4 sm:p-5 rounded-2xl max-w-full sm:max-w-xs w-full shadow-2xl space-y-2.5 sm:space-y-3 transition-colors duration-500 ${
            isLight
              ? "bg-white/85 backdrop-blur-xl border border-neutral-200/90 text-neutral-900"
              : "bg-black/60 backdrop-blur-xl border border-white/20 text-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className={`text-2xl sm:text-3xl font-black tracking-tight tabular-numbers transition-colors duration-500 ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {metricNumber}
              </span>
              <p
                className={`text-[11px] font-normal leading-relaxed mt-1 transition-colors duration-500 ${
                  isLight ? "text-neutral-600" : "text-neutral-300"
                }`}
              >
                {lang === "en" ? metricLabelEn : metricLabelId}
              </p>
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                isLight
                  ? "border-neutral-300 bg-neutral-100 text-neutral-700"
                  : "border-white/20 bg-white/10 text-white"
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
