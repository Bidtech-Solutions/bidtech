"use client";

import { motion } from "motion/react";

export function HeroCharacterBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center select-none overflow-visible"
    >
      {/* 1. LAYER UTAMA: BULATAN AURORA (GLOWING AURORA ORB) */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.82, 0.95, 0.82],
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] xs:size-[360px] sm:size-[440px] lg:size-[490px] xl:size-[530px]"
      >
        {/* Core Emerald & Lime Radial Gradient */}
        <div
          className="size-full rounded-full blur-[70px] sm:blur-[90px] lg:blur-[105px] filter transition-all will-change-transform"
          style={{
            background: `
              radial-gradient(circle at 48% 45%, rgba(163, 230, 53, 0.42) 0%, rgba(69, 160, 46, 0.32) 36%, rgba(34, 197, 94, 0.18) 58%, transparent 75%)
            `,
          }}
        />

        {/* Ambient Secondary Glow (Mint & Emerald Shimmer) */}
        <div
          className="absolute inset-4 rounded-full blur-[60px] sm:blur-[80px] filter mix-blend-multiply opacity-80"
          style={{
            background: `
              radial-gradient(circle at 55% 52%, rgba(74, 222, 128, 0.35) 0%, rgba(69, 160, 46, 0.22) 45%, transparent 70%)
            `,
          }}
        />
      </motion.div>

      {/* 2. AKSEN TITIK BERKILAU (SUBTLE GLOWING PARTICLES) */}
      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[22%] left-[20%] size-2 rounded-full bg-[#a3e635] shadow-[0_0_10px_#a3e635]"
      />
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.85, 0.3] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[28%] right-[16%] size-2.5 rounded-full bg-[#45a02e] shadow-[0_0_12px_#45a02e]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[32%] right-[22%] size-1.5 rounded-full bg-[#86efac] shadow-[0_0_8px_#86efac]"
      />
    </div>
  );
}

