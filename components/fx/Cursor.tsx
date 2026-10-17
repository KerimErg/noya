"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Curseur discret : petit cercle or qui s'agrandit sur les éléments cliquables. Desktop + pointeur fin uniquement. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 600, damping: 40, mass: 0.3 });
  const y = useSpring(my, { stiffness: 600, damping: 40, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHover(!!t?.closest?.("a, button, [role='button'], label, select, [data-cursor='hover']"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [mx, my]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-gold mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hover ? 44 : 10,
        height: hover ? 44 : 10,
        backgroundColor: hover ? "rgba(201,162,122,0.12)" : "rgba(201,162,122,1)",
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
