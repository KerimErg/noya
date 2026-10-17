import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "ghost" | "outline" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-wide transition-[background,color,box-shadow,border-color,transform] duration-300 ease-silk disabled:cursor-not-allowed disabled:opacity-40 select-none";
const variants: Record<Variant, string> = {
  gold: "bg-gold text-night hover:bg-gold-light hover:shadow-halo",
  ghost: "bg-cream/5 text-cream hover:bg-cream/10 border border-cream/10",
  outline: "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10",
  link: "text-gold underline-offset-4 hover:underline px-0",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

export function buttonClasses(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button({ variant, size, className, type = "button", ...rest }, ref) {
  return <button ref={ref} type={type} className={buttonClasses(variant, size, className)} {...rest} />;
});

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size };

export const ButtonLink = forwardRef<HTMLAnchorElement, AnchorProps>(function ButtonLink({ variant, size, className, ...rest }, ref) {
  return <a ref={ref} className={buttonClasses(variant, size, className)} {...rest} />;
});
