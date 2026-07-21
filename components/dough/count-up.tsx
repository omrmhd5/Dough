"use client";

import { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  variant?: "default" | "billion";
}

function formatBillion(value: number): string {
  if (value >= 1_000_000_000) return "1BN+";
  const millions = Math.floor(value / 1_000_000);
  return millions > 0 ? `${millions}M` : "0";
}

export function CountUp({
  end,
  suffix = "",
  duration = 2000,
  className,
  variant = "default",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const target = variant === "billion" ? 1_000_000_000 : end;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setValue(0);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let frame = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, target, duration]);

  const display =
    variant === "billion" ? formatBillion(value) : `${value}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
