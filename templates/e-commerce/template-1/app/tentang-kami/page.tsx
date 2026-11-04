"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  Award,
  HeartHandshake,
  ShoppingBag,
  Truck,
  FileText,
  Lock,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Testimonial from "@/components/sections/Testimonial";
import CTA from "@/app/cta";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    icon: <Award className="w-5 h-5 text-gold-600" />,
    target: 6,
    suffix: "+",
    label: "Tahun Pengalaman",
    sublabel: "Sejak 2018 di Batam",
  },
  {
    icon: <HeartHandshake className="w-5 h-5 text-gold-600" />,
    target: 5000,
    suffix: "+",
    label: "Pelanggan Puas",
    sublabel: "Transaksi Terpercaya",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-gold-600" />,
    target: 100,
    suffix: "%",
    label: "Transaksi Aman",
    sublabel: "IMEI Resmi Terdaftar",
  },
];

export default function AboutPage() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeInfo, setActiveInfo] = useState("cara-pembelian");

  const statLabels = [
    t.about.statYears,
    t.about.statCustomers,
    t.about.statTransactions,
  ];

  const infoSections = [
    {
      id: "cara-pembelian",
      title: t.aboutPage.sections.howToBuy.title,
      subtitle: t.aboutPage.sections.howToBuy.subtitle,
      icon: <ShoppingBag size={20} />,
      steps: t.aboutPage.sections.howToBuy.steps,
    },
    {
      id: "garansi-retur",
      title: t.aboutPage.sections.warranty.title,
      subtitle: t.aboutPage.sections.warranty.subtitle,
      icon: <ShieldCheck size={20} />,
      steps: t.aboutPage.sections.warranty.steps,
    },
    {
      id: "pengiriman",
      title: t.aboutPage.sections.shipping.title,
      subtitle: t.aboutPage.sections.shipping.subtitle,
      icon: <Truck size={20} />,
      steps: t.aboutPage.sections.shipping.steps,
    },
    {
      id: "syarat-ketentuan",
      title: t.aboutPage.sections.terms.title,
      subtitle: t.aboutPage.sections.terms.subtitle,
      icon: <FileText size={20} />,
      steps: t.aboutPage.sections.terms.steps,
    },
    {
      id: "kebijakan-privasi",
      title: t.aboutPage.sections.privacy.title,
      subtitle: t.aboutPage.sections.privacy.subtitle,
      icon: <Lock size={20} />,
      steps: t.aboutPage.sections.privacy.steps,
    },
  ];

  // Sync dengan hash URL pada saat navigasi dari Footer
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const validIds = [
        "cara-pembelian",
        "garansi-retur",
        "pengiriman",
        "syarat-ketentuan",
        "kebijakan-privasi",
      ];
      if (validIds.includes(hash)) {
        setActiveInfo(hash);
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 200);
        }
      }
    }
  }, []);

  const scrollToInfo = (id: string) => {
    setActiveInfo(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation fade-in up
      gsap.fromTo(
        ".fade-in-up",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" }
      );

      // 2. Animasi hitungan angka otomatis (Count-up GSAP seperti di Beranda)
      stats.forEach((stat, idx) => {
        const obj = { val: 0 };
        const el = document.getElementById(`about-stat-num-${idx}`);
        if (el) {
          gsap.to(obj, {
            val: stat.target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              if (stat.target >= 1000) {
                el.textContent = `${Math.floor(obj.val).toLocaleString("id-ID")}${stat.suffix}`;
              } else {
                el.textContent = `${Math.floor(obj.val)}${stat.suffix}`;
              }
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background text-ink-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 sm:pt-24 lg:pt-28 pb-4">
        {/* Container Atas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Header Ringkas */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 fade-in-up">
            <span className="text-xs sm:text-[13px] text-gold-600 font-bold uppercase tracking-[0.1em] mb-2 block">
              {t.aboutPage.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-ink-900 tracking-[-0.03em] leading-tight">
              {t.aboutPage.title}
            </h1>
          </div>

          {/* 2. Hero Story Showcase (2-Column Clean Layout Seperti Beranda) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            {/* Foto Toko Fisik */}
            <div className="lg:col-span-6 fade-in-up">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-border shadow-soft group">
                <Image
                  src="/images/store-interior.webp"
                  alt="Toko Fisik KONTERKU Batam"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Badge Lokasi */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border text-xs font-bold text-ink-900 shadow-sm">
                    <MapPin size={15} className="text-gold-600 flex-shrink-0" />
                    <span>{t.aboutPage.storeBadge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narasi Cerita & Metrik Angka yang Bergerak Otomatis (Count-up GSAP) */}
            <div className="lg:col-span-6 flex flex-col justify-center fade-in-up">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-2">
                {t.aboutPage.storyEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight leading-snug mb-4">
                {t.aboutPage.storyTitle}
              </h2>
              <p className="text-sm sm:text-base text-text-600 leading-relaxed mb-4">
                {t.aboutPage.story1}
              </p>
              <p className="text-sm sm:text-base text-text-600 leading-relaxed mb-6">
                {t.aboutPage.story2}
              </p>

              {/* 3 Metrik Kunci dengan Animasi Angka Bergerak (Count-Up) Seperti di Beranda */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-gold-200">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 bg-surface sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-gold-200 sm:border-0"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gold-300 bg-gold-50 flex items-center justify-center flex-shrink-0 text-gold-600 shadow-2xs">
                      {stat.icon}
                    </div>
                    <div>
                      <div 
                        id={`about-stat-num-${idx}`}
                        className="text-2xl sm:text-3xl font-black text-ink-900 tracking-tight leading-none mb-1 tabular-nums"
                      >
                        {`0${stat.suffix}`}
                      </div>
                      <div className="text-xs text-text-400 font-medium leading-tight">
                        {statLabels[idx]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Tiga Pilar Layanan Utama (Keunggulan Kami) */}
          <div className="mb-14 sm:mb-20">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 fade-in-up">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-1 block">
                {t.aboutPage.advantagesEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                {t.aboutPage.advantagesTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="bg-surface rounded-2xl border border-gold-200 p-6 sm:p-7 shadow-soft hover:border-gold-400 transition-all duration-200 fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5 text-gold-600">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {t.aboutPage.advantage1Title}
                </h3>
                <p className="text-sm text-text-500 leading-relaxed">
                  {t.aboutPage.advantage1Desc}
                </p>
              </div>

              <div className="bg-surface rounded-2xl border border-gold-200 p-6 sm:p-7 shadow-soft hover:border-gold-400 transition-all duration-200 fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5 text-gold-600">
                  <CheckCircle2 size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {t.aboutPage.advantage2Title}
                </h3>
                <p className="text-sm text-text-500 leading-relaxed">
                  {t.aboutPage.advantage2Desc}
                </p>
              </div>

              <div className="bg-surface rounded-2xl border border-gold-200 p-6 sm:p-7 shadow-soft hover:border-gold-400 transition-all duration-200 fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5 text-gold-600">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {t.aboutPage.advantage3Title}
                </h3>
                <p className="text-sm text-text-500 leading-relaxed">
                  {t.aboutPage.advantage3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Bagian Informasi (Sesuai Menu Informasi di Footer: Cara Pembelian, Garansi & Retur, Pengiriman, Syarat & Ketentuan, Kebijakan Privasi) */}
          <div id="informasi" className="mb-14 sm:mb-20 scroll-mt-24">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 fade-in-up">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-1 block">
                {t.aboutPage.infoEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                {t.aboutPage.infoTitle}
              </h2>
              <p className="text-sm text-text-500 leading-relaxed mt-2">
                {t.aboutPage.infoDesc}
              </p>
            </div>

            {/* Navigasi Cepat Mobile (Pill Scrollable) */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
              {infoSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToInfo(item.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    activeInfo === item.id
                      ? "bg-gold-500 text-ink-900 border-gold-500 shadow-sm font-bold"
                      : "bg-surface text-text-600 border-gold-200/70 hover:bg-gold-50/50"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Kolom Kiri: Menu Informasi (Persis Tampilan Kolom Informasi Footer) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-24">
                <div className="bg-surface rounded-2xl border border-gold-200 p-5 sm:p-6 shadow-soft">
                  <div className="mb-3.5 pb-3 border-b border-gold-200">
                    <h3 className="text-base sm:text-lg font-extrabold text-ink-900">
                      {t.aboutPage.infoSidebarTitle}
                    </h3>
                    <p className="text-xs text-text-400 mt-0.5">
                      {t.aboutPage.infoSidebarSubtitle}
                    </p>
                  </div>
                  <nav className="space-y-1.5">
                    {infoSections.map((item) => {
                      const isActive = activeInfo === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToInfo(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all text-left ${
                            isActive
                              ? "bg-gold-500 text-ink-900 shadow-sm font-bold"
                              : "text-text-600 font-medium hover:bg-gold-50/70 hover:text-gold-700"
                          }`}
                        >
                          <span>{item.title}</span>
                          <ChevronRight
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isActive ? "text-ink-900 translate-x-0.5" : "text-text-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Kolom Kanan: 5 Kartu Detail Terstruktur Sesuai Topik */}
              <div className="lg:col-span-8 space-y-6">
                {infoSections.map((section) => {
                  const isActive = activeInfo === section.id;
                  return (
                    <div
                      key={section.id}
                      id={section.id}
                      className={`bg-surface rounded-2xl border p-6 sm:p-7 shadow-soft transition-all duration-200 scroll-mt-28 ${
                        isActive
                          ? "border-gold-500 ring-2 ring-gold-500/20"
                          : "border-gold-200 hover:border-gold-400"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-gold-200">
                        <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-ink-900">
                            {section.title}
                          </h3>
                          <p className="text-xs text-text-400">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        {section.steps.map((step) => (
                          <div key={step.num} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-gold-100 text-gold-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {step.num}
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-ink-900">
                                {step.title}
                              </h4>
                              <p className="text-xs text-text-500 leading-relaxed mt-0.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* 5. Testimoni Pelanggan */}
        <Testimonial />
      </main>

      {/* 6. CTA Component */}
      <CTA
        title={t.aboutPage.ctaTitle}
        description={t.aboutPage.ctaDesc}
        primaryButtonText={t.aboutPage.ctaBtn}
        primaryButtonHref={`https://wa.me/6281234567890?text=${encodeURIComponent(
          language === "en"
            ? "Hello KONTERKU, I would like to consult about smartphone products"
            : "Halo KONTERKU, saya ingin konsultasi smartphone"
        )}`}
      />

      <Footer />
    </div>
  );
}
