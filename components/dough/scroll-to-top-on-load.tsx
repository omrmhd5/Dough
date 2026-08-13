"use client";

import { useEffect } from "react";

function scrollWindowToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    scrollWindowToTop();

    const onLoad = () => scrollWindowToTop();
    const onPageShow = () => scrollWindowToTop();

    window.addEventListener("load", onLoad);
    window.addEventListener("pageshow", onPageShow);

    const raf = window.requestAnimationFrame(scrollWindowToTop);
    const t0 = window.setTimeout(scrollWindowToTop, 0);
    const t1 = window.setTimeout(scrollWindowToTop, 100);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
