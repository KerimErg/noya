import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { TODO, site } from "@/content/site";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" }, robots: { index: false } };

/** Informations RGPD (règlement UE 2016/679, art. 13) et loi Informatique et Libertés. */
export default function Confidentialite() {
  const l = site.legal;
  const email = l.email === TODO ? <span className="todo">e-mail à compléter</span> : <a href={`mailto:${l.email}`}>{l.email}</a>;
  const osm = !!site.geo;
  return (
    <LegalPage title="Confidentialité">
      <p className="text-sm">Dernière mise à jour : octobre 2026.</p>

      <section>
        <h2>En bref</h2>
        <p>
          Ce site est une vitrine : <strong>pas de compte, pas de formulaire, pas de commande en ligne, pas de mesure d&apos;audience ni de publicité.</strong>{" "}
          Nous ne collectons aucune donnée vous concernant et le site lui-même ne dépose aucun cookie.
        </p>
      </section>

      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {l.company === TODO ? <span className="todo">Raison sociale à compléter</span> : l.company} (Chez Mario), {site.address.street},{" "}
          {site.address.postalCode} {site.address.city}. Contact : {email}. Voir aussi les <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </section>

      <section>
        <h2>Hébergement et journaux techniques</h2>
        <ul>
          <li>Données : adresse IP, date et heure, page demandée, type de navigateur.</li>
          <li>Finalité : afficher le site et le protéger contre les attaques et abus.</li>
          <li>Base légale : intérêt légitime (art. 6.1.f du RGPD).</li>
          <li>Destinataire : notre hébergeur Cloudflare, Inc. Ces données peuvent être traitées aux États-Unis ; Cloudflare est certifié au cadre de protection des données UE–États-Unis (Data Privacy Framework).</li>
          <li>Durée : celle fixée par l&apos;hébergeur pour ses journaux de sécurité ; nous n&apos;y avons pas accès à des fins commerciales.</li>
        </ul>
      </section>

      <section>
        <h2>Plan d&apos;accès</h2>
        {osm ? (
          <p>
            Le plan est fourni par OpenStreetMap (OpenStreetMap Foundation, Royaume-Uni). Son affichage transmet votre adresse IP à ce service, sans
            cookie publicitaire. Voir sa{" "}
            <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>.
          </p>
        ) : (
          <p>
            Le plan est fourni par Google Maps (Google Ireland Ltd). Son affichage transmet votre adresse IP et des informations de navigation à
            Google, qui peut déposer ses propres cookies selon sa{" "}
            <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>. Vous
            pouvez bloquer ces cookies depuis les réglages de votre navigateur.
          </p>
        )}
      </section>

      <section>
        <h2>Appels et liens externes</h2>
        <p>
          Le bouton « Appeler » ouvre simplement l&apos;application téléphone de votre appareil : aucune donnée ne transite par ce site. Les liens vers
          les réseaux sociaux, les plateformes de livraison ou Google Maps ouvrent des sites tiers soumis à leurs propres règles.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de limitation sur les données vous
          concernant. Pour les exercer, écrivez-nous ({email}). Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une
          réclamation à la CNIL :{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">cnil.fr/fr/plaintes</a>.
        </p>
      </section>
    </LegalPage>
  );
}
