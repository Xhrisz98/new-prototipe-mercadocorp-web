import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function generateWhiteLogo() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const logoBuffer = fs.readFileSync("public/images/logo-mercadocorp.webp");
  const base64 = logoBuffer.toString("base64");
  const dataUri = "data:image/webp;base64," + base64;

  const html = `
    <html>
      <body style="margin:0; background: transparent;">
        <canvas id="c"></canvas>
        <img id="img" src="${dataUri}" style="display:none;" />
        <script>
          const img = document.getElementById("img");
          img.onload = () => {
            const canvas = document.getElementById("c");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Transform dark gray text to white, preserve official blue pillars
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const a = data[i + 3];

              if (a > 20) {
                // If pixel is not blue dominant, it is part of the MercadoCorp wordmark
                const isBlue = b > r + 35 && b > g + 15;
                if (!isBlue) {
                  data[i] = 255;
                  data[i + 1] = 255;
                  data[i + 2] = 255;
                }
              }
            }
            ctx.putImageData(imgData, 0, 0);
            window.__done = canvas.toDataURL("image/png");
          };
        </script>
      </body>
    </html>
  `;

  await page.setContent(html);
  await page.waitForFunction(() => window.__done);
  const resultDataUri = await page.evaluate(() => window.__done);
  await browser.close();

  const base64Data = resultDataUri.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("public/images/logo-mercadocorp-white.png", Buffer.from(base64Data, "base64"));
  console.log("Successfully created public/images/logo-mercadocorp-white.png");
}

generateWhiteLogo().catch(console.error);
