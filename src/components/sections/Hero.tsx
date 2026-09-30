import type { CSSProperties } from "react";
import { PROFILE } from "@/content/profile";

const BOARD = PROFILE.board.map((word) => word.toUpperCase());
const CELLS = Math.max(...BOARD.map((word) => word.length));
const FINAL = BOARD[BOARD.length - 1].padEnd(CELLS);

/** Decorative card behind the résumé button; revealed by CSS on hover or keyboard focus (mouse devices only). */
function BoardingPass() {
  const family = PROFILE.name[PROFILE.name.length - 1];
  const field = (label: string, value: string) => (
    <span className="flex flex-col">
      <span className="pass__label">{label}</span>
      <span className="pass__value">{value}</span>
    </span>
  );

  return (
    <div data-pass aria-hidden="true" className="pass night">
      <div className="pass__main">
        <p className="pass__band">Boarding pass</p>
        <div className="grid grid-cols-2 gap-x-(--space-4) gap-y-(--space-2) p-(--space-3)">
          <span className="col-span-2">
            {field("Passenger", `${family}/${PROFILE.nickname} MR`.toUpperCase())}
          </span>
          {field("From", "JKT")}
          {field("To", "Anywhere")}
          {field("Gate", "A1")}
          {field("Seat", "1A")}
        </div>
      </div>
      <div data-pass-stub className="pass__stub">
        <span className="pass__barcode" />
        <span className="pass__value">1A</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      data-hero
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-end pt-[calc(var(--nav-h)+var(--space-8))] pb-(--space-7)"
    >
      <div className="shell">
        <h1 id="hero-title" data-hero-name className="display origin-bottom-left text-hero">
          <span className="sr-only">{PROFILE.name.join(" ")}</span>
          <span aria-hidden="true" className="block">
            {PROFILE.name.map((line, i) => (
              <span
                key={line}
                data-hero-line
                className="hero-line block"
                style={{ "--i": i } as CSSProperties}
              >
                {line.split(new RegExp(`(${PROFILE.nickname})`)).map((part, j) =>
                  part === PROFILE.nickname ? (
                    <span key={j} className="nick text-accent">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </span>
            ))}
          </span>
        </h1>

        <div
          data-hero-meta
          className="hero-meta mt-(--space-7) grid grid-cols-1 gap-(--space-5) border-t border-rule pt-(--space-5) md:grid-cols-12"
        >
          <p className="text-lg font-medium md:col-span-5 md:text-xl lg:col-span-4">
            <span className="sr-only">{PROFILE.role}</span>
            <span aria-hidden="true">
              <span
                data-board
                data-sequence={BOARD.map((word) => word.padEnd(CELLS)).join("|")}
                className="board night"
              >
                {[...FINAL].map((char, i) => (
                  <span key={i} data-cell className="board__cell">
                    {char}
                  </span>
                ))}
              </span>{" "}
              {PROFILE.boardTail}
            </span>{" "}
            <span className="text-accent-text">{PROFILE.roleAccent}</span>
          </p>
          <p className="max-w-[46ch] text-muted md:col-span-7 lg:col-span-5">{PROFILE.lede}</p>
          <div className="flex flex-wrap gap-(--space-3) md:col-span-12 lg:col-span-3 lg:flex-col lg:items-end">
            <div className="pass-anchor relative">
              <a
                data-pass-trigger
                className="btn btn--primary"
                href={PROFILE.resume.href}
                download={PROFILE.resume.fileName}
              >
                Download résumé (PDF)
              </a>
              <BoardingPass />
            </div>
            <a className="btn btn--ghost" href={`mailto:${PROFILE.email}`}>
              Send an email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
