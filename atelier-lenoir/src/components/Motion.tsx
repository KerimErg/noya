"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Instance Lenis partagée (navigation douce vers les ancres, blocage pendant le menu mobile). */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Défile en douceur jusqu'à une section (repli natif si Lenis est inactif). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Toutes les animations du site, pilotées par des attributs data-* posés dans le HTML :
 * data-split (titres ligne par ligne), data-reveal (fondu), data-clip (dévoilement d'image),
 * data-parallax, data-words (texte qui s'allume au défilement), data-count (compteurs),
 * data-line / data-progress (traits), data-hscroll (galerie horizontale), data-marquee.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("motion");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let ctx: gsap.Context | null = null;
    let mm: gsap.MatchMedia | null = null;
    let alive = true;

    // On attend les polices : les découpes en lignes dépendent de la largeur réelle du texte.
    document.fonts.ready.then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        mm = build();
      });
      ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      mm?.revert();
      ctx?.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  return null;
}

function build() {
  const q = <T extends HTMLElement = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
  const mm = gsap.matchMedia();

  // Titres : chaque ligne glisse hors d'un masque.
  q("[data-split]").forEach((el) => {
    const intro = el.dataset.split === "intro";
    gsap.set(el, { opacity: 1 });
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          rotate: 2,
          transformOrigin: "0% 100%",
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.09,
          delay: intro ? 0.15 : Number(el.dataset.delay ?? 0),
          scrollTrigger: intro ? undefined : { trigger: el, start: "top 88%" },
        }),
    });
  });

  // Fondus simples.
  q("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: el.dataset.reveal === "intro" ? undefined : { trigger: el, start: "top 90%" },
      },
    );
  });

  // Visuels : rideau qui remonte + léger dézoom de l'image.
  q("[data-clip]").forEach((el) => {
    const inner = el.querySelector("svg, img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
    tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.inOut" });
    if (inner) tl.from(inner, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.2);
  });

  // Parallaxe.
  q("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax || 15);
    gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // Manifeste : les mots s'allument au fil du défilement.
  q("[data-words]").forEach((el) => {
    gsap.set(el, { opacity: 1 });
    const split = SplitText.create(el, { type: "words" });
    gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
  });

  // Compteurs.
  q("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const value = { n: 0 };
    el.textContent = "0";
    gsap.to(value, {
      n: target,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => {
        el.textContent = Math.round(value.n).toLocaleString("fr-FR");
      },
    });
  });

  // Filets horizontaux qui se tracent.
  q("[data-line]").forEach((el) => {
    gsap.from(el, { scaleX: 0, transformOrigin: "0% 50%", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%" } });
  });

  // Ligne de progression verticale (méthode).
  q("[data-progress]").forEach((el) => {
    gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top 60%", end: "bottom 60%", scrub: true } });
  });

  // Héros : le visuel s'élargit jusqu'aux bords pendant le défilement.
  q("[data-hero-media]").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 6% 0% 6%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top 15%", scrub: true } },
    );
  });

  // Bandeau défilant : accélère et change de sens selon le défilement.
  q("[data-marquee]").forEach((el) => {
    const loop = gsap.to(el, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const speed = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 250);
        gsap.to(loop, {
          timeScale: speed * self.direction,
          duration: 0.25,
          overwrite: true,
          onComplete: () => void gsap.to(loop, { timeScale: self.direction, duration: 1.2 }),
        });
      },
    });
  });

  // En-tête : se cache en descendant, réapparaît en remontant.
  const header = document.querySelector("[data-header]");
  if (header) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => header.classList.toggle("is-hidden", self.direction === 1 && self.scroll() > 240),
    });
  }

  // Galerie des réalisations : défilement horizontal épinglé (tablette et ordinateur).
  mm.add("(min-width: 768px)", () => {
    q("[data-hscroll]").forEach((section) => {
      const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
      const bar = section.querySelector<HTMLElement>("[data-hscroll-bar]");
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      // Chaque visuel glisse légèrement à l'intérieur de son cadre.
      section.querySelectorAll<HTMLElement>("[data-hscroll-inner]").forEach((inner) => {
        gsap.fromTo(inner, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: inner, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    });
  });

  // Curseur et aperçu flottant des prestations (souris uniquement).
  mm.add("(pointer: fine) and (min-width: 1024px)", () => {
    const cursor = document.querySelector<HTMLElement>("[data-cursor]");
    const preview = document.querySelector<HTMLElement>("[data-preview]");
    const xTo = cursor && gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = cursor && gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    const pxTo = preview && gsap.quickTo(preview, "x", { duration: 0.8, ease: "power3" });
    const pyTo = preview && gsap.quickTo(preview, "y", { duration: 0.8, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      xTo?.(e.clientX);
      yTo?.(e.clientY);
      pxTo?.(e.clientX);
      pyTo?.(e.clientY);
      const interactive = (e.target as Element | null)?.closest("a, button, input, select, textarea, label");
      if (cursor) gsap.to(cursor, { scale: interactive ? 3.2 : 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };
    window.addEventListener("pointermove", onMove);
    if (cursor) gsap.to(cursor, { opacity: 1, duration: 0.4 });

    const items = q("[data-preview-item]");
    const slides = preview ? gsap.utils.toArray<HTMLElement>("[data-preview-slide]", preview) : [];
    const show = (index: number) => {
      if (!preview) return;
      gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      slides.forEach((slide, i) => gsap.to(slide, { opacity: i === index ? 1 : 0, duration: 0.4, overwrite: "auto" }));
    };
    const hide = () => preview && gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    const handlers = items.map((item) => {
      const enter = () => show(Number(item.dataset.previewItem));
      item.addEventListener("pointerenter", enter);
      item.addEventListener("pointerleave", hide);
      return () => {
        item.removeEventListener("pointerenter", enter);
        item.removeEventListener("pointerleave", hide);
      };
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      handlers.forEach((off) => off());
    };
  });

  return mm;
}
