// Makes the link-preview card (Open Graph, 1200×630) and the home-screen icon
// from the page itself. Run after `npm run build`, with Playwright installed:
//   python3 -m http.server 4321 --directory site & node scripts/share-card.mjs
// The screenshots are sRGB JPEG/PNG: link previews often drop colour profiles.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:4321/";
const browser = await chromium.launch();

const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await card.goto(url);
await card.evaluate(() => document.fonts.ready);
await card.addStyleTag({
  content: `nav, main, footer { display: none !important }
    header { min-height: 630px; display: grid; align-content: center; padding-top: 0 !important; padding-bottom: 0 !important }`,
});
await card.waitForTimeout(300);
await card.screenshot({ path: "site/share/card-1200x630.jpg", type: "jpeg", quality: 88 });

// The favicon, full-bleed (iOS rounds the corners itself).
const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await icon.goto(url);
const svg = (await (await fetch(new URL("/favicon.svg", url))).text()).replace(' rx="7"', "");
await icon.setContent(`<body style="margin:0">${svg.replace("<svg ", '<svg width="180" height="180" ')}</body>`);
await icon.waitForTimeout(100);
await icon.screenshot({ path: "site/share/apple-touch-icon.png" });

await browser.close();
console.log("share card and icon written to site/share/");
