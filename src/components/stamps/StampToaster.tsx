"use client";

import { useEffect, useState } from "react";
import StampMark from "@/components/stamps/StampMark";
import { collect, getStamps, STAMP_EVENT, STAMPS, type StampId } from "@/lib/stamps";

const SHOW_MS = 3200;
const MAYDAY = "mayday";

/** Announces new stamps on any page, and listens for "mayday" typed anywhere. */
export default function StampToaster() {
  const [shown, setShown] = useState<{ id: StampId; count: number } | null>(null);

  useEffect(() => {
    let hide = 0;
    const onStamp = (event: Event) => {
      const id = (event as CustomEvent<StampId>).detail;
      window.clearTimeout(hide);
      setShown({ id, count: getStamps().length });
      hide = window.setTimeout(() => setShown(null), SHOW_MS);
    };

    let typed = "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key.length !== 1) return;
      typed = (typed + event.key.toLowerCase()).slice(-MAYDAY.length);
      if (typed === MAYDAY) collect("mayday");
    };

    window.addEventListener(STAMP_EVENT, onStamp);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(hide);
      window.removeEventListener(STAMP_EVENT, onStamp);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const index = shown ? STAMPS.findIndex((stamp) => stamp.id === shown.id) : -1;
  const stamp = STAMPS[index];

  return (
    <>
      <p role="status" className="sr-only">
        {stamp ? `Stamp collected: ${stamp.label}. ${shown?.count} of ${STAMPS.length}.` : ""}
      </p>
      {stamp && shown && (
        <div key={shown.id} aria-hidden="true" className="stamp-toast night">
          <StampMark label={stamp.label} inked index={index} />
          <span className="flex flex-col">
            <span className="strip__label">Stamp collected</span>
            <span className="font-semibold">{stamp.label}</span>
            <span className="num text-sm text-muted">
              {shown.count} of {STAMPS.length}
            </span>
          </span>
        </div>
      )}
    </>
  );
}
