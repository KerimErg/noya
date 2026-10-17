"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { bookingConfig } from "@/config/booking";
import { buildICS } from "@/lib/ics";
import { addressLine, mapsUrl } from "@/lib/content";
import { buttonClasses } from "@/components/ui/Button";
import type { Confirmed } from "./state";
import { formatDate } from "./state";

/** Volutes dorées qui se dissipent. */
function GoldSmoke() {
  const reduce = useReducedMotion();
  const puffs = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: Math.cos((i / 14) * Math.PI * 2) * (30 + (i % 3) * 18),
        y: Math.sin((i / 14) * Math.PI * 2) * (20 + (i % 4) * 10),
        size: 60 + (i % 5) * 22,
        delay: (i % 7) * 0.06,
      })),
    [],
  );
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {puffs.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: "radial-gradient(circle, rgba(221,191,156,.55), rgba(201,162,122,.15) 55%, transparent 70%)", filter: "blur(10px)" }}
          initial={{ opacity: 0.9, scale: 0.3, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 2.6, x: p.x * 2.2, y: p.y * 2.2 - 70 }}
          transition={{ duration: 2.6, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

export function Success({ booking, onAgain }: { booking: Confirmed; onAgain: () => void }) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  const downloadIcs = () => {
    const ics = buildICS({
      uid: booking.id,
      date: booking.date,
      minutes: booking.minutes,
      durationMinutes: bookingConfig.tableDurationMinutes,
      title: t("done.icsTitle"),
      description: t("done.icsDescription", { guests: t("party.guests", { count: booking.partySize }), ref: booking.id }),
      location: `NOYA, ${addressLine()}`,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `noya-${booking.date}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const confirmed = booking.status === "confirmed";

  return (
    <div className="relative flex flex-col items-center px-2 py-6 text-center">
      <div className="relative mb-8 grid h-40 w-40 place-items-center">
        <GoldSmoke />
        <motion.svg width="76" height="76" viewBox="0 0 76 76" aria-hidden className="relative">
          <motion.circle cx="38" cy="38" r="36" fill="none" stroke="#C9A27A" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} />
          <motion.path d="M25 39l9 9 18-20" fill="none" stroke="#C9A27A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }} />
        </motion.svg>
      </div>

      <h3 ref={headingRef} tabIndex={-1} className="font-serif text-4xl text-cream outline-none sm:text-5xl">
        {confirmed ? t("done.title") : t("done.pendingTitle")}
      </h3>
      <p className="mt-4 max-w-md text-smoke" role="status">
        {confirmed ? t("done.text", { email: booking.email }) : t("done.pendingText", { email: booking.email })}
      </p>

      <div className="glass mt-8 w-full max-w-md rounded-2xl p-6 text-left">
        <p className="font-serif text-2xl capitalize text-cream">{formatDate(booking.date, locale)}</p>
        <p className="mt-1 text-gold">
          {booking.time} · {t("party.guests", { count: booking.partySize })} · {t(`spaces.${booking.space}`)}
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-label text-smoke">
          {t("done.ref")} <span className="ml-2 font-mono text-cream">{booking.id}</span>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={downloadIcs} className={buttonClasses("gold", "md")}>
          {t("done.calendar")}
        </button>
        <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "md")}>
          {t("done.directions")}
        </a>
      </div>
      <button type="button" onClick={onAgain} className="mt-6 text-sm text-smoke underline-offset-4 hover:text-cream hover:underline">
        {t("done.again")}
      </button>
    </div>
  );
}
