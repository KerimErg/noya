/**
 * Configuration du module de réservation NOYA.
 *
 * ⚠️ Les horaires ci-dessous sont des VALEURS DE DÉMONSTRATION : les vrais horaires
 * n'ont pas pu être récupérés. Remplacez weeklySchedule puis passez HOURS_CONFIRMED à true
 * (tant qu'il vaut false, le site affiche une mention « horaires à confirmer »).
 */

export type SpaceId = "interieur" | "terrasse";
export type SpacePreference = SpaceId | "any";

/** "HH:mm". Une fermeture <= ouverture signifie « après minuit » (ex. 18:00 → 02:00). */
export type DaySchedule = { open: string; close: string } | null;

export const HOURS_CONFIRMED = false;

export const bookingConfig = {
  timeZone: "Europe/Berlin",

  /** Index 0 = dimanche … 6 = samedi (comme Date#getDay). null = fermé. */
  weeklySchedule: [
    { open: "16:00", close: "01:00" }, // dimanche   [À COMPLÉTER]
    null, //                              lundi      [À COMPLÉTER]
    { open: "17:00", close: "01:00" }, // mardi      [À COMPLÉTER]
    { open: "17:00", close: "01:00" }, // mercredi   [À COMPLÉTER]
    { open: "17:00", close: "01:00" }, // jeudi      [À COMPLÉTER]
    { open: "17:00", close: "03:00" }, // vendredi   [À COMPLÉTER]
    { open: "15:00", close: "03:00" }, // samedi     [À COMPLÉTER]
  ] as DaySchedule[],

  /** Dates fermées exceptionnelles (YYYY-MM-DD). Les blocages faits depuis /admin s'y ajoutent. */
  closedDates: [] as string[],

  /** Durée d'un créneau affiché. */
  slotMinutes: 30,
  /** Durée moyenne d'occupation d'une table. */
  tableDurationMinutes: 120,
  /** Dernière réservation possible X minutes avant la fermeture. */
  lastSeatingBeforeCloseMinutes: 90,
  /** Délai minimum entre maintenant et l'heure réservée. */
  minLeadMinutes: 60,
  /** Jusqu'où on peut réserver. */
  horizonDays: 90,

  spaces: {
    interieur: { tables: 12 }, // [À COMPLÉTER] nombre réel de tables
    terrasse: { tables: 8 }, //   [À COMPLÉTER]
  } as Record<SpaceId, { tables: number }>,

  /** Mois (1-12) où la terrasse est ouverte. */
  terraceMonths: [4, 5, 6, 7, 8, 9, 10],

  maxPartySize: 8,

  /** Nombre de tables mobilisées selon la taille du groupe. */
  tablesForParty(partySize: number): number {
    return partySize <= 4 ? 1 : 2;
  },

  /** Seuil sous lequel on affiche « Plus que N tables ». */
  lowAvailabilityThreshold: 3,

  /** true : les réservations sont confirmées automatiquement. false : en attente de validation /admin. */
  autoConfirm: true,

  /** Bornes (minutes depuis minuit) des groupes de créneaux. Au-delà de 24h = après minuit. */
  slotGroups: {
    afternoon: [0, 18 * 60],
    evening: [18 * 60, 22 * 60],
    night: [22 * 60, 48 * 60],
  } as Record<"afternoon" | "evening" | "night", [number, number]>,
};

export type BookingConfig = typeof bookingConfig;
