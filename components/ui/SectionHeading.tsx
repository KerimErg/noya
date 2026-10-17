import { cn } from "@/lib/cn";
import { RevealText } from "@/components/fx/RevealText";

export function SectionHeading({ label, title, intro, className, align = "left" }: { label: string; title: string; intro?: string; className?: string; align?: "left" | "center" }) {
  return (
    <header className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      <p className="label mb-5">{label}</p>
      <RevealText as="h2" text={title} className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.98]" />
      {intro && <p className={cn("mt-6 max-w-xl text-smoke", align === "center" && "mx-auto")}>{intro}</p>}
    </header>
  );
}
