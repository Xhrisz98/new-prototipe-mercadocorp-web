import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3005";

const pagesToCapture = [
  { id: "mind", path: "/mind" },
  { id: "nosotros", path: "/nosotros" },
  { id: "casos-de-exito", path: "/casos-de-exito" },
  { id: "contacto", path: "/contacto" },
];

const expectedLinks = {
  "/mind": [
    "/tecnologia-automatizacion",
    "/ecommerce-inteligente",
    "/casos-de-exito",
    "/contacto",
  ],
  "/nosotros": [
    "/casos-de-exito",
    "/tecnologia-automatizacion",
    "/contacto",
    "/marketing-digital",
  ],
  "/casos-de-exito": [
    "/tecnologia-automatizacion",
    "/marketing-digital",
    "/mind",
    "/contacto",
  ],
  "/contacto": [
    "/casos-de-exito",
    "/mind",
    "/auditoria-digital",
    "/tecnologia-automatizacion",
  ],
};

async function verifyInternalLinks(browser) {
  console.log("=== Checking Internal Links in Rendered DOM for Phase 3 ===");
  const page = await browser.newPage();
  let totalLinksFound = 0;
  let missingLinks = 0;

  for (const [pagePath, targets] of Object.entries(expectedLinks)) {
    const url = `${BASE_URL}${pagePath}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 600));

    const pageHrefs = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a[href]"));
      return anchors.map((a) => a.getAttribute("href"));
    });

    console.log(`Checking links for ${pagePath}:`);
    for (const target of targets) {
      const exists = pageHrefs.some((href) => href === target || href?.startsWith(target));
      if (exists) {
        console.log(`  [OK] -> ${target}`);
        totalLinksFound++;
      } else {
        console.error(`  [FAIL] Missing link to ${target}`);
        missingLinks++;
      }
    }
  }

  await page.close();
  if (missingLinks > 0) {
    throw new Error(`Found ${missingLinks} missing internal links!`);
  }
  console.log(`All ${totalLinksFound} required Phase 3 internal links successfully verified.`);
}

async function capturePages(browser) {
  console.log("=== Capturing Desktop & Mobile, Light & Dark Screenshots for Phase 3 ===");

  for (const item of pagesToCapture) {
    const url = `${BASE_URL}${item.path}`;

    // 1. Desktop Light (1440x900)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-light-desktop.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-light-desktop.png`);
      await page.close();
    }

    // 2. Desktop Dark (1440x900)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-dark-desktop.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-dark-desktop.png`);
      await page.close();
    }

    // 3. Mobile Light (375x812)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-light-mobile.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-light-mobile.png`);
      await page.close();
    }

    // 4. Mobile Dark (375x812)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, `hero-${item.id}-dark-mobile.png`),
        fullPage: false,
      });
      console.log(`Saved hero-${item.id}-dark-mobile.png`);
      await page.close();
    }

    // 5. Full Page Dark Desktop
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 800));
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
    await verifyInternalLinks(browser);
    await capturePages(browser);
    console.log("Phase 3 automated verification finished successfully!");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
