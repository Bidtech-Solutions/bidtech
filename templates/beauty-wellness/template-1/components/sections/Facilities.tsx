"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function Facilities() {
  const { t } = useLanguage();
  const f = t.home.facilities;
  const items = f.items;

  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIdx(Math.min(Math.max(index, 0), items.length - 1));
  };

  return (
    <section id="fasilitas" className="section-space scroll-mt-20 bg-[#0b0b0b] !pt-4 text-white sm:!pt-12 lg:!pt-44">
      <Container>
        <div className="mb-6 flex flex-col justify-between gap-6 sm:mb-10 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              light
              eyebrow={f.eyebrow}
              title={f.title}
              description={f.description}
            />
          </Reveal>

          <div className="flex items-center justify-between lg:justify-end gap-4">
            {/* Mobile swipe hint */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50 lg:hidden">
              Geser ➔
            </span>

            <Reveal delay={0.1}>
              <Link
                href="/fasilitas"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                <span>{f.exploreMore}</span>
                <span className="flex size-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Carousel on mobile, Grid on desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:p-0"
        >
          {items.map((facility, index) => {
            const layout =
              facility.size === "large"
                ? "lg:col-span-8 lg:row-span-2"
                : facility.size === "wide"
                  ? "lg:col-span-8"
                  : "lg:col-span-4";

            const height =
              facility.size === "large"
                ? "min-h-[380px] sm:min-h-[420px] lg:min-h-[620px]"
                : "min-h-[340px] lg:min-h-[300px]";

            return (
              <Reveal
                key={facility.title}
                delay={index * 0.08}
                className={cn(layout, "h-full w-[85vw] max-w-[360px] snap-center shrink-0 lg:w-auto lg:max-w-none lg:shrink")}
              >
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] text-white",
                    height
                  )}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes={
                      facility.size === "large"
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white md:text-2xl">
                        {facility.title}
                      </h3>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                      {facility.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile slide indicator dots */}
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
          {items.map((_, i) => (
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
                activeIdx === i ? "w-6 bg-[var(--color-primary)]" : "w-1.5 bg-white/20"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
