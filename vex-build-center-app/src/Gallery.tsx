import { useEffect, useMemo, useState } from "react";

// One ready-made build. The library's entries come from tools/make-library.mjs, which only
// writes a mechanism after running it and checking it moves the way its blurb says.
export type Example = {
  slug: string; name: string; blurb: string; category: string; difficulty: number;
  motors: number; principle: string; games: string[]; file: string;
  partCount?: number; parts?: { id: string; name: string; count: number }[];
};

// The hand-built first example, kept at the front of the list.
const WIPER: Example = {
  slug: "windshield-wiper", name: "Windshield wiper", file: "windshield-wiper.json",
  blurb: "A motor, two gears and a four-bar linkage that swings an arm back and forth.",
  category: "linkages", difficulty: 2, motors: 1, principle: "four-bar linkage", games: [],
};

const CATEGORIES: [string, string][] = [
  ["drive bases", "Drive bases"], ["intakes", "Intakes"], ["lifts", "Lifts"], ["claws", "Claws"],
  ["outtakes", "Outtakes & hooks"], ["launchers", "Launchers"], ["linkages", "Linkages"], ["power", "Gears & chains"],
];
const CATEGORY_NAME = new Map(CATEGORIES);
const LEVELS = ["", "Starter", "Getting good", "Challenge"];
const levelName = (difficulty: number) => LEVELS[Math.min(difficulty, 3)];

export function Gallery({ onOpen, onClose }: { onOpen: (example: Example) => void; onClose: () => void }) {
  const [library, setLibrary] = useState<Example[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(0);
  const [chosen, setChosen] = useState<Example | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}examples/library/index.json`)
      .then((response) => { if (!response.ok) throw new Error(String(response.status)); return response.json(); })
      .then((entries: Example[]) => setLibrary([WIPER, ...entries]))
      .catch(() => { setFailed(true); setLibrary([WIPER]); });
  }, []);

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return (library ?? []).filter((example) => {
      if (category && example.category !== category) return false;
      if (level && Math.min(example.difficulty, 3) !== level) return false;
      const text = `${example.name} ${example.blurb} ${example.principle} ${example.games.join(" ")} ${CATEGORY_NAME.get(example.category) ?? ""}`.toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [library, query, category, level]);

  const countIn = (name: string) => (library ?? []).filter((example) => example.category === name).length;

  return (
    <>
      <div className="modal-scrim" onClick={onClose} />
      <div className="modal gallery" role="dialog" aria-label="Examples">
        <button className="modal-x" onClick={onClose} aria-label="Close">×</button>
        <h2>Examples</h2>
        <p className="muted small">Pick one, press ▶ Run to watch it move, then take it apart and see how it works. Opening one replaces your build, and Ctrl+Z brings yours back.</p>
        <div className="gallery-filters">
          <input type="search" placeholder="Search: claw, flywheel, 60T…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search the examples" />
          <select value={level} onChange={(event) => setLevel(Number(event.target.value))} aria-label="How hard">
            <option value={0}>Any level</option>
            {LEVELS.slice(1).map((name, index) => <option key={name} value={index + 1}>{name}</option>)}
          </select>
        </div>
        <div className="gallery-chips">
          <button className={category === "" ? "chip on" : "chip"} onClick={() => setCategory("")}>All {library ? `(${library.length})` : ""}</button>
          {CATEGORIES.filter(([name]) => countIn(name)).map(([name, label]) => (
            <button key={name} className={category === name ? "chip on" : "chip"} onClick={() => setCategory(name)}>{label} ({countIn(name)})</button>
          ))}
        </div>
        {failed && <p className="small" style={{ color: "var(--bad)" }}>The full library could not be loaded. Check the internet connection.</p>}
        {!library && <p className="muted small">Loading the examples…</p>}
        {library && !shown.length && <p className="muted small">Nothing matches. Try fewer words or another group.</p>}
        <div className="gallery-list">
          {shown.map((example) => (
            <div key={example.slug} className={chosen?.slug === example.slug ? "example on" : "example"}>
              <button className="example-head" onClick={() => setChosen(chosen?.slug === example.slug ? null : example)} aria-expanded={chosen?.slug === example.slug}>
                <b>{example.name}</b>
                <span>{example.blurb}</span>
                <span className="example-tags">
                  <i>{CATEGORY_NAME.get(example.category) ?? example.category}</i>
                  <i className={`level level-${Math.min(example.difficulty, 3)}`}>{levelName(example.difficulty)}</i>
                  <i>{example.motors} motor{example.motors === 1 ? "" : "s"}</i>
                  {example.partCount ? <i>{example.partCount} parts</i> : null}
                </span>
              </button>
              {chosen?.slug === example.slug && (
                <div className="example-more">
                  <p><b>How it works:</b> {example.principle}.</p>
                  {example.games.length > 0 && <p><b>Useful in:</b> {example.games.join(", ")}</p>}
                  {example.parts
                    ? <><b>Parts you need</b><ul className="parts-needed">{example.parts.map((part) => <li key={part.id}><span>{part.count}×</span> {part.name}</li>)}</ul></>
                    : <p className="muted">Open it to see its parts in the parts count.</p>}
                  <button className="primary" onClick={() => onOpen(example)}>Open this build</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
