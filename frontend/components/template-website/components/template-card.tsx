"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ShoppingCart, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { recordTemplateView, type ExtendedTemplateItem } from "@/lib/api/template-api";
import { useLanguage } from "@/lib/i18n";

// Fallback ini hanya untuk dev lokal. checkout_url normalnya selalu datang dari
// API (template.checkout_url) - lihat TemplateApiController::index()/show().
const LARAVEL_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" ? `${window.location.protocol}//dashboard.${window.location.hostname}` : "http://localhost:8000");

export function TemplateCard({
  template,
  viewsCount,
  isHighlighted = false,
}: {
  template: ExtendedTemplateItem;
  viewsCount?: number;
  isHighlighted?: boolean;
}) {
  const { t } = useLanguage();
  const Icon = template.icon;
  const checkoutUrl = template.checkout_url || `${LARAVEL_URL}/checkout/${template.id}/domain`;
  const views = viewsCount !== undefined ? viewsCount : (template.views ?? 0);

  return (
    <Card className="group flex flex-col overflow-hidden border border-emerald-100 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(95,201,74,0.18)]">
      <Link
        href={template.previewHref ?? "#"}
        rel={template.previewHref ? "noreferrer" : undefined}
        target={template.previewHref ? "_blank" : undefined}
        onClick={() => recordTemplateView(template.id)}
        className="relative h-48 max-md:h-72 max-sm:h-40 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-3 sm:p-4 block cursor-pointer"
        title={`Buka live demo ${template.name}`}
      >
        <Image
          alt={`${template.name} ${t.templateCard.imageAltSuffix}`}
          className="h-full w-full object-cover object-top aspect-video transition-transform duration-500 group-hover:scale-[1.04]"
          draggable={false}
          fill
          src={template.image}
        />
      </Link>

      <CardContent className="flex flex-1 flex-col space-y-3 p-4 sm:space-y-3.5 sm:p-5 h-full">
        {/* Category & Realtime View Counter Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex max-w-[55%] w-fit h-fit py-1 items-center gap-x-1.5 truncate text-[11px] font-bold text-slate-700 sm:gap-2 sm:text-xs">
            <Icon className="size-3.5 shrink-0 text-brand-primary" />
            <span className="truncate">{template.category}</span>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-300 select-none ${
              isHighlighted
                ? "bg-emerald-500 text-white scale-105 shadow-md shadow-emerald-500/25 ring-2 ring-emerald-300 font-bold"
                : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 font-medium"
            }`}
            title={`${views.toLocaleString("id-ID")} kali dilihat`}
          >
            <Eye className={`size-3.5 shrink-0 ${isHighlighted ? "text-white animate-pulse" : "text-brand-primary"}`} />
            <span className="font-semibold tabular-nums">{views.toLocaleString("id-ID")}</span>
            <span className="text-[10px] text-slate-400 font-normal">kali</span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-950 transition-colors duration-200 group-hover:text-brand-primary sm:text-lg">
            {template.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {template.subcategory}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <Badge
              className="border border-emerald-100 bg-white px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-slate-600 transition hover:bg-emerald-50 hover:text-slate-700 sm:px-2.5 sm:py-1 sm:text-[10px]"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2 sm:gap-3 sm:pt-3 h-full items-end">
          <Link
            className="flex-1"
            href={template.previewHref ?? "#"}
            rel={template.previewHref ? "noreferrer" : undefined}
            target={template.previewHref ? "_blank" : undefined}
            onClick={() => recordTemplateView(template.id)}
          >
            <Button
              className="h-9 w-full gap-1 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 transition-all hover:border-brand-primary/50 hover:bg-emerald-50 hover:text-slate-900 sm:h-10 sm:gap-1.5 sm:text-sm"
              size="sm"
              variant="outline"
            >
              <ExternalLink className="size-3.5" />
              <span>{t.templateCard.preview}</span>
            </Button>
          </Link>
          <a className="flex-1" href={checkoutUrl}>
            <Button className="h-9 w-full gap-1 rounded-full bg-brand-primary text-xs font-medium text-slate-950 shadow-md shadow-brand-primary/20 transition-all hover:bg-brand-primary-hover hover:shadow-lg hover:shadow-brand-primary/30 sm:h-10 sm:gap-1.5 sm:text-sm" size="sm">
              <ShoppingCart className="size-3.5" />
              <span>Beli</span>
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
