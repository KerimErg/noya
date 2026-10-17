import type { Metadata } from "next";
import { fullAddress, mapsLink, site } from "@/content/site";
import { HoursTable, OpenBadge } from "@/components/Hours";
import { MapEmbed } from "@/components/MapEmbed";
import { Socials, deliveryLinks, socialLinks } from "@/components/Socials";
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
      <section className="grain relative overflow-hidden pb-10 pt-32 md:pt-40">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(216,30,26,.32),transparent_70%)]" />
        <div className="container-x relative">
          <p className="eyebrow mb-3">Infos pratiques</p>
          <h1 className="display text-[clamp(3.2rem,13vw,7rem)]">
            Venir <span className="italic text-mario-bright">chez Mario</span>
          </h1>
          <OpenBadge className="mt-6" />
        </div>
      </section>

      <div className="container-x grid gap-4 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-4">
          <div className="card p-6 md:p-8">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-black uppercase text-mario-bright"><PinIcon className="h-4 w-4" /> Adresse</h2>
            <address className="text-xl not-italic">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-5">Itinéraire</a>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-black uppercase text-mario-bright"><PhoneIcon className="h-4 w-4" /> Téléphone</h2>
            <a href={`tel:${site.phone.tel}`} className="display text-4xl hover:text-coin md:text-5xl">{site.phone.display}</a>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="mb-2 font-display text-xl font-black uppercase">Horaires</h2>
            <HoursTable />
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="mb-3 font-display text-sm font-black uppercase text-mario-bright">Accès & stationnement</h2>
            <p className="text-muted">{site.access.parking ?? <span className="todo">Stationnement à compléter</span>}</p>
            {site.access.transport && <p className="mt-2 text-muted">{site.access.transport}</p>}
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="mb-3 font-display text-sm font-black uppercase text-mario-bright">Réseaux & livraison</h2>
            <Socials />
            {!socialLinks().length && <p><span className="todo">Liens réseaux sociaux à compléter</span></p>}
            {delivery.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {delivery.map((d) => (
                  <li key={d.label}><a href={d.href} target="_blank" rel="noopener noreferrer" className="btn btn-line h-11">{d.label}</a></li>
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
