"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const STORAGE_PREFIX = "dough:scroll:";

function scrollKey(pathname: string) {
  return `${STORAGE_PREFIX}${pathname}`;
}

function readSavedY(pathname: string) {
  try {
    const raw = sessionStorage.getItem(scrollKey(pathname));
    if (raw == null) return null;
    const y = Number(raw);
    return Number.isFinite(y) && y >= 0 ? y : null;
  } catch {
    return null;
  }
}

function saveScrollY(pathname: string) {
  try {
    sessionStorage.setItem(scrollKey(pathname), String(window.scrollY));
  } catch {
    /* private mode / quota */
  }
}

function scrollToY(y: number) {
  window.scrollTo(0, y);
  document.documentElement.scrollTop = y;
  document.body.scrollTop = y;
}

function isReloadNavigation() {
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return nav?.type === "reload";
}

/** Keeps scroll position on hard refresh; client navigations still start at the top. */
export function ScrollRestore() {
  const pathname = usePathname();
  /** Set after the first pathname handled for this document load (SPA navigations follow). */
  const hasHandledRouteRef = useRef(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const isSpaNavigation = hasHandledRouteRef.current;
    hasHandledRouteRef.current = true;

    const shouldRestoreOnLoad = !isSpaNavigation && isReloadNavigation();

    if (shouldRestoreOnLoad) {
      const y = readSavedY(pathname);
      if (y == null) return;

      const restore = () => scrollToY(y);
      restore();
      const raf = requestAnimationFrame(restore);
      const timers = [0, 50, 150, 350, 700].map((ms) =>
        window.setTimeout(restore, ms),
      );

      return () => {
        cancelAnimationFrame(raf);
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    scrollToY(0);
  }, [pathname]);

  useEffect(() => {
    const save = () => saveScrollY(pathname);

    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(save, 120);
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      const y = readSavedY(pathname);
      if (y != null) scrollToY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    window.addEventListener("beforeunload", save);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pageshow", onPageShow);
      save();
    };
  }, [pathname]);

  return null;
}
