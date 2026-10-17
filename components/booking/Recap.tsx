"use client";

import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import type { BookingDraft, StepId } from "./state";
import { formatDate } from "./state";

export function Recap({ draft, onEdit, full = false }: { draft: BookingDraft; onEdit?: (step: StepId) => void; full?: boolean }) {
  const t = useTranslations("booking");
  const locale = useLocale();

  const rows: { key: string; label: string; value: string | null; step: StepId }[] = [
    { key: "guests", label: t("recap.guests"), value: draft.partySize ? t("party.guests", { count: draft.partySize }) : null, step: "party" },
    { key: "space", label: t("recap.space"), value: draft.partySize ? t(`spaces.${draft.space}`) : null, step: "party" },
    { key: "date", label: t("recap.date"), value: draft.date ? formatDate(draft.date, locale) : null, step: "date" },
    { key: "time", label: t("recap.time"), value: draft.time, step: "time" },
    { key: "occasion", label: t("recap.occasion"), value: draft.occasion ? t(`prefs.occasions.${draft.occasion}`) : null, step: "prefs" },
    { key: "shisha", label: t("recap.shisha"), value: draft.shisha ? t(`prefs.shishaOptions.${draft.shisha}`) : null, step: "prefs" },
    { key: "notes", label: t("recap.notes"), value: draft.notes.trim() || null, step: "prefs" },
  ];
  if (full) {
    rows.push(
      { key: "name", label: t("recap.name"), value: `${draft.firstName} ${draft.lastName}`.trim() || null, step: "contact" },
      { key: "phone", label: t("recap.phone"), value: draft.phone ? `${draft.phonePrefix} ${draft.phone}` : null, step: "contact" },
      { key: "email", label: t("recap.email"), value: draft.email || null, step: "contact" },
    );
  }
  const visible = rows.filter((r) => r.value);

  return (
    <div>
      {visible.length === 0 ? (
        <p className="text-sm text-smoke">{t("recap.empty")}</p>
      ) : (
        <dl className="divide-y divide-cream/[0.06]">
          <AnimatePresence initial={false}>
            {visible.map((r) => (
              <motion.div
                key={r.key}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-baseline justify-between gap-4 overflow-hidden py-3"
              >
                <dt className="shrink-0 text-[11px] uppercase tracking-label text-smoke">{r.label}</dt>
                <dd className="flex min-w-0 items-baseline gap-3 text-right text-[15px] text-cream">
                  <span className="break-words first-letter:uppercase">{r.value}</span>
                  {onEdit && (
                    <button type="button" onClick={() => onEdit(r.step)} className="shrink-0 text-xs text-gold/80 hover:text-gold">
                      {t("summary.edit")}
                    </button>
                  )}
                </dd>
              </motion.div>
            ))}
          </AnimatePresence>
        </dl>
      )}
    </div>
  );
}
