"use client";

import Image from "next/image";
import { useState } from "react";

export interface LogoLoopItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LogoLoopProps {
  logos: LogoLoopItem[];
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export function LogoLoop({
  logos,
  speedSeconds = 26,
  pauseOnHover = true,
  className = "",
  itemClassName = "",
}: LogoLoopProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex w-max min-w-max items-center gap-12 sm:gap-16 lg:gap-24 will-change-transform"
        style={{
          animation: `mitra-marquee ${speedSeconds}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {[0, 1, 2, 3].map((groupIndex) => (
          <div
            key={`logo-loop-group-${groupIndex}`}
            aria-hidden={groupIndex !== 0}
            className="flex shrink-0 items-center gap-12 sm:gap-16 lg:gap-24"
          >
            {logos.map((logo, idx) => (
              <div
                key={`${logo.alt}-${groupIndex}-${idx}`}
                className={`group flex shrink-0 items-center justify-center transition-all duration-300 ${itemClassName}`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width ?? 180}
                  height={logo.height ?? 64}
                  className="h-9 sm:h-11 md:h-12 w-auto max-w-[140px] sm:max-w-[180px] object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 select-none"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

