"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  Leaf,
  Search,
  Wheat,
  X,
  Utensils,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react";
import {
  categories,
  menuItems,
  formatRupiah,
  type Category,
  type CategoryId,
  type DietaryTag,
  type MenuItem,
} from "@/lib/restaurant-data";
import { CtaBanner, PageHero } from "@/components/pages/shared";
import { useLanguage } from "@/components/providers/language-provider";
import { getLocalizedCategory, getLocalizedMenuItem } from "@/lib/i18n-data";
import { cn } from "@/lib/utils";

type Filter = CategoryId | "all";

const categoryIds = categories.map((c) => c.id) as CategoryId[];

const dietary: {
  id: DietaryTag;
  labelId: string;
  labelEn: string;
  icon: typeof Leaf;
  badge: string;
}[] = [
  {
    id: "vegetarian",
    labelId: "Vegetarian",
    labelEn: "Vegetarian",
    icon: Leaf,
    badge: "bg-success/10 text-success",
  },
  {
    id: "spicy",
    labelId: "Pedas",
    labelEn: "Spicy",
    icon: Flame,
    badge: "bg-destructive/10 text-destructive",
  },
  {
    id: "gluten-free",
    labelId: "Bebas Gluten",
    labelEn: "Gluten-Free",
    icon: Wheat,
    badge: "bg-warning/15 text-accent-700 dark:text-warning",
  },
];

const dietaryMeta = Object.fromEntries(dietary.map((d) => [d.id, d])) as Record<
  DietaryTag,
  (typeof dietary)[number]
>;

/* ==========================================================================
   CATEGORY HERO SHOWCASE CARD
   ========================================================================== */
function CategoryCard({
  category,
  isActive,
  onSelect,
}: {
  category: Category;
  isActive: boolean;
  onSelect: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer select-none rounded-[22px] overflow-hidden transition-all duration-300 shrink-0 w-[240px] sm:w-[260px] md:w-[280px] h-[190px] sm:h-[210px]",
        isActive
          ? "ring-2 ring-brand-500 scale-[1.02] shadow-glow"
          : "opacity-85 hover:opacity-100 hover:scale-[1.01] shadow-md",
      )}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 z-10", category.gradient)} />
      </div>

      <div className="relative z-20 h-full p-4 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/50 backdrop-blur-md">
            {category.tagIcon === "flame" && <Flame className="size-3 text-brand-500 fill-brand-500" />}
            {category.tagIcon === "award" && <Award className="size-3 text-accent-400" />}
            {category.tagIcon === "sparkles" && <Sparkles className="size-3 text-brand-300" />}
            {category.tag}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500 text-white">
            {category.itemsCount}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-brand-400 uppercase tracking-widest">
            {category.subtitle}
          </p>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-brand-300 transition-colors">
            {category.title}
          </h3>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs">
            <span className="text-gray-300 text-[11px] truncate max-w-[130px]">
              {t("Pilihan:", "Top:")} {category.popularDish}
            </span>
            <span className="font-bold text-brand-400">{category.priceStart}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MENU ITEM ROW WITH DIRECT LINK TO DEDICATED DETAIL PAGE
   ========================================================================== */
function MenuRow({ item }: { item: MenuItem }) {
  const { t, language } = useLanguage();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="list-none"
    >
      <Link
        href={`/menu/${item.id}`}
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
        className="group flex gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-card border border-transparent hover:border-brand-500/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative select-none h-full"
      >
        {/* Food thumbnail with hover zoom */}
        <div className="relative size-22 sm:size-28 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-200 dark:bg-neutral-800">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Quick View Pill Overlay on thumbnail */}
          <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[11px] font-bold tracking-wide transition-opacity backdrop-blur-xs">
            {t("Lihat Detail", "View Details")}
          </span>
        </div>

        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display font-bold text-base sm:text-lg leading-snug group-hover:text-brand-500 transition-colors">
                {item.name}
              </h3>
              <span className="font-display font-extrabold text-base sm:text-lg text-brand-500 shrink-0">
                {formatRupiah(item.price)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 mt-2 border-t border-border/40">
            <div className="flex flex-wrap items-center gap-1.5">
              {item.popular && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  {t("Populer", "Popular")}
                </span>
              )}
              {item.tags?.map((tag) => {
                const meta = dietaryMeta[tag];
                return (
                  <span
                    key={tag}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold",
                      meta.badge,
                    )}
                  >
                    <meta.icon className="size-3" />
                    {language === "en" ? meta.labelEn : meta.labelId}
                  </span>
                );
              })}
            </div>

            <span className="text-[11px] font-semibold text-brand-500 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              {t("Lihat Detail Hidangan", "View Dish Details")} <ArrowRight className="size-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

/* ==========================================================================
   MAIN MENU VIEW
   ========================================================================= */
export function MenuView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { t, language } = useLanguage();

  const localizedCategories = useMemo(
    () => categories.map((c) => getLocalizedCategory(c, language)),
    [language]
  );

  const localizedMenuItems = useMemo(
    () => menuItems.map((m) => getLocalizedMenuItem(m, language)),
    [language]
  );

  const param = params.get("category");
  const active: Filter = categoryIds.includes(param as CategoryId)
    ? (param as CategoryId)
    : "all";

  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<DietaryTag[]>([]);

  const setCategory = (id: Filter) => {
    router.replace(id === "all" ? pathname : `${pathname}?category=${id}`, {
      scroll: false,
    });
  };

  const toggleDiet = (id: DietaryTag) =>
    setDiet((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return localizedMenuItems.filter((item) => {
      if (active !== "all" && item.category !== active) return false;
      if (diet.length && !diet.every((d) => item.tags?.includes(d))) return false;
      if (
        q &&
        !`${item.name} ${item.description} ${item.ingredients?.join(" ") || ""}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [active, diet, query, localizedMenuItems]);

  const groups = localizedCategories
    .map((category) => ({
      category,
      items: filtered.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0);

  const hasFilters = query !== "" || diet.length > 0;

  return (
    <>
      <PageHero
        crumb={t("Menu & Kategori", "Menu & Categories")}
        eyebrow={t("Menu Kuliner Kami", "Our Culinary Menu")}
        icon={<Utensils className="size-3.5" />}
        before={t("Dibuat sesuai selera yang Anda", "Built around what you")}
        highlight="CRAVE"
        description={t(
          "Jelajahi seluruh station dapur khusus kami: pizza tungku adonan fermentasi, burger smash, pasta telur buatan tangan, hidangan penutup, dan racikan minuman. Klik hidangan apa pun untuk melihat resep, ulasan WhatsApp resmi, dan rekomendasi koki.",
          "Explore all our specialized kitchen stations: wood-fired sourdough pizza, smash burgers, handmade pasta, desserts, and artisan drinks. Click any dish to view its dedicated page, recipe secrets, WhatsApp reviews, and chef recommendations."
        )}
      />

      {/* Visual Category Showcase */}
      <section className="relative w-full bg-background pt-2 pb-6 overflow-hidden">
        <div className="container-app">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-500 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {t("Jelajahi Berdasarkan Kategori Menu", "Browse By Kitchen Station")}
              </h2>
            </div>
            {active !== "all" && (
              <button
                onClick={() => setCategory("all")}
                className="text-xs font-semibold text-brand-500 hover:underline cursor-pointer"
              >
                {t("Reset ke Semua", "Reset to All")} ({localizedMenuItems.length} {t("menu", "dishes")})
              </button>
            )}
          </div>

          {/* Horizontal scroll of category stations */}
          <div className="flex items-center gap-3.5 overflow-x-auto pb-4 pt-1 scrollbar-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
            {localizedCategories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isActive={active === cat.id}
                onSelect={() => setCategory(active === cat.id ? "all" : cat.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section
        id="menu"
        className="relative w-full bg-white dark:bg-[#121215] pb-6 sm:pb-8 md:pb-10 pt-4"
      >
        <div
          aria-hidden="true"
          className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="container-app relative">
          {/* Sticky Toolbar */}
          <div className="sticky top-20 sm:top-24 z-30 -mt-2 mb-8 sm:mb-12">
            <div className="rounded-2xl sm:rounded-3xl bg-background/85 backdrop-blur-xl border border-border shadow-xl p-2.5 sm:p-3 max-w-5xl mx-auto">
              {/* Category Pills Bar */}
              <div
                role="tablist"
                aria-label="Menu categories"
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hidden pb-2"
              >
                {[
                  { id: "all" as Filter, label: t("Semua Kategori", "All Stations") },
                  ...localizedCategories.map((c) => ({
                    id: c.id as Filter,
                    label: c.shortTitle,
                  })),
                ].map((tab) => {
                  const isActive = active === tab.id;
                  const count =
                    tab.id === "all"
                      ? localizedMenuItems.length
                      : localizedMenuItems.filter((m) => m.category === tab.id).length;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => setCategory(tab.id)}
                      className={cn(
                        "shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer",
                        isActive
                          ? "bg-foreground text-background shadow-md scale-105"
                          : "bg-surface dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 shadow-xs",
                      )}
                    >
                      {tab.label}
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                          isActive
                            ? "bg-background/20 text-background"
                            : "bg-foreground/5 text-muted-foreground",
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search + Dietary Toggles */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3 pt-1 border-t border-border/40">
                <label className="relative flex-1">
                  <span className="sr-only">
                    {t("Cari hidangan atau bahan", "Search dishes or ingredients")}
                  </span>
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(
                      "Cari hidangan, bahan (contoh: truffle, burrata)...",
                      "Search dishes, ingredients (e.g. truffle, burrata)..."
                    )}
                    className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl bg-neutral-100 dark:bg-white/5 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label={t("Hapus pencarian", "Clear search")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 size-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </label>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {dietary.map((option) => {
                    const on = diet.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleDiet(option.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                          on
                            ? "bg-brand-500 text-white shadow-glow"
                            : "bg-neutral-100 dark:bg-white/5 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <option.icon className="size-3.5" />
                        {language === "en" ? option.labelEn : option.labelId}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items Container */}
          <div className="max-w-6xl mx-auto min-h-[320px]">
            <div className="flex items-center justify-between mb-6 px-1">
              <p className="text-xs sm:text-sm text-muted-foreground" aria-live="polite">
                {t("Menampilkan", "Showing")}{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {t("hidangan", "dishes")}
                {active !== "all" && (
                  <>
                    {" "}
                    {t("di kategori", "in")}{" "}
                    <span className="text-brand-500 font-semibold">
                      {localizedCategories.find((c) => c.id === active)?.title}
                    </span>
                  </>
                )}
              </p>
              <span className="text-xs text-brand-500 font-medium hidden sm:inline-block">
                {t(
                  "✨ Klik hidangan untuk melihat resep lengkap & alergen",
                  "✨ Click any dish to inspect full recipe & allergens"
                )}
              </span>
            </div>

            {groups.length === 0 ? (
              <div className="text-center py-16 sm:py-24">
                <div className="mx-auto mb-4 size-14 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <Search className="size-6 text-brand-500" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
                  {t("Hidangan tidak ditemukan", "No dishes found")}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {t(
                    "Coba ubah kata kunci pencarian atau hapus filter makanan.",
                    "Try clearing your search query or removing dietary filters."
                  )}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setDiet([]);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 hover:shadow-glow transition-all cursor-pointer"
                  >
                    {t("Hapus Semua Filter", "Clear All Filters")}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-12 sm:space-y-16">
                {groups.map(({ category, items }) => (
                  <section
                    key={category.id}
                    id={category.id}
                    className="scroll-mt-48"
                    aria-labelledby={`menu-${category.id}`}
                  >
                    {/* Category Station Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-4 sm:mb-6 pb-3 border-b border-border">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="size-2 rounded-full bg-brand-500" />
                          <p className="text-eyebrow text-xs">{category.subtitle}</p>
                        </div>
                        <h2
                          id={`menu-${category.id}`}
                          className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight"
                        >
                          {category.title}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground sm:max-w-xs sm:text-right">
                        {category.description}
                      </p>
                    </div>

                    {/* Food Items Grid */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4.5">
                      <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                          <MenuRow
                            key={item.id}
                            item={item}
                          />
                        ))}
                      </AnimatePresence>
                    </ul>
                  </section>
                ))}
              </div>
            )}

            <p className="mt-8 sm:mt-10 text-center text-xs text-muted-foreground">
              {t(
                "Harap beri tahu staf kami jika Anda memiliki alergi makanan berat sebelum memesan. Seluruh hidangan kami dimasak segar dari bahan mentah.",
                "Please inform your server of any severe food allergies before ordering. All our food is cooked fresh from scratch."
              )}
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <CtaBanner
              title={t("Ingin kenal dengan para ahli di balik menu ini?", "Want to meet the masters behind this menu?")}
              description={t(
                "Pelajari kisah kepala pizzaiolo kami, ahli pasta sfoglina, dan koki eksekutif Deny Pratama.",
                "Learn about our head pizzaiolo, fresh pasta sfoglina, and executive chef Deny Pratama."
              )}
              primary={{ label: t("Kenali Staf Kami", "Meet Our Staff"), href: "/staff" }}
              secondary={{ label: t("Kisah Kami", "Read Our Story"), href: "/story" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
