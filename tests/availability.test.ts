import { test } from "node:test";
import assert from "node:assert/strict";
import { bookingConfig } from "../config/booking.ts";
import { getDayState, getMonthAvailability, getSlots, pickSpace, remainingTables, timeToServiceMinutes } from "../lib/booking/availability.ts";
import { zonedToUtc, nowInZone, addDays, weekday } from "../lib/booking/time.ts";
import { getOpenStatus } from "../lib/hours.ts";

// Mercredi 14 octobre 2026, 12:00 à Kehl
const now = zonedToUtc("2026-10-14", 12 * 60, "Europe/Berlin");
const base = { config: bookingConfig, reservations: [], blockedDates: [], now };

test("zonedToUtc / nowInZone aller-retour (CEST)", () => {
  assert.deepEqual(nowInZone("Europe/Berlin", now), { date: "2026-10-14", minutes: 720 });
  assert.equal(now.toISOString(), "2026-10-14T10:00:00.000Z");
});

test("créneaux du mercredi : 17:00 → 23:30, groupes corrects", () => {
  const slots = getSlots("2026-10-14", 2, "any", base);
  assert.equal(slots[0].time, "17:00");
  assert.equal(slots.at(-1)!.time, "23:30");
  assert.equal(slots[0].group, "afternoon");
  assert.equal(slots.find((s) => s.time === "19:00")!.group, "evening");
  assert.equal(slots.find((s) => s.time === "22:30")!.group, "night");
});

test("le vendredi propose des créneaux après minuit", () => {
  const slots = getSlots("2026-10-16", 2, "any", base);
  assert.equal(slots.at(-1)!.time, "01:30");
  assert.equal(slots.at(-1)!.minutes, 25 * 60 + 30);
  assert.equal(timeToServiceMinutes("2026-10-16", "01:30", base), 25 * 60 + 30);
});

test("jours passés, fermés et hors horizon", () => {
  assert.equal(getDayState("2026-10-13", 2, "any", base), "past");
  assert.equal(weekday("2026-10-19"), 1);
  assert.equal(getDayState("2026-10-19", 2, "any", base), "closed"); // lundi
  assert.equal(getDayState(addDays("2026-10-14", 200), 2, "any", base), "closed");
  assert.equal(getDayState("2026-10-15", 2, "any", { ...base, blockedDates: ["2026-10-15"] }), "closed");
});

test("terrasse fermée hors saison", () => {
  assert.equal(getDayState("2026-11-12", 2, "terrasse", base), "closed");
  assert.equal(getDayState("2026-10-15", 2, "terrasse", base), "available");
});

test("capacité : une table occupée bloque les créneaux qui se chevauchent", () => {
  const reservations = Array.from({ length: 12 }, () => ({ date: "2026-10-15", minutes: 20 * 60, tables: 1, space: "interieur" as const, status: "confirmed" as const }));
  const ctx = { ...base, reservations };
  assert.equal(remainingTables("2026-10-15", 19 * 60, "interieur", ctx), 0);
  assert.equal(remainingTables("2026-10-15", 18 * 60, "interieur", ctx), 12);
  assert.equal(remainingTables("2026-10-15", 22 * 60, "interieur", ctx), 12);
  const slot = getSlots("2026-10-15", 2, "interieur", ctx).find((s) => s.time === "20:30")!;
  assert.equal(slot.state, "full");
  // « Peu importe » bascule sur la terrasse
  assert.equal(pickSpace("2026-10-15", 20 * 60 + 30, 2, "any", ctx), "terrasse");
});

test("réservations annulées ignorées ; jour complet détecté", () => {
  const full = [] as any[];
  for (let m = 17 * 60; m <= 23 * 60 + 30; m += 60) {
    full.push({ date: "2026-10-22", minutes: m, tables: 12, space: "interieur", status: "confirmed" });
    full.push({ date: "2026-10-22", minutes: m, tables: 8, space: "terrasse", status: "confirmed" });
  }
  assert.equal(getDayState("2026-10-22", 2, "any", { ...base, reservations: full }), "full");
  const cancelled = full.map((r) => ({ ...r, status: "cancelled" }));
  assert.equal(getDayState("2026-10-22", 2, "any", { ...base, reservations: cancelled }), "available");
});

test("pickSpace refuse les créneaux invalides", () => {
  assert.equal(pickSpace("2026-10-15", 17 * 60 + 15, 2, "any", base), null);
  assert.equal(pickSpace("2026-10-15", 16 * 60, 2, "any", base), null);
  assert.equal(pickSpace("2026-10-14", 12 * 60 + 30, 2, "any", base), null);
});

test("mois complet : 31 jours", () => {
  assert.equal(getMonthAvailability(2026, 10, 2, "any", base).length, 31);
});

test("statut d'ouverture", () => {
  assert.deepEqual(getOpenStatus(now), { state: "later", opensAt: "17:00", until: "01:00" });
  assert.deepEqual(getOpenStatus(zonedToUtc("2026-10-17", 60, "Europe/Berlin")), { state: "open", until: "03:00" });
  assert.deepEqual(getOpenStatus(zonedToUtc("2026-10-19", 20 * 60, "Europe/Berlin")), { state: "closed" });
});
