'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'

const LINKS = [
  { label: 'who we are', href: '#who' },
  { label: 'why us', href: '#why' },
  { label: 'what we bake', href: '#bake' },
  { label: 'how we work', href: '#work' },
  { label: 'portfolio', href: '#portfolio' },
  { label: 'contact', href: '#contact' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a
          href="#top"
          className="transition-transform hover:scale-105"
        >
          <Logo className="text-2xl" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm lowercase text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-cream px-5 py-2 text-sm font-semibold lowercase text-navy transition-transform hover:scale-105 md:inline-block"
        >
          let&apos;s bake
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-cream md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 rounded-3xl bg-navy/95 p-6 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg lowercase text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
