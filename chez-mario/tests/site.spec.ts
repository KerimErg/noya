import { expect, test } from "@playwright/test";

const shots = "screenshots";

test("accueil : bannière, boutons, sections", async ({ page }, info) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/kebab/i);
  // Boutons « Voir la carte » et « Appeler » visibles sans défiler
  await expect(page.getByRole("link", { name: /voir la carte/i }).first()).toBeVisible();
  await expect(page.locator('a[href^="tel:"]:visible').first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /classiques/i })).toBeVisible();
  await page.screenshot({ path: `${shots}/${info.project.name}-accueil-haut.png` });
  // Les boutons restent visibles après défilement
  await page.mouse.wheel(0, 2500);
  await page.waitForTimeout(300);
  const call = info.project.name === "iphone" ? page.getByLabel(/Appeler Chez Mario/) : page.locator('header a[href^="tel:"]');
  await expect(call).toBeInViewport();
  const carte = info.project.name === "iphone" ? page.getByRole("link", { name: "Voir la carte" }).last() : page.locator("header").getByRole("link", { name: "Voir la carte" });
  await expect(carte).toBeInViewport();
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("in")));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${shots}/${info.project.name}-accueil-complet.png`, fullPage: true });
});

test("carte : catégories, prix réels, barre collante", async ({ page }, info) => {
  await page.goto("/carte");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("carte");
  const nav = page.getByRole("navigation", { name: "Catégories de la carte" });
  await expect(nav).toBeVisible();
  await expect(page.locator("#sandwichs")).toContainText("Maxi Kebab");
  await expect(page.locator("#sandwichs")).toContainText("13,00");
  await expect(page.locator("#tacos")).toContainText("Samouraï");
  await expect(page.locator("#a-cote")).toContainText("2,00");
  // Prix menu calculé : Kebab 8 € → menu 11 €
  await expect(page.locator("#sandwichs")).toContainText("11,00");
  await nav.getByRole("link", { name: "Burgers" }).click();
  await page.waitForTimeout(800);
  await expect(nav).toBeInViewport();
  await expect(page.locator("#burgers-title")).toBeInViewport();
  await expect(nav.getByRole("link", { name: "Burgers" })).toHaveAttribute("aria-current", "true");
  await page.screenshot({ path: `${shots}/${info.project.name}-carte-burgers.png` });
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("in")));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${shots}/${info.project.name}-carte-complete.png`, fullPage: true });
});

test("contact, pages légales, 404", async ({ page }, info) => {
  await page.goto("/contact");
  await expect(page.locator('a[href="tel:+33388986994"]:visible').first()).toBeVisible();
  await page.screenshot({ path: `${shots}/${info.project.name}-contact.png`, fullPage: true });
  await page.goto("/mentions-legales");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mentions légales");
  await page.goto("/confidentialite");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Confidentialité");
  const res = await page.goto("/cette-page-nexiste-pas");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /retour à l'accueil/i })).toBeVisible();
  await page.screenshot({ path: `${shots}/${info.project.name}-404.png` });
});

test("aucun débordement horizontal", async ({ page }) => {
  for (const url of ["/", "/carte", "/contact", "/mentions-legales", "/confidentialite"]) {
    await page.goto(url);
    const [sw, vw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(sw, url).toBeLessThanOrEqual(vw);
  }
});

test("au rechargement, la page repart du haut", async ({ page }) => {
  await page.goto("/carte");
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(200);
  await page.reload();
  await page.waitForLoadState("load");
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test("navigation clavier : lien d'évitement et focus visible", async ({ page, browserName }, info) => {
  test.skip(info.project.name === "iphone", "clavier testé sur ordinateur");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  expect(browserName).toBe("chromium");
});

test("SEO : données structurées Restaurant", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(json!);
  expect(data["@type"]).toBe("Restaurant");
  expect(data.address.addressLocality).toBe("Erstein");
  expect(data.hasMenu.hasMenuSection.length).toBeGreaterThan(5);
});
