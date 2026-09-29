import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="shell flex min-h-svh flex-col justify-end pb-16">
      <p className="display text-hero text-dim">404</p>
      <h1 className="mt-6 text-2xl font-semibold">This page isn&apos;t on the map.</h1>
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
