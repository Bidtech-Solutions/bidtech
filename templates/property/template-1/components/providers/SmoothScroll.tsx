"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      // Direct V-Sync Hardware Synchronized Lenis Engine
      const lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Make lenis accessible globally on window for programmatic scrolling
      (window as any).lenis = lenis;

      // Synchronize ScrollTrigger with Lenis
      lenis.on("scroll", ScrollTrigger.update);

      // Smooth scroll for all hash anchor links (e.g. #gallery, #about, #properties, #locations, #contact)
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -30,
              duration: 1.4,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      // Hardware V-Sync Direct Loop
      let animationFrameId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };

      animationFrameId = requestAnimationFrame(raf);

      cleanup = () => {
        document.removeEventListener("click", handleAnchorClick);
        cancelAnimationFrame(animationFrameId);
        lenis.destroy();
        delete (window as any).lenis;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
