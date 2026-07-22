"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BakingLoader } from "./baking-loader";
import { cn } from "@/lib/utils";

const NAV_LOADER_MAX_MS = 6000;

function isInternalLink(href: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/#") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  );
}

function isInitialLoadDone() {
  return (
    typeof document !== "undefined" &&
    document.body.dataset.initialLoad === "done"
  );
}

export function NavigationLoader() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isInitialLoadDone()) {
      setEnabled(true);
      return;
    }

    const timer = window.setInterval(() => {
      if (isInitialLoadDone()) {
        setEnabled(true);
        window.clearInterval(timer);
      }
    }, 100);

    const fallback = window.setTimeout(() => {
      setEnabled(true);
      window.clearInterval(timer);
    }, 5000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (!isNavigating) return;

    const safetyTimer = window.setTimeout(() => {
      setIsNavigating(false);
    }, NAV_LOADER_MAX_MS);

    return () => window.clearTimeout(safetyTimer);
  }, [isNavigating]);

  useEffect(() => {
    if (!enabled) return;

    const handleNavigate = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !isInternalLink(href)) return;

      const targetPath = href.split("#")[0];
      if (!targetPath || targetPath === pathname) return;

      setIsNavigating(true);
    };

    document.addEventListener("click", handleNavigate, true);

    return () => {
      document.removeEventListener("click", handleNavigate, true);
    };
  }, [enabled, pathname]);

  if (!enabled || !isNavigating) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-navy touch-none"
      aria-busy="true"
      aria-live="polite">
      <BakingLoader className="h-full w-full min-h-[100dvh]" showLabel />
    </div>
  );
}
