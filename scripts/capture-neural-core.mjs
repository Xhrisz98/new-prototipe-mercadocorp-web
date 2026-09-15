import puppeteer from "puppeteer-core";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function run() {
  console.log("Iniciando captura de Kinetic Neural Core...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--use-gl=angle", "--use-angle=gl"],
  });

  const page = await browser.newPage();

  async function capture({ name, theme = "dark", width = 1440, height = 900, scrollY = 0 }) {
    console.log(`Capturando: ${name} (${theme}, ${width}x${height}, scrollY: ${scrollY})...`);

    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem("theme", t);
      localStorage.setItem("mercadocorp_locale", "es");
    }, theme);

    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2", timeout: 20000 });

    // Esperar inicialización de Canvas y Three.js
    await new Promise((r) => setTimeout(r, 1200));

    if (scrollY > 0) {
      await page.evaluate((y) => {
        window.scrollTo({ top: y, behavior: "instant" });
      }, scrollY);
      // Esperar lerp de Three.js (0.08 rate)
      await new Promise((r) => setTimeout(r, 600));
    }

    const outputPath = path.join(ARTIFACT_DIR, `${name}.png`);
    await page.screenshot({ path: outputPath });
    console.log(`Guardado: ${outputPath}`);
  }

  try {
    // 1. Desktop Dark - Scroll 0
    await capture({ name: "kinetic-core-desktop-dark-initial", theme: "dark", width: 1440, height: 900, scrollY: 0 });

    // 2. Desktop Dark - Scroll 350px (Bloom y deconstrucción intermedia)
    await capture({ name: "kinetic-core-desktop-dark-scroll350", theme: "dark", width: 1440, height: 900, scrollY: 350 });

    // 3. Desktop Dark - Scroll 700px (Bloom avanzado y dispersión perimetral)
    await capture({ name: "kinetic-core-desktop-dark-scroll700", theme: "dark", width: 1440, height: 900, scrollY: 700 });

    // 4. Desktop Light - Scroll 0
    await capture({ name: "kinetic-core-desktop-light-initial", theme: "light", width: 1440, height: 900, scrollY: 0 });

    // 5. Mobile Dark (375px) - Fallback CSS concéntrico
    await capture({ name: "kinetic-core-mobile-dark-375px", theme: "dark", width: 375, height: 812, scrollY: 0 });

    // 6. Mobile Light (375px) - Fallback CSS concéntrico
    await capture({ name: "kinetic-core-mobile-light-375px", theme: "light", width: 375, height: 812, scrollY: 0 });

    console.log("¡Todas las capturas de Kinetic Neural Core completadas exitosamente!");
  } catch (err) {
    console.error("Error durante las capturas:", err);
  } finally {
    await browser.close();
  }
}

run();
