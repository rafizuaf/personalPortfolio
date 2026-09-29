/** Set NEXT_PUBLIC_SITE_URL when the site is served from a custom domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** False on Vercel preview deployments, so their copies of the site stay out of search results. */
export const INDEXABLE = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
