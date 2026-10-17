"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Photo, hasPhoto } from "./Photo";
import { Mascot } from "./Mascot";

/**
 * Média de la bannière d'accueil :
 * - vidéo (si site.heroVideo) : muted + playsinline forcés en JS pour iOS, image de secours,
 *   désactivée si « mouvement réduit » ou mode économie de données ;
 * - sinon photo (site.heroPhoto) ;
 * - sinon la mascotte sur fond de braises.
 */
export function HeroMedia() {
  const ref = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(false);
  const v = site.heroVideo;

  useEffect(() => {
    const video = ref.current;
    if (!video || !v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const play = () => video.play().then(() => setVideoOk(true)).catch(() => setVideoOk(false));
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
  }, [v]);

  if (v) {
    return (
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.poster} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <video ref={ref} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoOk ? "opacity-100" : "opacity-0"}`} poster={v.poster} muted playsInline loop preload="metadata" aria-hidden>
          {v.webm && <source src={v.webm} type="video/webm" />}
          <source src={v.mp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-coal/30" />
      </div>
    );
  }

  if (hasPhoto(site.heroPhoto)) {
    return (
      <div className="absolute inset-0">
        <Photo name={site.heroPhoto} alt="" priority sizes="100vw" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-coal/20" />
      </div>
    );
  }

  return null;
}

/** Visuel de secours : mascotte + braises qui montent. */
export function HeroArt() {
  if (site.heroVideo || hasPhoto(site.heroPhoto)) return null;
  return (
    <div className="pointer-events-none relative mx-auto w-[min(56%,34svh)] max-w-[460px] md:w-full">
      <div aria-hidden className="absolute inset-x-[-20%] bottom-[-8%] top-[18%] rounded-full bg-[radial-gradient(closest-side,rgba(255,122,26,.55),rgba(216,30,26,.25)_55%,transparent)] blur-2xl animate-flicker" />
      <Mascot className="relative w-full animate-bob drop-shadow-[0_30px_40px_rgba(0,0,0,.6)]" />
    </div>
  );
}

const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  delay: (i * 0.7) % 6,
  dur: 6 + ((i * 1.3) % 5),
  size: 2 + (i % 3),
}));

export function Embers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full bg-flame"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            boxShadow: "0 0 8px 2px rgba(255,122,26,.8)",
            animation: `rise ${e.dur}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
