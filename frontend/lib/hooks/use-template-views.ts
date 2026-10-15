"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { fetchRealtimeViews, type ExtendedTemplateItem } from "@/lib/api/template-api";

export interface UseTemplateViewsOptions {
  initialTemplates?: ExtendedTemplateItem[];
  pollIntervalMs?: number;
  enablePolling?: boolean;
}

export function useTemplateViews(options?: UseTemplateViewsOptions) {
  const {
    initialTemplates = [],
    pollIntervalMs = 3500,
    enablePolling = true,
  } = options || {};

  const [viewsMap, setViewsMap] = useState<Record<number, number>>(() => {
    const map: Record<number, number> = {};
    initialTemplates.forEach((t) => {
      if (t.id) {
        map[t.id] = t.views ?? 0;
      }
    });
    return map;
  });

  const [highlightedIds, setHighlightedIds] = useState<Record<number, boolean>>({});
  const highlightTimersRef = useRef<Record<number, NodeJS.Timeout>>({});
  const prevViewsRef = useRef<Record<number, number>>({});

  // Trigger pulse highlight animation for a specific template ID
  const triggerHighlight = useCallback((id: number) => {
    if (highlightTimersRef.current[id]) {
      clearTimeout(highlightTimersRef.current[id]);
    }

    setHighlightedIds((prev) => ({ ...prev, [id]: true }));

    highlightTimersRef.current[id] = setTimeout(() => {
      setHighlightedIds((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      delete highlightTimersRef.current[id];
    }, 2000);
  }, []);

  // Update views from external source and highlight if increased
  const syncViews = useCallback(
    (newMap: Record<number, number>) => {
      setViewsMap((prev) => {
        const updated = { ...prev, ...newMap };
        Object.entries(newMap).forEach(([idStr, newCount]) => {
          const id = Number(idStr);
          const oldCount = prev[id] ?? prevViewsRef.current[id];
          if (oldCount !== undefined && newCount > oldCount) {
            triggerHighlight(id);
          }
        });
        prevViewsRef.current = updated;
        return updated;
      });
    },
    [triggerHighlight]
  );

  // Sync initialTemplates if they change (e.g. after fetchTemplates resolves)
  useEffect(() => {
    if (initialTemplates.length > 0) {
      setViewsMap((prev) => {
        const next = { ...prev };
        initialTemplates.forEach((t) => {
          if (t.id && next[t.id] === undefined) {
            next[t.id] = t.views ?? 0;
          }
        });
        prevViewsRef.current = next;
        return next;
      });
    }
  }, [initialTemplates]);

  // Listen to local view events (e.g., when user clicks preview on the page)
  useEffect(() => {
    const handleViewedEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{
        templateId: number;
        data?: { views?: number };
      }>;
      const id = customEvent.detail?.templateId;
      const newViews = customEvent.detail?.data?.views;

      if (id) {
        setViewsMap((prev) => {
          const current = prev[id] ?? 0;
          const updatedViews = typeof newViews === "number" ? newViews : current + 1;
          return { ...prev, [id]: updatedViews };
        });
        triggerHighlight(id);
      }
    };

    window.addEventListener("bidtech:template-viewed", handleViewedEvent);
    return () => {
      window.removeEventListener("bidtech:template-viewed", handleViewedEvent);
    };
  }, [triggerHighlight]);

  // Background polling for real-time multi-client updates
  useEffect(() => {
    if (!enablePolling) return;

    let isMounted = true;

    const performSync = async () => {
      if (typeof document !== "undefined" && document.hidden) {
        return;
      }
      const remoteMap = await fetchRealtimeViews();
      if (isMounted && remoteMap) {
        syncViews(remoteMap);
      }
    };

    // Immediate initial sync
    performSync();

    const intervalId = setInterval(performSync, pollIntervalMs);

    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && !document.hidden) {
        performSync();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Clean up any remaining highlight timers
      Object.values(highlightTimersRef.current).forEach(clearTimeout);
    };
  }, [enablePolling, pollIntervalMs, syncViews]);

  const getViewCount = useCallback(
    (id: number, fallback = 0): number => {
      return viewsMap[id] ?? fallback;
    },
    [viewsMap]
  );

  const isHighlighted = useCallback(
    (id: number): boolean => {
      return !!highlightedIds[id];
    },
    [highlightedIds]
  );

  return {
    viewsMap,
    highlightedIds,
    getViewCount,
    isHighlighted,
    triggerHighlight,
  };
}
