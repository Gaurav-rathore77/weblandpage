/**
 * Generates the Weblign brand assets from a single vector source.
 *
 * Usage: node scripts/generate-brand-assets.mjs
 *
 * Outputs:
 *   src/app/icon.svg
 *   src/app/apple-icon.png
 *   src/app/favicon.ico
 *   public/brand/logo-mark.svg
 *   public/brand/logo-mark-light.svg
 *   public/brand/logo-192.png
 *   public/brand/logo-512.png
 *   public/og-image.png
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const appDir = path.join(root, "src", "app");
const publicDir = path.join(root, "public");
const brandDir = path.join(publicDir, "brand");

const markShapes = (tile, small, thin, large) => `
  <rect width="21" height="21" rx="5.5" fill="${tile}" />
  <rect x="27" width="21" height="10" rx="5" fill="${small}" />
  <rect x="4" y="24" width="9" height="20" rx="4.5" fill="${thin}" />
  <rect x="27" y="24" width="21" height="20" rx="5.5" fill="${large}" />`;

const markSvg = (colors) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 44" width="480" height="440">${markShapes(
    colors.tile,
    colors.small,
    colors.thin,
    colors.large
  )}</svg>`;

const iconSvg = (colors) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1024" height="1024">
    <rect width="64" height="64" rx="14" fill="#020617" />
    <g transform="translate(11 12)">${markShapes(colors.tile, colors.small, colors.thin, colors.large)}</g>
  </svg>`;

const darkMark = { tile: "#FFFFFF", small: "#3F3F46", thin: "#52525B", large: "#A1A1AA" };
const lightMark = { tile: "#0F172A", small: "#CBD5E1", thin: "#94A3B8", large: "#475569" };

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#020617" />
  <circle cx="1128" cy="96" r="196" fill="none" stroke="#172033" stroke-width="2" />
  <circle cx="1128" cy="96" r="132" fill="none" stroke="#172033" stroke-width="2" />

  <g transform="translate(72 56)">
    <g transform="scale(1.1)">${markShapes(darkMark.tile, darkMark.small, darkMark.thin, darkMark.large)}</g>
    <text x="66" y="37" font-family="Arial, Segoe UI, sans-serif" font-size="46" font-weight="800" fill="#FFFFFF" letter-spacing="-1">Weblign</text>
  </g>
  <text x="1128" y="92" text-anchor="end" font-family="Arial, Segoe UI, sans-serif" font-size="22" font-weight="600" fill="#94A3B8">go.weblign.in</text>
  <line x1="72" y1="146" x2="1128" y2="146" stroke="#1E293B" stroke-width="2" />

  <text x="72" y="212" font-family="Arial, Segoe UI, sans-serif" font-size="18" font-weight="700" fill="#67E8F9" letter-spacing="3.2">WEBSITE DESIGN &amp; DEVELOPMENT · INDIA</text>

  <text x="72" y="304" font-family="Arial, Segoe UI, sans-serif" font-size="66" font-weight="800" fill="#FFFFFF" letter-spacing="-2">Websites built to turn</text>
  <text x="72" y="380" font-family="Arial, Segoe UI, sans-serif" font-size="66" font-weight="800" fill="#67E8F9" letter-spacing="-2">clicks into enquiries.</text>

  <text x="72" y="450" font-family="Arial, Segoe UI, sans-serif" font-size="26" font-weight="400" fill="#CBD5E1">Business websites, landing pages and custom web apps.</text>
  <text x="72" y="490" font-family="Arial, Segoe UI, sans-serif" font-size="26" font-weight="400" fill="#CBD5E1">Transparent pricing from ₹9,999.</text>

  <line x1="72" y1="538" x2="1128" y2="538" stroke="#1E293B" stroke-width="2" />

  <g font-family="Arial, Segoe UI, sans-serif" font-size="21" font-weight="600" fill="#CBD5E1">
    <circle cx="78" cy="584" r="4" fill="#22D3EE" />
    <text x="94" y="591">Free consultation</text>
    <circle cx="320" cy="584" r="4" fill="#22D3EE" />
    <text x="336" y="591">Reply within 24 hours</text>
    <circle cx="590" cy="584" r="4" fill="#22D3EE" />
    <text x="606" y="591">No hidden charges</text>
  </g>
  <text x="1128" y="591" text-anchor="end" font-family="Arial, Segoe UI, sans-serif" font-size="21" font-weight="600" fill="#94A3B8">info.weblign@gmail.com</text>
</svg>`;

async function generate() {
  await fs.mkdir(appDir, { recursive: true });
  await fs.mkdir(brandDir, { recursive: true });

  const darkIcon = iconSvg(darkMark);
  const darkIconBuffer = Buffer.from(darkIcon);

  await fs.writeFile(path.join(appDir, "icon.svg"), darkIcon.trim());
  await fs.writeFile(path.join(brandDir, "logo-mark.svg"), markSvg(darkMark));
  await fs.writeFile(path.join(brandDir, "logo-mark-light.svg"), markSvg(lightMark));

  await sharp(darkIconBuffer).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));
  await sharp(darkIconBuffer).resize(192, 192).png().toFile(path.join(brandDir, "logo-192.png"));
  await sharp(darkIconBuffer).resize(512, 512).png().toFile(path.join(brandDir, "logo-512.png"));

  const faviconPng = await sharp(darkIconBuffer).resize(64, 64).png().toBuffer();
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = 64;
  entry[1] = 64;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(faviconPng.length, 8);
  entry.writeUInt32LE(22, 12);
  await fs.writeFile(path.join(appDir, "favicon.ico"), Buffer.concat([header, entry, faviconPng]));

  await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.join(publicDir, "og-image.png"));

  console.log("Brand assets generated:");
  console.log("  src/app/icon.svg, apple-icon.png, favicon.ico");
  console.log("  public/brand/logo-mark.svg, logo-mark-light.svg, logo-192.png, logo-512.png");
  console.log("  public/og-image.png");
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
