/**
 * Canonical origin for metadata, sitemap and structured data.
 * NEXT_PUBLIC_SITE_URL wins (set it when using a custom domain); on Vercel the
 * production domain is used otherwise; localhost for local builds.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** False on Vercel preview deployments, so their copies of the site stay out of search results. */
export const INDEXABLE = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
