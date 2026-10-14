"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  ShoppingCart,
  CarFront,
  UtensilsCrossed,
  Dumbbell,
  Users,
  House,
  GraduationCap,
  Eye,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { TEMPLATES } from "@/lib/data/template";
import {
  fetchTemplates,
  recordTemplateView,
  type ExtendedTemplateItem,
} from "@/lib/api/template-api";
import { useTemplateViews } from "@/lib/hooks/use-template-views";
import { useLanguage } from "@/lib/i18n";

// Category display mapping matching the design
const CATEGORY_TABS = [
  { id: "all", name: "Semua Design", filterKey: "all" },
  { id: "automotive", name: "Otomotif", filterKey: "Otomotif" },
  { id: "culinary", name: "Kuliner", filterKey: "UMKM" },
  { id: "beauty", name: "Kecantikan", filterKey: "Kecantikan" },
  { id: "community", name: "Komunitas", filterKey: "Komunitas" },
  { id: "property", name: "Properti", filterKey: "Konstruksi & Properti" },
  { id: "education", name: "Pendidikan", filterKey: "Pendidikan" },
];

const categoryIcons: Record<string, LucideIcon> = {
  Otomotif: CarFront,
  UMKM: UtensilsCrossed,
  Kuliner: UtensilsCrossed,
  Kecantikan: Dumbbell,
  Kebugaran: Dumbbell,
  Komunitas: Users,
  "Konstruksi & Properti": House,
  Properti: House,
  Pendidikan: GraduationCap,
};

// checkout_url normalnya berasal dari API. Fallback ini mengikuti alur checkout
// halaman Template Design dan menggunakan dashboard sesuai environment.
const DASHBOARD_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" ? `${window.location.protocol}//dashboard.${window.location.hostname}` : "http://localhost:8000");

export function TemplatePreviewSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [templates, setTemplates] = useState<ExtendedTemplateItem[]>(TEMPLATES);

  const { getViewCount, isHighlighted } = useTemplateViews({ initialTemplates: templates });

  useEffect(() => {
    let isMounted = true;
    fetchTemplates().then((res) => {
      if (isMounted) {
        setTemplates(res.templates);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTemplates = templates
    .filter((template) => {
      if (activeCategory === "all") return true;
      const tab = CATEGORY_TABS.find((t) => t.id === activeCategory);
      return tab?.filterKey ? template.category === tab.filterKey : true;
    })
    .slice(0, 6);

  return (
    <section
      className="landing-panel relative py-14 sm:py-20 md:py-24 overflow-hidden"
      id="templates"
    >
      {/* Ambient green glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(95,201,74,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="rounded-full bg-[#f0f9ea] border border-[#d6f2c9] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#45a02e]">
              {t.templatePreview.badge}
            </span>
          </div>

          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-2xl min-[400px]:text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] leading-tight">
            {t.templatePreview.titlePrefix}{" "}
            <span className="text-[#45a02e]">{t.templatePreview.titleHighlight}</span>{" "}
            {t.templatePreview.titleSuffix}
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed text-slate-600">
            {t.templatePreview.subtitle}
          </p>
        </Reveal>

        {/* Category Filter Pills */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            const count =
              tab.filterKey === "all"
                ? templates.length
                : templates.filter((template) => template.category === tab.filterKey).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#45a02e] text-white shadow-sm shadow-[#45a02e]/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#45a02e] hover:text-[#45a02e]"
                }`}
                type="button"
              >
                <span>{tab.name}</span>
                <span
                  className={`text-xs ${
                    isActive ? "text-white/90" : "text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 6-Card Grid (Completely visible, NO white fog overlay) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {filteredTemplates.map((template, index) => {
            const Icon =
              categoryIcons[template.category] ?? template.icon ?? CarFront;
            const displayCategory =
              template.category === "UMKM"
                ? "Kuliner"
                : template.category === "Konstruksi & Properti"
                  ? "Properti"
                  : template.category;
            const checkoutUrl =
              template.checkout_url ||
              `${DASHBOARD_URL}/checkout/${template.id}/domain`;
            const views = getViewCount(template.id, template.views);
            const highlighted = isHighlighted(template.id);

            return (
              <Reveal
                className={`h-full w-full ${index >= 3 ? "hidden sm:flex" : "flex"}`}
                delay={(index % 3) * 80}
                key={template.id}
                y={24}
              >
                <div className="group relative flex w-full flex-col justify-between rounded-[22px] sm:rounded-[24px] bg-white border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#45a02e] hover:shadow-[0_16px_40px_rgba(69,160,46,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div>
                    {/* Visual Image */}
                    <Link
                      href={template.previewHref}
                      onClick={() => recordTemplateView(template.id)}
                      rel="noreferrer"
                      target="_blank"
                      className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100 cursor-pointer"
                      title={`Buka live demo ${template.name}`}
                    >
                      <Image
                        alt={template.name}
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        src={template.image}
                      />
                    </Link>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5">
                      {/* Top Category & Real-time View Counter Row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Icon className="size-4 text-[#45a02e]" />
                          <span>{displayCategory}</span>
                        </div>

                        {/* Real-time View Badge */}
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-300 select-none ${
                            highlighted
                              ? "bg-emerald-500 text-white scale-105 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-300 font-bold"
                              : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 font-medium"
                          }`}
                          title={`${views.toLocaleString("id-ID")} kali dilihat`}
                        >
                          <Eye className={`size-3.5 shrink-0 ${highlighted ? "text-white animate-pulse" : "text-[#45a02e]"}`} />
                          <span className="font-semibold tabular-nums">{views.toLocaleString("id-ID")}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {t.templatePreview.viewCountSuffix || "Kali"}
                          </span>
                        </div>
                      </div>

                      {/* Template Title */}
                      <h3 className="mt-3 font-[family-name:var(--font-sora)] text-base sm:text-lg font-bold text-slate-950 tracking-tight transition-colors group-hover:text-[#45a02e]">
                        {template.name}
                      </h3>

                      {/* Subcategory Description */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 min-h-[38px]">
                        {template.subcategory}
                      </p>
                    </div>
                  </div>

                  {/* Two Action Buttons: Lihat & Beli */}
                  <div className="flex items-center gap-2 px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
                    <Link
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:border-[#45a02e] hover:text-[#45a02e] transition-all cursor-pointer text-center"
                      href={template.previewHref}
                      onClick={() => recordTemplateView(template.id)}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>{t.templatePreview.preview}</span>
                    </Link>

                    <a
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#45a02e] py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#3b8e26] shadow-sm transition-all cursor-pointer text-center"
                      href={checkoutUrl}
                    >
                      <ShoppingCart className="size-3.5" />
                      <span>{t.templatePreview.buy}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA: Lihat Lebih banyak Template */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#45a02e] bg-white px-7 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-[#3b8e26] shadow-[0_6px_20px_rgba(69,160,46,0.16)] hover:bg-[#f0f9ea] hover:shadow-[0_8px_24px_rgba(69,160,46,0.24)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-center"
            href="/template-website"
          >
            <span>{t.templatePreview.more}</span>
            <ArrowRight className="size-4 sm:size-4.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
