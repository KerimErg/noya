import { bookingConfig } from "../config/booking.ts";
import { addDays, formatHM, nowInZone, parseHM, weekday } from "./booking/time.ts";

export type OpenStatus =
  | { state: "open"; until: string }
  | { state: "later"; opensAt: string; until: string }
  | { state: "closed" };

function windowOf(date: string) {
  if (bookingConfig.closedDates.includes(date)) return null;
  const d = bookingConfig.weeklySchedule[weekday(date)];
  if (!d) return null;
  const open = parseHM(d.open);
  let close = parseHM(d.close);
  if (close <= open) close += 1440;
  return { open, close };
}

/** État d'ouverture « maintenant » à Kehl, calculé depuis config/booking.ts. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const { date, minutes } = nowInZone(bookingConfig.timeZone, now);
  const yesterday = windowOf(addDays(date, -1));
  if (yesterday && minutes + 1440 < yesterday.close) return { state: "open", until: formatHM(yesterday.close) };
  const today = windowOf(date);
  if (today) {
    if (minutes < today.open) return { state: "later", opensAt: formatHM(today.open), until: formatHM(today.close) };
    if (minutes < today.close) return { state: "open", until: formatHM(today.close) };
  }
  return { state: "closed" };
}

/** Horaires de la semaine, lundi en premier : [weekdayIndex, "17:00 – 01:00" | null]. */
export function weeklyHours(): { day: number; open: string; close: string }[] {
  return [1, 2, 3, 4, 5, 6, 0].flatMap((day) => {
    const d = bookingConfig.weeklySchedule[day];
    return d ? [{ day, ...d }] : [{ day, open: "", close: "" }];
  });
}

export function todayWeekday(now: Date = new Date()): number {
  return weekday(nowInZone(bookingConfig.timeZone, now).date);
}
