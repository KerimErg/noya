import { after } from "next/server";
import { createReservation } from "@/lib/booking/service";
import { sendReservationEmails } from "@/lib/email";
import { clientIp, json, rateLimited } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (rateLimited(`resa:${clientIp(req)}`, 8, 10 * 60_000)) return json({ error: "rate_limited" }, 429);
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }
  const result = await createReservation(body);
  if (!result.ok) return json({ error: result.error, issues: result.issues }, result.error === "invalid" ? 400 : 409);
  const r = result.reservation;
  after(() => sendReservationEmails(r));
  return json({ reservation: { id: r.id, status: r.status, date: r.date, time: r.time, minutes: r.minutes, partySize: r.partySize, space: r.space } }, 201);
}
