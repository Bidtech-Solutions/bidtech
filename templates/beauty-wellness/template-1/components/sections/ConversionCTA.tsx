"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";

import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import { createWhatsAppUrl } from "@/lib/whatsapp";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function ConversionCTA() {
  const { t, locale } = useLanguage();
  const c = t.home.conversionCta;

  const waUrl = createWhatsAppUrl(
    locale === "en"
      ? `Hello Admin ${siteConfig.brand.name}, I would like to claim my free gym trial pass and inquire about club membership.`
      : `Halo Admin ${siteConfig.brand.name}, saya ingin klaim sesi trial gym gratis (free trial pass) dan konsultasi paket keanggotaan.`
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#0b0b0b] py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 size-[450px] -translate-y-1/2 rounded-full bg-[var(--color-primary)]/15 blur-[140px]"
      />

      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="rounded-full bg-[var(--color-primary)]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              {c.badge}
            </span>

            <h2 className="mt-6 font-heading text-[clamp(1.85rem,5vw,4.25rem)] break-words font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white">
              {c.title}
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
              {c.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 sm:px-8 sm:py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-[var(--color-primary-hover)] sm:text-sm"
              >
                {c.primaryCta}
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10 sm:text-sm"
              >
                <MessageCircle size={16} />
                {c.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
