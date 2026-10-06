import Link from "next/link";
import Tiles from "@/components/Tiles";
import { entryNumber, type LogEntry } from "@/content/log";

function Board({ entry, label, dir }: { entry: LogEntry; label: string; dir: "back" | "forward" }) {
  const code = `E${entryNumber(entry.slug)}`;
  return (
    <Link
      href={`/log/${entry.slug}`}
      className={`entry-board night group ${dir === "forward" ? "sm:text-right" : ""}`}
    >
      <span className={`flex items-center gap-(--space-3) ${dir === "forward" ? "sm:justify-end" : ""}`}>
        <span className="strip__label">{label}</span>
        <Tiles text={code} cells={code.length} accent />
      </span>
      <span className="mt-(--space-3) block text-xl leading-snug font-semibold transition-colors duration-(--dur-fast) group-hover:text-accent-text">
        <span className="sr-only">{label}: </span>
        {entry.title}
      </span>
      <span aria-hidden="true" className="mt-(--space-3) block text-2xl text-accent-text">
        {dir === "back" ? "←" : "→"}
      </span>
    </Link>
  );
}

/** Older and newer entries as two departure boards. */
export default function EntryBoards({ older, newer }: { older?: LogEntry; newer?: LogEntry }) {
  if (!older && !newer) return null;
  return (
    <nav aria-label="More entries" data-gate-board className="grid grid-cols-1 gap-(--space-4) sm:grid-cols-2">
      {older ? <Board entry={older} label="Earlier entry" dir="back" /> : <span className="hidden sm:block" />}
      {newer && <Board entry={newer} label="Later entry" dir="forward" />}
    </nav>
  );
}
