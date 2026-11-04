"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { prepareIndex, readZip, tidyZip, titleOf } from "@/lib/portal/zip";

/* ── Types & helpers ──────────────────────────────────────────────────── */

type Page = {
  slug: string;
  title: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};
type Version = { sha: string; url: string; message: string; date: string };
type Toast = { id: number; kind: "ok" | "err"; text: string };
type Notify = (kind: Toast["kind"], text: string) => void;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.(zip|html?)$/, "")
    .replace(/\(copy\)|copy/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const dateText = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

function ago(iso: string) {
  const seconds = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error((data as { error?: string }).error || "Something went wrong.");
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }
  return data as T;
}

/** Unzips (or reads one HTML file) in the browser, uploads each file, then asks the server for one commit. */
async function publish(
  source: File,
  slug: string,
  title: string,
  mode: "create" | "update",
  onStep: (text: string, percent: number) => void,
) {
  onStep("Reading the file…", 4);
  const isHtml = /\.html?$/i.test(source.name) && !/\.zip$/i.test(source.name);
  const files = isHtml
    ? [{ path: "index.html", data: new Uint8Array(await source.arrayBuffer()) }]
    : tidyZip(await readZip(await source.arrayBuffer()));
  const index = files.find((f) => f.path === "index.html");
  if (!index) throw new Error("The zip needs an index.html at its top level.");

  const html = new TextDecoder().decode(index.data);
  const prepared = new TextEncoder().encode(prepareIndex(html, slug, true));
  const finalTitle = title || titleOf(html, slug);

  const uploads = files.map((f) => ({
    path: f.path,
    data: f.path === "index.html" ? prepared : f.data,
  }));
  const results: { path: string; sha: string }[] = [];
  let done = 0;
  let next = 0;
  async function worker() {
    while (next < uploads.length) {
      const file = uploads[next++];
      const send = () =>
        api<{ sha: string }>("/api/portal/blob", {
          method: "POST",
          body: file.data as BodyInit,
        });
      // One more try on a hiccup, then report which file failed.
      const { sha } = await send()
        .catch(() => new Promise((r) => setTimeout(r, 1200)).then(send))
        .catch((error: Error) => {
          throw new Error(`${file.path}: ${error.message}`);
        });
      results.push({ path: file.path, sha });
      done += 1;
      onStep(`Uploading files… ${done} of ${uploads.length}`, 6 + (done / uploads.length) * 84);
    }
  }
  await Promise.all([worker(), worker(), worker()]);

  onStep("Publishing…", 94);
  const { page } = await api<{ page: Page }>("/api/portal/manage", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "publish", mode, slug, title: finalTitle, files: results }),
  });
  onStep("Done", 100);
  return page;
}

/* ── Icons (24px, 1.7 stroke) ─────────────────────────────────────────── */

const ICONS: Record<string, ReactNode> = {
  upload: <path d="M12 16V5m0 0-4 4m4-4 4 4M5 19h14" />,
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" />,
  refresh: <path d="M20 11a8 8 0 0 0-14-4.5L4 9m0-5v5h5m-5 4a8 8 0 0 0 14 4.5L20 15m0 5v-5h-5" />,
  pencil: <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1zM14 7l3 3" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  trash: <path d="M4 7h16M10 11v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />,
  external: <path d="M14 4h6v6m0-6L10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  logout: <path d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4m5-4 4-4m0 0-4-4m4 4H9" />,
  file: <path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5" />,
  arrow: <path d="M5 12h14m0 0-5-5m5 5-5 5" />,
  alert: <path d="M12 8v5m0 3.5v.01M10.3 4.2 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z" />,
};

function Icon({ name, className = "size-[18px]" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** The dough shape: soft, never sharp. Used only as an accent. */
function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M46 24c26-22 74-26 106-6 30 19 46 56 36 86-9 29-42 50-78 52-38 2-76-14-96-42C-6 82 14 48 46 24z"
      />
    </svg>
  );
}

/* ── Shared styles ────────────────────────────────────────────────────── */

const RED = "#B3342A";
const btn =
  "group/btn inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-semibold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water";
const btnSolid = `${btn} bg-navy text-cream hover:bg-water`;
const btnGhost = `${btn} border border-navy/25 text-navy hover:border-navy hover:bg-sparkle/50`;
const field =
  "w-full rounded-full border border-navy/25 bg-cream px-5 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-water/70 focus:border-navy";

const CSS = `
@keyframes pt-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes pt-pop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}
@keyframes pt-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(3deg)}}
@keyframes pt-slide{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
.pt-rise{animation:pt-rise .6s cubic-bezier(.22,1,.36,1) both}
.pt-pop{animation:pt-pop .4s cubic-bezier(.22,1,.36,1) both}
.pt-float{animation:pt-float 9s ease-in-out infinite}
.pt-sheen{position:relative;overflow:hidden}
.pt-sheen::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,252,247,.45),transparent);animation:pt-slide 1.2s linear infinite}
@media (prefers-reduced-motion:reduce){.pt-rise,.pt-pop,.pt-float,.pt-sheen::after{animation:none}}
`;

/** Open/close with a height animation, without measuring. */
function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
        open ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
      }`}
      inert={!open}>
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function PortalPage() {
  const [state, setState] = useState<"loading" | "signedOut" | "signedIn">("loading");
  const [pages, setPages] = useState<Page[]>([]);
  const [loadError, setLoadError] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const notify: Notify = useCallback((kind, text) => {
    const id = ++toastId.current;
    setToasts((list) => [...list, { id, kind, text }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), kind === "err" ? 9000 : 7000);
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await api<{ pages: Page[] }>("/api/portal/pages");
      setPages(data.pages);
      setState("signedIn");
      setLoadError("");
    } catch (e) {
      if ((e as Error & { status?: number }).status === 401) setState("signedOut");
      else {
        setState("signedIn");
        setLoadError((e as Error).message);
      }
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const body =
    state === "loading" ? (
      <main className="min-h-screen bg-cream" />
    ) : state === "signedOut" ? (
      <Login onDone={load} />
    ) : (
      <main className="min-h-screen bg-cream text-navy">
        <div className="mx-auto max-w-[1040px] px-5 pb-28 sm:px-8">
          {/* Running header + headline */}
          <div className="pt-rise flex items-center justify-between gap-4 pt-8 text-[12px] font-medium uppercase tracking-[0.14em] text-water">
            <span>Dough portal</span>
            <button
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 uppercase tracking-[0.14em] transition-colors hover:bg-sparkle/50 hover:text-navy"
              onClick={async () => {
                await api("/api/portal/logout", { method: "POST" }).catch(() => {});
                setState("signedOut");
              }}>
              <Icon name="logout" className="size-4" /> Sign out
            </button>
          </div>
          <header className="pt-rise relative pb-14 pt-16 sm:pt-24" style={{ animationDelay: "60ms" }}>
            <Blob className="pt-float pointer-events-none absolute -right-10 top-8 hidden w-[260px] text-sparkle/60 sm:block" />
            <h1 className="relative text-[clamp(52px,10vw,120px)] font-light leading-[0.95] tracking-[-0.035em]">
              publish
              <br />
              <b className="font-bold">pages.</b>
            </h1>
            <p className="relative mt-8 max-w-[34ch] text-[17px] font-light leading-relaxed">
              Drop an export, pick the address, and it goes live on xdough.com.
            </p>
          </header>

          {loadError && (
            <p className="mb-6 flex items-center gap-3 rounded-2xl border border-[#B3342A]/30 bg-[#F8E7E4] px-5 py-4 text-[14px] font-medium text-[#8F2820]" role="alert">
              <Icon name="alert" /> {loadError}
            </p>
          )}

          <NewPage
            pages={pages}
            notify={notify}
            onPublished={(page) => {
              notify(
                "ok",
                `Published /${page.slug}. The site is redeploying now. Wait about 40 seconds, then open xdough.com/${page.slug} to see it live.`,
              );
              void load();
            }}
          />

          {/* All pages */}
          <section className="mt-20">
            <div className="flex items-baseline justify-between gap-4 border-b border-navy/20 pb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-water">
              <span>All pages</span>
              <span>{pages.length} published</span>
            </div>
            {pages.length === 0 ? (
              <div className="pt-rise flex flex-col items-center py-20 text-center">
                <Blob className="pt-float w-40 text-sparkle" />
                <p className="mt-8 text-[28px] font-light leading-tight tracking-[-0.02em]">
                  nothing <b className="font-bold">yet.</b>
                </p>
                <p className="mt-2 text-[15px] text-water">Your first page will show up here.</p>
              </div>
            ) : (
              <ul>
                {pages.map((page, i) => (
                  <PageRow
                    key={page.slug}
                    page={page}
                    index={i}
                    notify={notify}
                    onChanged={(text) => {
                      notify("ok", text);
                      void load();
                    }}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    );

  return (
    <>
      <style>{CSS}</style>
      {body}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-3 px-4 pb-6"
        aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pt-pop pointer-events-auto flex w-full max-w-[520px] items-start gap-3 rounded-2xl px-5 py-4 text-[14px] leading-snug shadow-[0_24px_48px_-20px_rgba(18,41,64,0.55)] ${
              toast.kind === "ok" ? "bg-navy text-cream" : "bg-[#B3342A] text-cream"
            }`}
            role={toast.kind === "err" ? "alert" : "status"}>
            <span className={`mt-0.5 ${toast.kind === "ok" ? "text-sparkle" : ""}`}>
              <Icon name={toast.kind === "ok" ? "check" : "alert"} />
            </span>
            <span className="flex-1">{toast.text}</span>
            <button
              className="-mr-1 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100"
              aria-label="Dismiss"
              onClick={() => setToasts((list) => list.filter((t) => t.id !== toast.id))}>
              <Icon name="x" className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Login ────────────────────────────────────────────────────────────── */

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-cream px-5 text-navy">
      <Blob className="pt-float pointer-events-none absolute -left-24 top-[12%] w-[420px] text-sparkle/55" />
      <Blob className="pt-float pointer-events-none absolute -right-20 bottom-[8%] w-[300px] rotate-12 text-sparkle/40" />
      <form
        className="pt-rise relative mx-auto w-full max-w-[420px]"
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError("");
          try {
            await api("/api/portal/login", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ password }),
            });
            onDone();
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}>
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-water">Dough portal</p>
        <h1 className="mt-6 text-[clamp(56px,12vw,88px)] font-light leading-[0.95] tracking-[-0.035em]">
          sign
          <br />
          <b className="font-bold">in.</b>
        </h1>
        <label className="mt-12 block text-[13px] font-semibold" htmlFor="portal-password">
          Password
        </label>
        <input
          id="portal-password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${field} mt-2`}
          aria-invalid={Boolean(error)}
        />
        <p className={`mt-3 min-h-5 text-[14px] font-semibold text-[#B3342A] transition-opacity ${error ? "opacity-100" : "opacity-0"}`} role="alert">
          {error}
        </p>
        <button className={`${btnSolid} mt-3 w-full min-h-12 text-[15px]`} disabled={busy || !password}>
          {busy ? <Spinner /> : <>Sign in <Icon name="arrow" className="size-[18px] transition-transform group-hover/btn:translate-x-1" /></>}
        </button>
      </form>
    </main>
  );
}

/* ── Publish a new page (navy page, per the profile rhythm) ───────────── */

function NewPage({
  pages,
  notify,
  onPublished,
}: {
  pages: Page[];
  notify: Notify;
  onPublished: (page: Page) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [step, setStep] = useState<{ text: string; percent: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const busy = step !== null;
  const taken = pages.some((p) => p.slug === slug);
  const valid = SLUG_RE.test(slug) && !taken && file;

  const pick = (next: File | null) => {
    setFile(next);
    if (next && !slug) setSlug(slugify(next.name));
  };

  return (
    <section className="pt-rise rounded-[28px] bg-navy p-6 text-cream sm:p-10" style={{ animationDelay: "120ms" }}>
      <div className="flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.14em] text-sparkle">
        <span>New page</span>
        <span>Zip or HTML</span>
      </div>
      <h2 className="mt-8 text-[clamp(34px,5vw,52px)] font-light leading-none tracking-[-0.02em]">
        publish a <b className="font-bold">page.</b>
      </h2>

      <label
        htmlFor="new-file"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files?.[0] ?? null);
        }}
        className={`group/drop mt-8 flex cursor-pointer items-center gap-5 rounded-3xl border border-dashed p-6 transition-all duration-300 ${
          dragging
            ? "scale-[1.01] border-cream bg-cream/10"
            : file
              ? "border-sparkle/60 bg-cream/5"
              : "border-sparkle/40 hover:border-sparkle hover:bg-cream/5"
        }`}>
        <span
          className={`flex size-14 shrink-0 items-center justify-center rounded-full bg-sparkle text-navy transition-transform duration-300 ${
            dragging ? "-translate-y-1 scale-110" : "group-hover/drop:-translate-y-0.5"
          }`}>
          <Icon name={file ? "file" : "upload"} className="size-6" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[17px] font-semibold">
            {file ? file.name : dragging ? "Drop it here" : "Choose a file or drop it here"}
          </span>
          <span className="mt-0.5 block text-[14px] text-sparkle">
            {file ? `${(file.size / 1024).toFixed(file.size > 1048576 ? 0 : 1)} KB · click to change` : "An exported .zip, or a single .html file"}
          </span>
        </span>
        <input
          id="new-file"
          ref={input}
          type="file"
          accept=".zip,.html,.htm,application/zip,text/html"
          className="sr-only"
          onChange={(e) => pick(e.target.files?.[0] ?? null)}
        />
      </label>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-[13px] font-semibold" htmlFor="new-slug">
            Address
          </label>
          <div className="mt-2 flex items-center rounded-full border border-sparkle/40 pl-5 text-[15px] transition-colors focus-within:border-cream">
            <span className="text-sparkle">xdough.com/</span>
            <input
              id="new-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="primos-november-calendar"
              className="min-w-0 flex-1 bg-transparent py-3 pr-5 outline-none placeholder:text-sparkle/50"
            />
          </div>
          <p className={`mt-2 min-h-5 text-[13px] text-sparkle transition-opacity ${slug && (!SLUG_RE.test(slug) || taken) ? "opacity-100" : "opacity-0"}`}>
            {taken ? "That address is taken. Use Update on that page instead." : "Lowercase letters, numbers and dashes only."}
          </p>
        </div>
        <div>
          <label className="text-[13px] font-semibold" htmlFor="new-title">
            Name <span className="font-normal text-sparkle">(optional)</span>
          </label>
          <input
            id="new-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Taken from the page if empty"
            className="mt-2 w-full rounded-full border border-sparkle/40 bg-transparent px-5 py-3 text-[15px] outline-none transition-colors placeholder:text-sparkle/50 focus:border-cream"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <button
          className={`${btn} min-h-12 bg-cream px-7 text-[15px] text-navy hover:bg-sparkle`}
          disabled={!valid || busy}
          onClick={async () => {
            if (!file) return;
            setStep({ text: "Starting…", percent: 2 });
            try {
              const page = await publish(file, slug, title.trim(), "create", (text, percent) =>
                setStep({ text, percent }),
              );
              setFile(null);
              setSlug("");
              setTitle("");
              if (input.current) input.current.value = "";
              onPublished(page);
            } catch (e) {
              notify("err", (e as Error).message);
            } finally {
              setStep(null);
            }
          }}>
          {busy ? <Spinner /> : <Icon name="upload" />}
          {busy ? "Publishing" : "Publish"}
        </button>
        <span className="min-h-5 text-[14px] text-sparkle">{step?.text}</span>
      </div>

      <div
        className={`overflow-hidden rounded-full bg-sparkle/20 transition-all duration-300 ${step ? "mt-6 h-1.5 opacity-100" : "mt-0 h-0 opacity-0"}`}
        role="progressbar"
        aria-valuenow={Math.round(step?.percent ?? 0)}
        aria-valuemin={0}
        aria-valuemax={100}>
        <div
          className={`h-full rounded-full bg-sparkle transition-[width] duration-500 ease-out ${step && step.percent < 100 ? "pt-sheen" : ""}`}
          style={{ width: `${step?.percent ?? 0}%` }}
        />
      </div>
    </section>
  );
}

/* ── One published page ───────────────────────────────────────────────── */

function PageRow({
  page,
  index,
  notify,
  onChanged,
}: {
  page: Page;
  index: number;
  notify: Notify;
  onChanged: (text: string) => void;
}) {
  const [mode, setMode] = useState<"" | "edit" | "history" | "delete">("");
  const [busy, setBusy] = useState("");
  const [slug, setSlug] = useState(page.slug);
  const [title, setTitle] = useState(page.title);
  const [versions, setVersions] = useState<Version[] | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const url = `/${page.slug}`;

  const run = async (label: string, job: () => Promise<string>) => {
    setBusy(label);
    try {
      onChanged(await job());
      setMode("");
    } catch (e) {
      notify("err", (e as Error).message);
    } finally {
      setBusy("");
    }
  };
  const post = (body: object) =>
    api("/api/portal/manage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  const toggle = (next: typeof mode) => setMode(mode === next ? "" : next);

  return (
    <li
      className="pt-rise group/row relative border-b border-navy/20 py-7 transition-colors"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}>
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
        <div className="min-w-0 flex-1 basis-[260px]">
          <div className="flex items-center gap-3">
            <p className="truncate text-[22px] font-bold tracking-[-0.01em]">{page.title}</p>
            <span className="shrink-0 rounded-full bg-sparkle px-2.5 py-0.5 text-[12px] font-semibold">v{page.version}</span>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="mt-1.5 inline-flex items-center gap-1.5 text-[15px] text-water underline-offset-4 transition-colors hover:text-navy hover:underline">
            xdough.com{url} <Icon name="external" className="size-3.5" />
          </a>
          <p className="mt-1.5 text-[13px] text-water" title={dateText(page.updatedAt)}>
            Updated {ago(page.updatedAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={btnGhost}
            disabled={Boolean(busy)}
            aria-label="Copy link"
            onClick={() =>
              navigator.clipboard
                ?.writeText(`${location.origin}${url}`)
                .then(() => notify("ok", "Link copied."))
                .catch(() => notify("err", "Could not copy. Select the link and copy it."))
            }>
            <Icon name="link" /> <span className="max-sm:sr-only">Copy link</span>
          </button>
          <button className={btnGhost} disabled={Boolean(busy)} aria-label="Update" onClick={() => fileInput.current?.click()}>
            {busy === "update" ? <Spinner /> : <Icon name="refresh" />} <span className="max-sm:sr-only">Update</span>
          </button>
          <input
            ref={fileInput}
            type="file"
            accept=".zip,.html,.htm,application/zip,text/html"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              void run("update", async () => {
                await publish(file, page.slug, page.title, "update", () => {});
                return `Updated /${page.slug}. The site is redeploying now. Wait about 40 seconds, then refresh xdough.com/${page.slug} to see the new version.`;
              });
            }}
          />
          <button className={`${btnGhost} ${mode === "edit" ? "border-navy bg-sparkle/50" : ""}`} disabled={Boolean(busy)} aria-label="Edit" onClick={() => toggle("edit")}>
            <Icon name="pencil" /> <span className="max-sm:sr-only">Edit</span>
          </button>
          <button
            className={`${btnGhost} ${mode === "history" ? "border-navy bg-sparkle/50" : ""}`}
            disabled={Boolean(busy)}
            aria-label="Versions"
            onClick={async () => {
              toggle("history");
              if (mode === "history" || versions) return;
              try {
                setVersions((await api<{ versions: Version[] }>(`/api/portal/history?slug=${page.slug}`)).versions);
              } catch (e) {
                notify("err", (e as Error).message);
              }
            }}>
            <Icon name="clock" /> <span className="max-sm:sr-only">Versions</span>
          </button>
          <button
            className={`${btn} border text-[#B3342A] hover:bg-[#B3342A] hover:text-cream ${mode === "delete" ? "border-[#B3342A] bg-[#F8E7E4]" : "border-[#B3342A]/40"}`}
            disabled={Boolean(busy)}
            aria-label="Delete"
            onClick={() => toggle("delete")}>
            <Icon name="trash" /> <span className="max-sm:sr-only">Delete</span>
          </button>
        </div>
      </div>

      <Collapse open={mode === "edit"}>
        <div className="grid gap-4 rounded-3xl bg-sparkle/40 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className="text-[12px] font-semibold" htmlFor={`t-${page.slug}`}>Name</label>
            <input id={`t-${page.slug}`} className={`${field} mt-1.5`} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-[12px] font-semibold" htmlFor={`s-${page.slug}`}>Address</label>
            <input id={`s-${page.slug}`} className={`${field} mt-1.5`} value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} />
          </div>
          <button
            className={`${btnSolid} min-h-[46px]`}
            disabled={Boolean(busy) || !SLUG_RE.test(slug)}
            onClick={() =>
              run("edit", async () => {
                await post({ action: "edit", slug: page.slug, newSlug: slug, title });
                return slug !== page.slug
                  ? `Moved to /${slug}. The site is redeploying now. Wait about 40 seconds, then use xdough.com/${slug}; the old address stops working after that.`
                  : "Saved.";
              })
            }>
            {busy === "edit" ? <Spinner /> : <Icon name="check" />} Save
          </button>
        </div>
      </Collapse>

      <Collapse open={mode === "history"}>
        <ul className="rounded-3xl bg-sparkle/40 p-2">
          {versions === null && (
            <li className="flex items-center gap-3 px-4 py-3 text-[14px] text-water">
              <Spinner /> Loading versions…
            </li>
          )}
          {versions?.map((v, i) => (
            <li key={v.sha} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[14px] transition-colors hover:bg-cream/70">
              <span className="min-w-0">
                <b className="font-semibold">{v.message}</b>
                <span className="ml-2 text-water">{dateText(v.date)}</span>
              </span>
              {i === 0 ? (
                <span className="rounded-full bg-navy px-3 py-1 text-[12px] font-semibold text-cream">Current</span>
              ) : (
                <button
                  className={btnGhost}
                  disabled={Boolean(busy)}
                  onClick={() =>
                    run("restore", async () => {
                      await post({ action: "restore", slug: page.slug, sha: v.sha });
                      return `Restored /${page.slug}. The site is redeploying now. Wait about 40 seconds, then refresh xdough.com/${page.slug}.`;
                    })
                  }>
                  {busy === "restore" ? <Spinner /> : <Icon name="refresh" />} Restore
                </button>
              )}
            </li>
          ))}
          {versions?.length === 0 && <li className="px-4 py-3 text-[14px] text-water">No earlier versions.</li>}
        </ul>
      </Collapse>

      <Collapse open={mode === "delete"}>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#B3342A]/30 bg-[#F8E7E4] p-5">
          <p className="flex max-w-[52ch] items-start gap-3 text-[14px] text-[#8F2820]">
            <Icon name="alert" className="mt-0.5 size-5 shrink-0" />
            <span>
              Delete <b>/{page.slug}</b>? The page stops working after the next deploy. You can still bring it back from the repository history.
            </span>
          </p>
          <div className="flex gap-2">
            <button className={btnGhost} onClick={() => setMode("")}>
              Keep it
            </button>
            <button
              className={`${btn} text-cream hover:brightness-110`}
              style={{ background: RED }}
              disabled={Boolean(busy)}
              onClick={() =>
                run("delete", async () => {
                  await post({ action: "delete", slug: page.slug });
                  return `Deleted /${page.slug}. The site is redeploying now; the link stops working in about 40 seconds.`;
                })
              }>
              {busy === "delete" ? <Spinner /> : <Icon name="trash" />} Delete page
            </button>
          </div>
        </div>
      </Collapse>
    </li>
  );
}
