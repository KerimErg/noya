import Link from "next/link";
import { site } from "@/content/site";
import { PhoneIcon } from "./Icons";
import { CallLink } from "@/components/CallLink";

/** Barre d'actions toujours visible sur mobile : « Voir la carte » + « Appeler ». */
export function StickyActions() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1.35fr_1fr] gap-2 rounded-[1.4rem] border-[3px] border-ink bg-white p-2 shadow-pop md:hidden" style={{ paddingBottom: "max(6px, env(safe-area-inset-bottom))" }}>
      <Link href="/carte" className="btn btn-red h-12 px-3 shadow-pop-sm">
        Voir la carte
      </Link>
      <CallLink className="btn btn-coin h-12 px-3 shadow-pop-sm" label={`Appeler Chez Mario au ${site.phone.display}`}>
        <PhoneIcon className="h-4 w-4" /> Appeler
      </CallLink>
    </div>
  );
}
