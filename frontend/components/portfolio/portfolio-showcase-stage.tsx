"use client";

import Image from "next/image";
import type { PortfolioDetailItem } from "@/lib/data/portfolio";

interface PortfolioShowcaseStageProps {
  item: PortfolioDetailItem;
}

export function PortfolioShowcaseStage({ item }: PortfolioShowcaseStageProps) {
  // Dynamic 3-Device Frame Stage (iMac Desktop, iPad Tablet, iPhone Mobile)
  const desktopSrc = item.laptopImage || item.image;
  const tabletSrc = item.tabletImage || item.image;
  const mobileSrc = item.mobileImage || item.image;

  return (
    <div className="relative mx-auto w-full max-w-[340px] min-[400px]:max-w-[380px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px] xl:max-w-[640px] aspect-[4/3] select-none flex items-center justify-center">
      {/* 1. Desktop iMac Monitor (Left Background) */}
      <div className="absolute left-0 top-[4%] w-[74%] sm:w-[72%] z-0 drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)] sm:drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]">
        {/* iMac Screen Chassis */}
        <div className="relative rounded-t-[14px] sm:rounded-t-[18px] bg-[#0c1017] p-1.5 sm:p-2 pb-0 border-2 sm:border-[2.5px] border-[#1e293b] shadow-2xl ring-1 ring-white/10">
          {/* Top Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 size-1.5 sm:size-2 rounded-full bg-slate-900 ring-1 ring-slate-700/60 flex items-center justify-center z-20">
            <span className="size-0.5 rounded-full bg-blue-500/80" />
          </div>

          {/* Screen Display Frame */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[10px] sm:rounded-t-[12px] bg-slate-950 shadow-inner">
            {desktopSrc && (
              <Image
                src={desktopSrc}
                alt={`${item.title} Desktop View`}
                fill
                className="object-cover object-top transition-opacity duration-500"
                sizes="(max-width: 768px) 60vw, 420px"
                priority
              />
            )}
            {/* Glass Sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent z-20"
            />
          </div>

          {/* iMac Aluminum Chin */}
          <div className="h-3.5 sm:h-4.5 w-full bg-gradient-to-r from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] border-t border-[#94a3b8] rounded-b-sm flex items-center justify-center">
            <span className="size-1 sm:size-1.5 rounded-full bg-slate-700/60" />
          </div>
        </div>

        {/* iMac Stand Neck & Flat Base Foot */}
        <div className="w-12 sm:w-16 h-9 sm:h-11 bg-gradient-to-b from-[#cbd5e1] via-[#94a3b8] to-[#64748b] mx-auto -mt-0.5 shadow-inner" />
        <div className="w-28 sm:w-36 h-2 sm:h-2.5 bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] rounded-[2px] shadow-md mx-auto" />
        <div className="w-[85%] h-3 sm:h-4 bg-slate-900/25 blur-md rounded-full mx-auto -mt-1" />
      </div>

      {/* 2. Upright iPad Tablet (Right Side) */}
      <div className="absolute right-0 top-[10%] sm:top-[8%] w-[42%] sm:w-[41%] z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
        <div className="relative rounded-[18px] sm:rounded-[24px] bg-[#0c1017] p-1.5 sm:p-2 border-[2px] border-[#334155] shadow-2xl">
          {/* Top Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-slate-900 z-20" />

          {/* iPad Screen Frame */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[13px] sm:rounded-[18px] bg-slate-950 shadow-inner">
            {tabletSrc && (
              <Image
                src={tabletSrc}
                alt={`${item.title} Tablet View`}
                fill
                className="object-cover object-top transition-opacity duration-500"
                sizes="(max-width: 768px) 35vw, 240px"
              />
            )}
            {/* Glass Sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent z-20"
            />
            {/* iPadOS Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-[2px] rounded-full bg-white/70 z-20" />
          </div>
        </div>
        <div className="w-[80%] h-3 bg-slate-900/20 blur-md rounded-full mx-auto mt-1" />
      </div>

      {/* 3. Upright iPhone Mobile (Foreground Center Overlap) */}
      <div className="absolute left-[36%] bottom-[2%] sm:bottom-[1%] w-[26%] sm:w-[25%] z-20 drop-shadow-[0_25px_45px_rgba(0,0,0,0.32)]">
        <div className="relative rounded-[24px] sm:rounded-[30px] bg-[#0c1017] p-1.5 sm:p-2 border-[2px] sm:border-[2.5px] border-[#475569] shadow-2xl">
          {/* Dynamic Island Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-9 sm:w-12 h-2.5 sm:h-3.5 bg-black rounded-full z-30 flex items-center justify-end pr-1 shadow-sm">
            <span className="size-1 rounded-full bg-[#1e293b]" />
          </div>

          {/* iPhone Screen Frame */}
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[18px] sm:rounded-[24px] bg-slate-950 shadow-inner">
            {mobileSrc && (
              <Image
                src={mobileSrc}
                alt={`${item.title} Mobile View`}
                fill
                className="object-cover object-top transition-opacity duration-500"
                sizes="(max-width: 768px) 25vw, 160px"
              />
            )}
            {/* Glass Sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent z-20"
            />
            {/* iOS Home Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-9 sm:w-12 h-[2px] rounded-full bg-white/70 z-30" />
          </div>
        </div>
      </div>
    </div>
  );
}
