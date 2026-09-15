import puppeteer from "puppeteer-core";
import path from "path";

const ARTIFACT_DIR = "C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3005";

async function run() {
  console.log("Iniciando captura de pantallas para Fase 1...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  async function capture(options) {
    const { name, urlPath = "", theme, width, height, locale = "es", selector, fullPage = false } = options;
    console.log(`Capturando: ${name} (${theme}, ${width}x${height}, path: ${urlPath})...`);

    // Configurar tema y locale antes de cargar el DOM
    await page.evaluateOnNewDocument((t, l) => {
      localStorage.setItem("theme", t);
      localStorage.setItem("mercadocorp_locale", l);
    }, theme, locale);

    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await new Promise((r) => setTimeout(r, 800));

    const outputPath = path.join(ARTIFACT_DIR, `${name}.png`);

    if (selector) {
      const element = await page.$(selector);
      if (element) {
        await element.screenshot({ path: outputPath });
        console.log(`Guardado elemento: ${outputPath}`);
        return;
      }
    }

    await page.screenshot({ path: outputPath, fullPage });
    console.log(`Guardado: ${outputPath}`);
  }

  try {
    // 1. INICIO (/)
    await capture({ name: "hero-home-light-desktop", urlPath: "/", theme: "light", width: 1440, height: 900, selector: "section" });
    await capture({ name: "hero-home-dark-desktop", urlPath: "/", theme: "dark", width: 1440, height: 900, selector: "section" });
    await capture({ name: "hero-home-light-mobile", urlPath: "/", theme: "light", width: 375, height: 812, selector: "section" });
    await capture({ name: "hero-home-dark-mobile", urlPath: "/", theme: "dark", width: 375, height: 812, selector: "section" });
    await capture({ name: "page-home-dark-desktop", urlPath: "/", theme: "dark", width: 1440, height: 900, fullPage: true });

    // 2. TECNOLOGÍA & AUTOMATIZACIÓN (/tecnologia-automatizacion)
    await capture({ name: "hero-tech-light-desktop", urlPath: "/tecnologia-automatizacion", theme: "light", width: 1440, height: 900, selector: "section" });
    await capture({ name: "hero-tech-dark-desktop", urlPath: "/tecnologia-automatizacion", theme: "dark", width: 1440, height: 900, selector: "section" });
    await capture({ name: "hero-tech-light-mobile", urlPath: "/tecnologia-automatizacion", theme: "light", width: 375, height: 812, selector: "section" });
    await capture({ name: "hero-tech-dark-mobile", urlPath: "/tecnologia-automatizacion", theme: "dark", width: 375, height: 812, selector: "section" });
    await capture({ name: "page-tech-dark-desktop", urlPath: "/tecnologia-automatizacion", theme: "dark", width: 1440, height: 900, fullPage: true });

    // 3. MARKETING DIGITAL (/marketing-digital)
    await capture({ name: "hero-mkt-light-desktop", urlPath: "/marketing-digital", theme: "light", width: 1440, height: 900, selector: "section" });
    await capture({ name: "hero-mkt-dark-desktop", urlPath: "/marketing-digital", theme: "dark", width: 1440, height: 900, selector: "section" });
    await capture({ name: "hero-mkt-light-mobile", urlPath: "/marketing-digital", theme: "light", width: 375, height: 812, selector: "section" });
    await capture({ name: "hero-mkt-dark-mobile", urlPath: "/marketing-digital", theme: "dark", width: 375, height: 812, selector: "section" });
    await capture({ name: "page-mkt-dark-desktop", urlPath: "/marketing-digital", theme: "dark", width: 1440, height: 900, fullPage: true });

    console.log("¡Todas las capturas de Fase 1 completadas con éxito!");
  } catch (err) {
    console.error("Error en capturas:", err);
  } finally {
    await browser.close();
  }
}

run();
