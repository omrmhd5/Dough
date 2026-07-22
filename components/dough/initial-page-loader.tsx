"use client";

import { useEffect, useState } from "react";
import { BakingLoader, BAKING_LOADER_CYCLE_MS } from "./baking-loader";
import { cn } from "@/lib/utils";

const FADE_MS = 400;
const MAX_LOADER_MS = 4500;

function getMinLoaderMs() {
  if (typeof window === "undefined") return 2200;
  return window.innerWidth < 768 ? 1800 : BAKING_LOADER_CYCLE_MS + 300;
}

export function InitialPageLoader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let finished = false;
    let minTimer: number | undefined;
    const start = Date.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.dataset.initialLoad = "done";
      setFadeOut(true);
      window.setTimeout(() => setVisible(false), FADE_MS);
    };

    const scheduleFinish = () => {
      const remaining = Math.max(0, getMinLoaderMs() - (Date.now() - start));
      window.clearTimeout(minTimer);
      minTimer = window.setTimeout(finish, remaining);
    };

    const maxTimer = window.setTimeout(finish, MAX_LOADER_MS);

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      scheduleFinish();
    } else {
      document.addEventListener("DOMContentLoaded", scheduleFinish, {
        once: true,
      });
      window.addEventListener("load", scheduleFinish, { once: true });
    }

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) finish();
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return (
    <>
      {visible && (
        <div
          className={cn(
            "fixed inset-0 z-[100] bg-navy transition-opacity duration-300 ease-out touch-none",
            fadeOut ? "pointer-events-none opacity-0" : "opacity-100",
          )}
          aria-hidden={fadeOut}
          aria-busy={!fadeOut}>
          <BakingLoader className="h-full w-full min-h-[100dvh]" showLabel />
        </div>
      )}
      {children}
    </>
  );
}
