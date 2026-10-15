"use client";

import React, { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Flame, Sparkles, Utensils, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { RevealText } from "@/components/ui/reveal-text";
import { useLanguage } from "@/components/providers/language-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const moodImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
];

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  itemsCount: string;
  tag: string;
  tagIcon?: "flame" | "sparkles" | "award";
  image: string;
  priceStart: string;
  gradient: string;
  popularDish: string;
}

function CategoryCard({ item, index }: { item: CategoryItem; index: number }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glowRef.current.style.opacity = "1";
    glowRef.current.style.transform = `translate(${x - 120}px, ${y - 120}px)`;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    glowRef.current.style.opacity = "0";
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "category-card-item group relative h-[380px] sm:h-[420px] md:h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer select-none",
        "border border-border/80 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300",
        "w-[85vw] max-w-[340px] shrink-0 sm:w-auto sm:max-w-none sm:shrink",
        "snap-center"
      )}
      onClick={() => {
        window.location.href = `/menu?category=${item.id}`;
      }}
    >
      {/* Background Image with Zoom & Dark Gradient */}
      <div className="absolute inset-0 overflow-hidden bg-neutral-900">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 z-10", item.gradient)} />
      </div>

      {/* Radial Interactive Glow Overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 z-20"
        style={{
          width: "240px",
          height: "240px",
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Card Content Layout */}
      <div className="relative z-30 h-full p-5 sm:p-6 md:p-7 flex flex-col justify-between text-white">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md border border-white/15 text-white/90 shadow-sm">
            {item.tagIcon === "flame" && <Flame className="size-3.5 text-brand-400 fill-brand-400" />}
            {item.tagIcon === "award" && <Award className="size-3.5 text-amber-400" />}
            {item.tagIcon === "sparkles" && <Sparkles className="size-3.5 text-brand-300" />}
            {item.tag}
          </span>

          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/10 text-white shadow-xs">
            {item.itemsCount}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-1">
            {item.subtitle}
          </p>

          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-1.5 sm:mb-2 text-white group-hover:text-brand-300 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
            {item.description}
          </p>

          <div className="pt-2.5 sm:pt-3 border-t border-white/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 block font-medium">
                {t("Pilihan Favorit", "Top Pick")}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/95 truncate max-w-[140px] block">
                {item.popularDish}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-brand-400">
                {item.priceStart}
              </span>
              <div className="size-7 sm:size-9 rounded-full bg-white/10 group-hover:bg-brand-500 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="size-3.5 sm:size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryParallax() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState("all");

  const categoriesData: CategoryItem[] = useMemo(() => [
    {
      id: "pizza",
      title: language === "en" ? "Wood-Fired Pizza" : "Pizza Tungku Api",
      subtitle: language === "en" ? "48-Hour Proofed Sourdough" : "Adonan Fermentasi Dingin 48 Jam",
      description: language === "en"
        ? "San Marzano D.O.P. tomatoes, fresh fior di latte, and charred blistered crust baked at 900°F."
        : "Tomat San Marzano D.O.P., keju fior di latte segar, dan kulit bergelembung renyah dipanggang pada suhu 500°C.",
      itemsCount: language === "en" ? "12 Creations" : "12 Pilihan Menu",
      tag: language === "en" ? "Wood Fired" : "Tungku Kayu",
      tagIcon: "flame",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
      priceStart: language === "en" ? "From Rp 72.000" : "Mulai Rp 72.000",
      gradient: "from-amber-500/20 via-orange-600/10 to-transparent",
      popularDish: "Margherita di Bufala",
    },
    {
      id: "burgers",
      title: language === "en" ? "Craft Smash Burgers" : "Burger Smash Pilihan",
      subtitle: language === "en" ? "100% Grass-Fed Prime Angus" : "100% Daging Sapi Angus Pilihan",
      description: language === "en"
        ? "Double lacy-crust patties, melted aged American cheddar, and caramelized shallots on brioche."
        : "Patty ganda berenda renyah, lelehan keju cheddar matang, dan bawang karamel di atas roti brioche hangat.",
      itemsCount: language === "en" ? "8 Varieties" : "8 Varian Rasa",
      tag: language === "en" ? "Best Seller" : "Paling Laris",
      tagIcon: "award",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
      priceStart: language === "en" ? "From Rp 58.000" : "Mulai Rp 58.000",
      gradient: "from-orange-500/20 via-red-600/10 to-transparent",
      popularDish: "Truffle Smash Deluxe",
    },
    {
      id: "pasta",
      title: language === "en" ? "Artisan Hand-Rolled Pasta" : "Pasta Segar Gilas Tangan",
      subtitle: language === "en" ? "Extruded & Hand-Cut Daily" : "Digilas & Dipotong Segar Tiap Hari",
      description: language === "en"
        ? "Silk egg ribbons, 12-hour braised Bolognese ragù, and freshly shaved 24-month Parmigiano."
        : "Pita adonan telur sutra, saus ragù daging sapi yang dimasak perlahan 12 jam, dan taburan keju Parmigiano 24 bulan.",
      itemsCount: language === "en" ? "10 Plates" : "10 Menu Pasta",
      tag: language === "en" ? "Handmade" : "Gilas Tangan",
      tagIcon: "sparkles",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1000&q=80",
      priceStart: language === "en" ? "From Rp 78.000" : "Mulai Rp 78.000",
      gradient: "from-yellow-500/20 via-amber-600/10 to-transparent",
      popularDish: "Tagliatelle al Tartufo",
    },
    {
      id: "desserts",
      title: language === "en" ? "Dolci & Sweet Treats" : "Dolci & Hidangan Penutup",
      subtitle: language === "en" ? "Crafted In-House Daily" : "Dibuat Segar di Dapur Tiap Hari",
      description: language === "en"
        ? "Classic espresso-dipped savoiardi tiramisu, pistachio cannoli, and Madagascar vanilla gelato."
        : "Tiramisu klasik biskuit savoiardi celup espresso, cannoli renyah kacang pistachio, dan gelato vanila Madagaskar.",
      itemsCount: language === "en" ? "6 Specialties" : "6 Menu Manis",
      tag: language === "en" ? "Sweet Endings" : "Penutup Manis",
      tagIcon: "sparkles",
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80",
      priceStart: language === "en" ? "From Rp 38.000" : "Mulai Rp 38.000",
      gradient: "from-pink-500/20 via-rose-600/10 to-transparent",
      popularDish: "Signature Tiramisu",
    },
    {
      id: "drinks",
      title: language === "en" ? "Craft Drinks & Elixirs" : "Minuman Racikan & Eliksir",
      subtitle: language === "en" ? "Single-Origin & Botanicals" : "Kopi Single-Origin & Botani",
      description: language === "en"
        ? "Non-alcoholic botanical aperitivos, smoked rosemary spritzers, and 18-hour nitro cold brew."
        : "Mocktail botani herbal bebas alkohol, soda spritzer rosemary asap, dan seduhan kopi dingin nitro 18 jam.",
      itemsCount: language === "en" ? "8 Sips" : "8 Minuman Segar",
      tag: language === "en" ? "Botanical" : "Sari Botani",
      tagIcon: "sparkles",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80",
      priceStart: language === "en" ? "From Rp 28.000" : "Mulai Rp 28.000",
      gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
      popularDish: "Smoked Rosemary Spritz",
    },
  ], [language]);

  const filterOptions = useMemo(() => [
    { id: "all", label: t("Semua Kategori", "All Categories") },
    { id: "pizza", label: t("Pizza Tungku Api", "Wood-Fired Pizza") },
    { id: "burgers", label: t("Burger Smash", "Smash Burgers") },
    { id: "pasta", label: t("Pasta Gilas Tangan", "Hand-Rolled Pasta") },
    { id: "desserts", label: t("Dolci & Hidangan Penutup", "Dolci & Desserts") },
    { id: "drinks", label: t("Minuman Racikan", "Craft Drinks") },
  ], [t]);

  const filteredCategories =
    activeFilter === "all"
      ? categoriesData
      : categoriesData.filter((c) => c.id === activeFilter);

  useGSAP(
    () => {
      // Header entrance animation with ScrollTrigger
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          }
        );
      }

      // Cards staggered reveal with 3D tilt
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".category-card-item");
        gsap.fromTo(
          cards,
          {
            y: 70,
            opacity: 0,
            scale: 0.94,
            rotateX: 8,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeFilter] }
  );

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleScroll = () => {
    if (!gridRef.current) return;
    const cardWidth = 320;
    const index = Math.round(gridRef.current.scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(index, filteredCategories.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!gridRef.current) return;
    const cardWidth = 320;
    gridRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveCardIndex(index);
  };

  const scrollByAmount = (amount: number) => {
    if (!gridRef.current) return;
    gridRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - gridRef.current.offsetLeft;
    scrollLeftStart.current = gridRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !gridRef.current) return;
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    gridRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative w-full bg-background py-12 sm:py-16 md:py-28 overflow-hidden scroll-mt-20"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="container-app">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 shadow-xs">
            <Utensils className="size-3.5" />
            {t("Spektrum Kuliner Kami", "Our Culinary Spectrum")}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-foreground text-balance mb-3 sm:mb-5 leading-tight">
            {t("Cita rasa untuk", "A craving for")}{" "}
            <DynamicTextSlider>
              <RevealText
                text="EVERY"
                textColor="text-foreground"
                overlayColor="text-brand-500"
                letterImages={moodImages}
                className="font-display"
              />
            </DynamicTextSlider>{" "}
            {t("selera", "mood")}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
            {t(
              "Dari adonan sourdough fermentasi dingin 48 jam hingga pasta telur lembut buatan tangan, jelajahi setiap station dapur khusus kami yang diracik dengan presisi.",
              "From 48-hour cold-fermented sourdough to silky hand-rolled pasta, explore our specialized kitchen stations crafted with obsessive precision."
            )}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-foreground text-background shadow-md scale-105"
                      : "bg-surface dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 shadow-xs"
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Magnetic Cards Grid - Horizontal Snap Scroll on Mobile, Grid on Desktop */}
        <div
          ref={gridRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex overflow-x-auto pb-4 pt-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none cursor-grab active:cursor-grabbing sm:cursor-default"
        >
          {filteredCategories.map((category, index) => (
            <CategoryCard key={category.id} item={category} index={index} />
          ))}
        </div>

        {/* Mobile Navigation Controls & Indicator */}
        <div className="flex sm:hidden items-center justify-between px-2 mt-3 mb-2">
          <div className="flex items-center gap-1.5">
            {filteredCategories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeCardIndex === i
                    ? "w-6 bg-brand-500"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount(-280)}
              className="size-8 rounded-full bg-surface dark:bg-muted border border-border flex items-center justify-center text-foreground hover:bg-brand-500 hover:text-white transition-colors cursor-pointer shadow-xs"
              aria-label={t("Kartu sebelumnya", "Previous card")}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => scrollByAmount(280)}
              className="size-8 rounded-full bg-surface dark:bg-muted border border-border flex items-center justify-center text-foreground hover:bg-brand-500 hover:text-white transition-colors cursor-pointer shadow-xs"
              aria-label={t("Kartu berikutnya", "Next card")}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-8 sm:mt-14 md:mt-20 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-500/10 via-orange-500/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 max-w-5xl mx-auto shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-lg sm:text-xl text-foreground mb-1">
              {t("Bingung memilih menu yang mana dulu?", "Can't decide what to savor first?")}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t(
                "Jelajahi menu mencicipi interaktif lengkap kami untuk memilih hidangan favorit Anda.",
                "Explore our full interactive tasting menu or customize your dining preferences."
              )}
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = "/menu";
            }}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 hover:shadow-glow transition-all duration-200 cursor-pointer"
          >
            {t("Jelajahi Seluruh Menu", "Explore Full Menu")}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
