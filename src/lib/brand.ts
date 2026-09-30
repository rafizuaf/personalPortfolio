/** Hex twins of tokens.css colors, for generated images where OKLCH isn't available. */
export const BRAND = {
  paper: "#0d1013",
  ink: "#f0eeeb",
  muted: "#acb2b7",
  rule: "#34383d",
  accent: "#f5c40d",
} as const;

/** Same "R" (for Rafi) as src/app/icon.svg, in a 32-unit grid; the counter needs evenodd fill. */
export const MARK_PATH =
  "M12 25V7h9.5c3 0 4.9 1.8 4.9 4.9v.8c0 2.1-1 3.6-2.7 4.3L27 25h-3.9L20 17.4h-4.4V25zM15.6 10.3v3.9H21c1.2 0 1.8-.6 1.8-1.7v-.5c0-1.1-.6-1.7-1.8-1.7z";

/** Returns null offline so image generation falls back to the default font instead of failing the build. */
export async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const query = `family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}
