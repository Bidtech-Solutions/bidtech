"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, ImageIcon } from "lucide-react";
import { SpotlightCard } from "@/components/react-bits";
import type { FeaturedSolutionItem } from "@/lib/data/featured-solutions";

function AndroidIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Android">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8 12 8s-3.5902.4116-5.1368.9507L4.841 5.4477a.416.416 0 00-.5677-.1521.4157.4157 0 00-.152.5676l1.9972 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
    </svg>
  );
}

function AppleIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="iOS">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.94-1 .04-2.22.67-2.91 1.48-.59.69-1.12 1.8-1 2.89 1.12.09 2.34-.65 2.97-1.43z" />
    </svg>
  );
}

interface SolutionCardProps {
  item: FeaturedSolutionItem;
  isEn: boolean;
  priority?: boolean;
}

export function SolutionCard({ item, isEn, priority = false }: SolutionCardProps) {
  const isExternal = item.href?.startsWith("http") ?? false;

  return (
    <SpotlightCard
      spotlightColor="rgba(69, 160, 46, 0.14)"
      className="group flex flex-col justify-between h-full rounded-[24px] sm:rounded-[28px] border border-slate-200/90 bg-gradient-to-b from-white via-white to-slate-50/60 hover:border-[#45a02e]/60 transition-all duration-300 overflow-hidden"
    >
      {/* Top: Full-Bleed Showcase Mockup Banner (placeholder bila gambar belum ada) */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden bg-slate-900/5">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top select-none transition-transform duration-500 ease-out group-hover:scale-104"
            priority={priority}
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#edf8eb] via-white to-emerald-50 text-[#45a02e]">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-[#45a02e]/20 bg-white shadow-[0_6px_20px_rgba(69,160,46,0.12)]">
              <ImageIcon className="size-6" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-[#3d8f28]">
              {isEn ? "Preview coming soon" : "Tampilan segera hadir"}
            </span>
          </div>
        )}
      </div>

      {/* Middle: Content Body */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 text-left">
        <div>
          <h3 className="font-[family-name:var(--font-plus-jakarta),sans-serif] text-xl sm:text-2xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-[#45a02e]">
            {item.title}
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-5">
            {isEn ? item.descriptionEn : item.description}
          </p>
        </div>

        {/* Bottom: Footer Meta & CTA Link */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          {/* Platform Icons ONLY */}
          <div className="flex items-center gap-2">
            {item.platforms.includes("android") && (
              <span title="Android App" className="text-[#22c55e]">
                <AndroidIcon className="size-4" />
              </span>
            )}
            {item.platforms.includes("web") && (
              <span title="Web Platform" className="text-[#0284c7]">
                <Globe className="size-3.5" />
              </span>
            )}
            {item.platforms.includes("ios") && (
              <span title="iOS App" className="text-slate-600">
                <AppleIcon className="size-4" />
              </span>
            )}
          </div>

          {/* Action Link: Lihat Situs -> (disembunyikan bila situs belum ada) */}
          {item.href ? (
            <Link
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#45a02e] hover:text-[#388e22] transition-colors"
            >
              <span>{isEn ? "Visit Site" : "Lihat Situs"}</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
            </Link>
          ) : (
            <span className="text-xs sm:text-sm font-medium text-slate-400">
              {isEn ? "Coming soon" : "Segera hadir"}
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
