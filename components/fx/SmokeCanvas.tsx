"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

// Fumée par « domain warping » de bruit fractal, poussée doucement par le curseur.
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uForce;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float ar = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * ar, uv.y);
  vec2 m = vec2(uMouse.x * ar, uMouse.y);
  float t = uTime * 0.045;

  vec2 d = p - m;
  float md = exp(-dot(d, d) * 7.0) * uForce;
  p += d * md * 0.45;

  vec2 q = vec2(fbm(p * 1.5 + vec2(0.0, -t * 2.0)), fbm(p * 1.5 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.3 + 2.6 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.3 + 2.6 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.15 + 2.2 * r + vec2(0.0, -t * 3.0));

  float smoke = smoothstep(0.38, 0.98, f);
  smoke *= mix(0.25, 1.0, smoothstep(1.1, 0.05, uv.y));

  vec3 base = vec3(0.055, 0.043, 0.035);
  vec3 gold = vec3(0.79, 0.635, 0.478);
  vec3 ember = vec3(0.88, 0.54, 0.29);
  vec3 col = base + mix(gold * 0.6, ember * 0.45, clamp(q.x * 1.2 - 0.2, 0.0, 1.0)) * smoke * 0.5;
  col += gold * md * 0.05;

  float vig = smoothstep(1.25, 0.15, length(uv - vec2(0.5, 0.42)));
  col *= mix(0.45, 1.0, vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

function isLowEnd(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (nav.connection?.saveData) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return true;
  if (coarse && (nav.hardwareConcurrency ?? 8) <= 4) return true;
  return false;
}

/**
 * Signature visuelle : fumée WebGL interactive. Désactivée si prefers-reduced-motion,
 * appareil modeste ou WebGL indisponible (le dégradé CSS du parent reste visible).
 */
export function SmokeCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowEnd()) return;

    let cleanup = () => {};
    const start = () => {
      const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) return;
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "a");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, "uRes");
      const uTime = gl.getUniformLocation(prog, "uTime");
      const uMouse = gl.getUniformLocation(prog, "uMouse");
      const uForce = gl.getUniformLocation(prog, "uForce");

      // Rendu à résolution réduite : la fumée est floue par nature, ça économise le GPU.
      const scale = 0.5;
      const resize = () => {
        const w = Math.max(1, Math.round(canvas.clientWidth * scale));
        const h = Math.max(1, Math.round(canvas.clientHeight * scale));
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      const mouse = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4, force: 0, target: 0 };
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
        mouse.target = 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(canvas);

      let raf = 0;
      const t0 = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;
        mouse.force += (mouse.target - mouse.force) * 0.04;
        mouse.target *= 0.985;
        gl.uniform1f(uTime, (now - t0) / 1000);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform1f(uForce, mouse.force);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      raf = requestAnimationFrame(frame);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Démarre après le premier rendu pour ne pas pénaliser le LCP.
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const id = ric ? ric(start, { timeout: 1200 }) : window.setTimeout(start, 300);
    return () => {
      if (!ric) clearTimeout(id);
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 2.4s cubic-bezier(.22,1,.36,1)" }}
    />
  );
}
