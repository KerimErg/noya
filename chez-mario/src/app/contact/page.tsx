import type { Metadata } from "next";
import { fullAddress, mapsLink, site } from "@/content/site";
import { HoursTable, OpenBadge } from "@/components/Hours";
import { MapEmbed } from "@/components/MapEmbed";
import { Socials, deliveryLinks, socialLinks } from "@/components/Socials";
import { Cloud } from "@/components/Deco";
import { PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Infos & contact — adresse, horaires, téléphone",
  description: `Chez Mario, ${fullAddress()}. Téléphone ${site.phone.display}, horaires, plan d'accès et stationnement.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const delivery = deliveryLinks();
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-ink bg-gradient-to-b from-sky to-sky-light pb-10 pt-28 md:pt-36">
        <Cloud className="absolute left-[6%] top-24 w-24 md:w-36" />
        <Cloud className="absolute right-[8%] top-32 w-20 md:w-28" />
        <div className="container-x relative">
          <p className="eyebrow mb-4">Infos pratiques</p>
          <h1 className="display outlined text-[clamp(3.2rem,13vw,7rem)] text-white">
            Venir <span className="text-coin">chez Mario</span>
          </h1>
          <OpenBadge className="mt-6" />
        </div>
      </section>

      <div className="container-x grid gap-6 py-12 lg:grid-cols-[1fr_1.15fr] md:py-16">
        <div className="grid content-start gap-6">
          <div className="card p-6">
            <h2 className="mb-3 flex items-center gap-2 font-display text-xl uppercase text-mario-dark"><PinIcon className="h-5 w-5" /> Adresse</h2>
            <address className="text-xl font-bold not-italic">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-blue mt-5">Itinéraire</a>
          </div>
          <div className="card p-6">
            <h2 className="mb-3 flex items-center gap-2 font-display text-xl uppercase text-mario-dark"><PhoneIcon className="h-5 w-5" /> Téléphone</h2>
            <a href={`tel:${site.phone.tel}`} className="font-display text-4xl hover:text-royal md:text-5xl">{site.phone.display}</a>
          </div>
          <div className="card p-6">
            <h2 className="mb-3 font-display text-2xl uppercase">Horaires</h2>
            <HoursTable />
          </div>
          {(site.access.parking || site.access.transport) && (
            <div className="card p-6">
              <h2 className="mb-3 font-display text-xl uppercase text-mario-dark">Accès & stationnement</h2>
              {site.access.parking && <p className="font-semibold text-ink-soft">{site.access.parking}</p>}
              {site.access.transport && <p className="mt-2 font-semibold text-ink-soft">{site.access.transport}</p>}
            </div>
          )}
          <div className="card p-6">
            <h2 className="mb-3 font-display text-xl uppercase text-mario-dark">Réseaux & livraison</h2>
            <Socials className="text-ink" />
            {!socialLinks().length && <p><span className="todo">Liens réseaux sociaux à compléter</span></p>}
            {delivery.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3">
                {delivery.map((d) => (
                  <li key={d.label}><a href={d.href} target="_blank" rel="noopener noreferrer" className="btn btn-white h-11">{d.label}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <MapEmbed className="min-h-[420px] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]" />
      </div>
    </>
  );
}
