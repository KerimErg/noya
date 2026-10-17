"use client";

import { useState } from "react";
import { fullAddress, mapsEmbed, mapsLink } from "@/content/site";
import { PinIcon } from "./Icons";

/**
 * Plan Google Maps chargé uniquement au clic : aucun cookie ni appel à Google avant
 * l'action du visiteur — pas besoin de bandeau cookies.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-luigi-light shadow-pop ${className}`}>
      {show ? (
        <iframe title={`Plan d'accès — Chez Mario, ${fullAddress()}`} src={mapsEmbed()} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
            <rect width="400" height="300" fill="#C8F0D0" />
            <path d="M-10 220C80 200 120 130 210 140s150 60 210 40" stroke="#63C7F7" strokeWidth="22" fill="none" />
            <path d="M0 80h400M0 160h400M90 0v300M200 0v300M310 0v300" stroke="#fff" strokeWidth="10" />
            <path d="M-20 260L420 40" stroke="#FFE07A" strokeWidth="12" />
          </svg>
          <span className="relative grid h-16 w-16 animate-float place-items-center rounded-full border-[3px] border-ink bg-mario text-white shadow-pop">
            <PinIcon className="h-8 w-8" />
          </span>
          <p className="relative rounded-xl border-[3px] border-ink bg-white px-4 py-2 font-display text-lg uppercase shadow-pop-sm">{fullAddress()}</p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setShow(true)} className="btn btn-white h-11">
              Afficher le plan
            </button>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red h-11">
              Itinéraire
            </a>
          </div>
          <p className="relative max-w-xs rounded-lg bg-white/80 px-2 py-1 text-[11px] text-ink-soft">Le plan est fourni par Google Maps : en l&apos;affichant, des données sont transmises à Google.</p>
        </div>
      )}
    </div>
  );
}
