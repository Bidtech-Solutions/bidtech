"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PromoSlide {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  btnText: string;
  btnLink: string;
  image: string;
  badgeTop: string;
  badgeMain: string;
  badgeBottom: string;
  gradient: string;
  borderColor: string;
  badgeColor: string;
  badgeShadow: string;
}

export default function Promo() {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const visualContentRef = useRef<HTMLDivElement>(null);

  const promoSlides: PromoSlide[] = [
    {
      id: "promo-1",
      eyebrow: language === "en" ? "SPECIAL PROMO THIS MONTH" : "PROMO SPESIAL BULAN INI",
      title: language === "en" ? "Discounts Up to 30%" : "Diskon Hingga 30%",
      desc: language === "en" ? "Get special prices on selected smartphone flagships." : "Dapatkan harga spesial untuk berbagai smartphone pilihan.",
      btnText: language === "en" ? "View Promo" : "Lihat Promo",
      btnLink: "/produk",
      image: "/images/promo.webp",
      badgeTop: "UP TO",
      badgeMain: "30%",
      badgeBottom: "OFF",
      gradient: "linear-gradient(135deg, #FCF8F2 0%, #F8EFE0 50%, #F3E5CF 100%)",
      borderColor: "border-[#EBD6B6]",
      badgeColor: "text-[#DFB062]",
      badgeShadow: "rgba(217,164,65,0.38)",
    },
    {
      id: "promo-2",
      eyebrow: "FLASH SALE CASHBACK",
      title: language === "en" ? "Extra Cashback Up to Rp 1 Million" : "Extra Cashback Rp 1 Juta",
      desc: language === "en" ? "Buy selected Samsung & iPhone flagships this month and enjoy direct cashback up to Rp 1,000,000." : "Beli flagship Samsung & iPhone pilihan bulan ini dan nikmati potongan langsung hingga Rp 1.000.000.",
      btnText: language === "en" ? "Claim Cashback" : "Klaim Cashback",
      btnLink: `https://wa.me/6281234567890?text=${encodeURIComponent(
        language === "en" ? "Hello KONTERKU, I am interested in the 1 million cashback promo" : "Halo KONTERKU, saya tertarik dengan promo cashback 1 juta"
      )}`,
      image: "/images/promo-samsung.webp",
      badgeTop: "EXTRA",
      badgeMain: "1 JT",
      badgeBottom: "CASHBACK",
      gradient: "linear-gradient(135deg, #F0F4FC 0%, #E6EEFA 50%, #D8E5F7 100%)",
      borderColor: "border-[#C8DAF2]",
      badgeColor: "text-[#628FDF]",
      badgeShadow: "rgba(98,143,223,0.38)",
    },
    {
      id: "promo-3",
      eyebrow: language === "en" ? "SPECIAL BUNDLE PACKAGE" : "PAKET BUNDLING SPESIAL",
      title: "Free TWS & Fast Charger",
      desc: language === "en" ? "With every eligible smartphone purchase, get free Wireless Earbuds & Original Adapter worth Rp 850,000." : "Setiap pembelian smartphone tertentu, gratis Wireless Earbuds & Original Adapter senilai Rp 850.000.",
      btnText: language === "en" ? "Claim Bundle" : "Klaim Bundling",
      btnLink: `https://wa.me/6281234567890?text=${encodeURIComponent(
        language === "en" ? "Hello KONTERKU, I would like to claim the TWS & Fast Charger bundle" : "Halo KONTERKU, saya ingin klaim paket bundling TWS dan Charger"
      )}`,
      image: "/images/promo-bundling.webp",
      badgeTop: "BONUS",
      badgeMain: "850K",
      badgeBottom: language === "en" ? "FREE" : "GRATIS",
      gradient: "linear-gradient(135deg, #F2FAF5 0%, #E5F5EB 50%, #D2EEDE 100%)",
      borderColor: "border-[#BEE5D0]",
      badgeColor: "text-[#52B788]",
      badgeShadow: "rgba(82,183,136,0.38)",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  };

  // Auto slide interval
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide]);

  // Rich GSAP slide change animation
  useEffect(() => {
    if (!slideContainerRef.current) return;

    // Timeline for coordinated slide entrance
    const tl = gsap.timeline();

    tl.fromTo(
      slideContainerRef.current,
      { opacity: 0.8, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
    );

    if (textContentRef.current) {
      tl.fromTo(
        textContentRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (visualContentRef.current) {
      tl.fromTo(
        visualContentRef.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.2)" },
        "-=0.35"
      );
    }
  }, [currentSlide]);

  const slide = promoSlides[currentSlide];

  return (
    <section ref={sectionRef} id="promo" className="pt-4 pb-20 sm:pt-6 sm:pb-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Wrapper */}
        <div 
          className="relative group/banner"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Main Slide Banner with Consistent Size on Mobile & Desktop */}
          <div
            ref={slideContainerRef}
            className={`relative rounded-[24px] sm:rounded-[28px] border ${slide.borderColor} overflow-hidden p-6 sm:p-10 lg:p-14 shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-colors duration-700 min-h-[520px] sm:min-h-[460px] flex items-center`}
            style={{
              background: slide.gradient,
            }}
          >
            {/* Decorative Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
              <div className="absolute top-10 left-[20%] w-3 h-3 bg-current rounded-sm rotate-12 opacity-60 text-ink-900" />
              <div className="absolute bottom-10 left-[35%] w-2.5 h-2.5 bg-current rounded-full opacity-60 text-ink-900" />
              <div className="absolute top-[25%] left-[48%] w-4 h-4 bg-current rounded-sm rotate-45 opacity-40 text-ink-900" />
              <div className="absolute top-8 right-[32%] w-3 h-3 bg-current rounded-sm rotate-12 opacity-60 text-ink-900" />
              <div className="absolute bottom-8 right-[22%] w-3.5 h-3.5 bg-current rounded-sm -rotate-12 opacity-50 text-ink-900" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10 w-full">
              
              {/* Left Content: Text & CTA with Stagger Animation */}
              <div 
                ref={textContentRef}
                className="lg:col-span-6 space-y-3 sm:space-y-4 text-left flex flex-col justify-center"
              >
                <span className="text-xs sm:text-[13px] font-bold text-gold-600 uppercase tracking-[0.1em] block">
                  {slide.eyebrow}
                </span>
                
                <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-extrabold text-ink-900 leading-[1.15] tracking-[-0.03em]">
                  {slide.title}
                </h2>
                
                <p className="text-txt-600 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed">
                  {slide.desc}
                </p>

                <div className="pt-2 sm:pt-3">
                  <Link
                    href={slide.btnLink}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold text-ink-900 shadow-sm border border-[#EAC27D]/40 hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all duration-200"
                  >
                    {slide.btnText} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Content: Promo Visual Asset + Floating Starburst Badge */}
              <div 
                ref={visualContentRef}
                className="lg:col-span-6 relative flex items-center justify-center lg:justify-end mt-2 lg:mt-0"
              >
                <div className="relative flex items-center justify-center w-full max-w-[480px]">
                  
                  {/* Promo Phone Visual Asset */}
                  <div className="w-full h-[190px] sm:h-[260px] lg:h-[320px] flex items-center justify-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full max-h-[185px] sm:max-h-[250px] lg:max-h-[310px] object-contain select-none mx-auto"
                    />
                  </div>

                  {/* Floating Starburst Badge */}
                  <div className="absolute -bottom-2 right-2 sm:bottom-0 sm:right-2 z-20 animate-pulse-slow">
                    <div className="relative w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center flex-shrink-0">
                      <svg 
                        viewBox="0 0 100 100" 
                        className={`absolute inset-0 w-full h-full ${slide.badgeColor}`}
                        style={{ filter: `drop-shadow(0 10px 24px ${slide.badgeShadow})` }}
                      >
                        <path
                          d="M50 3 C54 10 59 11 66 10 C73 9 76 15 82 18 C88 21 90 27 94 33 C98 39 96 45 98 50 C96 55 98 61 94 67 C90 73 88 79 82 82 C76 85 73 91 66 90 C59 89 54 90 50 97 C46 90 41 89 34 90 C27 91 24 85 18 82 C12 79 10 73 6 67 C2 61 4 55 2 50 C4 45 2 39 6 33 C10 27 12 21 18 18 C24 15 27 9 34 10 C41 11 46 10 50 3 Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="relative z-10 flex flex-col items-center justify-center text-center leading-none select-none text-ink-900">
                        <span className="text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-widest">
                          {slide.badgeTop}
                        </span>
                        <span className="text-xl sm:text-2xl font-black my-0.5 sm:my-1 tracking-tight">
                          {slide.badgeMain}
                        </span>
                        <span className="text-[8.5px] sm:text-[10px] font-extrabold uppercase tracking-widest">
                          {slide.badgeBottom}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Unified Clean Navigation Controls: Spaced Prev/Next Buttons & Centered Circular Dots */}
          <div className="flex items-center justify-between w-full max-w-xs sm:max-w-sm mx-auto mt-6 px-4">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-border/80 text-ink-900 shadow-sm flex items-center justify-center active:scale-90 hover:scale-105 hover:bg-surface-soft transition-all cursor-pointer"
              aria-label="Slide Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Circular Indicator Dots */}
            <div className="flex items-center gap-2.5">
              {promoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === index
                      ? "w-2.5 h-2.5 bg-[#D49E3C] scale-110 shadow-xs"
                      : "w-2.5 h-2.5 bg-[#D9D9D6] hover:bg-[#C8C8C4]"
                  }`}
                  aria-label={`Ke Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-border/80 text-ink-900 shadow-sm flex items-center justify-center active:scale-90 hover:scale-105 hover:bg-surface-soft transition-all cursor-pointer"
              aria-label="Slide Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
