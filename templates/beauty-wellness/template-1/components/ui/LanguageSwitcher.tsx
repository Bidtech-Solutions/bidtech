"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "navbar" | "footer" | "mobile";
};

export function LanguageSwitcher({
  className,
  variant = "navbar",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  if (variant === "footer") {
    return (
      <div className={cn("inline-flex items-center gap-2 text-xs", className)}>
        <Globe size={14} className="text-white/40" />
        <span className="text-white/40 font-medium">Bahasa:</span>
        <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/10">
          <button
            type="button"
            onClick={() => setLocale("id")}
            aria-label="Ganti bahasa ke Indonesia"
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-all duration-300",
              locale === "id"
                ? "bg-[var(--color-primary)] text-white shadow-xs"
                : "text-white/50 hover:text-white"
            )}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            aria-label="Switch language to English"
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-all duration-300",
              locale === "en"
                ? "bg-[var(--color-primary)] text-white shadow-xs"
                : "text-white/50 hover:text-white"
            )}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={cn("flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5", className)}>
        <div className="flex items-center gap-2.5 text-xs font-semibold text-white/70">
          <Globe size={16} className="text-[var(--color-primary)]" />
          <span>Bahasa / Language</span>
        </div>
        <div className="inline-flex rounded-full bg-black/40 p-1 border border-white/15">
          <button
            type="button"
            onClick={() => setLocale("id")}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-all duration-300",
              locale === "id"
                ? "bg-[var(--color-primary)] text-white shadow-md"
                : "text-white/60 hover:text-white"
            )}
          >
            Indonesia
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-all duration-300",
              locale === "en"
                ? "bg-[var(--color-primary)] text-white shadow-md"
                : "text-white/60 hover:text-white"
            )}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  // Default navbar pill
  return (
    <div
      className={cn(
        "relative z-50 inline-flex items-center rounded-full border border-white/20 bg-white/10 p-0.5 backdrop-blur-md",
        className
      )}
      role="group"
      aria-label="Pilih Bahasa / Select Language"
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        aria-label="Ganti bahasa ke Indonesia"
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-300",
          locale === "id"
            ? "bg-[var(--color-primary)] text-white shadow-xs"
            : "text-white/60 hover:text-white"
        )}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-label="Switch language to English"
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-300",
          locale === "en"
            ? "bg-[var(--color-primary)] text-white shadow-xs"
            : "text-white/60 hover:text-white"
        )}
      >
        EN
      </button>
    </div>
  );
}
