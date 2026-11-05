"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";

export function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="landing-panel relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[rgba(95,201,74,0.06)] via-white to-transparent"
      id="faq"
      aria-labelledby="faq-heading"
    >
      {/* Ambient background decoration (Connected to Contact Section) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(95,201,74,0.09),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[rgba(95,201,74,0.08)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              <HelpCircle className="size-3.5" />
              <span>{t.faq.badge}</span>
            </span>
          </div>

          <h2
            id="faq-heading"
            className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl lg:text-[40px] leading-tight"
          >
            {t.faq.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.faq.titleHighlight}</span>
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-600">
            {t.faq.subtitle}
          </p>
        </Reveal>

        {/* FAQ Accordion List */}
        <div className="mt-10 sm:mt-14 space-y-3.5 sm:space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <Reveal key={item.question} delay={index * 0.05} y={12}>
                <div
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#a5e094] bg-white shadow-[0_8px_30px_rgba(95,201,74,0.12)] ring-1 ring-[#5fc94a]/30"
                      : "border-slate-200/80 bg-white/80 hover:bg-white hover:border-slate-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                          isOpen
                            ? "bg-[#45a02e] text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 group-hover:bg-[#f0f9ea] group-hover:text-[#45a02e]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="font-[family-name:var(--font-sora)] text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-[#f0f9ea] text-[#45a02e]"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200/70 group-hover:text-slate-700"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-5 sm:px-6 pt-3.5 pb-5 sm:pb-6 text-xs sm:text-sm leading-relaxed text-slate-600">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
