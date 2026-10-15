"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const trainerPositionMap: Record<string, string> = {
  "sarah-jenkins": "84% 38%",
  "marcus-vance": "50% 30%",
  "david-tan": "50% 16%",
  "amanda-wijaya": "50% 15%",
};

export function Trainers() {
  const { t } = useLanguage();
  const tr = t.home.trainers;
  const items = tr.items;

  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasMoved = useRef(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.75));
    setActiveIdx(Math.min(Math.max(index, 0), items.length - 1));
  };

  const scrollToIdx = (idx: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll<HTMLElement>("[data-trainer-card]");
    const target = cards[idx];
    if (target) {
      const left = target.offsetLeft - (scrollRef.current.clientWidth - target.clientWidth) / 2;
      scrollRef.current.scrollTo({ left, behavior: "smooth" });
      setActiveIdx(idx);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  return (
    <section id="trainer" className="section-space scroll-mt-20 bg-[#f4f2ee] overflow-hidden">
      <Container className="overflow-hidden">
        <div className="flex flex-col gap-8 sm:gap-12 lg:grid lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 w-full max-w-full min-w-0">
          <Reveal className="w-full max-w-full min-w-0">
            <div className="w-full max-w-full min-w-0 lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow={tr.eyebrow}
                title={tr.title}
                description={tr.description}
                className="w-full max-w-full min-w-0"
              />

              <div className="mt-8 hidden lg:block">
                <span className="block font-heading text-[7rem] font-bold leading-none tracking-[-0.08em] text-black/[0.04]">
                  01—02
                </span>
              </div>

              <div className="mt-6 sm:mt-8">
                <Link
                  href="/trainer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0b0b0b] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-primary)]"
                >
                  {tr.viewAll}
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="w-full max-w-full min-w-0 overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:p-0 touch-pan-x cursor-grab active:cursor-grabbing select-none"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {items.map((trainer) => (
                <div
                  key={trainer.name}
                  data-trainer-card
                  className="h-full w-[82vw] max-w-[320px] snap-center shrink-0 lg:w-auto lg:max-w-none lg:shrink"
                >
                  <Link
                    href={`/trainer/${trainer.slug}`}
                    draggable={false}
                    onClick={(e) => {
                      if (hasMoved.current) {
                        e.preventDefault();
                      }
                    }}
                    className="group relative block h-[380px] sm:h-auto min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-2xl sm:rounded-[2rem] bg-black text-white shadow-md transition-all duration-500 hover:shadow-2xl md:min-h-[540px]"
                  >
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
                      style={{ objectPosition: trainerPositionMap[trainer.slug] || "center 25%" }}
                      className="object-cover grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 pointer-events-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-90 pointer-events-none"
                    />

                    <div className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-[var(--color-primary)] pointer-events-none">
                      <ArrowUpRight size={17} />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 pointer-events-none">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                        {trainer.specialty}
                      </span>
                      <h3 className="mt-1 font-heading text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                        {trainer.name}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                        {trainer.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile slide indicator & controls */}
            <div className="mt-4 flex items-center justify-center gap-3 lg:hidden">
              <button
                type="button"
                aria-label="Previous trainer"
                onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-all",
                  activeIdx === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--color-primary)] hover:text-white"
                )}
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => scrollToIdx(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      activeIdx === i
                        ? "w-6 bg-[var(--color-primary)]"
                        : "w-1.5 bg-black/20"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next trainer"
                onClick={() => scrollToIdx(Math.min(items.length - 1, activeIdx + 1))}
                disabled={activeIdx === items.length - 1}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border border-black/15 bg-white text-black transition-all",
                  activeIdx === items.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--color-primary)] hover:text-white"
                )}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
