import { cn } from "@/lib/cn";

/** Logotype provisoire NOYA (à remplacer par le logo officiel dans public/images/logo.svg). */
export function Logo({ className, glow = false, sub = true }: { className?: string; glow?: boolean; sub?: boolean }) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn("font-serif font-light tracking-[0.42em] pl-[0.42em] text-cream", glow && "animate-glow")}
        style={glow ? { textShadow: "0 0 24px rgba(201,162,122,.55), 0 0 64px rgba(201,162,122,.25)" } : undefined}
      >
        NOYA
      </span>
      {sub && (
        <span className="mt-[0.5em] flex items-center gap-2 text-[0.22em] font-sans uppercase tracking-[0.5em] text-gold">
          <span aria-hidden className="h-px w-4 bg-gold/50" />
          Kehl
          <span aria-hidden className="h-px w-4 bg-gold/50" />
        </span>
      )}
    </span>
  );
}
