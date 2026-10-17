import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Reservation, ReservationStatus } from "./types";

/**
 * Stockage des réservations.
 * - Production : Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY), schéma dans supabase/schema.sql.
 * - Local : fichier JSON dans data/ (ne convient pas à un hébergement serverless).
 */
export interface BookingStore {
  listByDateRange(from: string, to: string): Promise<Reservation[]>;
  create(r: Reservation): Promise<void>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation | null>;
  listBlockedDates(): Promise<string[]>;
  setBlocked(date: string, blocked: boolean): Promise<void>;
  /** Exécute fn en exclusion mutuelle (vérification de dispo + insertion). */
  withLock<T>(fn: () => Promise<T>): Promise<T>;
}

/* ---------------------------------------------------------------- Fichier */

interface FileData {
  reservations: Reservation[];
  blockedDates: string[];
}

class FileStore implements BookingStore {
  private file = path.join(process.cwd(), "data", "reservations.json");
  private queue: Promise<unknown> = Promise.resolve();

  private async read(): Promise<FileData> {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8")) as FileData;
    } catch {
      return { reservations: [], blockedDates: [] };
    }
  }

  private async write(data: FileData) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2));
    await fs.rename(tmp, this.file);
  }

  withLock<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn);
    this.queue = run.catch(() => undefined);
    return run;
  }

  async listByDateRange(from: string, to: string) {
    const { reservations } = await this.read();
    return reservations.filter((r) => r.date >= from && r.date <= to);
  }

  async create(r: Reservation) {
    const data = await this.read();
    data.reservations.push(r);
    await this.write(data);
  }

  async updateStatus(id: string, status: ReservationStatus) {
    return this.withLock(async () => {
      const data = await this.read();
      const r = data.reservations.find((x) => x.id === id);
      if (!r) return null;
      r.status = status;
      await this.write(data);
      return r;
    });
  }

  async listBlockedDates() {
    return (await this.read()).blockedDates;
  }

  async setBlocked(date: string, blocked: boolean) {
    await this.withLock(async () => {
      const data = await this.read();
      const set = new Set(data.blockedDates);
      if (blocked) set.add(date);
      else set.delete(date);
      data.blockedDates = [...set].sort();
      await this.write(data);
    });
  }
}

/* --------------------------------------------------------------- Supabase */

const COLS: [keyof Reservation, string][] = [
  ["id", "id"],
  ["createdAt", "created_at"],
  ["status", "status"],
  ["date", "date"],
  ["time", "time"],
  ["minutes", "minutes"],
  ["partySize", "party_size"],
  ["tables", "tables"],
  ["space", "space"],
  ["spacePreference", "space_preference"],
  ["occasion", "occasion"],
  ["shisha", "shisha"],
  ["notes", "notes"],
  ["firstName", "first_name"],
  ["lastName", "last_name"],
  ["phone", "phone"],
  ["email", "email"],
  ["locale", "locale"],
];

const toRow = (r: Reservation) => Object.fromEntries(COLS.map(([k, c]) => [c, r[k] ?? null]));
const fromRow = (row: Record<string, unknown>) => Object.fromEntries(COLS.map(([k, c]) => [k, row[c]])) as unknown as Reservation;

class SupabaseStore implements BookingStore {
  constructor(private url: string, private key: string) {}

  private async req(pathAndQuery: string, init: RequestInit = {}) {
    const res = await fetch(`${this.url}/rest/v1/${pathAndQuery}`, {
      ...init,
      cache: "no-store",
      headers: {
        apikey: this.key,
        Authorization: `Bearer ${this.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...init.headers,
      },
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    return res.status === 204 ? null : res.json();
  }

  // Sérialise les appels d'une même instance. Entre instances serverless, deux réservations
  // simultanées sur la dernière table restent théoriquement possibles (risque faible, visible dans /admin).
  private queue: Promise<unknown> = Promise.resolve();
  withLock<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn);
    this.queue = run.catch(() => undefined);
    return run;
  }

  async listByDateRange(from: string, to: string) {
    const rows = (await this.req(`reservations?date=gte.${from}&date=lte.${to}&order=date,minutes`)) as Record<string, unknown>[];
    return rows.map(fromRow);
  }

  async create(r: Reservation) {
    await this.req("reservations", { method: "POST", body: JSON.stringify(toRow(r)) });
  }

  async updateStatus(id: string, status: ReservationStatus) {
    const rows = (await this.req(`reservations?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })) as Record<string, unknown>[];
    return rows[0] ? fromRow(rows[0]) : null;
  }

  async listBlockedDates() {
    const rows = (await this.req("blocked_dates?select=date&order=date")) as { date: string }[];
    return rows.map((r) => r.date);
  }

  async setBlocked(date: string, blocked: boolean) {
    if (blocked) {
      await this.req("blocked_dates", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates" },
        body: JSON.stringify({ date }),
      });
    } else {
      await this.req(`blocked_dates?date=eq.${date}`, { method: "DELETE" });
    }
  }
}

let store: BookingStore | null = null;

export function getStore(): BookingStore {
  if (!store) {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
    store = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY ? new SupabaseStore(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) : new FileStore();
  }
  return store;
}
