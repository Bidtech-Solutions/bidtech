"use client";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/reveal";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function TutorialSection() {
  const { t } = useLanguage();

  return (
    <section className="landing-panel relative overflow-hidden bg-slate-50/60 py-16 sm:py-20 md:py-24 border-y border-slate-100" id="tutorial">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge className="rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm">
              {t.howItWorks.badge}
            </Badge>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta),sans-serif] text-3xl font-bold tracking-[-0.025em] text-slate-900 sm:text-4xl">
            {t.howItWorks.titleWhite}{" "}
            <span className="text-brand-primary">{t.howItWorks.titleGreen}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            6 langkah mudah dan terstruktur dari konsultasi awal hingga website &amp; aplikasi Anda live siap menghasilkan omzet.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.howItWorks.steps.map((step, idx) => (
            <Reveal delay={idx * 60} key={idx}>
              <div className="relative flex flex-col justify-between h-full rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary font-bold font-mono text-sm group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="size-5 text-slate-300 group-hover:text-brand-primary transition-colors duration-300" />
                  </div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
