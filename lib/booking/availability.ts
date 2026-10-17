import type { BookingConfig, SpaceId, SpacePreference } from "../../config/booking.ts";
import type { DayAvailability, Reservation, Slot } from "./types.ts";
import { addDays, daysInMonth, formatHM, nowInZone, parseHM, parseISODate, toISODate, weekday, zonedToUtc } from "./time.ts";

export interface AvailabilityContext {
  config: BookingConfig;
  /** Réservations non annulées concernées (au moins celles des dates demandées). */
  reservations: Pick<Reservation, "date" | "minutes" | "tables" | "space" | "status">[];
  /** Dates bloquées depuis le back-office. */
  blockedDates: string[];
  now?: Date;
}

const SPACES: SpaceId[] = ["interieur", "terrasse"];

/** Fenêtre d'ouverture du service (minutes depuis minuit, close peut dépasser 1440). */
export function serviceWindow(date: string, ctx: AvailabilityContext): { open: number; close: number } | null {
  const { config, blockedDates } = ctx;
  if (config.closedDates.includes(date) || blockedDates.includes(date)) return null;
  const day = config.weeklySchedule[weekday(date)];
  if (!day) return null;
  const open = parseHM(day.open);
  let close = parseHM(day.close);
  if (close <= open) close += 1440;
  return { open, close };
}

export function spaceCapacity(space: SpaceId, date: string, config: BookingConfig): number {
  if (space === "terrasse" && !config.terraceMonths.includes(parseISODate(date).m)) return 0;
  return config.spaces[space].tables;
}

function spacesFor(pref: SpacePreference): SpaceId[] {
  return pref === "any" ? SPACES : [pref];
}

/** Tables libres dans un espace sur toute la durée [start, start + durée). */
export function remainingTables(date: string, start: number, space: SpaceId, ctx: AvailabilityContext): number {
  const { config } = ctx;
  const dur = config.tableDurationMinutes;
  const end = start + dur;
  const relevant = ctx.reservations.filter(
    (r) => r.status !== "cancelled" && r.date === date && r.space === space && r.minutes < end && r.minutes + dur > start,
  );
  // Occupation maximale : elle ne peut changer qu'au début d'une réservation.
  const checkpoints = [start, ...relevant.map((r) => r.minutes).filter((m) => m > start)];
  let peak = 0;
  for (const x of checkpoints) {
    const used = relevant.reduce((sum, r) => (r.minutes <= x && x < r.minutes + dur ? sum + r.tables : sum), 0);
    peak = Math.max(peak, used);
  }
  return Math.max(0, spaceCapacity(space, date, config) - peak);
}

function groupFor(minutes: number, config: BookingConfig): Slot["group"] {
  for (const [name, [from, to]] of Object.entries(config.slotGroups) as [Slot["group"], [number, number]][]) {
    if (minutes >= from && minutes < to) return name;
  }
  return "night";
}

export function isSlotInPast(date: string, minutes: number, ctx: AvailabilityContext): boolean {
  const now = ctx.now ?? new Date();
  const at = zonedToUtc(date, minutes, ctx.config.timeZone).getTime();
  return at < now.getTime() + ctx.config.minLeadMinutes * 60_000;
}

export function todayServiceDate(ctx: AvailabilityContext): string {
  return nowInZone(ctx.config.timeZone, ctx.now).date;
}

export function isBeyondHorizon(date: string, ctx: AvailabilityContext): boolean {
  return date > addDays(todayServiceDate(ctx), ctx.config.horizonDays);
}

/** Créneaux d'une date. Les créneaux passés ne sont pas renvoyés. */
export function getSlots(date: string, partySize: number, pref: SpacePreference, ctx: AvailabilityContext): Slot[] {
  const { config } = ctx;
  const win = serviceWindow(date, ctx);
  if (!win || isBeyondHorizon(date, ctx)) return [];
  const need = config.tablesForParty(partySize);
  const lastStart = win.close - config.lastSeatingBeforeCloseMinutes;
  const slots: Slot[] = [];
  for (let t = win.open; t <= lastStart; t += config.slotMinutes) {
    if (isSlotInPast(date, t, ctx)) continue;
    const fitting = spacesFor(pref)
      .map((s) => remainingTables(date, t, s, ctx))
      .filter((rem) => rem >= need);
    const remaining = fitting.reduce((a, b) => a + b, 0);
    slots.push({
      time: formatHM(t),
      minutes: t,
      group: groupFor(t, config),
      remaining,
      state: fitting.length === 0 ? "full" : remaining <= config.lowAvailabilityThreshold ? "low" : "available",
    });
  }
  return slots;
}

export function getDayState(date: string, partySize: number, pref: SpacePreference, ctx: AvailabilityContext): DayAvailability["state"] {
  const today = todayServiceDate(ctx);
  if (date < today) return "past";
  if (!serviceWindow(date, ctx) || isBeyondHorizon(date, ctx)) return "closed";
  if (pref === "terrasse" && spaceCapacity("terrasse", date, ctx.config) === 0) return "closed";
  const slots = getSlots(date, partySize, pref, ctx);
  if (slots.length === 0) return date === today ? "past" : "full";
  return slots.some((s) => s.state !== "full") ? "available" : "full";
}

export function getMonthAvailability(year: number, month: number, partySize: number, pref: SpacePreference, ctx: AvailabilityContext): DayAvailability[] {
  const out: DayAvailability[] = [];
  for (let d = 1; d <= daysInMonth(year, month); d++) {
    const date = toISODate(year, month, d);
    out.push({ date, state: getDayState(date, partySize, pref, ctx) });
  }
  return out;
}

/** Choisit l'espace pour une réservation (le plus libre si « peu importe »), ou null si impossible. */
export function pickSpace(date: string, minutes: number, partySize: number, pref: SpacePreference, ctx: AvailabilityContext): SpaceId | null {
  const win = serviceWindow(date, ctx);
  if (!win || isBeyondHorizon(date, ctx) || isSlotInPast(date, minutes, ctx)) return null;
  if (minutes < win.open || minutes > win.close - ctx.config.lastSeatingBeforeCloseMinutes) return null;
  if ((minutes - win.open) % ctx.config.slotMinutes !== 0) return null;
  const need = ctx.config.tablesForParty(partySize);
  const best = spacesFor(pref)
    .map((s) => ({ s, rem: remainingTables(date, minutes, s, ctx) }))
    .filter((x) => x.rem >= need)
    .sort((a, b) => b.rem - a.rem)[0];
  return best?.s ?? null;
}

/** Convertit "HH:mm" en minutes de service (après minuit → +1440 si avant l'ouverture). */
export function timeToServiceMinutes(date: string, time: string, ctx: AvailabilityContext): number | null {
  const win = serviceWindow(date, ctx);
  if (!win || !/^\d{2}:\d{2}$/.test(time)) return null;
  let m = parseHM(time);
  if (m < win.open) m += 1440;
  return m;
}
