"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { bookingConfig, type SpacePreference } from "@/config/booking";
import type { DayAvailability, DayState } from "@/lib/booking/types";
import { addDays, nowInZone, parseISODate, weekday } from "@/lib/booking/time";
import { cn } from "@/lib/cn";
import { formatDate } from "./state";

const cache = new Map<string, DayAvailability[]>();

export function Calendar({
  partySize,
  space,
  value,
  onSelect,
}: {
  partySize: number;
  space: SpacePreference;
  value: string | null;
  onSelect: (date: string) => void;
}) {
  const t = useTranslations("booking.calendar");
  const locale = useLocale();
  const today = useMemo(() => nowInZone(bookingConfig.timeZone).date, []);
  const start = parseISODate(value ?? today);
  const [cursor, setCursor] = useState({ y: start.y, m: start.m });
  const [days, setDays] = useState<DayAvailability[] | null>(null);
  const [error, setError] = useState(false);
  const [dir, setDir] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const min = parseISODate(today);
  const max = parseISODate(addDays(today, bookingConfig.horizonDays));
  const isFirstMonth = cursor.y === min.y && cursor.m === min.m;
  const isLastMonth = cursor.y === max.y && cursor.m === max.m;

  const load = useCallback(async () => {
    const key = `${cursor.y}-${cursor.m}-${partySize}-${space}`;
    setError(false);
    const cached = cache.get(key);
    setDays(cached ?? null);
    try {
      const res = await fetch(`/api/availability?year=${cursor.y}&month=${cursor.m}&party=${partySize}&space=${space}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { days: DayAvailability[] };
      cache.set(key, data.days);
      setDays(data.days);
    } catch {
      if (!cached) setError(true);
    }
  }, [cursor.y, cursor.m, partySize, space]);

  useEffect(() => {
    load();
  }, [load]);

  const move = (delta: number) => {
    setDir(delta);
    setCursor((c) => {
      const m = c.m + delta;
      return m < 1 ? { y: c.y - 1, m: 12 } : m > 12 ? { y: c.y + 1, m: 1 } : { y: c.y, m };
    });
  };

  const monthLabel = new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(cursor.y, cursor.m - 1, 1)),
  );
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "fr-FR", { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 1 + i))),
  );
  const firstDate = `${cursor.y}-${String(cursor.m).padStart(2, "0")}-01`;
  const offset = (weekday(firstDate) + 6) % 7; // lundi = 0

  // Navigation clavier : flèches entre les jours sélectionnables.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const steps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (!(e.key in steps)) return;
    const btns = Array.from(gridRef.current?.querySelectorAll<HTMLButtonElement>("button[data-day]") ?? []);
    const idx = btns.findIndex((b) => b === document.activeElement);
    if (idx < 0) return;
    e.preventDefault();
    const targetDay = Number(btns[idx].dataset.day) + steps[e.key];
    const target = btns.find((b) => Number(b.dataset.day) === targetDay && !b.disabled);
    target?.focus();
  };

  const stateClass: Record<DayState, string> = {
    past: "text-cream/15 cursor-default",
    closed: "bg-closed/40 text-cream/25 cursor-not-allowed",
    full: "bg-full/35 text-cream/45 cursor-not-allowed",
    available: "bg-night-700 text-cream ring-1 ring-inset ring-cream/10 hover:ring-gold/50 hover:shadow-halo hover:bg-night-600",
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={isFirstMonth}
          aria-label={t("prev")}
          className="grid h-10 w-10 place-items-center rounded-full border border-cream/10 text-cream transition hover:border-gold/50 disabled:opacity-20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <h4 className="font-serif text-2xl capitalize text-cream sm:text-3xl" aria-live="polite">
          {monthLabel}
        </h4>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={isLastMonth}
          aria-label={t("next")}
          className="grid h-10 w-10 place-items-center rounded-full border border-cream/10 text-cream transition hover:border-gold/50 disabled:opacity-20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center sm:gap-2" aria-hidden>
        {weekdays.map((w) => (
          <div key={w} className="pb-2 text-[11px] uppercase tracking-label text-smoke">
            {w.replace(".", "")}
          </div>
        ))}
      </div>

      <div className="relative min-h-[264px] sm:min-h-[318px]">
        {error ? (
          <div className="flex h-full min-h-[264px] flex-col items-center justify-center gap-3 text-center text-sm text-smoke">
            <p>{t("error")}</p>
            <button type="button" onClick={load} className="text-gold underline underline-offset-4">
              {t("retry")}
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={`${cursor.y}-${cursor.m}`}
              ref={gridRef}
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-7 gap-1.5 sm:gap-2"
              onKeyDown={onKeyDown}
              aria-busy={!days}
            >
              {Array.from({ length: offset }, (_, i) => (
                <div key={`o${i}`} />
              ))}
              {(days ?? Array.from({ length: new Date(Date.UTC(cursor.y, cursor.m, 0)).getUTCDate() }, (_, i) => ({ date: `${firstDate.slice(0, 8)}${String(i + 1).padStart(2, "0")}`, state: "closed" as DayState }))).map(
                ({ date, state }) => {
                  const day = Number(date.slice(8));
                  const selected = value === date;
                  const isToday = date === today;
                  const disabled = !days || state !== "available";
                  return (
                    <button
                      key={date}
                      type="button"
                      data-day={day}
                      disabled={disabled}
                      onClick={() => onSelect(date)}
                      aria-pressed={selected}
                      aria-label={`${formatDate(date, locale, { weekday: "long", day: "numeric", month: "long" })} — ${t(state)}`}
                      className={cn(
                        "relative flex aspect-square items-center justify-center rounded-xl text-[15px] tabular-nums transition-[background,box-shadow,color] duration-300 ease-silk sm:text-base",
                        !days ? "animate-pulse bg-night-800 text-transparent" : selected ? "bg-gold font-medium text-night shadow-halo" : stateClass[state],
                      )}
                    >
                      {day}
                      {isToday && <span aria-hidden className={cn("absolute bottom-1.5 h-1 w-1 rounded-full sm:bottom-2", selected ? "bg-night" : "bg-gold")} />}
                    </button>
                  );
                },
              )}
            </motion.div>
          </AnimatePresence>
        )}
        {!days && !error && <p className="sr-only" role="status">{t("loading")}</p>}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-smoke">
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-[4px] border border-cream/20 bg-night-700" />{t("available")}</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-[4px] bg-full" />{t("full")}</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-[4px] bg-closed" />{t("closed")}</li>
      </ul>
    </div>
  );
}
