"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { TemplateFilter } from "@/components/template-website/components/template-filter";
import { TemplateCard } from "@/components/template-website/components/template-card";
import { CtaBannerSection } from "@/components/template-website/sections/cta-banner-section";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATES,
} from "@/lib/data/template";
import { useLanguage } from "@/lib/i18n";
import { fetchTemplates, type ExtendedTemplateItem } from "@/lib/api/template-api";

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

export function TemplateWebsiteView() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Semua Design");
  const [templates, setTemplates] = useState<ExtendedTemplateItem[]>(TEMPLATES);
  const [categories, setCategories] = useState(TEMPLATE_CATEGORIES);

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
    if (selectedCategory === "Semua Design") return true;

    return template.category === selectedCategory;
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf6_48%,#ffffff_100%)] text-slate-950">
      <section className="relative border-b border-emerald-100/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(95,201,74,0.16),transparent_32%),linear-gradient(120deg,rgba(15,23,42,0.04),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-5 md:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Badge className={sectionBadgeClass}>
              {t.templateWebsite.badge}
            </Badge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t.templateWebsite.title}
            </h1>
            <p className="mt-3 text-xl font-semibold text-brand-primary">
              {t.templateWebsite.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {t.templateWebsite.description}
            </p>
          </div>

          <TemplateFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:px-8 lg:py-16">
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      <CtaBannerSection />
    </main>
  );
}

