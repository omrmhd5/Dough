"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prepareIndex, readZip, tidyZip, titleOf } from "@/lib/portal/zip";

type Page = {
  slug: string;
  title: string;
  version: number;
  createdAt: string;
  updatedAt: string;
};
type Version = { sha: string; url: string; message: string; date: string };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.zip$/, "")
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

/** Unzips in the browser, uploads each file, then asks the server for one commit. */
async function publish(
  zip: File,
  slug: string,
  title: string,
  mode: "create" | "update",
  onStep: (text: string) => void,
) {
  onStep("Reading the zip…");
  const files = tidyZip(await readZip(await zip.arrayBuffer()));
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
      onStep(`Uploading files… ${++done} of ${uploads.length}`);
    }
  }
  await Promise.all([worker(), worker(), worker()]);

  onStep("Publishing…");
  const { page } = await api<{ page: Page }>("/api/portal/manage", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "publish", mode, slug, title: finalTitle, files: results }),
  });
  return page;
}

const button =
  "rounded-full bg-navy px-5 py-2.5 text-[14px] font-semibold text-cream transition-opacity hover:opacity-85 disabled:opacity-40";
const ghost =
  "rounded-full border border-navy/30 px-4 py-2 text-[13px] font-semibold text-navy transition-colors hover:bg-sparkle/50 disabled:opacity-40";
const field =
  "w-full rounded-full border border-navy/30 bg-cream px-5 py-3 text-[15px] text-navy outline-none focus:border-navy";

export default function PortalPage() {
  const [state, setState] = useState<"loading" | "signedOut" | "signedIn">("loading");
  const [pages, setPages] = useState<Page[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    try {
      const data = await api<{ pages: Page[] }>("/api/portal/pages");
      setPages(data.pages);
      setState("signedIn");
      setError("");
    } catch (e) {
      if ((e as Error & { status?: number }).status === 401) setState("signedOut");
      else {
        setState("signedIn");
        setError((e as Error).message);
      }
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (state === "loading") {
    return <main className="min-h-screen bg-cream" />;
  }
  if (state === "signedOut") return <Login onDone={load} />;

  return (
    <main className="min-h-screen bg-cream text-navy">
      <div className="mx-auto max-w-[980px] px-5 pb-24 pt-10 sm:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-navy/20 pb-6">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-water">
              Dough portal
            </p>
            <h1 className="mt-2 text-[clamp(30px,5vw,48px)] font-light leading-none tracking-[-0.02em]">
              published <b className="font-bold">pages.</b>
            </h1>
          </div>
          <button
            className={ghost}
            onClick={async () => {
              await api("/api/portal/logout", { method: "POST" }).catch(() => {});
              setState("signedOut");
            }}>
            Sign out
          </button>
        </header>

        {error && (
          <p className="mt-6 rounded-2xl bg-navy px-5 py-4 text-[14px] text-cream" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="mt-6 rounded-2xl bg-sparkle px-5 py-4 text-[14px] text-navy" role="status">
            {notice}
          </p>
        )}

        <NewPage
          pages={pages}
          onPublished={(page) => {
            setNotice(
              `Published /${page.slug}. The site is redeploying now. Wait about 40 seconds, then open xdough.com/${page.slug} to see it live.`,
            );
            void load();
          }}
        />

        <section className="mt-14">
          <h2 className="text-[22px] font-bold tracking-[-0.01em]">All pages</h2>
          {pages.length === 0 ? (
            <p className="mt-4 text-[15px] text-water">Nothing published yet.</p>
          ) : (
            <ul className="mt-5 border-t border-navy/20">
              {pages.map((page) => (
                <PageRow
                  key={page.slug}
                  page={page}
                  onChanged={(text) => {
                    setNotice(text);
                    void load();
                  }}
                  onError={setError}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function Login({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 text-navy">
      <form
        className="w-full max-w-[380px]"
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
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-water">
          Dough portal
        </p>
        <h1 className="mt-3 text-[40px] font-light leading-none tracking-[-0.02em]">
          sign <b className="font-bold">in.</b>
        </h1>
        <label className="mt-8 block text-[13px] font-semibold" htmlFor="portal-password">
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
        />
        {error && (
          <p className="mt-3 text-[14px] font-semibold" role="alert">
            {error}
          </p>
        )}
        <button className={`${button} mt-6 w-full`} disabled={busy || !password}>
          {busy ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function NewPage({ pages, onPublished }: { pages: Page[]; onPublished: (page: Page) => void }) {
  const [zip, setZip] = useState<File | null>(null);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const busy = Boolean(step);
  const taken = pages.some((p) => p.slug === slug);
  const valid = SLUG_RE.test(slug) && !taken && zip;

  return (
    <section className="mt-10 rounded-3xl bg-navy p-6 text-cream sm:p-8">
      <h2 className="text-[22px] font-bold tracking-[-0.01em]">Publish a new page</h2>
      <p className="mt-2 text-[14px] text-sparkle">
        Drop the exported zip, choose the address, publish.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-[13px] font-semibold" htmlFor="new-zip">
            Zip file
          </label>
          <input
            id="new-zip"
            ref={input}
            type="file"
            accept=".zip,application/zip"
            className="mt-2 block w-full rounded-full border border-sparkle/40 bg-transparent px-4 py-2.5 text-[14px] file:mr-4 file:rounded-full file:border-0 file:bg-cream file:px-4 file:py-1.5 file:text-[13px] file:font-semibold file:text-navy"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setZip(file);
              if (file && !slug) setSlug(slugify(file.name));
            }}
          />
        </div>
        <div>
          <label className="text-[13px] font-semibold" htmlFor="new-slug">
            Address
          </label>
          <div className="mt-2 flex items-center rounded-full border border-sparkle/40 pl-5 text-[15px]">
            <span className="text-sparkle">xdough.com/</span>
            <input
              id="new-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="primos-november-calendar"
              className="min-w-0 flex-1 bg-transparent py-3 pr-5 outline-none"
            />
          </div>
          {slug && !SLUG_RE.test(slug) && (
            <p className="mt-2 text-[13px] text-sparkle">Lowercase letters, numbers and dashes only.</p>
          )}
          {taken && <p className="mt-2 text-[13px] text-sparkle">That address is already published. Use Update on it instead.</p>}
        </div>
        <div>
          <label className="text-[13px] font-semibold" htmlFor="new-title">
            Name (optional)
          </label>
          <input
            id="new-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Taken from the page if empty"
            className="mt-2 w-full rounded-full border border-sparkle/40 bg-transparent px-5 py-3 text-[15px] outline-none placeholder:text-sparkle/60"
          />
        </div>
      </div>
      {error && (
        <p className="mt-4 text-[14px] font-semibold" role="alert">
          {error}
        </p>
      )}
      <div className="mt-6 flex items-center gap-4">
        <button
          className="rounded-full bg-cream px-6 py-3 text-[14px] font-semibold text-navy transition-opacity hover:opacity-90 disabled:opacity-40"
          disabled={!valid || busy}
          onClick={async () => {
            if (!zip) return;
            setError("");
            try {
              const page = await publish(zip, slug, title.trim(), "create", setStep);
              setZip(null);
              setSlug("");
              setTitle("");
              if (input.current) input.current.value = "";
              onPublished(page);
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setStep("");
            }
          }}>
          {busy ? "Working…" : "Publish"}
        </button>
        {step && <span className="text-[14px] text-sparkle">{step}</span>}
      </div>
    </section>
  );
}

function PageRow({
  page,
  onChanged,
  onError,
}: {
  page: Page;
  onChanged: (text: string) => void;
  onError: (text: string) => void;
}) {
  const [mode, setMode] = useState<"" | "edit" | "history" | "delete">("");
  const [busy, setBusy] = useState("");
  const [slug, setSlug] = useState(page.slug);
  const [title, setTitle] = useState(page.title);
  const [versions, setVersions] = useState<Version[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const url = `/${page.slug}`;

  const run = async (label: string, job: () => Promise<string>) => {
    setBusy(label);
    onError("");
    try {
      onChanged(await job());
      setMode("");
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setBusy("");
    }
  };

  return (
    <li className="border-b border-navy/20 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[17px] font-bold">{page.title}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="text-[14px] text-water underline underline-offset-4">
            xdough.com{url}
          </a>
          <p className="mt-1 text-[12px] text-water">
            Version {page.version} · updated {dateText(page.updatedAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={ghost}
            disabled={Boolean(busy)}
            onClick={() => navigator.clipboard?.writeText(`${location.origin}${url}`).then(() => onChanged("Link copied."))}>
            Copy link
          </button>
          <button className={ghost} disabled={Boolean(busy)} onClick={() => fileInput.current?.click()}>
            {busy === "update" ? "Updating…" : "Update"}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept=".zip,application/zip"
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
          <button className={ghost} disabled={Boolean(busy)} onClick={() => setMode(mode === "edit" ? "" : "edit")}>
            Edit
          </button>
          <button
            className={ghost}
            disabled={Boolean(busy)}
            onClick={async () => {
              if (mode === "history") return setMode("");
              setMode("history");
              try {
                setVersions((await api<{ versions: Version[] }>(`/api/portal/history?slug=${page.slug}`)).versions);
              } catch (e) {
                onError((e as Error).message);
              }
            }}>
            Versions
          </button>
          <button className={ghost} disabled={Boolean(busy)} onClick={() => setMode(mode === "delete" ? "" : "delete")}>
            Delete
          </button>
        </div>
      </div>

      {mode === "edit" && (
        <div className="mt-4 grid gap-3 rounded-2xl bg-sparkle/40 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className="text-[12px] font-semibold" htmlFor={`t-${page.slug}`}>Name</label>
            <input id={`t-${page.slug}`} className={`${field} mt-1`} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-[12px] font-semibold" htmlFor={`s-${page.slug}`}>Address</label>
            <input id={`s-${page.slug}`} className={`${field} mt-1`} value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} />
          </div>
          <button
            className={button}
            disabled={Boolean(busy) || !SLUG_RE.test(slug)}
            onClick={() =>
              run("edit", async () => {
                await api("/api/portal/manage", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ action: "edit", slug: page.slug, newSlug: slug, title }),
                });
                return slug !== page.slug
                  ? `Moved to /${slug}. The site is redeploying now. Wait about 40 seconds, then use xdough.com/${slug}; the old address stops working after that.`
                  : "Saved.";
              })
            }>
            {busy === "edit" ? "Saving…" : "Save"}
          </button>
        </div>
      )}

      {mode === "history" && (
        <ul className="mt-4 rounded-2xl bg-sparkle/40 p-2">
          {versions.length === 0 && <li className="px-3 py-2 text-[14px]">Loading…</li>}
          {versions.map((v, i) => (
            <li key={v.sha} className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 text-[14px]">
              <span>
                <b>{v.message}</b> <span className="text-water">· {dateText(v.date)}</span>
              </span>
              {i === 0 ? (
                <span className="text-[12px] font-semibold text-water">Current</span>
              ) : (
                <button
                  className={ghost}
                  disabled={Boolean(busy)}
                  onClick={() =>
                    run("restore", async () => {
                      await api("/api/portal/manage", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ action: "restore", slug: page.slug, sha: v.sha }),
                      });
                      return `Restored /${page.slug}. The site is redeploying now. Wait about 40 seconds, then refresh xdough.com/${page.slug}.`;
                    })
                  }>
                  {busy === "restore" ? "Restoring…" : "Restore"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {mode === "delete" && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy p-4 text-cream">
          <p className="text-[14px]">
            Delete <b>/{page.slug}</b>? The page stops working after the next deploy. You can restore it from the repository history.
          </p>
          <div className="flex gap-2">
            <button className="rounded-full border border-sparkle/50 px-4 py-2 text-[13px] font-semibold" onClick={() => setMode("")}>
              Keep it
            </button>
            <button
              className="rounded-full bg-cream px-4 py-2 text-[13px] font-semibold text-navy disabled:opacity-40"
              disabled={Boolean(busy)}
              onClick={() =>
                run("delete", async () => {
                  await api("/api/portal/manage", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ action: "delete", slug: page.slug }),
                  });
                  return `Deleted /${page.slug}. The site is redeploying now; the link stops working in about 40 seconds.`;
                })
              }>
              {busy === "delete" ? "Deleting…" : "Delete page"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
