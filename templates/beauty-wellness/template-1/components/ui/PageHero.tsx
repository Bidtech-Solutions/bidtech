"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  /** Foto latar hero. Jika kosong, hero tampil hitam polos seperti sebelumnya. */
  image?: string;
  imageAlt?: string;
  /** CSS object-position untuk mengatur fokus foto, contoh: "center 40%" */
  imagePosition?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  stats,
  image,
  imageAlt = "",
  imagePosition = "center",
}: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative isolate w-full max-w-full overflow-hidden bg-[#0b0b0b] pb-12 pt-28 text-white sm:pb-20 sm:pt-36 md:pb-28 md:pt-44">
      {/* Background photo: tetap gelap, tetapi gambar tetap terlihat */}
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: imagePosition }}
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0b0b]/90 via-[#0b0b0b]/60 to-[#0b0b0b]/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b0b0b] via-transparent to-[#0b0b0b]/55"
          />
        </>
      )}

      {/* Ambient warm accent glow */} 
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 bottom-0 size-[400px] rounded-full bg-[var(--color-primary)]/10 blur-[140px]" />

      <Container>
        <div className="relative z-10">
          {/* Breadcrumb */}
          <Reveal>
            <div className="mb-8 flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[var(--color-primary)]"
              >
                <ArrowLeft size={14} />
                {t.nav.breadcrumbHome}
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                {eyebrow}
              </span>
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <Reveal delay={0.05}>
              <div className="max-w-3xl">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--color-primary)]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65 sm:text-xs">
                    {eyebrow}
                  </span>
                  {badge && (
                    <span className="rounded-full bg-[var(--color-primary)]/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      {badge}
                    </span>
                  )}
                </div>

                <h1 className="font-heading text-[clamp(2rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] sm:tracking-[-0.055em] break-words text-white">
                  {title}
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                  {description}
                </p>
              </div>
            </Reveal>

            {stats && stats.length > 0 && (
              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-6 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-heading text-3xl font-bold tracking-tight text-[var(--color-primary)] md:text-4xl">
                        {s.value}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-white/60">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
