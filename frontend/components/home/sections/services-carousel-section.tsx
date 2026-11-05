"use client";

import { useState, useRef, useEffect, useCallback, type TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SOLUTIONS_DATA, type SolutionItem } from "@/lib/data/solutions-carousel";

const N = SOLUTIONS_DATA.length; // 5

// 5 set kartu (25 item) untuk buffer infinite loop seamless
const EXTENDED_ITEMS: (SolutionItem & { uniqueKey: string; itemIndex: number })[] = [
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set0-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set1-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set2-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set3-${item.id}-${i}`, itemIndex: i })),
  ...SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set4-${item.id}-${i}`, itemIndex: i })),
];

const START_INDEX = N * 2; // Mulai di index 10 (set tengah)

export function ServicesCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string>("erp");
  // Kartu utuh tanpa terpotong: 3 di desktop, 2 di tablet, 1 di mobile
  const [cardsPerView, setCardsPerView] = useState(3);

  const isMoving = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Deteksi jumlah kartu utuh per view (tanpa terpotong)
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
      className="landing-panel relative overflow-hidden bg-gradient-to-b from-[#84cc16]/[0.08] via-white to-transparent py-14 sm:py-20 lg:py-24"
    >
      {/* BACKGROUND WAVE CANVAS: Soft Green Dashed Waves & Continuous Ambient Stream */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
          className="hidden sm:block absolute inset-0 h-full w-full"
        >
          <path
            d="M -40 180 C 320 230, 640 140, 1020 180 C 1220 200, 1360 170, 1500 160"
            stroke="#84cc16"
            strokeOpacity="0.25"
            strokeWidth="1.8"
            strokeDasharray="6 8"
          />
          <path
            d="M -40 240 C 340 300, 680 200, 1040 230 C 1240 250, 1380 220, 1500 210"
            stroke="#45a02e"
            strokeOpacity="0.2"
            strokeWidth="1.6"
          />
          <path
            d="M -40 380 C 380 430, 720 340, 1080 370 C 1260 390, 1400 360, 1500 350"
            stroke="#84cc16"
            strokeOpacity="0.2"
            strokeWidth="1.8"
            strokeDasharray="7 9"
          />
          <path
            d="M -40 450 C 360 510, 700 420, 1060 450 C 1240 470, 1380 440, 1500 430"
            stroke="#45a02e"
            strokeOpacity="0.18"
            strokeWidth="1.6"
          />
        </svg>

        {/* Ambient Connected Glow Stream: S-Curve Flow */}
        {/* Top-Left: Menyambung langsung dari Hill bawah Hero */}
        <div className="absolute -left-12 -top-12 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.15)_0%,transparent_70%)] filter blur-3xl" />
        {/* Middle-Right: Mengalir ke sisi kanan kartu */}
        <div className="absolute -right-16 top-1/3 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(69,160,46,0.12)_0%,transparent_70%)] filter blur-3xl" />
        {/* Bottom Transition: Mengalir ke Template Preview Section di bawahnya */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#45a02e]/[0.08]" />
        <div className="absolute left-1/3 -bottom-16 w-[560px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(95,201,74,0.11)_0%,transparent_70%)] filter blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto flex flex-col justify-center">
        {/* 1. SECTION HEADER (Centered Title & Subtitle - Compact & Balanced) */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8">
          <Reveal y={12}>
            <h2 className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Apa yang Ingin <span className="text-[#45a02e]">Anda Bangun</span> Hari Ini?
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-xl mx-auto">
              Kami memberikan solusi teknologi komprehensif yang dirancang untuk mempercepat pertumbuhan bisnis digital Anda.
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
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 items-center justify-center size-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Floating Right Chevron (Desktop) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Layanan berikutnya"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 items-center justify-center size-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* SLIDER VIEWPORT (py-4 px-1 memberikan ruang vertikal agar efek zoom & shadow tidak terpotong) */}
          <div className="overflow-hidden py-4 px-1">
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
                    className="shrink-0 px-2.5 sm:px-3 transition-transform duration-500 ease-out"
                    onClick={() => {
                      goToSlide(item.itemIndex);
                      setActiveCardId(item.id);
                    }}
                  >
                    <div
                      className={`group relative flex flex-col justify-between h-full min-h-[390px] sm:min-h-[410px] lg:min-h-[430px] rounded-[22px] sm:rounded-[24px] bg-white p-5 sm:p-6 lg:p-7 transition-all duration-500 ease-out origin-center cursor-pointer ${
                        isLeftCard
                          ? "scale-[1.02] lg:scale-[1.04] z-10 border-2 border-[#52c41a] ring-4 ring-[#52c41a]/10 shadow-[0_20px_48px_rgba(82,196,26,0.18)]"
                          : "scale-[0.97] sm:scale-[0.98] border border-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-lg hover:scale-[0.99]"
                      }`}
                    >
                      {/* Top: Real Image Asset from public/images/assets/ */}
                      <div className="relative flex items-center justify-center h-36 sm:h-40 lg:h-44 w-full mb-3 overflow-hidden rounded-xl">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          width={220}
                          height={165}
                          priority={index >= 10 && index <= 12}
                          className="h-full w-auto max-h-[155px] object-contain transition-transform duration-300 group-hover:scale-105 select-none"
                        />
                      </div>

                      {/* Middle: Content */}
                      <div className="flex-1 text-left">
                        <h3 className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom: Action CTA Button (Outline untuk kartu kiri yang zoom, Solid untuk kartu lainnya) */}
                      <div className="mt-5 pt-1">
                        <Link
                          href={`/solusi#${item.slug}`}
                          className={`inline-flex items-center justify-center gap-2 w-full rounded-full py-2.5 sm:py-3 px-5 text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 ${
                            isLeftCard
                              ? "border-2 border-[#52c41a] text-[#45a02e] hover:bg-[#52c41a] hover:text-white"
                              : "bg-[#52c41a] hover:bg-[#43a613] text-white shadow-[0_4px_14px_rgba(82,196,26,0.28)]"
                          }`}
                        >
                          <span>Lihat Layanan</span>
                          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. BOTTOM PAGINATION CONTROLS (← • • • →) */}
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

          {/* Dots Indicator (Siklus 5 Solusi) */}
          <div className="flex items-center gap-2">
            {SOLUTIONS_DATA.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  realIndex === idx
                    ? "w-6 h-2 bg-[#52c41a]"
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
