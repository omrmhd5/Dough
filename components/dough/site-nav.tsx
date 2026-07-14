"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/clients" },
  { label: "Uncle Dough", href: "/uncledough" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5 rounded-full bg-cream/75 border border-navy/10 shadow-[0_4px_20px_-4px_rgba(18,41,64,0.08)] backdrop-blur-md">
        <Link
          href="/"
          className="gsap-nav-logo flex items-center">
          <Logo
            className="text-xl md:text-2xl"
            textColor="text-navy"
            blobColor="bg-blob"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href.startsWith("/#"));
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-wider relative inline-flex flex-col items-center ${
                    isActive ? "text-navy" : "text-navy/70"
                  }`}>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 h-0.5 w-4 rounded-full bg-navy" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-navy px-5 py-2 text-xs font-bold uppercase tracking-wider text-cream md:inline-block gsap-nav-btn border border-navy shadow-sm">
          Let&apos;s Bake
        </Link>

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

