"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChefHat,
  Sparkles,
  Award,
  Heart,
  Flame,
  Utensils,
  ArrowRight,
  ShieldCheck,
  Wheat,
} from "lucide-react";
import {
  staffMembers,
  type StaffMember,
} from "@/lib/restaurant-data";
import {
  CtaBanner,
  FilterPills,
  PageHero,
  Reveal,
  SectionHeading,
} from "@/components/pages/shared";
import { useLanguage } from "@/components/providers/language-provider";
import { getLocalizedStaff } from "@/lib/i18n-data";
import { cn } from "@/lib/utils";

type DepartmentFilter =
  | "all"
  | "Kitchen Masters"
  | "Bakery & Dolci"
  | "Bar & Craft"
  | "Hospitality";

function StaffCard({ member, index }: { member: StaffMember; index: number }) {
  const { t } = useLanguage();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
        delay: index * 0.05,
      }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] sm:rounded-[26px] bg-neutral-50 dark:bg-card border border-border/70 hover:border-brand-500/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Staff Photo - Generous height & face-centered framing so full face (eyes, nose, smile) is clearly visible on mobile & desktop */}
      <div className="relative aspect-[4/4.2] sm:aspect-auto sm:h-60 md:h-64 overflow-hidden bg-neutral-900 rounded-t-[22px] sm:rounded-t-[26px]">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover object-[center_24%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-black/65 backdrop-blur-md text-white border border-white/10 shadow-xs">
            <Sparkles className="size-2.5 sm:size-3 text-brand-400" />
            {member.badge}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-brand-500/90 text-white shadow-glow">
            {member.experience}
          </span>
        </div>
      </div>

      {/* Body Details: Clean layout with face completely unobstructed */}
      <div className="p-4 sm:p-5 flex flex-1 flex-col justify-between gap-3 bg-neutral-50 dark:bg-card">
        <div>
          <p className="text-[10px] sm:text-[11px] font-bold text-brand-500 uppercase tracking-wider mb-1">
            {member.department}
          </p>
          <h3 className="font-display font-black text-lg sm:text-xl text-foreground group-hover:text-brand-500 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">
            {member.role}
          </p>
        </div>

        <div className="space-y-1.5 text-xs pt-2 border-t border-border/50">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">{t("Keahlian:", "Specialty:")}</span>
            <span className="font-bold text-foreground truncate max-w-[150px]">
              {member.specialty}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">{t("Andalan:", "Signature:")}</span>
            <span className="font-semibold text-brand-500 truncate max-w-[150px]">
              {member.favoriteDish}
            </span>
          </div>
        </div>

        <Link
          href={`/staff/${member.id}`}
          scroll={true}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean; force?: boolean }) => void } }).__lenis;
              if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
            }
          }}
          className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl bg-surface dark:bg-muted/80 text-xs font-bold text-foreground group-hover:bg-brand-500 group-hover:text-white transition-all shadow-xs cursor-pointer"
        >
          <span>{t("Lihat Profil Lengkap", "Meet & Full Profile")}</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

export function StaffView() {
  const { t, language } = useLanguage();
  const [activeDept, setActiveDept] = useState<DepartmentFilter>("all");

  const localizedStaffMembers = useMemo(
    () => staffMembers.map((s) => getLocalizedStaff(s, language)),
    [language]
  );

  const executiveChef =
    localizedStaffMembers.find((s) => s.id === "deny-pratama") ?? localizedStaffMembers[0];

  const departmentOptions: { id: DepartmentFilter; label: string }[] = [
    { id: "all", label: t("Semua Tim", "All Team Members") },
    { id: "Kitchen Masters", label: t("Master Dapur", "Kitchen Masters") },
    { id: "Bakery & Dolci", label: t("Roti & Dolci", "Bakery & Dolci") },
    { id: "Bar & Craft", label: t("Bar & Racikan", "Bar & Craft") },
    { id: "Hospitality", label: t("Keramahan Tamu", "Hospitality & Care") },
  ];

  const culinaryPillars = [
    {
      icon: Flame,
      title: t("Ketelitian Api & Panas", "Fire & Heat Precision"),
      description: t(
        "Dari oven refractory 500°C hingga plat smash cast iron, kami memperlakukan api sebagai bahan hidup.",
        "From 900°F refractory ovens to 500°F cast iron smashes, we respect fire as a living ingredient."
      ),
    },
    {
      icon: Wheat,
      title: t("Fermentasi Alami Setiap Hari", "Whole Daily Fermentation"),
      description: t(
        "Fermentasi dingin 48 jam dan pasta telur segar yang digilas tiap pagi. Tanpa beku, tanpa tergesa-gesa.",
        "48-hour dough cold proofing and fresh morning egg pasta. Never frozen, never rushed."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("100% Dari Petani Lokal", "100% Farm-Traceable"),
      description: t(
        "Kami mengenal langsung peternak sapi perah, penggiling gandum, dan pekebun di balik setiap piring.",
        "We personally know the dairy farmers, flour millers, and vegetable growers behind each plate."
      ),
    },
    {
      icon: Heart,
      title: t("Semangat Keluarga & Keramahan", "Family Spirit & Hospitality"),
      description: t(
        "Tanpa kesan kaku atau berjarak. Setiap tamu disambut dengan kehangatan tulus dan layanan sigap.",
        "No haughty white-tablecloth atmosphere. Every diner is greeted with honest warmth and fast service."
      ),
    },
  ];

  const visibleStaff =
    activeDept === "all"
      ? localizedStaffMembers
      : localizedStaffMembers.filter((m) => {
          const original = staffMembers.find((s) => s.id === m.id);
          return original?.department === activeDept;
        });

  return (
    <>
      <PageHero
        crumb={t("Staf & Koki", "Staff & Chefs")}
        eyebrow={t("Para Pengrajin Kuliner", "The Culinary Artisans")}
        icon={<ChefHat className="size-3.5" />}
        before={t("Keahlian di balik setiap", "The masters behind every")}
        highlight="CRAFT"
        after={t("hidangan", "plate")}
        description={t(
          "Kenali para koki penuh dedikasi, pizzaiolo, ahli pasta sfoglina, dan tim penyaji yang mengubah bahan mentah segar menjadi momen bersantap istimewa.",
          "Meet the passionate chefs, pizzaiolos, pasta sfoglinas, and hospitality staff whose daily dedication turns simple raw ingredients into extraordinary moments."
        )}
      />

      {/* Founder & Executive Chef Spotlight */}
      <section className="relative w-full bg-white dark:bg-[#121215] py-12 sm:py-16 md:py-24 overflow-hidden border-b border-border/40">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="container-app relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
              {/* Chef Portrait - Generous framing so face, smile, and eyes are prominently visible on all screens */}
              <div className="lg:col-span-5 relative rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl aspect-[4/4.8] sm:aspect-auto sm:h-[420px] md:h-[480px] max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full group bg-neutral-900 border border-border/60">
                <img
                  src={executiveChef.image}
                  alt={executiveChef.name}
                  className="h-full w-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-25% to-transparent to-50% pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-500 text-white shadow-glow">
                    <Award className="size-3.5" />
                    {executiveChef.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                  <h3 className="font-display font-black text-xl sm:text-3xl text-white">
                    {executiveChef.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-0.5">
                    {executiveChef.experience} · {t("Alumni Caserta & Lyon", "Caserta & Lyon Alum")}
                  </p>
                </div>
              </div>

              {/* Chef Bio Details */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                  <Sparkles className="size-3.5" />
                  {t("Filosofi Dapur", "Kitchen Philosophy")}
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-foreground mb-4 leading-tight">
                  &ldquo;{executiveChef.quote}&rdquo;
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  {executiveChef.bio}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 pt-2 border-t border-border">
                  <div className="p-3 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-card">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">
                      {t("Keahlian", "Specialty")}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block">{executiveChef.specialty}</span>
                  </div>
                  <div className="p-3 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-card">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">
                      {t("Menu Andalan", "Signature")}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-brand-500 mt-0.5 block">{executiveChef.favoriteDish}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-3 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-card">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">
                      {t("Prinsip Dapur", "Kitchen Rule")}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block">
                      {t("Tanpa Kompromi", "Zero Short-cuts")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/staff/${executiveChef.id}`}
                    scroll={true}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean; force?: boolean }) => void } }).__lenis;
                        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand-500 text-white font-semibold text-xs sm:text-sm hover:bg-brand-600 hover:shadow-glow transition-all duration-200 cursor-pointer"
                  >
                    {t("Kenalan dengan Chef Deny", "Meet Chef Deny")}
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/menu"
                    scroll={true}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-foreground font-semibold text-xs sm:text-sm transition-all duration-200"
                  >
                    {t("Cicipi Hidangan Chef", "Taste Chef's Dishes")}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full Culinary Staff Roster */}
      <section className="relative w-full bg-background py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="container-app">
          <SectionHeading
            eyebrow={t("Kru Dapur Kami", "The Kitchen Crew")}
            title={t("Para Pengrajin di Balik Meja Saji", "The Craftsmen Behind the Pass")}
            description={t(
              "Dari master pembuat pizza hingga penyaji tamu, kenali tim berbakat kami yang berdedikasi menghadirkan pengalaman kuliner terbaik.",
              "From master pizzaiolos to dedicated front-of-house hosts, discover the talented team dedicated to your dining experience."
            )}
            className="mb-6 sm:mb-8"
          />

          {/* Department Filter Pills */}
          <FilterPills
            options={departmentOptions}
            active={activeDept}
            onChange={setActiveDept}
            className="mb-8 sm:mb-12"
          />

          {/* Staff Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {visibleStaff.map((member, index) => (
                <StaffCard key={member.id} member={member} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Culinary Standards / Pillars */}
      <section className="relative w-full bg-white dark:bg-[#121215] pt-10 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 overflow-hidden border-t border-border/40">
        <div className="container-app">
          <SectionHeading
            eyebrow={t("Kode Standar Dapur", "Our Kitchen Code")}
            title={t("Standar yang Tak Pernah Kami Tawar", "Standards We Never Compromise")}
            description={t(
              "Empat prinsip utama yang dipegang teguh oleh seluruh kru dapur kami dalam setiap sajian.",
              "The four foundational principles our entire kitchen team lives by every single service."
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {culinaryPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="h-full p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-card shadow-sm hover:shadow-md transition-shadow border border-border/50">
                  <div className="size-11 sm:size-12 rounded-xl sm:rounded-2xl bg-brand-500/10 flex items-center justify-center mb-3 sm:mb-4">
                    <pillar.icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <CtaBanner
              title={t("Tertarik mencicipi kreasi tim kami?", "Hungry to taste what our crew creates?")}
              description={t(
                "Jelajahi seluruh hidangan khas dan kreasi khusus di menu interaktif kami.",
                "Explore all signature dishes and custom creations on our interactive tasting menu."
              )}
              primary={{ label: t("Jelajahi Menu", "Explore The Menu"), href: "/menu" }}
              secondary={{ label: t("Kisah Kami", "Discover Our Story"), href: "/story" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
