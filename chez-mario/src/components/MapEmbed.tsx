import { fullAddress, mapsEmbed, mapsLink, site } from "@/content/site";
import { PinIcon } from "./Icons";

/** Plan affiché directement : OpenStreetMap si les coordonnées GPS sont connues, sinon Google Maps. */
export function MapEmbed({ className = "" }: { className?: string }) {
  const g = site.geo;
  const src = g
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${g.lng - 0.006},${g.lat - 0.0035},${g.lng + 0.006},${g.lat + 0.0035}&layer=mapnik&marker=${g.lat},${g.lng}`
    : mapsEmbed();
  return (
    <div className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-luigi-light shadow-pop ${className}`}>
      <iframe
        title={`Plan d'accès — Chez Mario, ${fullAddress()}`}
        src={src}
        className="min-h-[300px] w-full flex-1 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
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
