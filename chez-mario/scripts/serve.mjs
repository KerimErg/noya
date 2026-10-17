// Petit serveur statique pour tester le dossier out/ (équivalent local de Cloudflare Pages).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { brotliCompressSync, constants } from "node:zlib";

const root = path.resolve("out");
const port = Number(process.env.PORT ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm", ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };

async function resolve(url) {
  const clean = decodeURIComponent(url.split("?")[0]);
  const base = path.join(root, path.normalize(clean).replace(/^(\.\.[/\\])+/, ""));
  for (const p of [base, `${base}.html`, path.join(base, "index.html")]) {
    try { if ((await stat(p)).isFile()) return p; } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolve(req.url ?? "/");
  const target = file ?? path.join(root, "404.html");
  if (target.endsWith("opengraph-image")) { res.writeHead(200, { "Content-Type": "image/png" }); return res.end(await readFile(target)); }
  const type = types[path.extname(target)] ?? "application/octet-stream";
  let body = await readFile(target);
  // Comme Cloudflare : compression Brotli des textes et cache long des fichiers versionnés.
  const headers = { "Content-Type": type };
  if (/text|javascript|json|svg|xml/.test(type) && /\bbr\b/.test(req.headers["accept-encoding"] ?? "")) {
    body = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } });
    headers["Content-Encoding"] = "br";
  }
  if (target.includes(`${path.sep}_next${path.sep}static${path.sep}`)) headers["Cache-Control"] = "public, max-age=31536000, immutable";
  res.writeHead(file ? 200 : 404, headers);
  res.end(body);
}).listen(port, () => console.log(`http://localhost:${port}`));
