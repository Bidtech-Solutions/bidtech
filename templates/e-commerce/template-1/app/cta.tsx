"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
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
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export interface CTAProps {
  badge?: string;
  title?: React.ReactNode;
  highlightedTitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export default function CTA({
  title,
  highlightedTitle,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  className = "",
}: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const finalTitle = title || (highlightedTitle ? (language === "en" ? `Ready to Find ${highlightedTitle}?` : `Siap Menemukan ${highlightedTitle}?`) : t.cta.title);
  const finalDesc = description || t.cta.description;
  const finalBtnText = primaryButtonText || t.cta.button;
  const finalBtnHref = primaryButtonHref || `https://wa.me/6281234567890?text=${encodeURIComponent(
    language === "en"
      ? "Hello KONTERKU, I would like to ask about available stock and promo"
      : "Halo KONTERKU, saya ingin tanya produk dan stok"
  )}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className={`py-10 sm:py-14 lg:py-16 bg-background ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="relative rounded-[24px] sm:rounded-[28px] bg-gradient-to-r from-[#F6D59A] via-[#EAB75E] to-[#DC9E39] text-ink-900 px-6 py-10 sm:px-12 sm:py-12 lg:py-14 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#E8C27D]/60 overflow-hidden"
        >
          {/* Soft Ambient Light Sheen */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)",
            }}
          />

          <div className="max-w-3xl mx-auto relative z-10">
            {/* Judul Bersih, Proporsional & Rapi */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-ink-900 tracking-[-0.02em] leading-tight mb-3 text-balance">
              {finalTitle}
            </h2>

            {/* Deskripsi Singkat & Terbaca Jelas */}
            {finalDesc && (
              <p className="text-sm sm:text-base lg:text-lg text-ink-900/85 max-w-xl mx-auto mb-7 leading-relaxed font-medium text-balance">
                {finalDesc}
              </p>
            )}

            {/* Tombol Terang (100% Cerah, Tanpa Tombol Gelap) */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {finalBtnHref && (
                <a
                  href={finalBtnHref}
                  target={finalBtnHref.startsWith("http") ? "_blank" : undefined}
                  rel={finalBtnHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-extrabold text-ink-900 shadow-md hover:shadow-xl hover:bg-white/95 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border border-white/90"
                >
                  <WhatsappIcon className="w-5 h-5 text-[#25D366] shrink-0" />
                  <span className="text-ink-900 font-extrabold tracking-tight">
                    {finalBtnText}
                  </span>
                </a>
              )}

              {secondaryButtonHref && secondaryButtonText && (
                <Link
                  href={secondaryButtonHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/40 hover:bg-white/60 text-ink-900 px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold transition-all duration-200 border border-white/70 shadow-xs hover:-translate-y-0.5 active:scale-95 backdrop-blur-xs"
                >
                  <span className="text-ink-900 font-bold">{secondaryButtonText}</span>
                  <ArrowRight className="w-4 h-4 text-ink-900" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
