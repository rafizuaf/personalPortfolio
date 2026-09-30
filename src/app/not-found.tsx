import Link from "next/link";
import { PLANE, ThresholdKeys } from "@/components/runway";

export default function NotFound() {
  return (
    <main id="main" className="shell flex min-h-svh flex-col justify-end pb-16">
      <p className="display text-hero text-dim">404</p>

      {/* A go-around: the plane comes in, floats over the runway without touching down, and climbs away. */}
      <div aria-hidden="true" className="go-around relative mt-8 h-6 rounded-(--radius) bg-paper-3">
        <span className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-[repeating-linear-gradient(to_right,var(--color-ink)_0_10px,transparent_10px_18px)] opacity-50" />
        <ThresholdKeys side="left" />
        <ThresholdKeys side="right" />
        <span className="go-around__shadow absolute -top-0.5 left-0 size-7 -translate-x-1/2 opacity-70">
          <svg viewBox="0 0 32 32" className="size-full fill-shade">
            <path d={PLANE} />
          </svg>
        </span>
        <span className="go-around__plane absolute -top-0.5 left-0 size-7 -translate-x-1/2">
          <svg viewBox="0 0 32 32" className="size-full fill-ink">
            <path d={PLANE} />
          </svg>
        </span>
      </div>

      <h1 className="mt-8 text-2xl font-semibold">Runway not found. Go around.</h1>
      <p className="mt-3 max-w-[46ch] text-muted">
        The address may be old or mistyped. Everything lives on one page now.
      </p>
      <div className="mt-8">
        <Link className="btn btn--primary" href="/">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
