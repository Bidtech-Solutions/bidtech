"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export default function LanguageSwitcher({
  className,
  showIcon = true,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-0.5 rounded-xl bg-[#F4F4F2] border border-border/70 shadow-2xs",
        className
      )}
      role="group"
      aria-label="Language Selector"
    >
      {showIcon && (
        <span className="pl-1.5 pr-0.5 text-text-400 select-none">
          <Globe className="w-3.5 h-3.5 text-text-500" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={cn(
          "px-2 py-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer select-none",
          language === "id"
            ? "bg-white text-ink-900 shadow-xs border border-border/60"
            : "text-text-500 hover:text-ink-900"
        )}
        aria-pressed={language === "id"}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer select-none",
          language === "en"
            ? "bg-white text-ink-900 shadow-xs border border-border/60"
            : "text-text-500 hover:text-ink-900"
        )}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

