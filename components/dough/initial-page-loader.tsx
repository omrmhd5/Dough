"use client";

import { useEffect, useState } from "react";
import { BakingLoader, BAKING_LOADER_CYCLE_MS } from "./baking-loader";
import { cn } from "@/lib/utils";

const MIN_LOADER_MS = BAKING_LOADER_CYCLE_MS + 400;

export function InitialPageLoader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let loaded = document.readyState === "complete";
    let minTimeElapsed = false;

    const finish = () => {
      setFadeOut(true);
      window.setTimeout(() => setVisible(false), 700);
    };

    const tryFinish = () => {
      if (loaded && minTimeElapsed) finish();
    };

    const minTimer = window.setTimeout(() => {
      minTimeElapsed = true;
      tryFinish();
    }, MIN_LOADER_MS);

    const onLoad = () => {
      loaded = true;
      tryFinish();
    };

    if (!loaded) window.addEventListener("load", onLoad);
    else tryFinish();

    return () => {
      window.clearTimeout(minTimer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      {visible && (
        <div
          className={cn(
            "fixed inset-0 z-[100] transition-opacity duration-700 ease-out",
            fadeOut ? "pointer-events-none opacity-0" : "opacity-100",
          )}>
          <BakingLoader className="h-full w-full" />
        </div>
      )}
      {children}
    </>
  );
}
