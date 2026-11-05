"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section
      className="landing-panel relative overflow-hidden py-10 sm:py-16 md:py-24"
      id="testimonials"
    >
      {/* Sapuan ambient hijau (Connected from Mitra Section) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[550px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(95,201,74,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 -z-10 h-64 w-full max-w-3xl rounded-full bg-[#5fc94a]/[0.08] blur-3xl"
      />

      {/* Bottom ambient transition toward FAQ Section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-b from-transparent to-[rgba(95,201,74,0.06)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-4 sm:px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.testimonials.badge}
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl min-[400px]:text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] leading-tight">
            {t.testimonials.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.testimonials.titleHighlight}</span>
            {t.testimonials.titleSuffix}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed text-slate-600">
            {t.testimonials.subtitle}
          </p>
        </Reveal>

        {/* 3-Card Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {t.testimonials.items.map((item, index) => (
            <Reveal
              className="flex h-full w-full"
              delay={index * 120}
              key={item.name}
              y={30}
            >
              <div className="group relative flex w-full flex-col justify-between rounded-[24px] sm:rounded-[32px] bg-white p-5 sm:p-8 border-2 border-slate-200/80 hover:border-[#45a02e] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(69,160,46,0.14)] hover:-translate-y-1.5 transition-all duration-300">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        className="size-4 sm:size-4.5 fill-amber-400 text-amber-400"
                        key={starIndex}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 sm:mt-5 text-xs sm:text-[15px] italic leading-relaxed text-slate-600 font-normal">
                    {item.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-100 flex items-center gap-3 sm:gap-3.5">
                  <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full bg-[#edf8ea] text-[#45a02e] font-bold text-xs sm:text-sm tracking-wide border border-[#d6f2c9]">
                    {item.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-sora)] text-sm sm:text-base font-bold tracking-tight text-slate-950 truncate">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
