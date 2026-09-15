import puppeteer from "puppeteer-core";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3005";

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    // 1. Desktop Header Light (1440x900)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "header-new-light-desktop.png"),
        clip: { x: 0, y: 0, width: 1440, height: 120 },
      });
      console.log("Saved header-new-light-desktop.png");
      await page.close();
    }

    // 2. Desktop Header Dark (1440x900)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "header-new-dark-desktop.png"),
        clip: { x: 0, y: 0, width: 1440, height: 120 },
      });
      console.log("Saved header-new-dark-desktop.png");
      await page.close();
    }

    // 3. Desktop Dropdown Tech Open
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));

      // Click on Tech dropdown button
      const buttons = await page.$$("header button");
      for (const btn of buttons) {
        const text = await page.evaluate((el) => el.textContent, btn);
        if (text.includes("Tecnología")) {
          await btn.click();
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "header-dropdown-tech-open.png"),
        clip: { x: 0, y: 0, width: 1440, height: 420 },
      });
      console.log("Saved header-dropdown-tech-open.png");
      await page.close();
    }

    // 4. Desktop Dropdown Marketing Open
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));

      // Click on Marketing dropdown button
      const buttons = await page.$$("header button");
      for (const btn of buttons) {
        const text = await page.evaluate((el) => el.textContent, btn);
        if (text.includes("Marketing")) {
          await btn.click();
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "header-dropdown-mkt-open.png"),
        clip: { x: 0, y: 0, width: 1440, height: 450 },
      });
      console.log("Saved header-dropdown-mkt-open.png");
      await page.close();
    }

    // 5. Mobile Drawer Open with accordions expanded (375x812)
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, isMobile: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));

      // Open mobile hamburger menu
      await page.evaluate(() => {
        const menuBtn = document.querySelector("button[aria-label='Menú']");
        if (menuBtn) menuBtn.click();
      });
      await new Promise((r) => setTimeout(r, 400));

      // Expand accordions
      await page.evaluate(() => {
        const accButtons = document.querySelectorAll("header div.lg\\:hidden button");
        accButtons.forEach((b) => b.click());
      });
      await new Promise((r) => setTimeout(r, 400));

      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "header-mobile-drawer-expanded.png"),
        clip: { x: 0, y: 0, width: 375, height: 750 },
      });
      console.log("Saved header-mobile-drawer-expanded.png");
      await page.close();
    }

    // 6. Home with Mind CRM UI Mockup
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 1100 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 600));
      await page.evaluate(() => window.scrollTo(0, 1100));
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "showcase-home-mind-ui.png"),
        clip: { x: 0, y: 0, width: 1440, height: 950 },
      });
      console.log("Saved showcase-home-mind-ui.png");
      await page.close();
    }

    // 7. Aplicaciones with Custom Software Dashboard
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 1100 });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("mercadocorp_locale", "es");
      });
      await page.goto(`${BASE_URL}/aplicaciones-herramientas-digitales`, {
        waitUntil: "domcontentloaded",
      });
      await new Promise((r) => setTimeout(r, 600));
      await page.evaluate(() => window.scrollTo(0, 800));
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, "showcase-custom-software-ui.png"),
        clip: { x: 0, y: 0, width: 1440, height: 950 },
      });
      console.log("Saved showcase-custom-software-ui.png");
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
