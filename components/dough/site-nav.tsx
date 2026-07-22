"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Uncle Dough", href: "/uncledough" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between pl-6 pr-8 md:pl-6 md:pr-12 py-3.5 rounded-full bg-cream/75 border border-navy/10 shadow-[0_4px_20px_-4px_rgba(18,41,64,0.08)] backdrop-blur-md">
        <Link href="/" className="gsap-nav-logo flex shrink-0 items-center">
          <Logo
            className="text-xl md:text-2xl"
            textColor="text-navy"
            blobColor="bg-blob"
          />
        </Link>

        <ul className="hidden items-center gap-12 lg:gap-14 md:flex">
          {LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href.startsWith("/#"));
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`text-sm uppercase tracking-wider relative inline-flex flex-col items-center group ${
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl bg-navy/95 p-6 shadow-xl backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-3">
            {LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname === "/" && link.href.startsWith("/#"));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-semibold uppercase tracking-wider block ${
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
