"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { PROFILE, SOCIAL } from "@/content/profile";
import { collect, getStamps, STAMPS } from "@/lib/stamps";

type Reply = {
  text: string;
  link?: { href: string; label: string; external?: boolean };
  commands?: string[];
};
type Line = Reply & { id: number; from: "you" | "twr"; time: string };

const COMMANDS = ["email", "resume", "linkedin", "github", "status", "time", "log", "stamps", "runway", "mayday", "clear"];
const CHIPS = ["status", "time", "stamps", "mayday", "help"];
/** A real radio exchange has a beat between call and answer. */
const REPLY_MS = 450;
const MISSING_RUNWAY = "/runway-27";

const noSubscribe = () => () => {};
let lineId = 0;

const social = (label: string) => SOCIAL.find((link) => link.label === label)?.href ?? "";
const zulu = () => {
  const now = new Date();
  return `${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(2, "0")}Z`;
};
const jakartaTime = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(
    new Date(),
  );

/** Opens in a new tab and reports honestly whether the browser allowed it. */
const openTab = (label: string): Reply => {
  const href = social(label);
  const tab = window.open(href, "_blank");
  if (tab) {
    tab.opener = null;
    return { text: `${label} opened in a new tab.` };
  }
  return { text: `Your browser blocked the new tab. Here's ${label}:`, link: { href, label, external: true } };
};

/**
 * A command line styled as a tower frequency. Rendered only with JS: without it the
 * contact links beside it cover everything the radio does.
 */
export default function TowerRadio() {
  const router = useRouter();
  const ready = useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );
  const [lines, setLines] = useState<Line[]>([]);
  const [pending, setPending] = useState(0);
  const [value, setValue] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const box = log.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines, pending]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const add = (from: Line["from"], reply: Reply) =>
    setLines((current) => [...current, { ...reply, id: lineId++, from, time: zulu() }].slice(-40));

  /** Side effects run now, inside the click or keypress, so popups and downloads aren't blocked. */
  const act = (command: string): Reply | Promise<Reply> | null => {
    switch (command) {
      case "help":
        return { text: "Available on this frequency:", commands: COMMANDS };
      case "email":
        if (!navigator.clipboard) return { text: `Copying isn't available here. The address is ${PROFILE.email}.` };
        return navigator.clipboard.writeText(PROFILE.email).then(
          () => ({ text: `${PROFILE.email} copied. Cleared to contact.` }),
          () => ({ text: `Couldn't copy it. The address is ${PROFILE.email}.` }),
        );
      case "resume": {
        const link = Object.assign(document.createElement("a"), {
          href: PROFILE.resume.href,
          download: PROFILE.resume.fileName,
        });
        link.click();
        return { text: "Résumé download started." };
      }
      case "linkedin":
        return openTab("LinkedIn");
      case "github":
        return openTab("GitHub");
      case "status":
        return { text: `Status: ${PROFILE.availability}.` };
      case "time":
        return { text: `Local time in Jakarta: ${jakartaTime()} WIB.` };
      case "log":
        router.push("/log");
        return { text: "Taxi to the log. Follow the signs." };
      case "stamps":
        return { text: `You hold ${getStamps().length} of ${STAMPS.length} stamps. The passport is in the strip below.` };
      case "runway":
        return {
          text: "Runway 27 is closed for works. Go around:",
          link: { href: MISSING_RUNWAY, label: "Runway 27" },
        };
      case "mayday":
        collect("mayday");
        return { text: `Mayday received. Fastest help is ${PROFILE.email}.` };
      case "clear":
        setLines([]);
        return null;
      default:
        return { text: "Say again? Type help for the list." };
    }
  };

  const send = (raw: string) => {
    const command = raw.trim().toLowerCase().replace(/^\//, "");
    if (!command) return;
    setLastCommand(command);
    collect("tower");
    if (command !== "clear") add("you", { text: command });
    const result = act(command);
    if (!result) return;

    setPending((n) => n + 1);
    const answer = Promise.all([result, new Promise((done) => timers.current.push(window.setTimeout(done, REPLY_MS)))]);
    answer.then(([reply]) => {
      setPending((n) => n - 1);
      add("twr", reply);
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(value);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" && lastCommand) {
      event.preventDefault();
      setValue(lastCommand);
    }
  };

  if (!ready) return null;

  const token =
    "inline-flex min-h-8 items-center border border-rule px-(--space-2) text-sm transition-colors duration-(--dur-fast) hover:border-accent hover:text-accent-text";
  const chip =
    "inline-flex min-h-11 items-center border border-rule px-(--space-3) text-sm font-semibold capitalize transition-colors duration-(--dur-fast) hover:border-accent hover:text-accent-text";

  return (
    <section aria-labelledby="radio-title" className="radio night mt-(--space-8)">
      <header className="flex items-center justify-between gap-(--space-4) border-b border-rule px-(--space-5) py-(--space-3)">
        <h3 id="radio-title" className="strip__label">
          Tower radio
        </h3>
        <p className="flex items-center gap-(--space-2) font-mono text-sm text-muted">
          <span aria-hidden="true" className={`radio__led ${pending ? "is-tx" : ""}`} />
          TWR 118.1
        </p>
      </header>

      <div
        ref={log}
        role="log"
        aria-label="Radio transcript"
        data-lenis-prevent
        className="max-h-64 overflow-y-auto px-(--space-5) py-(--space-4) font-mono text-sm leading-relaxed"
      >
        <RadioLine from="twr" time="" text="Tower, go ahead. Type help, or pick a call below." />
        {lines.map((line) => (
          <RadioLine key={line.id} {...line}>
            {line.link &&
              (line.link.external ? (
                <a className="text-accent-text underline" href={line.link.href} target="_blank" rel="noreferrer">
                  {line.link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link className="text-accent-text underline" href={line.link.href}>
                  {line.link.label}
                </Link>
              ))}
            {line.commands && (
              <span className="mt-(--space-2) flex flex-wrap gap-(--space-1)">
                {line.commands.map((command) => (
                  <button key={command} type="button" className={token} onClick={() => send(command)}>
                    {command}
                  </button>
                ))}
              </span>
            )}
          </RadioLine>
        ))}
        {pending > 0 && (
          <div className="radio__line text-muted">
            <span className="radio__time" />
            <span className="text-accent-text">TWR</span>
            <p className="radio__typing">Transmitting</p>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-stretch border-t border-rule">
        <label htmlFor="radio-input" className="sr-only">
          Message the tower
        </label>
        <span aria-hidden="true" className="grid place-items-center pl-(--space-5) font-mono text-accent-text">
          &gt;
        </span>
        <input
          id="radio-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a command, like help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          className="min-h-12 min-w-0 flex-1 bg-transparent px-(--space-3) font-mono text-sm placeholder:text-dim focus-visible:-outline-offset-2"
        />
        <button type="submit" className="px-(--space-5) text-sm font-semibold text-accent-text hover:underline">
          Send
        </button>
      </form>

      <div className="flex flex-wrap gap-(--space-2) border-t border-rule px-(--space-5) py-(--space-4)">
        {CHIPS.map((command) => (
          <button key={command} type="button" className={chip} onClick={() => send(command)}>
            {command}
          </button>
        ))}
      </div>
    </section>
  );
}

function RadioLine({
  from,
  time,
  text,
  children,
}: {
  from: Line["from"];
  time: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className="radio__line">
      <span className="radio__time">{time && <time>{time}</time>}</span>
      <span className={from === "twr" ? "text-accent-text" : "text-muted"}>{from === "twr" ? "TWR" : "YOU"}</span>
      <p className={from === "you" ? "text-muted" : undefined}>
        {text} {children}
      </p>
    </div>
  );
}
