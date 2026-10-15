"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Swirls } from "@/components/ui/hero-section";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { RevealText } from "@/components/ui/reveal-text";
import { headingImages } from "@/lib/restaurant-data";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

/* Same motion language as the landing page sections */
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 28 },
  },
};

/* --------------------------------------------------------------------------
   Reveal — fade/slide-up when scrolled into view
   -------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   PageHero — header used at the top of every sub-page
   -------------------------------------------------------------------------- */
interface PageHeroProps {
  eyebrow: string;
  icon?: ReactNode;
  before: string;
  highlight: string;
  after?: string;
  description: string;
  crumb: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  icon,
  before,
  highlight,
  after,
  description,
  crumb,
  children,
}: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-background pt-32 sm:pt-40 pb-8 sm:pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Swirls />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[420px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[140px] pointer-events-none"
      />

      <motion.div
        className="container-app relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.nav
          variants={itemVariants}
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6"
        >
          <Link href="/" className="hover:text-brand-500 transition-colors">
            {t("Beranda", "Home")}
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">{crumb}</span>
        </motion.nav>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 shadow-xs"
        >
          {icon}
          {eyebrow}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground text-balance mb-3 sm:mb-5 leading-tight"
        >
          {before}{" "}
          <DynamicTextSlider>
            <RevealText
              text={highlight}
              textColor="text-foreground"
              overlayColor="text-brand-500"
              letterImages={headingImages}
              className="font-display"
            />
          </DynamicTextSlider>
          {after ? <> {after}</> : null}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        {children ? (
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   SectionHeading
   -------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p variants={itemVariants} className="text-eyebrow mb-2 sm:mb-4">
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground text-balance mb-3 sm:mb-4 leading-tight"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   CtaBanner — same callout style as the landing categories section
   -------------------------------------------------------------------------- */
export function CtaBanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Reveal>
      <div className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-500/10 via-orange-500/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 max-w-5xl mx-auto shadow-sm">
        <div className="text-center md:text-left">
          <h4 className="font-display font-bold text-lg sm:text-xl text-foreground mb-1">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-2.5 sm:gap-3 shrink-0">
          {secondary ? (
            <Link
              href={secondary.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-foreground font-semibold text-sm transition-all duration-200"
            >
              {secondary.label}
            </Link>
          ) : null}
          <Link
            href={primary.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 hover:shadow-glow transition-all duration-200"
          >
            {primary.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
   FilterPills — same pill style as the landing category filter
   -------------------------------------------------------------------------- */
export function FilterPills<T extends string>({
  options,
  active,
  onChange,
  className,
}: {
  options: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = active === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-foreground text-background shadow-md scale-105"
                : "bg-surface dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 shadow-xs",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
