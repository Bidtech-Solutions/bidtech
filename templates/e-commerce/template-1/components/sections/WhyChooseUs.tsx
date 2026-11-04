"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, Tag, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <Award className="w-6 h-6 text-gold-500" />,
    title: "Produk Terpercaya",
    desc: "Semua produk original dan berkualitas.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
    title: "Garansi Resmi",
    desc: "Garansi resmi untuk setiap produk.",
  },
  {
    icon: <Tag className="w-6 h-6 text-gold-500" />,
    title: "Harga Kompetitif",
    desc: "Harga terbaik dengan kualitas terbaik.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-gold-500" />,
    title: "Layanan Ramah",
    desc: "Kami siap membantu kebutuhanmu.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const featureIcons = [
    <Award key="0" className="w-6 h-6 text-gold-500" />,
    <ShieldCheck key="1" className="w-6 h-6 text-gold-500" />,
    <Tag key="2" className="w-6 h-6 text-gold-500" />,
    <Headphones key="3" className="w-6 h-6 text-gold-500" />,
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4 Cards stagger entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 pb-10 sm:pt-20 sm:pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading with GSAP Reveal */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-[13px] font-bold text-gold-500 tracking-[0.08em] mb-2 inline-block">
            {t.whyUs.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-ink-900 tracking-[-0.03em] leading-tight">
            {t.whyUs.title}
          </h2>
        </div>

        {/* 4 Feature Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {t.whyUs.features.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-[20px] border border-border/80 p-6 flex items-start gap-4 hover:border-gold-300/80 hover:shadow-soft transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-50/70 border border-gold-200/50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-gold-50 transition-all">
                {featureIcons[idx]}
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-ink-900 mb-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-txt-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
