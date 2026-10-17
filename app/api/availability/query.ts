import { bookingConfig, type SpacePreference } from "@/config/booking";

export function parseQuery(url: URL): { party: number; space: SpacePreference } | null {
  const party = Number(url.searchParams.get("party") ?? 2);
  const space = (url.searchParams.get("space") ?? "any") as SpacePreference;
  if (!Number.isInteger(party) || party < 1 || party > bookingConfig.maxPartySize) return null;
  if (!["any", "interieur", "terrasse"].includes(space)) return null;
  return { party, space };
}
