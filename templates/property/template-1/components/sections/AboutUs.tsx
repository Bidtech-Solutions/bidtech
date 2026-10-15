"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Building2, Globe, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AboutUsProps {
  lang: "en" | "id";
}

export default function AboutUs({ lang }: AboutUsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(".about-text-item, .about-stat-item, .about-heading-line", { opacity: 1, x: 0 });
        if (imageCardRef.current) {
          gsap.set(imageCardRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            opacity: 1,
          });
        }
        return;
      }

      // 1. Initial State: Small box in the center of the left section (scale 0.65, clipped inset 20%, opacity 0)
      if (imageCardRef.current) {
        gsap.set(imageCardRef.current, {
          scale: 0.65,
          clipPath: "inset(20% 20% 20% 20%)",
          opacity: 0,
          transformOrigin: "center center",
        });
      }

      gsap.set(".about-heading-line", {
        xPercent: 80,
        opacity: 0,
      });

      gsap.set(".about-text-item", {
        x: 90,
        opacity: 0,
      });

      gsap.set(".about-stat-item", {
        x: 60,
        opacity: 0,
      });

      // Master Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Left Image: Scales and expands clip-path from centered box to fill the entire left section full-bleed
      if (imageCardRef.current) {
        tl.to(
          imageCardRef.current,
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
          },
          0
        );
      }

      // Right Side Content Staggered Reveal
      tl.to(
        ".about-eyebrow",
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
        },
        0.18
      );

      tl.to(
        ".about-heading-line",
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.28
      );

      tl.to(
        ".about-paragraph",
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
        },
        0.48
      );

      tl.to(
        ".about-stat-item",
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.58
      );

      tl.to(
        ".about-cta",
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        0.72
      );

      // Subsequent subtle scroll parallax
      if (imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white text-neutral-900 overflow-hidden select-none border-0 m-0 p-0"
    >
      {/* Edge-to-Edge Split Screen (Left: Full Image Section, Right: Editorial Content) */}
      <div className="w-full min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] grid grid-cols-1 lg:grid-cols-12 items-stretch border-0 m-0 p-0">
        
        {/* LEFT COLUMN: Full 1 Section Height Architectural Photo */}
        <div className="lg:col-span-6 xl:col-span-6 relative w-full h-[440px] sm:h-[520px] lg:h-full min-h-[440px] lg:min-h-full overflow-hidden bg-white flex items-center justify-center border-0">
          {/* Animated Scaling & Clip-Path Card that fills the entire left section */}
          <div
            ref={imageCardRef}
            className="relative w-full h-full will-change-transform"
          >
            <div
              ref={imageInnerRef}
              className="relative w-full h-[115%] -top-[7.5%]"
            >
              <Image
                src="/images/about.webp"
                alt="Denn House Illuminated Modern Promenade"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Content with Generous Padding */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-12 xl:px-20 py-16 lg:py-24 bg-white space-y-8 border-0">
          
          {/* Eyebrow */}
          <div className="about-eyebrow about-text-item">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
              {lang === "en" ? "ABOUT US" : "TENTANG KAMI"}
            </span>
          </div>

          {/* Editorial Heading with Line Reveal Mask */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.2rem] font-bold tracking-tight text-neutral-900 leading-[1.12]">
            <div className="overflow-hidden">
              <div className="about-heading-line">
                {lang === "en" ? "Architecture is not just" : "Arsitektur bukan sekadar"}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="about-heading-line">
                {lang === "en" ? "about buildings." : "tentang bangunan."}
              </div>
            </div>
          </h2>

          {/* Description Paragraph */}
          <p className="about-paragraph about-text-item text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-xl">
            {lang === "en"
              ? "It's about shaping experiences, enhancing lives, and creating spaces that inspire. With a passion for design and a commitment to quality, we transform ideas into timeless architecture."
              : "Ini tentang membentuk pengalaman, memperkaya kehidupan, dan menciptakan ruang yang menginspirasi. Dengan dedikasi desain dan komitmen kualitas tanpa batas, kami mengubah gagasan menjadi arsitektur abadi."}
          </p>

          {/* 3 Key Metrics Row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-neutral-200/80">
            
            {/* Metric 1: 18+ Years */}
            <div className="about-stat-item space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 tabular-numbers tracking-tight">
                  18+
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                {lang === "en" ? "Years of Experience" : "Tahun Pengalaman"}
              </p>
            </div>

            {/* Metric 2: 400+ Projects */}
            <div className="about-stat-item space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 tabular-numbers tracking-tight">
                  400+
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                {lang === "en" ? "Projects Completed" : "Proyek Terselesaikan"}
              </p>
            </div>

            {/* Metric 3: 08 Global Hubs */}
            <div className="about-stat-item space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 tabular-numbers tracking-tight">
                  08
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                {lang === "en" ? "Global Hubs" : "Hub Global"}
              </p>
            </div>

          </div>

          {/* CTA Link: LEARN MORE ABOUT US */}
          <div className="about-cta about-text-item pt-2">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 transition-colors"
            >
              <span className="underline decoration-1 underline-offset-4">
                {lang === "en" ? "LEARN MORE ABOUT US" : "PELAJARI LEBIH LANJUT"}
              </span>
              <div className="w-6 h-6 rounded-full border border-neutral-300 group-hover:border-neutral-900 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
