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

const fmtRanges = (r: { open: string; close: string }[]) => r.map((x) => `${formatTime(x.open)} – ${formatTime(x.close)}`).join(" · ");

/** Résumé court : les horaires les plus fréquents + les exceptions (ex. « Fermé le mardi »). */
export function hoursSummary(hours: Hours): string[] {
  const keyOf = (d: Day) => JSON.stringify(hours[d]);
  const counts = new Map<string, number>();
  DAYS.forEach((d) => hours[d].length && counts.set(keyOf(d), (counts.get(keyOf(d)) ?? 0) + 1));
  const common = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const lines: string[] = [];
  if (common) lines.push(fmtRanges(JSON.parse(common)));
  DAYS.forEach((d) => {
    if (!hours[d].length) lines.push(`Fermé le ${d}`);
    else if (keyOf(d) !== common) lines.push(`${d[0].toUpperCase()}${d.slice(1)} : ${fmtRanges(hours[d])}`);
  });
  return lines;
}
