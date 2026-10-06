"use client";

import { useEffect, useRef, useState } from "react";
import { PLANE } from "@/components/runway";
import { collect } from "@/lib/stamps";

type Phase = "ready" | "approach" | "climb" | "landed";

const APPROACH_MS = 4600;
const CLIMB_MS = 1800;
const ROLL_MS = 1400;
const START_ALT = 500;
/** Scene fractions: where the plane enters, and where its wheels would meet the closed runway. */
const ENTRY_X = -0.08;
const TOUCHDOWN_X = 0.42;
const MINIMUMS = 200;
const CALLOUTS: [number, string][] = [
  [500, "500"],
  [MINIMUMS, "Minimums"],
  [100, "100"],
  [50, "50"],
  [40, "40"],
  [30, "30"],
  [20, "20"],
  [10, "10"],
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

const verdict = (alt: number) => {
  if (alt > MINIMUMS) return `Go-around at ${alt} ft. Early, but nobody minds an early go-around.`;
  if (alt >= 50) return `Go-around at ${alt} ft. Textbook.`;
  return `Go-around at ${alt} ft. The works crew felt that one.`;
};

/** A top-down approach to a closed runway: the plane shrinks as it descends, and you call the go-around. */
export default function GoAroundGame() {
  const scene = useRef<HTMLDivElement>(null);
  const altText = useRef<HTMLSpanElement>(null);
  const pose = useRef({ x: ENTRY_X, alt: START_ALT });
  const frame = useRef(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [callout, setCallout] = useState("Cleared to approach. Runway 27 is closed.");
  const [result, setResult] = useState("");
  const [best, setBest] = useState<number | null>(null);

  const draw = () => {
    const el = scene.current;
    if (!el) return;
    el.style.setProperty("--x", pose.current.x.toFixed(4));
    el.style.setProperty("--alt", pose.current.alt.toFixed(1));
    if (altText.current) altText.current.textContent = String(Math.max(0, Math.round(pose.current.alt)));
  };

  const run = (duration: number, step: (t: number) => void, done?: () => void) => {
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      step(t);
      draw();
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else done?.();
    };
    frame.current = requestAnimationFrame(tick);
  };

  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const touchdown = () => {
    setPhase("landed");
    setCallout("Touchdown. Spoilers up.");
    const from = pose.current.x;
    run(
      ROLL_MS,
      (t) => {
        pose.current = { x: lerp(from, from + 0.16, easeOut(t)), alt: 0 };
      },
      () => setResult("Touchdown on a closed runway. The works crew would like a word."),
    );
  };

  const start = () => {
    setResult("");
    if (reduced()) {
      // No approach to watch: hold at minimums and let the call be made.
      pose.current = { x: lerp(ENTRY_X, TOUCHDOWN_X, 1 - MINIMUMS / START_ALT), alt: MINIMUMS };
      draw();
      setCallout("Minimums");
      setPhase("approach");
      return;
    }
    pose.current = { x: ENTRY_X, alt: START_ALT };
    draw();
    setPhase("approach");
    setCallout("500");
    let next = 1;
    run(
      APPROACH_MS,
      (t) => {
        pose.current = { x: lerp(ENTRY_X, TOUCHDOWN_X, t), alt: START_ALT * (1 - t) };
        while (next < CALLOUTS.length && pose.current.alt <= CALLOUTS[next][0]) {
          setCallout(CALLOUTS[next][1]);
          next++;
        }
      },
      touchdown,
    );
  };

  const goAround = () => {
    if (phase !== "approach") return;
    const at = Math.round(pose.current.alt);
    setPhase("climb");
    setCallout("Go around, flaps.");
    collect("goaround");
    setBest((current) => (current === null ? at : Math.min(current, at)));
    const from = { ...pose.current };
    const finish = () => {
      setResult(verdict(at));
      setCallout("Positive climb.");
    };
    if (reduced()) {
      pose.current = { x: 1.2, alt: 600 };
      draw();
      finish();
      return;
    }
    run(
      CLIMB_MS,
      (t) => {
        pose.current = { x: lerp(from.x, 1.2, easeIn(t)), alt: lerp(from.alt, 600, easeOut(t)) };
      },
      finish,
    );
  };

  useEffect(() => {
    draw();
    return () => cancelAnimationFrame(frame.current);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" || phase !== "approach") return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, button, a")) return;
      event.preventDefault();
      goAround();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const flying = phase === "approach";

  return (
    <section aria-labelledby="game-title" className="ga night">
      <div className="flex flex-wrap items-center justify-between gap-(--space-3) border-b border-rule px-(--space-5) py-(--space-3)">
        <h2 id="game-title" className="strip__label">
          Approach RWY 27 · practice go-around
        </h2>
        <p className="font-mono text-sm text-muted">
          RA <span ref={altText}>{START_ALT}</span> ft
        </p>
      </div>

      <div ref={scene} aria-hidden="true" className="ga__scene">
        <div className="ga__runway">
          <span className="ga__keys ga__keys--left" />
          <span className="ga__number ga__number--left">27</span>
          <span className="ga__centreline" />
          <span className="ga__number ga__number--right">09</span>
          <span className="ga__keys ga__keys--right" />
          {[0.36, 0.66].map((at) => (
            <svg key={at} viewBox="0 0 40 40" className="ga__cross" style={{ left: `${at * 100}%` }}>
              <path d="M4 4L36 36M36 4L4 36" />
            </svg>
          ))}
          <span className="ga__edge ga__edge--top" />
          <span className="ga__edge ga__edge--bottom" />
          {[0.3, 0.42, 0.6, 0.72].map((at, i) => (
            <span key={at} className="ga__works" style={{ left: `${at * 100}%`, animationDelay: `${i * 0.25}s` }} />
          ))}
        </div>
        <span className="ga__shadow">
          <svg viewBox="0 0 32 32">
            <path d={PLANE} />
          </svg>
        </span>
        <span className="ga__plane">
          <svg viewBox="0 0 32 32">
            <path d={PLANE} />
          </svg>
        </span>
      </div>

      <div className="flex flex-col items-start gap-(--space-4) border-t border-rule px-(--space-5) py-(--space-4) sm:flex-row sm:items-center">
        <p className="ga__callout min-w-0 flex-1 font-mono">{callout}</p>
        {flying ? (
          <button type="button" onClick={goAround} className="btn btn--primary">
            Go around <span className="hidden text-xs opacity-70 sm:inline">(Space)</span>
          </button>
        ) : (
          <button type="button" onClick={start} className="btn btn--primary">
            {phase === "ready" ? "Start approach" : "Fly it again"}
          </button>
        )}
      </div>

      <p role="status" className="min-h-14 border-t border-rule px-(--space-5) py-(--space-4) text-[0.9375rem]">
        {result || (phase === "ready" ? "Press Start, then call the go-around before the wheels touch." : "")}
        {best !== null && result && phase !== "landed" && (
          <span className="block text-sm text-muted">Lowest go-around this session: {best} ft.</span>
        )}
      </p>
    </section>
  );
}
