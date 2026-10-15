"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

/* =========================================================================
   PERSISTENT MULTI-DEVICE SHOWCASE STAGE
   All 5 slides share the EXACT SAME device frames (iMac, iPad, iPhone).
   Only the screen content smoothly crossfades for 100% visual consistency.
   ========================================================================= */

interface PortfolioItem {
  id: string;
  title: string;
  domain?: string;
  laptopImage?: string;
  image?: string;
  tabletImage?: string;
  mobileImage?: string;
  description: string;
  href: string;
}

interface PersistentDeviceStageProps {
  items: PortfolioItem[];
  currentIndex: number;
}

function PersistentDeviceStage({ items, currentIndex }: PersistentDeviceStageProps) {
  return (
    <div className="relative mx-auto w-full max-w-[500px] sm:max-w-[540px] md:max-w-[560px] lg:max-w-[600px] aspect-[4/3] select-none flex items-center justify-center">
      {/* 1. Desktop iMac Monitor (Left Background) - Statically Anchored */}
      <div className="absolute left-0 top-[4%] w-[72%] z-0">
        {/* iMac Screen Chassis */}
        <div className="relative rounded-t-[14px] sm:rounded-t-[18px] bg-[#0c1017] p-1.5 sm:p-2 pb-0 border-2 sm:border-[2.5px] border-[#1e293b] shadow-2xl ring-1 ring-white/10">
          {/* Top Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 size-1.5 sm:size-2 rounded-full bg-slate-900 ring-1 ring-slate-700/60 flex items-center justify-center z-20">
            <span className="size-0.5 rounded-full bg-blue-500/80" />
          </div>

          {/* Screen Display Frame with Smooth Crossfading Layers */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[10px] sm:rounded-t-[12px] bg-slate-950 shadow-inner">
            {items.map((item, idx) => {
              const src = item.laptopImage || item.image || "";
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={`desktop-${item.id}`}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {src && (
                    <Image
                      src={src}
                      alt={`${item.title} Desktop View`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 60vw, 420px"
                      priority={idx === 0}
                    />
                  )}
                </div>
              );
            })}
            {/* Specular Diagonal Glass Sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent z-20"
            />
          </div>

          {/* iMac Aluminum Chin */}
          <div className="h-3.5 sm:h-4.5 w-full bg-gradient-to-r from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] border-t border-[#94a3b8] rounded-b-sm flex items-center justify-center">
            <span className="size-1 sm:size-1.5 rounded-full bg-slate-700/60" />
          </div>
        </div>

        {/* iMac Stand Neck & Flat Base Foot */}
        <div className="w-12 sm:w-16 h-9 sm:h-11 bg-gradient-to-b from-[#cbd5e1] via-[#94a3b8] to-[#64748b] mx-auto -mt-0.5 shadow-inner" />
        <div className="w-28 sm:w-36 h-2 sm:h-2.5 bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] rounded-[2px] shadow-md mx-auto" />
        <div className="w-[85%] h-3 sm:h-4 bg-slate-900/25 blur-md rounded-full mx-auto -mt-1" />
      </div>

      {/* 2. Upright iPad Tablet (Right Side) - Statically Anchored */}
      <div className="absolute right-0 top-[10%] sm:top-[8%] w-[42%] sm:w-[41%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.38)]">
        <div className="relative rounded-[18px] sm:rounded-[24px] bg-[#0c1017] p-1.5 sm:p-2 border-[2px] border-[#334155] shadow-2xl">
          {/* Top Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-slate-900 z-20" />

          {/* iPad Screen Frame with Smooth Crossfading Layers */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[13px] sm:rounded-[18px] bg-slate-950 shadow-inner">
            {items.map((item, idx) => {
              const src = item.tabletImage || item.laptopImage || item.image || "";
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={`tablet-${item.id}`}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {src && (
                    <Image
                      src={src}
                      alt={`${item.title} Tablet View`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 35vw, 240px"
                      priority={idx === 0}
                    />
                  )}
                </div>
              );
            })}
            {/* Glass Sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent z-20"
            />
            {/* iPadOS Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-[2px] rounded-full bg-white/70 z-20" />
          </div>
        </div>
        <div className="w-[80%] h-3 bg-slate-900/25 blur-md rounded-full mx-auto mt-1" />
      </div>

      {/* 3. Upright iPhone Mobile (Foreground Center Overlap) - Statically Anchored */}
      <div className="absolute left-[36%] bottom-[2%] sm:bottom-[1%] w-[26%] sm:w-[25%] z-20 drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)]">
        <div className="relative rounded-[24px] sm:rounded-[30px] bg-[#0c1017] p-1.5 sm:p-2 border-[2px] sm:border-[2.5px] border-[#475569] shadow-2xl">
          {/* Dynamic Island Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-9 sm:w-12 h-2.5 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-end pr-1 shadow-sm">
            <span className="size-1 rounded-full bg-[#1e293b]" />
          </div>

          {/* iPhone Screen Frame with Smooth Crossfading Layers */}
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[18px] sm:rounded-[24px] bg-slate-950 shadow-inner">
            {items.map((item, idx) => {
              const src = item.mobileImage || item.laptopImage || item.image || "";
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={`mobile-${item.id}`}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {src && (
                    <Image
                      src={src}
                      alt={`${item.title} Mobile View`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 25vw, 160px"
                      priority={idx === 0}
                    />
                  )}
                </div>
              );
            })}
            {/* Glass Sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent z-20"
            />
            {/* iOS Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-9 sm:w-12 h-[2px] rounded-full bg-white/70 z-30" />
          </div>
        </div>
        <div className="w-[75%] h-3 bg-slate-900/35 blur-md rounded-full mx-auto mt-1" />
      </div>

      {/* Ambient Floor Shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-2 inset-x-8 h-6 bg-black/20 blur-xl rounded-full -z-10"
      />
    </div>
  );
}

/* =========================================================================
   MAIN PORTFOLIO SECTION
   ========================================================================= */

export function PortfolioSection() {
  const { t } = useLanguage();
  const items = t.portfolioSection.items as PortfolioItem[];
  const itemCount = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const activeItem = items[currentIndex] || items[0];
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const goToSlide = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  const handleNext = useCallback(() => {
    goToSlide((currentIndex + 1) % itemCount);
  }, [currentIndex, itemCount, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentIndex - 1 + itemCount) % itemCount);
  }, [currentIndex, itemCount, goToSlide]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    goToSlide(index);
  };

  // Autoplay (6s interval, paused on hover or touch)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe Handlers for mobile
  const onTouchStart = (e: TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current === null || touchEndX.current === null) {
      touchStartX.current = null;
      touchEndX.current = null;
      touchStartY.current = null;
      touchEndY.current = null;
      return;
    }

    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY =
      touchStartY.current !== null && touchEndY.current !== null
        ? touchStartY.current - touchEndY.current
        : 0;
    const minSwipeDistance = 35;

    if (
      Math.abs(distanceX) > minSwipeDistance &&
      Math.abs(distanceX) > Math.abs(distanceY) * 1.2
    ) {
      if (distanceX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <section
      className="landing-panel relative overflow-hidden bg-white py-14 sm:py-18 md:py-24"
      id="portfolio"
    >
      {/* Subtle clean ambient gradient in background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(106,177,53,0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-4 sm:px-5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#6ab135]">
              {t.portfolioSection.badge}
            </span>
          </div>
          <h2 className="mt-3 sm:mt-4 font-[family-name:var(--font-sora)] text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-slate-950 leading-tight">
            {t.portfolioSection.titlePrefix}{" "}
            <span className="text-[#6ab135]">{t.portfolioSection.titleHighlight}</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
            {t.portfolioSection.subtitle}
          </p>
        </Reveal>

        {/* Main Showcase Wrapper with Side Navigation Arrows */}
        <div
          className="relative mx-auto max-w-6xl px-1 sm:px-8 md:px-12 lg:px-14 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onTouchStart={onTouchStart}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Carousel Portofolio"
        >
          {/* Desktop Left Navigation Arrow - Permanently Fixed Centered Anchor */}
          <button
            aria-label="Portofolio sebelumnya"
            className="hidden sm:flex absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 size-11 sm:size-12 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#6ab135] hover:text-[#6ab135] hover:scale-105 active:scale-95 cursor-pointer z-30"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>

          {/* Desktop Right Navigation Arrow - Permanently Fixed Centered Anchor */}
          <button
            aria-label="Portofolio berikutnya"
            className="hidden sm:flex absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 size-11 sm:size-12 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#6ab135] hover:text-[#6ab135] hover:scale-105 active:scale-95 cursor-pointer z-30"
            onClick={handleNext}
            type="button"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>

          {/* 2-Column Showcase Content */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-center">
              
              {/* LEFT COLUMN: Persistent Multi-Device Stage (100% Consistent Across All 5 Slides) */}
              <div className="md:col-span-7 w-full">
                <PersistentDeviceStage
                  items={items}
                  currentIndex={currentIndex}
                />
              </div>

              {/* RIGHT COLUMN: Project Details (Permanently Fixed Height: Zero Vertical Jump) */}
              <div className="md:col-span-5 flex flex-col justify-start text-left">
                {/* Crossfading Information Area - Statically Fixed Height */}
                <div className="relative h-[210px] sm:h-[195px] lg:h-[205px] w-full">
                  {items.map((item, idx) => {
                    const isCurrent = idx === currentIndex;
                    return (
                      <div
                        key={`info-${item.id}`}
                        className={`absolute inset-0 flex flex-col justify-start transition-opacity duration-300 ease-in-out ${
                          isCurrent
                            ? "opacity-100 z-10 pointer-events-auto"
                            : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        {/* 1. Project Title (Fixed Height Container to Guarantee Zero Shift) */}
                        <div className="h-9 sm:h-10 lg:h-11 flex items-center">
                          <h3 className="font-[family-name:var(--font-sora)] text-2xl sm:text-[28px] lg:text-[32px] font-extrabold tracking-tight text-[#111729] leading-tight truncate">
                            <Link
                              href={`/portofolio?id=${item.id}`}
                              className="hover:text-[#6ab135] transition-colors"
                            >
                              {item.title}
                            </Link>
                          </h3>
                        </div>

                        {/* 2. Description Paragraph with Green Accent Line (Stable Height) */}
                        <div className="mt-3 sm:mt-4 flex items-stretch gap-3.5 sm:gap-4 min-h-[66px] sm:min-h-[70px] lg:min-h-[74px]">
                          <div className="w-[3.5px] sm:w-1 shrink-0 rounded-full bg-[#6ab135]" />
                          <p className="text-sm sm:text-[15px] lg:text-base leading-relaxed sm:leading-[1.65] text-[#1e1e1e] font-normal">
                            {item.description}
                          </p>
                        </div>

                        {/* 3. Domain Link with External Icon */}
                        <div className="mt-3.5 sm:mt-4 h-6 flex items-center">
                          <Link
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#6ab135] transition-colors hover:text-[#559427]"
                          >
                            <span>
                              {item.domain || (item.title.toLowerCase().replace(/\s+/g, "") + ".com")}
                            </span>
                            <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 4. Full-width Green CTA Button: Permanently Anchored in Position */}
                <div className="mt-6 sm:mt-8 pt-1">
                  <Link
                    href={activeItem?.id ? `/portofolio?id=${activeItem.id}` : "/portofolio"}
                    className="inline-flex w-full items-center justify-center rounded-xl sm:rounded-2xl bg-[#6ab135] py-3.5 sm:py-4 px-6 sm:px-8 text-center text-sm sm:text-base font-bold text-white shadow-[0_4px_16px_rgba(106,177,53,0.28)] transition-all duration-300 hover:bg-[#5aa02b] hover:shadow-[0_8px_24px_rgba(106,177,53,0.38)] hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
                  >
                    {t.portfolioSection.cta}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Controls: [<] [ • • • • • ] [>] */}
        <div className="mt-8 flex sm:hidden items-center justify-center gap-3">
          <button
            aria-label="Portofolio sebelumnya"
            className="flex size-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-90 transition-transform cursor-pointer"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, index) => {
              const isActive = currentIndex === index;

              return (
                <button
                  aria-label={`Lihat ${item.title}`}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "h-2 w-7 rounded-full bg-[#6ab135]"
                      : "h-2 w-2 rounded-full bg-slate-200 hover:bg-slate-300"
                  }`}
                  key={item.id}
                  onClick={() => handleDotClick(index)}
                  type="button"
                />
              );
            })}
          </div>

          <button
            aria-label="Portofolio berikutnya"
            className="flex size-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm active:scale-90 transition-transform cursor-pointer"
            onClick={handleNext}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Desktop & Tablet Bottom Pagination Dots */}
        <div
          aria-label="Paginasi portofolio"
          className="mt-10 sm:mt-14 hidden sm:flex items-center justify-center gap-2"
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;

            return (
              <button
                aria-label={`Lihat ${item.title}`}
                className={`cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "h-2 w-8 rounded-full bg-[#6ab135]"
                    : "h-2 w-2 rounded-full bg-slate-200 hover:bg-slate-300"
                }`}
                key={item.id}
                onClick={() => handleDotClick(index)}
                type="button"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

