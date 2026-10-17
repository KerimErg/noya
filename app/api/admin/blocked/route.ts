import { isAdmin } from "@/lib/admin-auth";
import { getStore } from "@/lib/booking/store";
import { isValidISODate } from "@/lib/booking/time";
import { json } from "@/lib/http";

export async function POST(req: Request) {
  if (!(await isAdmin())) return json({ error: "unauthorized" }, 401);
  const { date, blocked } = (await req.json().catch(() => ({}))) as { date?: string; blocked?: boolean };
  if (!date || !isValidISODate(date) || typeof blocked !== "boolean") return json({ error: "invalid" }, 400);
  await getStore().setBlocked(date, blocked);
  return json({ ok: true });
}
