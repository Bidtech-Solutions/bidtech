"use client";

import React from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

export function LanguageSwitcher({
  className,
  showIcon = true,
  compact = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language Selector"
      className={cn(
        "inline-flex items-center rounded-full p-0.5 sm:p-1 bg-neutral-100/90 dark:bg-white/10 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 shadow-xs select-none transition-all",
        className
      )}
    >
      {showIcon && (
        <span className="pl-1.5 pr-0.5 text-muted-foreground hidden xs:inline-flex items-center">
          <Globe className="size-3 sm:size-3.5" />
        </span>
      )}

      <button
        type="button"
        onClick={() => setLanguage("id")}
        aria-pressed={language === "id"}
        className={cn(
          "px-2 sm:px-2.5 py-1 rounded-full font-bold transition-all duration-200 cursor-pointer",
          compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs",
          language === "id"
            ? "bg-brand-500 text-white shadow-glow font-extrabold scale-100"
            : "text-muted-foreground hover:text-foreground hover:bg-neutral-200/60 dark:hover:bg-white/10"
        )}
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={cn(
          "px-2 sm:px-2.5 py-1 rounded-full font-bold transition-all duration-200 cursor-pointer",
          compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs",
          language === "en"
            ? "bg-brand-500 text-white shadow-glow font-extrabold scale-100"
            : "text-muted-foreground hover:text-foreground hover:bg-neutral-200/60 dark:hover:bg-white/10"
        )}
      >
        EN
      </button>
    </div>
  );
}
