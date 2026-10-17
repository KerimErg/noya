import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = "Chez Mario — Kebab, tacos & burgers à Erstein";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const dir = path.join(process.cwd(), "node_modules/@fontsource/montserrat/files");
  const [black, blackItalic] = await Promise.all([
    readFile(path.join(dir, "montserrat-latin-900-normal.woff")),
    readFile(path.join(dir, "montserrat-latin-900-italic.woff")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#F7F2EA",
          fontFamily: "Montserrat",
          backgroundColor: "#0A0A0A",
          backgroundImage: "radial-gradient(circle at 80% 60%, rgba(216,30,26,.6), transparent 55%), radial-gradient(circle at 90% 90%, rgba(255,122,26,.55), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontStyle: "italic", letterSpacing: -1 }}>
          CHEZ <span style={{ color: "#FF4A3D", marginLeft: 10 }}>MARIO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 0.92, letterSpacing: -4, textTransform: "uppercase" }}>
          <span>Kebab, tacos</span>
          <span style={{ color: "#FF4A3D", fontStyle: "italic" }}>&amp; burgers</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30 }}>
          <span>{site.address.street} · {site.address.city}</span>
          <span style={{ background: "#FFC72C", color: "#0A0A0A", padding: "12px 26px", borderRadius: 999 }}>{site.phone.display}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: black, weight: 900, style: "normal" },
        { name: "Montserrat", data: blackItalic, weight: 900, style: "italic" },
      ],
    },
  );
}
