"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function Locations() {
  const { t } = useLanguage();
  const loc = t.home.locations;
  const items = loc.items;

  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveIdx(Math.min(Math.max(index, 0), items.length - 1));
  };

  return (
    <section id="lokasi" className="section-space scroll-mt-20 bg-[#0b0b0b] text-white">
      <Container>
        <Reveal>
          <SectionHeading
            light
            eyebrow={loc.eyebrow}
            title={loc.title}
            description={loc.description}
          />
        </Reveal>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-10 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:p-0"
        >
          {items.map((location, index) => (
            <Reveal
              key={location.name}
              delay={index * 0.08}
              className="w-[85vw] max-w-[340px] snap-center shrink-0 sm:w-auto sm:max-w-none sm:shrink"
            >
              <Link
                href={`/lokasi/${location.slug || ""}`}
                className="group block h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-80"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {location.city}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-white group-hover:text-[var(--color-primary)]">
                        {location.name}
                      </h3>
                      <p className="mt-2 flex items-start gap-2 text-xs text-white/60">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                        <span>{location.address}</span>
                      </p>
                    </div>

                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Mobile slide indicator dots */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
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
                activeIdx === i
                  ? "w-6 bg-[var(--color-primary)]"
                  : "w-1.5 bg-white/30"
              )}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/lokasi"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
          >
            {loc.viewAll}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
