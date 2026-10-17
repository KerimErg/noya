import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { Socials, deliveryLinks, socialLinks } from "./Socials";
import { HoursSummary } from "./Hours";

export function Footer() {
  const delivery = deliveryLinks();
  return (
    <footer className="border-t border-white/[0.06] bg-black pb-28 pt-16 md:pb-12">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline} — à Erstein.</p>
          <Socials className="mt-5" />
          {!socialLinks().length && <p className="mt-4"><span className="todo">Réseaux sociaux à compléter</span></p>}
        </div>
        <div>
          <p className="eyebrow mb-4">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-mario-bright" href="/">Accueil</Link></li>
            <li><Link className="hover:text-mario-bright" href="/carte">La carte</Link></li>
            <li><Link className="hover:text-mario-bright" href="/contact">Infos & contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <address className="space-y-2 text-sm not-italic text-cream/90">
            <p>{site.address.street}<br />{site.address.postalCode} {site.address.city}</p>
            <p><a className="font-bold hover:text-mario-bright" href={`tel:${site.phone.tel}`}>{site.phone.display}</a></p>
          </address>
          {delivery.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {delivery.map((d) => (
                <li key={d.label}><a className="underline-offset-4 hover:underline" href={d.href} target="_blank" rel="noopener noreferrer">{d.label}</a></li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="eyebrow mb-4">Horaires</p>
          <HoursSummary />
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Chez Mario, Erstein.</p>
        <ul className="flex gap-5">
          <li><Link className="hover:text-cream" href="/mentions-legales">Mentions légales</Link></li>
          <li><Link className="hover:text-cream" href="/confidentialite">Confidentialité</Link></li>
        </ul>
      </div>
    </footer>
  );
}
