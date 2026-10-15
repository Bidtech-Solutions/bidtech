"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  try {
    window.history.scrollRestoration = "manual";
  } catch (e) {}
}

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisInstanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisInstanceRef.current = lenis;

      // Attach to global window for nav anchors and GSAP synchronization
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      // When newly mounted, ensure scroll starts from the top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      lenis.scrollTo(0, { immediate: true, force: true });

      // Synchronize Lenis scroll updates with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
        lenisInstanceRef.current = null;
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Force scroll to top whenever pathname changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (lenisInstanceRef.current) {
        lenisInstanceRef.current.scrollTo(0, { immediate: true, force: true });
      }
      const globalLenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (globalLenis) {
        globalLenis.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    };

    resetToTop();

    // Additional checks on animation frame and short delay to handle Next.js client transition
    const r1 = requestAnimationFrame(resetToTop);
    const t1 = setTimeout(resetToTop, 50);
    const t2 = setTimeout(resetToTop, 180);

    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return <>{children}</>;
}
