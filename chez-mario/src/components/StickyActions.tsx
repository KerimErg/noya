import Link from "next/link";
import { site } from "@/content/site";
import { PhoneIcon } from "./Icons";

/** Barre d'actions toujours visible sur mobile : « Voir la carte » + « Appeler ». */
export function StickyActions() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1.35fr_1fr] gap-2 rounded-full border border-white/10 bg-coal-800/90 p-1.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,.9)] backdrop-blur-md md:hidden" style={{ paddingBottom: "max(6px, env(safe-area-inset-bottom))" }}>
      <Link href="/carte" className="btn btn-red h-12">
        Voir la carte
      </Link>
      <a href={`tel:${site.phone.tel}`} className="btn btn-coin h-12" aria-label={`Appeler Chez Mario au ${site.phone.display}`}>
        <PhoneIcon className="h-4 w-4" /> Appeler
      </a>
    </div>
  );
}
