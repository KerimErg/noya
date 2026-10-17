import { isAdmin } from "@/lib/admin-auth";
import { getStore } from "@/lib/booking/store";
import { json } from "@/lib/http";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return json({ error: "unauthorized" }, 401);
  const { id } = await params;
  const { status } = (await req.json().catch(() => ({}))) as { status?: string };
  if (status !== "confirmed" && status !== "cancelled" && status !== "pending") return json({ error: "invalid" }, 400);
  const updated = await getStore().updateStatus(id, status);
  return updated ? json({ reservation: updated }) : json({ error: "not_found" }, 404);
}
