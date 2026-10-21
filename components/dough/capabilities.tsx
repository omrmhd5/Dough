"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  { src: "/cases/kufta/kufta-boxes.webp", w: 1066, h: 1600 },
  {
    video: "/home/ai-in-the-studio-web.mp4",
    src: "/home/ai-in-the-studio-poster.webp",
    w: 3220,
    h: 642,
    wide: true,
  },
  {
    video: ["/home/motion-1.mp4", "/home/motion-2.mp4"],
    src: "/home/motion-poster.webp",
    w: 3,
    h: 5,
  },
  { src: "/home/crepe-booth-crop.webp", w: 1000, h: 800 },
  { src: "/home/n49-0.webp", w: 800, h: 800 },
  { src: "/cases/kufta/kufta-booth.webp", w: 1024, h: 768 },
] as const;

/** Videos keep their own proportions (no crop), capped by --tile-max. */
function nativeTileStyle(w: number, h: number): CSSProperties {
  return {
    aspectRatio: `${w}/${h}`,
    width: `min(100%, calc(var(--tile-max) * ${w} / ${h}))`,
    maxHeight: "var(--tile-max)",
  };
}

/** One shared 4∶5 frame so mixed-ratio photos line up in a clean grid. */
const TILE_STYLE: CSSProperties = {
  aspectRatio: "4/5",
  width: "min(100%, calc(var(--tile-max) * 4 / 5))",
  maxHeight: "var(--tile-max)",
};

/**
 * Muted looping film tile. Pass several sources to play them back to back
 * with no pause: the next clip starts just before the current one ends and
 * takes over once it is running, then the list loops.
 */
export function FilmTile({
  src,
  poster,
  alt,
  playLabel,
  pauseLabel,
  className,
  style,
}: {
  src: string | readonly string[];
  poster?: string;
  alt: string;
  playLabel: string;
  pauseLabel: string;
  className?: string;
  style?: CSSProperties;
}) {
  const srcs: readonly string[] = typeof src === "string" ? [src] : src;
  const many = srcs.length > 1;
  const rootRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const userPaused = useRef(false);
  const activeRef = useRef(0);
  const switching = useRef(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false);

  const advance = () => {
    if (!many || switching.current) return;
    const from = refs.current[activeRef.current];
    const to = (activeRef.current + 1) % srcs.length;
    const next = refs.current[to];
    if (!from || !next) return;
    switching.current = true;
    next.currentTime = 0;
    next
      .play()
      .then(() => {
        activeRef.current = to;
        setActive(to);
        from.pause();
        from.currentTime = 0;
      })
      .catch(() => {})
      .finally(() => {
        switching.current = false;
      });
  };

  // Start the next clip a hair before the current one ends so there is no gap.
  useEffect(() => {
    if (!many || !playing) return;
    let raf = 0;
    const tick = () => {
      const video = refs.current[activeRef.current];
      if (video && video.duration && video.duration - video.currentTime < 0.2) {
        advance();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [many, playing]);

  // Plays only while on screen: starts when the tile scrolls into view and
  // pauses once it leaves. A manual pause holds until the tile leaves view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = refs.current[activeRef.current];
        if (!video) return;
        if (entry.isIntersecting) {
          setArmed(true);
          if (!userPaused.current && !reduced.matches) {
            void video.play().catch(() => {});
          }
        } else {
          userPaused.current = false;
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = refs.current[activeRef.current];
    if (!video) return;
    setArmed(true);
    if (video.paused) {
      userPaused.current = false;
      void video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative mx-auto overflow-hidden bg-grey", className)}
      style={style}>
      {poster && !playing && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] max-w-none object-cover"
        />
      )}
      {srcs.map((source, i) => (
        <video
          key={source}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={source}
          muted
          playsInline
          loop={!many}
          preload={i === 0 || armed ? "auto" : "metadata"}
          aria-label={alt}
          onPlay={() => {
            if (i === activeRef.current) setPlaying(true);
          }}
          onPause={() => {
            if (i === activeRef.current) setPlaying(false);
          }}
          onEnded={() => {
            if (i === activeRef.current) advance();
          }}
          className={cn(
            // 1px overscan each side so a fractional tile width never shows a seam.
            "absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] max-w-none object-cover",
            ((poster && !playing) || i !== active) && "invisible",
          )}
        />
      ))}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        aria-pressed={playing}
        className="absolute inset-0 z-10 flex items-end justify-start p-5 text-cream">
        <span
          className={cn(
            "flex size-14 items-center justify-center rounded-full bg-navy/80 backdrop-blur transition-opacity duration-300",
            playing && "opacity-0 hover:opacity-100",
          )}>
          {playing ? (
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="currentColor"
              aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="size-5 translate-x-px"
              fill="currentColor"
              aria-hidden="true">
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

        <ul className="mt-[clamp(56px,7vw,120px)] grid gap-x-[clamp(20px,2.5vw,48px)] gap-y-16 sm:grid-cols-2 lg:grid-cols-6">
          {items.map((item, i) => {
            const media = MEDIA[i];
            const wide = "wide" in media && media.wide;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 3) * 90}
                className={cn(
                  "flex min-w-0 flex-col",
                  wide && "order-first sm:col-span-2 lg:col-span-6",
                  !wide && "lg:col-span-2",
                  // Second row of two sits centred under the three above.
                  i === 4 && "lg:col-start-2",
                  i === 5 && "lg:col-start-4",
                  !wide &&
                    i === MEDIA.length - 1 &&
                    "sm:max-lg:col-span-2 sm:max-lg:mx-auto sm:max-lg:w-[calc(50%-0.75rem)]",
                )}>
                {"video" in media ? (
                  <FilmTile
                    src={media.video}
                    poster={media.src}
                    alt={item.alt}
                    playLabel={item.play ?? ""}
                    pauseLabel={item.pause ?? ""}
                    className={cn("photo-shadow", !wide && "mx-auto")}
                    style={
                      wide
                        ? { aspectRatio: `${media.w}/${media.h}`, width: "100%" }
                        : nativeTileStyle(media.w, media.h)
                    }
                  />
                ) : (
                  <Photo
                    src={media.src}
                    alt={item.alt}
                    width={media.w}
                    height={media.h}
                    shadow
                    className="mx-auto"
                    style={TILE_STYLE}
                  />
                )}
                <div
                  className={cn(
                    wide &&
                      "lg:mt-7 lg:flex lg:items-end lg:justify-between lg:gap-12",
                  )}>
                  <h3
                    className={cn(
                      "t-display mt-7 text-[length:var(--name-title)] leading-[1.05]",
                      wide && "lg:mt-0",
                    )}>
                    <Emphasis text={item.title} />
                  </h3>
                  <p
                    className={cn(
                      "t-small mt-3 max-w-[38ch]",
                      wide && "lg:mt-0",
                    )}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
