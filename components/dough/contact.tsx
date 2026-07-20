"use client";

import { useState, useEffect, useRef } from "react";
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
    label: "instagram",
    value: "@dough.eg",
    href: "https://www.instagram.com/dough.eg",
  },
  {
    icon: WhatsAppIcon,
    label: "whatsapp",
    value: "+20 111 104 0222",
    href: "https://api.whatsapp.com/send/?phone=201111040222&text&type=phone_number&app_absent=0&utm_source=ig",
  },
  {
    icon: MapPin,
    label: "address",
    value: "65 St. Abdelaziz Fahmy, Saint Fatima, Cairo, Egypt",
    href: "https://maps.google.com",
  },
];

const SERVICES = [
  "Brand & Marketing Strategy",
  "Creative & Content Production",
  "Digital & Social Media Marketing",
  "Experiential & Event Marketing",
  "Packaging & Merch",
];

const PREFERENCES = ["Online", "Office - Masr ElGedida", "Any"];

const ROLES = ["Designer", "Developer", "Marketer", "Copywriter", "Other"];

export function Contact() {
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
    if (!businessName.trim()) errors.businessName = "Business Name is required";
    if (!socialMedia.trim())
      errors.socialMedia = "Business Social Media Page is required";

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }
    setStep1Errors({});
    setStep(2);
  };

  const handleNext2 = () => {
    const errors: typeof step2Errors = {};
    if (!name.trim()) errors.name = "Your Name is required";
    if (!mobile.trim()) errors.mobile = "Mobile Number is required";
    if (!position.trim()) errors.position = "Position is required";

    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      return;
    }
    setStep2Errors({});
    setStep(3);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
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
      errors.services = "Please select at least one service";
    }
    if (!meetingPreference) {
      errors.preference = "Please select a meeting preference";
    }

    if (Object.keys(errors).length > 0) {
      setStep3Errors(errors);
      return;
    }

    setStep3Errors({});
    setProjectFormStatus("submitting");
    setProjectStatusMessage("Kneading the data...");

    setTimeout(() => {
      setProjectStatusMessage("Baking your message...");
      setTimeout(() => {
        setProjectStatusMessage("Rising...");
        setTimeout(() => {
          setProjectFormStatus("success");
        }, 800);
      }, 800);
    }, 800);
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
      setJobFileError(
        "Invalid file format. Only PDF, DOC, and DOCX are accepted.",
      );
      return false;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setJobFileError("File size exceeds the 20 MB limit.");
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
    if (!jobFullName.trim()) errors.fullName = "Full Name is required";
    if (!jobEmail.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(jobEmail)) {
      errors.email = "Invalid email address";
    }
    if (!jobPhone.trim()) errors.phone = "Phone Number is required";
    if (!jobCityCountry.trim())
      errors.cityCountry = "City / Country is required";
    if (!jobApplyingFor) errors.applyingFor = "Please select a role";

    setJobErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateJobForm()) return;

    setJobFormStatus("submitting");
    setJobStatusMessage("Reviewing your raw talent...");

    setTimeout(() => {
      setJobStatusMessage("Kneading your portfolio...");
      setTimeout(() => {
        setJobStatusMessage("Rising...");
        setTimeout(() => {
          setJobFormStatus("success");
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative bg-navy pt-24 pb-20 text-cream md:pt-32 min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Decorative Blob Glows */}
      <div className="absolute top-[-10%] right-[-10%] size-96 rounded-full bg-blob/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] size-[500px] rounded-full bg-water/20 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal duration={800}>
              <span className="font-display text-[12px] leading-[14px] uppercase font-extrabold tracking-widest text-blob/90">
                {activeTab === "project" ? "Get in Touch" : "Rise with Us"}
              </span>
              <h2 className="font-display font-extrabold tracking-tight text-[28px] leading-[32px] md:text-[44px] md:leading-[48px] lg:text-[60px] lg:leading-[64px] text-cream mt-2">
                {activeTab === "project" ? (
                  <>
                    <span className="block whitespace-nowrap">
                      Let's Bake Your
                    </span>
                    <span className="block text-blob whitespace-nowrap">
                      Next Big Idea.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block whitespace-nowrap">Bake Your</span>
                    <span className="block text-blob whitespace-nowrap">
                      Creative Future.
                    </span>
                  </>
                )}
              </h2>
              <p className="mt-6 font-display font-normal text-[16px] leading-[19px] text-cream/70 max-w-md">
                {activeTab === "project"
                  ? "Every great brand starts raw, soft, and full of promise. Let's knead strategy with art and watch it rise."
                  : "We're always looking for raw talent, fresh perspectives, and creative minds to rise with us. Bring your skills to the kitchen."}
              </p>
            </Reveal>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {DETAILS.map(({ icon: Icon, label, value, href }, i) => (
                <Reveal key={label} delay={i * 100} duration={750}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex flex-col items-start gap-3.5 group rounded-2xl border border-cream/5 bg-cream/[0.03] p-4 hover:bg-cream/[0.08] hover:border-cream/10 transition-all duration-300 h-full">
                    <div className="size-9 rounded-xl bg-blob/10 flex items-center justify-center text-blob group-hover:bg-blob group-hover:text-navy transition-all duration-300">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <span className="font-display text-[12px] leading-[14px] uppercase font-bold tracking-widest text-cream/40 block">
                        {label}
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
              <div className="bg-cream/[0.03] border border-cream/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-xl overflow-hidden">
                {/* Tab Switcher Button */}
                <div className="flex border-b border-cream/10 mb-8 pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("project")}
                    className={`flex-1 pb-4 text-center font-display font-bold text-[12px] leading-[14px] uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${activeTab === "project" ? "text-cream" : "text-cream/40 hover:text-cream/70"}`}>
                    Start a Project
                    {activeTab === "project" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blob" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("job")}
                    className={`flex-1 pb-4 text-center font-display font-bold text-[12px] leading-[14px] uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${activeTab === "job" ? "text-cream" : "text-cream/40 hover:text-cream/70"}`}>
                    Join the Team
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
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream leading-tight">
                          Freshly Baked! 🍞
                        </h3>
                        <p className="text-cream/70 mt-4 max-w-md leading-relaxed text-sm sm:text-base">
                          Your inquiry is officially in our oven. We will review
                          your project details and get back to you hot and
                          fresh!
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
                          }}
                          className="mt-8 text-xs uppercase font-extrabold tracking-widest bg-blob hover:bg-blob/85 text-navy px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                          Submit Another Inquiry
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleProjectSubmit}
                        className="flex flex-col gap-6 sm:gap-8">
                        {projectFormStatus === "submitting" ? (
                          <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
                            <Loader2 className="size-12 text-blob animate-spin mb-4" />
                            <p className="text-blob font-display text-sm tracking-widest uppercase animate-pulse">
                              {projectStatusMessage}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between items-center">
                                <h3 className="font-display text-xl font-bold text-cream">
                                  Dough Inquiry Form
                                </h3>
                                <span className="text-[10px] font-display uppercase tracking-wider text-blob/80 bg-blob/10 px-2.5 py-1 rounded-md">
                                  Step {step} of 3
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

                            <div className="overflow-hidden relative w-full">
                              <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                  transform: `translateX(-${(step - 1) * 100}%)`,
                                }}>
                                {/* Step 1: Business Details */}
                                <div className="w-full shrink-0 flex flex-col gap-6 pr-2">
                                  <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                      Business Name *
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
                                      placeholder="e.g. Dough Bakery"
                                      className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                    />
                                    {step1Errors.businessName && (
                                      <p className="text-red-400 text-xs mt-1 font-sans">
                                        {step1Errors.businessName}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                      Business Social Media Page *
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
                                      placeholder="e.g. instagram.com/dough"
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
                                    className="w-full flex items-center justify-center gap-3 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs tracking-widest py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-[1px]">
                                    Next Step
                                    <ArrowRight className="size-4" />
                                  </button>
                                </div>

                                {/* Step 2: Contact Details */}
                                <div className="w-full shrink-0 flex flex-col gap-6 px-1">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                        Your Name *
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
                                        placeholder="e.g. John Dough"
                                        className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                      />
                                      {step2Errors.name && (
                                        <p className="text-red-400 text-xs mt-1 font-sans">
                                          {step2Errors.name}
                                        </p>
                                      )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                        Mobile Number *
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
                                        placeholder="e.g. +20 100 000 0000"
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
                                      <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                        Email Address *
                                      </label>
                                      <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        placeholder="e.g. john@dough.eg"
                                        className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                      />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                        Position *
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
                                        placeholder="e.g. Founder & CEO"
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
                                      className="flex-1 flex items-center justify-center gap-2 bg-cream/10 hover:bg-cream/20 text-cream font-extrabold uppercase text-xs tracking-widest py-4 rounded-2xl transition-all duration-300 cursor-pointer text-center">
                                      <ArrowLeft className="size-4" />
                                      Back
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleNext2}
                                      className="flex-1 flex items-center justify-center gap-2 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs tracking-widest py-4 rounded-2xl transition-all duration-300 cursor-pointer text-center">
                                      Next Step
                                      <ArrowRight className="size-4" />
                                    </button>
                                  </div>
                                </div>

                                {/* Step 3: Service & Meeting Preference */}
                                <div className="w-full shrink-0 flex flex-col gap-6 pl-2">
                                  <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                      Service(s) needed *
                                    </label>
                                    <div className="flex flex-col gap-2">
                                      {SERVICES.map((service, index) => {
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
                                        Other...
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
                                          placeholder="Please specify other service needed..."
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
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                      Client Meeting Preference *
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                      {PREFERENCES.map((pref) => {
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
                                      className="flex-1 flex items-center justify-center gap-2 bg-cream/10 hover:bg-cream/20 text-cream font-extrabold uppercase text-xs tracking-widest py-4 rounded-2xl transition-all duration-300 cursor-pointer text-center">
                                      <ArrowLeft className="size-4" />
                                      Back
                                    </button>
                                    <button
                                      type="submit"
                                      className="flex-[2] flex items-center justify-center gap-3 bg-blob hover:bg-blob/85 text-navy font-extrabold uppercase text-xs tracking-widest py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-[1px]">
                                      <Send className="size-4" />
                                      Bake & Send Inquiry
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
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream leading-tight">
                          Application Received! 🍞
                        </h3>
                        <p className="text-cream/70 mt-4 max-w-md leading-relaxed text-sm sm:text-base">
                          Thank you for applying. We are reviewing your profile
                          and will get back to you shortly if your credentials
                          match our current needs.
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
                          }}
                          className="mt-8 text-xs uppercase font-extrabold tracking-widest bg-blob hover:bg-blob/85 text-navy px-6 py-3.5 rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                          Apply for Another Role
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleJobSubmit}
                        className="flex flex-col gap-5 sm:gap-6">
                        {jobFormStatus === "submitting" ? (
                          <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300">
                            <Loader2 className="size-12 text-blob animate-spin mb-4" />
                            <p className="text-blob font-display text-sm tracking-widest uppercase animate-pulse">
                              {jobStatusMessage}
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-2">
                              <h3 className="font-display text-xl font-bold text-cream">
                                Apply as a Teammate
                              </h3>
                              <p className="text-xs text-cream/55 leading-relaxed">
                                Fill out your details below and show us your raw
                                creative potential.
                              </p>
                            </div>

                            {/* Grid 1: Basic Personal Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                  Full Name *
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
                                  placeholder="e.g. John Dough"
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                                {jobErrors.fullName && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.fullName}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                  Email Address *
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
                                  placeholder="e.g. john@dough.com"
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
                                <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                  Phone Number *
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
                                  placeholder="e.g. +20 100 000 0000"
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                                {jobErrors.phone && (
                                  <span className="text-[10px] text-red-400 font-sans px-1">
                                    {jobErrors.phone}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                  City / Country *
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
                                  placeholder="e.g. Cairo, Egypt"
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
                                <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                  LinkedIn / Portfolio URL
                                </label>
                                <input
                                  type="url"
                                  value={jobLinkedin}
                                  onChange={(e) =>
                                    setJobLinkedin(e.target.value)
                                  }
                                  placeholder="e.g. linkedin.com/in/john"
                                  className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                  Role Applying For *
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
                                      Select a Role...
                                    </option>
                                    {ROLES.map((role) => (
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
                              <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                Show us your work
                              </label>
                              <textarea
                                rows={2}
                                value={jobShowWork}
                                onChange={(e) => setJobShowWork(e.target.value)}
                                placeholder="Share links to your Behance, Dribbble, Instagram, website, or work you're proud of."
                                className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans resize-none leading-relaxed"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                Anything else you'd like us to know?
                              </label>
                              <textarea
                                rows={2}
                                value={jobAnythingElse}
                                onChange={(e) =>
                                  setJobAnythingElse(e.target.value)
                                }
                                placeholder="This is your chance to stand out."
                                className="w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:border-blob/60 focus:bg-cream/[0.08] transition-all text-sm font-sans resize-none leading-relaxed"
                              />
                            </div>

                            {/* File Attachment Dropzone */}
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] uppercase font-bold tracking-widest text-cream/60">
                                Attachments *
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
                                      Upload your CV, portfolio, or supporting
                                      documents
                                    </span>
                                    <span className="text-[10px] text-cream/45 block mt-1">
                                      PDF, DOC, DOCX (Max. 20 MB)
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
                              className="w-full bg-blob hover:bg-blob/90 text-navy font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-2xl cursor-pointer transition-all duration-300 mt-2 shadow-lg hover:-translate-y-[1px]">
                              Submit Application
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
