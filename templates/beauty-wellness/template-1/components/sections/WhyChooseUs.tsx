"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();
  const w = t.home.whyChooseUs;
  const items = w.items;

  return (
    <section id="keunggulan" className="section-space scroll-mt-20 bg-[#f4f2ee]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={w.eyebrow}
            title={w.title}
            description={w.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08}>
              <div className="group h-full rounded-[1.75rem] border border-black/10 bg-white p-8 shadow-xs transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-lg">
                <span className="font-heading text-4xl font-bold text-[var(--color-primary)]">
                  {benefit.number}
                </span>

                <h3 className="mt-6 font-heading text-xl font-bold uppercase tracking-tight text-[#0b0b0b]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-black/65">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
