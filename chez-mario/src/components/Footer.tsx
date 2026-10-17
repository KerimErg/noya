import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { Socials, deliveryLinks, socialLinks } from "./Socials";
import { OpenBadge } from "./Hours";
import { hoursSummary } from "@/lib/hours";

export function Footer() {
  const delivery = deliveryLinks();
  return (
    <footer className="relative">
      <div className="ground h-12 border-y-[3px] border-ink" aria-hidden />
      <div className="bg-ink pb-28 pt-14 text-white md:pb-12">
        <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-white/70">{site.tagline} — à Erstein.</p>
            <Socials className="mt-5 text-white" />
            {!socialLinks().length && <p className="mt-4"><span className="todo border-coin text-coin">Réseaux sociaux à compléter</span></p>}
          </div>
          <div>
            <p className="mb-4 font-display uppercase tracking-wide text-coin">Navigation</p>
            <ul className="space-y-2 text-sm font-semibold">
              <li><Link className="hover:text-coin" href="/">Accueil</Link></li>
              <li><Link className="hover:text-coin" href="/carte">La carte</Link></li>
              <li><Link className="hover:text-coin" href="/contact">Infos & contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 font-display uppercase tracking-wide text-coin">Contact</p>
            <address className="space-y-2 text-sm not-italic text-white/85">
              <p>{site.address.street}<br />{site.address.postalCode} {site.address.city}</p>
              <p><a className="font-bold text-white hover:text-coin" href={`tel:${site.phone.tel}`}>{site.phone.display}</a></p>
            </address>
            {delivery.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm">
                {delivery.map((d) => (
                  <li key={d.label}><a className="underline underline-offset-4 hover:text-coin" href={d.href} target="_blank" rel="noopener noreferrer">{d.label}</a></li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className="mb-4 font-display uppercase tracking-wide text-coin">Horaires</p>
            <OpenBadge />
            {site.hours ? (
              <ul className="mt-3 space-y-1 text-sm text-white/75">
                {hoursSummary(site.hours).map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3"><span className="todo border-coin text-coin">Horaires à compléter</span></p>
            )}
          </div>
        </div>
        <div className="container-x mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Chez Mario, Erstein.</p>
          <ul className="flex gap-5">
            <li><Link className="hover:text-white" href="/mentions-legales">Mentions légales</Link></li>
            <li><Link className="hover:text-white" href="/confidentialite">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
