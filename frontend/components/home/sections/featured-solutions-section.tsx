"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { FEATURED_SOLUTIONS_DATA } from "@/lib/data/featured-solutions";

function AndroidIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Android">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8 12 8s-3.5902.4116-5.1368.9507L4.841 5.4477a.416.416 0 00-.5677-.1521.4157.4157 0 00-.152.5676l1.9972 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
    </svg>
  );
}

function AppleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="iOS">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.94-1 .04-2.22.67-2.91 1.48-.59.69-1.12 1.8-1 2.89 1.12.09 2.34-.65 2.97-1.43z" />
    </svg>
  );
}

export function FeaturedSolutionsSection() {
  return (
    <section
      id="featured-solutions"
      className="landing-panel relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#45a02e]/[0.06] via-white to-transparent"
    >
      {/* Anchor alias so existing #portfolio links scroll here seamlessly */}
      <span id="portfolio" className="absolute -top-24 left-0 pointer-events-none" aria-hidden />
      {/* BACKGROUND WAVE CANVAS: Menyambung harmonis dari Services Section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
          className="hidden sm:block absolute inset-0 h-full w-full"
        >
          {/* Garis Putus-Putus dengan Node Marker Circle */}
          <path
            d="M -40 220 C 340 280, 720 180, 1140 210 C 1300 220, 1420 200, 1500 190"
            stroke="#84cc16"
            strokeOpacity="0.32"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          <circle cx="1140" cy="210" r="5" fill="#84cc16" fillOpacity="0.7" />

          {/* Garis Utuh Tipis Bergelombang */}
          <path
            d="M -40 320 C 380 390, 780 280, 1180 330 C 1320 350, 1420 330, 1500 320"
            stroke="#45a02e"
            strokeOpacity="0.22"
            strokeWidth="1.0"
          />
        </svg>

        {/* Ambient Connected Glow: Mengalir dari Kanan ke Kiri */}
        <div className="absolute -right-20 top-1/4 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.12)_0%,transparent_70%)] filter blur-3xl" />
        <div className="absolute -left-20 bottom-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(69,160,46,0.10)_0%,transparent_70%)] filter blur-3xl" />

        {/* Bottom Ambient Transition toward Portfolio Section */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[rgba(95,201,74,0.06)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER (Centered Title & Subtitle) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <Reveal y={16}>
            <h2 className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-slate-900 leading-tight">
              Produk & Solusi Unggulan Rekayasa Kami
            </h2>
            <p className="mt-3.5 text-xs sm:text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              Dirancang presisi, direkayasa dengan standar kode tertinggi, dan terbukti menghasilkan dampak bisnis nyata.
            </p>
          </Reveal>
        </div>

        {/* 2. GRID 3 KARTU PRODUK UNGGULAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_SOLUTIONS_DATA.map((item, index) => (
            <Reveal key={item.id} delay={index * 120} y={24} className="h-full">
              <div className="group relative flex flex-col justify-between h-full rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(69,160,46,0.12)] hover:border-[#45a02e]/40 hover:-translate-y-1.5 transition-all duration-300">
                {/* Top: Mockup Preview Container */}
                <div className="relative flex items-center justify-center h-48 sm:h-52 w-full rounded-[20px] bg-[#f8fafc] border border-slate-100/90 overflow-hidden p-3 mb-5">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 select-none transition-transform duration-300 group-hover:scale-105"
                    priority={index === 0}
                  />
                </div>

                {/* Middle: Content */}
                <div className="flex-1 text-left">
                  <h3 className="font-[family-name:var(--font-sora),var(--font-plus-jakarta),sans-serif] text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Footer Meta & CTA Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {/* Category & Platform Icons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 ml-0.5">
                      {item.platforms.includes("android") && (
                        <span title="Android App" className="text-[#22c55e]">
                          <AndroidIcon className="size-4" />
                        </span>
                      )}
                      {item.platforms.includes("web") && (
                        <span title="Web Platform" className="text-[#0284c7]">
                          <Globe className="size-3.5" />
                        </span>
                      )}
                      {item.platforms.includes("ios") && (
                        <span title="iOS App" className="text-slate-600">
                          <AppleIcon className="size-4" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Link: Lihat Situs -> */}
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#45a02e] hover:text-[#388e22] transition-colors"
                  >
                    <span>Lihat Situs</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
