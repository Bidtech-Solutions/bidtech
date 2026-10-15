"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

interface ArticleCoverImageProps {
  src?: string | null;
  alt: string;
  title?: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function ArticleCoverImage({
  src,
  alt,
  title,
  className = "",
  aspectRatio = "aspect-[16/9]",
  priority = false,
}: ArticleCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  if (showFallback) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#163812] via-[#23581c] to-[#122e0f] text-white flex flex-col justify-between p-6 sm:p-8 ${aspectRatio} ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle decorative geometric overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(#5ec344_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 bg-[#45a02e]/25 rounded-full blur-3xl pointer-events-none"
        />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md text-emerald-100 border border-white/10">
            <BookOpen className="size-3.5 text-[#a3f08d]" />
            <span>Bidtech Insights</span>
          </div>
          <span className="text-[11px] font-bold tracking-widest text-[#a3f08d]/80 uppercase">
            Official Blog
          </span>
        </div>

        {/* Center / Bottom Title Typography */}
        <div className="relative z-10 my-auto py-2">
          <p className="font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-lg sm:text-2xl font-bold leading-snug line-clamp-2 text-white/95 drop-shadow-xs">
            {title || alt}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-emerald-200/80 pt-2 border-t border-white/10">
          <span className="font-semibold">PT Inovasi Solusi Digital</span>
          <span className="font-mono">bidtech.co.id</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectRatio} ${className} bg-slate-100`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
        loading={priority ? "eager" : "lazy"}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
