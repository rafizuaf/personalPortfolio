export type Theme = "day" | "night";

export const THEME_KEY = "theme";

/** Hex twins of --color-paper per theme, for the browser UI colour. */
export const THEME_COLOR: Record<Theme, string> = {
  night: "#0d1013",
  day: "#e9ecee",
};

/**
 * Runs before paint: a saved choice wins, otherwise the OS setting. Storage can throw
 * (privacy modes), which falls through to the OS setting.
 */
export const themeScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='day'&&t!=='night')t=matchMedia('(prefers-color-scheme: light)').matches?'day':'night';d.dataset.theme=t;var c=t==='day'?'${THEME_COLOR.day}':'${THEME_COLOR.night}',s=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',c)};s();document.addEventListener('DOMContentLoaded',s)})();`;
