"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Flame,
  Utensils,
  ChefHat,
  Info,
  Check,
  Sparkles,
  Leaf,
  Wheat,
  Share2,
  Heart,
  Plus,
  Minus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  type MenuItem,
  menuItems,
  formatRupiah,
  getDishGallery,
} from "@/lib/restaurant-data";
import { CtaBanner } from "@/components/pages/shared";
import { useLanguage } from "@/components/providers/language-provider";
import {
  getLocalizedMenuItem,
  getCategoryName,
  getDietaryName,
} from "@/lib/i18n-data";
import { cn } from "@/lib/utils";

interface MenuDetailViewProps {
  item: MenuItem;
}

export function MenuDetailView({ item: rawItem }: MenuDetailViewProps) {
  const { t, language } = useLanguage();
  const item = useMemo(() => getLocalizedMenuItem(rawItem, language), [rawItem, language]);

  // Quantity counter state
  const [quantity, setQuantity] = useState(1);
  const [orderAdded, setOrderAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Recommendations: randomized client-side to prevent hydration mismatch
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const localizedRecommendations = useMemo(
    () => recommendations.map((m) => getLocalizedMenuItem(m, language)),
    [recommendations, language]
  );

  // Food image gallery & auto-slideshow state
  const gallery = useMemo(() => getDishGallery(item), [item]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Reset active image index when dish changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsPaused(false);
  }, [item.id]);

  // Automatic slideshow transition every 3.5 seconds
  useEffect(() => {
    if (isPaused || gallery.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % gallery.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, gallery.length]);

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Scroll to top immediately when viewing or switching dish
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
      const t2 = setTimeout(resetScroll, 150);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [item.id]);

  useEffect(() => {
    const others = menuItems.filter((m) => m.id !== item.id);
    const shuffled = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    setRecommendations(shuffled);
  }, [item.id]);

  // Form input state
  const [reviewerName, setReviewerName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState<string | null>(null);

  const handleOrder = () => {
    setOrderAdded(true);
    setTimeout(() => setOrderAdded(false), 2600);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const name = reviewerName.trim();
    const comment = newComment.trim();
    if (!name || !comment) return;

    // Format pesan WhatsApp untuk ulasan pelanggan (bilingual)
    const stars = "⭐".repeat(newRating);
    const waMessage =
      language === "en"
        ? `Hello Deny Restaurant! 🍽️\n\nI would like to share my review for *${item.name}*:\n\n👤 *Guest Name*: ${name}\n⭐ *Rating*: ${stars} (${newRating}/5 Stars)\n💬 *Feedback & Taste*:\n"${comment}"\n\nThank you for the delicious meal!`
        : `Halo Deny Restaurant! 🍽️\n\nSaya ingin mengirimkan ulasan untuk hidangan *${item.name}*:\n\n👤 *Nama Pelanggan*: ${name}\n⭐ *Penilaian*: ${stars} (${newRating}/5 Bintang)\n💬 *Ulasan & Rasa*:\n"${comment}"\n\nTerima kasih atas hidangannya!`;

    const waUrl = `https://api.whatsapp.com/send/?phone=%2B628136764825&text=${encodeURIComponent(
      waMessage,
    )}&type=phone_number&app_absent=0&wame_ctl=1`;

    setLastWaUrl(waUrl);

    // Buka WhatsApp otomatis di tab/aplikasi baru
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setReviewerName("");
    setNewComment("");
    setNewRating(5);
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 9000);
  };

  return (
    <div className="w-full bg-background min-h-screen pt-24 sm:pt-32 pb-4 sm:pb-6">
      <div className="container-app max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface dark:bg-muted border border-border text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="size-4 text-brand-500" />
            {t("Kembali ke Menu Lengkap", "Back to Full Menu")}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              aria-label="Add to favorites"
              className={cn(
                "size-9 rounded-full flex items-center justify-center border transition-all cursor-pointer",
                isLiked
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-500 shadow-glow"
                  : "bg-surface dark:bg-muted border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <Heart className={cn("size-4.5", isLiked && "fill-current")} />
            </button>
            <button
              onClick={handleShare}
              aria-label="Share this dish"
              className="size-9 rounded-full bg-surface dark:bg-muted border border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer relative"
            >
              <Share2 className="size-4.5" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500 text-white whitespace-nowrap shadow-md">
                  {t("Tautan Disalin!", "Link Copied!")}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ==================================================================
            MAIN FOOD DETAIL HERO (2 COLUMNS)
            ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start mb-16 sm:mb-20">
          {/* Left Column: Big Image & Gallery Thumbnails */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
            {/* Main Interactive Hero Image */}
            <div
              className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-900 shadow-2xl border border-border/80 aspect-4/3 sm:aspect-16/11 group select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={gallery[activeImageIndex]}
                  alt={`${item.name} - foto ${activeImageIndex + 1}`}
                  initial={{ opacity: 0.15, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

              {/* Top Floating Badges & Counter */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm pointer-events-auto">
                  <Sparkles className="size-3.5 text-brand-400" />
                  {getCategoryName(item.category, language)}
                </span>

                <div className="flex items-center gap-1.5 pointer-events-auto">
                  {item.popular && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-brand-500 text-white shadow-glow">
                      {t("Terlaris", "Best Seller")}
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                    {activeImageIndex + 1} / {gallery.length}
                  </span>
                </div>
              </div>

              {/* Prev / Next Photo Buttons */}
              <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPhoto();
                  }}
                  aria-label="Foto sebelumnya"
                  className="size-8 sm:size-9.5 rounded-full bg-black/55 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 pointer-events-auto cursor-pointer shadow-md"
                >
                  <ChevronLeft className="size-4.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextPhoto();
                  }}
                  aria-label="Foto berikutnya"
                  className="size-8 sm:size-9.5 rounded-full bg-black/55 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 pointer-events-auto cursor-pointer shadow-md"
                >
                  <ChevronRight className="size-4.5" />
                </button>
              </div>

              {/* Rating Card Bottom Left */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md pointer-events-auto">
                  <Star className="size-4 text-accent-500 fill-accent-500" />
                  <span className="text-sm font-bold">{item.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-300">/ 5.0</span>
                </div>

                {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/80 backdrop-blur-md text-white text-xs font-bold shadow-sm pointer-events-auto">
                    {t("Pedas", "Spicy")}
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="size-3 fill-current" />
                    ))}
                  </span>
                )}
              </div>
            </div>

            {/* 3 Thumbnails Gallery Grid (3 Photos) */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {gallery.map((photoUrl, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsPaused(true);
                      }}
                      className={cn(
                        "relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/3 border-2 transition-all cursor-pointer group focus:outline-none",
                        isActive
                          ? "border-brand-500 shadow-md ring-2 ring-brand-500/40 scale-[1.02] opacity-100"
                          : "border-border/80 hover:border-brand-500/60 opacity-65 hover:opacity-100",
                      )}
                      aria-label={`Lihat foto ${idx + 1} dari hidangan ${item.name}`}
                    >
                      <img
                        src={photoUrl}
                        alt={`${item.name} thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-brand-500/15 pointer-events-none" />
                      )}
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/75 text-white backdrop-blur-xs">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t("Klik foto kecil untuk ganti sudut gambar", "Click thumbnail to switch photo angle")}
                </span>
                <span className="text-[10px] hidden sm:inline text-muted-foreground/80">
                  {t("Ganti otomatis tiap 3.5 detik", "Auto-slideshow every 3.5s")}
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-4 rounded-2xl bg-surface dark:bg-card border border-border text-center">
                <Clock className="size-4 text-brand-500 mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  {t("Waktu Siap", "Prep Time")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block">{item.prepTime}</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-surface dark:bg-card border border-border text-center">
                <Flame className="size-4 text-orange-500 mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  {t("Kalori", "Energy")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block">{item.calories}</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-surface dark:bg-card border border-border text-center">
                <Utensils className="size-4 text-brand-500 mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  {t("Porsi", "Portion")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block truncate">
                  {item.portion || t("1 Porsi", "1 Serving")}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Ingredients, Chef Note & Order CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-eyebrow text-xs tracking-widest">
                  {t("Stasiun", "Station")} {getCategoryName(item.category, language)}
                </span>
                {item.tags?.map((tTag) => (
                  <span
                    key={tTag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400"
                  >
                    {tTag === "vegetarian" && <Leaf className="size-3" />}
                    {tTag === "gluten-free" && <Wheat className="size-3" />}
                    {tTag === "spicy" && <Flame className="size-3" />}
                    {getDietaryName(tTag, language)}
                  </span>
                ))}
              </div>

              {/* Title & Price */}
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-tight mb-3">
                {item.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-black text-3xl sm:text-4xl text-gradient-brand">
                  {formatRupiah(item.price * quantity)}
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-muted-foreground">
                    ({formatRupiah(item.price)} x {quantity})
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {t("pajak termasuk · dimasak sesuai pesanan", "tax included · made to order")}
                </span>
              </div>

              {/* Description & Story */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>

              {item.story && (
                <p className="text-xs sm:text-sm text-foreground/80 italic leading-relaxed mb-5 border-l-2 border-brand-500 pl-3">
                  &ldquo;{item.story}&rdquo;
                </p>
              )}

              {/* Fresh Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5">
                    {t("Bahan Baku Pilihan:", "Fresh Key Ingredients:")}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-card border border-border/80 text-foreground"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chef's Culinary Secret */}
              {item.chefNote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6 flex items-start gap-3.5">
                  <ChefHat className="size-5 sm:size-6 text-brand-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-foreground block">
                      {t("Rahasia Dapur Koki:", "Chef's Culinary Secret:")}
                    </span>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                      &ldquo;{item.chefNote}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Allergens Notice */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 p-3 rounded-xl bg-neutral-100 dark:bg-muted/50">
                  <Info className="size-4 text-amber-500 shrink-0" />
                  <span>
                    <strong className="text-foreground">
                      {t("Catatan Alergen:", "Allergens Notice:")}{" "}
                    </strong>
                    {item.allergens.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Selector & Order Button Bar */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between sm:justify-start gap-3 p-1.5 rounded-full bg-neutral-100 dark:bg-muted border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="size-8 rounded-full bg-background text-foreground flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="font-display font-bold text-sm px-2 select-none min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="size-8 rounded-full bg-background text-foreground flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Order Button */}
              <button
                type="button"
                onClick={handleOrder}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full font-bold text-sm text-white shadow-glow transition-all duration-300 cursor-pointer",
                  orderAdded
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-brand-500 hover:bg-brand-600 hover:scale-[1.02]",
                )}
              >
                {orderAdded ? (
                  <>
                    <Check className="size-4.5" />
                    {t(
                      `Dipesan ke Meja (${quantity} Porsi)!`,
                      `Ordered to Table (${quantity} Portion)!`
                    )}
                  </>
                ) : (
                  <>
                    <Utensils className="size-4.5" />
                    {t("Pesan Menu Ini", "Order This Dish")} ({formatRupiah(item.price * quantity)})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            REKOMENDASI MAKANAN LAINNYA (RANDOMIZED CARDS)
            ================================================================== */}
        <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <p className="text-eyebrow text-xs">{t("Pilihan Koki Hari Ini", "Today's Chef Selection")}</p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
                {t("Rekomendasi Menu Lainnya", "Other Recommendations")}
              </h2>
            </div>
            <Link
              href="/menu"
              className="text-xs sm:text-sm font-semibold text-brand-500 hover:underline inline-flex items-center gap-1"
            >
              {t("Jelajahi Semua Menu", "Explore All Menu")} ({menuItems.length}) <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {localizedRecommendations.map((rec) => (
              <motion.article
                key={rec.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-50 dark:bg-card border border-border shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden bg-neutral-900">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white">
                    {getCategoryName(rec.category, language)}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500 text-white shadow-glow">
                    {formatRupiah(rec.price)}
                  </span>
                  <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-1 text-xs font-semibold">
                    <Star className="size-3.5 text-accent-500 fill-accent-500" />
                    {rec.rating.toFixed(1)}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground group-hover:text-brand-500 transition-colors line-clamp-1 mb-1">
                      {rec.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {rec.description}
                    </p>
                  </div>

                  <Link
                    href={`/menu/${rec.id}`}
                    scroll={true}
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean; force?: boolean }) => void } }).__lenis;
                        if (lenis) {
                          lenis.scrollTo(0, { immediate: true, force: true });
                        }
                      }
                    }}
                    className="mt-2 inline-flex items-center justify-between w-full py-2 px-3.5 rounded-xl bg-surface dark:bg-muted/80 text-xs font-semibold text-foreground group-hover:bg-brand-500 group-hover:text-white transition-colors"
                  >
                    <span>{t("Lihat Detail Hidangan", "View Dish Details")}</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ==================================================================
            KOLOM KIRIM ULASAN LANGSUNG KE WHATSAPP
            ================================================================== */}
        <section className="pt-12 sm:pt-16 pb-8 border-t border-border">
          <div className="max-w-3xl mx-auto">
            {/* Reviews Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <FaWhatsapp className="size-3.5 text-emerald-500" />
                {t("Langsung ke WhatsApp", "Direct to WhatsApp")}
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground">
                {t("Kirim Ulasan & Pendapat Rasa", "Send Review & Taste Feedback")}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-lg mx-auto">
                {t(
                  "Pendapat Anda sangat berharga bagi kami. Setiap ulasan langsung diteruskan ke WhatsApp resmi Deny Restaurant untuk peningkatan kualitas rasa dan layanan.",
                  "Your feedback is invaluable to us. Every review is forwarded directly to Deny Restaurant's official WhatsApp to elevate taste and dining service."
                )}
              </p>
            </div>

            {/* Interactive Comment Form */}
            <div className="p-5 sm:p-7 rounded-[24px] bg-neutral-50 dark:bg-card border border-border shadow-sm">
              <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-1">
                {t("Tulis Ulasan Anda", "Write Your Review")}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                {t(
                  `Bagikan pengalaman bersantap Anda untuk menu ${item.name}.`,
                  `Share your tasting experience for ${item.name}.`
                )}
              </p>

              {submittedFeedback && (
                <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-foreground text-xs sm:text-sm font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="size-4.5 stroke-[3]" />
                    </div>
                    <div>
                      <strong className="block text-foreground text-xs sm:text-sm font-bold">
                        {t("Ulasan Siap Dikirim ke WhatsApp!", "Review Ready to Send to WhatsApp!")}
                      </strong>
                      <span className="text-[11px] sm:text-xs text-muted-foreground block mt-0.5">
                        {t(
                          "Pesan ulasan Anda telah disiapkan dan diteruskan ke WhatsApp resmi Deny Restaurant (+628136764825).",
                          "Your review message has been prepared and forwarded to Deny Restaurant's official WhatsApp (+628136764825)."
                        )}
                      </span>
                    </div>
                  </div>
                  {lastWaUrl && (
                    <a
                      href={lastWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition-colors shadow-glow"
                    >
                      <FaWhatsapp className="size-4" />
                      {t("Buka WhatsApp", "Open WhatsApp")}
                    </a>
                  )}
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t("Penilaian Bintang", "Star Rating")}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating ?? newRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setNewRating(star)}
                          className="size-8 rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={cn(
                              "size-5 transition-colors",
                              active
                                ? "text-accent-500 fill-accent-500"
                                : "text-gray-300 dark:text-gray-600",
                            )}
                          />
                        </button>
                      );
                    })}
                    <span className="text-xs font-bold text-foreground ml-2">
                      {hoverRating ?? newRating} / 5 {t("Bintang", "Stars")}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewerName" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t("Nama Anda", "Your Name")}
                  </label>
                  <input
                    id="reviewerName"
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder={t("Contoh: Sarah Wijaya", "e.g. Sarah Wijaya")}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="commentText" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t("Ulasan & Catatan Rasa Anda", "Review & Taste Comments")}
                  </label>
                  <textarea
                    id="commentText"
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t(
                      "Bagaimana rasa, tekstur, atau aroma hidangan ini?...",
                      "How was the flavor, texture, or aroma of this dish?..."
                    )}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-glow transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <FaWhatsapp className="size-4" />
                    {t("Kirim Ulasan ke WhatsApp", "Submit Review & Send to WhatsApp")}
                  </button>
                  <span className="text-[11px] text-muted-foreground">
                    * {t("Diteruskan langsung ke WhatsApp resmi (+628136764825)", "Automatically forwards to official WhatsApp (+628136764825)")}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div className="mt-6 sm:mt-8">
          <CtaBanner
            title={t("Menginginkan cita rasa lainnya?", "Craving other flavors?")}
            description={t(
              "Jelajahi seluruh station dapur kami atau kenali para koki di balik kreasi istimewa ini.",
              "Explore all our kitchen stations or meet the chefs behind these creations."
            )}
            primary={{ label: t("Kembali ke Menu Lengkap", "Back to Full Menu"), href: "/menu" }}
            secondary={{ label: t("Kenali Koki Kami", "Meet Our Chefs"), href: "/staff" }}
          />
        </div>
      </div>
    </div>
  );
}
