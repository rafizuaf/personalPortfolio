import { ImageResponse } from "next/og";
import { BRAND, MARK_PATH } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon; it ignores SVG favicons, so the mark is rendered to PNG. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect width="32" height="32" fill={BRAND.paper} />
        <rect x="5" y="0" width="3" height="8" fill={BRAND.accent} />
        <rect x="5" y="12" width="3" height="8" fill={BRAND.accent} />
        <rect x="5" y="24" width="3" height="8" fill={BRAND.accent} />
        <path d={MARK_PATH} fill={BRAND.accent} fillRule="evenodd" />
      </svg>
    ),
    size,
  );
}
