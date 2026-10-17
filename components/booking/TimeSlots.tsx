"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { SpacePreference } from "@/config/booking";
import type { Slot } from "@/lib/booking/types";
import { cn } from "@/lib/cn";

const POLL_MS = 30_000;

export function LiveBadge() {
  const t = useTranslations("booking.time");
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] uppercase tracking-label text-emerald-300/90">
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {t("live")}
    </span>
  );
}

export function TimeSlots({
  date,
  partySize,
  space,
  value,
  onSelect,
  refreshKey,
}: {
  date: string | null;
  partySize: number;
  space: SpacePreference;
  value: string | null;
  onSelect: (time: string) => void;
  refreshKey?: number;
}) {
  const t = useTranslations("booking.time");
  const tc = useTranslations("booking.calendar");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(
    async (silent = false) => {
      if (!date) return;
      if (!silent) setSlots(null);
      try {
        const res = await fetch(`/api/availability/slots?date=${date}&party=${partySize}&space=${space}`, { cache: "no-store" });
        if (!res.ok) throw new Error();
        setSlots(((await res.json()) as { slots: Slot[] }).slots);
        setError(false);
      } catch {
        if (!silent) setError(true);
      }
    },
    [date, partySize, space],
  );

  useEffect(() => {
    load();
    const id = setInterval(() => load(true), POLL_MS);
    return () => clearInterval(id);
  }, [load, refreshKey]);

  if (!date) {
    return <p className="rounded-2xl border border-dashed border-cream/10 px-6 py-10 text-center text-smoke">{t("pickDateFirst")}</p>;
  }
  if (error) {
    return (
      <div className="py-8 text-center text-sm text-smoke">
        <p>{tc("error")}</p>
        <button type="button" onClick={() => load()} className="mt-2 text-gold underline underline-offset-4">
          {tc("retry")}
        </button>
      </div>
    );
  }
  if (!slots) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" aria-busy role="status">
        <span className="sr-only">{tc("loading")}</span>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-full bg-night-800" />
        ))}
      </div>
    );
  }
  const bookable = slots.filter((s) => s.state !== "full");
  if (bookable.length === 0) return <p className="py-8 text-center text-smoke">{t("none")}</p>;

  const groups = (["afternoon", "evening", "night"] as const).map((g) => ({ g, items: slots.filter((s) => s.group === g) })).filter((x) => x.items.length);

  return (
    <div className="space-y-7">
      {groups.map(({ g, items }) => (
        <fieldset key={g}>
          <legend className="label mb-3 !text-smoke">{t(`groups.${g}`)}</legend>
          <div className="grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-5">
            {items.map((s, i) => {
              const full = s.state === "full";
              const selected = value === s.time;
              const stateLabel = full ? t("full") : s.state === "low" ? t("remaining", { count: s.remaining }) : "";
              return (
                <motion.button
                  key={s.time}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.35 }}
                  disabled={full}
                  aria-pressed={selected}
                  aria-label={stateLabel ? t("slotLabel", { time: s.time, state: stateLabel }) : s.time}
                  onClick={() => onSelect(s.time)}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center rounded-full border px-2 py-1.5 tabular-nums transition-[background,border-color,box-shadow,color] duration-300 ease-silk",
                    full && "cursor-not-allowed border-transparent bg-night-800/60 text-cream/25 line-through",
                    !full && !selected && "border-cream/12 bg-night-700/60 text-cream hover:border-gold/50 hover:shadow-halo",
                    selected && "border-gold bg-gold text-night shadow-halo",
                  )}
                >
                  <span className="text-[15px]">{s.time}</span>
                  {s.state === "low" && (
                    <span className={cn("text-[10px] leading-tight", selected ? "text-night/70" : "text-ember")}>{t("remaining", { count: s.remaining })}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
