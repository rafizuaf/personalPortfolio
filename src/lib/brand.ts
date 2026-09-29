/** Hex twins of tokens.css colors, for generated images where OKLCH isn't available. */
export const BRAND = {
  paper: "#0d1013",
  ink: "#f0eeeb",
  muted: "#acb2b7",
  rule: "#34383d",
  accent: "#f5c40d",
} as const;

/** Same mark as src/app/icon.svg, in a 32-unit grid. */
export const MARK_PATH = "M12 25V7h4.6l3 8.6 3-8.6H27v18h-3.6V14.2l-2.7 7.8h-2.2l-2.7-7.8V25z";

/**
 * Fetches a static TTF instance from Google Fonts for next/og, subset to `text`.
 * Returns null offline so image generation falls back to the default font instead of failing the build.
 */
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
