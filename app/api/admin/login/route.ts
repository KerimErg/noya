import { ADMIN_COOKIE, checkPassword, createSessionToken, sessionCookieOptions } from "@/lib/admin-auth";
import { clientIp, json, rateLimited } from "@/lib/http";

export async function POST(req: Request) {
  if (rateLimited(`login:${clientIp(req)}`, 10, 15 * 60_000)) return json({ error: "rate_limited" }, 429);
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!process.env.ADMIN_PASSWORD) return json({ error: "not_configured" }, 503);
  if (!password || !checkPassword(password)) return json({ error: "unauthorized" }, 401);
  const res = json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions);
  return res;
}
