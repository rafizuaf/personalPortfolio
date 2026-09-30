import { ImageResponse } from "next/og";
import { PROFILE } from "@/content/profile";
import { BRAND, loadGoogleFont } from "@/lib/brand";

export const alt = `${PROFILE.name.join(" ")}, ${PROFILE.role} ${PROFILE.roleAccent}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DASH = 56;
const GAP = 40;

export default async function OpengraphImage() {
  const name = PROFILE.name.map((line) => line.toUpperCase());
  const nickname = PROFILE.nickname.toUpperCase();
  const [display, body] = await Promise.all([
    loadGoogleFont("Big Shoulders", 800, name.join("")),
    loadGoogleFont("IBM Plex Sans", 500, `${PROFILE.role} ${PROFILE.roleAccent}`),
  ]);

  const fonts = [
    display && { name: "Display", data: display, weight: 800 as const },
    body && { name: "Body", data: body, weight: 500 as const },
  ].filter((font) => !!font);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BRAND.paper,
          color: BRAND.ink,
        }}
      >
        <div
          style={{
            width: 6,
            marginLeft: 60,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: GAP,
          }}
        >
          {Array.from({ length: Math.ceil(size.height / (DASH + GAP)) + 1 }, (_, i) => (
            <div key={i} style={{ width: 6, height: DASH, flexShrink: 0, background: BRAND.accent }} />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px 56px 66px",
          }}
        >
          <div style={{ display: "flex", fontFamily: "Body", fontSize: 32, color: BRAND.muted }}>
            {PROFILE.role}&nbsp;<span style={{ color: BRAND.accent }}>{PROFILE.roleAccent}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Display",
              fontWeight: 800,
              fontSize: 180,
              lineHeight: 0.86,
              whiteSpace: "nowrap",
            }}
          >
            {name.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line.split(new RegExp(`(${nickname})`)).map((part, j) => (
                  <span key={j} style={{ color: part === nickname ? BRAND.accent : BRAND.ink }}>
                    {part.replace(/ /g, "\u00a0")}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
