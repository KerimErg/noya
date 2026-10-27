import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function MentionsLegales() {
  const { legal } = site;
  return (
    <section className="container-x pb-28 pt-40 md:pt-48">
      <h1 data-split className="display text-[clamp(3rem,8vw,8rem)]">
        Mentions <span className="serif">légales</span>
      </h1>
      <div data-reveal className="mt-16 grid max-w-3xl gap-10 text-lg leading-relaxed text-stone-dark">
        <div>
          <h2 className="label text-ink">Éditeur</h2>
          <p className="mt-3">
            {legal.company} — {site.address.street}, {site.address.zip} {site.address.city}
            <br />
            SIRET : {legal.siret} — Directeur de la publication : {legal.director}
            <br />
            {site.phone} — {site.email}
          </p>
        </div>
        <div>
          <h2 className="label text-ink">Assurance</h2>
          <p className="mt-3">{legal.insurance}</p>
        </div>
        <div>
          <h2 className="label text-ink">Hébergement</h2>
          <p className="mt-3">{legal.host}</p>
        </div>
        <div>
          <h2 className="label text-ink">Données personnelles</h2>
          <p className="mt-3">
            Ce site ne dépose aucun cookie et ne collecte aucune donnée : le formulaire de contact ouvre simplement votre messagerie. Les informations que vous nous envoyez par e-mail servent uniquement à répondre à votre demande. Pour toute question : {site.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
