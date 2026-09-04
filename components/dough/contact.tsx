"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/providers/locale-provider";
import {
  Mail,
  MapPin,
  Send,
  Check,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
} from "lucide-react";
import { Reveal } from "./reveal";

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const DETAILS = [
  {
    icon: InstagramIcon,
    labelKey: "instagram" as const,
    value: "@dough.eg",
    href: "https://www.instagram.com/dough.eg",
  },
  {
    icon: WhatsAppIcon,
    labelKey: "whatsapp" as const,
    value: "+20 111 104 0222",
    href: "https://api.whatsapp.com/send/?phone=201111040222&text&type=phone_number&app_absent=0&utm_source=ig",
  },
  {
    icon: MapPin,
    labelKey: "address" as const,
    value: "65 St. Abdelaziz Fahmy, Saint Fatima, Cairo, Egypt",
    href: "https://maps.google.com",
  },
];

export function Contact() {
  const t = useTranslations("contact");
  const tp = useTranslations("contact.project");
  const tj = useTranslations("contact.job");
  const { locale } = useAppLocale();
  const services = tp.raw("services") as string[];
  const preferences = tp.raw("preferences") as string[];
  const roles = tj.raw("roles") as string[];
  const [activeTab, setActiveTab] = useState<"project" | "job">("project");

  // URL Tab Sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "job") {
        setActiveTab("job");
      } else if (tab === "project") {
        setActiveTab("project");
      }
    }
  }, []);

  // ==========================================
  // FORM 1: Project Inquiry State & Handlers
  // ==========================================
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

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleNext1 = () => {
    const errors: typeof step1Errors = {};
    if (!businessName.trim()) errors.businessName = tp("errors.businessName");
    if (!socialMedia.trim())
      errors.socialMedia = tp("errors.socialMedia");

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }
    setStep1Errors({});
    setStep(2);
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
    setStep(3);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleNext1();
      return;
    }
    if (step === 2) {
      handleNext2();
      return;
    }

    const errors: typeof step3Errors = {};
    if (
      selectedServices.length === 0 &&
      (!showOtherInput || !otherService.trim())
    ) {
      errors.services = tp("errors.services");
    }
    if (!meetingPreference) {
      errors.preference = tp("errors.preference");
    }

    if (Object.keys(errors).length > 0) {
      setStep3Errors(errors);
      return;
    }

    setStep3Errors({});
    setProjectStatusMessage("");
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

      if (!response.ok) {
        throw new Error(data.error ?? tp("fetchFailed"));
      }

      setProjectStatusMessage(tp("rising"));
      setProjectFormStatus("success");
    } catch (error) {
      setProjectFormStatus("idle");
      setProjectStatusMessage(
        error instanceof Error
          ? error.message
          : tp("genericError"),
      );
    }
  };

  // ==========================================
  // FORM 2: Job Application State & Handlers
  // ==========================================
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
  const [jobErrors, setJobErrors] = useState<Record<string, string>>({});

  const handleJobDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setJobDragActive(true);
    } else if (e.type === "dragleave") {
      setJobDragActive(false);
    }
  };

  const validateJobFile = (selectedFile: File): boolean => {
    setJobFileError("");
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension =
      selectedFile.name.split(".").pop()?.toLowerCase() || "";

    if (!allowedExtensions.includes(fileExtension)) {
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateJobFile(droppedFile)) {
        setJobFile(droppedFile);
      }
    }
  };

  const handleJobFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateJobFile(selectedFile)) {
        setJobFile(selectedFile);
      }
    }
  };

  const handleJobRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setJobFile(null);
    setJobFileError("");
    if (jobFileInputRef.current) {
      jobFileInputRef.current.value = "";
    }
  };

  const validateJobForm = () => {
    const errors: Record<string, string> = {};
    if (!jobFullName.trim()) errors.fullName = tj("errors.fullName");
    if (!jobEmail.trim()) {
      errors.email = tj("errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(jobEmail)) {
      errors.email = tj("errors.emailInvalid");
    }
    if (!jobPhone.trim()) errors.phone = tj("errors.phone");
    if (!jobCityCountry.trim())
      errors.cityCountry = tj("errors.cityCountry");
    if (!jobApplyingFor) errors.applyingFor = tj("errors.applyingFor");

    setJobErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateJobForm()) return;

    setJobStatusMessage("");
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
      if (jobFile) {
        formData.append("attachment", jobFile);
      }

      const response = await fetch("/api/contact/job", {
        method: "POST",
        headers: {
          "Accept-Language": locale,
          "X-Language": locale,
        },
        body: formData,
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? tj("fetchFailed"));
      }

      setJobStatusMessage(tj("rising"));
      setJobFormStatus("success");
    } catch (error) {
      setJobFormStatus("idle");
      setJobStatusMessage(
        error instanceof Error
          ? error.message
          : tj("genericError"),
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-navy pt-20 pb-16 text-cream sm:pt-24 md:pt-32 md:pb-20 min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Decorative Blob Glows */}
      <div className="absolute top-[-10%] right-[-10%] size-96 rounded-full bg-blob/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] size-[500px] rounded-full bg-water/20 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal duration={800}>
              <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold text-blob/90">
                {activeTab === "project" ? t("projectEyebrow") : t("jobEyebrow")}
              </span>
              <h2 className="font-display font-extrabold lowercase text-[28px] leading-[32px] md:text-[44px] md:leading-[48px] lg:text-[60px] lg:leading-[64px] text-cream mt-2 text-balance">
                {activeTab === "project" ? (
                  <>
                    <span className="block">{t("projectHeadlineLine1")}</span>
                    <span className="block text-blob">{t("projectHeadlineLine2")}</span>
                  </>
                ) : (
                  <>
                    <span className="block">{t("jobHeadlineLine1")}</span>
                    <span className="block text-blob">{t("jobHeadlineLine2")}</span>
                  </>
                )}
              </h2>
              <p className="mt-6 font-display font-normal text-[16px] leading-[19px] text-cream/70 max-w-md lowercase">
                {activeTab === "project"
                  ? t("projectDescription")
                  : t("jobDescription")}
              </p>
            </Reveal>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {DETAILS.map(({ icon: Icon, labelKey, value, href }, i) => (
                <Reveal key={labelKey} delay={i * 100} duration={750}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex cursor-pointer flex-col items-start gap-3.5 group rounded-2xl border border-cream/5 bg-cream/[0.03] p-4 hover:bg-cream/[0.08] hover:border-cream/10 transition-all duration-300 h-full">
                    <div className="size-9 rounded-xl bg-blob/10 flex items-center justify-center text-blob group-hover:bg-blob group-hover:text-navy transition-all duration-300">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <span className="font-display text-[12px] leading-[14px] uppercase font-bold text-cream/40 block">
                        {t(`details.${labelKey}`)}
                      </span>
                      <span className="font-display text-[12px] leading-[14px] font-medium text-cream group-hover:text-blob transition-colors duration-300 break-words line-clamp-3">
                        {value}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Tabbed Form */}
          <div className="lg:col-span-7">
            <Reveal duration={900} delay={150}>
              <div className="bg-cream/[0.03] border border-cream/10 rounded-3xl p-4 sm:p-6 md:p-10 backdrop-blur-md shadow-xl overflow-hidden">
                {/* Tab Switcher Button */}
                <div className="flex border-b border-cream/10 mb-8 pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("project")}
                    className={`flex-1 pb-4 text-center font-display font-bold text-[12px] leading-[14px] uppercase transition-all duration-300 relative cursor-pointer ${activeTab === "project" ? "text-cream" : "text-cream/40 hover:text-cream/70"}`}>
                    {t("tabProject")}
                    {activeTab === "project" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blob" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("job")}
                    className={`flex-1 pb-4 text-center font-display font-bold text-[12px] leading-[14px] uppercase transition-all duration-300 relative cursor-pointer ${activeTab === "job" ? "text-cream" : "text-cream/40 hover:text-cream/70"}`}>
                    {t("tabJob")}
                    {activeTab === "job" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blob" />
                    )}
                  </button>
                </div>

                {/* Smooth Sliding Form Transition Wrapper */}
                <div className="relative w-full overflow-hidden">
                  {/* ==================== PROJECT FORM ==================== */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${activeTab === "project" ? "opacity-100 translate-x-0 scale-100 pointer-events-auto relative" : "opacity-0 -translate-x-8 scale-95 pointer-events-none absolute top-0 left-0 w-full"}`}>
                    {projectFormStatus === "success" ? (
                      <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in duration-500">
                        <div className="size-20 rounded-full bg-blob/20 border border-blob/30 flex items-center justify-center text-blob mb-6 animate-bounce">
                          <Check className="size-10" />
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold lowercase text-cream leading-tight">
                          {tp("successTitle")}
                        </h3>
                        <p className="text-cream/70 mt-4 max-w-md leading-relaxed text-sm sm:text-base">
                          {tp("successMessage")}
                        </p>
                        <button
                          onClick={() => {
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
                          }}
                          className="mt-8 text-xs uppercase font-extrabold bg-blob hover:bg-blob/85 text-navy px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                          {tp("submitAnother")}
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleProjectSubmit}
                        className="flex flex-col gap-6 sm:gap-8">
                        {projectFormStatus === "submitting" ? (
                          <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
                            <Loader2 className="size-12 text-blob animate-spin mb-4" />
                            <p className="text-blob font-display text-sm uppercase animate-pulse">
                              {projectStatusMessage}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between items-center">
                                <h3 className="font-display text-xl font-bold uppercase text-cream">
                                  {tp("formTitle")}
                                </h3>
                                <span className="text-[10px] font-display uppercase text-blob/80 bg-blob/10 px-2.5 py-1 rounded-md">
                                  {tp("stepOf", { step })}
                                </span>
                              </div>
                              <div className="w-full bg-cream/10 h-1 rounded-full overflow-hidden mt-1">
                                <div
                                  className="bg-blob h-full transition-all duration-500 ease-out"
                                  style={{
                                    width:
                                      step === 1
                                        ? "33.3%"
                                        : step === 2
                                          ? "66.6%"
                                          : "100%",
                                  }}
                                />
                              </div>
                            </div>

                            {projectStatusMessage &&
                              projectFormStatus === "idle" && (
                                <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300 font-sans">
                                  {projectStatusMessage}
                                </p>
                              )}

                            <div className="overflow-hidden relative w-full">
                              <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                  transform: `translateX(-${(step - 1) * 100}%)`,
                                }}>
                                {/* Step 1: Business Details */}
                                <div className="w-full shrink-0 flex flex-col gap-6 pr-2">
                                  <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase font-bold text-cream/60">
                                      {tp("businessName")}
                                    </label>
                                    <input
                                      type="text"
                                      value={businessName}
                                      onChange={(e) => {
                                        setBusinessName(e.target.value);
                                        if (step1Errors.businessName)
                                          setStep1Errors((prev) => ({
                                            ...prev,
                                            businessName: undefined,
                                          }));
                                      }}
                                      placeholder={tp("businessNamePlaceholder")}
                                      className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                    />
                                    {step1Errors.businessName && (
                                      <p className="text-red-400 text-xs mt-1 font-sans">
                                        {step1Errors.businessName}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase font-bold text-cream/60">
                                      {tp("socialMedia")}
                                    </label>
                                    <input
                                      type="text"
                                      value={socialMedia}
                                      onChange={(e) => {
                                        setSocialMedia(e.target.value);
                                        if (step1Errors.socialMedia)
                                          setStep1Errors((prev) => ({
                                            ...prev,
                                            socialMedia: undefined,
                                          }));
                                      }}
                                      placeholder={tp("socialMediaPlaceholder")}
                                      className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                    />
                                    {step1Errors.socialMedia && (
                                      <p className="text-red-400 text-xs mt-1 font-sans">
                                        {step1Errors.socialMedia}
                                      </p>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleNext1}
                                    className="w-full flex items-center justify-center gap-3 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-[1px]">
                                    {tp("nextStep")}
                                    <ArrowRight className="size-4" />
                                  </button>
                                </div>

                                {/* Step 2: Contact Details */}
                                <div className="w-full shrink-0 flex flex-col gap-6 px-1">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold text-cream/60">
                                        {tp("yourName")}
                                      </label>
                                      <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                          if (step2Errors.name)
                                            setStep2Errors((prev) => ({
                                              ...prev,
                                              name: undefined,
                                            }));
                                        }}
                                        placeholder={tp("yourNamePlaceholder")}
                                        className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                      />
                                      {step2Errors.name && (
                                        <p className="text-red-400 text-xs mt-1 font-sans">
                                          {step2Errors.name}
                                        </p>
                                      )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold text-cream/60">
                                        {tp("mobile")}
                                      </label>
                                      <input
                                        type="tel"
                                        value={mobile}
                                        onChange={(e) => {
                                          setMobile(e.target.value);
                                          if (step2Errors.mobile)
                                            setStep2Errors((prev) => ({
                                              ...prev,
                                              mobile: undefined,
                                            }));
                                        }}
                                        placeholder={tp("mobilePlaceholder")}
                                        className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                      />
                                      {step2Errors.mobile && (
                                        <p className="text-red-400 text-xs mt-1 font-sans">
                                          {step2Errors.mobile}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold text-cream/60">
                                        {tp("email")}
                                      </label>
                                      <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        placeholder={tp("emailPlaceholder")}
                                        className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                      />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold text-cream/60">
                                        {tp("position")}
                                      </label>
                                      <input
                                        type="text"
                                        value={position}
                                        onChange={(e) => {
                                          setPosition(e.target.value);
                                          if (step2Errors.position)
                                            setStep2Errors((prev) => ({
                                              ...prev,
                                              position: undefined,
                                            }));
                                        }}
                                        placeholder={tp("positionPlaceholder")}
                                        className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                      />
                                      {step2Errors.position && (
                                        <p className="text-red-400 text-xs mt-1 font-sans">
                                          {step2Errors.position}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex gap-4">
                                    <button
                                      type="button"
                                      onClick={() => setStep(1)}
                                      className="flex-1 flex items-center justify-center gap-2 bg-cream/10 hover:bg-cream/20 text-cream font-extrabold uppercase text-xs py-4 rounded-2xl transition-all duration-300 cursor-pointer text-center">
                                      <ArrowLeft className="size-4" />
                                      {tp("back")}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleNext2}
                                      className="flex-1 flex items-center justify-center gap-2 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs py-4 rounded-2xl transition-all duration-300 cursor-pointer text-center">
                                      {tp("nextStep")}
                                      <ArrowRight className="size-4" />
                                    </button>
                                  </div>
                                </div>

                                {/* Step 3: Service & Meeting Preference */}
                                <div className="w-full shrink-0 flex flex-col gap-6 pl-2">
                                  <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-bold text-cream/60">
                                      {tp("servicesLabel")}
                                    </label>
                                    <div className="flex flex-col gap-2">
                                      {services.map((service, index) => {
                                        const isSelected =
                                          selectedServices.includes(service);
                                        return (
                                          <button
                                            type="button"
                                            key={service}
                                            onClick={() =>
                                              handleServiceToggle(service)
                                            }
                                            className={`w-full text-left text-xs px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer font-sans flex items-center gap-3 ${
                                              isSelected
                                                ? "bg-blob border-blob text-navy font-bold shadow-md"
                                                : "bg-cream/[0.02] border-cream/10 text-cream/70 hover:border-cream/30 hover:text-cream"
                                            }`}>
                                            <span className="font-display text-[10px] opacity-60">
                                              {index + 1}.
                                            </span>
                                            {service}
                                          </button>
                                        );
                                      })}

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setShowOtherInput(!showOtherInput)
                                        }
                                        className={`w-full text-left text-xs px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer font-sans ${
                                          showOtherInput || otherService
                                            ? "bg-blob border-blob text-navy font-bold shadow-md"
                                            : "bg-cream/[0.02] border-cream/10 text-cream/70 hover:border-cream/30 hover:text-cream"
                                        }`}>
                                        {tp("other")}
                                      </button>

                                      {showOtherInput && (
                                        <input
                                          type="text"
                                          value={otherService}
                                          onChange={(e) => {
                                            setOtherService(e.target.value);
                                            if (step3Errors.services)
                                              setStep3Errors((prev) => ({
                                                ...prev,
                                                services: undefined,
                                              }));
                                          }}
                                          placeholder={tp("otherPlaceholder")}
                                          className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans mt-1 animate-in fade-in slide-in-from-top-1 duration-200"
                                        />
                                      )}
                                    </div>
                                    {step3Errors.services && (
                                      <p className="text-red-400 text-xs mt-1 font-sans">
                                        {step3Errors.services}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-bold text-cream/60">
                                      {tp("meetingPreference")}
                                    </label>
                                    <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2">
                                      {preferences.map((pref) => {
                                        const isSelected =
                                          meetingPreference === pref;
                                        return (
                                          <button
                                            type="button"
                                            key={pref}
                                            onClick={() => {
                                              setMeetingPreference(pref);
                                              if (step3Errors.preference)
                                                setStep3Errors((prev) => ({
                                                  ...prev,
                                                  preference: undefined,
                                                }));
                                            }}
                                            className={`text-[10px] sm:text-xs py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer font-sans font-medium ${
                                              isSelected
                                                ? "bg-blob border-blob text-navy font-bold shadow-md"
                                                : "bg-cream/[0.02] border-cream/10 text-cream/70 hover:border-cream/30 hover:text-cream"
                                            }`}>
                                            {pref}
                                          </button>
                                        );
                                      })}
                                    </div>
                                    {step3Errors.preference && (
                                      <p className="text-red-400 text-xs mt-1 font-sans">
                                        {step3Errors.preference}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex gap-4">
                                    <button
                                      type="button"
                                      onClick={() => setStep(2)}
                                      className="flex-1 flex items-center justify-center gap-2 bg-cream/10 hover:bg-cream/20 text-cream font-extrabold uppercase text-xs py-4 rounded-2xl transition-all duration-300 cursor-pointer text-center">
                                      <ArrowLeft className="size-4" />
                                      {tp("back")}
                                    </button>
                                    <button
                                      type="submit"
                                      className="flex-[2] flex items-center justify-center gap-3 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-[1px]">
                                      <Send className="size-4" />
                                      {tp("submit")}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </form>
                    )}
                  </div>

                  {/* ==================== TEAM/JOB FORM ==================== */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${activeTab === "job" ? "opacity-100 translate-x-0 scale-100 pointer-events-auto relative" : "opacity-0 translate-x-8 scale-95 pointer-events-none absolute top-0 left-0 w-full"}`}>
                    {jobFormStatus === "success" ? (
                      <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in duration-500">
                        <div className="size-20 rounded-full bg-blob/20 border border-blob/30 flex items-center justify-center text-blob mb-6 animate-bounce">
                          <Check className="size-10" />
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold lowercase text-cream leading-tight">
                          {tj("successTitle")}
                        </h3>
                        <p className="text-cream/70 mt-4 max-w-md leading-relaxed text-sm sm:text-base">
                          {tj("successMessage")}
                        </p>
                        <button
                          onClick={() => {
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
                          }}
                          className="mt-8 text-xs uppercase font-extrabold bg-blob hover:bg-blob/85 text-navy px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                          {tj("applyAnother")}
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleJobSubmit}
                        className="flex flex-col gap-5 sm:gap-6">
                        {jobFormStatus === "submitting" ? (
                          <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
                            <Loader2 className="size-12 text-blob animate-spin mb-4" />
                            <p className="text-blob font-display text-sm uppercase animate-pulse">
                              {jobStatusMessage}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-2">
                              <h3 className="font-display text-xl font-bold uppercase text-cream">
                                {tj("formTitle")}
                              </h3>
                              <p className="text-xs text-cream/55 leading-relaxed">
                                {tj("formSubtitle")}
                              </p>
                            </div>

                            {jobStatusMessage && jobFormStatus === "idle" && (
                              <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300 font-sans">
                                {jobStatusMessage}
                              </p>
                            )}

                            {/* Grid 1: Basic Personal Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold text-cream/60">
                                  {tj("fullName")}
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={jobFullName}
                                  onChange={(e) => {
                                    setJobFullName(e.target.value);
                                    if (jobErrors.fullName)
                                      setJobErrors((prev) => ({
                                        ...prev,
                                        fullName: undefined,
                                      }));
                                  }}
                                  placeholder={tj("fullNamePlaceholder")}
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                                {jobErrors.fullName && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.fullName}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold text-cream/60">
                                  {tj("email")}
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={jobEmail}
                                  onChange={(e) => {
                                    setJobEmail(e.target.value);
                                    if (jobErrors.email)
                                      setJobErrors((prev) => ({
                                        ...prev,
                                        email: undefined,
                                      }));
                                  }}
                                  placeholder={tj("emailPlaceholder")}
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                                {jobErrors.email && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.email}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Grid 2: Location and Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold text-cream/60">
                                  {tj("phone")}
                                </label>
                                <input
                                  type="tel"
                                  required
                                  value={jobPhone}
                                  onChange={(e) => {
                                    setJobPhone(e.target.value);
                                    if (jobErrors.phone)
                                      setJobErrors((prev) => ({
                                        ...prev,
                                        phone: undefined,
                                      }));
                                  }}
                                  placeholder={tj("phonePlaceholder")}
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                                {jobErrors.phone && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.phone}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold text-cream/60">
                                  {tj("cityCountry")}
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={jobCityCountry}
                                  onChange={(e) => {
                                    setJobCityCountry(e.target.value);
                                    if (jobErrors.cityCountry)
                                      setJobErrors((prev) => ({
                                        ...prev,
                                        cityCountry: undefined,
                                      }));
                                  }}
                                  placeholder={tj("cityCountryPlaceholder")}
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                                {jobErrors.cityCountry && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.cityCountry}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Grid 3: Portfolio Link and Selection */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold text-cream/60">
                                  {tj("linkedin")}
                                </label>
                                <input
                                  type="url"
                                  value={jobLinkedin}
                                  onChange={(e) =>
                                    setJobLinkedin(e.target.value)
                                  }
                                  placeholder={tj("linkedinPlaceholder")}
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold text-cream/60">
                                  {tj("role")}
                                </label>
                                <div className="relative">
                                  <select
                                    required
                                    value={jobApplyingFor}
                                    onChange={(e) => {
                                      setJobApplyingFor(e.target.value);
                                      if (jobErrors.applyingFor)
                                        setJobErrors((prev) => ({
                                          ...prev,
                                          applyingFor: undefined,
                                        }));
                                    }}
                                    className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans appearance-none cursor-pointer">
                                    <option
                                      value=""
                                      disabled
                                      className="bg-navy text-cream/30">
                                      {tj("selectRole")}
                                    </option>
                                    {roles.map((role) => (
                                      <option
                                        key={role}
                                        value={role}
                                        className="bg-navy text-cream">
                                        {role}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {jobErrors.applyingFor && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.applyingFor}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Textareas */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase font-bold text-cream/60">
                                {tj("showWork")}
                              </label>
                              <textarea
                                rows={2}
                                value={jobShowWork}
                                onChange={(e) => setJobShowWork(e.target.value)}
                                placeholder={tj("showWorkPlaceholder")}
                                className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans resize-none leading-relaxed"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase font-bold text-cream/60">
                                {tj("anythingElse")}
                              </label>
                              <textarea
                                rows={2}
                                value={jobAnythingElse}
                                onChange={(e) =>
                                  setJobAnythingElse(e.target.value)
                                }
                                placeholder={tj("anythingElsePlaceholder")}
                                className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans resize-none leading-relaxed"
                              />
                            </div>

                            {/* File Attachment Dropzone */}
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold text-cream/60">
                                {tj("attachments")}
                              </label>
                              <div
                                onDragEnter={handleJobDrag}
                                onDragOver={handleJobDrag}
                                onDragLeave={handleJobDrag}
                                onDrop={handleJobDrop}
                                className={`border border-dashed rounded-2xl p-5 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 select-none ${
                                  jobDragActive
                                    ? "border-blob bg-blob/5"
                                    : jobFile
                                      ? "border-blob/40 bg-cream/[0.01]"
                                      : "border-cream/20 bg-cream/[0.01] hover:border-cream/40"
                                }`}>
                                <input
                                  ref={jobFileInputRef}
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleJobFileChange}
                                  className="hidden"
                                  id="resume-file-input"
                                />

                                {jobFile ? (
                                  <div className="flex items-center gap-3 w-full max-w-md bg-cream/[0.03] border border-cream/10 px-4 py-2.5 rounded-xl justify-between animate-in zoom-in-95 duration-200">
                                    <div className="flex items-center gap-3 overflow-hidden text-left">
                                      <Upload className="size-4 shrink-0 text-blob" />
                                      <div className="truncate flex flex-col">
                                        <span className="text-xs font-medium text-cream truncate">
                                          {jobFile.name}
                                        </span>
                                        <span className="text-[10px] text-cream/40">
                                          {(
                                            jobFile.size /
                                            (1024 * 1024)
                                          ).toFixed(2)}{" "}
                                          MB
                                        </span>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={handleJobRemoveFile}
                                      className="p-1 rounded-full hover:bg-cream/10 text-cream/55 hover:text-cream cursor-pointer transition-colors">
                                      <X className="size-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <label
                                    htmlFor="resume-file-input"
                                    className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-1">
                                    <Upload className="size-6 text-cream/40 mb-2 hover:text-blob transition-colors" />
                                    <span className="text-xs font-medium text-cream/80 block">
                                      {tj("uploadPrompt")}
                                    </span>
                                    <span className="text-[10px] text-cream/45 block mt-1">
                                      {tj("uploadHint")}
                                    </span>
                                  </label>
                                )}
                              </div>
                              {jobFileError && (
                                <span className="text-[10px] text-red-400 font-sans px-1 mt-0.5">
                                  {jobFileError}
                                </span>
                              )}
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              className="w-full bg-blob hover:bg-blob/90 text-navy font-bold text-xs uppercase py-4 px-6 rounded-2xl cursor-pointer transition-all duration-300 mt-2 shadow-lg hover:-translate-y-[1px]">
                              {tj("submit")}
                            </button>
                          </>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
