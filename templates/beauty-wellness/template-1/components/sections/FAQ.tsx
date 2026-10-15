"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function FAQ() {
  const { t } = useLanguage();
  const fq = t.home.faq;
  const items = fq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-space bg-[#f4f2ee]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={fq.eyebrow}
            title={fq.title}
            description={fq.description}
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={faq.question} delay={index * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:border-black/20">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-heading text-base font-bold uppercase tracking-tight text-[#0b0b0b] sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={[
                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f4f2ee] text-[#0b0b0b] transition-transform duration-300",
                        isOpen ? "rotate-45 bg-[var(--color-primary)] text-white" : "",
                      ].join(" ")}
                    >
                      <Plus size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-black/5 px-6 pb-6 pt-2 text-sm leading-relaxed text-black/70 sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
