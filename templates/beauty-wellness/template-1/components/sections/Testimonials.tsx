"use client";

import { Quote, Star } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function Testimonials() {
  const { t, locale } = useLanguage();
  const test = t.home.testimonials;
  const items = test.items;

  return (
    <section id="testimoni" className="section-space scroll-mt-20 bg-[#f4f2ee]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={test.eyebrow}
            title={test.title}
            description={test.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {items.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-[2rem] border border-black/10 bg-white p-8 shadow-xs sm:p-10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[var(--color-primary)]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={28} className="text-black/15" />
                  </div>

                  <p className="mt-6 text-base font-normal leading-relaxed text-black/80 sm:text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <p className="font-heading text-lg font-bold uppercase tracking-tight text-[#0b0b0b]">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                    {testimonial.membership}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/testimoni"
            className="inline-flex items-center gap-3 rounded-full bg-[#0b0b0b] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-primary)]"
          >
            {locale === "en" ? "View Member Stories" : "Lihat Cerita Member"}
          </Link>
        </div>
      </Container>
    </section>
  );
}
