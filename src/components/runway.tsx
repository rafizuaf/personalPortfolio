/** Top-down airliner, nose pointing right, in a 32-unit grid. */
export const PLANE =
  "M30 16c0-1-1-1.6-2.4-1.6H19L12.5 3H10l3.2 11.4H7.5L4.8 10H3l1.4 6L3 22h1.8l2.7-4.4h5.7L10 29h2.5L19 17.6h8.6C29 17.6 30 17 30 16z";

export function ThresholdKeys({ side }: { side: "left" | "right" }) {
  return (
    <span
      className={`absolute inset-y-1 flex flex-col justify-between ${side === "left" ? "left-1" : "right-1"}`}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} className="block h-0.5 w-3 bg-ink/60" />
      ))}
    </span>
  );
}
