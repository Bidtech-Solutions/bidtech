"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Check, 
  MapPin, 
  ShieldCheck 
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
import { siteConfig } from "@/data/site";
import { trainers, trainerPositionMap } from "@/data/trainers";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const trainerCategories = [
  { id: "all", nameId: "Semua", nameEn: "All" },
  { id: "strength", nameId: "Strength & Power", nameEn: "Strength & Power" },
  { id: "hypertrophy", nameId: "Muscle & Hypertrophy", nameEn: "Muscle & Hypertrophy" },
  { id: "mobility", nameId: "Mobility & Postur", nameEn: "Mobility & Posture" },
  { id: "hiit", nameId: "HIIT & Fat Loss", nameEn: "HIIT & Fat Loss" },
];

const trainerCategoryMap: Record<string, string[]> = {
  "sarah-jenkins": ["all", "strength"],
  "marcus-vance": ["all", "hypertrophy"],
  "david-tan": ["all", "mobility"],
  "amanda-wijaya": ["all", "hiit"],
};

export default function TrainerPage() {
  const { t, locale } = useLanguage();
  const tp = t.trainersPage;
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const [activePkgIdx, setActivePkgIdx] = useState(1);
  const pkgScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = pkgScrollRef.current;
      if (container && window.innerWidth < 1024) {
        const featuredIndex = tp.packages.findIndex((p) => p.featured);
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
  }, [tp.packages]);

  const handlePkgScroll = () => {
    if (!pkgScrollRef.current) return;
    const { scrollLeft, clientWidth } = pkgScrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActivePkgIdx(Math.min(Math.max(index, 0), tp.packages.length - 1));
  };

  const filteredTrainers =
    activeCategoryId === "all"
      ? trainers
      : trainers.filter((tr) => trainerCategoryMap[tr.slug]?.includes(activeCategoryId));

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="w-full max-w-full overflow-x-hidden">
        <PageHero
          image="/images/pages/hero-trainer.webp"
          imageAlt={tp.title}
          eyebrow={tp.eyebrow}
          title={tp.title}
          description={tp.description}
          badge={tp.badge}
          stats={tp.stats as any}
        />

        {/* Coaches Grid */}
        <section className="section-space bg-[#f4f2ee] w-full max-w-full overflow-hidden">
          <Container className="px-4 sm:px-6 lg:px-8">
            {/* Filter buttons by ID with guaranteed matches */}
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-full">
                {trainerCategories.map((cat) => {
                  const label = locale === "en" ? cat.nameEn : cat.nameId;
                  const isActive = activeCategoryId === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategoryId(cat.id)}
                      className={[
                        "rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs",
                        isActive
                          ? "bg-[var(--color-primary)] text-white shadow-md"
                          : "border border-black/10 bg-white text-black/70 hover:border-black/30 hover:text-black",
                      ].join(" ")}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Trainer cards - centered, bounded, never cuts off */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 max-w-full">
              {filteredTrainers.map((trainer, index) => {
                const bookUrl = createWhatsAppUrl(
                  locale === "en"
                    ? `Hello Admin ${siteConfig.brand.name}, I would like to book an initial consultation with Coach ${trainer.name}.`
                    : `Halo Admin ${siteConfig.brand.name}, saya ingin booking sesi konsultasi privat dengan Coach ${trainer.name}.`
                );

                return (
                  <Reveal key={trainer.slug} delay={index * 0.08} className="w-full min-w-0">
                    <article className="group mx-auto w-full max-w-full min-w-0 overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition-all duration-500 hover:border-[var(--color-primary)] hover:shadow-xl">
                      {/* Top Photo with Specialty & Name Overlay (matching Photo 2 exactly) */}
                      <div className="relative h-44 sm:h-56 lg:h-[290px] w-full overflow-hidden bg-black">
                        <Image
                          src={trainer.image}
                          alt={trainer.name}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          style={{ objectPosition: trainerPositionMap[trainer.slug] || "center 25%" }}
                          className="object-cover grayscale-[15%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

                        {/* Location badge in top-left */}
                        <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                          <MapPin size={12} className="text-[var(--color-primary)]" />
                          <span>{trainer.branch}</span>
                        </div>

                        {/* Specialty & Name Overlay inside photo */}
                        <div className="absolute inset-x-4 bottom-3 sm:inset-x-5 sm:bottom-4 text-white">
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                            {trainer.specialty}
                          </span>
                          <h3 className="mt-0.5 font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                            {trainer.name}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body matching Photo 2 with circular arrow, official cert, quote, tags, and dual buttons */}
                      <div className="p-4 sm:p-6 min-w-0">
                        {/* Top row with Role on left and Circular Arrow on right */}
                        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-black/10 pb-3">
                          <p className="min-w-0 flex-1 font-heading text-xs sm:text-sm font-semibold text-black/85 truncate">
                            {trainer.role}
                          </p>
                          <Link
                            href={`/trainer/${trainer.slug}`}
                            className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white shadow-sm transition-all duration-300 hover:bg-[var(--color-primary)] hover:scale-105"
                            aria-label={`Lihat profil ${trainer.name}`}
                          >
                            <ArrowUpRight size={17} />
                          </Link>
                        </div>

                        {/* Official Certification badge - min-w-0 and flex-1 prevents container blowout */}
                        <div className="mt-3 flex min-w-0 items-center gap-2 rounded-xl bg-[#f4f2ee] px-3.5 py-2.5 text-xs text-black/80 overflow-hidden">
                          <ShieldCheck size={16} className="shrink-0 text-[var(--color-primary)]" />
                          <span className="font-semibold text-black/60 shrink-0">{tp.officialCert}:</span>
                          <span className="min-w-0 flex-1 truncate font-medium text-black/90">{trainer.certifications}</span>
                        </div>

                        {/* Trainer Quote */}
                        <p className="mt-3 text-xs sm:text-sm italic leading-relaxed text-black/70 break-words">
                          &ldquo;{trainer.quote}&rdquo;
                        </p>

                        {/* Tags */}
                        <div className="mt-3 flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
                          {trainer.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-black/10 bg-[#f4f2ee] px-2.5 py-1 text-[11px] font-semibold text-black/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Dual action buttons matching Photo 2 */}
                        <div className="mt-3.5 grid min-w-0 gap-2.5 border-t border-black/10 pt-3.5 sm:grid-cols-2">
                          <Link
                            href={`/trainer/${trainer.slug}`}
                            className="group/btn flex w-full items-center justify-between rounded-full border border-black/20 bg-white px-5 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#0b0b0b] transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                          >
                            <span>{tp.viewProfile}</span>
                            <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>

                          <a
                            href={bookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex w-full items-center justify-between rounded-full bg-[var(--color-primary)] px-5 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-[var(--color-primary-hover)] sm:bg-[#0b0b0b] sm:hover:bg-[var(--color-primary)]"
                          >
                            <span>{tp.consult}</span>
                            <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* 4 Pillars of Coaching */}
        <section className="section-space bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={tp.pillarsEyebrow}
                title={tp.pillarsTitle}
                description={tp.pillarsDesc}
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tp.pillars.map((pillar) => (
                <Reveal key={pillar.step} delay={0.08}>
                  <div className="relative rounded-[1.5rem] border border-black/10 bg-[#f4f2ee] p-7 transition-all hover:border-[var(--color-primary)] hover:bg-white hover:shadow-lg">
                    <span className="font-heading text-4xl font-black tracking-tight text-[var(--color-primary)]/80">
                      {pillar.step}
                    </span>
                    <h4 className="mt-4 font-heading text-lg font-bold uppercase text-[#0b0b0b]">
                      {pillar.title}
                    </h4>
                    <p className="mt-3 text-xs leading-relaxed text-black/60 sm:text-sm">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* PT Packages */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={tp.packagesEyebrow}
                title={tp.packagesTitle}
                description={tp.packagesDesc}
                align="center"
              />
            </Reveal>

            <div
              ref={pkgScrollRef}
              onScroll={handlePkgScroll}
              className="mt-10 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:items-stretch lg:overflow-visible lg:p-0"
            >
              {tp.packages.map((pkg, idx) => {
                const orderUrl = createWhatsAppUrl(
                  locale === "en"
                    ? `Hello Admin ${siteConfig.brand.name}, I am interested in the PT Package ${pkg.name} (${pkg.price}). Can we schedule my consultation?`
                    : `Halo Admin ${siteConfig.brand.name}, saya tertarik mengambil Paket PT ${pkg.name} (${pkg.price}). Bisa jadwalkan sesi konsultasi pertama?`
                );

                return (
                  <Reveal
                    key={pkg.name}
                    delay={idx * 0.08}
                    className="h-full w-[85vw] max-w-[340px] snap-center shrink-0 lg:w-auto lg:max-w-none lg:shrink"
                  >
                    <article
                      className={[
                        "flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border p-8 transition-all duration-300",
                        pkg.featured
                          ? "border-[var(--color-primary)] bg-[#0b0b0b] text-white shadow-xl lg:-translate-y-4"
                          : "border-black/10 bg-white text-black shadow-sm hover:shadow-md",
                      ].join(" ")}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-[var(--color-primary)]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                            {pkg.badge}
                          </span>
                          <span className={pkg.featured ? "text-xs font-semibold text-white/60" : "text-xs font-semibold text-black/50"}>
                            {pkg.sessions}
                          </span>
                        </div>

                        <h3 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                          {pkg.name}
                        </h3>

                        <p className={["mt-2 text-xs leading-relaxed sm:text-sm", pkg.featured ? "text-white/60" : "text-black/60"].join(" ")}>
                          {pkg.desc}
                        </p>

                        <div className="mt-6 border-y border-current/10 py-5">
                          <span className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl text-[var(--color-primary)]">
                            {pkg.price}
                          </span>
                        </div>

                        <ul className="mt-6 space-y-3">
                          {pkg.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm font-medium">
                              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white mt-0.5">
                                <Check size={12} strokeWidth={2.5} />
                              </span>
                              <span className={pkg.featured ? "text-white/80" : "text-black/75"}>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-4">
                        <a
                          href={orderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={[
                            "group/btn flex w-full items-center justify-between rounded-full py-4 px-6 text-xs font-bold uppercase tracking-[0.14em] transition-all",
                            pkg.featured
                              ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
                              : "bg-[#0b0b0b] text-white hover:bg-[var(--color-primary)]",
                          ].join(" ")}
                        >
                          <span>{tp.choosePackage}</span>
                          <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* Mobile slide indicator dots */}
            <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
              {tp.packages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    const container = pkgScrollRef.current;
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
                    activePkgIdx === i
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-1.5 bg-black/20"
                  )}
                />
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
