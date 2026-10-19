import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { TODO, fullAddress, site } from "@/content/site";
import { CallLink } from "@/components/CallLink";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" }, robots: { index: false } };

const V = ({ v }: { v: string }) => (v === TODO ? <span className="todo">{TODO}</span> : <>{v}</>);

/** Mentions obligatoires — loi n° 2004-575 du 21 juin 2004 (LCEN), art. 6-III, et Code de la consommation. */
export default function MentionsLegales() {
  const l = site.legal;
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Raison sociale : <V v={l.company} /> — <V v={l.legalForm} /> au capital de <V v={l.capital} />
          <br />
          Nom commercial : Chez Mario
          <br />
          Siège social : {fullAddress()}
          <br />
          SIRET : <V v={l.siret} /> — RCS : <V v={l.rcs} />
          <br />
          N° de TVA intracommunautaire : <V v={l.vat} />
          <br />
          Téléphone : <CallLink>{site.phone.display}</CallLink>
          <br />
          E-mail : {l.email === TODO ? <V v={l.email} /> : <a href={`mailto:${l.email}`}>{l.email}</a>}
        </p>
        <p>
          Directeur de la publication : <V v={l.publisher} />
        </p>
      </section>

      <section>
        <h2>Hébergeur</h2>
        <p>
          Cloudflare, Inc. (service Cloudflare Pages)
          <br />
          101 Townsend Street, San Francisco, CA 94107, États-Unis
          <br />
          Téléphone : +1 (888) 993-5273 —{" "}
          <a href="https://www.cloudflare.com/fr-fr/" target="_blank" rel="noopener noreferrer">cloudflare.com</a>
        </p>
      </section>

      <section>
        <h2>Médiation de la consommation</h2>
        <p>
          Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige non résolu avec l&apos;établissement, vous pouvez
          recourir gratuitement au médiateur de la consommation suivant : <V v={l.mediator.name} />
          {l.mediator.url !== TODO ? (
            <>
              {" "}— <a href={l.mediator.url} target="_blank" rel="noopener noreferrer">{l.mediator.url}</a>
            </>
          ) : (
            <> (<V v={l.mediator.url} />)</>
          )}
          .
        </p>
      </section>

      <section>
        <h2>Prix et informations</h2>
        <p>
          Les prix indiqués sur ce site sont des prix nets, en euros toutes taxes comprises, service compris. Ils sont donnés à titre indicatif et
          peuvent évoluer : seuls les prix affichés dans l&apos;établissement font foi. Les photographies et illustrations des plats sont non
          contractuelles.
        </p>
        <p>
          Allergènes : la liste des allergènes présents dans chaque plat (règlement UE n° 1169/2011) est consultable par écrit au comptoir. Origine
          des viandes : {l.meatOrigin === TODO ? <V v={l.meatOrigin} /> : l.meatOrigin}.
        </p>
      </section>

      <section>
        <h2>Alcool</h2>
        <p>
          L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération. La vente d&apos;alcool aux mineurs de moins de 18 ans est
          interdite (art. L.3342-1 du Code de la santé publique).
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          La structure du site, ses textes, le logo Chez Mario et la mise en page sont la propriété de l&apos;éditeur. Toute reproduction sans
          autorisation écrite est interdite. Les marques et personnages de tiers éventuellement visibles sur le site restent la propriété de leurs
          détenteurs respectifs.
        </p>
      </section>

      <section>
        <h2>Données personnelles et cookies</h2>
        <p>
          Ce site ne dépose aucun cookie de mesure d&apos;audience ou publicitaire et ne collecte aucune donnée via un formulaire. Pour en savoir plus,
          consultez la <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>

      <section>
        <h2>Droit applicable</h2>
        <p>Le présent site et ses mentions légales sont soumis au droit français.</p>
      </section>
    </LegalPage>
  );
}
