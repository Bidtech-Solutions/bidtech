"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROPERTIES_DATA, type PropertyItem } from "@/lib/data";
import gsap from "gsap";

interface SignaturePropsProps {
  lang: "en" | "id";
  onOpenPropertyModal: (prop: PropertyItem) => void;
}

const SIGNATURE_PROPERTIES: PropertyItem[] = PROPERTIES_DATA;

export default function SignatureProps({ lang, onOpenPropertyModal }: SignaturePropsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragDeltaX = useRef<number>(0);

  const totalProps = SIGNATURE_PROPERTIES.length;

  // Snappy, lightweight slide translation with zero layout shift
  const slideTo = useCallback(
    (index: number) => {
      let target = index;
      if (target < 0) target = totalProps - 1;
      if (target >= totalProps) target = 0;

      setCurrentIndex(target);

      if (trackRef.current) {
        const cards = trackRef.current.children;
        if (cards.length > 0) {
          const firstCard = cards[0] as HTMLElement;
          const cardWidth = firstCard.offsetWidth || 360;
          const gap = 24;
          const offset = target * (cardWidth + gap);

          gsap.to(trackRef.current, {
            x: -offset,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    },
    [totalProps]
  );

  const handlePrev = () => slideTo(currentIndex - 1);
  const handleNext = () => slideTo(currentIndex + 1);

  // Mouse Drag & Touch Swipe Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX.current < -40) {
      handleNext();
    } else if (dragDeltaX.current > 40) {
      handlePrev();
    }
    dragDeltaX.current = 0;
  };

  const formattedActive = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalProps).padStart(2, "0");

  return (
    <section
      id="properties"
      className="py-24 md:py-32 bg-[#0A0A0A] text-white border-b border-neutral-800/80 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Top Header Bar: Title, Eyebrow, CTA & Clean Counter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800/80">
          
          {/* Left: Eyebrow, Large Heading, and Explore CTA */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                {lang === "en" ? "PROPERTIES" : "PROPERTI"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {lang === "en" ? "Our signature properties." : "Koleksi residensial unggulan kami."}
            </h2>

            <div className="pt-1">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-neutral-300 hover:text-white transition-colors"
              >
                <span className="underline decoration-1 underline-offset-4">
                  {lang === "en" ? "EXPLORE ALL PROPERTIES" : "LIHAT SEMUA PROPERTI"}
                </span>
                <div className="w-6 h-6 rounded-full border border-neutral-700 group-hover:border-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Crisp Counter & Snappy Navigation Buttons */}
          <div className="flex items-center gap-5 shrink-0 self-start md:self-end">
            
            {/* Clean Instant Counter (e.g. 01 / 12) */}
            <div className="flex items-baseline gap-1.5 font-mono text-sm tracking-widest text-neutral-400">
              <span className="text-2xl font-bold text-white tabular-numbers inline-block">
                {formattedActive}
              </span>
              <span className="text-neutral-500 font-light">/</span>
              <span className="text-neutral-500 font-medium tabular-numbers">
                {formattedTotal}
              </span>
            </div>

            {/* Circular Navigation Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors active:scale-95 shadow-sm cursor-pointer"
                aria-label="Previous Property"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors active:scale-95 shadow-sm cursor-pointer"
                aria-label="Next Property"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Stable Hardware-Accelerated Property Rail (Fixed Dimensions - Zero Section Movement) */}
        <div
          className="pt-10 overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform py-2 items-stretch"
          >
            {SIGNATURE_PROPERTIES.map((prop, idx) => {
              const isActive = currentIndex === idx;

              return (
                <div
                  key={prop.id}
                  onClick={() => {
                    if (Math.abs(dragDeltaX.current) < 10) onOpenPropertyModal(prop);
                  }}
                  className={`w-[270px] sm:w-[320px] md:w-[350px] lg:w-[370px] group relative rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/90 shadow-2xl shrink-0 cursor-pointer transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100 ring-1 ring-white/20"
                      : "opacity-85 hover:opacity-100"
                  }`}
                  style={{
                    aspectRatio: "16/13",
                  }}
                >
                  {/* Property Image Container */}
                  <div className="relative w-full h-full bg-neutral-950 overflow-hidden">
                    <Image
                      src={prop.image}
                      alt={prop.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      priority={idx < 4}
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 text-white" />

                    {/* Inside Bottom Info Box */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-3 transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="space-y-1">
                        <h3 className="font-bold text-base sm:text-lg tracking-wider text-white uppercase font-sans">
                          {prop.name}
                        </h3>
                        <p className="text-xs text-neutral-300 font-mono">
                          {prop.location} • {prop.type}
                        </p>
                      </div>

                      {/* View Details CTA Link with Arrow */}
                      <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-neutral-300 group-hover:text-white transition-colors">
                        <span>{lang === "en" ? "VIEW DETAILS" : "LIHAT RINCIAN"}</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-sans">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
