import { useId } from "react";

export type PlateVariant = "arche" | "moulures" | "facade" | "escalier" | "beton" | "nuancier";

/**
 * Visuels monochromes dessinés en SVG (intérieurs, matières, nuancier) :
 * ils remplacent les photos tant que l'agence n'a pas fourni les siennes.
 */
export function Plate({ variant, image, alt = "", className = "" }: { variant: PlateVariant; image?: string; alt?: string; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;

  if (image) {
    return (
      <div className={`grain overflow-hidden bg-paper-dim ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale" />
      </div>
    );
  }

  return (
    <div className={`grain overflow-hidden bg-paper-dim ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="h-full w-full" data-plate-inner>
        <defs>
          <linearGradient id={id("wall")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ECEBE7" />
            <stop offset="1" stopColor="#B4B4AF" />
          </linearGradient>
          <linearGradient id={id("dark")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#151515" />
            <stop offset="1" stopColor="#3A3A38" />
          </linearGradient>
          <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9C9C97" />
            <stop offset="1" stopColor="#6E6E6A" />
          </linearGradient>
          <radialGradient id={id("spot")} cx="0.3" cy="0.2" r="0.8">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <filter id={id("plaster")} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="4" seed="7" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.9 -0.1" />
          </filter>
        </defs>
        {variant === "arche" && <Arche id={id} />}
        {variant === "moulures" && <Moulures id={id} />}
        {variant === "facade" && <Facade id={id} />}
        {variant === "escalier" && <Escalier id={id} />}
        {variant === "beton" && <Beton id={id} />}
        {variant === "nuancier" && <Nuancier id={id} />}
      </svg>
    </div>
  );
}

type P = { id: (name: string) => string };
const url = (id: string) => `url(#${id})`;

function Arche({ id }: P) {
  return (
    <>
      <rect width="800" height="1000" fill={url(id("wall"))} />
      <rect width="800" height="1000" fill={url(id("spot"))} />
      <path d="M250 800V430a150 150 0 0 1 300 0v370Z" fill={url(id("dark"))} />
      <path d="M262 800V432a138 138 0 0 1 276 0v368Z" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="2" />
      <path d="M330 800 450 470h60l-40 330Z" fill="#fff" opacity=".07" />
      <rect y="800" width="800" height="200" fill={url(id("floor"))} />
      <rect y="792" width="800" height="10" fill="#F2F2EE" />
      <path d="M0 0h520L120 1000H0Z" fill="#000" opacity=".06" />
      <circle cx="660" cy="700" r="46" fill="#1A1A1A" />
      <rect x="652" y="740" width="16" height="60" fill="#1A1A1A" />
      <ellipse cx="660" cy="806" rx="70" ry="8" fill="#000" opacity=".18" />
    </>
  );
}

function Moulures({ id }: P) {
  const panel = (x: number, y: number, w: number, h: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="5" />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} fill="none" stroke="#000" strokeOpacity=".14" strokeWidth="3" />
    </g>
  );
  return (
    <>
      <rect width="800" height="1000" fill={url(id("wall"))} />
      <rect width="800" height="1000" fill={url(id("spot"))} />
      <rect width="800" height="70" fill="#F7F7F4" />
      <rect y="70" width="800" height="14" fill="#000" opacity=".08" />
      {panel(80, 150, 280, 470)}
      {panel(440, 150, 280, 470)}
      {panel(80, 690, 280, 180)}
      {panel(440, 690, 280, 180)}
      <rect y="910" width="800" height="90" fill="#E9E9E5" />
      <rect y="904" width="800" height="8" fill="#000" opacity=".1" />
      <path d="M800 0v1000H460Z" fill="#000" opacity=".05" />
    </>
  );
}

function Facade({ id }: P) {
  const windows = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      const x = 150 + c * 190;
      const y = 170 + r * 190;
      windows.push(
        <g key={`${r}-${c}`}>
          <rect x={x - 8} y={y - 8} width="136" height="146" fill="#F4F4F1" />
          <rect x={x} y={y} width="120" height="130" fill={url(id("dark"))} />
          <path d={`M${x + 60} ${y}v130M${x} ${y + 48}h120`} stroke="#E8E8E4" strokeWidth="5" />
          <rect x={x - 14} y={y + 138} width="148" height="10" fill="#DADAD6" />
        </g>,
      );
    }
  }
  return (
    <>
      <rect width="800" height="1000" fill="#D9D9D5" />
      <rect x="90" y="80" width="620" height="920" fill={url(id("wall"))} />
      <rect x="70" y="80" width="660" height="24" fill="#EEEEEA" />
      <rect x="90" y="104" width="620" height="18" fill="#000" opacity=".1" />
      {windows}
      <path d="M90 80h620L90 900Z" fill="#fff" opacity=".1" />
    </>
  );
}

function Escalier({ id }: P) {
  const steps = Array.from({ length: 11 }, (_, i) => {
    const x = 60 + i * 64;
    const y = 900 - i * 66;
    return (
      <g key={i}>
        <rect x={x} y={y} width={800 - x} height="14" fill="#F2F2EE" />
        <rect x={x} y={y + 14} width={800 - x} height="52" fill="#4A4A47" />
        <rect x={x} y={y + 14} width={800 - x} height="10" fill="#000" opacity=".35" />
      </g>
    );
  });
  return (
    <>
      <rect width="800" height="1000" fill={url(id("dark"))} />
      <path d="M0 0h420L800 520V0Z" fill="#fff" opacity=".05" />
      {steps}
      <path d="M90 880 774 160" stroke="#E6E6E2" strokeWidth="6" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${92 + i * 64} ${884 - i * 66}v-${84}`} stroke="#E6E6E2" strokeWidth="3" />
      ))}
    </>
  );
}

function Beton({ id }: P) {
  return (
    <>
      <rect width="800" height="1000" fill="#BDBDB8" />
      <rect width="800" height="1000" filter={url(id("plaster"))} opacity=".75" />
      <rect width="800" height="1000" fill={url(id("spot"))} />
      <g fill="none" stroke="#fff" strokeOpacity=".22" strokeLinecap="round">
        <path d="M-40 260C160 180 380 320 620 230S860 210 900 240" strokeWidth="38" />
        <path d="M-60 560C120 500 320 640 560 540S820 520 880 560" strokeWidth="26" />
        <path d="M-20 820C200 760 420 900 640 800" strokeWidth="44" />
      </g>
      <g fill="none" stroke="#000" strokeOpacity=".08" strokeLinecap="round">
        <path d="M-40 300C160 220 380 360 620 270" strokeWidth="10" />
        <path d="M-60 600C120 540 320 680 560 580" strokeWidth="8" />
      </g>
    </>
  );
}

function Nuancier({ id }: P) {
  const tones = ["#F3F3F0", "#D6D6D2", "#A9A9A5", "#76766F", "#45453F", "#141414"];
  return (
    <>
      <rect width="800" height="1000" fill="#E4E4E0" />
      <rect width="800" height="1000" fill={url(id("spot"))} />
      <ellipse cx="400" cy="905" rx="250" ry="18" fill="#000" opacity=".12" />
      {tones.map((tone, i) => (
        <g key={tone} transform={`rotate(${-30 + i * 12} 400 880)`}>
          <rect x="330" y="260" width="140" height="620" fill={tone} stroke="#000" strokeOpacity=".08" />
          <rect x="330" y="800" width="140" height="80" fill="#FAFAF7" />
          <text x="346" y="836" fontSize="15" fontFamily="Helvetica, Arial, sans-serif" letterSpacing="3" fill="#111">
            N°{String(i + 1).padStart(2, "0")}
          </text>
          <rect x="346" y="850" width="60" height="2" fill="#111" opacity=".5" />
        </g>
      ))}
    </>
  );
}
