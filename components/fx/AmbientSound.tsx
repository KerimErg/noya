"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

/**
 * Son d'ambiance génératif (Web Audio) : souffle filtré + nappe grave lente.
 * Aucun fichier audio, OFF par défaut, démarré uniquement par un clic.
 * Pour utiliser une vraie boucle sonore, remplacer par un <audio src="/audio/ambiance.mp3" loop>.
 */
export function AmbientSound({ className }: { className?: string }) {
  const t = useTranslations("footer");
  const [on, setOn] = useState(false);
  const ctxRef = useRef<{ ctx: AudioContext; master: GainNode } | null>(null);
  const onRef = useRef(false);

  const build = () => {
    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Bruit brun (souffle, fumée)
    const len = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < len; i++) {
        last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
        data[i] = last * 3.2;
      }
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 520;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.35;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain).connect(lp.frequency);
    noise.connect(lp).connect(noiseGain).connect(master);

    // Nappe grave (quinte, légèrement désaccordée)
    [55, 82.4, 110.2].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.detune.value = i * 4 - 4;
      const g = ctx.createGain();
      g.gain.value = 0.05 / (i + 1);
      o.connect(g).connect(master);
      o.start();
    });
    noise.start();
    lfo.start();
    return { ctx, master };
  };

  const toggle = async () => {
    if (!ctxRef.current) ctxRef.current = build();
    const { ctx, master } = ctxRef.current;
    const next = !onRef.current;
    if (next) await ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(next ? 0.22 : 0, ctx.currentTime, 0.8);
    onRef.current = next;
    if (!next) setTimeout(() => !onRef.current && ctx.state === "running" && ctx.suspend(), 3000);
    setOn(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? t("soundOff") : t("soundOn")}
      title={t("sound")}
      className={cn("group inline-flex h-9 items-center gap-2 rounded-full px-3 text-[11px] uppercase tracking-label text-smoke hover:text-gold", className)}
    >
      <span aria-hidden className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("w-[2px] rounded-full bg-current transition-all duration-500", on ? "animate-pulseDot" : "")}
            style={{ height: on ? `${[60, 100, 45, 80][i]}%` : "25%", animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{t("sound")}</span>
    </button>
  );
}
