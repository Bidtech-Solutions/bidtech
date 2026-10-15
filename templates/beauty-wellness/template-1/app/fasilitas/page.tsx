"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Dumbbell, 
  Wind, 
  Sparkles, 
  ShieldCheck, 
  Check 
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const standardIcons = [Dumbbell, Wind, Sparkles, ShieldCheck];

export default function FasilitasPage() {
  const { t } = useLanguage();
  const fp = t.facilitiesPage;

  const [activeZoneIdx, setActiveZoneIdx] = useState(0);
  const zoneScrollRef = useRef<HTMLDivElement>(null);

  const handleZoneScroll = () => {
    if (!zoneScrollRef.current) return;
    const { scrollLeft, clientWidth } = zoneScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveZoneIdx(Math.min(Math.max(index, 0), fp.zones.length - 1));
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <PageHero
          image="/images/pages/hero-fasilitas.webp"
          imageAlt={fp.title}
          eyebrow={fp.eyebrow}
          title={fp.title}
          description={fp.description}
          badge={fp.badge}
          stats={fp.stats as any}
        />

        {/* Detailed Zones */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={fp.zonesEyebrow}
                title={fp.zonesTitle}
                description={fp.zonesDesc}
              />
            </Reveal>

            <div
              ref={zoneScrollRef}
              onScroll={handleZoneScroll}
              className="mt-10 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 lg:block lg:space-y-16 lg:overflow-visible lg:p-0"
            >
              {fp.zones.map((zone, idx) => (
                <Reveal
                  key={zone.number}
                  delay={idx * 0.08}
                  className="w-[88vw] max-w-[440px] snap-center shrink-0 lg:w-auto lg:max-w-none lg:shrink"
                >
                  <div className="group flex flex-col h-full overflow-hidden rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[var(--color-primary)]/40 hover:shadow-xl sm:p-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-12">
                    {/* Zone image (order-first on mobile for immediate visual impact, lg:order-last on desktop) */}
                    <div className="relative order-first mb-6 h-[220px] sm:h-[300px] overflow-hidden rounded-[1.25rem] bg-black lg:order-last lg:col-span-6 lg:mb-0 lg:h-auto lg:min-h-full">
                      <Image
                        src={zone.image}
                        alt={zone.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Zone details */}
                    <div className="flex flex-1 flex-col justify-between lg:col-span-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-2xl font-bold tracking-tight text-[var(--color-primary)]">
                            {zone.number}
                          </span>
                          <span className="h-px w-6 bg-[var(--color-primary)]/40" />
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                            {zone.category}
                          </span>
                        </div>

                        <h3 className="mt-4 font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-[#0b0b0b] sm:text-3xl lg:text-4xl">
                          {zone.name}
                        </h3>

                        <p className="mt-4 text-sm leading-relaxed text-black/65 sm:text-base">
                          {zone.description}
                        </p>

                        <div className="mt-8 border-t border-black/10 pt-6">
                          <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                            {fp.featuresTitle}
                          </h4>
                          <ul className="mt-4 space-y-2.5">
                            {zone.features.map((feat) => (
                              <li key={feat} className="flex items-center gap-3 text-xs font-medium text-black/80 sm:text-sm">
                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                  <Check size={12} strokeWidth={2.5} />
                                </span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-4">
                        <Link
                          href="/membership"
                          className="group/btn inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]"
                        >
                          {fp.tryZone}
                          <span className="flex size-8 items-center justify-center rounded-full border border-[var(--color-primary)]/30 transition-transform group-hover/btn:translate-x-1">
                            <ArrowUpRight size={14} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Mobile slide indicator dots */}
            <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
              {fp.zones.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    const container = zoneScrollRef.current;
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
                    activeZoneIdx === i
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-1.5 bg-black/20"
                  )}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Equipment & Standards */}
        <section className="section-space bg-[#0b0b0b] text-white">
          <Container>
            <Reveal>
              <SectionHeading
                light
                eyebrow={fp.standardsEyebrow}
                title={fp.standardsTitle}
                description={fp.standardsDesc}
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {fp.standards.map((item, i) => {
                const Icon = standardIcons[i % standardIcons.length];
                return (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="group h-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-white/[0.07]">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                        <Icon size={24} />
                      </div>
                      <h4 className="mt-6 font-heading text-lg font-bold uppercase tracking-tight text-white">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-xs leading-relaxed text-white/60 sm:text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Facility FAQ */}
        <section className="section-space bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={fp.faqsEyebrow}
                title={fp.faqsTitle}
                description={fp.faqsDesc}
                align="center"
              />
            </Reveal>

            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {fp.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.06}>
                  <div className="rounded-2xl border border-black/10 bg-[#f4f2ee] p-6 sm:p-7">
                    <h4 className="font-heading text-base font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-lg">
                      {faq.q}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-black/70">
                      {faq.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <ConversionCTA />
      </main>

      <Footer />
    </>
  );
}
