/** An ink stamp; uncollected ones are a dashed outline waiting for ink. */
export default function StampMark({ label, inked, index }: { label: string; inked: boolean; index: number }) {
  return (
    <span
      aria-hidden="true"
      className={`stamp ${inked ? "is-inked" : ""}`}
      style={{ rotate: `${((index * 37) % 17) - 8}deg` }}
    >
      <span className="stamp__label">{label}</span>
    </span>
  );
}
