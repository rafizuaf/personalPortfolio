import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import MotionRoot from "@/components/motion/MotionRoot";
import { PROFILE } from "@/content/profile";
import { INDEXABLE, SITE_URL } from "@/lib/site";
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

const fullName = PROFILE.name.join(" ");
const title = `${fullName} · Software Engineer, Jakarta`;
const description = `${fullName} is a frontend-focused software engineer in Jakarta, building internal business systems with Next.js, TypeScript and Tailwind CSS. Almost seven years in aircraft maintenance before that.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: fullName,
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  alternates: { canonical: "/" },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  // Paste the content value of Search Console's "HTML tag" method into this env var.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  twitter: { card: "summary_large_image", title, description },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: fullName,
    type: "profile",
    firstName: "Mukhtar Rafi",
    lastName: "Fauzi",
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
