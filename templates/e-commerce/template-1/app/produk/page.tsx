"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Heart, X, Check, Tag } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/app/cta";
import { allSmartphones } from "@/lib/smartphonesData";
import { useLanguage } from "@/context/LanguageContext";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const brands = [
  "Semua Merek",
  "Apple",
  "Samsung",
  "Xiaomi",
  "Vivo",
  "OPPO",
  "OnePlus",
  "realme",
  "ASUS",
  "Infinix",
];

const categories = [
  "Semua Kategori",
  "HP Baru",
  "Second",
  "Tablet",
];

const priceRanges = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "Di bawah Rp 5 Juta", min: 0, max: 5000000 },
  { label: "Rp 5 Juta — Rp 10 Juta", min: 5000000, max: 10000000 },
  { label: "Rp 10 Juta — Rp 15 Juta", min: 10000000, max: 15000000 },
  { label: "Di atas Rp 15 Juta", min: 15000000, max: Infinity },
];

const allProducts = allSmartphones.map((phone) => {
  let cat = "HP Baru";
  if (phone.category === "Tablet") {
    cat = "Tablet";
  } else if (phone.condition === "Original Bergaransi") {
    cat = "Second";
  }
  return {
    ...phone,
    productCategory: cat,
  };
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price).replace("Rp", "Rp ");
};

export default function ProductPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Semua Merek");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showPromoOnly, setShowPromoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getCategoryLabel = (c: string) => {
    if (c === "HP Baru") return t.productCatalog.categories.new;
    if (c === "Second") return t.productCatalog.categories.second;
    if (c === "Tablet") return t.productCatalog.categories.tablet;
    return t.productCatalog.categories.all;
  };

  const getBrandLabel = (b: string) => {
    if (b === "Semua Merek") return t.productCatalog.allBrands;
    return b;
  };

  const getPriceRangeLabel = (p: typeof priceRanges[0]) => {
    if (p.min === 0 && p.max === Infinity) return t.productCatalog.priceLabels.all;
    if (p.min === 0 && p.max === 5000000) return language === "en" ? "Under Rp 5 Million" : "Di bawah Rp 5 Juta";
    if (p.min === 5000000 && p.max === 10000000) return language === "en" ? "Rp 5 Million — Rp 10 Million" : "Rp 5 Juta — Rp 10 Juta";
    if (p.min === 10000000 && p.max === 15000000) return language === "en" ? "Rp 10 Million — Rp 15 Million" : "Rp 10 Juta — Rp 15 Juta";
    return language === "en" ? "Above Rp 15 Million" : "Di atas Rp 15 Juta";
  };

  // Tutup dropdown saat pengguna klik di luar dropdown
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
        if (decoded === "aksesoris") {
          window.location.href = "/aksesoris";
          return;
        }
        if (decoded === "audio") {
          window.location.href = "/aksesoris?category=Audio";
          return;
        }
        if (decoded === "smartphone baru" || decoded === "hp baru" || decoded === "baru") {
          setSelectedCategory("HP Baru");
        } else if (decoded === "smartphone second" || decoded === "second" || decoded === "hp second") {
          setSelectedCategory("Second");
        } else if (decoded === "tablet" || decoded === "tablets") {
          setSelectedCategory("Tablet");
        } else {
          const found = categories.find((c) => c.toLowerCase() === decoded);
          if (found) setSelectedCategory(found);
        }
      }
      const brand = params.get("brand");
      if (brand) {
        const found = brands.find((b) => b.toLowerCase() === brand.toLowerCase());
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

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.summarySpecs || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand = selectedBrand === "Semua Merek" || p.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchCat = selectedCategory === "Semua Kategori" || p.productCategory === selectedCategory;
      const matchPrice = p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max;
      const matchPromo = !showPromoOnly || p.isPromo;
      return matchSearch && matchBrand && matchCat && matchPrice && matchPromo && p.stock !== "habis";
    });

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [searchQuery, selectedBrand, selectedCategory, selectedPriceRange, showPromoOnly, sortBy]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("Semua Merek");
    handleCategoryChange("Semua Kategori");
    setSelectedPriceRange(priceRanges[0]);
    setShowPromoOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedBrand !== "Semua Merek" ||
    selectedCategory !== "Semua Kategori" ||
    selectedPriceRange !== priceRanges[0] ||
    showPromoOnly;

  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24 lg:pt-28 bg-background min-h-screen">
        <section className="pb-8 sm:pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Judul Halaman */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs sm:text-[13px] text-gold-600 font-bold uppercase tracking-[0.1em] mb-2 block">
                {language === "en" ? "COMPLETE CATALOG" : "KOLEKSI LENGKAP"}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-ink-900 tracking-[-0.03em] leading-tight mb-3">
                {language === "en" ? "All Smartphones & Tablets" : "Semua Produk Smartphone & Tablet"}
              </h1>
              <p className="text-text-500 text-sm sm:text-base">
                {language === "en"
                  ? "Full collection of brand new, certified pre-owned devices, and original tablets at the best value in Batam."
                  : "Pilihan lengkap HP baru, second bergaransi, dan tablet original dengan harga terbaik di Batam."}
              </p>
            </div>

            {/* Filter Section */}
            <div className="mb-8">
              {/* Baris 1: Kolom Pencarian di Kiri, Filter Kategori Interaktif di Sebelah Kanan */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-400" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search smartphone or tablet name & specs..." : "Cari nama atau spesifikasi smartphone & tablet..."}
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

                {/* Dropdown Kategori di Sebelah Kanan dengan Desain Responsif & Interaktif */}
                <div className="relative sm:w-56 shrink-0" data-dropdown="category">
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
                    <span className="truncate">{getCategoryLabel(selectedCategory)}</span>
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
                      className="absolute right-0 top-full mt-2 w-full max-h-72 overflow-y-auto overscroll-contain bg-white rounded-2xl border border-border shadow-soft p-1.5 z-30 animate-in fade-in duration-150"
                    >
                      {categories.map((c) => {
                        const isSelected = selectedCategory === c;
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              handleCategoryChange(c);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                              isSelected
                                ? "bg-gold-50 text-gold-700 font-bold"
                                : "text-ink-700 hover:bg-surface hover:text-ink-900"
                            }`}
                          >
                            <span>{getCategoryLabel(c)}</span>
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
                  className="flex items-center gap-2 w-full justify-center py-2.5 rounded-full bg-surface border border-border text-sm font-bold text-ink-900 active:scale-[0.98] transition-transform"
                >
                  <Filter className="w-4 h-4 text-gold-600" />
                  {t.productCatalog.filterMore}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Baris 2: Merek, Rentang Harga, Promo, dan Urutan */}
              <div
                className={`${
                  mobileFiltersOpen ? "flex" : "hidden"
                } md:flex flex-wrap gap-2.5 md:items-center items-stretch mb-4`}
              >
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
                      {brands.map((b) => {
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

                {/* Filter Rentang Harga Dropdown */}
                <div className="relative" data-dropdown="price">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
                    className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-150 shadow-2xs active:scale-[0.98] ${
                      openDropdown === "price"
                        ? "bg-white border-gold-500 ring-2 ring-gold-500/20 text-ink-900"
                        : selectedPriceRange.label !== "Semua Harga"
                        ? "bg-gold-50/70 border-gold-400 text-gold-800 font-bold"
                        : "bg-surface border-border text-ink-900 hover:border-gold-300 hover:bg-white"
                    }`}
                  >
                    <span className="truncate">{getPriceRangeLabel(selectedPriceRange)}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-text-400 shrink-0 transition-transform duration-200 ${
                        openDropdown === "price" ? "rotate-180 text-gold-600" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "price" && (
                    <div 
                      data-lenis-prevent="true"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      className="absolute left-0 top-full mt-2 w-56 max-h-64 overflow-y-auto overscroll-contain bg-white rounded-2xl border border-border shadow-soft p-1.5 z-30 animate-in fade-in duration-150"
                    >
                      {priceRanges.map((p) => {
                        const isSelected = selectedPriceRange.label === p.label;
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => {
                              setSelectedPriceRange(p);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                              isSelected
                                ? "bg-gold-50 text-gold-700 font-bold"
                                : "text-ink-700 hover:bg-surface hover:text-ink-900"
                            }`}
                          >
                            <span>{getPriceRangeLabel(p)}</span>
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
                  <span>{t.productCatalog.promoOnly}</span>
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
                        ? t.productCatalog.sort.priceAsc
                        : sortBy === "price-desc"
                        ? t.productCatalog.sort.priceDesc
                        : sortBy === "rating"
                        ? t.productCatalog.sort.rating
                        : t.productCatalog.sort.recommended}
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
                        { value: "default", label: t.productCatalog.sort.recommended },
                        { value: "price-asc", label: t.productCatalog.sort.priceAsc },
                        { value: "price-desc", label: t.productCatalog.sort.priceDesc },
                        { value: "rating", label: t.productCatalog.sort.rating },
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
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <p className="text-text-500">
                  {t.productCatalog.showingCount}{" "}
                  <span className="font-bold text-ink-900">{filteredProducts.length}</span>{" "}
                  {language === "en" ? "products" : "produk"}
                  {selectedCategory !== "Semua Kategori" && (
                    <span className="text-gold-600 font-medium"> ({getCategoryLabel(selectedCategory)})</span>
                  )}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="font-medium text-gold-500 transition-colors text-sm hover:underline"
                  >
                    {t.productCatalog.resetFilter}
                  </button>
                )}
              </div>
            </div>

            {/* Grid Produk (Format Standar Template 4 Kolom) */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produk/${product.slug}`}
                    prefetch={true}
                    scroll={true}
                    className="group relative flex flex-col bg-white rounded-[var(--radius)] border border-border p-5 transition-[box-shadow,border-color,transform] duration-200 ease-out shadow-soft hover:shadow-soft-hover hover:border-gold-300 hover:-translate-y-1"
                  >
                    {/* Tombol Favorit */}
                    <button
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="absolute top-4 right-4 z-10 text-text-disabled hover:text-red-500 transition-colors"
                      aria-label="Tambah ke Favorit"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          favorites[product.id] ? "text-red-500 fill-red-500" : ""
                        }`}
                      />
                    </button>

                    {/* Badge Promo */}
                    {product.isPromo && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 flex-wrap max-w-[80%]">
                        <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
                          Promo
                        </span>
                        {product.badge && product.badge.toLowerCase() !== "promo" && (
                          <span className="bg-ink-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Gambar Produk */}
                    <div className="w-full aspect-square flex items-center justify-center py-4 mb-3 overflow-hidden rounded-[var(--radius)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105"
                        decoding="async"
                      />
                    </div>

                    {/* Status Stok */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${
                          product.stock === "tersedia"
                            ? "bg-success-soft text-success"
                            : product.stock === "hampir habis"
                            ? "bg-gold-50 text-gold-600"
                            : "bg-error-soft text-error"
                        }`}
                      >
                        {product.stock === "tersedia"
                          ? (language === "en" ? "In Stock" : "Tersedia")
                          : product.stock === "hampir habis"
                          ? (language === "en" ? "Low Stock" : "Hampir Habis")
                          : (language === "en" ? "Sold Out" : "Habis")}
                      </span>
                    </div>

                    {/* Nama Produk */}
                    <h3 className="text-lg font-bold text-ink-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Spesifikasi */}
                    <p className="text-sm text-text-500 mb-3 line-clamp-1">
                      {product.summarySpecs}
                    </p>

                    {/* Harga & Promo */}
                    <div className="mb-5 mt-auto">
                      {product.isPromo && product.originalPrice && (
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-xs text-text-400 line-through decoration-red-500/50">
                            {formatPrice(product.originalPrice)}
                          </p>
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                            Promo
                          </span>
                        </div>
                      )}
                      <p className="text-xl font-extrabold text-gold-500">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Tombol WhatsApp */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const msg = language === "en"
                          ? `Hello KONTERKU, I am interested in ${product.name} (${formatPrice(product.price)}).`
                          : product.waMessage;
                        window.open(
                          `https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
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
              <div className="text-center py-16 bg-surface border border-border rounded-[var(--radius)]">
                <Search className="w-10 h-10 text-text-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {t.productCatalog.noResultsTitle}
                </h3>
                <p className="text-text-500 mb-6">
                  {t.productCatalog.noResultsDesc}
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold bg-gold-500 text-ink-900 rounded-[var(--radius)] transition-all hover:bg-gold-400 shadow-soft hover:-translate-y-0.5"
                >
                  {language === "en" ? "View All Products" : "Lihat Semua Produk"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Bantuan Pemilihan HP */}
        <CTA
          title={language === "en" ? "Haven't Found the Smartphone Model You're Looking For?" : "Belum Menemukan Tipe HP yang Kamu Cari?"}
          description={language === "en" ? "Inquire directly about specific colors, memory variants, or active stock with our WhatsApp team." : "Tanyakan ketersediaan tipe, warna, atau varian memori lainnya langsung ke tim WhatsApp kami."}
          primaryButtonText={language === "en" ? "Check Stock via WhatsApp" : "Tanya Stok via WhatsApp"}
          primaryButtonHref={`https://wa.me/6281234567890?text=${encodeURIComponent(
            language === "en"
              ? "Hello KONTERKU, I am looking for a specific smartphone model"
              : "Halo KONTERKU, saya sedang mencari tipe smartphone tertentu"
          )}`}
        />
      </main>
      <Footer />
    </>
  );
}
