import { execFileSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { Logo } from "../src/components/Logo";

// Run with `bun run branding:export`. PNG/ICO conversion requires ImageMagick's `magick` command.
const root = fileURLToPath(new URL("../../../", import.meta.url));
const branding = join(root, "branding");
await mkdir(branding, { recursive: true });

const icon = renderToStaticMarkup(<Logo />);
await writeFile(join(branding, "icon.svg"), `${icon}\n`);
const iconShapes = icon.replace(/^<svg[^>]*>/, '<g fill="none">').replace(/<\/svg>$/, "</g>");

// The outlined Geist wordmark stays portable without requiring fonts in image viewers.
const wordmark = await readFile(join(branding, "wordmark.svg"), "utf8");
const viewBox = wordmark.match(/viewBox="([^"]+)"/)?.[1];
if (!viewBox) throw new Error("The wordmark must have a viewBox");
const [minX = 0, minY = 0, width = 0, height = 0] = viewBox.split(" ").map(Number);
if (width <= 0 || height <= 0) throw new Error("The wordmark must have positive dimensions");
const wordmarkShapes = wordmark.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const scale = 700 / width;
const wordmarkX = 400 - minX * scale;
const wordmarkY = (300 - height * scale) / 2 - minY * scale;

for (const [name, color] of [
  ["logo", "#333333"],
  ["logo-dark", "#ffffff"],
]) {
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="300" viewBox="0 0 1100 300"><title>Gately logo</title>${iconShapes}<g fill="${color}" transform="translate(${wordmarkX} ${wordmarkY}) scale(${scale})">${wordmarkShapes}</g></svg>\n`;
  const svgPath = join(branding, `${name}.svg`);
  await writeFile(svgPath, logo);
  execFileSync("magick", ["-background", "none", "-density", "192", svgPath, `PNG32:${join(branding, `${name}.png`)}`]);
}

execFileSync("magick", [
  "-background",
  "none",
  "-density",
  "327.68",
  join(branding, "icon.svg"),
  `PNG32:${join(branding, "icon.png")}`,
]);

for (const app of ["landing", "web", "desktop"]) {
  await copyFile(join(branding, "icon.svg"), join(root, "apps", app, "public", "favicon.svg"));
}

execFileSync("magick", [
  join(branding, "icon.png"),
  "-resize",
  "96x96",
  `PNG32:${join(root, "apps/landing/public/favicon.png")}`,
]);

execFileSync("magick", [
  join(branding, "icon.png"),
  "-define",
  "icon:auto-resize=96,48,32,16",
  join(root, "apps/landing/public/favicon.ico"),
]);

const desktopIcons = join(root, "apps/desktop/src-tauri/icons");
const temporaryIcons = await mkdtemp(join(tmpdir(), "gately-icons-"));
try {
  execFileSync("bun", [
    "run",
    "--cwd",
    join(root, "apps/desktop"),
    "tauri",
    "icon",
    join(branding, "icon.svg"),
    "--output",
    temporaryIcons,
  ]);
  for (const entry of await readdir(temporaryIcons, { withFileTypes: true })) {
    if (entry.isFile()) await copyFile(join(temporaryIcons, entry.name), join(desktopIcons, entry.name));
  }
} finally {
  await rm(temporaryIcons, { recursive: true, force: true });
}
