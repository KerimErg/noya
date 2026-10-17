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
    <div className={`relative overflow-hidden rounded-3xl border border-white/[0.07] bg-coal-800 ${className}`}>
      {show ? (
        <iframe title={`Plan d'accès — Chez Mario, ${fullAddress()}`} src={mapsEmbed()} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          {/* Fond « plan » stylisé */}
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
            <rect width="400" height="300" fill="#141414" />
            <path d="M-10 210C80 190 120 120 210 130s150 60 210 40" stroke="#2f6b3a" strokeWidth="26" fill="none" opacity=".5" />
            <path d="M0 80h400M0 160h400M90 0v300M200 0v300M310 0v300" stroke="#3a3a3a" strokeWidth="6" />
            <path d="M-20 260L420 40" stroke="#5a4a2a" strokeWidth="10" />
            <path d="M40 0l60 300M260 0l-40 300" stroke="#2c2c2c" strokeWidth="3" />
          </svg>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-mario text-white shadow-glow">
            <PinIcon className="h-7 w-7" />
          </span>
          <p className="relative font-display text-lg font-extrabold uppercase">{fullAddress()}</p>
          <div className="relative flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setShow(true)} className="btn btn-line h-11">
              Afficher le plan
            </button>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red h-11">
              Itinéraire
            </a>
          </div>
          <p className="relative max-w-xs text-[11px] text-muted">Le plan est fourni par Google Maps : en l&apos;affichant, des données sont transmises à Google.</p>
        </div>
      )}
    </div>
  );
}
