import { isPlaceholder } from "@/lib/content";

/** Affiche une valeur de contenu ; les placeholders "[À COMPLÉTER]" sont mis en évidence. */
export function Value({ v, fallback }: { v: string; fallback?: string }) {
  if (isPlaceholder(v)) return <span className="placeholder-value">{fallback ?? v}</span>;
  return <>{v}</>;
}
