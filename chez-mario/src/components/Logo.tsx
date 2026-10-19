/** Logo officiel Chez Mario (public/logo.png, détouré par scripts/extract-logo.mjs). */
export function Logo({ className = "h-14" }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/logo.webp" type="image/webp" />
      { }
      <img src="/logo.png" alt="Chez Mario — depuis 2007" width={359} height={480} className={`w-auto drop-shadow-[0_3px_0_rgba(31,26,23,.35)] ${className}`} />
    </picture>
  );
}
