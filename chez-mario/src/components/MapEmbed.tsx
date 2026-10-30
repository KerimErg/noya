"use client";

import Link from "next/link";
import { useState } from "react";
import { fullAddress, mapsEmbed, mapsLink, site } from "@/content/site";
import { PinIcon } from "./Icons";

/**
 * Plan d'accès.
 * - Coordonnées GPS connues → OpenStreetMap, affiché directement (aucun cookie).
 * - Sinon → Google Maps, chargé seulement après un clic du visiteur : l'intégration dépose des cookies
 *   Google, qui exigent un consentement préalable (CNIL, art. 82 de la loi Informatique et Libertés).
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const g = site.geo;
  const [googleAllowed, setGoogleAllowed] = useState(false);
  const src = g
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${g.lng - 0.006},${g.lat - 0.0035},${g.lng + 0.006},${g.lat + 0.0035}&layer=mapnik&marker=${g.lat},${g.lng}`
    : mapsEmbed();
  const showMap = !!g || googleAllowed;
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-luigi-light shadow-pop ${className}`}>
      {showMap ? (
        <iframe
          title={`Plan d'accès — Chez Mario, ${fullAddress()}`}
          src={src}
          className="min-h-[300px] w-full flex-1 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="flex min-h-[300px] w-full flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
          <PinIcon className="h-12 w-12 text-mario" />
          <p className="max-w-sm text-sm font-bold">
            Le plan est fourni par Google Maps, qui dépose ses propres cookies. Il ne s&apos;affiche qu&apos;avec votre accord.
          </p>
          <button type="button" onClick={() => setGoogleAllowed(true)} className="btn btn-red h-11 px-5 text-sm shadow-pop-sm">
            Afficher le plan
          </button>
          <Link href="/confidentialite" className="text-xs underline">
            En savoir plus
          </Link>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-ink bg-white p-3">
        <p className="flex items-center gap-2 text-sm font-bold">
          <PinIcon className="h-5 w-5 shrink-0 text-mario" /> {fullAddress()}
        </p>
        <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red h-10 px-4 text-sm shadow-pop-sm">
          Itinéraire
        </a>
      </div>
    </div>
  );
}
