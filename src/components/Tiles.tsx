/** Split-flap cells; the text is for sighted users only, the caller provides the accessible text. */
export default function Tiles({ text, cells, accent }: { text: string; cells: number; accent?: boolean }) {
  return (
    <span aria-hidden="true" data-flap-row className={`board board--gate night ${accent ? "board--accent" : ""}`}>
      {[...text.toUpperCase().padEnd(cells)].map((char, i) => (
        <span key={i} data-cell className="board__cell">
          {char}
        </span>
      ))}
    </span>
  );
}
