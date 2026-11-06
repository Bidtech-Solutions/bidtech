"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * SplitText (pola React Bits): teks muncul huruf per huruf saat masuk layar.
 * Huruf dalam satu kata dibungkus bersama agar kata tidak terpotong ke baris baru.
 */

export interface SplitTextSegment {
  text: string;
  /** Class untuk setiap huruf di segmen ini, mis. gradient hijau. */
  className?: string;
  /** Mulai baris baru (block) sebelum segmen ini. */
  newLine?: boolean;
}

interface SplitTextProps {
  segments: SplitTextSegment[];
  className?: string;
  /** Class tambahan untuk setiap baris bila teks dipecah dengan `newLine`. */
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  /** Jeda antarhuruf (detik). */
  charDelay?: number;
  /** Durasi animasi setiap huruf (detik). */
  duration?: number;
  /** Jeda sebelum huruf pertama muncul (detik). */
  delay?: number;
  /**
   * "view" (default): animasi JS saat teks masuk layar.
   * "load": animasi CSS yang langsung jalan saat halaman tampil, tanpa menunggu JavaScript.
   * Pakai "load" untuk judul di atas lipatan (hero) agar tidak menunda LCP.
   */
  animateOn?: "view" | "load";
}

const EASE = [0.16, 1, 0.3, 1] as const;

const CHAR_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  visible: ({ delay, duration }: { delay: number; duration: number }) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: EASE },
  }),
};

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
};

export function SplitText({
  segments,
  className = "",
  lineClassName = "",
  as = "h2",
  charDelay = 0.03,
  duration = 0.6,
  delay = 0,
  animateOn = "view",
}: SplitTextProps) {
  const cssMode = animateOn === "load";
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  // Kelompokkan segmen per baris
  const lines: SplitTextSegment[][] = [];
  segments.forEach((segment, index) => {
    if (index === 0 || segment.newLine) lines.push([]);
    lines[lines.length - 1].push(segment);
  });

  const fullText = lines.map((line) => line.map((s) => s.text.trim()).join(" ")).join(" ");
  let charIndex = 0;

  const renderLine = (line: SplitTextSegment[]) => {
    const words = line.flatMap((segment) =>
      segment.text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, className: segment.className })),
    );

    return words.map((item, wordIndex) => (
      <Fragment key={`${item.word}-${wordIndex}`}>
        <span className="inline-block whitespace-nowrap">
          {Array.from(item.word).map((char, i) => {
            const custom = { delay: delay + charIndex++ * charDelay, duration };
            if (cssMode) {
              return (
                <span
                  key={`${char}-${i}`}
                  className={`split-char inline-block ${item.className ?? ""}`}
                  style={{ animationDelay: `${custom.delay}s`, animationDuration: `${duration}s` }}
                >
                  {char}
                </span>
              );
            }
            return (
              <motion.span
                key={`${char}-${i}`}
                custom={custom}
                variants={CHAR_VARIANTS}
                className={`inline-block ${item.className ?? ""}`}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
        {wordIndex < words.length - 1 ? " " : null}
      </Fragment>
    ));
  };

  const content =
    lines.length > 1
      ? lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {renderLine(line)}
          </span>
        ))
      : renderLine(lines[0] ?? []);

  if (cssMode) {
    const Tag = as;
    return (
      <Tag className={className} aria-label={fullText}>
        <span aria-hidden="true">{content}</span>
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-label={fullText}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <span aria-hidden="true">{content}</span>
    </MotionTag>
  );
}
