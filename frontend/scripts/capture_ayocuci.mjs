import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const TEMP_DIR = path.join(os.tmpdir(), "chrome-cdp-profile-" + Date.now());

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendCDP(ws, method, params = {}) {
  const id = Math.floor(Math.random() * 1000000);
  return new Promise((resolve, reject) => {
    const handler = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener("message", handler);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        }
      } catch (err) {
        // ignore other messages
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function main() {
  console.log("Launching Chrome CDP...");
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${TEMP_DIR}`,
    "about:blank",
  ]);

  chromeProc.on("error", (err) => {
    console.error("Chrome error:", err);
  });

  // Wait for CDP to be available
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch {
      await sleep(300);
    }
  }

  if (!versionData) {
    chromeProc.kill();
    throw new Error("Failed to connect to Chrome CDP");
  }

  console.log("Connected to Chrome. Creating target page...");
  const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?https://ayocuci.co.id/`, {
    method: "PUT",
  });
  const targetData = await newTargetRes.json();
  const pageWsUrl = targetData.webSocketDebuggerUrl;

  const ws = new WebSocket(pageWsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  console.log("WebSocket connected. Initializing page...");
  await sendCDP(ws, "Page.enable");
  await sendCDP(ws, "Network.enable");
  await sendCDP(ws, "DOM.enable");

  console.log("Navigating to https://ayocuci.co.id/ ...");
  await sendCDP(ws, "Page.navigate", { url: "https://ayocuci.co.id/" });

  // Wait for network and assets to settle
  await sleep(4000);

  const outputDir = path.resolve("public/images");
  const portofolioDir = path.resolve("public/images/portofolio");
  fs.mkdirSync(portofolioDir, { recursive: true });

  const configs = [
    {
      name: "Desktop",
      width: 1440,
      height: 900,
      scale: 1.5,
      isMobile: false,
      hasTouch: false,
      outFiles: [
        path.join(portofolioDir, "ayocuci.webp"),
        path.join(outputDir, "web_ayocuci.webp"),
      ],
    },
    {
      name: "iPad",
      width: 820,
      height: 1180,
      scale: 2,
      isMobile: true,
      hasTouch: true,
      outFiles: [
        path.join(outputDir, "ayocuci-tablet-screen.webp"),
      ],
    },
    {
      name: "Mobile",
      width: 390,
      height: 844,
      scale: 2,
      isMobile: true,
      hasTouch: true,
      outFiles: [
        path.join(outputDir, "ayocuci-phone-screen.webp"),
      ],
    },
  ];

  for (const cfg of configs) {
    console.log(`Setting viewport for ${cfg.name} (${cfg.width}x${cfg.height})...`);
    await sendCDP(ws, "Emulation.setDeviceMetricsOverride", {
      width: cfg.width,
      height: cfg.height,
      deviceScaleFactor: cfg.scale,
      mobile: cfg.isMobile,
      screenOrientation: { angle: 0, type: "portraitPrimary" },
    });
    await sendCDP(ws, "Emulation.setTouchEmulationEnabled", {
      enabled: cfg.hasTouch,
    });

    // Dismiss any promotional popup / modal overlays
    await sendCDP(ws, "Runtime.evaluate", {
      expression: `
        (() => {
          // 1. Find and click any close button 'x'
          const all = Array.from(document.querySelectorAll('*'));
          for (const el of all) {
            const text = el.textContent?.trim();
            if ((text === 'x' || text === 'X' || text === '×') && el.children.length === 0) {
              try { el.click(); } catch(e) {}
            }
          }

          // 2. Hide modal container with display: none !important
          for (const el of all) {
            if (el.textContent && el.textContent.includes('PROMO SPESIAL') && el.textContent.length < 600) {
              let parent = el;
              while (parent && parent.parentElement && parent !== document.body) {
                const pos = window.getComputedStyle(parent).position;
                if (pos === 'fixed' || pos === 'absolute') {
                  parent.style.setProperty('display', 'none', 'important');
                  break;
                }
                parent = parent.parentElement;
              }
            }
          }

          // 3. Hide any dark fixed backdrops
          document.querySelectorAll('div').forEach(d => {
            const style = window.getComputedStyle(d);
            if (style.position === 'fixed') {
              const bg = style.backgroundColor;
              if (bg.includes('rgba(0, 0, 0') || bg.includes('rgba(15,') || bg.includes('rgba(30,')) {
                d.style.setProperty('display', 'none', 'important');
              }
            }
          });

          document.body.style.overflow = 'auto';
          window.scrollTo(0, 0);
        })();
      `,
    });

    // Wait for responsive recalculations
    await sleep(2000);

    console.log(`Capturing screenshot for ${cfg.name}...`);
    const screenshotRes = await sendCDP(ws, "Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    const buffer = Buffer.from(screenshotRes.data, "base64");

    const webpBuffer = await sharp(buffer)
      .webp({ quality: 90 })
      .toBuffer();

    for (const outFile of cfg.outFiles) {
      fs.writeFileSync(outFile, webpBuffer);
      console.log(`Saved: ${outFile} (${webpBuffer.length} bytes)`);
    }
  }

  ws.close();
  chromeProc.kill();
  try {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  } catch {
    // ignore
  }

  console.log("SUCCESS: All device screens captured from https://ayocuci.co.id/!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
