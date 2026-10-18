"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import { Arrow } from "./primitives";

export function SiteNav() {
  const t = useTranslations("nav");
  const { locale, setLocale } = useAppLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t("home"), href: "/" },
    { label: t("work"), href: "/work" },
    { label: t("uncleDough"), href: "/uncledough" },
    { label: t("contact"), href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled || open
            ? "border-navy/15 bg-cream/90 backdrop-blur-md"
            : "border-transparent bg-cream",
        )}
      >
        <nav className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={t("homeLabel")} className="-my-2 shrink-0 py-2">
            <img
              src="/Logo-Dark.png"
              alt="Dough"
              width={1107}
              height={282}
              className="h-6 w-auto sm:h-7"
            />
          </Link>

          <ul className="hidden items-center gap-10 md:flex lg:gap-14">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "t-label relative py-2 transition-colors",
                    isActive(link.href)
                      ? "text-navy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-navy"
                      : "text-navy/60 hover:text-navy",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={t("toggleLanguage")}
              className="t-label min-h-11 min-w-11 px-3 text-navy/70 transition-colors hover:text-navy"
              lang={locale === "en" ? "ar" : "en"}
            >
              {t("languageShort")}
            </button>

            <Link
              href="/contact?tab=project"
              className="hidden items-center gap-2 rounded-full bg-navy px-5 py-3 text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-cream transition-colors hover:bg-water sm:inline-flex"
            >
              {t("startProject")}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative -me-2 flex size-11 items-center justify-center md:hidden"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-6 bg-navy transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-6 bg-navy transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto overscroll-contain bg-navy text-cream md:hidden",
          "transition-[opacity,clip-path,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "visible opacity-100 [clip-path:inset(0_0_0_0)]"
            : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="wrap flex min-h-full flex-col justify-between gap-12 py-10">
          <ul className="flex flex-col">
            {links.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "border-b border-sparkle/20 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${140 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  className="flex items-baseline justify-between py-5"
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "text-[clamp(32px,9vw,48px)] lowercase leading-none tracking-[-0.02em]",
                      isActive(link.href) ? "font-bold" : "font-light",
                    )}
                  >
                    {link.label}
                  </span>
                  <Arrow className="text-sparkle/70" />
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "flex flex-col gap-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? `${140 + links.length * 60}ms` : "0ms" }}
          >
            <Link
              href="/contact?tab=project"
              className="inline-flex items-center justify-between rounded-full bg-cream px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-navy"
            >
              {t("startProject")}
              <Arrow />
            </Link>
            <a
              href="mailto:hello@xdough.com"
              className="text-[18px] font-medium text-sparkle"
            >
              hello@xdough.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
