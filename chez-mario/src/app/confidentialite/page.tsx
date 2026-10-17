import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { TODO, site } from "@/content/site";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" }, robots: { index: false } };

export default function Confidentialite() {
  const email = site.legal.email === TODO ? <span className="todo">e-mail à compléter</span> : <a href={`mailto:${site.legal.email}`}>{site.legal.email}</a>;
  return (
    <LegalPage title="Confidentialité">
      <section>
        <h2>En bref</h2>
        <p>
          Ce site est une simple vitrine : <strong>pas de compte, pas de formulaire, pas de commande en ligne, pas de cookie publicitaire ni de mesure
          d&apos;audience.</strong> C&apos;est pourquoi aucun bandeau cookies ne s&apos;affiche.
        </p>
      </section>
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {site.legal.company === TODO ? <span className="todo">Raison sociale à compléter</span> : site.legal.company} (Chez Mario) — voir les{" "}
          <Link href="/mentions-legales">mentions légales</Link>. Contact : {email}.
        </p>
      </section>
      <section>
        <h2>Données techniques d&apos;hébergement</h2>
        <p>
          Comme tout site, notre hébergeur Cloudflare traite des données techniques (adresse IP, type de navigateur, pages demandées) pour afficher le site
          et le protéger contre les attaques. Ces données ne sont pas utilisées par nous à des fins commerciales. Base légale : intérêt légitime (sécurité et
          bon fonctionnement du site).
        </p>
      </section>
      <section>
        <h2>Plan Google Maps</h2>
        <p>
          Le plan n&apos;est chargé que si vous cliquez sur « Afficher le plan ». Google reçoit alors des données de connexion et peut déposer ses propres
          cookies, selon sa{" "}
          <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>. Sans clic, aucune
          donnée n&apos;est transmise à Google.
        </p>
      </section>
      <section>
        <h2>Liens externes</h2>
        <p>Les liens vers les réseaux sociaux ou les plateformes de livraison ouvrent leurs propres sites, soumis à leurs propres règles.</p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en nous écrivant ({email}). Vous pouvez aussi saisir la CNIL :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>.
        </p>
      </section>
    </LegalPage>
  );
}
