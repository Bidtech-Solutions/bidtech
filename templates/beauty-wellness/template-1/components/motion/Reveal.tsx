"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: shouldReduceMotion
          ? 0
          : 0.72,
        delay: shouldReduceMotion
          ? 0
          : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("w-full max-w-full min-w-0", className)}
    >
      {children}
    </motion.div>
  );
}
