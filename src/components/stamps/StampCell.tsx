"use client";

import { useEffect, useRef, useState } from "react";
import StampMark from "@/components/stamps/StampMark";
import { getStamps, STAMP_EVENT, STAMPS, type StampId } from "@/lib/stamps";

/** Flight-strip cell counting stamps; opens the passport. Rendered after mount, since stamps need JS to earn. */
export default function StampCell() {
  const [owned, setOwned] = useState<StampId[] | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sync = () => setOwned(getStamps());
    sync();
    window.addEventListener(STAMP_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(STAMP_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!owned) return null;

  return (
    <div className="strip__cell relative">
      <dt className="strip__label">Stamps</dt>
      <dd className="strip__value">
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
          className="font-semibold text-accent-text underline decoration-1 underline-offset-[0.2em] after:absolute after:inset-0 hover:decoration-2"
        >
          {owned.length} of {STAMPS.length}
        </button>

        <dialog
          ref={dialog}
          aria-labelledby="passport-title"
          data-lenis-prevent
          className="passport night"
          onClick={(event) => event.target === dialog.current && dialog.current?.close()}
        >
          <div className="p-(--space-5) sm:p-(--space-6)">
            <div className="flex items-start justify-between gap-(--space-4)">
              <div>
                <p className="strip__label">Passport</p>
                <h2 id="passport-title" className="display mt-(--space-1) text-4xl">
                  Stamps {owned.length}/{STAMPS.length}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="grid size-11 shrink-0 place-items-center text-muted hover:text-ink"
                aria-label="Close passport"
              >
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              </button>
            </div>
            <ul className="mt-(--space-5) grid grid-cols-2 gap-x-(--space-4) gap-y-(--space-5) sm:grid-cols-4">
              {STAMPS.map((stamp, i) => {
                const inked = owned.includes(stamp.id);
                return (
                  <li key={stamp.id} className="flex flex-col items-center gap-(--space-2) text-center">
                    <StampMark label={stamp.label} inked={inked} index={i} />
                    <span className="sr-only">
                      {stamp.label}: {inked ? "collected" : "not yet."}
                    </span>
                    {!inked && <span className="text-xs text-muted">{stamp.hint}</span>}
                  </li>
                );
              })}
            </ul>
            <p className="mt-(--space-6) border-t border-rule pt-(--space-4) text-sm text-muted">
              Stamps are kept in this browser only.
            </p>
          </div>
        </dialog>
      </dd>
    </div>
  );
}
