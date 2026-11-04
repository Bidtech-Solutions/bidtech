"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageProgressBar() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname changes, complete the progress bar smoothly
  useEffect(() => {
    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Global link click interceptor for instant visual tactile feedback
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find nearest <a> tag
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only trigger on internal route changes that actually switch pages
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      const isTargetBlank = target.getAttribute("target") === "_blank";
      const isHashOnly = href.startsWith("#");
      const isSamePage = href === pathname || href === `${pathname}#` || href.startsWith(`${pathname}#`);

      if (isInternal && !isTargetBlank && !isHashOnly && !isSamePage) {
        setIsNavigating(true);
        setProgress(25);
        setTimeout(() => setProgress(70), 80);
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => document.removeEventListener("click", handleDocumentClick, { capture: true });
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none h-[2.5px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-amber-300 shadow-[0_0_12px_rgba(217,164,65,0.8)] transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "160ms" : "250ms",
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}

