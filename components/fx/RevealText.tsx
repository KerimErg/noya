"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

/** Titre révélé mot par mot (masque + glissement) à l'entrée dans le viewport. */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <Tag className={className}>{text}</Tag>;
  const words = text.split(" ");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };
  return (
    <Tag className={className} aria-label={text}>
      <motion.span initial="hidden" {...trigger} transition={{ staggerChildren: 0.06, delayChildren: delay }} aria-hidden className="inline">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Bloc qui apparaît en fondu + légère montée. */
export function Reveal({ children, className, delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "p" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </M>
  );
}
