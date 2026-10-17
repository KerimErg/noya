"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { DAYS, formatTime, nowInParis, openState, type OpenState } from "@/lib/hours";

/** Calculé dans le navigateur (le site est statique : l'heure doit être celle du moment, à Erstein). */
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function OpenBadge({ className = "" }: { className?: string }) {
  const now = useNow();
  const hours = site.hours;
  const state: OpenState | null = hours && now ? openState(hours, now) : null;

  let label = "Horaires bientôt en ligne";
  if (hours && !state) label = "Horaires";
  if (state?.open) label = `Ouvert · jusqu'à ${formatTime(state.until)}`;
  if (state && !state.open) {
    const today = DAYS[nowInParis(now!).day];
    label = state.next ? `Fermé · ouvre ${state.next.day === today ? "à" : `${state.next.day} à`} ${formatTime(state.next.time)}` : "Fermé";
  }

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-3.5 py-1.5 text-[13px] font-extrabold text-ink shadow-pop-sm ${className}`} aria-live="polite">
      <span aria-hidden className={`relative h-3 w-3 rounded-full border-2 border-ink ${state?.open ? "bg-luigi" : state ? "bg-mario" : "bg-coin"}`}>
        {state?.open && <span className="absolute inset-0 animate-ping rounded-full bg-luigi motion-reduce:hidden" />}
      </span>
      {label}
    </span>
  );
}

export function HoursTable() {
  const now = useNow();
  const hours = site.hours;
  const today = now ? nowInParis(now).day : -1;
  if (!hours) {
    return (
      <ul className="divide-y-2 divide-dashed divide-ink/15">
        {DAYS.map((d) => (
          <li key={d} className="flex items-center justify-between py-3 capitalize">
            <span>{d}</span>
            <span className="todo">à compléter</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-1.5">
      {DAYS.map((d, i) => {
        const isToday = i === today;
        const closed = !hours[d].length;
        return (
          <li
            key={d}
            className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 capitalize ${isToday ? "border-[3px] border-ink bg-coin font-extrabold shadow-pop-sm" : "border-[3px] border-transparent"}`}
            aria-current={isToday ? "date" : undefined}
          >
            <span className="font-bold">
              {d}
              {isToday && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] normal-case tracking-wider text-white">aujourd&apos;hui</span>}
            </span>
            <span className={`text-right tabular-nums ${closed ? "font-bold text-mario-dark" : ""}`}>
              {closed ? "Fermé" : hours[d].map((r) => `${formatTime(r.open)} – ${formatTime(r.close)}`).join(" · ")}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
