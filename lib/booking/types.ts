import type { SpaceId, SpacePreference } from "../../config/booking.ts";

export type { SpaceId, SpacePreference };

export type ReservationStatus = "pending" | "confirmed" | "cancelled";
export type Occasion = "birthday" | "date" | "friends" | "business" | "other";
export type ShishaChoice = "chosen" | "advice" | "none";

export interface Reservation {
  id: string;
  createdAt: string;
  status: ReservationStatus;
  /** Date de service (YYYY-MM-DD) — une réservation à 00:30 appartient au service de la veille. */
  date: string;
  /** Heure affichée "HH:mm". */
  time: string;
  /** Minutes depuis le début de la date de service (peut dépasser 1440 après minuit). */
  minutes: number;
  partySize: number;
  tables: number;
  space: SpaceId;
  spacePreference: SpacePreference;
  occasion?: Occasion | null;
  shisha?: ShishaChoice | null;
  notes?: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  locale: "fr" | "de";
}

export type SlotState = "available" | "low" | "full";

export interface Slot {
  time: string;
  minutes: number;
  group: "afternoon" | "evening" | "night";
  state: SlotState;
  /** Tables restantes pour la préférence d'espace demandée. */
  remaining: number;
}

export type DayState = "past" | "closed" | "full" | "available";

export interface DayAvailability {
  date: string;
  state: DayState;
}
