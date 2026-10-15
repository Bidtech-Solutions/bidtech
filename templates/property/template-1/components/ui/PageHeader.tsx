"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { type Language } from "@/context/LanguageContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  titleSolid: string;
  titleOutline: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  stats?: { label: string; value: string }[];
  lang?: Language;
}

export default function PageHeader({
  eyebrow,
  titleSolid,
  titleOutline,
  description,
  breadcrumbs,
  stats,
  lang = "en",
}: PageHeaderProps) {
  return (
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 bg-[#0A0A0A] text-white border-b border-neutral-900 overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3 h-3 text-neutral-500" />
            <span>{lang === "en" ? "HOME" : "BERANDA"}</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-neutral-700">/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-amber-400 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-bold">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-neutral-300 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{eyebrow}</span>
            </div>

            {/* Monumental Display Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92]">
              <span className="block text-white">{titleSolid}</span>
              <span className="block text-stroke-white">{titleOutline}</span>
            </h1>

            {/* Editorial Description */}
            <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed pt-2">
              {description}
            </p>
          </div>

          {/* Quick Metrics / Stats Box */}
          {stats && stats.length > 0 && (
            <div className="lg:col-span-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{lang === "en" ? "PORTFOLIO INDEX" : "INDEKS PORTOFOLIO"}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-1">
                {stats.map((st, i) => (
                  <div key={i} className="border-l border-white/15 pl-3">
                    <div className="text-xl sm:text-2xl font-black text-white font-mono">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-neutral-400 tracking-wide">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
