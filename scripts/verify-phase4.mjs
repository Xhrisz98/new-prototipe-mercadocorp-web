import puppeteer from "puppeteer-core";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3005";

const sitemap14 = [
  "/",
  "/tecnologia-automatizacion",
  "/aplicaciones-herramientas-digitales",
  "/ecommerce-inteligente",
  "/mind",
  "/marketing-digital",
  "/estrategia-creatividad-branding",
  "/auditoria-digital",
  "/gestion-eventos",
  "/nosotros",
  "/casos-de-exito",
  "/contacto",
  "/politicas-de-privacidad",
  "/terminos-y-condiciones",
];

const legalPages = [
  { id: "politicas", path: "/politicas-de-privacidad" },
  { id: "terminos", path: "/terminos-y-condiciones" },
];

async function verifyAll14Routes(browser) {
  console.log("=== Auditing All 14 Sitemap Routes for HTTP 200 ===");
  const page = await browser.newPage();
  let passedCount = 0;

  for (const route of sitemap14) {
    const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
    const status = response.status();
    if (status === 200) {
      console.log(`[200 OK] -> ${route}`);
      passedCount++;
    } else {
      console.error(`[FAIL ${status}] -> ${route}`);
    }
  }

  await page.close();
  if (passedCount !== sitemap14.length) {
    throw new Error(`Only ${passedCount}/${sitemap14.length} routes responded with 200 OK.`);
  }
  console.log(`All ${passedCount} sitemap routes verified with 200 OK! Zero 404s.`);
}

async function captureLegalPages(browser) {
  console.log("=== Capturing Legal Pages in Light/Dark & Mobile/Desktop ===");

  for (const item of legalPages) {
    const url = `${BASE_URL}${item.path}`;

    // Desktop Light
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-light-desktop.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-light-desktop.png`);
      await page.close();
    }

    // Desktop Dark
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-dark-desktop.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-dark-desktop.png`);
      await page.close();
    }

    // Mobile Light
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-light-mobile.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-light-mobile.png`);
      await page.close();
    }

    // Mobile Dark
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-dark-mobile.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-dark-mobile.png`);
      await page.close();
    }

    // Full Page Dark Desktop
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `page-${item.id}-dark-desktop.png`),
        fullPage: true,
      });
      console.log(`Saved page-${item.id}-dark-desktop.png`);
      await page.close();
    }
  }
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    await verifyAll14Routes(browser);
    await captureLegalPages(browser);
    console.log("Phase 4 Final QA and verification completed successfully!");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("QA failed:", err);
  process.exit(1);
});
