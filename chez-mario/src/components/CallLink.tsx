"use client";

import { useState, type ReactNode } from "react";
import { site } from "@/content/site";

/**
 * Lien d'appel : sur téléphone, il lance l'appel (tel:).
 * Sur ordinateur (pas de téléphone), il copie aussi le numéro et l'affiche pour qu'on ne reste pas sans réponse.
 */
export function CallLink({ className, children, label }: { className?: string; children: ReactNode; label?: string }) {
  const [shown, setShown] = useState(false);
  const onClick = () => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!desktop) return; // mobile : l'appel se lance normalement
    navigator.clipboard?.writeText(site.phone.display).catch(() => {});
    setShown(true);
    window.setTimeout(() => setShown(false), 3500);
  };
  return (
    <>
      <a href={`tel:${site.phone.tel}`} onClick={onClick} className={className} aria-label={label}>
        {children}
      </a>
      {shown && (
        <span role="status" className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 animate-pop rounded-2xl border-[3px] border-ink bg-white px-5 py-3 text-center font-bold text-ink shadow-pop-lg">
          📞 {site.phone.display}
          <span className="block text-xs font-semibold text-ink-soft">Numéro copié — appelez depuis votre téléphone</span>
        </span>
      )}
    </>
  );
}
