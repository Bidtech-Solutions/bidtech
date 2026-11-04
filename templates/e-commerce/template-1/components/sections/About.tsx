"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, HeartHandshake, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    icon: <Award className="w-6 h-6 text-gold-500" />,
    target: 6,
    suffix: "+",
    label: "Tahun Pengalaman",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-gold-500" />,
    target: 5000,
    suffix: "+",
    label: "Pelanggan Puas",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
    target: 100,
    suffix: "%",
    label: "Transaksi Aman",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const statLabels = [
    t.about.statYears,
    t.about.statCustomers,
    t.about.statTransactions,
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal & scale animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Content reveal animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Count-up animation for stats numbers
      stats.forEach((stat, idx) => {
        const obj = { val: 0 };
        const el = document.getElementById(`stat-number-${idx}`);
        if (el) {
          gsap.to(obj, {
            val: stat.target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              el.textContent = `${Math.floor(obj.val).toLocaleString('id-ID')}${stat.suffix}`;
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tentang" className="py-20 sm:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual: Store Interior Photo */}
          <div 
            ref={imageRef}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[24px] overflow-hidden border border-border/80 shadow-[0_16px_36px_rgba(0,0,0,0.06)] aspect-[4/3] w-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/store-interior.webp"
                alt="KONTERKU Store Interior"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Content: Description & Stats */}
          <div 
            ref={contentRef}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span className="text-xs sm:text-[13px] font-bold text-gold-500 uppercase tracking-[0.1em] mb-2 block">
              {t.about.eyebrow}
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-ink-900 leading-[1.15] tracking-[-0.03em] mb-5">
              {t.about.title}
            </h2>

            <div className="space-y-3 text-txt-600 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                {t.about.story1}
              </p>
              <p className="font-medium text-ink-800">
                {t.about.story2}
              </p>
            </div>

            {/* 3 Metric Stats with GSAP Count-up Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-border/70">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3.5 bg-white sm:bg-transparent p-3.5 sm:p-0 rounded-[18px] sm:rounded-none border border-border/70 sm:border-0 shadow-xs sm:shadow-none transition-all"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] border border-[#E8C27D]/70 bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 shadow-xs">
                    {stat.icon}
                  </div>
                  <div>
                    <div 
                      id={`stat-number-${idx}`}
                      className="text-xl sm:text-2xl font-black text-ink-900 tracking-tight leading-none mb-1 tabular-nums"
                    >
                      {`0${stat.suffix}`}
                    </div>
                    <div className="text-xs text-txt-500 font-medium leading-tight">
                      {statLabels[idx]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
