"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";
import {
  Arrow,
  Emphasis,
  OutArrow,
  RunningHeader,
  buttonClass,
} from "./primitives";
import { CONTACT } from "./site-footer";

/* ── Form primitives ──────────────────────────────────────────────────── */

const fieldClass =
  "w-full border-0 border-b border-navy/30 bg-transparent px-0 py-3 text-[17px] text-navy placeholder:text-navy/40 transition-colors focus:border-navy focus:outline-none focus-visible:outline-none";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label id={`${id}-label`} htmlFor={id} className="t-label text-water">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="t-small mt-1 text-[var(--error)]">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-5 py-3 text-start text-[15px] transition-colors duration-200",
        selected
          ? "border-navy bg-navy text-cream"
          : "border-navy/25 text-navy hover:border-navy",
        className,
      )}>
      {children}
    </button>
  );
}

/** Custom listbox that replaces the native <select>, styled to the site. */
function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-list`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) return openList();
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActive((i) => (i + step + options.length) % options.length);
        break;
      }
      case "Home":
      case "End":
        if (open) {
          e.preventDefault();
          setActive(e.key === "Home" ? 0 : options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) openList();
        else if (active >= 0) choose(options[active]);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && active >= 0 ? `${id}-opt-${active}` : undefined
        }
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          fieldClass,
          "flex items-center justify-between gap-4 text-start",
          !value && "text-navy/40",
          open && "border-navy",
        )}>
        <span className="truncate">{value || placeholder}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-navy transition-transform duration-300",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square">
          <path d="M5 9l7 7 7-7" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="photo-shadow animate-in fade-in slide-in-from-top-1 absolute inset-x-0 top-full z-20 mt-2 border border-navy bg-cream py-1 duration-200">
          {options.map((option, i) => {
            const selected = option === value;
            return (
              <li
                key={option}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(option)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-[16px] transition-colors",
                  i === active ? "bg-sparkle/60" : "bg-transparent",
                  selected ? "font-semibold" : "font-normal",
                  i > 0 && "border-t border-navy/10",
                )}>
                <span>{option}</span>
                {selected && (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="square">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function StatusPanel({
  title,
  message,
  action,
  onAction,
}: {
  title: string;
  message: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div
      className="flex flex-col items-start gap-6 border-t border-navy/20 py-12"
      role="status">
      <h3 className="t-display t-sm">{title}</h3>
      <p className="t-body max-w-[44ch]">{message}</p>
      <button
        type="button"
        onClick={onAction}
        className={buttonClass("outline-light")}>
        {action}
      </button>
    </div>
  );
}

function Sending({ message }: { message: string }) {
  return (
    <div
      className="flex items-center gap-4 border-t border-navy/20 py-16"
      role="status"
      aria-live="polite">
      <span className="size-3 animate-ping rounded-full bg-water" />
      <p className="t-label text-navy">{message}</p>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="t-small border-s-2 border-[var(--error)] bg-[var(--error)]/5 px-4 py-3 text-[var(--error)]">
      {message}
    </p>
  );
}

/* ── Contact ──────────────────────────────────────────────────────────── */

export function Contact() {
  const t = useTranslations("contact");
  const tp = useTranslations("contact.project");
  const tj = useTranslations("contact.job");
  const tf = useTranslations("siteFooter");
  const { locale } = useAppLocale();
  const services = tp.raw("services") as string[];
  const preferences = tp.raw("preferences") as string[];
  const stepTitles = tp.raw("stepTitles") as string[];
  const roles = tj.raw("roles") as string[];
  const [activeTab, setActiveTab] = useState<"project" | "job">("project");

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "job" || tab === "project") setActiveTab(tab);
  }, []);

  const selectTab = (tab: "project" | "job") => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url);
  };

  /* Project inquiry */
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [meetingPreference, setMeetingPreference] = useState("");

  const [step1Errors, setStep1Errors] = useState<{
    businessName?: string;
    socialMedia?: string;
  }>({});
  const [step2Errors, setStep2Errors] = useState<{
    name?: string;
    mobile?: string;
    position?: string;
  }>({});
  const [step3Errors, setStep3Errors] = useState<{
    services?: string;
    preference?: string;
  }>({});

  const [projectFormStatus, setProjectFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [projectStatusMessage, setProjectStatusMessage] = useState("");
  const projectFormRef = useRef<HTMLDivElement>(null);

  const goToStep = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => {
      projectFormRef.current
        ?.querySelector<HTMLElement>("input, button[aria-pressed]")
        ?.focus({ preventScroll: true });
    });
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
    if (step3Errors.services)
      setStep3Errors((p) => ({ ...p, services: undefined }));
  };

  const handleNext1 = () => {
    const errors: typeof step1Errors = {};
    if (!businessName.trim()) errors.businessName = tp("errors.businessName");
    if (!socialMedia.trim()) errors.socialMedia = tp("errors.socialMedia");
    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }
    setStep1Errors({});
    goToStep(2);
  };

  const handleNext2 = () => {
    const errors: typeof step2Errors = {};
    if (!name.trim()) errors.name = tp("errors.name");
    if (!mobile.trim()) errors.mobile = tp("errors.mobile");
    if (!position.trim()) errors.position = tp("errors.position");
    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      return;
    }
    setStep2Errors({});
    goToStep(3);
  };

  const resetProject = () => {
    setProjectFormStatus("idle");
    setBusinessName("");
    setSocialMedia("");
    setName("");
    setMobile("");
    setEmail("");
    setPosition("");
    setSelectedServices([]);
    setOtherService("");
    setShowOtherInput(false);
    setMeetingPreference("");
    setStep(1);
    setProjectStatusMessage("");
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) return handleNext1();
    if (step === 2) return handleNext2();

    const errors: typeof step3Errors = {};
    if (
      selectedServices.length === 0 &&
      (!showOtherInput || !otherService.trim())
    ) {
      errors.services = tp("errors.services");
    }
    if (!meetingPreference) errors.preference = tp("errors.preference");
    if (Object.keys(errors).length > 0) {
      setStep3Errors(errors);
      return;
    }

    setStep3Errors({});
    setProjectFormStatus("submitting");
    setProjectStatusMessage(tp("kneading"));

    try {
      const response = await fetch("/api/contact/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
          "X-Language": locale,
        },
        body: JSON.stringify({
          businessName,
          socialMedia,
          name,
          mobile,
          email,
          position,
          services: selectedServices,
          otherService: showOtherInput ? otherService : "",
          meetingPreference,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? tp("fetchFailed"));
      setProjectStatusMessage(tp("rising"));
      setProjectFormStatus("success");
    } catch (error) {
      setProjectFormStatus("idle");
      setProjectStatusMessage(
        error instanceof Error ? error.message : tp("genericError"),
      );
    }
  };

  /* Job application */
  const [jobFullName, setJobFullName] = useState("");
  const [jobEmail, setJobEmail] = useState("");
  const [jobPhone, setJobPhone] = useState("");
  const [jobCityCountry, setJobCityCountry] = useState("");
  const [jobLinkedin, setJobLinkedin] = useState("");
  const [jobApplyingFor, setJobApplyingFor] = useState("");
  const [jobShowWork, setJobShowWork] = useState("");
  const [jobAnythingElse, setJobAnythingElse] = useState("");
  const [jobFile, setJobFile] = useState<File | null>(null);
  const [jobDragActive, setJobDragActive] = useState(false);
  const [jobFileError, setJobFileError] = useState("");
  const jobFileInputRef = useRef<HTMLInputElement>(null);
  const [jobFormStatus, setJobFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [jobStatusMessage, setJobStatusMessage] = useState("");
  const [jobErrors, setJobErrors] = useState<
    Record<string, string | undefined>
  >({});

  const clearJobError = (key: string) =>
    jobErrors[key] && setJobErrors((prev) => ({ ...prev, [key]: undefined }));

  const handleJobDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setJobDragActive(true);
    else if (e.type === "dragleave") setJobDragActive(false);
  };

  const validateJobFile = (selectedFile: File): boolean => {
    setJobFileError("");
    const ext = selectedFile.name.split(".").pop()?.toLowerCase() || "";
    if (!["pdf", "doc", "docx"].includes(ext)) {
      setJobFileError(tj("errors.invalidFileFormat"));
      return false;
    }
    if (selectedFile.size > 20 * 1024 * 1024) {
      setJobFileError(tj("errors.fileTooLarge"));
      return false;
    }
    return true;
  };

  const handleJobDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setJobDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && validateJobFile(dropped)) setJobFile(dropped);
  };

  const handleJobFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && validateJobFile(selected)) setJobFile(selected);
  };

  const handleJobRemoveFile = () => {
    setJobFile(null);
    setJobFileError("");
    if (jobFileInputRef.current) jobFileInputRef.current.value = "";
  };

  const validateJobForm = () => {
    const errors: Record<string, string> = {};
    if (!jobFullName.trim()) errors.fullName = tj("errors.fullName");
    if (!jobEmail.trim()) errors.email = tj("errors.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(jobEmail))
      errors.email = tj("errors.emailInvalid");
    if (!jobPhone.trim()) errors.phone = tj("errors.phone");
    if (!jobCityCountry.trim()) errors.cityCountry = tj("errors.cityCountry");
    if (!jobApplyingFor) errors.applyingFor = tj("errors.applyingFor");
    setJobErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetJob = () => {
    setJobFormStatus("idle");
    setJobFullName("");
    setJobEmail("");
    setJobPhone("");
    setJobCityCountry("");
    setJobLinkedin("");
    setJobApplyingFor("");
    setJobShowWork("");
    setJobAnythingElse("");
    setJobFile(null);
    setJobStatusMessage("");
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateJobForm()) return;

    setJobFormStatus("submitting");
    setJobStatusMessage(tj("reviewing"));

    try {
      const formData = new FormData();
      formData.append("fullName", jobFullName);
      formData.append("email", jobEmail);
      formData.append("phone", jobPhone);
      formData.append("cityCountry", jobCityCountry);
      formData.append("linkedin", jobLinkedin);
      formData.append("applyingFor", jobApplyingFor);
      formData.append("showWork", jobShowWork);
      formData.append("anythingElse", jobAnythingElse);
      if (jobFile) formData.append("attachment", jobFile);

      const response = await fetch("/api/contact/job", {
        method: "POST",
        headers: { "Accept-Language": locale, "X-Language": locale },
        body: formData,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? tj("fetchFailed"));
      setJobStatusMessage(tj("rising"));
      setJobFormStatus("success");
    } catch (error) {
      setJobFormStatus("idle");
      setJobStatusMessage(
        error instanceof Error ? error.message : tj("genericError"),
      );
    }
  };

  const details = [
    {
      label: t("details.email"),
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      label: t("details.instagram"),
      value: CONTACT.instagram.label,
      href: CONTACT.instagram.href,
    },
    {
      label: t("details.whatsapp"),
      value: CONTACT.whatsapp.label,
      href: CONTACT.whatsapp.href,
    },
    {
      label: t("details.address"),
      value: tf("studioCity"),
      href: CONTACT.directions,
    },
  ];

  const errProps = (id: string, error?: string) => ({
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  });

  return (
    <section
      id="contact"
      className="bg-cream pb-[var(--section-y)] pt-[calc(var(--nav-h)+clamp(40px,5vw,96px))] text-navy">
      <div className="wrap">
        <RunningHeader start="dough" end={t("label")} />

        <div className="mt-[clamp(48px,7vw,130px)] grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[clamp(48px,7vw,140px)]">
          {/* Intro + details */}
          <div className="flex flex-col gap-12 lg:sticky lg:top-[calc(var(--nav-h)+48px)] lg:self-start">
            <div className="flex flex-col gap-8">
              <span className="t-label text-water">
                {activeTab === "project"
                  ? t("projectEyebrow")
                  : t("jobEyebrow")}
              </span>
              <h1 className="t-display t-md max-w-[13ch]">
                <Emphasis
                  text={
                    activeTab === "project"
                      ? t("projectHeadline")
                      : t("jobHeadline")
                  }
                />
              </h1>
              <p className="t-body max-w-[42ch]">
                {activeTab === "project"
                  ? t("projectDescription")
                  : t("jobDescription")}
              </p>
            </div>

            <dl className="border-t border-navy/20">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-1 gap-1 border-b border-navy/20 py-4 sm:grid-cols-[minmax(96px,0.4fr)_minmax(0,1fr)] sm:items-baseline sm:gap-4">
                  <dt className="t-label text-water">{d.label}</dt>
                  <dd>
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        d.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="-my-2 inline-flex min-w-0 items-baseline gap-2 py-2 text-[17px] font-medium transition-colors hover:text-water">
                      <span dir="ltr" className="break-words">
                        {d.value}
                      </span>
                      {d.href.startsWith("http") && <OutArrow />}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Forms */}
          <div>
            <div
              role="tablist"
              aria-label={t("label")}
              className="flex gap-8 border-b border-navy/20">
              {(["project", "job"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  id={`tab-${tab}`}
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  onClick={() => selectTab(tab)}
                  className={cn(
                    "t-label relative -mb-px border-b-2 pb-4 pt-1 transition-colors",
                    activeTab === tab
                      ? "border-navy font-semibold text-navy"
                      : "border-transparent text-navy/50 hover:text-navy",
                  )}>
                  {tab === "project" ? t("tabProject") : t("tabJob")}
                </button>
              ))}
            </div>

            {/* Project inquiry */}
            <div
              role="tabpanel"
              id="panel-project"
              aria-labelledby="tab-project"
              hidden={activeTab !== "project"}
              className="pt-10">
              {projectFormStatus === "success" ? (
                <StatusPanel
                  title={tp("successTitle")}
                  message={tp("successMessage")}
                  action={tp("submitAnother")}
                  onAction={resetProject}
                />
              ) : projectFormStatus === "submitting" ? (
                <Sending message={projectStatusMessage} />
              ) : (
                <form
                  onSubmit={handleProjectSubmit}
                  noValidate
                  className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-[clamp(22px,1.8vw,32px)] font-semibold">
                        {stepTitles[step - 1]}
                      </h2>
                      <span className="t-label t-num text-water">
                        {tp("stepOf", { step })}
                      </span>
                    </div>
                    <div className="flex gap-2" aria-hidden="true">
                      {[1, 2, 3].map((n) => (
                        <span
                          key={n}
                          className={cn(
                            "h-[3px] flex-1 transition-colors duration-500",
                            n <= step ? "bg-navy" : "bg-navy/15",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {projectStatusMessage && (
                    <ErrorBanner message={projectStatusMessage} />
                  )}

                  <div ref={projectFormRef} className="flex flex-col gap-10">
                    {step === 1 && (
                      <>
                        <Field
                          id="p-business"
                          label={tp("businessName")}
                          error={step1Errors.businessName}>
                          <input
                            {...errProps(
                              "p-business",
                              step1Errors.businessName,
                            )}
                            type="text"
                            autoComplete="organization"
                            value={businessName}
                            onChange={(e) => {
                              setBusinessName(e.target.value);
                              if (step1Errors.businessName)
                                setStep1Errors((p) => ({
                                  ...p,
                                  businessName: undefined,
                                }));
                            }}
                            placeholder={tp("businessNamePlaceholder")}
                            className={fieldClass}
                          />
                        </Field>
                        <Field
                          id="p-social"
                          label={tp("socialMedia")}
                          error={step1Errors.socialMedia}>
                          <input
                            {...errProps("p-social", step1Errors.socialMedia)}
                            type="text"
                            value={socialMedia}
                            onChange={(e) => {
                              setSocialMedia(e.target.value);
                              if (step1Errors.socialMedia)
                                setStep1Errors((p) => ({
                                  ...p,
                                  socialMedia: undefined,
                                }));
                            }}
                            placeholder={tp("socialMediaPlaceholder")}
                            className={fieldClass}
                          />
                        </Field>
                      </>
                    )}

                    {step === 2 && (
                      <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8">
                        <Field
                          id="p-name"
                          label={tp("yourName")}
                          error={step2Errors.name}>
                          <input
                            {...errProps("p-name", step2Errors.name)}
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (step2Errors.name)
                                setStep2Errors((p) => ({
                                  ...p,
                                  name: undefined,
                                }));
                            }}
                            placeholder={tp("yourNamePlaceholder")}
                            className={fieldClass}
                          />
                        </Field>
                        <Field
                          id="p-mobile"
                          label={tp("mobile")}
                          error={step2Errors.mobile}>
                          <input
                            {...errProps("p-mobile", step2Errors.mobile)}
                            type="tel"
                            autoComplete="tel"
                            dir="ltr"
                            value={mobile}
                            onChange={(e) => {
                              setMobile(e.target.value);
                              if (step2Errors.mobile)
                                setStep2Errors((p) => ({
                                  ...p,
                                  mobile: undefined,
                                }));
                            }}
                            placeholder={tp("mobilePlaceholder")}
                            className={cn(
                              fieldClass,
                              "text-start rtl:text-end",
                            )}
                          />
                        </Field>
                        <Field id="p-email" label={tp("email")}>
                          <input
                            id="p-email"
                            type="email"
                            autoComplete="email"
                            dir="ltr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={tp("emailPlaceholder")}
                            className={cn(
                              fieldClass,
                              "text-start rtl:text-end",
                            )}
                          />
                        </Field>
                        <Field
                          id="p-position"
                          label={tp("position")}
                          error={step2Errors.position}>
                          <input
                            {...errProps("p-position", step2Errors.position)}
                            type="text"
                            autoComplete="organization-title"
                            value={position}
                            onChange={(e) => {
                              setPosition(e.target.value);
                              if (step2Errors.position)
                                setStep2Errors((p) => ({
                                  ...p,
                                  position: undefined,
                                }));
                            }}
                            placeholder={tp("positionPlaceholder")}
                            className={fieldClass}
                          />
                        </Field>
                      </div>
                    )}

                    {step === 3 && (
                      <>
                        <fieldset className="flex flex-col gap-4">
                          <legend className="t-label mb-4 text-water">
                            {tp("servicesLabel")}
                          </legend>
                          <div className="flex flex-wrap gap-3">
                            {services.map((service) => (
                              <Choice
                                key={service}
                                selected={selectedServices.includes(service)}
                                onClick={() => handleServiceToggle(service)}>
                                {service}
                              </Choice>
                            ))}
                            <Choice
                              selected={showOtherInput}
                              onClick={() => setShowOtherInput((v) => !v)}>
                              {tp("other")}
                            </Choice>
                          </div>
                          {showOtherInput && (
                            <input
                              id="p-other"
                              type="text"
                              aria-label={tp("other")}
                              value={otherService}
                              onChange={(e) => {
                                setOtherService(e.target.value);
                                if (step3Errors.services)
                                  setStep3Errors((p) => ({
                                    ...p,
                                    services: undefined,
                                  }));
                              }}
                              placeholder={tp("otherPlaceholder")}
                              className={fieldClass}
                            />
                          )}
                          {step3Errors.services && (
                            <p className="t-small text-[var(--error)]">
                              {step3Errors.services}
                            </p>
                          )}
                        </fieldset>

                        <fieldset className="flex flex-col gap-4">
                          <legend className="t-label mb-4 text-water">
                            {tp("meetingPreference")}
                          </legend>
                          <div className="flex flex-wrap gap-3">
                            {preferences.map((pref) => (
                              <Choice
                                key={pref}
                                selected={meetingPreference === pref}
                                onClick={() => {
                                  setMeetingPreference(pref);
                                  if (step3Errors.preference)
                                    setStep3Errors((p) => ({
                                      ...p,
                                      preference: undefined,
                                    }));
                                }}>
                                {pref}
                              </Choice>
                            ))}
                          </div>
                          {step3Errors.preference && (
                            <p className="t-small text-[var(--error)]">
                              {step3Errors.preference}
                            </p>
                          )}
                        </fieldset>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 border-t border-navy/20 pt-8">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => goToStep(step - 1)}
                        className={buttonClass("outline-light")}>
                        <Arrow className="-scale-x-100 rtl:scale-x-100" />
                        <span>{tp("back")}</span>
                      </button>
                    )}
                    <button type="submit" className={buttonClass("navy")}>
                      <span>{step < 3 ? tp("nextStep") : tp("submit")}</span>
                      <Arrow />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Job application */}
            <div
              role="tabpanel"
              id="panel-job"
              aria-labelledby="tab-job"
              hidden={activeTab !== "job"}
              className="pt-10">
              {jobFormStatus === "success" ? (
                <StatusPanel
                  title={tj("successTitle")}
                  message={tj("successMessage")}
                  action={tj("applyAnother")}
                  onAction={resetJob}
                />
              ) : jobFormStatus === "submitting" ? (
                <Sending message={jobStatusMessage} />
              ) : (
                <form
                  onSubmit={handleJobSubmit}
                  noValidate
                  className="flex flex-col gap-10">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-[clamp(22px,1.8vw,32px)] font-semibold">
                      {tj("formTitle")}
                    </h2>
                    <p className="t-small max-w-[48ch]">{tj("formSubtitle")}</p>
                  </div>

                  {jobStatusMessage && (
                    <ErrorBanner message={jobStatusMessage} />
                  )}

                  <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8">
                    <Field
                      id="j-name"
                      label={tj("fullName")}
                      error={jobErrors.fullName}>
                      <input
                        {...errProps("j-name", jobErrors.fullName)}
                        type="text"
                        autoComplete="name"
                        value={jobFullName}
                        onChange={(e) => {
                          setJobFullName(e.target.value);
                          clearJobError("fullName");
                        }}
                        placeholder={tj("fullNamePlaceholder")}
                        className={fieldClass}
                      />
                    </Field>
                    <Field
                      id="j-email"
                      label={tj("email")}
                      error={jobErrors.email}>
                      <input
                        {...errProps("j-email", jobErrors.email)}
                        type="email"
                        autoComplete="email"
                        dir="ltr"
                        value={jobEmail}
                        onChange={(e) => {
                          setJobEmail(e.target.value);
                          clearJobError("email");
                        }}
                        placeholder={tj("emailPlaceholder")}
                        className={cn(fieldClass, "text-start rtl:text-end")}
                      />
                    </Field>
                    <Field
                      id="j-phone"
                      label={tj("phone")}
                      error={jobErrors.phone}>
                      <input
                        {...errProps("j-phone", jobErrors.phone)}
                        type="tel"
                        autoComplete="tel"
                        dir="ltr"
                        value={jobPhone}
                        onChange={(e) => {
                          setJobPhone(e.target.value);
                          clearJobError("phone");
                        }}
                        placeholder={tj("phonePlaceholder")}
                        className={cn(fieldClass, "text-start rtl:text-end")}
                      />
                    </Field>
                    <Field
                      id="j-city"
                      label={tj("cityCountry")}
                      error={jobErrors.cityCountry}>
                      <input
                        {...errProps("j-city", jobErrors.cityCountry)}
                        type="text"
                        autoComplete="address-level2"
                        value={jobCityCountry}
                        onChange={(e) => {
                          setJobCityCountry(e.target.value);
                          clearJobError("cityCountry");
                        }}
                        placeholder={tj("cityCountryPlaceholder")}
                        className={fieldClass}
                      />
                    </Field>
                    <Field id="j-link" label={tj("linkedin")}>
                      <input
                        id="j-link"
                        type="url"
                        dir="ltr"
                        value={jobLinkedin}
                        onChange={(e) => setJobLinkedin(e.target.value)}
                        placeholder={tj("linkedinPlaceholder")}
                        className={cn(fieldClass, "text-start rtl:text-end")}
                      />
                    </Field>
                    <Field
                      id="j-role"
                      label={tj("role")}
                      error={jobErrors.applyingFor}>
                      <Select
                        id="j-role"
                        value={jobApplyingFor}
                        options={roles}
                        placeholder={tj("selectRole")}
                        invalid={!!jobErrors.applyingFor}
                        describedBy={
                          jobErrors.applyingFor ? "j-role-error" : undefined
                        }
                        onChange={(role) => {
                          setJobApplyingFor(role);
                          clearJobError("applyingFor");
                        }}
                      />
                    </Field>
                  </div>

                  <Field id="j-work" label={tj("showWork")}>
                    <textarea
                      id="j-work"
                      rows={2}
                      value={jobShowWork}
                      onChange={(e) => setJobShowWork(e.target.value)}
                      placeholder={tj("showWorkPlaceholder")}
                      className={cn(fieldClass, "resize-y leading-relaxed")}
                    />
                  </Field>

                  <Field id="j-else" label={tj("anythingElse")}>
                    <textarea
                      id="j-else"
                      rows={2}
                      value={jobAnythingElse}
                      onChange={(e) => setJobAnythingElse(e.target.value)}
                      placeholder={tj("anythingElsePlaceholder")}
                      className={cn(fieldClass, "resize-y leading-relaxed")}
                    />
                  </Field>

                  <div className="flex flex-col gap-3">
                    <span className="t-label text-water">
                      {tj("attachments")}
                    </span>
                    <div
                      onDragEnter={handleJobDrag}
                      onDragOver={handleJobDrag}
                      onDragLeave={handleJobDrag}
                      onDrop={handleJobDrop}
                      className={cn(
                        "border border-dashed px-6 py-8 transition-colors",
                        jobDragActive
                          ? "border-navy bg-sparkle/40"
                          : "border-navy/30",
                      )}>
                      <input
                        ref={jobFileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleJobFileChange}
                        className="sr-only"
                        id="resume-file-input"
                      />
                      {jobFile ? (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate text-[15px] font-medium">
                              {jobFile.name}
                            </span>
                            <span className="t-num text-[13px] text-water">
                              {(jobFile.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleJobRemoveFile}
                            aria-label={tj("removeFile")}
                            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/25 transition-colors hover:border-navy">
                            <svg
                              viewBox="0 0 24 24"
                              className="size-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true">
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="resume-file-input"
                          className="flex cursor-pointer flex-col gap-1">
                          <span className="text-[15px] font-medium underline underline-offset-4">
                            {tj("uploadPrompt")}
                          </span>
                          <span className="text-[13px] text-water">
                            {tj("uploadHint")}
                          </span>
                        </label>
                      )}
                    </div>
                    {jobFileError && (
                      <p className="t-small text-[var(--error)]">
                        {jobFileError}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-navy/20 pt-8">
                    <button type="submit" className={buttonClass("navy")}>
                      <span>{tj("submit")}</span>
                      <Arrow />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
