"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Sparkles,
  Award,
  Heart,
  Share2,
  Quote,
  Clock,
  Utensils,
  Flame,
} from "lucide-react";
import {
  type StaffMember,
  staffMembers,
  menuItems,
} from "@/lib/restaurant-data";
import { CtaBanner } from "@/components/pages/shared";
import { useLanguage } from "@/components/providers/language-provider";
import { getLocalizedStaff } from "@/lib/i18n-data";
import { cn } from "@/lib/utils";

interface StaffDetailViewProps {
  staff: StaffMember;
}

export function StaffDetailView({ staff: rawStaff }: StaffDetailViewProps) {
  const { t, language } = useLanguage();
  const staff = useMemo(() => getLocalizedStaff(rawStaff, language), [rawStaff, language]);

  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);

  // Recommendations of other staff members (randomized client-side)
  const [otherStaff, setOtherStaff] = useState<StaffMember[]>([]);

  // Scroll to top immediately when viewing or switching staff
  useEffect(() => {
    if (typeof window !== "undefined") {
      const resetScroll = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean; force?: boolean }) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true });
        }
      };

      resetScroll();
      const t1 = setTimeout(resetScroll, 40);
      const t2 = setTimeout(resetScroll, 160);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [staff.id]);

  useEffect(() => {
    const others = staffMembers.map((s) => getLocalizedStaff(s, language)).filter((s) => s.id !== staff.id);
    const shuffled = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    setOtherStaff(shuffled);
  }, [staff.id, language]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  // Find linked menu dish if available
  const matchedDish = menuItems.find(
    (dish) =>
      dish.name.toLowerCase().includes(staff.favoriteDish.toLowerCase()) ||
      staff.favoriteDish.toLowerCase().includes(dish.name.toLowerCase()),
  );

  return (
    <div className="w-full bg-background min-h-screen pt-24 sm:pt-32 pb-4 sm:pb-6">
      <div className="container-app max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <Link
            href="/staff"
            scroll={true}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface dark:bg-muted border border-border text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="size-4 text-brand-500" />
            {t("Kembali ke Semua Staf", "Back to All Staff")}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              aria-label="Appreciate this chef"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer",
                isLiked
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-glow"
                  : "bg-surface dark:bg-muted border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <Heart className={cn("size-4", isLiked && "fill-current")} />
              <span>{likeCount} {t("Apresiasi", "Appreciations")}</span>
            </button>

            <button
              onClick={handleShare}
              aria-label="Share staff profile"
              className="size-9 rounded-full bg-surface dark:bg-muted border border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer relative"
            >
              <Share2 className="size-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500 text-white whitespace-nowrap shadow-md">
                  {t("Tautan Disalin!", "Link Copied!")}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ==================================================================
            MAIN STAFF DETAIL HERO (2 COLUMNS)
            ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left Column: Portrait & Key Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden bg-neutral-900 shadow-2xl border border-border/80 aspect-[4/4.8] sm:aspect-4/5 group max-w-sm sm:max-w-none mx-auto w-full">
              <img
                src={staff.image}
                alt={staff.name}
                className="h-full w-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 via-22% to-transparent to-50% pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                  <Sparkles className="size-3 text-brand-400" />
                  {staff.badge}
                </span>

                <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-brand-500 text-white shadow-glow">
                  {staff.experience}
                </span>
              </div>

              {/* Bottom Details on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand-400 uppercase tracking-widest mb-0.5">
                  <ChefHat className="size-3.5" />
                  {staff.department}
                </span>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {staff.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-200 mt-0.5">
                  {staff.role}
                </p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-4 rounded-2xl bg-surface dark:bg-card border border-border text-center">
                <Clock className="size-4 text-brand-500 mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  {t("Pengalaman", "Experience")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block truncate" title={staff.experience}>
                  {staff.experience}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-surface dark:bg-card border border-border text-center">
                <Flame className="size-4 text-orange-500 mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  {t("Departemen", "Department")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block truncate" title={staff.department}>
                  {staff.department}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-surface dark:bg-card border border-border text-center">
                <Award className="size-4 text-brand-500 mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  {t("Predikat", "Badge")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block truncate" title={staff.badge}>
                  {staff.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy Quote, Specialty, & Favorite Dish */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Department pill */}
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-eyebrow text-xs tracking-widest text-brand-500">
                  {t("Spesialis", "Specialist")} {staff.department}
                </span>
              </div>

              {/* Title & Role */}
              <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-tight mb-2">
                {staff.name}
              </h2>
              <p className="text-base sm:text-lg text-brand-500 font-semibold mb-6">
                {staff.role}
              </p>

              {/* Quote callout */}
              <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-500/10 via-orange-500/5 to-transparent border border-brand-500/20 mb-6 shadow-sm">
                <Quote className="size-8 text-brand-500/30 absolute top-3 right-4 pointer-events-none" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
                  {t("Filosofi Dapur & Kuliner:", "Kitchen & Culinary Philosophy:")}
                </span>
                <p className="text-sm sm:text-base font-medium text-foreground italic leading-relaxed">
                  &ldquo;{staff.quote}&rdquo;
                </p>
              </div>

              {/* Biography */}
              <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {t("Tentang", "About")} {staff.name.split(" ")[0]}
                </h3>
                <p>{staff.bio}</p>
                <p className="text-xs sm:text-sm text-foreground/80">
                  {t(
                    `Setiap hari sebelum pintu restoran dibuka untuk tamu, ${staff.name} dan tim dapur memastikan semua bahan segar, resep rahasia, serta standar kebersihan mencapai mutu tertinggi.`,
                    `Every day before the restaurant doors open to guests, ${staff.name} and the culinary brigade ensure all fresh produce, secret recipes, and sanitation standards meet the highest echelon of perfection.`
                  )}
                </p>
              </div>

              {/* Craft Specialty */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-card border border-border mb-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="size-8 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <Sparkles className="size-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-foreground">
                    {t("Keahlian & Keterampilan Dapur:", "Kitchen Specialty & Skills:")}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-medium pl-10">
                  {staff.specialty}
                </p>
              </div>

              {/* Favorite Dish Spotlight */}
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-500/5 border border-brand-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-glow">
                    <Utensils className="size-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      {t("Rekomendasi Menu Koki:", "Chef's Signature Recommendation:")}
                    </span>
                    <strong className="text-sm sm:text-base font-display font-bold text-foreground">
                      {staff.favoriteDish}
                    </strong>
                  </div>
                </div>

                <Link
                  href={matchedDish ? `/menu/${matchedDish.id}` : "/menu"}
                  scroll={true}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition-all shadow-glow whitespace-nowrap"
                >
                  <span>{t("Cicipi Menu Ini", "Taste This Dish")}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Back button links */}
            <div className="pt-6 border-t border-border flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                scroll={true}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand-500 text-white font-bold text-xs sm:text-sm hover:bg-brand-600 shadow-glow transition-all"
              >
                <Utensils className="size-4" />
                {t("Jelajahi Menu Makanan", "Explore Food Menu")}
              </Link>
              <Link
                href="/staff"
                scroll={true}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-surface dark:bg-muted border border-border text-foreground font-semibold text-xs sm:text-sm hover:bg-muted transition-all"
              >
                {t("Lihat Semua Anggota Tim", "View All Team Members")}
              </Link>
            </div>
          </div>
        </div>

        {/* ==================================================================
            KENALAN DENGAN STAFF LAINNYA (OTHER STAFF RECOMMENDATIONS)
            ================================================================== */}
        <section className="pt-10 sm:pt-14 pb-8 sm:pb-12 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ChefHat className="size-3.5" />
                {t("Tim Kuliner Deny Restaurant", "Deny Restaurant Culinary Team")}
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
                {t("Kenalan dengan Tim Lainnya", "Meet Other Team Members")}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {t(
                  "Temukan rekan koki, pengrajin adonan pizza, barista racikan, dan pemandu keramahan kami.",
                  "Discover our fellow chefs, dough artisans, mixologists, and hospitality hosts."
                )}
              </p>
            </div>

            <Link
              href="/staff"
              scroll={true}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }
              }}
              className="text-xs sm:text-sm font-semibold text-brand-500 hover:underline inline-flex items-center gap-1"
            >
              {t("Lihat Semua Tim", "View All Team")} ({staffMembers.length}) <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {otherStaff.map((other) => (
              <motion.article
                key={other.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-50 dark:bg-card border border-border shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/4.2] sm:aspect-auto sm:h-56 md:h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={other.image}
                    alt={other.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-[center_24%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-25% to-transparent to-55% pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white">
                    {other.department}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-500 text-white shadow-glow">
                    {other.experience}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-300 transition-colors">
                      {other.name}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {other.role}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-1 flex-col justify-between">
                  <div className="mb-3">
                    <span className="text-xs text-muted-foreground block truncate">
                      {t("Keahlian:", "Specialty:")} <strong className="text-foreground">{other.specialty}</strong>
                    </span>
                  </div>

                  <Link
                    href={`/staff/${other.id}`}
                    scroll={true}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                      }
                    }}
                    className="inline-flex items-center justify-between w-full py-2 px-3.5 rounded-xl bg-surface dark:bg-muted/80 text-xs font-semibold text-foreground group-hover:bg-brand-500 group-hover:text-white transition-colors"
                  >
                    <span>{t("Lihat Profil Lengkap", "Meet & View Profile")}</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div className="mt-6 sm:mt-8">
          <CtaBanner
            title={t("Tertarik mencicipi kreasi kuliner tim kami?", "Ready to taste our team's culinary creations?")}
            description={t(
              "Jelajahi menu lengkap kami atau pesan hidangan favorit untuk pengalaman bersantap istimewa.",
              "Explore our full menu or reserve a table for an unforgettable dining experience."
            )}
            primary={{ label: t("Lihat Seluruh Menu", "View All Menu"), href: "/menu" }}
            secondary={{ label: t("Kembali ke Staf", "Back to All Staff"), href: "/staff" }}
          />
        </div>
      </div>
    </div>
  );
}
