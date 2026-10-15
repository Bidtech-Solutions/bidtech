"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageSquarePlus, Quote, Star } from "lucide-react";

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

export default function TestimoniPage() {
  const { t, locale } = useLanguage();
  const tp = t.testimoniPage;
  const [activeFilter, setActiveFilter] = useState(tp.filterAll);

  const filteredReviews =
    activeFilter === tp.filterAll
      ? tp.reviews
      : tp.reviews.filter((r) => r.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  const reviewWhatsApp = createWhatsAppUrl(
    locale === "en"
      ? `Hello Admin ${siteConfig.brand.name}, I am an active member and would like to share my transformation story.`
      : `Halo Admin ${siteConfig.brand.name}, saya member dan ingin membagikan testimoni pengalaman latihan saya.`
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <PageHero
          image="/images/pages/hero-testimoni.webp"
          imageAlt={tp.title}
          eyebrow={tp.eyebrow}
          title={tp.title}
          description={tp.description}
          badge={tp.badge}
          stats={tp.stats as any}
        />

        {/* Transformation Reviews */}
        <section className="section-space bg-[#f4f2ee]">
          <Container>
            {/* Category Filter */}
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {tp.categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={[
                      "rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs",
                      activeFilter === cat
                        ? "bg-[var(--color-primary)] text-white shadow-md"
                        : "border border-black/10 bg-white text-black/70 hover:border-black/30 hover:text-black",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Review Cards Grid */}
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredReviews.map((rev, index) => (
                <Reveal key={rev.name} delay={index * 0.08}>
                  <article className="flex h-full flex-col justify-between rounded-[2rem] border border-black/10 bg-white p-7 shadow-xs transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-xl sm:p-8">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 text-[var(--color-primary)]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={15} fill="currentColor" />
                          ))}
                        </div>
                        <span className="rounded-full bg-[#f4f2ee] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/60">
                          {rev.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-tight text-[#0b0b0b]">
                        {rev.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-black/75">
                        &ldquo;{rev.quote}&rdquo;
                      </p>

                      <div className="mt-5 inline-block rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-3 py-1.5 text-xs font-bold text-[var(--color-primary)]">
                        {rev.stats}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4 border-t border-black/10 pt-5">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-[#0b0b0b]">
                        <Image
                          src={rev.photo}
                          alt={rev.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-heading text-base font-bold uppercase tracking-tight text-[#0b0b0b]">
                          {rev.name}
                        </p>
                        <p className="text-xs text-black/55">{rev.membership}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Share Your Story Banner */}
            <Reveal delay={0.2}>
              <div className="mt-16 rounded-[2rem] border border-black/10 bg-[#0b0b0b] p-8 text-white sm:p-12">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                      {tp.verifiedMember}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                      {tp.shareStoryTitle}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                      {tp.shareStoryDesc}
                    </p>
                  </div>

                  <a
                    href={reviewWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-primary-hover)] sm:text-sm"
                  >
                    <MessageSquarePlus size={16} />
                    <span>{tp.shareStoryButton}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Milestone Impact Stats */}
        <section className="section-space bg-white">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={tp.milestonesEyebrow}
                title={tp.milestonesTitle}
                description={tp.milestonesDesc}
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tp.milestones.map((ms) => (
                <Reveal key={ms.label} delay={0.08}>
                  <div className="rounded-[1.5rem] border border-black/10 bg-[#f4f2ee] p-8 text-center transition-all hover:border-[var(--color-primary)] hover:bg-white hover:shadow-lg">
                    <div className="font-heading text-3xl font-extrabold tracking-tight text-[var(--color-primary)] sm:text-4xl">
                      {ms.metric}
                    </div>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-black/65 sm:text-sm">
                      {ms.label}
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
