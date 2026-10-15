"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Headphones,
  TrendingUp,
  Code2,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "@/components/animations/reveal";
import { UniversalCta } from "@/components/shared/universal-cta";

export default function TentangPage() {
  const { lang } = useLanguage();

  const isEn = lang === "en";

  const stats = [
    {
      value: "5+",
      label: isEn ? "YEARS OF EXPERIENCE" : "TAHUN PENGALAMAN",
      highlight: false,
    },
    {
      value: "100+",
      label: isEn ? "SUCCESSFUL PROJECTS" : "PROYEK SUKSES",
      highlight: true,
    },
    {
      value: "24/7",
      label: isEn ? "TECHNICAL SUPPORT" : "DUKUNGAN TEKNIS",
      highlight: false,
    },
    {
      value: "99%",
      label: isEn ? "CLIENT SATISFACTION" : "KEPUASAN KLIEN",
      highlight: false,
    },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: isEn ? "5+ Years Proven Experience" : "5+ Tahun Pengalaman Terbukti",
      description: isEn
        ? "Deep understanding of the digital ecosystem with a strong track record of successful solutions at a national scale."
        : "Memahami lanskap industri yang tepat dengan rekam jejak implementasi solusi digital sukses di skala nasional.",
    },
    {
      icon: Headphones,
      title: isEn ? "24/7 Dedicated Support" : "Dukungan Teknis 24/7",
      description: isEn
        ? "Alert technical support team continuously monitoring server uptime and ready to assist during mission-critical moments."
        : "Tim support tanggap siaga memantau server dan siap melayani kendala teknis darurat demi kelancaran operasional.",
    },
    {
      icon: TrendingUp,
      title: isEn ? "Continuous Tech Innovation" : "Inovasi Teknologi Berkelanjutan",
      description: isEn
        ? "Modern tech stacks, modular architectures, and cloud-ready infrastructure built to scale seamlessly as your business expands."
        : "Penerapan tech-stack modern, arsitektur modular, dan cloud-ready yang siap berkembang seiring ekspansi bisnis Anda.",
    },
    {
      icon: Code2,
      title: isEn ? "Standardized Code Quality" : "Kualitas Kode Terstandarisasi",
      description: isEn
        ? "Implementing clean code architecture, comprehensive testing suites, high performance, and industry-grade security protocols."
        : "Menerapkan clean architecture, pengujian komprehensif, performa tinggi, serta keamanan data berstandar industri.",
    },
    {
      icon: CalendarCheck,
      title: isEn ? "On-Time Milestone Delivery" : "Pengiriman Tepat Waktu",
      description: isEn
        ? "Strict agile sprint planning and milestone execution guaranteeing launches strictly according to schedule and business timelines."
        : "Manajemen sprint dan milestone proyek terstruktur secara disiplin agar peluncuran tepat sesuai jadwal dan target bisnis.",
    },
    {
      icon: ShieldCheck,
      title: isEn ? "Competitive & Transparent Pricing" : "Harga Kompetitif & Transparan",
      description: isEn
        ? "Fully transparent cost breakdowns with zero hidden fees, friendly for growing startups and robust for enterprise contracts."
        : "Rencana anggaran biaya transparan tanpa jeda tersembunyi, ramah budget startup maupun komitmen enterprise.",
    },
  ];


  return (
    <div className="min-h-screen bg-white text-slate-900 pt-8 sm:pt-12 md:pt-16 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: Title, Subtitle, and Panoramic Team Photo                */}
        {/* ========================================================================= */}
        <section aria-label="Intro Tentang Kami" className="flex flex-col items-center text-center">
          <Reveal>
            <h1 className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-[-0.03em] text-slate-900 leading-[1.18]">
              {isEn ? "Building the Future " : "Membangun "}
              <span className="text-[#5bb82e]">{isEn ? "Together" : "Masa Depan"}</span>
              {!isEn && " Bersama"}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 sm:mt-5 max-w-3xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-normal [text-wrap:balance]">
              {isEn
                ? "BIDTECH stands alongside corporations, SMEs, and institutions, engineering everything from professional websites, mobile apps, e-commerce systems, to integrated ERP architectures that are relevant, proven, and sustainable."
                : "BIDTECH hadir mendampingi korporasi, UMKM, hingga institusi mulai dari rancang bangun website profesional, aplikasi mobile, sistem e-commerce, hingga arsitektur ERP terintegrasi yang relevan, teruji, dan berkelanjutan."}
            </p>
          </Reveal>

          {/* Panoramic Team Collaboration Photo */}
          <Reveal delay={0.2} className="w-full mt-8 sm:mt-12 md:mt-14">
            <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <Image
                src="/images/about/team-meeting.webp"
                alt="Tim Engineering BIDTECH sedang berkolaborasi di ruang meeting arsitektur software"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* 2. STATS / METRICS STRIP                                                  */}
        {/* ========================================================================= */}
        <section
          aria-label="Statistik Pencapaian"
          className="mt-12 sm:mt-16 md:mt-20 py-8 sm:py-10 border-b border-slate-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <Reveal delay={idx * 0.08} key={stat.label}>
                <div className="flex flex-col items-center">
                  <div
                    className={`font-[family-name:var(--font-sora),sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
                      stat.highlight ? "text-[#5bb82e]" : "text-slate-900"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] sm:text-xs md:text-[13px] font-bold tracking-wider text-slate-500 uppercase">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MENGAPA MEMILIH KAMI (6 Feature Cards Grid)                            */}
        {/* ========================================================================= */}
        <section
          aria-label="Mengapa Memilih Kami"
          className="mt-16 sm:mt-24 md:mt-28 flex flex-col items-center text-center"
        >
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-[#eef8eb] px-4 py-1 text-xs sm:text-[13px] font-bold tracking-widest text-[#45a02e] uppercase shadow-2xs">
              {isEn ? "OUR VALUES & ADVANTAGES" : "NILAI & KELEBIHAN KAMI"}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isEn ? "Why Choose Us" : "Mengapa Memilih Kami"}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-normal [text-wrap:balance]">
              {isEn
                ? "A combination of technical integrity, battle-tested expertise, and full commitment to delivering top-tier software engineering."
                : "Kombinasi integritas teknis, pengalaman teruji, serta komitmen penuh dalam memberikan layanan rekayasa perangkat lunak terbaik."}
            </p>
          </Reveal>

          {/* Grid 6 Keunggulan (3 Kolom Desktop) */}
          <div className="mt-10 sm:mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full max-w-6xl text-left">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Reveal delay={0.05 * idx} key={feat.title}>
                  <div className="group h-full rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#5bb82e]/40 transition-all duration-300 flex flex-col justify-start">
                    {/* Icon Box */}
                    <div className="flex size-10 sm:size-11 items-center justify-center rounded-xl bg-[#eef8eb] text-[#45a02e] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5 sm:size-5.5" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 sm:mt-5 font-[family-name:var(--font-sora),sans-serif] text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#5bb82e] transition-colors leading-snug">
                      {feat.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                      {feat.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. UNIVERSAL CTA BANNER (Existing Reusable Component)                     */}
        {/* ========================================================================= */}
        <UniversalCta className="mt-16 sm:mt-24 md:mt-28 px-0" />

      </div>
    </div>
  );
}
