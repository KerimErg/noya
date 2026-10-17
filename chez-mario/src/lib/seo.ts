import { menu } from "@/content/menu";
import { DAYS } from "@/lib/hours";
import { fullAddress, mapsLink, site } from "@/content/site";

const SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Données structurées schema.org Restaurant (adresse, téléphone, horaires, carte). */
export function restaurantJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    telephone: site.phone.tel,
    servesCuisine: ["Kebab", "Turque", "Burgers", "Tacos", "Street food"],
    priceRange: "€",
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: "Grand Est",
      addressCountry: site.address.country,
    },
    hasMap: mapsLink(),
    hasMenu: {
      "@type": "Menu",
      url: `${site.url}/carte`,
      inLanguage: "fr",
      hasMenuSection: menu.map((c) => ({
        "@type": "MenuSection",
        name: c.title,
        hasMenuItem: c.items.map((i) => ({
          "@type": "MenuItem",
          name: i.name,
          ...(i.description ? { description: i.description } : {}),
          ...(i.price !== null ? { offers: { "@type": "Offer", price: i.price.toFixed(2), priceCurrency: "EUR" } } : {}),
        })),
      })),
    },
  };
  if (site.geo) data.geo = { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.hours) {
    data.openingHoursSpecification = DAYS.flatMap((d, i) =>
      site.hours![d].map((r) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${SCHEMA_DAYS[i]}`, opens: r.open, closes: r.close })),
    );
  }
  const sameAs = [site.social.instagram, site.social.facebook, site.social.tiktok, site.googleMapsUrl].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export const seoDescription = `Chez Mario, kebab à Erstein : kebab bœuf ou poulet, yufka, lahmacun, assiettes, burgers et tacos. ${fullAddress()}. Appelez le ${site.phone.display}.`;
