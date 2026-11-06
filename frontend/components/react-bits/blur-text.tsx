"use client";

import { motion } from "motion/react";

export interface BlurTextSegment {
  text: string;
  className?: string;
}

interface BlurTextProps {
  segments: BlurTextSegment[];
  className?: string;
  delayStep?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

export function BlurText({
  segments,
  className = "",
  delayStep = 0.06,
  as: Component = "h2",
}: BlurTextProps) {
  // Flatten words while preserving each segment's className
  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    const splitWords = seg.text.trim().split(/\s+/);
    splitWords.forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <Component className={className}>
      {words.map((item, idx) => (
        <motion.span
          key={`${item.word}-${idx}`}
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.55,
            delay: idx * delayStep,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${item.className ?? ""}`}
        >
          {item.word}
          {idx < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Component>
  );
}

