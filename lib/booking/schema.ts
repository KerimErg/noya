import { z } from "zod";

export const PHONE_PREFIXES = ["+33", "+49"] as const;

export const reservationInputSchema = z.object({
  partySize: z.number().int().min(1).max(8),
  space: z.enum(["any", "interieur", "terrasse"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  occasion: z.enum(["birthday", "date", "friends", "business", "other"]).nullable().optional(),
  shisha: z.enum(["chosen", "advice", "none"]).nullable().optional(),
  notes: z.string().trim().max(500).nullable().optional(),
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  phonePrefix: z.enum(PHONE_PREFIXES),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.\-()]/g, "").replace(/^0/, ""))
    .pipe(z.string().regex(/^\d{6,12}$/)),
  email: z.string().trim().email().max(120),
  consent: z.literal(true),
  locale: z.enum(["fr", "de"]),
  /** Champ piège anti-spam : doit rester vide. */
  website: z.string().max(0).optional(),
});

export type ReservationInput = z.input<typeof reservationInputSchema>;
