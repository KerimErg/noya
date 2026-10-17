import "server-only";
import { randomBytes } from "node:crypto";
import { bookingConfig, type SpacePreference } from "@/config/booking";
import { getMonthAvailability, getSlots, pickSpace, timeToServiceMinutes, type AvailabilityContext } from "./availability";
import { daysInMonth, isValidISODate, toISODate } from "./time";
import { getStore } from "./store";
import type { Reservation } from "./types";
import { reservationInputSchema } from "./schema";

async function context(from: string, to: string): Promise<AvailabilityContext> {
  const store = getStore();
  const [reservations, blockedDates] = await Promise.all([store.listByDateRange(from, to), store.listBlockedDates()]);
  return { config: bookingConfig, reservations: reservations.filter((r) => r.status !== "cancelled"), blockedDates };
}

export async function monthAvailability(year: number, month: number, partySize: number, pref: SpacePreference) {
  const from = toISODate(year, month, 1);
  const to = toISODate(year, month, daysInMonth(year, month));
  return getMonthAvailability(year, month, partySize, pref, await context(from, to));
}

export async function daySlots(date: string, partySize: number, pref: SpacePreference) {
  return getSlots(date, partySize, pref, await context(date, date));
}

export type CreateResult =
  | { ok: true; reservation: Reservation }
  | { ok: false; error: "invalid" | "unavailable"; issues?: string[] };

function newId() {
  // Référence lisible : NY-XXXXXX (sans 0/O/1/I)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  return `NY-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

export async function createReservation(raw: unknown): Promise<CreateResult> {
  const parsed = reservationInputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "invalid", issues: parsed.error.issues.map((i) => i.path.join(".")) };
  const input = parsed.data;
  if (!isValidISODate(input.date)) return { ok: false, error: "invalid", issues: ["date"] };

  const store = getStore();
  return store.withLock(async () => {
    const ctx = await context(input.date, input.date);
    const minutes = timeToServiceMinutes(input.date, input.time, ctx);
    if (minutes === null) return { ok: false, error: "unavailable" } as const;
    const space = pickSpace(input.date, minutes, input.partySize, input.space, ctx);
    if (!space) return { ok: false, error: "unavailable" } as const;

    const reservation: Reservation = {
      id: newId(),
      createdAt: new Date().toISOString(),
      status: bookingConfig.autoConfirm ? "confirmed" : "pending",
      date: input.date,
      time: input.time,
      minutes,
      partySize: input.partySize,
      tables: bookingConfig.tablesForParty(input.partySize),
      space,
      spacePreference: input.space,
      occasion: input.occasion ?? null,
      shisha: input.shisha ?? null,
      notes: input.notes || null,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: `${input.phonePrefix} ${input.phone}`,
      email: input.email,
      locale: input.locale,
    };
    await store.create(reservation);
    return { ok: true, reservation } as const;
  });
}
