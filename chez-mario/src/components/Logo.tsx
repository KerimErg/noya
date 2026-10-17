import { MascotHead } from "./Mascot";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <MascotHead className="h-10 w-10 shrink-0" />
      <span className="font-display text-[22px] font-black uppercase italic leading-none tracking-tightest">
        Chez <span className="text-mario-bright">Mario</span>
      </span>
    </span>
  );
}
