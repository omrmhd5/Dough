"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ButtonLink, Emphasis, OutArrow, RunningHeader } from "./primitives";

export const CONTACT = {
  email: "hello@xdough.com",
  website: { href: "https://www.xdough.com", label: "xdough.com" },
  instagram: {
    href: "https://www.instagram.com/dough.eg/",
    label: "@dough.eg",
  },
  linkedin: {
    href: "https://www.linkedin.com/company/dough-eg",
    label: "Dough on LinkedIn",
  },
  whatsapp: {
    href: "https://api.whatsapp.com/send/?phone=201111040222&type=phone_number&app_absent=0",
    label: "+20 111 104 0222",
  },
  directions:
    "https://www.google.com/maps/search/?api=1&query=Plot+28+El+Banafseg+1+First+Settlement+New+Cairo+Egypt",
};

function ContactRow({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="t-label text-sparkle">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="-my-1 inline-flex w-fit items-baseline gap-2 py-1 text-[length:var(--footer-link)] text-cream transition-colors hover:text-sparkle">
        <span dir="ltr">{value}</span>
        <OutArrow />
      </a>
    </div>
  );
}

export function SiteFooter({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const t = useTranslations("siteFooter");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream">
      <div className="wrap py-[var(--footer-y)]">
        <RunningHeader start="dough" end={t("label")} tone="dark" />

        {variant === "full" && (
          <h2 className="t-display t-sm mt-[var(--footer-stack)] max-w-[15ch] text-cream">
            <Emphasis text={t("headline")} />
          </h2>
        )}

        <div
          className={cn(
            "grid gap-[var(--footer-gap)] lg:grid-cols-[1fr_1.15fr] lg:gap-x-16",
            variant === "full" ? "mt-[var(--footer-stack)]" : "mt-8",
          )}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="t-label text-sparkle">{t("sayHello")}</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="w-fit break-all text-[length:var(--footer-email)] font-semibold leading-tight tracking-[-0.01em] underline decoration-2 underline-offset-[0.35em] transition-colors hover:text-sparkle"
                dir="ltr">
                {CONTACT.email}
              </a>
            </div>
            {variant === "full" && (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  href="/contact?tab=project"
                  tone="cream"
                  className="w-full sm:w-fit">
                  {t("startProject")}
                </ButtonLink>
                <ButtonLink
                  href="/contact?tab=job"
                  tone="outline-dark"
                  className="w-full sm:w-fit">
                  {t("joinTeam")}
                </ButtonLink>
              </div>
            )}
          </div>

          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <ContactRow
              label={t("website")}
              href={CONTACT.website.href}
              value={CONTACT.website.label}
            />
            <ContactRow
              label={t("instagram")}
              href={CONTACT.instagram.href}
              value={CONTACT.instagram.label}
            />
            <ContactRow
              label={t("linkedin")}
              href={CONTACT.linkedin.href}
              value={CONTACT.linkedin.label}
            />
            <ContactRow
              label={t("whatsapp")}
              href={CONTACT.whatsapp.href}
              value={CONTACT.whatsapp.label}
            />
            <div className="flex flex-col gap-2">
              <span className="t-label text-sparkle">{t("studio")}</span>
              <span className="text-[length:var(--footer-link)]">
                {t("studioCity")}
              </span>
              <a
                href={CONTACT.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-1 inline-flex w-fit items-baseline gap-2 py-1 text-[length:var(--footer-meta)] text-sparkle transition-colors hover:text-cream">
                {t("directions")}
                <OutArrow />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="t-label text-sparkle">{t("joinTeam")}</span>
              <p className="max-w-[34ch] text-[length:var(--footer-meta)] leading-snug text-cream/80">
                {t("careersCopy")}
              </p>
              <Link
                href="/contact?tab=job"
                className="-my-1 inline-flex w-fit items-baseline gap-2 py-1 text-[length:var(--footer-meta)] text-sparkle transition-colors hover:text-cream">
                {t("joinTeam")}
                <OutArrow />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-[var(--footer-stack)] flex flex-col gap-4 border-t border-sparkle/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="Dough" className="-my-1 w-fit py-1">
            <img src="/brand/Logo-Light.png" alt="Dough" className="h-7 w-auto" />
          </Link>
          <p className="text-[length:var(--footer-meta)] text-sparkle/80">
            {t("tagline")}
          </p>
          <p className="text-[length:var(--footer-meta)] text-sparkle/80">
            {t("rights", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
