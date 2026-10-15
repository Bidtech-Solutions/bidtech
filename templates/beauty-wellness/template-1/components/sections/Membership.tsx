"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Membership() {
  const { t, locale } = useLanguage();
  const m = t.home.membership;
  const plans = m.plans;

  const [activeIdx, setActiveIdx] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = scrollRef.current;
      if (container && window.innerWidth < 1024) {
        const featuredIndex = plans.findIndex((p) => p.featured);
        const targetIdx = featuredIndex >= 0 ? featuredIndex : 1;
        const targetChild = container.children[targetIdx] as HTMLElement;
        if (targetChild) {
          const left =
            targetChild.getBoundingClientRect().left -
            container.getBoundingClientRect().left +
            container.scrollLeft -
            (container.clientWidth - targetChild.clientWidth) / 2;
          container.scrollTo({ left, behavior: "auto" });
        }
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [plans]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIdx(Math.min(Math.max(index, 0), plans.length - 1));
  };

  return (
    <section id="membership" className="section-space scroll-mt-20 bg-[#0b0b0b] text-white">
      <Container>
        <Reveal>
          <SectionHeading
            light
            eyebrow={m.eyebrow}
            title={m.title}
            description={m.description}
          />
        </Reveal>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-10 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-stretch lg:overflow-visible lg:p-0"
        >
          {plans.map((plan, index) => {
            const waUrl = createWhatsAppUrl(
              locale === "en"
                ? `Hello Admin ${siteConfig.brand.name}, I am interested in joining the ${plan.name} Membership Plan (${plan.price}). Please share registration details and activation info.`
                : `Halo Admin ${siteConfig.brand.name}, saya tertarik bergabung dengan paket Membership ${plan.name} (${plan.price}). Mohon panduan registrasi dan info aktivasinya.`
            );

            return (
              <Reveal
                key={plan.name}
                delay={index * 0.1}
                className="h-full w-[85vw] max-w-[340px] snap-center shrink-0 lg:w-auto lg:max-w-none lg:shrink"
              >
                <div
                  className={[
                    "flex h-full flex-col justify-between rounded-[2rem] border p-8 transition-all duration-300 md:p-10",
                    plan.featured
                      ? "border-[var(--color-primary)] bg-white/10 shadow-2xl lg:-translate-y-4"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20",
                  ].join(" ")}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                        {plan.name}
                      </span>
                      {plan.featured && (
                        <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          {m.mostPopular}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-white/60 sm:text-sm">
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-2 border-y border-white/10 py-5">
                      <span className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        {plan.price}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-white/50">
                        {plan.period}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-xs font-medium text-white/80 sm:text-sm">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white mt-0.5">
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "group/btn flex w-full items-center justify-between rounded-full py-4 px-6 text-xs font-bold uppercase tracking-[0.14em] transition-all",
                        plan.featured
                          ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                          : "bg-white/10 text-white hover:bg-white hover:text-black",
                      ].join(" ")}
                    >
                      <span>{plan.cta}</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile slide indicator dots */}
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          {plans.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;
                const child = container.children[i] as HTMLElement;
                if (child) {
                  const left =
                    child.getBoundingClientRect().left -
                    container.getBoundingClientRect().left +
                    container.scrollLeft -
                    (container.clientWidth - child.clientWidth) / 2;
                  container.scrollTo({ left, behavior: "smooth" });
                }
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIdx === i
                  ? "w-6 bg-[var(--color-primary)]"
                  : "w-1.5 bg-white/30"
              )}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/membership"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
          >
            {m.viewAll}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
