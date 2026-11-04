"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const baseTestimonials = [
  {
    id: 1,
    rating: 5,
    name: "Rizky Pratama",
    avatar: "/images/avatars/rizky.webp",
  },
  {
    id: 2,
    rating: 5,
    name: "Dewi Sartika",
    avatar: "/images/avatars/dewi.webp",
  },
  {
    id: 3,
    rating: 5,
    name: "Fajar Nugroho",
    avatar: "/images/avatars/fajar.webp",
  },
  {
    id: 4,
    rating: 5,
    name: "Budi Santoso",
    avatar: "/images/avatars/rizky.webp",
  },
  {
    id: 5,
    rating: 5,
    name: "Siti Rahma",
    avatar: "/images/avatars/dewi.webp",
  },
];

export default function Testimonial() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const testimonials = baseTestimonials.map((item, idx) => ({
    ...item,
    text: t.testimonial.quotes[idx]?.text || "",
    role: t.testimonial.role,
  }));

  const maxDesktopIndex = Math.max(0, testimonials.length - 3);

  const nextSlide = () => {
    // Desktop
    setCurrentIndex((prev) => (prev + 1) % (maxDesktopIndex + 1));
  };

  const prevSlide = () => {
    // Desktop
    setCurrentIndex((prev) => (prev - 1 + (maxDesktopIndex + 1)) % (maxDesktopIndex + 1));
  };

  const scrollMobile = (direction: "next" | "prev") => {
    if (!mobileTrackRef.current) return;
    const card = mobileTrackRef.current.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const newIdx = direction === "next" 
      ? Math.min(testimonials.length - 1, mobileIndex + 1)
      : Math.max(0, mobileIndex - 1);

    setMobileIndex(newIdx);
    gsap.to(mobileTrackRef.current, {
      scrollLeft: newIdx * cardWidth,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const card = mobileTrackRef.current.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16;
    const scrollLeft = mobileTrackRef.current.scrollLeft;
    const idx = Math.round(scrollLeft / cardWidth);
    if (idx !== mobileIndex && idx >= 0 && idx < testimonials.length) {
      setMobileIndex(idx);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current && !mobileTrackRef.current) return;
      
      const cards = trackRef.current ? trackRef.current.children : [];
      
      // Initial entrance animation on scroll
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate desktop slide change smoothly with GSAP
  useEffect(() => {
    if (!trackRef.current) return;
    gsap.fromTo(
      trackRef.current.children,
      { opacity: 0.75, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
    );
  }, [currentIndex]);

  const visibleCards = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section ref={sectionRef} id="testimoni" className="py-20 sm:py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs sm:text-[13px] font-bold text-gold-500 tracking-[0.08em] mb-2 inline-block">
            {t.testimonial.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-ink-900 tracking-[-0.03em] leading-tight">
            {t.testimonial.title}
          </h2>
        </div>

        {/* Desktop Carousel View */}
        <div className="hidden md:flex relative items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full bg-white border border-border/90 text-ink-900 shadow-sm flex items-center justify-center hover:bg-surface-soft hover:scale-110 active:scale-95 transition-all mr-6 flex-shrink-0 z-10"
            aria-label={t.testimonial.ariaPrev}
          >
            <ChevronLeft className="w-5 h-5 text-ink-800" />
          </button>

          {/* 3 Testimonial Cards Grid with GSAP Track */}
          <div 
            ref={trackRef}
            className="grid grid-cols-3 gap-6 flex-grow max-w-5xl"
          >
            {visibleCards.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-[22px] border border-border/80 p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-soft-hover hover:border-gold-300/80 hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
              >
                {/* 5 Gold Stars */}
                <div>
                  <div className="flex items-center space-x-1 mb-4 text-[#F5A623]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-txt-700 text-[14.5px] leading-relaxed mb-6 font-normal">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                {/* Customer Meta */}
                <div className="flex items-center gap-3 pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-border/60 select-none flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-ink-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-txt-400 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full bg-white border border-border/90 text-ink-900 shadow-sm flex items-center justify-center hover:bg-surface-soft hover:scale-110 active:scale-95 transition-all ml-6 flex-shrink-0 z-10"
            aria-label={t.testimonial.ariaNext}
          >
            <ChevronRight className="w-5 h-5 text-ink-800" />
          </button>
        </div>

        {/* Desktop Indicator Dots */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-8">
          {[...Array(maxDesktopIndex + 1)].map((_, dot) => (
            <button
              key={dot}
              onClick={() => setCurrentIndex(dot)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === dot
                  ? "w-2.5 h-2.5 bg-gold-500 scale-110"
                  : "w-2 h-2 bg-[#D9D9D6] hover:bg-gold-300"
              }`}
              aria-label={`Ke Grup Testimoni ${dot + 1}`}
            />
          ))}
        </div>

        {/* Mobile Horizontal Scroll Slider View with GSAP */}
        <div className="md:hidden">
          <div 
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth gap-4 pb-4 -mx-4 px-4"
          >
            {testimonials.map((item) => (
              <div 
                key={item.id}
                className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center bg-white rounded-[22px] border border-border/80 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-3 text-[#F5A623]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-txt-700 text-sm leading-relaxed mb-5 font-normal">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover border border-border/60 select-none flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-ink-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-txt-400 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Controls & Dots */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={() => scrollMobile("prev")}
              disabled={mobileIndex === 0}
              className="w-9 h-9 rounded-full bg-white border border-border/80 text-ink-900 shadow-xs flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              aria-label={t.testimonial.ariaPrev}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {testimonials.map((_, dot) => (
                <button
                  key={dot}
                  onClick={() => {
                    setMobileIndex(dot);
                    if (mobileTrackRef.current) {
                      const card = mobileTrackRef.current.children[0] as HTMLElement;
                      if (card) {
                        const cardWidth = card.offsetWidth + 16;
                        gsap.to(mobileTrackRef.current, {
                          scrollLeft: dot * cardWidth,
                          duration: 0.45,
                          ease: "power2.out",
                        });
                      }
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    mobileIndex === dot
                      ? "w-6 h-2 bg-gold-500"
                      : "w-2 h-2 bg-txt-300"
                  }`}
                  aria-label={`${t.testimonial.role} ${dot + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollMobile("next")}
              disabled={mobileIndex === testimonials.length - 1}
              className="w-9 h-9 rounded-full bg-white border border-border/80 text-ink-900 shadow-xs flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              aria-label={t.testimonial.ariaNext}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
