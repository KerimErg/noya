"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { bookingConfig } from "@/config/booking";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Calendar } from "./Calendar";
import { LiveBadge, TimeSlots } from "./TimeSlots";
import { Recap } from "./Recap";
import { Success } from "./Success";
import { STEPS, emptyDraft, validateContact, type BookingDraft, type Confirmed, type ContactErrors, type StepId } from "./state";

const OCCASIONS = ["birthday", "date", "friends", "business", "other"] as const;
const SHISHA = ["chosen", "advice", "none"] as const;

export function BookingWizard({ variant = "section", initialDate = null }: { variant?: "section" | "drawer"; initialDate?: string | null }) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const uid = useId();
  const [draft, setDraft] = useState<BookingDraft>(() => ({ ...emptyDraft(locale), date: initialDate }));
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const [slotsRefresh, setSlotsRefresh] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const update = (patch: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...patch }));
  const current: StepId = STEPS[step];

  const go = (target: number) => {
    setDir(target > step ? 1 : -1);
    setStep(target);
    setMaxStep((m) => Math.max(m, target));
    setSubmitError(null);
  };
  const goTo = (id: StepId) => go(STEPS.indexOf(id));

  // Focus sur le titre de l'étape à chaque changement (lecteurs d'écran + clavier).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, confirmed]);

  // Changer convives/espace invalide date et heure.
  const setParty = (partySize: number) => {
    update({ partySize, time: null });
    setMaxStep(0);
  };
  const setSpace = (space: BookingDraft["space"]) => {
    update({ space, time: null, ...(space !== draft.space ? { date: initialDate } : {}) });
    setMaxStep(0);
  };

  const canContinue: Record<StepId, boolean> = {
    party: !!draft.partySize,
    date: !!draft.date,
    time: !!draft.time,
    prefs: true,
    contact: true,
    summary: true,
  };

  const next = () => {
    if (current === "contact") {
      const e = validateContact(draft);
      setErrors(e);
      if (Object.keys(e).length) {
        const first = Object.keys(e)[0];
        document.getElementById(`${uid}-${first}`)?.focus();
        return;
      }
    }
    go(step + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, notes: draft.notes || null, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setConfirmed({ ...data.reservation, email: draft.email });
        return;
      }
      if (res.status === 409) {
        update({ time: null });
        setSlotsRefresh((n) => n + 1);
        go(STEPS.indexOf("time"));
        setSubmitError(t("summary.errors.unavailable"));
        return;
      }
      setSubmitError(t(res.status === 429 ? "summary.errors.rate" : res.status === 400 ? "summary.errors.invalid" : "summary.errors.generic"));
    } catch {
      setSubmitError(t("summary.errors.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setDraft((d) => ({ ...emptyDraft(locale), firstName: d.firstName, lastName: d.lastName, phone: d.phone, phonePrefix: d.phonePrefix, email: d.email }));
    setConfirmed(null);
    setStep(0);
    setMaxStep(0);
  };

  if (confirmed) return <Success booking={confirmed} onAgain={restart} />;

  const progress = ((step + 1) / STEPS.length) * 100;
  const slide = reduce ? {} : { initial: { opacity: 0, x: dir * 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: dir * -40 } };

  return (
    <div className={cn("grid gap-8", variant === "section" ? "lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12" : "lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10")}>
      <div className="min-w-0">
        {/* Progression */}
        <div className="mb-8">
          <div className="mb-4 h-px w-full overflow-hidden bg-cream/10" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} aria-label={t("progress", { current: step + 1, total: STEPS.length })}>
            <motion.div className="h-full bg-gradient-to-r from-gold-dim via-gold to-gold-light" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
          </div>
          <ol className="flex items-center gap-1 overflow-x-auto pb-1 sm:gap-2" aria-label={t("progress", { current: step + 1, total: STEPS.length })}>
            {STEPS.map((id, i) => {
              const reachable = i <= maxStep && i !== step;
              const done = i < step || (i <= maxStep && i !== step);
              return (
                <li key={id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => reachable && go(i)}
                    disabled={!reachable}
                    aria-current={i === step ? "step" : undefined}
                    className={cn("group flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs transition", reachable && "hover:bg-cream/5", !reachable && i !== step && "opacity-40")}
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full border text-[12px] tabular-nums transition-colors duration-300",
                        i === step ? "border-gold bg-gold text-night" : done ? "border-gold/60 text-gold" : "border-cream/15 text-smoke",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn("hidden sm:inline", i === step ? "text-cream" : "text-smoke")}>{t(`stepShort.${id}`)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.section key={current} {...slide} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} aria-labelledby={`${uid}-h`}>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 id={`${uid}-h`} ref={headingRef} tabIndex={-1} className="flex items-center gap-4 font-serif text-3xl text-cream outline-none sm:text-4xl">
                <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold font-sans text-sm font-medium text-night">
                  {step + 1}
                </span>
                {t(`steps.${current}`)}
              </h3>
              {current === "time" && <LiveBadge />}
            </div>

            {submitError && current !== "summary" && (
              <p role="alert" className="mb-5 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember">
                {submitError}
              </p>
            )}

            {current === "party" && (
              <div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3" role="group" aria-label={t("steps.party")}>
                  {Array.from({ length: bookingConfig.maxPartySize }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={draft.partySize === n}
                      aria-label={t("party.guests", { count: n })}
                      onClick={() => setParty(n)}
                      className={cn(
                        "h-14 rounded-full border text-lg tabular-nums transition-[background,border-color,box-shadow,color] duration-300 ease-silk sm:h-16",
                        draft.partySize === n ? "border-gold bg-gold text-night shadow-halo" : "border-cream/12 bg-night-700/60 text-cream hover:border-gold/50",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-smoke">
                  {t("party.more")}{" "}
                  <a href={content.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
                    {t("party.moreLink")}
                  </a>
                </p>
                <fieldset className="mt-8">
                  <legend className="label mb-3">{t("party.space")}</legend>
                  <div className="flex flex-wrap gap-2">
                    {(["any", "interieur", "terrasse"] as const).map((s) => (
                      <Chip key={s} selected={draft.space === s} onClick={() => setSpace(s)}>
                        {t(`spaces.${s}`)}
                      </Chip>
                    ))}
                  </div>
                  {draft.space === "terrasse" && <p className="mt-3 text-xs text-smoke">{t("party.terraceSeason")}</p>}
                </fieldset>
              </div>
            )}

            {current === "date" && draft.partySize && (
              <Calendar
                partySize={draft.partySize}
                space={draft.space}
                value={draft.date}
                onSelect={(date) => {
                  update({ date, time: date === draft.date ? draft.time : null });
                  setTimeout(() => go(STEPS.indexOf("time")), reduce ? 0 : 280);
                }}
              />
            )}

            {current === "time" && draft.partySize && (
              <TimeSlots
                date={draft.date}
                partySize={draft.partySize}
                space={draft.space}
                value={draft.time}
                refreshKey={slotsRefresh}
                onSelect={(time) => {
                  update({ time });
                  setSubmitError(null);
                  setTimeout(() => go(STEPS.indexOf("prefs")), reduce ? 0 : 280);
                }}
              />
            )}

            {current === "prefs" && (
              <div className="space-y-8">
                <p className="text-sm text-smoke">{t("prefs.optional")}</p>
                <fieldset>
                  <legend className="label mb-3">{t("prefs.occasion")}</legend>
                  <div className="flex flex-wrap gap-2">
                    {OCCASIONS.map((o) => (
                      <Chip key={o} selected={draft.occasion === o} onClick={() => update({ occasion: draft.occasion === o ? null : o })}>
                        {t(`prefs.occasions.${o}`)}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="label mb-3">{t("prefs.shisha")}</legend>
                  <div className="flex flex-wrap gap-2">
                    {SHISHA.map((o) => (
                      <Chip key={o} selected={draft.shisha === o} onClick={() => update({ shisha: draft.shisha === o ? null : o })}>
                        {t(`prefs.shishaOptions.${o}`)}
                      </Chip>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor={`${uid}-notes`} className="label mb-3 block">
                    {t("prefs.notes")}
                  </label>
                  <textarea
                    id={`${uid}-notes`}
                    data-lenis-prevent
                    rows={3}
                    maxLength={500}
                    value={draft.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    placeholder={t("prefs.notesPlaceholder")}
                    className="w-full resize-none rounded-2xl border border-cream/12 bg-night-800/70 px-4 py-3 text-cream placeholder:text-smoke/50 focus:border-gold/60 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {current === "contact" && (
              <ContactForm uid={uid} draft={draft} update={update} errors={errors} setErrors={setErrors} />
            )}

            {current === "summary" && (
              <div>
                <div className="glass rounded-3xl p-6 sm:p-8">
                  <Recap draft={draft} onEdit={goTo} full />
                </div>
                {submitError && (
                  <p role="alert" className="mt-5 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember">
                    {submitError}
                  </p>
                )}
                <Button size="lg" className="mt-8 w-full" onClick={submit} disabled={submitting} aria-busy={submitting}>
                  {submitting ? t("summary.sending") : t("summary.confirm")}
                </Button>
              </div>
            )}

            {/* Navigation */}
            {current !== "summary" && (
              <div className="mt-10 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <button type="button" onClick={() => go(step - 1)} className="text-sm text-smoke transition hover:text-cream">
                    ← {t("back")}
                  </button>
                ) : (
                  <span />
                )}
                {current !== "date" && current !== "time" && (
                  <Button onClick={next} disabled={!canContinue[current]} size="md">
                    {current === "prefs" && !draft.occasion && !draft.shisha && !draft.notes ? t("skip") : t("next")}
                  </Button>
                )}
                {(current === "date" || current === "time") && canContinue[current] && (
                  <Button onClick={next} variant="outline" size="md">
                    {t("next")}
                  </Button>
                )}
              </div>
            )}
            {current === "summary" && (
              <button type="button" onClick={() => go(step - 1)} className="mt-6 text-sm text-smoke transition hover:text-cream">
                ← {t("back")}
              </button>
            )}
          </motion.section>
        </AnimatePresence>
      </div>

      {/* Récap en direct (desktop) */}
      <aside className="hidden lg:block" aria-label={t("recap.title")}>
        <div className="glass sticky top-8 rounded-3xl p-6">
          <p className="label mb-4">{t("recap.title")}</p>
          <Recap draft={draft} />
        </div>
      </aside>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[11px] uppercase tracking-label text-smoke">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-ember">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err?: unknown) =>
  cn(
    "h-12 w-full rounded-xl border bg-night-800/70 px-4 text-cream placeholder:text-smoke/40 transition-colors focus:outline-none",
    err ? "border-ember/60 focus:border-ember" : "border-cream/12 focus:border-gold/60",
  );

function ContactForm({
  uid,
  draft,
  update,
  errors,
  setErrors,
}: {
  uid: string;
  draft: BookingDraft;
  update: (p: Partial<BookingDraft>) => void;
  errors: ContactErrors;
  setErrors: (e: ContactErrors) => void;
}) {
  const t = useTranslations("booking.contact");
  const err = (k: keyof ContactErrors) => (errors[k] ? t(`errors.${errors[k]}`) : undefined);
  // Re-valide un champ en erreur dès qu'il est corrigé.
  const revalidate = (patch: Partial<BookingDraft>) => {
    update(patch);
    if (Object.keys(errors).length) {
      const all = validateContact({ ...draft, ...patch });
      setErrors(Object.fromEntries(Object.keys(errors).filter((k) => all[k as keyof ContactErrors]).map((k) => [k, all[k as keyof ContactErrors]])));
    }
  };
  const a11y = (k: keyof ContactErrors) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined });

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id={`${uid}-firstName`} label={t("firstName")} error={err("firstName")}>
        <input id={`${uid}-firstName`} autoComplete="given-name" value={draft.firstName} onChange={(e) => revalidate({ firstName: e.target.value })} className={inputCls(errors.firstName)} {...a11y("firstName")} />
      </Field>
      <Field id={`${uid}-lastName`} label={t("lastName")} error={err("lastName")}>
        <input id={`${uid}-lastName`} autoComplete="family-name" value={draft.lastName} onChange={(e) => revalidate({ lastName: e.target.value })} className={inputCls(errors.lastName)} {...a11y("lastName")} />
      </Field>
      <Field id={`${uid}-phone`} label={t("phone")} error={err("phone")}>
        <div className="flex gap-2">
          <select
            aria-label={t("prefix")}
            value={draft.phonePrefix}
            onChange={(e) => update({ phonePrefix: e.target.value as BookingDraft["phonePrefix"] })}
            className="h-12 rounded-xl border border-cream/12 bg-night-800/70 px-3 text-cream focus:border-gold/60 focus:outline-none"
          >
            <option value="+33">🇫🇷 +33</option>
            <option value="+49">🇩🇪 +49</option>
          </select>
          <input id={`${uid}-phone`} type="tel" inputMode="tel" autoComplete="tel-national" value={draft.phone} onChange={(e) => revalidate({ phone: e.target.value })} className={inputCls(errors.phone)} {...a11y("phone")} />
        </div>
      </Field>
      <Field id={`${uid}-email`} label={t("email")} error={err("email")}>
        <input id={`${uid}-email`} type="email" autoComplete="email" value={draft.email} onChange={(e) => revalidate({ email: e.target.value })} className={inputCls(errors.email)} {...a11y("email")} />
      </Field>
      {/* Champ piège anti-robots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={draft.website} onChange={(e) => update({ website: e.target.value })} className="hidden" aria-hidden />
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-smoke">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={draft.consent}
            onChange={(e) => revalidate({ consent: e.target.checked })}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border border-cream/25 bg-night-800 transition checked:border-gold checked:bg-gold checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2020%22%3E%3Cpath%20d=%22M5%2010.5l3.2%203L15%206.5%22%20fill=%22none%22%20stroke=%22%230E0B09%22%20stroke-width=%222%22/%3E%3C/svg%3E')] checked:bg-center"
            {...a11y("consent")}
          />
          <span>
            {t.rich("consent", {
              link: (chunks) => (
                <Link href="/datenschutz" target="_blank" className="text-gold underline-offset-4 hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-err`} className="mt-2 text-xs text-ember">
            {err("consent")}
          </p>
        )}
      </div>
    </div>
  );
}
