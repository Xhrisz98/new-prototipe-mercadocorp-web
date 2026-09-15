import puppeteer from "puppeteer-core";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2";
const BASE_URL = "http://localhost:3000";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 1 });

  // 1. Home Hero (Dark Mode)
  console.log("Capturing Home Hero in Dark Mode...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "hero-collectui-dark-desktop.png"),
    fullPage: false
  });

  // 2. Home Hero (Light Mode)
  console.log("Capturing Home Hero in Light Mode...");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "hero-collectui-light-desktop.png"),
    fullPage: false
  });

  // 3. Bento Pillars Cards
  console.log("Capturing Bento Pillars Cards...");
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.evaluate(() => window.scrollTo(0, 1100));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "bento-collectui-pillars.png"),
    fullPage: false
  });

  // 4. Mobile Viewport 375px
  console.log("Capturing Mobile Hero (375px)...");
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "hero-collectui-mobile-375px.png"),
    fullPage: false
  });

  await browser.close();
  console.log("CollectUI verification screenshots captured successfully!");
})();
