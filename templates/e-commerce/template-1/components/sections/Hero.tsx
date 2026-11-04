"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Award, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const OnePlusIcon = () => (
  <span className="inline-flex items-center gap-1 font-bold text-sm sm:text-base tracking-wider text-txt-500 hover:text-ink-900 transition-colors">
    <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded border border-current text-[10px] sm:text-[11px] font-black">
      1+
    </span>
    <span>ONEPLUS</span>
  </span>
);

const brandList = [
  { 
    name: "Apple", 
    image: "/images/apple.webp",
    heightClass: "h-6 sm:h-7"
  },
  { 
    name: "Samsung", 
    image: "/images/samsung.webp",
    heightClass: "h-4 sm:h-5"
  },
  { 
    name: "Vivo", 
    image: "/images/vivo.webp",
    heightClass: "h-4 sm:h-5"
  },
  { name: "xiaomi", textClass: "font-bold text-base sm:text-lg tracking-normal text-txt-500 hover:text-ink-900 transition-colors" },
  { name: "oppo", textClass: "font-bold text-base sm:text-lg tracking-wide text-txt-500 hover:text-ink-900 transition-colors" },
  { name: "realme", textClass: "font-bold text-base sm:text-lg tracking-tight lowercase text-txt-500 hover:text-ink-900 transition-colors" },
  { name: "OnePlus", icon: <OnePlusIcon /> },
  { name: "ASUS", textClass: "font-black text-base sm:text-lg tracking-widest text-txt-500 hover:text-ink-900 transition-colors" },
  { name: "Infinix", textClass: "font-bold text-base sm:text-lg tracking-normal text-txt-500 hover:text-ink-900 transition-colors" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const phoneVisualRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // 1. Entrance animation
      gsap.fromTo(
        textRef.current?.children as HTMLCollection,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );

      // 2. Scale-up zoom effect on landing.png ONLY when scrolling (no mouse parallax)
      gsap.to(phoneVisualRef.current, {
        scale: 1.18,
        transformOrigin: "bottom right",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 3. Infinite Marquee moving slowly and smoothly
      if (marqueeTrackRef.current) {
        gsap.to(marqueeTrackRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 38,
          repeat: -1,
        });
      }
    });

    mm.add("(max-width: 1023px)", () => {
      // Entrance animation
      gsap.fromTo(
        textRef.current?.children as HTMLCollection,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );

      // Scale-up on mobile
      if (phoneVisualRef.current) {
        gsap.to(phoneVisualRef.current, {
          scale: 1.12,
          transformOrigin: "bottom center",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Marquee moving slowly for mobile/tablet
      if (marqueeTrackRef.current) {
        gsap.to(marqueeTrackRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 35,
          repeat: -1,
        });
      }
    });

    return () => mm.revert();
  }, []);

  const marqueeItems = [...brandList, ...brandList, ...brandList, ...brandList];

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] pt-20 sm:pt-24 lg:pt-16 overflow-hidden bg-background flex flex-col justify-between"
    >
      {/* Top right corner radial glow positioned right at the top right corner */}
      <div 
        className="absolute top-0 right-0 w-[700px] lg:w-[1100px] h-[700px] lg:h-[1100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(220, 235, 255, 0.85) 0%, rgba(253, 247, 235, 0.5) 45%, transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center pt-6 lg:pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center lg:items-end">
          
          {/* Left Column: Text & Content */}
          <div ref={textRef} className="lg:col-span-5 z-20 space-y-6 sm:space-y-7 pb-6 lg:pb-16">
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-[-0.04em] text-ink-900 leading-[1.08] sm:leading-[1.05]">
              {t.hero.title1} <br />
              {t.hero.title2} <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D9A441] via-[#E8B45E] to-[#C58E2E]">
                {t.hero.title3}
                {/* Curved artistic golden line */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3 text-[#E8B45E]/80"
                  viewBox="0 0 250 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10C65 2.5 185 2.5 247 10"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-txt-600 max-w-lg leading-relaxed pt-1">
              {t.hero.description}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
              <Link 
                href="/produk"
                prefetch={true}
                scroll={true}
                className="inline-flex justify-center items-center rounded-2xl bg-gradient-to-r from-[#F4C87F] via-[#E8B45E] to-[#DC9F3C] px-7 py-3.5 text-sm sm:text-base font-bold text-ink-900 shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all duration-200"
              >
                {t.hero.viewProducts} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  language === "en"
                    ? "Hello KONTERKU, I would like to inquire about your smartphone products"
                    : "Halo KONTERKU, saya ingin bertanya tentang produk smartphone"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center rounded-2xl bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-ink-900 shadow-sm border border-border hover:bg-surface-soft hover:border-border-strong active:scale-[0.98] transition-all duration-200"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2">
                  <WhatsappIcon className="w-4 h-4 text-ink-900" />
                </div>
                {t.hero.chatWa}
              </a>
            </div>
            
            {/* 3 Trust Badges */}
            <div className="pt-6 border-t border-border/80 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6">
              {/* Badge 1: Garansi Resmi */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-300/50 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-ink-900 text-xs sm:text-[13px] leading-tight">{t.hero.badge1}</div>
                  <div className="text-txt-400 text-[11px] leading-tight mt-0.5">{t.hero.badge1Sub}</div>
                </div>
              </div>

              {/* Vertical separator */}
              <div className="h-7 w-px bg-border hidden sm:block" />

              {/* Badge 2: Produk Original */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-300/50 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-ink-900 text-xs sm:text-[13px] leading-tight">{t.hero.badge2}</div>
                  <div className="text-txt-400 text-[11px] leading-tight mt-0.5">{t.hero.badge2Sub}</div>
                </div>
              </div>

              {/* Vertical separator */}
              <div className="h-7 w-px bg-border hidden sm:block" />

              {/* Badge 3: Harga Terbaik */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-300/50 flex items-center justify-center text-gold-600 flex-shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-ink-900 text-xs sm:text-[13px] leading-tight">{t.hero.badge3}</div>
                  <div className="text-txt-400 text-[11px] leading-tight mt-0.5">{t.hero.badge3Sub}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (with parallax effect, flush to right edge) */}
          <div className="lg:col-span-7 relative flex items-end justify-center lg:justify-end z-10 lg:-mr-12 xl:-mr-20 2xl:-mr-28">
            
            {/* Decorative Spiral / Concentric Rings at the top right */}
            <svg 
              className="absolute -top-24 right-0 w-[600px] h-[600px] lg:w-[960px] lg:h-[960px] pointer-events-none opacity-30 text-border-strong -z-10" 
              viewBox="0 0 600 600" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="300" cy="300" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="300" cy="300" r="210" stroke="currentColor" strokeWidth="1" />
              <circle cx="300" cy="300" r="275" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="300" cy="300" r="330" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Subtle glow highlight in top right corner */}
            <div className="absolute top-0 right-0 w-[550px] lg:w-[800px] h-[550px] lg:h-[800px] bg-gradient-to-br from-blue-100/60 via-gold-100/35 to-amber-50/40 rounded-full blur-3xl -z-10" />

            {/* Main Phone visual - with scroll-only scale-up, anchored to bottom marquee */}
            <div 
              ref={phoneVisualRef}
              className="relative w-full max-w-[650px] sm:max-w-[780px] lg:max-w-[980px] xl:max-w-[1120px] 2xl:max-w-[1240px] flex items-end justify-center lg:justify-end -mb-24 sm:-mb-28 lg:-mb-32 xl:-mb-36"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/landing.webp"
                alt="Smartphone Flagship Collection"
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Marquee Strip at the Bottom of Hero (Scroll-driven motion with real brand logo assets) */}
      <div className="w-full py-5 border-t border-border/70 bg-[#FAFAF8]/70 backdrop-blur-[2px] overflow-hidden relative z-20">
        <div 
          className="w-full flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <div 
            ref={marqueeTrackRef}
            className="flex items-center space-x-12 sm:space-x-20 px-6 sm:px-12 w-max opacity-80 will-change-transform"
          >
            {marqueeItems.map((brand, idx) => (
              <div 
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center hover:opacity-100 transition-opacity cursor-default select-none flex-shrink-0"
              >
                {brand.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className={`${brand.heightClass} w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 mix-blend-multiply`}
                  />
                ) : brand.icon ? (
                  brand.icon
                ) : (
                  <span className={brand.textClass || "font-bold text-base sm:text-lg"}>
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
