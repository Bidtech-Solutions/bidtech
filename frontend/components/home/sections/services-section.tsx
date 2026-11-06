"use client";

import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { serviceMeta } from "@/lib/data/services";
import { useLanguage } from "@/lib/i18n";

function getClosestSlideIndex(slider: HTMLElement) {
  const slides = Array.from(slider.children) as HTMLElement[];

  return slides.reduce(
    (best, slide, index) => {
      const distance = Math.abs(slide.offsetLeft - slider.offsetLeft - slider.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    },
    { index: 0, distance: Number.POSITIVE_INFINITY },
  ).index;
}

export function ServicesSection() {
  const { t, lang } = useLanguage();
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const servicesSliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemCount = t.services.items.length;

  const programmaticScrollToIndex = useCallback((nextSlide: number) => {
    const slider = servicesSliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children) as HTMLElement[];
    const target = Math.max(0, Math.min(nextSlide, slides.length - 1));

    if (slides[target]) {
      isProgrammaticScroll.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      slider.scrollTo({
        left: slides[target].offsetLeft - slider.offsetLeft,
        behavior: "smooth",
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 550);
    }
  }, []);

  const moveServiceSlide = useCallback((nextSlide: number) => {
    setActiveServiceSlide(nextSlide);
    programmaticScrollToIndex(nextSlide);
  }, [programmaticScrollToIndex]);

  const handleNext = useCallback(() => {
    setActiveServiceSlide((prev) => {
      const next = (prev + 1) % itemCount;
      programmaticScrollToIndex(next);
      return next;
    });
  }, [itemCount, programmaticScrollToIndex]);

  const handlePrev = useCallback(() => {
    setActiveServiceSlide((prev) => {
      const next = prev === 0 ? itemCount - 1 : prev - 1;
      programmaticScrollToIndex(next);
      return next;
    });
  }, [itemCount, programmaticScrollToIndex]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    };
  }, []);

  // Autoplay countdown timer (4s) for mobile slider
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const handleServiceScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 1024) return;
    if (isProgrammaticScroll.current) return;

    const slider = event.currentTarget;
    if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);

    scrollEndTimeoutRef.current = setTimeout(() => {
      const closest = getClosestSlideIndex(slider);
      if (closest !== activeServiceSlide) {
        setActiveServiceSlide(closest);
      }
    }, 80);
  };

  return (
    <section
      className="landing-panel relative overflow-hidden py-12 sm:py-16 md:py-20"
      id="services"
    >
      {/* Sapuan ambient hijau (green glow effect) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[580px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(95,201,74,0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 -z-10 h-72 w-full max-w-3xl rounded-full bg-[#5fc94a]/[0.09] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.services.badge ?? "LAYANAN KUSTOM"}
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl min-[400px]:text-3xl font-bold tracking-[-0.025em] text-slate-900 sm:text-4xl lg:text-[42px] leading-tight">
            {lang === "id" ? (
              <>
                Layanan <span className="text-[#45a02e]">Unggulan</span>
              </>
            ) : (
              <>
                Featured <span className="text-[#45a02e]">Services</span>
              </>
            )}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed text-slate-600">
            {t.services.subtitle}
          </p>
        </Reveal>

        {/* 3-Card Grid / Mobile Responsive Slider */}
        <Reveal y={24}>
          <div
            className="mt-8 sm:mt-10 flex h-fit w-full snap-x snap-mandatory items-stretch gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden py-2 px-0.5 [scrollbar-width:none] md:mt-12 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:py-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchEnd={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onScroll={handleServiceScroll}
            ref={servicesSliderRef}
          >
            {t.services.items.map((service, index) => {
              const meta = serviceMeta[index] ?? serviceMeta[0];
              const Icon = meta.icon;
              const isPopular = meta.isPopular;

              return (
                <div
                  className="flex w-full min-w-full shrink-0 snap-center sm:min-w-[440px] lg:min-w-0 lg:shrink"
                  key={service.title}
                >
                  <div className="group relative flex w-full flex-col justify-between rounded-[24px] sm:rounded-[32px] bg-white overflow-hidden border-2 border-slate-200/80 hover:border-[#45a02e] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(69,160,46,0.18)] hover:-translate-y-1.5 transition-all duration-300">
                    {/* Top Card Visual Image */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={meta.image}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 380px, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index === 0}
                      />
                      {isPopular && (
                        <div className="absolute top-3.5 right-3.5 z-10 rounded-full bg-[#22a348] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                          {t.services.popularBadge ?? "POPULER"}
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-6">
                      {/* Icon & Title Row */}
                      <div className="mt-5 flex items-center gap-3.5">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf8ea] text-[#45a02e] transition-colors duration-300 group-hover:bg-[#45a02e] group-hover:text-white">
                          <Icon className="size-5 transition-colors duration-300" />
                        </div>
                        <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed min-h-[40px]">
                        {service.description}
                      </p>

                      {/* Features Bullet List */}
                      <ul className="mt-5 space-y-2.5">
                        {service.features.map((feature) => (
                          <li
                            className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-600"
                            key={feature}
                          >
                            <span className="size-2 shrink-0 rounded-full bg-[#45a02e]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom Action Button */}
                      <div className="mt-7 pt-2">
                        <a
                          href="#contact"
                          className="block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 cursor-pointer border border-[#45a02e] text-[#45a02e] bg-white group-hover:bg-[#45a02e] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(69,160,46,0.25)] hover:-translate-y-0.5 active:scale-95"
                        >
                          {t.services.viewDetail ?? "Lihat Detail"}
                        </a>
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
          </div>
        </Reveal>

      {/* Mobile Slider Navigation Dots & Arrows */}
      <div
        className="mt-7 flex items-center justify-center gap-4 lg:hidden"
        aria-label={t.services.ariaGroupLabel}
      >
        <button
          aria-label={t.services.ariaPrevious}
          className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer"
          onClick={handlePrev}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          className="flex items-center gap-2"
          aria-label={`${t.services.ariaGroupLabel} ${activeServiceSlide + 1} ${t.services.ariaGroupFrom} ${t.services.items.length}`}
        >
          {t.services.items.map((service, index) => {
            const isActive = activeServiceSlide === index;

            return (
              <button
                aria-label={`${t.services.ariaViewPrefix} ${service.title}`}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "h-2.5 w-8 rounded-full bg-[#d6f2c9] overflow-hidden"
                    : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
                key={service.title}
                onClick={() => moveServiceSlide(index)}
                type="button"
              >
                {isActive && (
                  <span
                    key={`service-progress-${activeServiceSlide}-${isPaused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#45a02e]"
                    style={{
                      animationName: "slideProgress",
                      animationDuration: "4000ms",
                      animationTimingFunction: "linear",
                      animationFillMode: "forwards",
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          aria-label={t.services.ariaNext}
          className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[#45a02e] hover:text-[#45a02e] hover:scale-105 active:scale-95 cursor-pointer"
          onClick={handleNext}
          type="button"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  </section>
  );
}
