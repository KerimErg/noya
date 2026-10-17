import type { SpacePreference } from "@/config/booking";
import type { Occasion, ShishaChoice } from "@/lib/booking/types";

export const STEPS = ["party", "date", "time", "prefs", "contact", "summary"] as const;
export type StepId = (typeof STEPS)[number];

export interface BookingDraft {
  partySize: number | null;
  space: SpacePreference;
  date: string | null;
  time: string | null;
  occasion: Occasion | null;
  shisha: ShishaChoice | null;
  notes: string;
  firstName: string;
  lastName: string;
  phonePrefix: "+33" | "+49";
  phone: string;
  email: string;
  consent: boolean;
  website: string;
}

export const emptyDraft = (locale: string): BookingDraft => ({
  partySize: null,
  space: "any",
  date: null,
  time: null,
  occasion: null,
  shisha: null,
  notes: "",
  firstName: "",
  lastName: "",
  phonePrefix: locale === "de" ? "+49" : "+33",
  phone: "",
  email: "",
  consent: false,
  website: "",
});

export interface Confirmed {
  id: string;
  status: "pending" | "confirmed";
  date: string;
  time: string;
  minutes: number;
  partySize: number;
  space: "interieur" | "terrasse";
  email: string;
}

export type ContactErrors = Partial<Record<"firstName" | "lastName" | "phone" | "email" | "consent", "required" | "email" | "phone" | "consent">>;

export function validateContact(d: BookingDraft): ContactErrors {
  const e: ContactErrors = {};
  if (!d.firstName.trim()) e.firstName = "required";
  if (!d.lastName.trim()) e.lastName = "required";
  const phone = d.phone.replace(/[\s.\-()]/g, "").replace(/^0/, "");
  if (!phone) e.phone = "required";
  else if (!/^\d{6,12}$/.test(phone)) e.phone = "phone";
  if (!d.email.trim()) e.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "email";
  if (!d.consent) e.consent = "consent";
  return e;
}

/** Formate une date ISO (YYYY-MM-DD) sans dépendre du fuseau du navigateur. */
export function formatDate(iso: string, locale: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "fr-FR", { ...opts, timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}
