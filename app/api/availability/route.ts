import { monthAvailability } from "@/lib/booking/service";
import { json } from "@/lib/http";
import { parseQuery } from "./query";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = parseQuery(url);
  const year = Number(url.searchParams.get("year"));
  const month = Number(url.searchParams.get("month"));
  if (!q || !Number.isInteger(year) || year < 2024 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) {
    return json({ error: "invalid" }, 400);
  }
  return json({ days: await monthAvailability(year, month, q.party, q.space) });
}
