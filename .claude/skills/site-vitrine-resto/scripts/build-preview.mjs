// Construit un aperçu autonome (une seule page HTML) d'un site vitrine pour un Artifact.
// Usage : node build-preview.mjs <dossier-du-site> <sortie.html>
// Prérequis : `npm run build` fait, et `node scripts/serve.mjs` lancé dans le dossier du site (port 4173).
import { createRequire } from "node:module";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
const SITE = path.resolve(process.argv[2]);
const require = createRequire(SITE + "/package.json");
const { chromium, devices } = require("@playwright/test");
const OUT = process.argv[3];
const imgFiles = await readdir(path.join(SITE, "public/img"));
/** Variante WebP la plus proche de la largeur voulue. */
const pick = (n, want) => {
  const ws = imgFiles.map((f) => f.match(new RegExp(`^${n}-(\\d+)\\.webp$`))).filter(Boolean).map((m) => +m[1]);
  const w = ws.sort((a, b) => Math.abs(a - want) - Math.abs(b - want))[0];
  return `${n}-${w}.webp`;
};

// CSS avec polices en data URI
const cssDir = path.join(SITE, "out/_next/static/css");
let css = await readFile(path.join(cssDir, (await readdir(cssDir))[0]), "utf8");
for (const m of [...css.matchAll(/url\((\/_next\/static\/media\/[^)]+\.woff2)\)/g)]) {
  const b64 = (await readFile(path.join(SITE, "out", m[1]))).toString("base64");
  css = css.replaceAll(m[0], `url(data:font/woff2;base64,${b64})`);
}

const pages = { accueil: "/", carte: "/carte", contact: "/contact", "mentions-legales": "/mentions-legales", confidentialite: "/confidentialite" };
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await (await b.newContext({ ...devices["iPhone 13"] })).newPage();
const templates = {};
const titles = {};
let phone = { display: "", tel: "" };
let mapsQuery = "";
let htmlClass = "";
let mobileMenu = "";
for (const [key, url] of Object.entries(pages)) {
  await p.goto("http://localhost:4173" + url);
  await p.waitForLoadState("networkidle");
  if (key === "accueil") {
    htmlClass = await p.evaluate(() => document.documentElement.className.replace(/\bjs\b/, "").trim());
    await p.click('button[aria-controls="mobile-menu"]');
    mobileMenu = await p.locator("#mobile-menu").evaluate((e) => e.outerHTML);
    await p.click('button[aria-controls="mobile-menu"]');
  }
  titles[key] = await p.title();
  if (!phone.tel) phone = await p.evaluate(() => { const a = document.querySelector('a[href^="tel:"]'); return a ? { tel: a.getAttribute("href").slice(4), display: (a.textContent.match(/[0-9][0-9 .]{8,}/) || [""])[0].trim() } : { display: "", tel: "" }; });
  if (!mapsQuery) mapsQuery = await p.evaluate(() => { const f = document.querySelector('iframe[title^="Plan"]'); return f ? new URL(f.src).searchParams.get("q") || "" : ""; });
  templates[key] = await p.evaluate(() => {
    const clone = document.body.cloneNode(true);
    clone.querySelectorAll("script, next-route-announcer, [hidden]").forEach((e) => e.remove());
    clone.querySelectorAll("[data-reveal]").forEach((e) => e.classList.remove("in"));
    return clone.innerHTML;
  });
}
await b.close();

const route = (href) => {
  if (href === "/") return "#accueil";
  const [p1, hash] = href.split("#");
  if (p1 === "/carte" && hash) return `#${hash}`;
  const k = p1.replace(/^\//, "");
  return k in pages ? `#${k}` : href;
};
const fixLinks = (html) => html.replace(/href="(\/[^"]*)"/g, (_, h) => `href="${route(h)}"`).replace(/href="#([a-z0-9-]+)"/g, (m) => m);
// Photos intégrées en data URI (une seule taille WebP), sans <source>
const imgCache = {};
async function inlineImages(html) {
  html = html.replace(/<source[^>]*>/g, "").replace(/\s(srcset|sizes)="[^"]*"/g, "");
  const names = [...new Set([...html.matchAll(/src="\/img\/([a-z0-9-]+?)-\d+\.webp"/g)].map((m) => m[1]))];
  for (const n of names) {
    const file = pick(n, /^(banniere|hero)/.test(n) ? 1400 : 600);
    imgCache[n] ??= "data:image/webp;base64," + (await readFile(path.join(SITE, "public/img", file))).toString("base64");
    html = html.replace(new RegExp(`src="/img/${n}-\\d+\\.webp"`, "g"), `src="${imgCache[n]}"`);
  }
  return html;
}
const logoUri = "data:image/webp;base64," + (await readFile(path.join(SITE, "public/logo.webp"))).toString("base64");
const inlineLogo = (h) => h.replace(/<source srcSet="\/logo\.webp"[^>]*>/g, "").replace(/src="\/logo\.png"/g, `src="${logoUri}"`);
const noIframe = (h) => h.replace(/<iframe[^>]*title="Plan[^"]*"[^>]*><\/iframe>/g, '<a href="' + "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapsQuery) + '" target="_blank" rel="noopener noreferrer" style="flex:1;min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:repeating-linear-gradient(0deg,#C8F0D0 0 38px,#fff 38px 46px),#C8F0D0;color:#1F1A17;font-weight:800;text-decoration:none"><span style="font-size:42px">📍</span><span style="background:#fff;border:3px solid #1F1A17;border-radius:14px;padding:8px 14px;box-shadow:3px 3px 0 #1F1A17">Ouvrir le plan dans Google Maps</span><span style="font-size:12px;font-weight:600">(le plan s\'affiche directement sur le site en ligne)</span></a>');
for (const k in templates) templates[k] = noIframe(templates[k]);
for (const k in templates) templates[k] = inlineLogo(await inlineImages(fixLinks(templates[k])));
mobileMenu = fixLinks(mobileMenu);

const script = `
(function(){
  var T = ${JSON.stringify(templates)};
  var MENU = ${JSON.stringify(mobileMenu)};
  var PAGES = ${JSON.stringify(Object.keys(pages))};
  var TITLES = ${JSON.stringify(titles)};
  var de = document.documentElement;
  de.className += " js ${htmlClass}";
  de.lang = "fr";
  var root = document.getElementById("site");
  var io = null, current = null;
  function reveal(){
    if (io) io.disconnect();
    var els = root.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { els.forEach(function(e){e.classList.add("in")}); return; }
    io = new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function(e){ var r=e.getBoundingClientRect(); if (r.top < innerHeight) e.classList.add("in"); else io.observe(e); });
  }
  function header(){
    var h = root.querySelector("header");
    if (!h) return;
    var solid = "border-ink bg-white".split(" ");
    var clear = "border-transparent bg-transparent".split(" ");
    function upd(){ var s = scrollY > 24 || h.querySelector("#mobile-menu"); solid.forEach(function(c){h.classList.toggle(c, !!s)}); clear.forEach(function(c){h.classList.toggle(c, !s)}); }
    window.onscroll = function(){ upd(); spy(); };
    upd();
    var btn = h.querySelector('button[aria-controls="mobile-menu"]');
    if (btn) btn.onclick = function(){
      var open = h.querySelector("#mobile-menu");
      if (open) { open.remove(); btn.setAttribute("aria-expanded","false"); btn.setAttribute("aria-label","Ouvrir le menu"); document.body.style.overflow=""; }
      else { h.insertAdjacentHTML("beforeend", MENU); btn.setAttribute("aria-expanded","true"); btn.setAttribute("aria-label","Fermer le menu"); document.body.style.overflow="hidden"; }
      upd();
    };
  }
  var spyItems = [];
  function spy(){
    if (!spyItems.length) return;
    var line = 176, cur = spyItems[0].id;
    spyItems.forEach(function(it){ var el=document.getElementById(it.id); if (el && el.getBoundingClientRect().top <= line) cur = it.id; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = spyItems[spyItems.length-1].id;
    spyItems.forEach(function(it){
      var on = it.id === cur;
      if (on) it.a.setAttribute("aria-current","true"); else it.a.removeAttribute("aria-current");
      var ACT = { red: "bg-mario text-white", green: "bg-luigi-dark text-white", blue: "bg-royal text-white", yellow: "bg-coin text-ink" };
      var all = "bg-mario bg-luigi-dark bg-royal bg-coin text-white text-ink bg-white hover:bg-coin-light shadow-pop-sm".split(" ");
      all.forEach(function(c){ it.a.classList.remove(c) });
      (on ? (ACT[it.a.dataset.color] + " shadow-pop-sm") : "bg-white text-ink hover:bg-coin-light").split(" ").forEach(function(c){ it.a.classList.add(c) });
      if (on && it.last !== true) { var ul = it.a.closest("ul"); var li = it.a.parentElement; ul.scrollTo({ left: li.offsetLeft - ul.clientWidth/2 + li.clientWidth/2, behavior: "smooth" }); }
      it.last = on;
    });
  }
  function setupSpy(){
    var nav = root.querySelector('nav[aria-label="Catégories de la carte"]');
    spyItems = nav ? Array.prototype.map.call(nav.querySelectorAll("a"), function(a){ return { id: a.getAttribute("href").slice(1), a: a }; }) : [];
  }
  function maps(){
    root.querySelectorAll("button").forEach(function(b){
      if (b.textContent.trim() === "Afficher le plan") {
        var itin = b.parentElement.querySelector("a");
        var a = document.createElement("a"); a.href = itin ? itin.href : "#"; a.target = "_blank"; a.rel = "noopener noreferrer";
        a.className = b.className; a.textContent = "Ouvrir Google Maps"; b.replaceWith(a);
      }
    });
  }
  function show(hash){
    var key = (hash || "").replace("#","") || "accueil";
    var page = PAGES.indexOf(key) >= 0 ? key : null;
    var target = null;
    if (!page) { if (/^[a-z0-9-]+$/.test(key) && T.carte.indexOf('id="' + key + '"') >= 0) { page = "carte"; target = key; } else if (current && document.getElementById(key)) { document.getElementById(key).scrollIntoView(); return; } else { page = "accueil"; } }
    var sameTop = (page === current && !target);
    if (sameTop) { scrollTo({ top: 0, behavior: "smooth" }); }
    if (page !== current) {
      document.body.style.overflow = "";
      root.innerHTML = T[page];
      current = page;
      header(); setupSpy(); maps(); reveal();
      document.title = TITLES[page];
      if (!target) scrollTo(0, 0);
    }
    if (target) { var el = document.getElementById(target); if (el) el.scrollIntoView({ behavior: page === current ? "smooth" : "auto" }); }
    spy();
  }
  document.addEventListener("click", function(e){
    var t = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!t || t.closest("#call-modal")) return;
    e.preventDefault();
    var old = document.getElementById("call-modal"); if (old) old.remove();
    var num = ${JSON.stringify(phone.display)};
    var m = document.createElement("div");
    m.id = "call-modal";
    m.setAttribute("role","dialog"); m.setAttribute("aria-label","Appeler le restaurant");
    m.style.cssText = "position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(31,26,23,.55);padding:16px";
    m.innerHTML = '<div style="background:#fff;border:4px solid #1F1A17;border-radius:24px;box-shadow:8px 8px 0 #1F1A17;padding:24px;max-width:340px;width:100%;text-align:center;font-family:inherit">'
      + '<div style="font-size:40px">📞</div><p style="margin:6px 0 2px;font-weight:800;color:#5C5248">Appeler le restaurant</p>'
      + '<p style="margin:0 0 16px;font-size:30px;font-weight:900;letter-spacing:.02em;user-select:all">' + num + '</p>'
      + '<a href="tel:' + ${JSON.stringify(phone.tel)} + '" class="btn btn-red" style="width:100%;margin-bottom:10px">Appeler</a>'
      + '<button type="button" data-copy class="btn btn-coin" style="width:100%;margin-bottom:10px">Copier le numéro</button>'
      + '<button type="button" data-close style="font-weight:800;text-decoration:underline;background:none;border:0;cursor:pointer">Fermer</button></div>';
    document.body.appendChild(m);
    m.addEventListener("click", function(ev){
      if (ev.target === m || ev.target.closest("[data-close]")) m.remove();
      var c = ev.target.closest("[data-copy]");
      if (c) { (navigator.clipboard ? navigator.clipboard.writeText(num) : Promise.reject()).then(function(){ c.textContent = "Numéro copié ✓"; }, function(){ c.textContent = num; }); }
    });
  }, true);
  window.addEventListener("hashchange", function(){ show(location.hash); });
  root.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest('button[aria-controls="mosaique"]');
    if (!b) return;
    var ul = document.getElementById("mosaique"); if (!ul) return;
    var card = ul.firstElementChild, step = card ? card.offsetWidth + 12 : ul.clientWidth * 0.7;
    var dir = /suivante/.test(b.getAttribute("aria-label")) ? 1 : -1;
    var max = ul.scrollWidth - ul.clientWidth;
    var to = ul.scrollLeft + dir * step;
    if (dir > 0 && ul.scrollLeft >= max - 4) to = 0; else if (dir < 0 && ul.scrollLeft <= 4) to = max;
    ul.scrollTo({ left: to, behavior: "smooth" });
  });
  root.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute("href");
    if (h === "#contenu") return;
    e.preventDefault();
    var m = root.querySelector("#mobile-menu"); if (m) { m.remove(); document.body.style.overflow = ""; }
    if (location.hash === h) show(h); else { try { history.pushState(null, "", h); } catch (err) {} show(h); }
  });
  window.addEventListener("popstate", function(){ show(location.hash); });
  show(location.hash);
})();`;

const html = `<title>${titles.accueil || "Aperçu du site"}</title>
<style>:root{color-scheme:light}${css}</style>
<div id="site"></div>
<script>${script.replace(/<\/script/g, "<\\/script")}</script>
`;
await writeFile(OUT, html);
console.log("ok", (html.length / 1024).toFixed(0) + " KB");
