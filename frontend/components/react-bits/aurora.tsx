"use client";

import { CSSProperties } from "react";

interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  className?: string;
  opacity?: number;
}

export function Aurora({
  colorStops = ["#45a02e", "#5fc94a", "#a3e635", "#16a34a", "#86efac"],
  speed = 1.0,
  className = "",
  opacity = 0.45,
}: AuroraProps) {
  const c1 = colorStops[0] || "#45a02e";
  const c2 = colorStops[1] || "#5fc94a";
  const c3 = colorStops[2] || "#a3e635";
  const c4 = colorStops[3] || "#16a34a";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Aurora Layer 1: Base Flowing Mesh */}
      <div
        className="absolute -inset-[15%] blur-[70px] filter transition-all will-change-transform"
        style={
          {
            opacity,
            backgroundImage: `
              radial-gradient(ellipse 70% 55% at 50% -15%, ${c1}, transparent 70%),
              radial-gradient(ellipse 65% 50% at 85% 20%, ${c2}, transparent 65%),
              radial-gradient(ellipse 55% 45% at 15% 35%, ${c3}, transparent 65%),
              radial-gradient(ellipse 75% 55% at 50% 75%, ${c4}, transparent 70%)
            `,
            animation: `aurora-flow ${20 / speed}s ease-in-out infinite alternate`,
          } as CSSProperties
        }
      />

      {/* Aurora Layer 2: Swirling Highlights */}
      <div
        className="absolute -inset-[15%] blur-[90px] filter mix-blend-screen transition-all will-change-transform"
        style={
          {
            opacity: opacity * 0.8,
            backgroundImage: `
              radial-gradient(ellipse 50% 45% at 30% 25%, ${c2}, transparent 60%),
              radial-gradient(ellipse 60% 50% at 75% 35%, ${c3}, transparent 60%),
              radial-gradient(ellipse 80% 50% at 50% 10%, ${c1}, transparent 70%)
            `,
            animation: `aurora-swirl ${26 / speed}s ease-in-out infinite alternate`,
          } as CSSProperties
        }
      />
    </div>
  );
}

