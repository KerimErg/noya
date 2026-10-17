"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface Ctx {
  isOpen: boolean;
  /** Ouvre le tiroir de réservation, éventuellement avec une date pré-sélectionnée. */
  open: (opts?: { date?: string }) => void;
  close: () => void;
  initialDate: string | null;
}

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<string | null>(null);
  const open = useCallback((opts?: { date?: string }) => {
    setInitialDate(opts?.date ?? null);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close, initialDate }), [isOpen, open, close, initialDate]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
