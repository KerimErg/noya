import { isAdmin } from "@/lib/admin-auth";
import { getStore } from "@/lib/booking/store";
import { isValidISODate } from "@/lib/booking/time";
import { json } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isAdmin())) return json({ error: "unauthorized" }, 401);
  const date = new URL(req.url).searchParams.get("date") ?? "";
  if (!isValidISODate(date)) return json({ error: "invalid" }, 400);
  const store = getStore();
  const [reservations, blockedDates] = await Promise.all([store.listByDateRange(date, date), store.listBlockedDates()]);
  reservations.sort((a, b) => a.minutes - b.minutes);
  return json({ reservations, blocked: blockedDates.includes(date), blockedDates });
}
