import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = "Chez Mario — Kebab, tacos & burgers à Erstein";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const font = await readFile(path.join(process.cwd(), "node_modules/@fontsource/lilita-one/files/lilita-one-latin-400-normal.woff"));
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
          color: "#1F1A17",
          fontFamily: "Lilita",
          backgroundColor: "#63C7F7",
          backgroundImage: "linear-gradient(180deg, #63C7F7 0%, #C9EEFF 78%, #2DA84B 78%, #2DA84B 84%, #B5651D 84%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 44 }}>
          CHEZ <span style={{ color: "#E52521", marginLeft: 12 }}>MARIO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, lineHeight: 0.95, textTransform: "uppercase", marginTop: -40 }}>
          <span style={{ color: "#FFFFFF", textShadow: "6px 6px 0 #1F1A17" }}>Kebab, tacos</span>
          <span style={{ color: "#E52521", textShadow: "6px 6px 0 #1F1A17" }}>&amp; burgers</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 32, color: "#FFFFFF" }}>
          <span>{site.address.street} · {site.address.city}</span>
          <span style={{ background: "#FFC81F", color: "#1F1A17", padding: "10px 26px", borderRadius: 20, border: "4px solid #1F1A17" }}>{site.phone.display}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Lilita", data: font, weight: 400, style: "normal" }],
    },
  );
}
