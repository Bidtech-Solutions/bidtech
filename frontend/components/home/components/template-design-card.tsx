"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { TEMPLATES } from "@/lib/data/template";
import { useLanguage } from "@/lib/i18n";

export function TemplateDesignCard({ template }: { template: (typeof TEMPLATES)[number] }) {
  const { t } = useLanguage();

  return (
    <Link
      className="group block h-full w-full"
      href={template.previewHref}
      rel="noreferrer"
      target="_blank"
    >
      <article className="flex min-h-[360px] flex-col overflow-hidden rounded-[24px] border border-green-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-primary/35 hover:shadow-[0_24px_64px_rgba(95,201,74,0.14)]">
        <div className="m-3 mb-0 overflow-hidden rounded-[18px] border border-white bg-[linear-gradient(135deg,#f1fbef,#e9f7ee)] p-2 shadow-[inset_0_0_0_1px_rgba(95,201,74,0.08)]">
          <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-slate-100">
            <Image
              src={template.image}
              alt={`${template.name} ${t.templateCard.imageAltSuffix}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
            {template.category}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-plus-jakarta),sans-serif] text-xl font-bold text-slate-900 tracking-tight">
            {template.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">{template.subcategory}</p>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-brand-primary">
            <span>{t.templatePreview.preview}</span>
            <ArrowRight className="size-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
