import type { Badge } from "@/content/menu";

const styles: Record<Badge, { label: string; cls: string }> = {
  signature: { label: "Signature", cls: "bg-coin text-coal" },
  "best-seller": { label: "Best-seller", cls: "bg-mario text-white" },
  nouveau: { label: "Nouveau", cls: "bg-emerald-400 text-coal" },
  epice: { label: "🌶 Épicé", cls: "bg-flame text-coal" },
};

export function BadgeList({ badges, className = "" }: { badges?: Badge[]; className?: string }) {
  if (!badges?.length) return null;
  return (
    <span className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((b) => (
        <span key={b} className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-black uppercase tracking-wider ${styles[b].cls}`}>
          {styles[b].label}
        </span>
      ))}
    </span>
  );
}
