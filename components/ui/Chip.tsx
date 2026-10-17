import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Puce de sélection : sélection = contour or + texte or. */
export function Chip({ selected, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "h-10 rounded-full border px-5 text-sm transition-colors duration-300 ease-silk",
        selected ? "border-gold bg-gold/10 text-gold" : "border-cream/12 text-cream/85 hover:border-gold/40 hover:text-cream",
        className,
      )}
      {...rest}
    />
  );
}
