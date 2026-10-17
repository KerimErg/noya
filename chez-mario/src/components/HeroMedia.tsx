"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Photo, hasPhoto } from "./Photo";

/**
 * Fond de la bannière si une vidéo (site.heroVideo) ou une photo (site.heroPhoto) est fournie.
 * Vidéo : muted + playsinline forcés en JS pour iOS, image de secours,
 * désactivée si « mouvement réduit » ou mode économie de données.
 * Sans vidéo ni photo : rien (le décor ciel/collines de la page s'affiche).
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
        <div className="absolute inset-0 bg-gradient-to-t from-sky-light/90 via-transparent to-transparent" />
      </div>
    );
  }
  if (hasPhoto(site.heroPhoto)) {
    return (
      <div className="absolute inset-0">
        <Photo name={site.heroPhoto} alt="" priority sizes="100vw" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-light/90 via-transparent to-transparent" />
      </div>
    );
  }
  return null;
}
