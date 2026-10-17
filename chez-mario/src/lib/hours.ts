import type { Day, Hours } from "@/content/site";

export const DAYS: Day[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

const toMin = (hm: string) => {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
};

/** Jour (lundi = 0) et minutes actuels à Erstein, quel que soit le fuseau du visiteur. */
export function nowInParis(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenState = { open: true; until: string } | { open: false; next: { day: Day; time: string } | null };

/** Ouvert maintenant ? Gère les fermetures après minuit. */
export function openState(hours: Hours, now = new Date()): OpenState {
  const { day, minutes } = nowInParis(now);
  // Plage de la veille qui déborde après minuit
  for (const r of hours[DAYS[(day + 6) % 7]]) {
    const o = toMin(r.open);
    const c = toMin(r.close);
    if (c <= o && minutes < c) return { open: true, until: r.close };
  }
  for (const r of hours[DAYS[day]]) {
    const o = toMin(r.open);
    let c = toMin(r.close);
    if (c <= o) c += 1440;
    if (minutes >= o && minutes < c) return { open: true, until: r.close };
  }
  // Prochaine ouverture
  for (let i = 0; i < 8; i++) {
    const d = DAYS[(day + i) % 7];
    const next = hours[d].map((r) => r.open).sort().find((o) => i > 0 || toMin(o) > minutes);
    if (next) return { open: false, next: { day: d, time: next } };
  }
  return { open: false, next: null };
}

export const formatTime = (hm: string) => hm.replace(":", "h");
