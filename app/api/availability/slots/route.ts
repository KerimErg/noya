import { daySlots } from "@/lib/booking/service";
import { isValidISODate } from "@/lib/booking/time";
import { json } from "@/lib/http";
import { parseQuery } from "../query";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = parseQuery(url);
  const date = url.searchParams.get("date") ?? "";
  if (!q || !isValidISODate(date)) return json({ error: "invalid" }, 400);
  return json({ date, slots: await daySlots(date, q.party, q.space) });
}
