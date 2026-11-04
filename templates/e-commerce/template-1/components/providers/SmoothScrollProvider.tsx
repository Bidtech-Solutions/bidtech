"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Reset scroll to top cleanly and purge obsolete ScrollTriggers whenever route changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Kill any orphaned ScrollTriggers whose elements are unmounted
    ScrollTrigger.getAll().forEach((trigger) => {
      const el = trigger.trigger as HTMLElement | null;
      if (el && !document.contains(el)) {
        trigger.kill();
      }
    });

    // Refresh ScrollTrigger cleanly after the new page DOM has painted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      // Inisiasi Lenis Smooth Scroll - Tuned for fast, natural response
      const lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
        prevent: (node) => {
          const el = (node as HTMLElement)?.closest
            ? (node as HTMLElement)
            : ((node as Node)?.parentElement as HTMLElement | null);
          return !!(
            el?.hasAttribute?.('data-lenis-prevent') ||
            el?.closest?.('[data-lenis-prevent]')
          );
        },
      });

      window.__lenis = lenis;

      // Hubungkan event scroll Lenis ke GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Gunakan ticker bawaan GSAP untuk sinkronisasi frame rate (RAF)
      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(500, 33);

      cleanup = () => {
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
        delete window.__lenis;
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
