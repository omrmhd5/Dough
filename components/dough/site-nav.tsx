"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { Logo } from "./logo";

export function SiteNav() {
  const t = useTranslations("nav");
  const { locale, setLocale } = useAppLocale();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: t("home"), href: "/" },
    { label: t("work"), href: "/work" },
    { label: t("uncleDough"), href: "/uncledough" },
    { label: t("contact"), href: "/contact" },
  ];

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:pl-6 sm:pr-8 md:pl-6 md:pr-12 md:py-3.5 rounded-full bg-cream/75 border border-navy/10 shadow-[0_4px_20px_-4px_rgba(18,41,64,0.08)] backdrop-blur-md">
        <Link
          href="/"
          className="gsap-nav-logo flex shrink-0 cursor-pointer items-center">
          <Logo
            className="text-xl md:text-2xl"
            textColor="text-navy"
            blobColor="bg-blob"
          />
        </Link>

        <ul className="hidden items-center gap-12 lg:gap-14 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href.startsWith("/#"));
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`text-sm uppercase relative inline-flex cursor-pointer flex-col items-center group ${
                    isActive ? "text-navy" : "text-navy/70 hover:text-navy"
                  }`}>
                  <span
                    className={
                      isActive
                        ? "font-bold"
                        : "font-normal group-hover:font-bold transition-all duration-300"
                    }>
                    {link.label}
                  </span>
                  <span
                    className="invisible h-0 select-none font-bold block overflow-hidden"
                    aria-hidden="true">
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="cursor-pointer rounded-full p-2 text-navy transition-colors hover:bg-navy/5"
            aria-label={t("toggleLanguage")}>
            <Globe className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer text-navy md:hidden"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl bg-navy/95 p-6 shadow-xl backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname === "/" && link.href.startsWith("/#"));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`cursor-pointer text-sm font-semibold uppercase block ${
                      isActive ? "text-cream" : "text-cream/70"
                    }`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
