import { services, site } from "@/content/site";

export const seoTitle = `${site.name} — Peinture & décoration haut de gamme à ${site.city}`;
export const seoDescription = `${site.tagline} à ${site.city} depuis ${site.since} : peinture intérieure, enduits et béton ciré, façades, laques et conseil couleur. Devis gratuit.`;

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    name: site.name,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    foundingDate: String(site.since),
    areaServed: site.area,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "FR",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  };
}
