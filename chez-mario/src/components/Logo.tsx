import { MascotHead } from "./Mascot";

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <MascotHead className="h-11 w-11 shrink-0 rounded-full border-[3px] border-ink" />
      <span className={`font-display text-[24px] uppercase leading-none tracking-wide ${light ? "text-white" : "text-ink"}`}>
        Chez <span className="text-mario">Mario</span>
      </span>
    </span>
  );
}
