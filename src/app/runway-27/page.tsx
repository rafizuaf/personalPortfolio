import type { Metadata } from "next";
import Link from "next/link";
import SignArray from "@/components/log/SignArray";
import PageHeader from "@/components/PageHeader";
import GoAroundGame from "@/components/runway27/GoAroundGame";
import { PROFILE } from "@/content/profile";

export const metadata: Metadata = {
  title: `Runway 27 (closed) · ${PROFILE.name.join(" ")}`,
  description: "Runway 27 is closed for works. Practise a go-around instead.",
  robots: { index: false, follow: true },
};

/** NOTAM in the real layout: Q-line, aerodrome, validity, then the plain-language text. */
const NOTAM = [
  "A0427/26 NOTAMN",
  "Q) WIIF/QMRLC/IV/NBO/A/000/999/",
  `A) ${PROFILE.shortMark} B) 2610060000 C) PERM`,
  "E) RWY 09/27 CLSD DUE WIP.",
  "   ACFT EXPECT GO AROUND.",
  "   FOR ALL OTHER TFC USE LOG OR CONTACT.",
];

export default function Runway27Page() {
  return (
    <>
      <PageHeader />
      <main id="main" tabIndex={-1} className="shell pt-[calc(var(--nav-h)+var(--space-8))] pb-(--space-band)">
        <SignArray signs={[{ label: "Portfolio", href: "/" }, { label: "RWY 27" }]} />

        <p className="mt-(--space-7) font-mono text-sm text-muted">NOTAM A0427/26</p>
        <h1 className="display mt-(--space-2) text-section">Runway 27 is closed.</h1>
        <p className="mt-(--space-4) max-w-[48ch] text-lg text-muted">
          Works in progress, crosses on the pavement, nobody lands today. The tower still lets you practise the
          go-around.
        </p>

        <div className="mt-(--space-8)">
          <GoAroundGame />
        </div>

        <div className="mt-(--space-8) grid grid-cols-1 gap-(--space-7) lg:grid-cols-12">
          <pre className="notam lg:col-span-7" aria-label="NOTAM text" tabIndex={0}>
            {NOTAM.join("\n")}
          </pre>
          <div className="lg:col-span-5">
            <h2 className="text-sm font-semibold text-muted">Decoded</h2>
            <p className="mt-(--space-2) max-w-[48ch]">
              Runway 09/27 is closed for work in progress, permanently. Expect to go around. Everything else is
              open: the log, or a message to the tower.
            </p>
            <div className="mt-(--space-5) flex flex-wrap gap-(--space-3)">
              <Link className="btn btn--primary" href="/log">
                Read the log
              </Link>
              <Link className="btn btn--ghost" href="/#contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
