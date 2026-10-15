"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { siteConfig } from "@/data/site";

import { Container } from "@/components/ui/Container";
import { Stats } from "@/components/sections/Stats";
import { useLanguage } from "@/context/LanguageContext";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const { t, locale } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const whatsappUrl = createWhatsAppUrl(
    locale === "en"
      ? `Hello Admin ${siteConfig.brand.name}, I am interested in starting a gym membership at ${siteConfig.brand.name}. Could you please share the package details and registration steps?`
      : `Halo Admin ${siteConfig.brand.name}, saya tertarik untuk mulai membership gym di ${siteConfig.brand.name}. Mohon info pilihan paket dan panduan pendaftarannya.`
  );

  const duration = shouldReduceMotion ? 0 : 0.9;

  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "12%"]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 80]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, 0]
  );  

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative lg:min-h-[100svh]"
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden bg-black">
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : { y: backgroundY }
          }
          className="absolute -inset-[8%] will-change-transform"
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scale: 1.08,
                  }
            }
            animate={{
              scale: 1,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={siteConfig.hero.image}
              alt="Interior gym modern dengan peralatan latihan profesional"
              fill
              priority
              quality={82}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0b0b] to-transparent sm:h-44 lg:h-60" />
      </div>

      {/* =====================================
          HERO CONTENT
      ====================================== */}

      <Container className="relative flex flex-col items-start pb-8 pt-[6.5rem] text-white sm:pt-28 md:pb-16 lg:min-h-[100svh] lg:flex-row lg:items-center lg:pb-44 lg:pt-36">
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: contentY,
                  opacity: contentOpacity,
                }
          }
          className="w-full will-change-transform"
        >
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration,
              delay: shouldReduceMotion
                ? 0
                : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:mb-6 sm:text-xs"
          >
            <span className="h-px w-8 bg-[var(--color-primary)]" />

            {t.home.hero.eyebrow}
          </motion.p>

          <div className="max-w-[1100px]">
            <div className="overflow-hidden">
              <motion.h1
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        y: "110%",
                      }
                }
                animate={{
                  y: 0,
                }}
                transition={{
                  duration,
                  delay: shouldReduceMotion
                    ? 0
                    : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-heading text-[clamp(2.15rem,6.8vw,7.8rem)] font-bold uppercase leading-[0.88] sm:leading-[0.82] tracking-[-0.035em] sm:tracking-[-0.065em] break-words"
              >
                {t.home.hero.title1}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        y: "110%",
                      }
                }
                animate={{
                  y: 0,
                }}
                transition={{
                  duration,
                  delay: shouldReduceMotion
                    ? 0
                    : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-heading text-[clamp(2.15rem,6.8vw,7.8rem)] font-bold uppercase leading-[0.88] sm:leading-[0.82] tracking-[-0.035em] sm:tracking-[-0.065em] break-words text-[var(--color-primary)]"
              >
                {t.home.hero.title2}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.75,
              delay: shouldReduceMotion
                ? 0
                : 0.58,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-xl sm:mt-7 md:mt-8"
          >
            <p className="text-sm leading-7 text-white/70 sm:text-base md:text-lg md:leading-8">
              {t.home.hero.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group inline-flex min-h-12",
                  "items-center justify-center gap-3",
                  "rounded-full",
                  "bg-[var(--color-primary)]",
                  "px-6 text-sm font-semibold",
                  "transition-all duration-300",
                  "hover:bg-[var(--color-primary-hover)]",
                  "sm:min-h-14 sm:px-7",
                ].join(" ")}
              >
                {t.home.hero.primaryCta}

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href={siteConfig.hero.secondaryCta.href}
                className={[
                  "group inline-flex min-h-12",
                  "items-center justify-center gap-3",
                  "rounded-full border border-white/30",
                  "bg-white/5 px-6",
                  "text-sm font-semibold",
                  "backdrop-blur-sm",
                  "transition-all duration-300",
                  "hover:border-white",
                  "hover:bg-white hover:text-black",
                  "sm:min-h-14 sm:px-7",
                ].join(" ")}
              >
                {t.home.hero.secondaryCta}

                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative vertical label */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: shouldReduceMotion
              ? 0
              : 1,
            duration: shouldReduceMotion
              ? 0
              : 0.6,
          }}
          className="absolute bottom-40 right-0 hidden items-center gap-3 xl:flex"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
            Scroll to explore
          </span>

          <span className="h-px w-12 bg-white/30" />
        </motion.div>

        {/* Mobile/Tablet in-flow Stats (prevents overlap with CTA buttons) */}
        <div className="mt-8 w-full sm:mt-10 lg:hidden">
          <Stats isMobileFlow />
        </div>
      </Container>

      {/* Desktop floating Stats panel */}
      <div className="absolute inset-x-0 bottom-0 hidden translate-y-1/2 lg:block">
        <Container>
          <Stats />
        </Container>
      </div>
    </section>
  );
}