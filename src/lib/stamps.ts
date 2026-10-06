export const STAMPS = [
  { id: "takeoff", label: "Takeoff", hint: "Fly the logbook all the way to the end." },
  { id: "hold", label: "Hold short", hint: "Wait at the stop bar until you're cleared." },
  { id: "shift", label: "Shift change", hint: "Switch between day and night." },
  { id: "boarding", label: "Boarding", hint: "Open the boarding pass on the résumé button." },
  { id: "goaround", label: "Go around", hint: "Find a runway that isn't there. The tower knows one." },
  { id: "tower", label: "Tower", hint: "Call the tower on the radio." },
  { id: "mayday", label: "Mayday", hint: "Declare an emergency. Typing works." },
  { id: "logbook", label: "Logbook", hint: "Read a log entry." },
] as const;

export type StampId = (typeof STAMPS)[number]["id"];

export const STAMP_EVENT = "stamp";
const KEY = "stamps";

export function getStamps(): StampId[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((id) => STAMPS.some((stamp) => stamp.id === id)) : [];
  } catch {
    return [];
  }
}

/** Saves a stamp once and announces it; repeats are ignored. */
export function collect(id: StampId) {
  const owned = getStamps();
  if (owned.includes(id)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...owned, id]));
  } catch {}
  window.dispatchEvent(new CustomEvent<StampId>(STAMP_EVENT, { detail: id }));
}
