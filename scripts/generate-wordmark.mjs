// Generates the ClearSkeye wordmark as static SVG path data.
//
// We outline the wordmark from Spectral Light (the open source stand-in
// for the brand's Tiempos Headline Light) into vector paths. Once
// outlined, the wordmark renders identically in every browser and
// breakpoint, the page is no longer dependent on the Spectral webfont
// having loaded before the logo paints, and the "Y" descender (the
// brand's sightline) lines up to the same x coordinate as the actual
// glyph stroke at every size.
//
// The output is a JSON file consumed by `<Wordmark />`. Re-run with
// `pnpm gen:wordmark` whenever the brand changes the wordmark text,
// the display serif, or the descender position.

import opentype from "opentype.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FONT_DIR = join(__dirname, "fonts");
const FONT_PATH = join(FONT_DIR, "Spectral-Light.ttf");
// Spectral is licensed under the SIL Open Font License. We do not
// vendor the binary into the repository; the generator pulls it
// from Google Fonts the first time it runs.
const FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/spectral/Spectral-Light.ttf";
const OUTPUT_PATH = join(__dirname, "..", "src", "components", "wordmark.generated.json");
const TEXT = "ClearSkeye";

if (!existsSync(FONT_PATH)) {
  console.log(`Downloading Spectral Light from Google Fonts ...`);
  mkdirSync(FONT_DIR, { recursive: true });
  const response = await fetch(FONT_URL);
  if (!response.ok) {
    throw new Error(`Cannot fetch ${FONT_URL}: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  writeFileSync(FONT_PATH, Buffer.from(arrayBuffer));
}

// The output is normalised to a 1000 unit em so the resulting path
// data is independent of the source font's UPM. Scaling the SVG by
// CSS sets the on-screen size; the path data is fixed.
const EM = 1000;

const fontBuffer = readFileSync(FONT_PATH);
// opentype.js needs a raw ArrayBuffer (not a Node Buffer view).
const font = opentype.parse(
  fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength),
);
const upm = font.unitsPerEm;
const scale = EM / upm;

// The x-height and cap-height are sourced from the font's typographic
// tables where present, falling back to OS/2 metrics, then ascender.
// Spectral's UPM is 1000 and these are well-defined.
const capHeight =
  (font.tables.os2 && font.tables.os2.sCapHeight ? font.tables.os2.sCapHeight : 700) * scale;
const xHeight =
  (font.tables.os2 && font.tables.os2.sxHeight ? font.tables.os2.sxHeight : 470) * scale;

// Render the full wordmark as a single SVG path. opentype.js hands
// back y-down coordinates with the baseline at y=0, which matches
// SVG's coordinate system.
const wordmarkPath = font.getPath(TEXT, 0, 0, EM);
const wordmarkPathData = wordmarkPath.toPathData(2);
const wordmarkBox = wordmarkPath.getBoundingBox();

// Walk the glyph run a second time to find where the lowercase "y"
// sits inside the wordmark, and to read its own outline so we can
// place the sightline at the apex of the V (where the two strokes
// meet just above the baseline) rather than at a guessed percentage.
const glyphs = font.stringToGlyphs(TEXT);
let advance = 0;
let yIndex = -1;
const glyphPositions = [];
for (let i = 0; i < glyphs.length; i++) {
  const glyph = glyphs[i];
  glyphPositions.push({
    name: glyph.name,
    char: TEXT[i],
    x: advance,
    advance: glyph.advanceWidth * scale,
  });
  advance += glyph.advanceWidth * scale;
  if (TEXT[i] === "y") yIndex = i;
}

if (yIndex === -1) {
  throw new Error(`Cannot locate 'y' in ${TEXT}`);
}

// To find the apex of the y in path coordinates, render the y in
// isolation and read its bounding box. The apex sits at the bottom
// of the y body just above the baseline; horizontally it is at the
// glyph's geometric centre in Spectral 300, where the two diagonals
// of the V terminate symmetrically. Using the bounding box centre
// avoids hand-counting contour points and is correct to within a
// fraction of a stroke unit at any rendered size.
const yGlyphPath = font.getPath("y", 0, 0, EM);
const yBox = yGlyphPath.getBoundingBox();
const yLocalCentre = (yBox.x1 + yBox.x2) / 2;
const yWordmarkX = glyphPositions[yIndex].x + yLocalCentre;

// The descender is one stroke unit thick (matching the thinnest
// stroke of the serif at this size) and drops by approximately one
// cap height from the baseline. Spectral Light's thinnest stroke is
// roughly 4 percent of cap height; we lock to that ratio so the
// descender reads as part of the wordmark rather than an applied
// element.
const strokeWidth = Math.max(2, Math.round(capHeight * 0.045));
const descenderLength = capHeight;

// We expose two viewBoxes. The "body" viewBox crops at the baseline
// so the wordmark sits flush with surrounding text in places that do
// not carry the sightline (footer, navigation). The "full" viewBox
// extends below the baseline to make room for the sightline
// descender on the homepage hero. The component picks between them.
const padX = strokeWidth;
const viewBoxX = Math.min(wordmarkBox.x1, 0) - padX;
const viewBoxY = wordmarkBox.y1; // negative; top of capitals
const viewBoxW = Math.max(wordmarkBox.x2, advance) - viewBoxX + padX;
const viewBoxBodyH = -viewBoxY; // cap-tops to baseline
const viewBoxFullH = -viewBoxY + descenderLength;

const data = {
  text: TEXT,
  fontFamily: "Spectral",
  fontWeight: 300,
  generatedAt: new Date().toISOString(),
  upm: EM,
  capHeight: Math.round(capHeight * 100) / 100,
  xHeight: Math.round(xHeight * 100) / 100,
  pathData: wordmarkPathData,
  viewBoxBody: `${round(viewBoxX)} ${round(viewBoxY)} ${round(viewBoxW)} ${round(viewBoxBodyH)}`,
  viewBoxFull: `${round(viewBoxX)} ${round(viewBoxY)} ${round(viewBoxW)} ${round(viewBoxFullH)}`,
  width: round(viewBoxW),
  baselineY: 0,
  descender: {
    x: round(yWordmarkX),
    yStart: 0,
    yEnd: round(descenderLength),
    strokeWidth,
  },
};

function round(value) {
  return Math.round(value * 100) / 100;
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2) + "\n");

console.log(`Wrote ${OUTPUT_PATH}`);
console.log(
  `  body:    ${data.viewBoxBody}\n  full:    ${data.viewBoxFull}\n  cap:     ${data.capHeight}  descender x: ${data.descender.x}  stroke: ${data.descender.strokeWidth}`,
);
