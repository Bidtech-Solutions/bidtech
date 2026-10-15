"use client";

import { motion } from "motion/react";

import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface StatsProps {
  isMobileFlow?: boolean;
}

export function Stats({ isMobileFlow }: StatsProps) {
  const { t } = useLanguage();
  const labelsMap = t.home.stats.labels;

  return (
    <div className={cn("relative z-20 w-full", isMobileFlow ? "px-0" : "px-0")}>
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-xl sm:rounded-[2rem] sm:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-6 md:gap-8">
          {siteConfig.stats.map((stat, index) => {
            const localizedLabel = labelsMap[stat.label as keyof typeof labelsMap] || stat.label;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="text-center"
              >
                <div className="font-heading text-2xl font-extrabold tracking-tight text-[var(--color-primary)] sm:text-3xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-black/60 sm:text-xs lg:text-sm">
                  {localizedLabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
