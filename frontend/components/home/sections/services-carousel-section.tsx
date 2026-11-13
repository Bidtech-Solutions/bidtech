"use client";

import { useState, useRef, useEffect, useCallback, type CSSProperties, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SplitText, Magnet, SpotlightCard } from "@/components/react-bits";
import { SOLUTIONS_DATA, type SolutionItem } from "@/lib/data/solutions-carousel";
import { useLanguage } from "@/lib/i18n";

const N = SOLUTIONS_DATA.length; // 4
const SET_COUNT = 9; // 9 set kartu (36 item) sebagai buffer infinite loop luas dari segala arah
const CENTER_SET = 4; // Set tengah (indeks 16..19)
const START_INDEX = CENTER_SET * N; // 16: Mulai di set tengah
const TRANSITION_DURATION = 400; // ms

const EXTENDED_ITEMS: (SolutionItem & { uniqueKey: string; itemIndex: number })[] = Array.from(
  { length: SET_COUNT },
  (_, set) =>
    SOLUTIONS_DATA.map((item, i) => ({
      ...item,
      uniqueKey: `set${set}-${item.id}-${i}`,
      itemIndex: i,
    }))
).flat();

export function ServicesCarouselSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [, setActiveCardId] = useState<string>("erp");

  const isMoving = useRef(false);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  // Bersihkan semua timer saat unmount
  useEffect(() => {
    return () => {
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  // Hitung indeks solusi aktif dalam siklus berulang (0 .. N-1)
  const realIndex = ((currentIndex % N) + N) % N;

  // Sinkronisasi activeCardId dengan kartu tengah
  useEffect(() => {
    if (SOLUTIONS_DATA[realIndex]) {
      setActiveCardId(SOLUTIONS_DATA[realIndex].id);
    }
  }, [realIndex]);

  // Normalisasi posisi: jika currentIndex keluar dari batas aman Set 4 (16..19),
  // lakukan teleportasi diam-diam (transition: none) kembali ke indeks ekuivalen di Set 4.
  const checkAndNormalizePosition = useCallback((targetIndex: number) => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }

    const minCenterIndex = CENTER_SET * N; // 16
    const maxCenterIndex = (CENTER_SET + 1) * N - 1; // 19

    if (targetIndex < minCenterIndex || targetIndex > maxCenterIndex) {
      const normalized = ((targetIndex % N) + N) % N + minCenterIndex;
      // Matikan transisi untuk reset instan tanpa lonjakan visual
      setIsTransitioning(false);
      setCurrentIndex(normalized);

      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setIsTransitioning(true);
        isMoving.current = false;
      }, 40);
    } else {
      isMoving.current = false;
    }
  }, []);

  const stepSlide = useCallback(
    (diff: number) => {
      if (isMoving.current || diff === 0) return;
      isMoving.current = true;
      setIsTransitioning(true);

      setCurrentIndex((prev) => {
        const nextIdx = prev + diff;
        if (safetyTimer.current) clearTimeout(safetyTimer.current);
        safetyTimer.current = setTimeout(() => {
          checkAndNormalizePosition(nextIdx);
        }, TRANSITION_DURATION + 100);
        return nextIdx;
      });
    },
    [checkAndNormalizePosition]
  );

  const nextSlide = useCallback(() => stepSlide(1), [stepSlide]);
  const prevSlide = useCallback(() => stepSlide(-1), [stepSlide]);

  const goToSlide = useCallback(
    (targetRealIndex: number) => {
      if (isMoving.current) return;
      const currentReal = ((currentIndex % N) + N) % N;
      let diff = targetRealIndex - currentReal;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      if (diff === 0) return;

      stepSlide(diff);
    },
    [currentIndex, stepSlide]
  );

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // KRUSIAL: Hanya tangani event yang berasal langsung dari kontainer slider itu sendiri
    // dan khusus properti transform, abaikan event dari kartu anak (hover, border, button scale dsb).
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "transform") return;

    checkAndNormalizePosition(currentIndex);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.targetTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchEnd.current = null;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.targetTouches[0];
    touchEnd.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = () => {
    const start = touchStart.current;
    const end = touchEnd.current;
    touchStart.current = null;
    touchEnd.current = null;
    if (!start || !end) return;

    const dx = start.x - end.x;
    const dy = start.y - end.y;
    // Hanya hitung sebagai swipe bila gerakan dominan horizontal,
    // agar scroll halaman ke bawah yang sedikit miring tidak mengganti slide.
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx > 0) nextSlide();
    else prevSlide();
  };

  return (
    <section
      id="services"
      className="landing-panel cv-auto relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient background wavy lines matching design screenshot */}
      <svg
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <defs>
          <linearGradient id="servicesWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#45a02e" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#5fc94a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.30" />
          </linearGradient>
          <linearGradient id="servicesWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#3ea023" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#65d44f" stopOpacity="0.60" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="servicesWaveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.30" />
            <stop offset="40%" stopColor="#45a02e" stopOpacity="0.60" />
            <stop offset="75%" stopColor="#5fc94a" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Top Dashed Wave (Melengkung di belakang judul) */}
        <path
          d="M -40 75 C 220 85, 440 45, 720 115 C 1000 185, 1260 75, 1480 95"
          stroke="url(#servicesWaveGrad1)"
          strokeWidth="1.15"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />

        {/* Top Solid Wave */}
        <path
          d="M -40 135 C 240 145, 460 105, 740 175 C 1020 245, 1280 135, 1480 155"
          stroke="url(#servicesWaveGrad2)"
          strokeWidth="1.0"
          strokeLinecap="round"
        />

        {/* Bottom Dashed Wave (Melengkung di bawah kartu) */}
        <path
          d="M -40 515 C 240 505, 520 555, 800 495 C 1080 435, 1300 515, 1480 485"
          stroke="url(#servicesWaveGrad3)"
          strokeWidth="1.1"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </svg>

      {/* 1. SECTION HEADER (Centered Title & Subtitle in max-w-7xl) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-8 lg:mb-10">
        <SplitText
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

      {/* 2. FULL-BLEED INFINITE CAROUSEL (Hingga 5+ item di desktop lebar, ukuran kartu konsisten & proporsional) */}
      <div
        className="relative z-10 w-full overflow-hidden [--card-w:300px] sm:[--card-w:330px] md:[--card-w:350px] lg:[--card-w:365px] xl:[--card-w:380px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Blur & Hard Fade Overlay (sesuai layer Figma: 'Left & Right Blur Overlay Gradients: mask-group') */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-40 md:w-56 lg:w-72 xl:w-80 backdrop-blur-md"
          style={{
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)",
            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-40 md:w-56 lg:w-72 xl:w-80 bg-gradient-to-r from-white via-white/85 to-transparent" />

        {/* Right Blur & Hard Fade Overlay (sesuai layer Figma: 'Left & Right Blur Overlay Gradients: mask-group') */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-40 md:w-56 lg:w-72 xl:w-80 backdrop-blur-md"
          style={{
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)",
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-40 md:w-56 lg:w-72 xl:w-80 bg-gradient-to-l from-white via-white/85 to-transparent" />

        {/* SLIDER VIEWPORT (Kartu Tengah Selalu Tepat di Center Sumbu Layar, Kiri-Kanan Mengalir Mulus Tanpa Batas) */}
        <div className="w-full py-4 sm:py-6">
          <div
            className="flex will-change-transform items-center relative left-1/2"
            style={
              {
                transform: `translateX(calc(-1 * (${currentIndex} + 0.5) * var(--card-w)))`,
                transition: isTransitioning
                  ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)`
                  : "none",
              } as CSSProperties
            }
            onTransitionEnd={handleTransitionEnd}
          >
            {EXTENDED_ITEMS.map((item, index) => {
              // Kartu di tengah adalah kartu pada indeks tepat currentIndex
              const isCenterCard = index === currentIndex;

              const cardStateClass = isCenterCard
                ? "scale-100 z-20 border-2 border-[#45a02e] shadow-[0_12px_36px_rgba(69,160,46,0.18)] opacity-100"
                : "scale-[0.93] z-10 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] opacity-70 hover:opacity-95 hover:scale-[0.96] transition-all duration-300";

              return (
                <div
                  key={item.uniqueKey}
                  style={{ width: "var(--card-w)" }}
                  className="shrink-0 px-2.5 sm:px-3 lg:px-3.5 py-2 transition-transform duration-500 ease-out"
                  onClick={() => {
                    if (index === currentIndex) return;
                    stepSlide(index - currentIndex);
                  }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(69, 160, 46, 0.10)"
                    className={`group relative flex flex-col justify-between h-full min-h-[440px] sm:min-h-[460px] lg:min-h-[470px] rounded-[24px] sm:rounded-[28px] bg-white p-6 sm:p-7 lg:p-8 transition-all duration-300 ease-out cursor-pointer ${cardStateClass}`}
                  >
                    {/* Top: Ilustrasi bersih di atas latar putih murni */}
                    <div className="relative flex items-center justify-center h-40 sm:h-44 mb-3 overflow-visible">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        width={240}
                        height={180}
                        className="relative h-36 sm:h-40 w-auto max-w-[85%] object-contain drop-shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 select-none"
                      />
                    </div>

                    {/* Middle: Judul & Deskripsi */}
                    <div className="flex-1 text-left flex flex-col justify-start">
                      <h3
                        className={`font-[family-name:var(--font-plus-jakarta),sans-serif] text-lg sm:text-[20px] font-bold tracking-tight mb-2 transition-colors duration-300 ${
                          isCenterCard ? "text-[#45a02e]" : "text-slate-900 group-hover:text-[#45a02e]"
                        }`}
                      >
                        {isEn ? item.titleEn : item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-4">
                        {isEn ? item.descriptionEn : item.description}
                      </p>
                    </div>

                    {/* Bottom: Action CTA Button */}
                    <div className="mt-5 pt-1 w-full">
                      <Magnet padding={16} magnetStrength={3} className="w-full">
                        <Link
                          href={`/solusi#${item.slug}`}
                          className={`inline-flex items-center justify-center gap-2 w-full min-h-10 rounded-full py-2.5 px-5 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                            isCenterCard
                              ? "border-2 border-[#45a02e] text-[#45a02e] bg-white hover:bg-[#45a02e] hover:text-white"
                              : "bg-[#45a02e] hover:bg-[#388e22] text-white shadow-[0_4px_16px_rgba(69,160,46,0.25)]"
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
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex items-center justify-center gap-4">
        {/* Arrow Left */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Sebelumnya"
          className="flex items-center justify-center size-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition active:scale-90 cursor-pointer shadow-xs"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Dots Indicator (Siklus 4 Solusi) */}
        <div className="flex items-center gap-1.5">
          {SOLUTIONS_DATA.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              aria-current={realIndex === idx ? "true" : undefined}
              className="group/dot flex h-6 min-w-5 items-center justify-center cursor-pointer"
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  realIndex === idx
                    ? "w-6 h-2 bg-[#45a02e]"
                    : "w-2 h-2 bg-slate-200 group-hover/dot:bg-slate-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Arrow Right */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Berikutnya"
          className="flex items-center justify-center size-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition active:scale-90 cursor-pointer shadow-xs"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
