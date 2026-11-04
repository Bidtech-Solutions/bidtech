"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, Filter, ChevronDown, Heart, X, Check, Tag
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/app/cta";
import { useLanguage } from "@/context/LanguageContext";
import { 
  allAccessories, 
  accessoryCategories, 
  accessoryBrands 
} from "@/lib/accessoriesData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price).replace("Rp", "Rp ");
};

export default function AksesorisPage() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedBrand, setSelectedBrand] = useState("Semua Merek");
  const [showPromoOnly, setShowPromoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sinkronkan filter dari URL browser
  useEffect(() => {
    const parseUrlParams = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) {
        const decoded = decodeURIComponent(cat).replace(/\+/g, " ").trim().toLowerCase();
        const found = accessoryCategories.find(
          (c) => c.filterValue.toLowerCase() === decoded
        );
        if (found) setSelectedCategory(found.filterValue);
      }
      const brand = params.get("brand");
      if (brand) {
        const found = accessoryBrands.find(
          (b) => b.toLowerCase() === brand.toLowerCase()
        );
        if (found) setSelectedBrand(found);
      }
      const promo = params.get("promo");
      if (promo === "true") {
        setShowPromoOnly(true);
      }
    };

    parseUrlParams();
    window.addEventListener("popstate", parseUrlParams);
    return () => window.removeEventListener("popstate", parseUrlParams);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "Semua Kategori") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  const getCategoryName = (val: string) => {
    if (val === "Semua Kategori") return t.accessoriesPage.allCategories;
    if (val === "Audio") return t.accessoriesPage.categories.audio;
    if (val === "Charger") return t.accessoriesPage.categories.charger;
    if (val === "Powerbank") return t.accessoriesPage.categories.powerbank;
    if (val === "Casing") return language === "en" ? "Cases & Protection" : "Casing";
    if (val === "Pelindung") return language === "en" ? "Screen Protectors" : "Pelindung Layar";
    if (val === "Holder & Stand") return language === "en" ? "Holders & Mounts" : "Holder & Stand";
    if (val === "Smartwatch Strap") return language === "en" ? "Watch Straps" : "Strap Smartwatch";
    return val;
  };

  const getBrandLabel = (b: string) => {
    if (b === "Semua Merek") return t.accessoriesPage.allBrands;
    return b;
  };

  const filteredAccessories = useMemo(() => {
    let result = allAccessories.filter((p) => {
      const matchSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "Semua Kategori" || p.category === selectedCategory;
      const matchBrand = selectedBrand === "Semua Merek" || p.brand === selectedBrand;
      const matchPromo = !showPromoOnly || p.isPromo;
      return matchSearch && matchCat && matchBrand && matchPromo && p.stock !== "habis";
    });
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [searchQuery, selectedCategory, selectedBrand, showPromoOnly, sortBy]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    handleCategoryChange("Semua Kategori");
    setSelectedBrand("Semua Merek");
    setShowPromoOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "Semua Kategori" ||
    selectedBrand !== "Semua Merek" ||
    showPromoOnly;

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 lg:pt-32 bg-background min-h-screen text-ink-900">
        <section ref={sectionRef} className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs sm:text-[13px] text-gold-600 font-bold uppercase tracking-[0.1em] mb-2 block">
                {language === "en" ? "COMPLETE ACCESSORIES CATALOG" : "KOLEKSI AKSESORIS TERLENGKAP"}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-tight mb-3">
                {language === "en" ? "Smartphone Accessories Collection" : "Koleksi Aksesoris Smartphone"}
              </h1>
              <p className="text-text-500 text-sm sm:text-base">
                {language === "en"
                  ? "Elevate your smartphone with genuine TWS audio, GaN fast chargers, powerbanks, MagSafe cases, and official warranty screen protectors."
                  : "Lengkapi smartphone kamu dengan TWS audio, fast charger GaN, powerbank, casing MagSafe, dan pelindung layar 9H original bergaransi."}
              </p>
            </div>

            {/* Banner Promo */}
            <div 
              ref={bannerRef}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ink-900 via-ink-800 to-ink-950 p-6 sm:p-8 mb-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-soft"
            >
              <div className="relative z-10 max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-500/30">
                  {language === "en" ? "SPECIAL DEALS THIS WEEK" : "PROMO SPESIAL MINGGU INI"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {language === "en" ? "Accessories Discount up to 34%" : "Diskon Aksesoris hingga 34%"}
                </h2>
                <p className="text-text-300 text-sm max-w-xl">
                  {language === "en"
                    ? "Enjoy great savings on TWS, GaN Chargers, 65W Powerbanks, and glass protector bundles. While supplies last!"
                    : "Dapatkan harga hemat untuk TWS, Charger GaN, Powerbank 65W, dan paket bundling tempered glass. Berlaku selama persediaan masih ada!"}
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <button 
                  onClick={() => setShowPromoOnly(!showPromoOnly)}
                  className={`px-6 py-3 font-bold rounded-full transition-all shadow-soft active:scale-[0.98] ${
                    showPromoOnly 
                      ? "bg-white text-ink-900 hover:bg-neutral-100"
                      : "bg-gold-500 text-ink-900 hover:bg-gold-400"
                  }`}
                >
                  {showPromoOnly 
                    ? (language === "en" ? "Show All" : "Tampilkan Semua") 
                    : (language === "en" ? "View Promo Items" : "Lihat Item Promo")}
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div ref={filterRef} className="mb-8">
              {/* Baris 1: Kolom Pencarian di Kiri, Dropdown Kategori di Sebelah Kanan */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-400" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search accessories (e.g. Anker, GaN, Spigen, AirPods, Powerbank)..." : "Cari aksesoris (misal: Anker, GaN, Spigen, AirPods, Powerbank)..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-full bg-surface border border-border focus:border-gold-500 focus:bg-white outline-none transition-all text-sm text-ink-900 placeholder:text-text-400 shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-400 hover:text-ink-900 transition-colors"
                      aria-label="Hapus kata kunci"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Dropdown Kategori Aksesoris di Sebelah Kanan */}
                <div className="relative sm:w-60 shrink-0" data-dropdown="category">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                    className={`w-full flex items-center justify-between gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all duration-150 shadow-2xs active:scale-[0.98] ${
                      openDropdown === "category"
                        ? "bg-white border-gold-500 ring-2 ring-gold-500/20 text-ink-900"
                        : selectedCategory !== "Semua Kategori"
                        ? "bg-gold-50/70 border-gold-400 text-gold-800"
                        : "bg-surface border-border text-ink-900 hover:border-gold-300 hover:bg-white"
                    }`}
                  >
                    <span className="truncate">{getCategoryName(selectedCategory)}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-400 shrink-0 transition-transform duration-200 ${
                        openDropdown === "category" ? "rotate-180 text-gold-600" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "category" && (
                    <div 
                      data-lenis-prevent="true"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-2 w-full sm:w-60 max-h-72 overflow-y-auto overscroll-contain bg-white rounded-2xl border border-border shadow-soft p-1.5 z-30 animate-in fade-in duration-150"
                    >
                      {accessoryCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.filterValue;
                        return (
                          <button
                            key={cat.filterValue}
                            type="button"
                            onClick={() => {
                              handleCategoryChange(cat.filterValue);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                              isSelected
                                ? "bg-gold-50 text-gold-700 font-bold"
                                : "text-ink-700 hover:bg-surface hover:text-ink-900"
                            }`}
                          >
                            <span>{getCategoryName(cat.name)}</span>
                            {isSelected && <Check className="w-4 h-4 text-gold-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Filter Toggle Button */}
              <div className="md:hidden mb-3">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center gap-2 w-full justify-center py-2.5 rounded-full bg-surface border border-border text-sm font-bold text-ink-900 active:scale-[0.98] transition-transform shadow-2xs"
                >
                  <Filter className="w-4 h-4 text-gold-600" />
                  {t.accessoriesPage.filterMore}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Baris 2: Merek, Promo, dan Urutan */}
              <div className={`${mobileFiltersOpen ? "flex" : "hidden"} md:flex flex-wrap gap-2.5 md:items-center items-stretch mb-4`}>
                {/* Filter Merek Dropdown */}
                <div className="relative" data-dropdown="brand">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                    className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-150 shadow-2xs active:scale-[0.98] ${
                      openDropdown === "brand"
                        ? "bg-white border-gold-500 ring-2 ring-gold-500/20 text-ink-900"
                        : selectedBrand !== "Semua Merek"
                        ? "bg-gold-50/70 border-gold-400 text-gold-800 font-bold"
                        : "bg-surface border-border text-ink-900 hover:border-gold-300 hover:bg-white"
                    }`}
                  >
                    <span className="truncate">{getBrandLabel(selectedBrand)}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-text-400 shrink-0 transition-transform duration-200 ${
                        openDropdown === "brand" ? "rotate-180 text-gold-600" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "brand" && (
                    <div 
                      data-lenis-prevent="true"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      className="absolute left-0 top-full mt-2 w-48 max-h-64 overflow-y-auto overscroll-contain bg-white rounded-2xl border border-border shadow-soft p-1.5 z-30 animate-in fade-in duration-150"
                    >
                      {accessoryBrands.map((b) => {
                        const isSelected = selectedBrand === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setSelectedBrand(b);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                              isSelected
                                ? "bg-gold-50 text-gold-700 font-bold"
                                : "text-ink-700 hover:bg-surface hover:text-ink-900"
                            }`}
                          >
                            <span>{getBrandLabel(b)}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Tombol Hanya Promo */}
                <button
                  type="button"
                  onClick={() => setShowPromoOnly(!showPromoOnly)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-150 shadow-2xs active:scale-[0.98] ${
                    showPromoOnly
                      ? "bg-gold-50 border-gold-400 text-gold-700 font-bold ring-1 ring-gold-400/30"
                      : "bg-surface border-border text-text-600 hover:border-gold-300 hover:bg-white hover:text-ink-900"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${
                      showPromoOnly ? "bg-gold-500 text-white" : "border border-text-300"
                    }`}
                  >
                    {showPromoOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span>{t.accessoriesPage.promoOnly}</span>
                </button>

                {/* Filter Urutkan Dropdown (di Sebelah Kanan) */}
                <div className="relative md:ml-auto" data-dropdown="sort">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                    className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-150 shadow-2xs active:scale-[0.98] ${
                      openDropdown === "sort"
                        ? "bg-white border-gold-500 ring-2 ring-gold-500/20 text-ink-900"
                        : "bg-surface border-border text-ink-900 hover:border-gold-300 hover:bg-white"
                    }`}
                  >
                    <span className="truncate">
                      {sortBy === "price-asc"
                        ? t.accessoriesPage.sortLowest
                        : sortBy === "price-desc"
                        ? t.accessoriesPage.sortHighest
                        : sortBy === "rating"
                        ? t.accessoriesPage.sortPopular
                        : (language === "en" ? "Sort: Recommended" : "Urutkan: Rekomendasi")}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-text-400 shrink-0 transition-transform duration-200 ${
                        openDropdown === "sort" ? "rotate-180 text-gold-600" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "sort" && (
                    <div 
                      data-lenis-prevent="true"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-2 w-48 max-h-64 overflow-y-auto overscroll-contain bg-white rounded-2xl border border-border shadow-soft p-1.5 z-30 animate-in fade-in duration-150"
                    >
                      {[
                        { value: "default", label: language === "en" ? "Sort: Recommended" : "Urutkan: Rekomendasi" },
                        { value: "price-asc", label: t.accessoriesPage.sortLowest },
                        { value: "price-desc", label: t.accessoriesPage.sortHighest },
                        { value: "rating", label: t.accessoriesPage.sortPopular },
                      ].map((item) => {
                        const isSelected = sortBy === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              setSortBy(item.value);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                              isSelected
                                ? "bg-gold-50 text-gold-700 font-bold"
                                : "text-ink-700 hover:bg-surface hover:text-ink-900"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Hasil & Tombol Reset */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm pt-2">
                <p className="text-text-500">
                  {language === "en" ? "Showing" : "Menampilkan"}{" "}
                  <span className="font-bold text-ink-900">{filteredAccessories.length}</span>{" "}
                  {language === "en" ? "genuine accessories" : "aksesoris original"}
                  {selectedCategory !== "Semua Kategori" && (
                    <span className="text-gold-600 font-medium"> ({getCategoryName(selectedCategory)})</span>
                  )}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="font-medium text-gold-600 hover:text-gold-700 transition-colors text-sm hover:underline"
                  >
                    {t.accessoriesPage.resetFilter}
                  </button>
                )}
              </div>
            </div>

            {/* Grid Aksesoris */}
            {filteredAccessories.length > 0 ? (
              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {filteredAccessories.map((item) => (
                  <Link
                    key={item.id}
                    href={`/aksesoris/${item.slug}`}
                    prefetch={true}
                    scroll={true}
                    className="group relative flex flex-col bg-white rounded-[var(--radius)] border border-border shadow-soft p-5 transition-[box-shadow,border-color,transform] duration-200 ease-out hover:shadow-soft-hover hover:border-gold-300 hover:-translate-y-1"
                  >
                    {/* Favorit Icon */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-4 right-4 z-10 text-text-disabled hover:text-red-500 transition-colors"
                      aria-label="Tambah Favorit"
                    >
                      <Heart className={`w-5 h-5 transition-all ${favorites[item.id] ? "text-red-500 fill-red-500" : ""}`} />
                    </button>

                    {/* Badge Promo */}
                    {item.isPromo && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 flex-wrap max-w-[80%]">
                        <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
                          Promo
                        </span>
                        {item.badge && item.badge.toLowerCase() !== "promo" && (
                          <span className="bg-ink-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider shadow-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Image */}
                    <div className="w-full aspect-square flex items-center justify-center p-2 mb-3 overflow-hidden rounded-[calc(var(--radius)-4px)] bg-transparent">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => (e.currentTarget.src = "/images/products/placeholder.webp")}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Status Stok */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${
                          item.stock === "tersedia" ? "bg-success-soft text-success" : "bg-gold-50 text-gold-700"
                        }`}
                      >
                        {item.stock === "tersedia" ? (language === "en" ? "In Stock" : "Tersedia") : item.stock}
                      </span>
                    </div>

                    {/* Brand & Kategori */}
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-1">
                      <span className="text-gold-600">{item.brand}</span>
                      <span className="text-text-400 font-normal">{item.category}</span>
                    </div>

                    {/* Nama Aksesoris */}
                    <h3 className="text-base font-bold text-ink-900 mb-1.5 line-clamp-1 group-hover:text-gold-600 transition-colors">
                      {item.name}
                    </h3>

                    {/* Deskripsi Tambahan */}
                    <p className="text-sm text-text-500 mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Harga */}
                    <div className="mb-5 mt-auto">
                      {item.isPromo && item.originalPrice && (
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs text-text-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </p>
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                            Promo
                          </span>
                        </div>
                      )}
                      <p className="text-xl font-extrabold text-gold-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Tombol Aksi */}
                    <button
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        const msg = language === "en"
                          ? `Hello KONTERKU, I am interested in ${item.name} (${formatPrice(item.price)}).`
                          : item.waMessage;
                        window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="mt-auto w-full inline-flex items-center justify-center rounded-xl bg-white border border-gold-300 hover:bg-gold-50/60 active:scale-[0.98] py-2.5 px-4 text-xs sm:text-[13px] font-bold text-ink-900 shadow-sm transition-all duration-200"
                    >
                      <WhatsappIcon className="w-4 h-4 text-ink-900 mr-2 flex-shrink-0" />
                      {language === "en" ? "Inquire via WhatsApp" : "Tanya via WhatsApp"}
                    </button>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface shadow-soft border border-border rounded-[var(--radius)]">
                <Search className="w-10 h-10 text-text-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {t.accessoriesPage.noResultsTitle}
                </h3>
                <p className="text-text-500 mb-6">
                  {t.accessoriesPage.noResultsDesc}
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold bg-gold-500 text-ink-900 rounded-[var(--radius)] transition-all hover:bg-gold-400 shadow-soft hover:-translate-y-0.5"
                >
                  {language === "en" ? "Show All Accessories" : "Tampilkan Semua Aksesoris"}
                </button>
              </div>
            )}
          </div>
        </section>

        <CTA
          title={language === "en" ? "Unsure Which Accessory Fits Your Device?" : "Bingung Pilih Aksesoris yang Pas untuk Gadgetmu?"}
          description={language === "en" ? "Consult your smartphone model with our team for official recommendations and 100% compatibility." : "Konsultasikan tipe smartphonemu ke tim kami untuk rekomendasi aksesoris resmi dan kompatibilitas terbaik."}
          primaryButtonText={language === "en" ? "Ask Accessories via WhatsApp" : "Tanya Aksesoris via WhatsApp"}
          primaryButtonHref={`https://wa.me/6281234567890?text=${encodeURIComponent(
            language === "en"
              ? "Hello KONTERKU, I would like an accessory recommendation for my smartphone"
              : "Halo KONTERKU, saya ingin rekomendasi aksesoris untuk smartphone saya"
          )}`}
        />
      </main>
      <Footer />
    </>
  );
}
