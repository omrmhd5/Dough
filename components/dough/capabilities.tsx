"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Emphasis, Photo, RunningHeader } from "./primitives";
import { Reveal } from "./reveal";

type Item = {
  title: string;
  body: string;
  alt: string;
  play?: string;
  pause?: string;
};

const MEDIA = [
  { src: "/profile/cp/kufta-boxes.webp", w: 1066, h: 1600 },
  { src: "/profile/ai/comfort-grid-web.webp", w: 1600, h: 2000 },
  { video: "/profile/ai/lux-grapefruit.mp4", src: "/profile/ai/lux-grapefruit-still.webp", w: 941, h: 1672 },
  { src: "/profile/cp/crepe-booth-crop.webp", w: 1000, h: 800 },
  { src: "/profile/v3/n49-0.webp", w: 800, h: 800 },
  { src: "/profile/cp/kufta-booth.webp", w: 1024, h: 768 },
] as const;

export function FilmTile({
  src,
  poster,
  alt,
  playLabel,
  pauseLabel,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={cn("relative overflow-hidden bg-[#E8B7A5]", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="none"
        aria-label={alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="photo"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        aria-pressed={playing}
        className="absolute inset-0 flex items-end justify-start p-5 text-cream">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-full bg-navy/80 backdrop-blur transition-opacity duration-300",
            playing && "opacity-0 hover:opacity-100",
          )}>
          {playing ? (
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5 translate-x-px" fill="currentColor" aria-hidden="true">
              <path d="M8 5l11 7-11 7z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}

/** Profile pages 39–45: what the studio makes beyond the brief. */
export function Capabilities({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("capabilities");
  const items = t.raw("items") as Item[];

  return (
    <section className="section-y bg-grey text-navy">
      <div className="wrap">
        {showHeader && <RunningHeader start="dough" end={t("label")} />}

        <div className="mt-[clamp(56px,8vw,150px)] flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <h2 className="t-display t-md">
              <Emphasis text={t("title")} />
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="t-body max-w-[38ch]">{t("intro")}</p>
          </Reveal>
        </div>

        <ul className="mt-[clamp(56px,7vw,120px)] grid gap-x-[clamp(20px,2.5vw,48px)] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const media = MEDIA[i];
            return (
              <Reveal as="li" key={item.title} delay={(i % 3) * 90} className="flex flex-col">
                {"video" in media ? (
                  <FilmTile
                    src={media.video}
                    poster={media.src}
                    alt={item.alt}
                    playLabel={item.play ?? ""}
                    pauseLabel={item.pause ?? ""}
                    className="photo-shadow aspect-[4/5]"
                  />
                ) : (
                  <Photo
                    src={media.src}
                    alt={item.alt}
                    width={media.w}
                    height={media.h}
                    shadow
                    className="aspect-[4/5]"
                  />
                )}
                <h3 className="t-display mt-7 text-[clamp(26px,2.2vw,42px)] leading-[1.05]">
                  <Emphasis text={item.title} />
                </h3>
                <p className="t-small mt-3 max-w-[38ch]">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
