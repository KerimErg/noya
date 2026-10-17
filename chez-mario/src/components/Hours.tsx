"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { DAYS, formatTime, nowInParis, openState, type OpenState } from "@/lib/hours";

/** Calculé dans le navigateur (le site est statique : l'heure doit être celle du visiteur, à Erstein). */
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
  let state: OpenState | null = null;
  if (hours && now) state = openState(hours, now);

  const label = !hours
    ? "Horaires bientôt en ligne"
    : !state
      ? "…"
      : state.open
        ? `Ouvert · jusqu'à ${formatTime(state.until)}`
        : state.next
          ? `Fermé · ouvre ${state.next.day === DAYS[nowInParis(now!).day] ? "à" : `${state.next.day} à`} ${formatTime(state.next.time)}`
          : "Fermé";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 text-[13px] font-semibold backdrop-blur ${className}`} aria-live="polite">
      <span aria-hidden className={`relative h-2.5 w-2.5 rounded-full ${state?.open ? "bg-emerald-400" : hours ? "bg-mario-bright" : "bg-muted"}`}>
        {state?.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />}
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
      <ul className="divide-y divide-white/[0.06]">
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
    <ul className="divide-y divide-white/[0.06]">
      {DAYS.map((d, i) => (
        <li key={d} className={`flex items-center justify-between gap-4 py-3 capitalize ${i === today ? "font-bold text-coin" : ""}`} aria-current={i === today ? "date" : undefined}>
          <span>
            {d}
            {i === today && <span className="ml-2 text-[11px] uppercase tracking-wider normal-case">(aujourd&apos;hui)</span>}
          </span>
          <span className="text-right tabular-nums">{hours[d].length ? hours[d].map((r) => `${formatTime(r.open)} – ${formatTime(r.close)}`).join(" · ") : "Fermé"}</span>
        </li>
      ))}
    </ul>
  );
}

export function HoursSummary() {
  if (!site.hours) return <span className="todo">Horaires à compléter</span>;
  return (
    <div className="text-sm">
      <OpenBadge />
    </div>
  );
}
