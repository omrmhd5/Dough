"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-navy/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="transition-transform hover:scale-105 gsap-nav-logo">
          <Logo
            className="text-2xl"
            textColor="text-navy"
            blobColor="bg-blob"
          />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href.startsWith("/#"));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm gsap-nav-link relative inline-flex flex-col items-center group ${
                    isActive ? "text-navy" : "text-navy/70 hover:text-navy"
                  }`}>
                  <span className={isActive ? "font-bold" : "font-medium group-hover:font-bold transition-all duration-300"}>
                    {link.label}
                  </span>
                  <span className="invisible h-0 select-none font-bold block overflow-hidden" aria-hidden="true">
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-navy px-5 py-2 text-sm font-semibold text-cream md:inline-block gsap-nav-btn relative overflow-hidden group hover:text-navy z-0 border border-cream/10">
          {/* Lighter color ripple/fill element */}
          <span className="absolute inset-0 bg-blob -z-10 translate-y-full -translate-x-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:translate-x-0" />
          <span className="">Let&apos;s Bake</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 rounded-3xl bg-navy/95 p-6 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-2.5">
            {LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname === "/" && link.href.startsWith("/#"));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg block transition-colors duration-300 ${
                      isActive
                        ? "text-cream font-bold"
                        : "text-cream/80 hover:text-cream hover:font-bold"
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
