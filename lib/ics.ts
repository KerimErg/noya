/** Génère un fichier .ics pour une réservation (heure de Kehl, fuseau Europe/Berlin). */
export function buildICS(opts: {
  uid: string;
  date: string; // date de service YYYY-MM-DD
  minutes: number; // minutes depuis minuit (peut dépasser 1440)
  durationMinutes: number;
  title: string;
  description: string;
  location: string;
}): string {
  const fmt = (date: string, minutes: number) => {
    const [y, m, d] = date.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 0, minutes));
    const p = (n: number) => String(n).padStart(2, "0");
    return `${dt.getUTCFullYear()}${p(dt.getUTCMonth() + 1)}${p(dt.getUTCDate())}T${p(dt.getUTCHours())}${p(dt.getUTCMinutes())}00`;
  };
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NOYA Kehl//Reservation//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.uid}@noyakehl`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Europe/Berlin:${fmt(opts.date, opts.minutes)}`,
    `DTEND;TZID=Europe/Berlin:${fmt(opts.date, opts.minutes + opts.durationMinutes)}`,
    `SUMMARY:${esc(opts.title)}`,
    `DESCRIPTION:${esc(opts.description)}`,
    `LOCATION:${esc(opts.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
