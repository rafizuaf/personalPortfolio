import Link from "next/link";

type Sign = { label: string; href?: string };

/** Breadcrumb as an airport sign array: direction signs point back, the location sign says where you are. */
export default function SignArray({ signs }: { signs: Sign[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-(--space-2)">
        {signs.map((sign) =>
          sign.href ? (
            <li key={sign.label}>
              <Link href={sign.href} data-arrow="left" className="sign-link">
                <span className="sign">{sign.label}</span>
              </Link>
            </li>
          ) : (
            <li key={sign.label} aria-current="page" className="sign-link">
              <span className="sign sign--location">{sign.label}</span>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
