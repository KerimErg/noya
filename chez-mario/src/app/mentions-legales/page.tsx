import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { TODO, fullAddress, site } from "@/content/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" }, robots: { index: false } };

const V = ({ v }: { v: string }) => (v === TODO ? <span className="todo">{TODO}</span> : <>{v}</>);

export default function MentionsLegales() {
  const l = site.legal;
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          <V v={l.company} /> — <V v={l.legalForm} /> au capital de <V v={l.capital} />
          <br />
          Enseigne : Chez Mario
          <br />
          Siège : {fullAddress()}
          <br />
          SIRET : <V v={l.siret} /> — RCS : <V v={l.rcs} />
          <br />
          N° TVA intracommunautaire : <V v={l.vat} />
          <br />
          Téléphone : <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a> — E-mail : <V v={l.email} />
          <br />
          Directeur de la publication : <V v={l.publisher} />
        </p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis —{" "}
          <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">cloudflare.com</a>
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, photographies, illustrations (dont la mascotte) et la mise en page de ce site sont la propriété de l&apos;éditeur ou utilisés avec
          autorisation. Toute reproduction sans accord écrit est interdite.
        </p>
      </section>
      <section>
        <h2>Prix et informations</h2>
        <p>Les prix affichés sont indicatifs, en euros TTC, et peuvent évoluer. Seuls les prix affichés en restaurant font foi. Photos non contractuelles.</p>
      </section>
      <section>
        <h2>Alcool</h2>
        <p>L&apos;abus d&apos;alcool est dangereux pour la santé, à consommer avec modération. Vente d&apos;alcool interdite aux mineurs.</p>
      </section>
    </LegalPage>
  );
}
