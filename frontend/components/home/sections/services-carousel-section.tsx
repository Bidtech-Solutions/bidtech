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

// 3 set kartu (12 item) sebagai buffer infinite loop. Posisi selalu dijaga di set tengah,
// cukup untuk menampilkan hingga 3 kartu sekaligus tanpa celah (DOM lebih ringan dari 5 set).
const EXTENDED_ITEMS: (SolutionItem & { uniqueKey: string; itemIndex: number })[] = [0, 1, 2].flatMap((set) =>
  SOLUTIONS_DATA.map((item, i) => ({ ...item, uniqueKey: `set${set}-${item.id}-${i}`, itemIndex: i })),
);

const START_INDEX = N; // Mulai di set tengah

export function ServicesCarouselSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const [currentIndex, setCurrentIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [, setActiveCardId] = useState<string>("erp");
  // Kartu utuh: 3 di desktop lebar, 2 di tablet, 1 di mobile
  const [cardsPerView, setCardsPerView] = useState(3);

  const isMoving = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

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

  // Mobile (1 kartu per view): kartu tidak berubah warna saat digeser,
  // hanya kartu yang disentuh yang disorot hijau.
  const isMobile = cardsPerView === 1;
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  // Sorotan sentuhan dilepas saat carousel digeser ke kartu lain
  useEffect(() => {
    setTappedIndex(null);
  }, [realIndex]);

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
    if (currentIndex >= N * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - N);
    } else if (currentIndex < N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + N);
    }
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
      className="landing-panel cv-auto relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white py-16 sm:py-20 lg:py-24"
    >
      {/* Ambient background glow mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(69,160,46,0.08),transparent_75%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-auto flex flex-col justify-center">
        {/* 1. SECTION HEADER (Centered Title & Subtitle) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10">
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
            {/* Lebar kartu & geseran ditentukan CSS per breakpoint (1 / 2 / 3 kartu),
                jadi tampilan sudah benar sejak HTML pertama, sebelum JavaScript jalan. */}
            <div
              className="flex will-change-transform items-center [transform:translateX(calc(var(--slide)*-100%))] sm:[transform:translateX(calc(var(--slide)*-50%))] lg:[transform:translateX(calc(var(--slide)*-100%/3))]"
              style={
                {
                  "--slide": currentIndex,
                  transition: isTransitioning
                    ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                } as CSSProperties
              }
              onTransitionEnd={handleTransitionEnd}
            >
              {EXTENDED_ITEMS.map((item, index) => {
                // Kartu paling kiri adalah kartu pada index tepat currentIndex
                const isLeftCard = index === currentIndex;
                // Desktop/tablet: kartu paling kiri disorot. Mobile: hanya kartu yang disentuh.
                const isHighlighted = isMobile ? tappedIndex === item.itemIndex : isLeftCard;

                const cardStateClass = isMobile
                  ? isHighlighted
                    ? "z-10 border-2 border-[#45a02e]"
                    : "border-2 border-slate-200/90"
                  : isHighlighted
                    ? "scale-[1.02] lg:scale-[1.03] z-10 border-2 border-[#45a02e]"
                    : "scale-[0.98] border border-slate-200/90 hover:border-[#45a02e] hover:scale-[0.99]";

                return (
                  <div
                    key={item.uniqueKey}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2.5 sm:px-3.5 py-2 transition-transform duration-500 ease-out"
                    onClick={() => {
                      if (isMobile) {
                        setTappedIndex(item.itemIndex);
                        return;
                      }
                      goToSlide(item.itemIndex);
                      setActiveCardId(item.id);
                    }}
                  >
                    <SpotlightCard
                      spotlightColor="rgba(69, 160, 46, 0.12)"
                      className={`group relative flex flex-col justify-between h-full min-h-[390px] sm:min-h-[410px] lg:min-h-[430px] rounded-[22px] sm:rounded-[24px] bg-white p-5 sm:p-6 lg:p-7 transition-all duration-300 ease-out origin-center cursor-pointer ${cardStateClass}`}
                    >
                      {/* Top: Panel ilustrasi full-bleed (menempel ke tepi kartu) dengan latar hijau lembut,
                          pola titik halus, dan lingkaran glow agar area atas kartu terlihat penuh.
                          Margin negatif = padding kartu (p-5 / sm:p-6 / lg:p-7). */}
                      <div className="relative -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 lg:-mx-7 lg:-mt-7 mb-5 flex h-44 sm:h-48 lg:h-52 items-center justify-center overflow-hidden border-b border-emerald-100/70 bg-gradient-to-br from-[#eef8ec] via-[#f6fbf4] to-[#e6f5e1]">
                        {/* Pola titik halus */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(69,160,46,0.16)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
                        />
                        {/* Lingkaran glow di belakang ilustrasi */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute left-1/2 top-1/2 size-36 sm:size-40 lg:size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_0_10px_rgba(255,255,255,0.35),0_12px_32px_rgba(69,160,46,0.12)] transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          width={220}
                          height={165}
                          className="relative h-[78%] w-auto max-w-[80%] object-contain drop-shadow-[0_8px_16px_rgba(15,23,42,0.08)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 select-none"
                        />
                      </div>

                      {/* Middle: Content (No badges, clean Title & Description) */}
                      <div className="flex-1 text-left flex flex-col justify-start">
                        <h3
                          className={`font-[family-name:var(--font-plus-jakarta),sans-serif] text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[#45a02e] ${
                            isMobile && isHighlighted ? "text-[#45a02e]" : "text-slate-900"
                          }`}
                        >
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
                            className={`inline-flex items-center justify-center gap-2 w-full min-h-11 sm:min-h-0 rounded-full py-3 px-5 text-sm font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                              isHighlighted
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
          <div className="flex items-center gap-0.5">
            {SOLUTIONS_DATA.map((item, idx) => (
              // Area sentuh 24x24px (standar aksesibilitas), titik di dalamnya tetap kecil
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                aria-current={realIndex === idx ? "true" : undefined}
                className="group/dot flex h-6 min-w-6 items-center justify-center cursor-pointer"
              >
                <span
                  className={`block transition-all duration-300 rounded-full ${
                    realIndex === idx
                      ? "w-6 h-2 bg-[#45a02e]"
                      : "w-2 h-2 bg-slate-300 group-hover/dot:bg-slate-400"
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
            className="flex items-center justify-center size-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition active:scale-90 cursor-pointer"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
