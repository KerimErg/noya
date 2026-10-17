import "server-only";
import type { Reservation } from "./booking/types";
import { addressLine, mapsUrl } from "./content";

const T = {
  fr: {
    subject: (r: Reservation) => `Votre table chez NOYA — ${formatDate(r, "fr")} à ${r.time}`,
    pendingSubject: (r: Reservation) => `Demande reçue — NOYA, ${formatDate(r, "fr")} à ${r.time}`,
    hello: (r: Reservation) => `Bonsoir ${r.firstName},`,
    confirmed: "Votre table est réservée. Nous avons hâte de vous accueillir.",
    pending: "Nous avons bien reçu votre demande. Nous la confirmons très vite.",
    guests: (n: number) => `${n} ${n > 1 ? "personnes" : "personne"}`,
    space: { interieur: "Intérieur", terrasse: "Terrasse" },
    map: "Itinéraire",
    ref: "Réf.",
    footer: "Un empêchement ? Prévenez-nous sur Instagram @noyakehl. La chicha est réservée aux personnes majeures.",
  },
  de: {
    subject: (r: Reservation) => `Ihr Tisch im NOYA — ${formatDate(r, "de")} um ${r.time}`,
    pendingSubject: (r: Reservation) => `Anfrage erhalten — NOYA, ${formatDate(r, "de")} um ${r.time}`,
    hello: (r: Reservation) => `Guten Abend ${r.firstName},`,
    confirmed: "Ihr Tisch ist reserviert. Wir freuen uns auf Sie.",
    pending: "Wir haben Ihre Anfrage erhalten und bestätigen sie in Kürze.",
    guests: (n: number) => `${n} ${n > 1 ? "Personen" : "Person"}`,
    space: { interieur: "Innen", terrasse: "Terrasse" },
    map: "Route",
    ref: "Ref.",
    footer: "Verhindert? Schreiben Sie uns auf Instagram @noyakehl. Shisha nur ab 18 Jahren.",
  },
};

function formatDate(r: Reservation, locale: "fr" | "de") {
  const [y, m, d] = r.date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function customerHtml(r: Reservation) {
  const t = T[r.locale];
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 0;color:#A89A8C;font-size:13px">${k}</td><td style="padding:6px 0;color:#F3EBE1;text-align:right">${esc(v)}</td></tr>`;
  return `<!doctype html><html><body style="margin:0;background:#0E0B09;font-family:Helvetica,Arial,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;color:#F3EBE1">
    <p style="letter-spacing:.3em;color:#C9A27A;font-size:12px;margin:0 0 32px">NOYA · KEHL</p>
    <p style="font-family:Georgia,serif;font-size:26px;margin:0 0 12px">${esc(t.hello(r))}</p>
    <p style="color:#A89A8C;line-height:1.6">${r.status === "confirmed" ? t.confirmed : t.pending}</p>
    <table style="width:100%;margin:28px 0;border-top:1px solid #2a221d;border-bottom:1px solid #2a221d;padding:12px 0">
      ${row(formatDate(r, r.locale), r.time)}
      ${row("", t.guests(r.partySize))}
      ${row("", t.space[r.space])}
      ${row(t.ref, r.id)}
    </table>
    <p style="color:#A89A8C">${esc(addressLine())}<br><a style="color:#C9A27A" href="${mapsUrl()}">${t.map} →</a></p>
    <p style="color:#6d6158;font-size:12px;margin-top:40px">${t.footer}</p>
  </div></body></html>`;
}

function loungeText(r: Reservation) {
  return [
    `Nouvelle réservation ${r.id} (${r.status})`,
    `${r.date} à ${r.time} — ${r.partySize} pers. — ${r.space} (préférence : ${r.spacePreference})`,
    `${r.firstName} ${r.lastName} — ${r.phone} — ${r.email}`,
    r.occasion ? `Occasion : ${r.occasion}` : "",
    r.shisha ? `Chicha : ${r.shisha}` : "",
    r.notes ? `Note : ${r.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function send(to: string, subject: string, body: { html?: string; text?: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "NOYA Kehl <onboarding@resend.dev>";
  if (!key) {
    console.info(`[email:dev] → ${to} | ${subject}\n${body.text ?? "(html)"}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, ...body }),
  });
  if (!res.ok) console.error(`[email] Resend ${res.status}: ${await res.text()}`);
}

/** Envoie la confirmation au client et la notification au lounge. N'échoue jamais. */
export async function sendReservationEmails(r: Reservation) {
  const t = T[r.locale];
  const jobs = [send(r.email, r.status === "confirmed" ? t.subject(r) : t.pendingSubject(r), { html: customerHtml(r) })];
  if (process.env.EMAIL_LOUNGE) jobs.push(send(process.env.EMAIL_LOUNGE, `Réservation ${r.date} ${r.time} — ${r.lastName} (${r.partySize})`, { text: loungeText(r) }));
  await Promise.allSettled(jobs);
}
