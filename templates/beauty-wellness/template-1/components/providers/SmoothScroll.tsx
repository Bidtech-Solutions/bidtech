"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({
  children,
}: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });

      lenisRef.current = lenis;

      let frameId: number;

      const raf = (time: number) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);

      const handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        const anchor = target.closest<HTMLAnchorElement>(
          'a[href^="#"]'
        );

        if (!anchor) return;

        const href = anchor.getAttribute("href");

        if (!href || href === "#") return;

        const element = document.querySelector(href);

        if (!element) return;

        event.preventDefault();

        lenis.scrollTo(element as HTMLElement, {
          offset: -90,
          duration: 1.1,
        });
      };

      document.addEventListener("click", handleAnchorClick);

      cleanup = () => {
        cancelAnimationFrame(frameId);

        document.removeEventListener(
          "click",
          handleAnchorClick
        );

        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return children;
}
