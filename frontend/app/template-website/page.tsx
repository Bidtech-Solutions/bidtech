"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { TemplateFilter } from "@/components/template-website/components/template-filter";
import { TemplateCard } from "@/components/template-website/components/template-card";
import { CtaBannerSection } from "@/components/template-website/sections/cta-banner-section";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATES,
} from "@/lib/data/template";
import { useLanguage } from "@/lib/i18n";
import { fetchTemplates, type ExtendedTemplateItem } from "@/lib/api/template-api";
import { useTemplateViews } from "@/lib/hooks/use-template-views";

const ITEMS_PER_PAGE = 9;

export default function TemplateWebsitePage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Semua Design");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [templates, setTemplates] = useState<ExtendedTemplateItem[]>(TEMPLATES);
  const [categories, setCategories] = useState(TEMPLATE_CATEGORIES);

  const { getViewCount, isHighlighted } = useTemplateViews({ initialTemplates: templates });

  useEffect(() => {
    let isMounted = true;
    fetchTemplates().then((res) => {
      if (isMounted) {
        setTemplates(res.templates);
        if (res.categories && res.categories.length > 0) {
          setCategories(res.categories);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "Semua Design" || template.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      template.name.toLowerCase().includes(query) ||
      template.category.toLowerCase().includes(query) ||
      template.subcategory.toLowerCase().includes(query) ||
      template.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedTemplates = filteredTemplates.slice(
    (validCurrentPage - 1) * ITEMS_PER_PAGE,
    validCurrentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const el = document.getElementById("template-grid-section");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf6_48%,#ffffff_100%)] text-slate-950">
      {/* Hero & Search Header */}
      <section className="relative border-b border-emerald-100/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(95,201,74,0.16),transparent_32%),linear-gradient(120deg,rgba(15,23,42,0.04),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-5 md:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-[46px]">
              Pilih <span className="text-[#5fc94a]">Design Web</span> Siap Pakai
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
              Pilih design berkualitas dengan tampilan modern, responsive, dan mudah dikustomisasi sesuai kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Search Bar matching Design */}
          <div className="mx-auto mt-8 w-full max-w-2xl px-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentPage(1);
              }}
              className="relative flex items-center rounded-full border border-slate-200 bg-white p-1.5 shadow-sm transition-all focus-within:border-[#5fc94a] focus-within:ring-2 focus-within:ring-[#5fc94a]/20"
            >
              <Search className="ml-3 sm:ml-4 size-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari template website"
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[#5bb82e] hover:bg-[#4ea625] text-white px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition shadow-xs shrink-0 cursor-pointer"
              >
                Telusuri
              </button>
            </form>
          </div>

          {/* Category Filter Pills */}
          <TemplateFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          />
        </div>
      </section>

      {/* Template Grid Section */}
      <div id="template-grid-section" className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-primary">
              {t.templateWebsite.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {t.templateWebsite.sectionTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            {t.templateWebsite.sectionDescription}
          </p>
        </div>

        {/* Template Cards Grid or Empty State */}
        {filteredTemplates.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-[#5bb82e]">
              <Search className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Tidak ada template ditemukan
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
              Tidak ditemukan template untuk pencarian &quot;{searchQuery}&quot;. Coba gunakan kata kunci lain atau reset filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua Design");
                setCurrentPage(1);
              }}
              className="mt-5 rounded-full bg-[#5bb82e] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#4ea625] transition cursor-pointer"
              type="button"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {paginatedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                viewsCount={getViewCount(template.id, template.views)}
                isHighlighted={isHighlighted(template.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination Navigation matching Design */}
        {totalPages > 1 && (
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap">
            {/* Tombol Sebelumnya */}
            <button
              onClick={() => handlePageChange(validCurrentPage - 1)}
              disabled={validCurrentPage === 1}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              type="button"
            >
              <span>&larr;</span>
              <span>Sebelumnya</span>
            </button>

            {/* Nomor Halaman */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex size-9 sm:size-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
                  validCurrentPage === page
                    ? "bg-[#5bb82e] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
                type="button"
              >
                {page}
              </button>
            ))}

            {/* Tombol Selanjutnya */}
            <button
              onClick={() => handlePageChange(validCurrentPage + 1)}
              disabled={validCurrentPage === totalPages}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              type="button"
            >
              <span>Selanjutnya</span>
              <span>&rarr;</span>
            </button>
          </div>
        )}
      </div>

      <CtaBannerSection />
    </main>
  );
}
