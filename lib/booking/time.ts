/** Utilitaires de dates « calendaires » (YYYY-MM-DD) indépendants du fuseau du serveur. */

export function parseHM(hm: string): number {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

export function formatHM(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export function toISODate(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function parseISODate(date: string): { y: number; m: number; d: number } {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d };
}

export function isValidISODate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const { y, m, d } = parseISODate(date);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function addDays(date: string, days: number): string {
  const { y, m, d } = parseISODate(date);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return toISODate(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/** 0 = dimanche … 6 = samedi */
export function weekday(date: string): number {
  const { y, m, d } = parseISODate(date);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Date et minutes courantes dans un fuseau donné. */
export function nowInZone(timeZone: string, now: Date = new Date()): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { date: toISODate(get("year"), get("month"), get("day")), minutes: get("hour") * 60 + get("minute") };
}

/** Convertit une date de service + minutes (heure locale du fuseau) en instant UTC. */
export function zonedToUtc(date: string, minutes: number, timeZone: string): Date {
  const { y, m, d } = parseISODate(date);
  const guess = Date.UTC(y, m - 1, d, 0, minutes);
  // Décalage du fuseau à cet instant (2 passes pour gérer les changements d'heure).
  let ts = guess;
  for (let i = 0; i < 2; i++) {
    const local = nowInZone(timeZone, new Date(ts));
    const { y: ly, m: lm, d: ld } = parseISODate(local.date);
    const asUtc = Date.UTC(ly, lm - 1, ld, 0, local.minutes);
    ts = guess - (asUtc - ts);
  }
  return new Date(ts);
}
