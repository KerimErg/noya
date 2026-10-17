import noya from "@/content/noya.json";
import eventsData from "@/content/events.json";

export const PLACEHOLDER = "[À COMPLÉTER]";
export const isPlaceholder = (v: unknown) => typeof v === "string" && v.includes(PLACEHOLDER);
export const known = (v: string | undefined | null): string | null => (v && !isPlaceholder(v) ? v : null);

export type Locale = "fr" | "de";
export type Localized = { fr: string; de: string };

export const content = noya;
export const events = eventsData.events;

export function addressLine(): string {
  const a = noya.contact.address;
  return [known(a.street), [known(a.postalCode), a.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
}

export function mapsUrl(): string {
  return known(noya.contact.googleMapsUrl) ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`NOYA ${addressLine()}`)}`;
}

export function whatsappUrl(): string | null {
  const n = known(noya.contact.whatsapp);
  return n ? `https://wa.me/${n.replace(/\D/g, "")}` : null;
}
