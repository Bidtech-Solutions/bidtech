"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Car, 
  Check, 
  Clock, 
  Compass, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Sparkles 
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
import { createWhatsAppUrl } from "@/lib/whatsapp";

const guideIcons = [Compass, Car, Clock, Sparkles];

export default function LokasiPage() {
  const { t, locale } = useLanguage();
  const lp = t.lokasiPage;
  const isEn = locale === "en";
  const [selectedArea, setSelectedArea] = useState(lp.filterAll);

  const filteredBranches =
    selectedArea === lp.filterAll
      ? lp.branches
      : lp.branches.filter((b) => b.city.toLowerCase().includes(selectedArea.toLowerCase()));

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="w-full max-w-full overflow-x-hidden">
        <PageHero
          image="/images/pages/hero-lokasi.webp"
          imageAlt={lp.title}
          eyebrow={lp.eyebrow}
          title={lp.title}
          description={lp.description}
          badge={lp.badge}
          stats={lp.stats as any}
        />

        {/* Branches Grid */}
        <section className="section-space bg-[#f4f2ee] w-full max-w-full overflow-hidden">
          <Container className="px-4 sm:px-6 lg:px-8">
            {/* Area Filter Buttons */}
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-full">
                {lp.areas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setSelectedArea(area)}
                    className={[
                      "rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs",
                      selectedArea === area
                        ? "bg-[var(--color-primary)] text-white shadow-md"
                        : "border border-black/10 bg-white text-black/70 hover:border-black/30 hover:text-black",
                    ].join(" ")}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Branch Cards */}
            <div className="mt-8 sm:mt-14 space-y-8 sm:space-y-12 max-w-full">
              {filteredBranches.map((branch, index) => {
                const tourUrl = createWhatsAppUrl(
                  isEn
                    ? `Hello ${siteConfig.brand.name}, I want to schedule a club visit and chat with admin at ${branch.name}.`
                    : `Halo Admin ${siteConfig.brand.name}, saya ingin menjadwalkan kunjungan gym dan bertanya mengenai cabang ${branch.name}.`
                );

                return (
                  <Reveal key={branch.name} delay={index * 0.08} className="w-full min-w-0">
                    <article className="overflow-hidden rounded-2xl sm:rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm transition-all duration-500 hover:border-[var(--color-primary)]/40 hover:shadow-xl sm:p-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-12 w-full min-w-0">
                      {/* Left: Details */}
                      <div className="flex flex-col justify-between lg:col-span-7 min-w-0">
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="rounded-full bg-[var(--color-primary)]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                              {branch.city}
                            </span>
                            <span className="text-xs font-semibold text-black/50">
                              {branch.highlight}
                            </span>
                          </div>

                          <Link href={`/lokasi/${branch.slug}`} className="group block">
                            <h3 className="mt-4 font-heading text-2xl font-bold uppercase tracking-tight text-[#0b0b0b] transition-colors group-hover:text-[var(--color-primary)] sm:text-3xl lg:text-4xl">
                              {branch.name}
                            </h3>
                          </Link>

                          <div className="mt-5 space-y-2 text-xs sm:text-sm text-black/70">
                            <p className="flex items-start gap-2.5">
                              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                              <span className="break-words">{branch.address}</span>
                            </p>
                            <p className="flex items-center gap-2.5">
                              <Clock size={16} className="shrink-0 text-[var(--color-primary)]" />
                              <span className="font-semibold text-[#0b0b0b]">{lp.hoursLabel}</span>
                              <span>{branch.hours}</span>
                            </p>
                            <p className="flex items-center gap-2.5">
                              <Phone size={16} className="shrink-0 text-[var(--color-primary)]" />
                              <span className="font-semibold text-[#0b0b0b]">{lp.phoneLabel}</span>
                              <a href={`tel:${branch.phone}`} className="hover:text-[var(--color-primary)]">
                                {branch.phone}
                              </a>
                            </p>
                          </div>

                          <div className="mt-6 sm:mt-8 border-t border-black/10 pt-5 sm:pt-6">
                            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                              {lp.amenitiesTitle}
                            </h4>
                            <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
                              {branch.facilities.map((fac) => (
                                <li key={fac} className="flex items-center gap-2 text-xs font-medium text-black/80 sm:text-sm">
                                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                                    <Check size={10} strokeWidth={3} />
                                  </span>
                                  <span className="line-clamp-1">{fac}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Detail Lokasi Button */}
                        <div className="mt-6 sm:mt-8 pt-4 border-t border-black/5">
                          <Link
                            href={`/lokasi/${branch.slug}`}
                            className="group/btn inline-flex items-center justify-between gap-3 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[var(--color-primary-hover)] hover:scale-105"
                          >
                            <span>{isEn ? "Branch Details" : "Detail Lokasi"}</span>
                            <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Image */}
                      <Link
                        href={`/lokasi/${branch.slug}`}
                        className="group relative mt-6 block min-h-[220px] overflow-hidden rounded-xl sm:rounded-[1.5rem] bg-black sm:min-h-[320px] lg:col-span-5 lg:mt-0 lg:min-h-full"
                      >
                        <Image
                          src={branch.image}
                          alt={branch.name}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all group-hover:bg-[var(--color-primary)] group-hover:scale-105">
                          <ArrowUpRight size={16} />
                        </div>

                        <div className="absolute inset-x-4 bottom-4 text-white">
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                            {isEn ? "Click to view branch" : "Klik lihat cabang"}
                          </span>
                          <p className="font-heading text-lg font-bold uppercase">
                            {branch.name}
                          </p>
                        </div>
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            {/* Multi-pass Banner */}
            <Reveal delay={0.2}>
              <div className="mt-16 rounded-[2rem] border border-[var(--color-primary)]/30 bg-[#0b0b0b] p-8 text-white sm:p-12">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      {lp.multiPassEyebrow}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                      {lp.multiPassTitle}
                    </h3>
                    <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/70 sm:text-sm">
                      {lp.multiPassDesc}
                    </p>
                  </div>

                  <Link
                    href="/membership"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-primary-hover)] sm:text-sm"
                  >
                    <span>{locale === "en" ? "Explore Multi-Club Passes" : "Lihat Paket Multi-Club"}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Visiting Guides */}
        <section className="section-space bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow={lp.guidesEyebrow}
                title={lp.guidesTitle}
                description={lp.guidesDesc}
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {lp.guides.map((guide, idx) => {
                const Icon = guideIcons[idx % guideIcons.length];
                return (
                  <Reveal key={guide.title} delay={idx * 0.08}>
                    <div className="h-full rounded-[1.5rem] border border-black/10 bg-[#f4f2ee] p-7 transition-all hover:border-[var(--color-primary)] hover:bg-white hover:shadow-lg">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0b0b0b] text-[var(--color-primary)]">
                        <Icon size={22} />
                      </div>
                      <h4 className="mt-6 font-heading text-lg font-bold uppercase text-[#0b0b0b]">
                        {guide.title}
                      </h4>
                      <p className="mt-3 text-xs leading-relaxed text-black/65 sm:text-sm">
                        {guide.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        <ConversionCTA />
      </main>

      <Footer />
    </>
  );
}
