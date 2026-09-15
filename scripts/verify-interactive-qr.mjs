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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // 1. Contact page with 3D Tree QR (Dark mode)
  console.log("Loading /contacto (Dark)...");
  await page.goto(`${BASE_URL}/contacto`, { waitUntil: "networkidle2" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "contacto-qr-tree-dark.png"),
    fullPage: false
  });

  // 2. Toggle to Scannable QR code
  console.log("Toggling to Scannable QR view...");
  await page.evaluate(() => {
    const qrButtons = Array.from(document.querySelectorAll("button"));
    const qrBtn = qrButtons.find(b => b.innerText && b.innerText.includes("Código QR"));
    if (qrBtn) qrBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "contacto-qr-scannable-dark.png"),
    fullPage: false
  });

  // 3. Contact page in Light mode
  console.log("Switching /contacto to Light mode...");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "contacto-qr-light.png"),
    fullPage: false
  });

  // 4. Home page with Floating WhatsApp QR launcher & expanded popover
  console.log("Loading Home page to test Floating Widget...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await new Promise(r => setTimeout(r, 1000));

  // Click floating launcher
  console.log("Opening floating WhatsApp QR popover...");
  await page.evaluate(() => {
    const launcher = document.querySelector('button[aria-label*="WhatsApp"]');
    if (launcher) launcher.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "home-floating-qr-popover-dark.png"),
    fullPage: false
  });

  // 5. Mobile viewport (375px) on /contacto
  console.log("Testing mobile viewport 375px...");
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/contacto`, { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "contacto-mobile-qr-375px.png"),
    fullPage: false
  });

  await browser.close();
  console.log("All interactive QR screenshots captured successfully!");
})();
