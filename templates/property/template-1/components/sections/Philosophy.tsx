"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PhilosophyProps {
  lang?: "en" | "id";
}

export default function Philosophy({ lang = "en" }: PhilosophyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPebbleRef = useRef<HTMLDivElement>(null);
  const rightPebblesRef = useRef<HTMLDivElement>(null);

  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(".philo-elem, .pebble-bubble, .metric-box", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Initial States
      gsap.set(".philo-elem", { opacity: 0, y: 28 });
      gsap.set(".philo-heading-line", { yPercent: 100, opacity: 0 });
      gsap.set(".pebble-bubble", { opacity: 0, scale: 0.84, y: 40 });
      gsap.set(".metric-box", { opacity: 0, y: 30 });

      // Master ScrollTrigger Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Left Text Reveal
      tl.to(
        ".philo-eyebrow",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0
      );

      tl.to(
        ".philo-heading-line",
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power4.out" },
        0.1
      );

      tl.to(
        ".philo-desc",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0.25
      );

      tl.to(
        ".philo-signature",
        { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
        0.35
      );

      // 2. Center 3 Organic Pebbles Scale & Soft Bloom
      tl.to(
        ".pebble-bubble",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.25,
          stagger: 0.12,
          ease: "power4.out",
        },
        0.15
      );

      // 3. Right 4 Metrics Entrance
      tl.to(
        ".metric-box",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        },
        0.25
      );

      // 4. Dynamic Number Counting Animations
      // Metric 1: $0 -> $1.4B+
      const counter1 = { val: 0 };
      tl.to(
        counter1,
        {
          val: 1.4,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            if (num1Ref.current) {
              num1Ref.current.innerText = `$${counter1.val.toFixed(1)}B+`;
            }
          },
        },
        0.3
      );

      // Metric 2: 0 -> 24
      const counter2 = { val: 0 };
      tl.to(
        counter2,
        {
          val: 24,
          duration: 1.3,
          ease: "power3.out",
          onUpdate: () => {
            if (num2Ref.current) {
              num2Ref.current.innerText = `${Math.round(counter2.val)}`;
            }
          },
        },
        0.35
      );

      // Metric 3: 0% -> 99.4%
      const counter3 = { val: 0 };
      tl.to(
        counter3,
        {
          val: 99.4,
          duration: 1.4,
          ease: "power3.out",
          onUpdate: () => {
            if (num3Ref.current) {
              num3Ref.current.innerText = `${counter3.val.toFixed(1)}%`;
            }
          },
        },
        0.4
      );

      // Metric 4: 0 -> 08
      const counter4 = { val: 0 };
      tl.to(
        counter4,
        {
          val: 8,
          duration: 1.2,
          ease: "power3.out",
          onUpdate: () => {
            if (num4Ref.current) {
              const rounded = Math.round(counter4.val);
              num4Ref.current.innerText = rounded < 10 ? `0${rounded}` : `${rounded}`;
            }
          },
        },
        0.45
      );

      // 5. Differential Scroll Parallax for Center Pebbles
      if (leftPebbleRef.current) {
        gsap.to(leftPebbleRef.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (rightPebblesRef.current) {
        gsap.to(rightPebblesRef.current, {
          yPercent: -6,
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
      id="philosophy"
      className="py-24 md:py-32 bg-white text-neutral-900 border-b border-[#E5E7EB] overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Left Column: Statement & Founder Signature */}
          <div className="xl:col-span-5 space-y-6">
            <div className="philo-eyebrow philo-elem">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                AT BUILDINGBLOCKS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-[-0.02em] text-neutral-900 leading-[1.32] max-w-xl">
              <div className="overflow-hidden">
                <div className="philo-heading-line">
                  {lang === "en" ? "We shape your vision, turn" : "Kami wujudkan visi Anda,"}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="philo-heading-line">
                  {lang === "en" ? "ideas into lasting structures." : "mengubah ide jadi struktur abadi."}
                </div>
              </div>
            </h2>

            <p className="philo-desc philo-elem text-sm text-neutral-600 leading-relaxed font-normal max-w-lg">
              {lang === "en"
                ? "We innovate ideas, turn groundbreaking concepts into lasting structures that endure. Our expertise ensures each project reflects our commitment to excellence. We turn dreams into reality, creating uplifting spaces."
                : "Kami menghadirkan inovasi, mengubah konsep revolusioner menjadi struktur yang bertahan melintasi masa. Keahlian kami memastikan setiap proyek mencerminkan komitmen tertinggi pada kesempurnaan ruang. Kami wujudkan impian menjadi nyata, menciptakan ruang yang menginspirasi."}
            </p>

            {/* Founder Signature Block */}
            <div className="philo-signature philo-elem pt-4 flex items-center gap-3.5">
              <span className="font-serif italic text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                Deny kiw
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                Founder, Denn House
              </span>
            </div>
          </div>

          {/* Center Column: 3 Organic Pebble Collage with Staggered Spring Reveal & Differential Parallax */}
          <div className="xl:col-span-4 flex items-center justify-center">
            <div className="flex items-center justify-center gap-3 sm:gap-3.5 w-full max-w-[360px]">

              {/* Large Left Organic Pebble Bubble */}
              <div
                ref={leftPebbleRef}
                className="pebble-bubble relative w-44 sm:w-48 md:w-52 h-64 sm:h-72 md:h-[310px] pebble-large overflow-hidden shadow-2xl bg-neutral-100 shrink-0 transform hover:scale-[1.03] transition-transform duration-700 will-change-transform"
              >
                <Image
                  src="/images/philosophy-main.webp"
                  alt="Villa Architecture Monolith"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Right Stack of 2 Organic Pebble Bubbles */}
              <div
                ref={rightPebblesRef}
                className="flex flex-col justify-between gap-3 h-64 sm:h-72 md:h-[310px] shrink-0 will-change-transform"
              >
                {/* Top Small Pebble Bubble */}
                <div className="pebble-bubble relative w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-[110px] pebble-sub-1 overflow-hidden shadow-md bg-neutral-100 transform hover:scale-[1.04] transition-transform duration-700">
                  <Image
                    src="/images/philosophy-sub-1.webp"
                    alt="Outdoor Villa Terrace"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom Medium Pebble Bubble */}
                <div className="pebble-bubble relative w-28 sm:w-32 md:w-36 h-36 sm:h-40 md:h-[185px] pebble-sub-2 overflow-hidden shadow-md bg-neutral-100 transform hover:scale-[1.04] transition-transform duration-700">
                  <Image
                    src="/images/philosophy-sub-2.webp"
                    alt="Glass Pavilion Lounge"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 4 Key Performance Metrics with Dynamic Number Counting */}
          <div className="xl:col-span-3 pt-8 xl:pt-0 xl:pl-4">
            <div className="grid grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-8 sm:gap-y-10">

              {/* Metric 1 ($1.4B+) */}
              <div className="metric-box space-y-1.5">
                <span
                  ref={num1Ref}
                  className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 tabular-numbers block"
                >
                  $1.4B+
                </span>
                <p className="text-xs text-neutral-500 font-medium leading-snug">
                  {lang === "en" ? "Portfolio Value Created" : "Nilai Portofolio Tercipta"}
                </p>
              </div>

              {/* Metric 2 (24) */}
              <div className="metric-box space-y-1.5">
                <span
                  ref={num2Ref}
                  className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 tabular-numbers block"
                >
                  24
                </span>
                <p className="text-xs text-neutral-500 font-medium leading-snug">
                  {lang === "en" ? "Global Architecture Awards" : "Penghargaan Arsitektur Global"}
                </p>
              </div>

              {/* Metric 3 (99.4%) */}
              <div className="metric-box space-y-1.5">
                <span
                  ref={num3Ref}
                  className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 tabular-numbers block"
                >
                  99.4%
                </span>
                <p className="text-xs text-neutral-500 font-medium leading-snug">
                  {lang === "en" ? "Client Satisfaction Score" : "Skor Kepuasan Klien"}
                </p>
              </div>

              {/* Metric 4 (08) */}
              <div className="metric-box space-y-1.5">
                <span
                  ref={num4Ref}
                  className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 tabular-numbers block"
                >
                  08
                </span>
                <p className="text-xs text-neutral-500 font-medium leading-snug">
                  {lang === "en" ? "Strategic Island Hubs" : "Hub Kawasan Strategis"}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
