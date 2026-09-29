import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import MotionRoot from "@/components/motion/MotionRoot";
import "@/styles/globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
});

const title = "Mukhtar Rafi Fauzi · Software Engineer, Jakarta";
const description =
  "Frontend-focused software engineer in Jakarta. Next.js, TypeScript and Tailwind CSS on internal business systems. Almost seven years in aircraft maintenance before that.";

// Set NEXT_PUBLIC_SITE_URL to the production domain so share images resolve to absolute URLs.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  twitter: { card: "summary_large_image" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1013",
};

// Runs before paint: hides reveal targets only when motion is allowed, and
// un-hides them after 3s if the motion bundle never starts.
const motionGate = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ok');setTimeout(function(){if(!d.classList.contains('motion-live'))d.classList.remove('motion-ok')},3000)})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="centerline" aria-hidden="true">
          <span className="centerline__paint" data-centerline />
        </div>
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
