"use client";

import { useState, useRef, useEffect, useCallback, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { BlurText, Magnet, SpotlightCard } from "@/components/react-bits";
import { SOLUTIONS_DATA, type SolutionItem } from "@/lib/data/solutions-carousel";
import { useLanguage } from "@/lib/i18n";

const N = SOLUTIONS_DATA.length; // 4

// 5 set kartu (20 item) untuk buffer infinite loop seamless
const EXTENDED_ITEMS: (SolutionItem & { uniqueKey: string; itemIndex: number })[] = [
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set0-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set1-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set2-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set3-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set4-${item.id}-${i}`, itemIndex: i })),
];

const START_INDEX = N * 2; // Mulai di index 8 (set tengah)

export function ServicesCarouselSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [, setActiveCardId] = useState<string>("erp");
  // Kartu utuh: 3 di desktop lebar, 2 di tablet, 1 di mobile
  const [cardsPerView, setCardsPerView] = useState(3);

  const isMoving = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Deteksi jumlah kartu per view
  useEffect(() => {
    const updateCards = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCardsPerView(3);
      else if (w >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  // Hitung indeks solusi aktif dalam siklus berulang (0 .. N-1)
  const realIndex = ((currentIndex % N) + N) % N;

  // Sinkronisasi activeCardId dengan kartu paling kiri
  useEffect(() => {
    if (SOLUTIONS_DATA[realIndex]) {
      setActiveCardId(SOLUTIONS_DATA[realIndex].id);
    }
  }, [realIndex]);

  // Aktifkan kembali transisi setelah reset posisi seketika
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => {
      isMoving.current = false;
    }, 550);
  }, []);

  const prevSlide = useCallback(() => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => {
      isMoving.current = false;
    }, 550);
  }, []);

  const goToSlide = useCallback((targetRealIndex: number) => {
    if (isMoving.current) return;
    const currentReal = ((currentIndex % N) + N) % N;
    let diff = targetRealIndex - currentReal;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    if (diff === 0) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + diff);
    setTimeout(() => {
      isMoving.current = false;
    }, 550);
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    isMoving.current = false;
    // Boundary check: Pertahankan currentIndex di set tengah secara seamless
    if (currentIndex >= N * 3) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - N);
    } else if (currentIndex < N * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + N);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="services"
      className="landing-panel relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient background glow mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(69,160,46,0.08),transparent_75%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto flex flex-col justify-center">
        {/* 1. SECTION HEADER (Centered Title & Subtitle) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
          <BlurText
            as="h2"
            className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold tracking-[-0.025em] text-slate-900 leading-tight"
            segments={
              isEn
                ? [
                    { text: "What Would You Like to" },
                    { text: "Build Today?", className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent" },
                  ]
                : [
                    { text: "Apa yang Ingin" },
                    { text: "Anda Bangun", className: "bg-gradient-to-r from-[#45a02e] via-[#5fc94a] to-[#22c55e] bg-clip-text text-transparent" },
                    { text: "Hari Ini?" },
                  ]
            }
          />
          <Reveal y={12} delay={100}>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-xl mx-auto">
              {isEn
                ? "We provide comprehensive technology solutions designed to accelerate your digital business growth."
                : "Kami memberikan solusi teknologi komprehensif yang dirancang untuk mempercepat pertumbuhan bisnis digital Anda."}
            </p>
          </Reveal>
        </div>

        {/* 2. CAROUSEL WRAPPER WITH SIDE CONTROLS */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating Left Chevron (Desktop) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Layanan sebelumnya"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 items-center justify-center size-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Floating Right Chevron (Desktop) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Layanan berikutnya"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 items-center justify-center size-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* SLIDER VIEWPORT (Clean, no shadows, no clipping) */}
          <div className="overflow-hidden py-4 sm:py-6 px-1 sm:px-2">
            <div
              className="flex will-change-transform items-center"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                transition: isTransitioning
                  ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {EXTENDED_ITEMS.map((item, index) => {
                // Kartu paling kiri adalah kartu pada index tepat currentIndex
                const isLeftCard = index === currentIndex;

                return (
                  <div
                    key={item.uniqueKey}
                    style={{ width: `${100 / cardsPerView}%` }}
                    className="shrink-0 px-2.5 sm:px-3.5 py-2 transition-transform duration-500 ease-out"
                    onClick={() => {
                      goToSlide(item.itemIndex);
                      setActiveCardId(item.id);
                    }}
                  >
                    <SpotlightCard
                      spotlightColor="rgba(69, 160, 46, 0.12)"
                      className={`group relative flex flex-col justify-between h-full min-h-[390px] sm:min-h-[410px] lg:min-h-[430px] rounded-[22px] sm:rounded-[24px] bg-white p-5 sm:p-6 lg:p-7 transition-all duration-500 ease-out origin-center cursor-pointer ${
                        isLeftCard
                          ? "scale-[1.02] lg:scale-[1.03] z-10 border-2 border-[#45a02e]"
                          : "scale-[0.98] border border-slate-200/90 hover:border-[#45a02e] hover:scale-[0.99]"
                      }`}
                    >
                      {/* Top: Illustration Asset Clean */}
                      <div className="relative flex items-center justify-center h-36 sm:h-40 lg:h-44 w-full mb-3 overflow-hidden rounded-xl">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          width={220}
                          height={165}
                          priority={index >= START_INDEX && index <= START_INDEX + 3}
                          className="h-full w-auto max-h-[155px] object-contain transition-transform duration-500 ease-out group-hover:scale-106 group-hover:-translate-y-1 select-none"
                        />
                      </div>

                      {/* Middle: Content (No badges, clean Title & Description) */}
                      <div className="flex-1 text-left flex flex-col justify-start">
                        <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-lg sm:text-xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-[#45a02e]">
                          {isEn ? item.titleEn : item.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {isEn ? item.descriptionEn : item.description}
                        </p>
                      </div>

                      {/* Bottom: Action CTA Button with React Bits Magnet */}
                      <div className="mt-5 pt-1 w-full">
                        <Magnet padding={18} magnetStrength={3} className="w-full">
                          <Link
                            href={`/solusi#${item.slug}`}
                            className={`inline-flex items-center justify-center gap-2 w-full rounded-full py-2.5 sm:py-3 px-5 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer ${
                              isLeftCard
                                ? "border-2 border-[#45a02e] text-[#45a02e] hover:bg-[#45a02e] hover:text-white"
                                : "bg-[#45a02e] hover:bg-[#388e22] text-white"
                            }`}
                          >
                            <span>{isEn ? "View Solution" : "Lihat Layanan"}</span>
                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </Link>
                        </Magnet>
                      </div>
                    </SpotlightCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. BOTTOM PAGINATION CONTROLS (← • • • • →) */}
        <div className="mt-5 sm:mt-7 lg:mt-8 flex items-center justify-center gap-4">
          {/* Arrow Left */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Sebelumnya"
            className="flex items-center justify-center size-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition active:scale-90 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
          </button>

          {/* Dots Indicator (Siklus 4 Solusi) */}
          <div className="flex items-center gap-2">
            {SOLUTIONS_DATA.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  realIndex === idx
                    ? "w-6 h-2 bg-[#45a02e]"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Arrow Right */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Berikutnya"
            className="flex items-center justify-center size-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition active:scale-90 cursor-pointer"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
